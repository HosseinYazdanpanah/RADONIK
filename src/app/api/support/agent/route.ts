import { NextRequest,NextResponse } from 'next/server';
import { hasStaffAccess,issueSession,isStaffConfigured, safeEqual,sqlClient,staffCookieName,trustedPost } from '@/lib/support';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const fail=(msg:string,status:number)=>NextResponse.json({error:msg},{status,headers:{'Cache-Control':'no-store'}});
export async function GET(req:NextRequest){return NextResponse.json({authenticated:hasStaffAccess(req),configured:isStaffConfigured()},{headers:{'Cache-Control':'no-store'}});}
export async function POST(req:NextRequest){
 if(!trustedPost(req))return fail('درخواست غیرمجاز',403);
 let data:Record<string,unknown>;try{data=await req.json();}catch{return fail('ورودی نامعتبر',400);}
 const action=String(data.action||'');
 if(action==='login'){
  if(!isStaffConfigured())return fail('اطلاعات ورود پشتیبانی هنوز در تنظیمات فعال نشده است.',503);
  const user=String(data.username||''),pass=String(data.password||'');
  if(!safeEqual(user,process.env.SUPPORT_ADMIN_USERNAME||'')||!safeEqual(pass,process.env.SUPPORT_ADMIN_PASSWORD||''))return fail('نام کاربری یا رمز عبور نادرست است.',401);
  const response=NextResponse.json({ok:true});
  response.cookies.set(staffCookieName,issueSession(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:8*3600});return response;
 }
 if(action==='logout'){const response=NextResponse.json({ok:true});response.cookies.delete(staffCookieName);return response;}
 if(!hasStaffAccess(req))return fail('ابتدا وارد پنل شوید.',401);
 const sql=sqlClient();if(!sql)return fail('اتصال به دیتابیس در دسترس نیست.',503);
 try {
  if(action==='ping') {await sql`INSERT INTO support_presence(operator_id,last_seen) VALUES('main',now()) ON CONFLICT (operator_id) DO UPDATE SET last_seen=now()`;return NextResponse.json({ok:true});}
  if(action==='list'){
   const sessions=await sql`SELECT id,visitor_name,visitor_contact,status,created_at,updated_at FROM support_conversations ORDER BY updated_at DESC LIMIT 80`;
   const chosen=String(data.id||'');let messages:unknown[]=[];
   if(/^[0-9a-f-]{36}$/.test(chosen)) messages=await sql`SELECT id,sender,body,created_at FROM support_messages WHERE conversation_id=${chosen} ORDER BY id ASC LIMIT 200`;
   return NextResponse.json({sessions,messages},{headers:{'Cache-Control':'no-store'}});
  }
  if(action==='inquiries') {const inquiries=await sql`SELECT id,customer_name,contact,product_id,details,created_at,status FROM sales_inquiries ORDER BY created_at DESC LIMIT 150`;return NextResponse.json({inquiries},{headers:{'Cache-Control':'no-store'}});}
  if(action==='reply'){
   const id=String(data.id||''),body=String(data.body||'').trim();
   if(!/^[0-9a-f-]{36}$/.test(id)||body.length<1||body.length>2000)return fail('اطلاعات پیام نامعتبر است.',400);
   const found=await sql`SELECT id FROM support_conversations WHERE id=${id} AND status='open'`;
   if(!found.length)return fail('گفت‌وگوی فعال پیدا نشد.',404);
   await sql`INSERT INTO support_messages(conversation_id,sender,body) VALUES(${id},'agent',${body})`;
   await sql`UPDATE support_conversations SET updated_at=now() WHERE id=${id}`;return NextResponse.json({ok:true});
  }
  if(action==='close'){
   const id=String(data.id||'');if(!/^[0-9a-f-]{36}$/.test(id))return fail('شناسه نامعتبر',400);
   await sql`UPDATE support_conversations SET status='closed',updated_at=now() WHERE id=${id}`;return NextResponse.json({ok:true});
  }
  return fail('عملیات ناشناخته',400);
 }catch{return fail('عملیات در دیتابیس ناموفق بود.',500);}
}