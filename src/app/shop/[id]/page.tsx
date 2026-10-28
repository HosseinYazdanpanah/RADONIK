import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowRight,Atom,ShieldCheck} from 'lucide-react';
import type {Metadata} from 'next';
import {getCatalog} from '@/lib/catalog';
import {categories,priceLabel} from '@/lib/data';
import InquiryForm from '@/components/InquiryForm';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{const {id}=await params;const p=(await getCatalog()).find(x=>x.id===id);return {title:p?.title||'محصول'};}
export default async function Product({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const p=(await getCatalog()).find(x=>x.id===id);if(!p)notFound();const c=categories.find(x=>x.id===p.category);
 return <><section className="internal-hero compact"><div className="shell"><Link className="back-link" href="/shop"><ArrowRight size={18}/> بازگشت به فروشگاه</Link><span className="eyebrow">RADONIK / PRODUCT DETAIL</span><h1>جزئیات <em>محصول</em></h1></div></section><section className="shell section product-detail"><div className="detail-visual">{p.image?<img src={p.image} alt={p.title}/>:<Atom size={120} strokeWidth={.75}/>}</div><div className="detail-copy"><span className="eyebrow">{c?.name||'محصولات'}</span><h2>{p.title}</h2><div className="detail-price"><span>قیمت اولیه قابل استعلام</span><strong>{priceLabel(p.price)}</strong></div>{p.summary&&<p>{p.summary}</p>}<div className="detail-info"><ShieldCheck size={20}/> قیمت و موجودی باید پیش از صدور پیش‌فاکتور تأیید شوند. ثبت درخواست از این وب‌سایت مستقل است و پرداخت آنلاین هنوز فعال نیست.</div><InquiryForm productId={p.id} productName={p.title}/></div></section></>;
}