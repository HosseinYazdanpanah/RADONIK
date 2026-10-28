import {notFound} from "next/navigation";
import Link from "next/link";
import {ArrowRight,ArrowUpLeft,Atom,ShieldCheck} from "lucide-react";
import type {Metadata} from "next";
import {getCatalog} from "@/lib/catalog";
import {categories,oldProductLink,priceLabel} from "@/lib/data";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{const {id}=await params;const p=(await getCatalog()).find(x=>x.id===id);return {title:p?.title||"محصول"};}
export default async function Product({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=(await getCatalog()).find(x=>x.id===id);if(!p)notFound();const c=categories.find(x=>x.id===p.category);
return <><section className="internal-hero compact"><div className="shell"><Link className="back-link" href="/shop"><ArrowRight size={18}/> بازگشت به فروشگاه</Link><span className="eyebrow">RADONIK / EQUIPMENT</span><h1>جزئیات <em>محصول</em></h1></div></section><section className="shell section product-detail"><div className="detail-visual">{p.image?<img src={p.image} alt={p.title}/>:<Atom size={120} strokeWidth={.75}/>}</div><div className="detail-copy"><span className="eyebrow">{c?.name||"محصولات"}</span><h2>{p.title}</h2><div className="detail-price"><span>قیمت درج‌شده در سایت مرجع</span><strong>{priceLabel(p.price)}</strong></div>{p.summary&&<p>{p.summary}</p>}<div className="detail-info"><ShieldCheck size={20}/> خرید و پرداخت در فروشگاه اصلی رادونیک انجام می‌شود. مشخصات، موجودی، قیمت نهایی و شرایط فروش را در صفحه مرجع بررسی کنید.</div><a className="btn btn-primary" href={oldProductLink(p)} target="_blank" rel="noopener noreferrer">{p.price===null?"استعلام قیمت در سایت اصلی":"مشاهده محصول در سایت اصلی"} <ArrowUpLeft size={19}/></a><a className="source-link" href={c?.source||"https://radonik.com"} target="_blank" rel="noopener noreferrer">مشاهده دسته در سایت مرجع</a></div></section></>;}
