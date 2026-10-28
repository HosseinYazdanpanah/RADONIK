import {neon} from "@neondatabase/serverless";
import {products,type Product} from "./data";
export async function getCatalog():Promise<Product[]>{
 const url=process.env.DATABASE_URL;
 if(!url)return products;
 try{
  const sql=neon(url);
  const rows=await sql.query("SELECT id,title,category,price_toman,source_url,image_url,summary FROM products WHERE is_published=true ORDER BY sort_order,id LIMIT 500",[]) as {id:string;title:string;category:string;price_toman:string|null;source_url:string|null;image_url:string|null;summary:string|null}[];
  if(!rows.length)return products;
  const stored=rows.map(r=>({id:r.id,title:r.title,category:r.category,price:r.price_toman===null?null:Number(r.price_toman),url:undefined,image:r.id==="cp4100a"?"/brand/cp4100a-editorial.webp":(r.image_url?.startsWith("/")&&!r.image_url.startsWith("//")?r.image_url:undefined),summary:r.summary||undefined}));
  const known=new Set(stored.map(x=>x.id));return [...stored,...products.filter(x=>!known.has(x.id))];
 }catch(e){console.error("Neon catalog fallback:",e instanceof Error?e.message:"unknown");return products;}
}
