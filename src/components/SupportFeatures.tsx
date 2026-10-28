"use client";
import {useEffect,useRef,useState} from 'react';
import {Instagram,Linkedin,MessageCircle,Send,Phone,X,MessagesSquare,ArrowUpLeft,Mail,CheckCircle2} from 'lucide-react';
import Link from 'next/link';

type Msg={id:number;sender:'visitor'|'agent';body:string;created_at:string};
type Session={id:string;token:string};
const social = [
 {name:'اینستاگرام',href:'https://www.instagram.com/radonik.ir/',Icon:Instagram,color:'#ab407b'},
 {name:'لینکدین',href:'https://www.linkedin.com/company/radonik-pvt-ltd/',Icon:Linkedin,color:'#0969a7'},
 {name:'واتساپ',href:'https://wa.me/989025489832',Icon:MessageCircle,color:'#139e78'},
 // Telegram is shown only when the official profile URL is configured, to avoid wrong-account links.
 ...(process.env.NEXT_PUBLIC_RADONIK_TELEGRAM_URL ? [{name:'تلگرام',href:process.env.NEXT_PUBLIC_RADONIK_TELEGRAM_URL,Icon:Send,color:'#229ed9'}] : [])
];
const key='radonik_support_session_v1';
export default function SupportFeatures(){
 const [open,setOpen]=useState(false),[online,setOnline]=useState(false),[available,setAvailable]=useState(true);
 const [name,setName]=useState(''),[contact,setContact]=useState(''),[draft,setDraft]=useState(''),[session,setSession]=useState<Session|null>(null),[messages,setMessages]=useState<Msg[]>([]);
 const [busy,setBusy]=useState(false),[error,setError]=useState('');const end=useRef<HTMLDivElement>(null);
 useEffect(()=>{try{const stored=window.sessionStorage.getItem(key);if(stored)setSession(JSON.parse(stored) as Session);}catch{}},[]);
 useEffect(()=>{let active=true;async function check(){try{const r=await fetch('/api/support',{cache:'no-store'});const j=await r.json();if(active){setOnline(Boolean(j.online));setAvailable(Boolean(j.available));}}catch{if(active){setOnline(false);setAvailable(false)}}}void check();const t=window.setInterval(()=>void check(),30000);return()=>{active=false;window.clearInterval(t)}},[]);
 useEffect(()=>{if(!open||!session)return;let active=true;async function load(){try{const r=await fetch('/api/support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'read',...session})});const j=await r.json();if(active&&r.ok){setMessages(j.items||[]);setOnline(Boolean(j.online));}}catch{}}void load();const t=window.setInterval(()=>void load(),6500);return()=>{active=false;window.clearInterval(t)}},[open,session]);
 useEffect(()=>{if(open&&session)end.current?.scrollIntoView({behavior:'smooth',block:'nearest'});},[messages,open,session]);
 async function submit(e:React.FormEvent){e.preventDefault();if(busy||!draft.trim())return;setBusy(true);setError('');try{const body=session?{type:'send',...session,body:draft}:{type:'create',name,contact,body:draft};const r=await fetch('/api/support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json();if(!r.ok)throw Error(j.error||'خطا در ارسال پیام');if(!session&&j.id&&j.token){const s={id:j.id,token:j.token};sessionStorage.setItem(key,JSON.stringify(s));setSession(s);setMessages([{id:Date.now(),sender:'visitor',body:draft,created_at:new Date().toISOString()}]);}else setMessages(m=>[...m,{id:Date.now(),sender:'visitor',body:draft,created_at:new Date().toISOString()}]);setDraft('');}catch(e){setError(e instanceof Error?e.message:'پیام ارسال نشد.')}finally{setBusy(false)}}
 return <>
  <aside className="rx-social-rail" aria-label="شبکه‌های اجتماعی رادونیک">{social.map(({name,href,Icon,color})=><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`صفحه ${name} رادونیک`} title={name} key={name} style={{'--social-color':color} as React.CSSProperties}><Icon size={21} strokeWidth={2}/><span>{name}</span></a>)}</aside>
  <div className="rx-support-root">
   {open&&<section className="rx-support-panel" aria-label="گفت‌وگو با پشتیبانی" dir="rtl"><header className="rx-support-head"><div className="rx-support-emblem"><MessagesSquare size={25}/></div><div><strong>پشتیبانی رادونیک</strong><p><span className={online?'rx-presence online':'rx-presence'}/>{online?'اپراتور در دسترس است':'پیام خود را برای پیگیری ثبت کنید'}</p></div><button type="button" onClick={()=>setOpen(false)} aria-label="بستن پنجره چت"><X size={21}/></button></header>
    <div className="rx-support-body"><div className="rx-support-welcome"><div className="rx-support-bubble"><MessageCircle size={25}/></div><strong>سلام، به رادونیک خوش آمدید.</strong><p>{online?'سؤال خود را بفرستید. اپراتور حاضر می‌تواند در همین پنجره پاسخ بدهد.':'در حال حاضر اپراتور فعالی در پنل حضور ندارد. پیام و راه تماس خود را ثبت کنید تا بررسی شود.'}</p></div>
     {session? <div className="rx-support-messages" aria-live="polite">{messages.map(m=><div className={m.sender==='visitor'?'rx-support-msg mine':'rx-support-msg'} key={m.id}><span>{m.body}</span><small>{m.sender==='agent'?'پشتیبان':'شما'}</small></div>)}<div ref={end}/></div> : <><p className="rx-support-intro">برای شروع گفت‌وگو، نام و {online?'در صورت تمایل راه تماس':'شماره تماس یا ایمیل'} را وارد کنید.</p><label>نام شما<input form="radonik-support-form" value={name} onChange={e=>setName(e.target.value)} required minLength={2} maxLength={120} placeholder="نام و نام خانوادگی" autoComplete="name"/></label><label>راه تماس<input form="radonik-support-form" value={contact} onChange={e=>setContact(e.target.value)} required={!online} maxLength={200} placeholder="موبایل یا ایمیل" autoComplete="email"/></label></>}
     {error&&<p className="rx-support-error" role="alert">{error}</p>}
     {!available&&<p className="rx-support-error">سامانه ذخیره پیام موقتاً در دسترس نیست. لطفاً از تماس تلفنی یا ایمیل استفاده کنید.</p>}
    </div>
    <form id="radonik-support-form" className="rx-support-compose" onSubmit={submit}><label htmlFor="radonik-chat-message" className="sr-only">متن پیام</label><textarea id="radonik-chat-message" placeholder="پیامتان را بنویسید..." value={draft} required maxLength={2000} rows={2} onChange={e=>setDraft(e.target.value)}/><button type="submit" disabled={!available||busy||!draft.trim()} aria-label="ارسال پیام"><Send size={21}/></button></form>
    <div className="rx-support-bottom"><span><CheckCircle2 size={14}/> پاسخ پس از بررسی پیام</span><Link href="/contact" onClick={()=>setOpen(false)}>اطلاعات تماس <ArrowUpLeft size={14}/></Link></div>
   </section>}
   <button type="button" className="rx-support-fab" onClick={()=>setOpen(!open)} aria-label={open?'بستن پشتیبانی':'باز کردن پشتیبانی'} aria-expanded={open}>{open?<X size={28}/>:<MessageCircle size={31}/>}<span className={online?'rx-fab-dot is-online':'rx-fab-dot'}/></button>
  </div>
 </>;
}