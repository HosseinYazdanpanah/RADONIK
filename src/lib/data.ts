// Verified editorial snapshot from radonik.com, observed 2026-10-28.
// These are not claims of current stock, license validity or guaranteed prices.
export const SOURCE="";
export type Category={id:string;name:string;source:string};
export const categories:Category[]=[
{id:"education",name:"آموزش",source:"/shop?category=education"},
{id:"protection",name:"تجهیزات حفاظت پرتوی",source:"/shop?category=protection"},
{id:"dosimetry",name:"خدمات دزیمتری فردی",source:"/shop?category=dosimetry"},
{id:"readers",name:"خوانشگرهای دزیمتر TLD",source:"/shop?category=readers"},
{id:"tld",name:"دزیمترهای TLD و تجهیزات جانبی",source:"/shop?category=tld"},
{id:"digital",name:"دزیمترهای فردی و محیطی دیجیتال",source:"/shop?category=digital"},
{id:"systems",name:"سامانه ها و سایر تجهیزات",source:"/shop?category=systems"},
{id:"detectors",name:"سایر انواع آشکارسازها",source:"/shop?category=detectors"},
{id:"spectroscopy",name:"طیف نگارها و تجهیزات جانبی",source:"/shop?category=spectroscopy"},
{id:"emergency",name:"کیتهای مدیریت بحران پرتوی",source:"/shop?category=emergency"}];
export type Product={id:string;title:string;category:string;price:number|null;image?:string;url?:string;summary?:string};
const p=(id:string,title:string,category:string,price:number|null):Product=>({id,title,category,price});
export const products:Product[]=[
{...p("cp4100a","دزیمتر دیجیتال (الکترونیکی) فردی و محیطی مدل CP4100A","digital",115000000),image:"/brand/cp4100a-editorial.webp",summary:"دستگاه اندازه گیری دیجیتال دز برای دزیمتری پرتوهای ایکس و گاما، پایش محیط و جستجوی چشمه‌های رادیواکتیو."},
{...p("gr5100","دستگاه خوانشگر TLD برای دزیمترهای دانه-شیشه‌ای (Glass bead) مدل GR5100","readers",6800000000),summary:"بر اساس توضیح صفحه محصول، نمونه اولیه ساخته شده و آزمون‌های استاندارد در حال نهایی‌سازی هستند."},
p("cp4100","دزیمتر دیجیتال (الکترونیکی) فردی و محیطی مدل CP4100","digital",140000000),
p("sm4200","دزیمتر دیجیتال (الکترونیکی) محیطی (با قابلیت استفاده فردی) مدل SM4200","digital",170000000),
p("med-basic","دوره حفاظت در برابر اشعه برای مراکز پزشکی (دوره مقدماتی)","education",3500000),
p("med-pro","دوره حفاظت در برابر اشعه برای مسئولین مراکز پزشکی (دوره پیشرفته)","education",3800000),
p("laser","دوره حفاظت در برابر اشعه برای پرتوهای لیزر","education",2200000),
p("industrial","دوره حفاظت در برابر اشعه برای مراکز صنعتی ‌(غيرپرتونگاری)","education",3500000),
p("repeat","ثبت نام آزمون مجدد دوره های حفاظت در برابر اشعه","education",350000),
p("tld-training","دوره آموزشی دزیمتری فردی به روش ترمولومینسانس (TLD)","education",0),
p("optical","دوره حفاظت در برابر اشعه برای پرتوهای نوری","education",2200000),
p("refresher","دوره بازآموزی حفاظت در برابر اشعه برای مراکز صنعتی ‌(غيرپرتونگاری)","education",2200000),
p("ring","بج دزیمتر انگشتری TLD (نگهدارنده انگشتی دزیمتر TLD) بدون قرص TLD","tld",3000000),
p("wrench","آچار قاب (بج) TLD","tld",5400000),
p("twocard","کارت TLD دو چیپ","tld",6000000),
p("lead-glasses","عینک سربی با لنز RX مدل بغل دار","protection",14500000),
p("lead-glasses-no","عینک سربی با لنز RX مدل بدون بغل","protection",9800000),
p("neutron","قاب نگهدارنده (بج) قرص TLD مخصوص نوترون","tld",2400000),
p("xray","قاب نگهدارنده (بج) دزیمتر فردی TLD مخصوص فوتون های ایکس و گاما","tld",1000000),
p("rk6100","آون (کوره) الکتریکی مدل RK6100 ویژه عملیات حرارتی روی دزیمترهای TLD","tld",90000000),
p("rh30","بج دزیمتر TLD مدل RH-30","tld",2000000),
p("rh36","بج دزیمتر محیطی TLD مدل RH-36","tld",3000000),
p("eye","پیشانی بند نگهدارنده دزیمتر چشم بدون قرص TLD","tld",12000000),
p("tweezer","دستگاه پنس مکنده قرص و چیپ دزیمتر (Vacuum Tweezer)","tld",75000000),
p("ir5700","دستگاه تابش دهی (Irradiator) دزیمتر TLD مدل IR5700","tld",null),
p("annealing","ظرف پوشش دار بازپخت (Annealing)","tld",4500000),
p("kit-a","کیت تجهیزات ایمنی پرتوی نوع A","emergency",null),
p("kit-b","کیت تجهیزات ایمنی پرتویی و خدمات دزیمتری نوع B","emergency",null),
p("kit-c","کیت تجهیزات ایمنی و مدیریت سوانح پرتویی نوع C","emergency",null),
p("ew","سامانه هشدار آنی پایش تشعشعات محیطی (EW)","systems",null),
p("radon","آشکارساز رادون خانگی قابل حمل Airthings مدل Corentium Home","detectors",91000000),
p("uv","دستگاه UV لایت متر LUTRON مدل 340A","detectors",null),
p("mylar","ورق مایلار (Mylar)","protection",400000),
p("como","رادیومتر و سنجش آلودگی GRAETZ مدل CoMo-170-300","detectors",15000000),
p("wintact","گازسنج وینتکت (wintact) مدل WT8812","detectors",18000000),
p("lead-bar","راسته سربی","protection",2350000),
p("lead-brick","آجر سربی (گوشه)","protection",3150000),
p("syringe","حفاظ سرنگ","protection",5200000),
p("waste","جعبه پسماند","protection",56000000),
p("lead-bucket","سطل سربی سایز متوسط","protection",27000000),
p("carrier-syringe","شیلد حمل سرنگ تک کانال و چهار کانال","protection",6400000),
p("carrier-vial","شیلد حمل ویال رادیو دارو","protection",8000000),
p("glove","گلاوباکس","protection",49000000),
p("screen","پاراوان سربی","protection",29500000),
p("lead-sheet","ورق سربی ۲ متر عرض ۵۰ سانت- ضخامت 2 میل","protection",7800000),
p("tr5400","دستگاه خوانشگر TLD مدل TR5400","readers",1150000000),
p("cobalt","باکس پرتودهی با لایه بیلداپ و قابلیت پرتودهی در هر دو میدان های فوتونی کبالت-60 و سزیوم-137","tld",3500000)
];
export const company={
name:"شرکت دانش‌بنیان پرتو نگار شهاب",
about:"شرکت دانش‌بنیان پرتونگار شهاب (عضو و مستقر در پارک فناوری پردیس) به صورت تخصصی در زمینه طراحی، ساخت، مشاوره، آموزش و ارائه کلیه خدمات تجهیزات ایمنی، آشکارسازی و اندازه‌گیری پرتویی، فعالیت داشته و توانسته‌ است مجوزهای متنوعی را از سازمان انرژی اتمی و تأییدیه‌هایی از معاونت علمی و فناوری ریاست جمهور نیز کسب نماید.",
story:"این شرکت دانش بنیان با دارا بودن تیم تخصصی و واحد R&D فعال و پویا و با هدف ارتقاء ایمنی پرتوی در مراکز کار با پرتو در سطح کشور طی سال‌های گذشته تولیدات فناورانه کاربردی در این صنعت را به تولید رسانده است.",
address:"استان تهران، پارک فناوری پردیس، خیابان نوآوری 4، پلاک 43، مجتمع نوآوران، طبقه 2، واحد 301",
phones:["02126644613","02178990216"],mobile:"09191240682",fax:"02178990121",email:"info@Radonik.com"};
export const articles=["دزیمتری پرتویی یا تابشی چیست؟","دزیمتری فردی و محیطی چیست؟","انواع دستگاه خوانشگر TLD ساخت کمپانی Harshaw","دزیمتری و کاربرد آن در پزشکی","پدیده ترمولومینسانس (TL) چیست؟"];
export const permits=["مجوز برگزاری دوره‌های آموزشی حفاظت در برابر اشعه","نماینده انحصاری شرکت Epic Crystal در ایران، تولید کننده انواع آشکارسازها و سوسوزن ها","مجوز ارائه خدمات منابع پرتو با كاربرد غيرپزشکی","گواهی شرکت دانش‌بنیان","مجوز ارائه خدمات دزیمتری فردی ترمولومینسانس (نوترون)","مجوز ارائه خدمات دزیمتری دست و پا، لنز چشم","مجوز ارائه خدمات دزیمتری فردی ترمولومینسانس (فوتون و بتا)"];
export function priceLabel(n:number|null){return n===null?"استعلام قیمت":new Intl.NumberFormat("fa-IR").format(n)+" تومان";}
export function oldProductLink(item:Product){return "/shop/"+item.id;}
