"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowUpLeft,Menu,X,ShoppingBag} from "lucide-react";
export default function Header(){
 const [open,setOpen]=useState(false);
 const links=[["/","خانه"],["/about","درباره ما"],["/shop","فروشگاه"],["/education","آموزش"],["/insights","دانشنامه"],["/contact","تماس با ما"]];
 return <header className="header"><div className="shell header-inner"><Link href="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-icon">✳</span><span><b>RADONIK</b><small>پرتو نگار شهاب</small></span></Link><nav className={open?"nav open":"nav"} aria-label="منوی اصلی">{links.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><div className="header-actions"><a className="shop-login" href="https://radonik.com/my-account/" target="_blank" rel="noopener noreferrer"><ShoppingBag size={17}/> حساب و خرید <ArrowUpLeft size={16}/></a><button type="button" className="nav-toggle" onClick={()=>setOpen(!open)} aria-label={open?"بستن منو":"باز کردن منو"} aria-expanded={open}>{open?<X/>:<Menu/>}</button></div></div></header>;
}
