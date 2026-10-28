import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import SupportFeatures from "@/components/SupportFeatures";
import { company, categories } from "@/lib/data";
import "./globals.css";
import "./experience.css";
import "./independent.css";

// Keep this deployment noindex until it replaces the authoritative radonik.com domain.
export const metadata: Metadata = {
 title: {default:"رادونیک | پرتو نگار شهاب",template:"%s | رادونیک"},
 description:"شرکت دانش‌بنیان پرتو نگار شهاب؛ تجهیزات پرتویی، خدمات دزیمتری فردی، آموزش حفاظت در برابر اشعه و اندازه‌گیری پرتویی.",
 robots:{index:false,follow:true}
};

export default function Layout({ children }: { children: React.ReactNode }) {
 return <html lang="fa" dir="rtl"><body><Header/><main>{children}</main><SupportFeatures/><footer className="footer"><div className="shell"><div className="footer-grid"><div className="footer-intro"><div className="eyebrow">RADONIK / PARTO NEGAR SHAHAB</div><h2>فناوری در خدمت<br/><em>ایمنی پرتوی.</em></h2><p>{company.about}</p><Link href="/contact" className="text-action">ارتباط با مجموعه <ArrowUpLeft size={17}/></Link></div><div><h3>دسترسی سریع</h3><Link href="/">صفحه نخست</Link><Link href="/about">درباره شرکت</Link><Link href="/shop">فروشگاه</Link><Link href="/education">آموزش</Link><Link href="/insights">دانشنامه</Link><Link href="/contact">تماس با ما</Link></div><div><h3>دسته‌بندی‌ها</h3>{categories.slice(0,7).map(c=><Link key={c.id} href={"/shop?category="+c.id}>{c.name}</Link>)}</div><div><h3>ارتباط با ما</h3><a href={"tel:"+company.phones[0]}><Phone size={15}/>{company.phones[0]}</a><a href={"tel:"+company.phones[1]}><Phone size={15}/>{company.phones[1]}</a><a href={"mailto:"+company.email}><Mail size={15}/>{company.email}</a><p className="footer-address"><MapPin size={18}/>{company.address}</p></div></div><div className="footer-bottom"><span>© RADONIK | شرکت دانش‌بنیان پرتو نگار شهاب</span><span>ثبت درخواست خرید و استعلام در همین سامانه انجام می‌شود؛ پرداخت آنلاین هنوز فعال نیست.</span><Link href="/contact">پرسش درباره شرایط فروش <ArrowUpLeft size={14}/></Link></div></div></footer></body></html>;
}