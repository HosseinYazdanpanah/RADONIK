"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpLeft, ChevronDown, Menu, X, ShoppingBag, Phone, Mail, Search, ArrowLeft } from "lucide-react";

const navigation = [
  {href:"/",label:"صفحه اصلی"}, {href:"/about",label:"درباره رادونیک"},
  {href:"/shop",label:"محصولات و تجهیزات"}, {href:"/education",label:"آموزش"},
  {href:"/insights",label:"دانشنامه"}, {href:"/contact",label:"تماس با ما"}
];

export default function Header() {
 const [isOpen,setIsOpen] = useState(false);
 const close = () => setIsOpen(false);
 return <>
  <div className="rh-top"><div className="rh-container"><span><span className="rh-status"/> شرکت دانش‌بنیان پرتو نگار شهاب · پارک فناوری پردیس</span><div><a href="tel:02126644613"><Phone size={13}/> ۰۲۱-۲۶۶۴۴۶۱۳</a><a href="mailto:info@Radonik.com"><Mail size={13}/> info@Radonik.com</a></div></div></div>
  <header className="rh-header"><div className="rh-container rh-main">
    <Link href="/" className="rh-brand" onClick={close} aria-label="رادونیک، صفحه اصلی"><img src="/brand/radonik-logo.png" width="200" height="60" alt="رادونیک RADONIK، لوگوی رسمی"/></Link>
    <nav className={isOpen ? "rh-nav rh-open" : "rh-nav"} aria-label="ناوبری اصلی" id="rh-primary-menu">
      {navigation.map(x=><Link onClick={close} key={x.href} href={x.href}>{x.label}</Link>)}
      <a className="rh-mobile-shop" href="https://radonik.com/my-account/" target="_blank" rel="noopener noreferrer">حساب کاربری و خرید <ArrowUpLeft size={17}/></a>
    </nav>
    <div className="rh-actions"><Link href="/shop" className="rh-search" aria-label="جستجو در محصولات"><Search size={20}/></Link><a className="rh-account" href="https://radonik.com/my-account/" target="_blank" rel="noopener noreferrer"><ShoppingBag size={18}/><span>حساب و خرید</span><ArrowUpLeft size={15}/></a><Link className="rh-cta" href="/contact">درخواست مشاوره <ArrowUpLeft size={17}/></Link><button type="button" className="rh-menu-toggle" onClick={()=>setIsOpen(v=>!v)} aria-label={isOpen?"بستن منو":"باز کردن منو"} aria-controls="rh-primary-menu" aria-expanded={isOpen}>{isOpen?<X size={25}/>:<Menu size={25}/>}</button></div>
  </div></header>
  {isOpen && <button type="button" className="rh-menu-scrim" aria-label="بستن منو" onClick={close}/>}
 </>;
}