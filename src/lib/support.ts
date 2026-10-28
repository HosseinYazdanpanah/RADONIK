import 'server-only';
import { neon } from '@neondatabase/serverless';
import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const sqlClient = () => process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
export const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');
export const safeEqual = (a: string, b: string) => {
  const aa = createHash('sha256').update(a).digest();
  const bb = createHash('sha256').update(b).digest();
  return timingSafeEqual(aa, bb);
};
const cookieName = 'radonik_support_staff';
const secret = () => process.env.SUPPORT_AUTH_SECRET || '';
export function isStaffConfigured() {
 return Boolean(process.env.SUPPORT_AUTH_SECRET && process.env.SUPPORT_ADMIN_USERNAME && process.env.SUPPORT_ADMIN_PASSWORD && process.env.DATABASE_URL);
}
export function issueSession() {
 const expires = Date.now() + 8 * 60 * 60 * 1000;
 const msg = String(expires);
 return `${msg}.${createHmac('sha256', secret()).update(msg).digest('hex')}`;
}
export function hasStaffAccess(request: NextRequest) {
 if (!isStaffConfigured()) return false;
 const value = request.cookies.get(cookieName)?.value || '';
 const [expires, signature] = value.split('.');
 if (!expires || !signature || !/^\d{13}$/.test(expires) || Number(expires) < Date.now()) return false;
 return safeEqual(signature, createHmac('sha256',secret()).update(expires).digest('hex'));
}
export const staffCookieName = cookieName;
function scheduledNow() {
 const workDays = process.env.SUPPORT_WORK_DAYS;
 const start = process.env.SUPPORT_START_TIME;
 const end = process.env.SUPPORT_END_TIME;
 // Until working hours are configured, a present staff member can provide support.
 if (!workDays || !start || !end) return true;
 if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(end)) return false;
 const date = new Date();
 const parts = new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tehran',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
 const val = (type:string) => parts.find(x=>x.type===type)?.value || '';
 const days: Record<string,number> = {Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
 const day = days[val('weekday')];
 const current = `${val('hour').padStart(2,'0')}:${val('minute')}`;
 return workDays.split(',').map(x=>x.trim()).includes(String(day)) && current>=start && current<end;
}
export async function supportOnline() {
 if (!scheduledNow()) return false;
 const sql = sqlClient();
 if (!sql) return false;
 try {
  const rows = await sql`SELECT EXISTS (SELECT 1 FROM support_presence WHERE last_seen > now() - interval '90 seconds') AS online`;
  return Boolean(rows[0]?.online);
 } catch {return false;}
}
export function trustedPost(request: NextRequest) {
 const origin=request.headers.get('origin');
 return !origin || origin === new URL(request.url).origin;
}