import Link from "next/link";
import {ArrowUpLeft,Atom} from "lucide-react";
import type {Product} from "@/lib/data";
import {categories,priceLabel} from "@/lib/data";
export default function ProductCard({item,index=0}:{item:Product;index?:number}){return <Link href={"/shop/"+item.id} className="product-card"><div className={"product-art theme-"+index%4}><div className="mini-rings"/>{item.image?<img src={item.image} alt={item.title} loading="lazy"/>:<Atom size={66} strokeWidth={.8}/>}<span className="art-caption">RADONIK / {String(index+1).padStart(2,"0")}</span><span className="art-arrow"><ArrowUpLeft size={18}/></span></div><div className="product-details"><span className="product-category">{categories.find(c=>c.id===item.category)?.name||"محصول"}</span><h3>{item.title}</h3><div className="product-foot"><strong>{priceLabel(item.price)}</strong><ArrowUpLeft size={18}/></div></div></Link>;}
