import Link from "next/link";
import { ArrowUpLeft, ArrowLeft, Atom, ShieldCheck, Crosshair, GraduationCap, Microscope, MoveUpLeft, CheckCircle2, Sparkles, ScanLine, Waves, Radar, Beaker, ArrowDown, Phone, Mail, Zap, ChevronDown, CircleDot, ClipboardCheck, Activity, Globe2, FileText, BookOpen, Fingerprint, Building2, PackageCheck, ExternalLink } from "lucide-react";
import HomeExplorer from "@/components/HomeExplorer";
import { categories, company, permits, articles, priceLabel } from "@/lib/data";
import { getCatalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const services = [
 {n:"01",tag:"PERSONAL DOSIMETRY",title:"خدمات دزیمتری فردی TLD",desc:"سنجش دز پرتوکاران با روش ترمولومینسانس (TLD) و خدمات مربوط به پایش فردی.",href:"/shop?category=dosimetry",icon:Crosshair},
 {n:"02",tag:"RADIATION DETECTION",title:"تجهیزات آشکارسازی و اندازه‌گیری",desc:"دزیمترهای دیجیتال فردی و محیطی، خوانشگرها، آشکارسازها و تجهیزات مرتبط.",href:"/shop?category=digital",icon:Radar},
 {n:"03",tag:"RADIATION PROTECTION",title:"راهکارهای حفاظت پرتوی",desc:"تجهیزات حفاظت در برابر اشعه، کیت‌های مدیریت بحران و سامانه‌های تخصصی.",href:"/shop?category=protection",icon:ShieldCheck},
 {n:"04",tag:"PROFESSIONAL TRAINING",title:"آموزش و دوره‌های تخصصی",desc:"دوره‌های حفاظت در برابر اشعه برای مراکز پزشکی، صنعت و پرتوهای لیزر.",href:"/education",icon:GraduationCap}
];
const sectors = [
 {icon:Building2,title:"مراکز پزشکی و درمانی",text:"تجهیزات و آموزش حفاظت در برابر اشعه"},
 {icon:Activity,title:"پزشکی هسته‌ای و PET Scan",text:"دزیمتری دست و سنجش دز پرتوکاران"},
 {icon:Beaker,title:"صنایع و مراکز پرتویی",text:"پایش، آشکارسازی و تجهیزات ایمنی"},
 {icon:Microscope,title:"مراکز پژوهشی و آزمایشگاهی",text:"دستگاه‌های خوانش، آشکارسازی و سنجش"}
];
const faqs = [
 {q:"برای انتخاب دزیمتر مناسب از کجا شروع کنم؟",a:"از بخش کاتالوگ، دستهٔ دزیمترهای فردی و محیطی دیجیتال را انتخاب کنید. برای اطمینان از تناسب دستگاه با نوع پرتو و شرایط کار، مشخصات محصول را بررسی و با شرکت تماس بگیرید."},
 {q:"آیا می‌توانم از همین سایت سفارش را نهایی کنم؟",a:"بله، می‌توانید از همین سایت درخواست خرید و استعلام ارسال کنید. پرداخت آنلاین تا زمان اتصال درگاه مستقل فعال نیست."},
 {q:"قیمت‌های درج‌شده قطعی و به‌روز هستند؟",a:"خیر. قیمت‌ها مربوط به فهرست اولیه محصولات هستند و باید پیش از ثبت سفارش توسط واحد فروش تأیید شوند."},
 {q:"آیا رادونیک دوره‌های حفاظت در برابر اشعه برگزار می‌کند؟",a:"بله. دوره‌ها و کارگاه‌های تخصصی حفاظت در برابر اشعه و دزیمتری در وب‌سایت رسمی معرفی شده‌اند. برای زمان برگزاری و ثبت‌نام به بخش آموزش مراجعه کنید."},
 {q:"از کجا می‌توانم مدارک و مجوزهای شرکت را بررسی کنم؟",a:"عنوان مجوزهای اعلام‌شده در بخش مدارک و مجوزها نمایش داده می‌شود. ارائه نسخه معتبر سند و استعلام از صادرکننده بر عهده شرکت است."},
 {q:"برای استعلام یک تجهیز تخصصی چه کاری انجام بدهم؟",a:"نام مدل و کاربرد موردنظر خود را از طریق راه‌های ارتباطی شرکت اعلام کنید. مشخصات تماس رسمی در صفحهٔ ارتباط با ما در دسترس است."}
];
export default async function Home() {
 const products = await getCatalog();
 const heroProduct = products.find(p => p.id === "cp4100a") ?? products[0];
 return <div className="rx-home">
   <section className="rx-hero" aria-labelledby="rx-hero-title">
     <div className="rx-hero-glow" aria-hidden="true"/>
     <div className="rx-shell rx-hero-content">
       <div className="rx-hero-copy">
         <a className="rx-hero-pill" href="#credentials"><span className="rx-pulse"/> شرکت دانش‌بنیان پرتو نگار شهاب <ArrowUpLeft size={15}/></a>
         <span className="rx-eyebrow rx-eyebrow-light">RADONIK <span/> RADIATION TECHNOLOGY</span>
         <h1 id="rx-hero-title">فناوری دقیق،<br/><em>ایمنی مطمئن.</em></h1>
         <p>از طراحی و ساخت تجهیزات پرتویی تا خدمات دزیمتری و آموزش تخصصی؛ راهکارهای علمی برای محیط‌های کاری حساس و دقیق.</p>
         <div className="rx-actions"><Link href="/shop" className="rx-button rx-button-mint">کاوش در محصولات <ArrowUpLeft size={19}/></Link><Link href="/contact" className="rx-button rx-button-glass">ارتباط با کارشناسان <ArrowLeft size={18}/></Link></div>
         <div className="rx-hero-points"><span><CheckCircle2 size={17}/> طراحی و ساخت تجهیزات</span><span><CheckCircle2 size={17}/> دزیمتری و آموزش</span></div>
       </div>
       <div className="rx-hero-stage" aria-label="معرفی دزیمتر دیجیتال ساخت ایران">
         <div className="rx-stage-crosshair" aria-hidden="true"><i/><i/><i/></div>
         <span className="rx-stage-vertical" lang="en">PRECISION / PROTECTION / PROGRESS</span>
         <div className="rx-stage-product">
           <div className="rx-stage-top"><span><span className="rx-dot"/> INSTRUMENT SERIES / 01</span><ScanLine size={18}/></div>
           <div className="rx-stage-image">{heroProduct?.image ? <img src={heroProduct.image} alt={heroProduct.title} fetchPriority="high"/> : <Radar size={126} strokeWidth={0.7} aria-hidden="true"/>}</div>
           <div className="rx-stage-bottom"><span>دزیمتر دیجیتال فردی</span><strong lang="en">CP4100A</strong></div>
         </div>
         <div className="rx-floating rx-floating-top"><span className="rx-floating-symbol"><Waves size={19}/></span><span>RADONIK LAB<br/><strong>اندازه‌گیری پرتویی</strong></span></div>
         <div className="rx-floating rx-floating-bottom"><span className="rx-mini-signal"><i/><i/><i/><i/><i/></span><span><small>RADIATION DETECTION</small><strong>فناوری ساخت ایران</strong></span></div>
       </div>
     </div>
     <div className="rx-shell rx-hero-foot"><span>PARTO NEGAR SHAHAB / IRAN</span><a href="#capabilities">بیشتر کشف کنید <ArrowDown size={15}/></a><span>SCIENCE × ENGINEERING × SAFETY</span></div>
   </section>

   <section className="rx-proof" aria-label="حوزه‌های فعالیت اصلی"><div className="rx-shell rx-proof-inner"><span className="rx-proof-label">یک مجموعه، چند تخصص</span><span><ScanLine/> تجهیزات اندازه‌گیری</span><span><ShieldCheck/> حفاظت پرتوی</span><span><Crosshair/> خدمات دزیمتری</span><span><GraduationCap/> آموزش تخصصی</span></div></section>

   <section id="capabilities" className="rx-section rx-shell"><div className="rx-section-top"><div><span className="rx-overline">01 / WHAT WE DO</span><h2>علم، مهندسی و ایمنی.<br/><em>در یک مسیر یکپارچه.</em></h2></div><p>هر نیاز پرتویی، راهکار تخصصی خود را می‌خواهد. از آشنایی با تجهیزات تا خدمات سنجش دز و آموزش.</p></div>
     <div className="rx-service-grid">{services.map((s,i)=>{const Icon=s.icon;return <Link href={s.href} className={`rx-service rx-service-${i+1}`} key={s.n}><div className="rx-service-head"><span>{s.n} / {s.tag}</span><ArrowUpLeft size={20}/></div><div className="rx-service-art"><Icon size={i===0?105:79} strokeWidth={0.75}/><div className="rx-service-ring"/></div><div className="rx-service-copy"><h3>{s.title}</h3><p>{s.desc}</p><span>اطلاعات بیشتر <ArrowUpLeft size={17}/></span></div></Link>})}</div>
   </section>

   <section className="rx-statement"><div className="rx-shell rx-statement-inner"><div className="rx-statement-icon"><Fingerprint size={45} strokeWidth={1}/></div><p>وقتی دقت اهمیت دارد،<br/><strong>انتخاب فناوری مناسب، یک تصمیم کلیدی است.</strong></p><Link href="/about">با رادونیک آشنا شوید <ArrowUpLeft size={17}/></Link></div></section>

   <section id="products" className="rx-section rx-products-section"><div className="rx-shell"><div className="rx-section-top"><div><span className="rx-overline">02 / PRODUCT DISCOVERY</span><h2>کاتالوگ تخصصی،<br/><em>انتخاب هوشمندتر.</em></h2></div><p>با فیلتر دسته‌بندی و جستجوی مدل، سریع‌تر محصول یا دورهٔ مورد نیازتان را پیدا کنید.</p></div><HomeExplorer products={products} categories={categories}/></div></section>

   <section className="rx-section rx-shell rx-about"><div className="rx-about-art"><div className="rx-about-grid"/><div className="rx-about-mark"><Atom size={95} strokeWidth={.6}/><span>R</span></div><span className="rx-about-tag">R&D / ENGINEERING / SCIENCE</span><div className="rx-about-badge"><Sparkles size={17}/> فناوری و پژوهش کاربردی</div></div><div className="rx-about-text"><span className="rx-overline">03 / ABOUT RADONIK</span><h2>پشت هر اندازه‌گیری،<br/><em>یک نگاه مهندسی.</em></h2><p>{company.about}</p><p>{company.story}</p><div className="rx-about-points"><span><CheckCircle2 size={17}/> فعالیت در پارک فناوری پردیس</span><span><CheckCircle2 size={17}/> خدمات تخصصی مرتبط با فناوری پرتوی</span></div><Link href="/about" className="rx-button rx-button-dark">درباره شرکت <ArrowUpLeft size={18}/></Link></div></section>

   <section className="rx-section rx-industries"><div className="rx-shell"><div className="rx-section-top"><div><span className="rx-overline">04 / INDUSTRIES</span><h2>برای صنعت، سلامت<br/><em>و محیط‌های حساس.</em></h2></div><p>از مراکز درمانی تا محیط‌های صنعتی و تحقیقاتی، نیازها متفاوت‌اند؛ نقطه مشترک، اهمیت حفاظت و سنجش دقیق است.</p></div><div className="rx-industries-grid">{sectors.map((x,i)=><article className="rx-industry" key={x.title}><div className="rx-industry-ico"><x.icon size={31} strokeWidth={1.5}/></div><span>0{i+1} / SECTOR</span><h3>{x.title}</h3><p>{x.text}</p><Link href="/contact" aria-label={`مشاوره درباره ${x.title}`}><ArrowUpLeft size={18}/></Link></article>)}</div></div></section>

   <section className="rx-section rx-learning rx-shell" id="education"><div className="rx-section-top"><div><span className="rx-overline">05 / KNOWLEDGE & TRAINING</span><h2>آموزش تخصصی؛<br/><em>دانش قابل استفاده.</em></h2></div><Link href="/education" className="rx-text-link">مشاهده همه دوره‌ها <ArrowUpLeft size={17}/></Link></div><div className="rx-learning-grid"><div className="rx-learning-feature"><div><span>RADIATION SAFETY / EDUCATION</span><GraduationCap size={42} strokeWidth={1.2}/></div><h3>آموزش حفاظت در برابر اشعه و کارگاه‌های تخصصی دزیمتری</h3><p>دوره‌های معرفی‌شده توسط شرکت پرتو نگار شهاب؛ جزئیات و درخواست ثبت‌نام را در بخش آموزش بررسی کنید.</p><Link href="/education">بررسی دوره‌ها <ArrowUpLeft size={17}/></Link></div><div className="rx-learning-list">{products.filter(p=>["med-basic","med-pro","laser","industrial"].includes(p.id)).map((p,i)=><Link href={`/shop/${p.id}`} key={p.id}><span>0{i+1}</span><div><h3>{p.title}</h3><small>{priceLabel(p.price)} · استعلام قبل از پرداخت</small></div><ArrowUpLeft size={20}/></Link>)}</div></div></section>

   <section className="rx-section rx-credentials" id="credentials"><div className="rx-shell rx-credentials-inner"><div><span className="rx-overline">06 / CREDENTIALS</span><h2>اعتماد از مسیر<br/><em>شفافیت و مستندات.</em></h2><p>عناوین مجوزهای اعلام‌شده توسط شرکت؛ برای دریافت سند و بررسی اعتبار جاری از شرکت درخواست مدرک کنید.</p><Link href="/contact" className="rx-text-link">درخواست مدارک و اطلاعات <ArrowUpLeft size={17}/></Link></div><div className="rx-credentials-list">{permits.slice(0,5).map((name,i)=><div key={name}><span className="rx-credential-icon"><ClipboardCheck size={19}/></span><strong>{name}</strong><span>{String(i+1).padStart(2,"0")}</span></div>)}</div></div></section>

   <section className="rx-section rx-shell rx-insights"><div className="rx-section-top"><div><span className="rx-overline">07 / SCIENCE JOURNAL</span><h2>با دانش بیشتر،<br/><em>دقیق‌تر تصمیم بگیرید.</em></h2></div><Link href="/insights" className="rx-text-link">دانشنامه رادونیک <ArrowUpLeft size={17}/></Link></div><div className="rx-insight-grid">{articles.slice(0,3).map((name,i)=><Link href={`/insights#article-${i+1}`} key={name}><div className="rx-insight-figure"><span>INSIGHT 0{i+1}</span>{i===0?<Atom size={70} strokeWidth={.8}/>:i===1?<Radar size={70} strokeWidth={.8}/>:<BookOpen size={70} strokeWidth={.8}/>}</div><div><span>مقاله آموزشی</span><h3>{name}</h3><small>مشاهده در دانشنامه <ArrowUpLeft size={15}/></small></div></Link>)}</div></section>

   <section className="rx-section rx-faq"><div className="rx-shell rx-faq-inner"><div><span className="rx-overline">08 / COMMON QUESTIONS</span><h2>پرسش‌های متداول،<br/><em>پاسخ‌های روشن.</em></h2><p>در مورد خرید تجهیزات، دوره‌ها یا مدارک سؤالی دارید؟ از اینجا شروع کنید.</p><Link href="/contact" className="rx-text-link">سؤال دیگری دارم <ArrowUpLeft size={17}/></Link></div><div className="rx-faq-list">{faqs.map((item,i)=><details key={item.q}><summary><span>0{i+1}</span><strong>{item.q}</strong><ChevronDown size={20}/></summary><p>{item.a}</p></details>)}</div></div></section>

   <section className="rx-shell rx-cta"><div className="rx-cta-glow"/><span className="rx-overline">LET'S TALK / RADONIK</span><h2>برای یک انتخاب دقیق‌تر،<br/><em>از گفت‌وگو شروع کنیم.</em></h2><p>برای دریافت اطلاعات تجهیزات، خدمات دزیمتری و دوره‌های آموزشی از راه‌های رسمی ارتباط با شرکت استفاده کنید.</p><div className="rx-cta-actions"><Link href="/contact" className="rx-button rx-button-mint">ارتباط با رادونیک <ArrowUpLeft size={19}/></Link><a href={`tel:${company.phones[0]}`} className="rx-button rx-button-outline-white"><Phone size={17}/>{company.phones[0]}</a></div><span className="rx-cta-footer">پرتو نگار شهاب / پارک فناوری پردیس</span></section>
 </div>;
}