import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, randomUUID } from 'node:crypto';
import { sqlClient, tokenHash, supportOnline, trustedPost } from '@/lib/support';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const result = (message:string,status:number) => NextResponse.json({error:message},{status,headers:{'Cache-Control':'no-store'}});
export async function GET() {return NextResponse.json({online:await supportOnline(),available:Boolean(sqlClient())},{headers:{'Cache-Control':'no-store'}});}
export async function POST(request:NextRequest) {
 if(!trustedPost(request)) return result('درخواست نامعتبر است.',403);
 const sql=sqlClient(); if(!sql) return result('سامانه ثبت پیام هنوز فعال نشده است. لطفاً از صفحه تماس با ما استفاده کنید.',503);
 let data:Record<string,unknown>;
 try { data=await request.json(); } catch { return result('اطلاعات ارسالی معتبر نیست.',400); }
 const type=String(data.type||'');
 if(type==='create'){
  const name=String(data.name||'').trim().slice(0,120),contact=String(data.contact||'').trim().slice(0,200),body=String(data.body||'').trim();
  if(name.length<2 || body.length<2 || body.length>2000 || contact.length>200) return result('نام و متن پیام را کامل وارد کنید.',400);
  if(!(await supportOnline()) && !contact) return result('برای دریافت پاسخ در زمان دیگر، راه تماس را وارد کنید.',400);
  const id=randomUUID(), token=randomBytes(24).toString('hex');
  try {
   await sql`INSERT INTO support_conversations(id,visitor_token_hash,visitor_name,visitor_contact) VALUES (${id},${tokenHash(token)},${name},${contact})`;
   await sql`INSERT INTO support_messages(conversation_id,sender,body) VALUES (${id},'visitor',${body})`;
   return NextResponse.json({id,token,accepted:true},{status:201});
  }catch{return result('ثبت پیام انجام نشد. لطفاً دوباره تلاش کنید.',500);}
 }
 const id=String(data.id||''),token=String(data.token||'');
 if(!/^[0-9a-f-]{36}$/.test(id)||!/^[a-f0-9]{48}$/.test(token)) return result('نشست پشتیبانی نامعتبر است.',401);
 try {
  const rows=await sql`SELECT id,status FROM support_conversations WHERE id=${id} AND visitor_token_hash=${tokenHash(token)}`;
  if(!rows.length) return result('گفت‌وگو پیدا نشد.',404);
  if(type==='read') {
   const items=await sql`SELECT id,sender,body,created_at FROM support_messages WHERE conversation_id=${id} ORDER BY id ASC LIMIT 200`;
   return NextResponse.json({items,status:rows[0].status,online:await supportOnline()},{headers:{'Cache-Control':'no-store'}});
  }
  if(type==='send') {
   const body=String(data.body||'').trim();
   if(body.length<1||body.length>2000||rows[0].status==='closed') return result('پیام نامعتبر است یا گفتگو بسته شده است.',400);
   // 1 message per 2 seconds per conversation to limit spam.
   const recent=await sql`SELECT 1 FROM support_messages WHERE conversation_id=${id} AND sender='visitor' AND created_at>now()-interval '2 seconds' LIMIT 1`;
   if(recent.length) return result('لطفاً کمی بعد پیام بعدی را بفرستید.',429);
   await sql`INSERT INTO support_messages(conversation_id,sender,body) VALUES (${id},'visitor',${body})`;
   await sql`UPDATE support_conversations SET updated_at=now() WHERE id=${id}`;
   return NextResponse.json({ok:true});
  }
  return result('عملیات ناشناخته است.',400);
 }catch{return result('ارتباط با سامانه برقرار نشد.',500);}
}