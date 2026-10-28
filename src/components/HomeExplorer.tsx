"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpLeft, ArrowLeft, Search, SlidersHorizontal, ShieldCheck, Atom, GraduationCap } from "lucide-react";
import type { Product, Category } from "@/lib/data";
import { priceLabel } from "@/lib/data";

type Props = { products: Product[]; categories: Category[] };
const featured = ["all", "digital", "tld", "protection", "education", "readers"];
export default function HomeExplorer({ products, categories }: Props) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState(false);
  const selected = useMemo(() => {
    const q = search.trim().toLocaleLowerCase();
    return products.filter(item => (category === "all" || item.category === category) && (!q || item.title.toLocaleLowerCase().includes(q) || item.id.toLowerCase().includes(q)));
  }, [products, category, search]);
  const visible = showMore ? selected.slice(0, 12) : selected.slice(0, 6);
  return <div className="rx-explorer">
    <div className="rx-explorer-toolbar">
      <div className="rx-tab-scroll" role="group" aria-label="فیلتر دسته‌بندی محصولات">
        {featured.map(id => <button key={id} type="button" className={category === id ? "rx-tab is-active" : "rx-tab"} aria-pressed={category === id} onClick={() => { setCategory(id); setShowMore(false); }}>
          {id === "all" ? "همه محصولات" : categories.find(c => c.id === id)?.name ?? id}
        </button>)}
      </div>
      <label className="rx-search"><Search aria-hidden="true" size={18} /><span className="rx-sr-only">جستجوی کالا و دوره</span><input value={search} onChange={event => { setSearch(event.target.value); setShowMore(false); }} placeholder="نام دستگاه یا دوره..." type="search" /></label>
    </div>
    <div className="rx-count"><SlidersHorizontal aria-hidden="true" size={15}/>{selected.length.toLocaleString("fa-IR")} مورد در این دسته <span>قیمت‌ها نیازمند تأیید نهایی در سایت اصلی هستند.</span></div>
    {visible.length ? <div className="rx-product-grid">{visible.map((item, index) => <Link key={item.id} href={`/shop/${item.id}`} className="rx-product">
      <div className={`rx-product-figure rx-product-figure-${index%4}`}>
        <div className="rx-product-orbit" aria-hidden="true"/>
        {item.image ? <img loading="lazy" src={item.image} alt={item.title}/> : item.category === "education" ? <GraduationCap aria-hidden="true" size={74} strokeWidth={1}/> : item.category === "protection" ? <ShieldCheck aria-hidden="true" size={74} strokeWidth={1}/> : <Atom aria-hidden="true" size={74} strokeWidth={1}/>}
        <span className="rx-product-figure-code">RADONIK / {item.id.toUpperCase()}</span>
        <span className="rx-product-figure-arrow"><ArrowUpLeft size={17}/></span>
      </div>
      <div className="rx-product-content"><span className="rx-category">{categories.find(c => c.id === item.category)?.name}</span><h3>{item.title}</h3><div className="rx-product-price"><strong>{priceLabel(item.price)}</strong><span>جزئیات <ArrowUpLeft size={15}/></span></div></div>
    </Link>)}</div> : <div className="rx-empty"><Search size={30} aria-hidden="true"/><h3>محصولی با این مشخصات پیدا نشد</h3><p>عبارت دیگری وارد کنید یا دسته‌بندی را تغییر دهید.</p></div>}
    <div className="rx-explorer-bottom">{selected.length > 6 && !showMore ? <button type="button" className="rx-quiet-button" onClick={() => setShowMore(true)}>نمایش محصولات بیشتر <ArrowLeft size={17}/></button> : <span className="rx-catalog-note">برای بررسی فهرست کامل و موجودی از فروشگاه استفاده کنید.</span>}<Link href={category === "all" ? "/shop" : `/shop?category=${category}`} className="rx-button rx-button-dark">مشاهده کاتالوگ کامل <ArrowUpLeft size={17}/></Link></div>
  </div>;
}