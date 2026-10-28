import {NextRequest,NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {sqlClient,trustedPost} from '@/lib/support';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 if(!trustedPost(req))return NextResponse.json({error:'درخواست غیرمجاز'}, {status:403});
 const sql=sqlClient();if(!sql)return NextResponse.json({error:'سامانه درخواست‌ها موقتاً در دسترس نیست. لطفاً تماس بگیرید.'},{status:503});
 try {const b=await req.json();const name=String(b.name||'').trim(),contact=String(b.contact||'').trim(),productId=String(b.productId||'').slice(0,120),details=String(b.details||'').trim();
 if(name.length<2||name.length>120||contact.length<6||contact.length>200||details.length<6||details.length>2000) return NextResponse.json({error:'اطلاعات نام، راه تماس و توضیحات را کامل وارد کنید.'},{status:400});
 const id=randomUUID();await sql`INSERT INTO sales_inquiries(id,customer_name,contact,product_id,details) VALUES(${id},${name},${contact},${productId||null},${details})`;
 return NextResponse.json({ok:true,reference:id.slice(0,8).toUpperCase()},{status:201});
 }catch{return NextResponse.json({error:'ثبت درخواست ناموفق بود. لطفاً دوباره تلاش کنید.'},{status:500});}
}