
const $=s=>document.querySelector(s);
const bn=n=>String(n).replace(/\d/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
if(window.top!==window.self)document.documentElement.style.display="none";
const EMO=["🚀","🎬","🎮","📚","🛒","💼","🎧","📰","💡","🌍","🔥","⭐","🍕","🎨","📷","💬","🏆","🧠","⚡","🎯","🌈","🦋","🐯","🦊","🍀","💎","🎵","🧩","🔮","🌙"];
const B64R=/^[A-Za-z0-9+\/=]+$/,ENCR=/^[A-Za-z0-9+\/=]+\.[A-Za-z0-9+\/=]+$/,IMGR=/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/;
const str=(v,n)=>typeof v==="string"?v.slice(0,n):"";
function clean(a){return(Array.isArray(a)?a:[]).slice(0,500).map((x,i)=>{if(!x||typeof x!=="object")return null;
 const o={id:Number.isFinite(+x.id)?+x.id:Date.now()+i,name:str(x.name,60),url:str(x.url,500),fav:x.fav?1:0};if(!o.name||!o.url)return null;
 const ct=str(x.cat,20).trim();if(ct)o.cat=ct;if(+x.n>0)o.n=Math.min(+x.n|0,1e6);if(+x.t>0)o.t=+x.t;
 if(ENCR.test(x.u||""))o.u=x.u;if(ENCR.test(x.p||""))o.p=x.p;const c=x.ic;
 if(c&&c.t==="img"&&IMGR.test(c.v||"")&&c.v.length<200000)o.ic={t:"img",v:c.v};
 else if(c&&c.t==="L")o.ic={t:"L"};
 else if(c&&c.t==="e"&&EMO.includes(c.v))o.ic={t:"e",v:c.v,h:(+c.h||0)%360};
 return o}).filter(Boolean)}
const cleanMeta=m=>m&&B64R.test(m.salt||"")&&ENCR.test(m.chk||"")?{salt:m.salt,chk:m.chk,it:m.it===250000?250000:150000}:null;
const DEF=$("#fav").getAttribute("href");
let LOGO=DEF;function applyLogo(){let v=DEF;try{const l=localStorage.getItem("wh_logo");if(l&&IMGR.test(l))v=l}catch(e){}
 LOGO=v;$("#applogo").src=v;$("#fav").href=v;let a=document.querySelector("link[rel=apple-touch-icon]");
 if(!a){a=document.createElement("link");a.rel="apple-touch-icon";document.head.appendChild(a)}a.href=v}
let sites=[],meta=null,key=null,tab="home",seed=true;
try{seed=localStorage.getItem("wh_sites")===null;sites=clean(JSON.parse(localStorage.getItem("wh_sites")||"[]"));meta=cleanMeta(JSON.parse(localStorage.getItem("wh_vault")||"null"))}catch(e){}
if(!sites.length&&seed)sites=[["ফেসবুক","facebook.com"],["ইউটিউব","youtube.com"],["গুগল","google.com"]].map((a,i)=>({id:Date.now()+i,name:a[0],url:a[1],fav:0}));
const save=()=>{try{localStorage.setItem("wh_sites",JSON.stringify(sites))}catch(e){toast("সেভ করা যায়নি")}};
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=u=>{u=String(u||"").trim();if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(u))u="https://"+u;try{const x=new URL(u);return/^https?:$/.test(x.protocol)?x.href:"about:blank"}catch(e){return"about:blank"}};
const openSite=s=>{const u=norm(s.url);if(u==="about:blank")return toast("URL ঠিক নেই");s.n=(s.n||0)+1;s.t=Date.now();save();window.open(u,"_blank","noopener,noreferrer")};
const host=u=>{try{return new URL(norm(u)).hostname.replace(/^www\./,"")||u}catch(e){return u}};
const color=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%360;return`hsl(${h} 55% 50%)`};
const initial=n=>esc([...n.trim()][0]||"?").toUpperCase();

/* ---- crypto: PIN -> AES-GCM ---- */
const b64=b=>btoa(String.fromCharCode(...new Uint8Array(b)));
const unb=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function derive(pin,salt,it){const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(pin),"PBKDF2",false,["deriveKey"]);
return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:it,hash:"SHA-256"},k,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function enc(t){const iv=crypto.getRandomValues(new Uint8Array(12));const c=await crypto.subtle.encrypt({name:"AES-GCM",iv},key,new TextEncoder().encode(t));return b64(iv)+"."+b64(c)}
async function dec(s){const[i,c]=s.split(".");return new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:unb(i)},key,unb(c)))}
function needKey(then){
 if(key)return then();
 const first=!meta;
 openSheet(`<h3>${first?"পিন সেট করুন":"পিন দিন"}</h3><p class="hint">${first?"আইডি/পাসওয়ার্ড এই পিন দিয়ে লক থাকবে। পিন ভুলে গেলে পাসওয়ার্ড উদ্ধার করা যাবে না।":"সেভ করা পাসওয়ার্ড দেখতে পিন লাগবে।"}</p>
 <label>${first?"পিন (কমপক্ষে ৬ অক্ষর)":"পিন"}</label><input id="pin" type="password" autocomplete="off">
 <div class="row"><button class="btn" data-close="1">বাতিল</button><button class="btn p" id="pok">ঠিক আছে</button></div>`);
 $("#pok").onclick=async()=>{
  const pin=$("#pin").value;let L={};try{L=JSON.parse(localStorage.getItem("wh_lock")||"{}")}catch(e){}
  if(L.t>Date.now())return toast("অনেকবার ভুল হয়েছে, "+bn(Math.ceil((L.t-Date.now())/1000))+" সেকেন্ড পরে চেষ্টা করুন");
  if(first&&pin.length<6)return toast("কমপক্ষে ৬ অক্ষরের পিন দিন");
  if(!pin)return toast("পিন দিন");
  try{
   if(first){const salt=crypto.getRandomValues(new Uint8Array(16));key=await derive(pin,salt,250000);meta={salt:b64(salt),it:250000,chk:await enc("ok")};localStorage.setItem("wh_vault",JSON.stringify(meta))}
   else{key=await derive(pin,unb(meta.salt),meta.it||150000);
    try{if(await dec(meta.chk)!=="ok")throw 0}catch(e){key=null;const n=(+L.n||0)+1;localStorage.setItem("wh_lock",JSON.stringify({n,t:n>=5?Date.now()+Math.min(30000*2**(n-5),3600000):0}));return toast("ভুল পিন")}}
  }catch(e){key=null;return toast("এই ব্রাউজারে লক সাপোর্ট নেই")}
  try{localStorage.removeItem("wh_lock")}catch(e){}
  closeSheet();then()};
}

/* ---- sheet ---- */
function openSheet(h){$("#sh").innerHTML=h;$("#ov").classList.add("show")}
function closeSheet(){$("#ov").classList.remove("show")}
function ask(msg,yes){openSheet(`<h3>${esc(msg)}</h3><div class="row"><button class="btn" data-close>না</button><button class="btn d" id="yy">হ্যাঁ</button></div>`);$("#yy").onclick=()=>{closeSheet();yes()}}
$("#ov").addEventListener("click",e=>{if(e.target.id==="ov"||e.target.closest("[data-close]"))closeSheet()});
const wf=i=>{if(i._w)return;i._w=1;const ok=()=>i.naturalWidth>=24?i.classList.add("ok"):i.remove();if(i.complete)i.naturalWidth?ok():i.remove();else{i.onload=ok;i.onerror=()=>i.remove()}};
new MutationObserver(()=>document.querySelectorAll("img[data-fav]").forEach(wf)).observe(document.body,{childList:true,subtree:true});

/* ---- prefs ---- */
const parsePrefs=x=>{x=x||{};return{view:x.view==="list"?"list":"grid",cols:[3,4,5].includes(x.cols)?x.cols:4,accent:[345,265,175,38,215].includes(x.accent)?x.accent:345,theme:["auto","dark","light"].includes(x.theme)?x.theme:"auto",sort:["added","name","used"].includes(x.sort)?x.sort:"added",auto:x.auto===0?0:1}};
let P=parsePrefs();try{P=parsePrefs(JSON.parse(localStorage.getItem("wh_prefs")||"{}"))}catch(e){}
const savePrefs=()=>{try{localStorage.setItem("wh_prefs",JSON.stringify(P))}catch(e){}};
function applyPrefs(){const r=document.documentElement;r.style.setProperty("--h",P.accent);r.style.setProperty("--cols",P.cols);if(P.theme==="auto")delete r.dataset.theme;else r.dataset.theme=P.theme}

/* ---- logo ---- */
function icoHtml(s){
 const c=s.ic;
 if(c&&c.t==="img"&&IMGR.test(c.v))return`<div class="ico"><img src="${c.v}" alt=""></div>`;
 if(c&&c.t==="e"){const h=(+c.h||0)%360;return`<div class="ico" style="background:linear-gradient(135deg,hsl(${h} 65% 58%),hsl(${(h+40)%360} 65% 40%))">${esc(c.v)}</div>`}
 if(c&&c.t==="L")return`<div class="ico" style="background:${color(s.name||"?")}">${initial(s.name||"?")}</div>`;
 return`<div class="ico"><img src="${LOGO}" alt="">${P.auto&&s.url&&host(s.url)?`<img class="fv" data-fav="1" src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(host(s.url))}&sz=128" alt="">`:""}</div>`;
}
function cropImg(file,Z=96){return new Promise((ok,no)=>{const r=new FileReader();r.onerror=no;r.onload=()=>{const i=new Image();i.onerror=no;i.onload=()=>{const z=Math.min(i.width,i.height),c=document.createElement("canvas");c.width=c.height=Z;c.getContext("2d").drawImage(i,(i.width-z)/2,(i.height-z)/2,z,z,0,0,Z,Z);ok(c.toDataURL("image/jpeg",.85))};i.src=r.result};r.readAsDataURL(file)})}

/* ---- render ---- */
let cat="",q="",lp=0,lpT;
const cats=()=>[...new Set(sites.map(s=>s.cat).filter(Boolean))];
function greet(){const h=new Date().getHours();return`শুভ ${h<5?"রাত":h<12?"সকাল":h<16?"দুপুর":h<18?"বিকেল":h<20?"সন্ধ্যা":"রাত"} · ${bn(sites.length)}টি সাইট`}
function list(){let l=sites.filter(s=>tab!=="fav"||s.fav);if(cat)l=l.filter(s=>s.cat===cat);
 if(q){const k=q.toLowerCase();l=l.filter(s=>(s.name+" "+s.url).toLowerCase().includes(k))}
 if(P.sort==="name")l=[...l].sort((a,b)=>a.name.localeCompare(b.name,"bn"));else if(P.sort==="used")l=[...l].sort((a,b)=>(b.n||0)-(a.n||0));return l}
const badges=s=>(s.fav?'<i class="bd st">★</i>':"")+(s.u||s.p?'<i class="bd ky">🔒</i>':"");
const appHtml=s=>`<div class="app" role="button" tabindex="0" data-o="${s.id}"><div class="wrap">${icoHtml(s)}${badges(s)}</div><span class="nm">${esc(s.name)}</span></div>`;
const rowHtml=s=>`<div class="li" role="button" tabindex="0" data-o="${s.id}"><div class="wrap">${icoHtml(s)}${badges(s)}</div><div class="tx"><b>${esc(s.name)}</b><small>${esc(host(s.url))}${s.cat?" · "+esc(s.cat):""}</small></div><button class="mo" data-m="${s.id}" aria-label="আরও">⋯</button></div>`;
function render(){
 $("#greet").textContent=greet();
 const isSet=tab==="set";document.body.classList.toggle("s",isSet);
 const m=$("#main");if(isSet)return settings(m);
 const cs=cats();if(cat&&!cs.includes(cat))cat="";
 $("#chips").innerHTML=cs.length?`<button class="chip${cat?"":" on"}" data-c="">সব</button>`+cs.map(c=>`<button class="chip${cat===c?" on":""}" data-c="${esc(c)}">${esc(c)}</button>`).join(""):"";
 const l=list();let h="";
 if(!l.length)h=`<div class="empty">${q?"কিছু পাওয়া যায়নি":tab==="fav"?"কোনো প্রিয় সাইট নেই।<br>আইকন চেপে ধরে ★ দিন।":"কোনো সাইট নেই।<br>নিচের + বাটনে চেপে যোগ করুন।"}</div>`;
 else{
  const rc=tab==="home"&&!q&&!cat?sites.filter(s=>s.t).sort((a,b)=>b.t-a.t).slice(0,P.cols):[];
  if(rc.length)h+=`<section class="rc"><h2>সম্প্রতি খোলা</h2><div class="grid">${rc.map(appHtml).join("")}</div></section><h2 class="hd">সব সাইট</h2>`;
  h+=P.view==="list"?l.map(rowHtml).join(""):`<div class="grid">${l.map(appHtml).join("")}</div>`;
  h+=`<p class="tip">টিপস: আইকন চেপে ধরলে এডিট, প্রিয় ও পাসওয়ার্ডের অপশন আসে।</p>`;
 }
 m.innerHTML=h;
}
const seg=(k,o)=>`<div class="seg">${o.map(x=>`<button data-p="${k}" data-v="${x[0]}" class="${P[k]===x[0]?"on":""}">${x[1]}</button>`).join("")}</div>`;
function settings(m){
 $("#chips").innerHTML="";
 m.innerHTML=`<div class="card"><h3>চেহারা</h3><p class="lbl">থিম</p>${seg("theme",[["auto","অটো"],["dark","ডার্ক"],["light","লাইট"]])}
 <p class="lbl">রঙ</p><div class="sws">${[345,265,175,38,215].map(h=>`<button class="sw${P.accent===h?" on":""}" style="--s:${h}" data-p="accent" data-v="${h}" aria-label="রঙ বাছুন"></button>`).join("")}</div>
 <p class="lbl">দেখানোর ধরন</p>${seg("view",[["grid","গ্রিড"],["list","লিস্ট"]])}
 <p class="lbl">প্রতি সারিতে আইকন</p>${seg("cols",[[3,"৩টি"],[4,"৪টি"],[5,"৫টি"]])}
 <p class="lbl">সাজানো</p>${seg("sort",[["added","যোগের ক্রম"],["name","নাম"],["used","বেশি ব্যবহৃত"]])}</div>
 <div class="card"><h3>লোগো</h3><p>সাইটের নিজের লোগো থাকলে সেটি দেখানো হয়, না থাকলে অ্যাপের লোগো।</p>
 <p class="lbl">সাইটের লোগো অনলাইন থেকে আনা</p>${seg("auto",[[1,"চালু"],[0,"বন্ধ"]])}
 <p class="hint" style="margin-top:8px">চালু থাকলে সাইটের ডোমেইন নাম গুগলের লোগো সার্ভিসে যায়।</p>
 <p class="lbl">অ্যাপের লোগো</p><div class="rw"><button class="btn" id="al">🖼 নিজের ছবি</button><button class="btn" id="ar">↺ ডিফল্ট</button></div><input type="file" id="alf" accept="image/*" hidden></div>
 <div class="card"><h3>নিরাপত্তা</h3><p>পাসওয়ার্ড AES-256 দিয়ে এনক্রিপ্ট হয়ে শুধু এই ফোনে থাকে। ৫ বার ভুল পিনে সাময়িক লক হয়, আর অ্যাপ ছেড়ে গেলে বা ৩ মিনিট বসে থাকলে নিজে থেকে লক হয়।</p>
 <button class="btn w" id="lk">🔒 এখনই লক করুন</button><button class="btn d w" id="wp">সব ডেটা মুছুন</button></div>
 <div class="card"><h3>ব্যাকআপ</h3><p>সাইট, ক্যাটাগরি ও লক করা পাসওয়ার্ড ফাইলে সেভ করুন বা ফিরিয়ে আনুন। ফাইলটি নিরাপদ জায়গায় রাখুন।</p>
 <div class="rw"><button class="btn" id="ex">নামান</button><button class="btn" id="im">ফেরত আনুন</button></div><input type="file" id="fi" accept=".json" hidden></div>
 <div class="card"><h3>ক্রোমে ব্যবহার</h3><p>ক্রোমে এই পেজ খুলে ⋮ → "Add to Home screen" দিন। কোনো সাইটে ট্যাপ করলে সেটি ক্রোমের নতুন ট্যাবে খুলবে। সাইটে একবার লগইন করে "Save password" দিলে ক্রোমই পরে অটো-ফিল করবে।</p></div>`;
 m.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{const k=b.dataset.p,v=b.dataset.v;P[k]=["cols","accent","auto"].includes(k)?+v:v;savePrefs();applyPrefs();render()});
 $("#al").onclick=()=>$("#alf").click();
 $("#alf").onchange=async e=>{try{localStorage.setItem("wh_logo",await cropImg(e.target.files[0],192));applyLogo();toast("লোগো বদলেছে")}catch(x){toast("ছবি পড়া যায়নি")}};
 $("#ar").onclick=()=>{try{localStorage.removeItem("wh_logo")}catch(e){}applyLogo();toast("ডিফল্ট লোগো ফিরেছে")};
 $("#lk").onclick=()=>{key=null;toast("লক হয়েছে")};
 $("#wp").onclick=()=>ask("সব সাইট, পাসওয়ার্ড, সেটিংস ও লোগো মুছে যাবে। নিশ্চিত?",()=>{["wh_sites","wh_vault","wh_lock","wh_logo","wh_prefs"].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});location.reload()});
 $("#ex").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({sites,meta,prefs:P})],{type:"application/json"}));a.download="heart-orbit-backup.json";a.click()};
 $("#im").onclick=()=>$("#fi").click();
 $("#fi").onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());if(!Array.isArray(d.sites))throw 0;sites=clean(d.sites);meta=cleanMeta(d.meta);key=null;P=parsePrefs(d.prefs);savePrefs();applyPrefs();save();if(meta)localStorage.setItem("wh_vault",JSON.stringify(meta));else localStorage.removeItem("wh_vault");toast("ফেরত আনা হয়েছে");tab="home";setNav()}catch(x){toast("ফাইলটি ঠিক নেই")}};
}
function setNav(){document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.t===tab));render()}

/* ---- add / edit ---- */
function form(s){
 const n=!s;s=s||{};let ic=s.ic||null;
 openSheet(`<h3>${n?"নতুন ওয়েবসাইট":"এডিট করুন"}</h3>
 <label>ওয়েবসাইটের নাম</label><input id="fn" maxlength="60" value="${esc(s.name)}" placeholder="যেমন: ফেসবুক">
 <label>URL</label><input id="fu" value="${esc(s.url)}" placeholder="facebook.com" inputmode="url" autocapitalize="off" autocomplete="off">
 <label>ক্যাটাগরি (ঐচ্ছিক)</label><input id="fc" maxlength="20" list="cl" value="${esc(s.cat)}" placeholder="যেমন: সোশ্যাল, কাজ"><datalist id="cl">${cats().map(c=>`<option value="${esc(c)}">`).join("")}</datalist>
 <label>লোগো</label><div class="lg"><div id="lp"></div><div class="lb">
 <button type="button" class="btn sm" id="la">🌐 অটো</button><button type="button" class="btn sm" id="lr">🎲 র‍্যান্ডম</button>
 <button type="button" class="btn sm" id="lu">🖼 ছবি</button><button type="button" class="btn sm" id="ll">Aa অক্ষর</button><input type="file" id="lf" accept="image/*" hidden></div></div>
 <p class="hint">অটো: সাইটের নিজের লোগো আসবে, না থাকলে অ্যাপের লোগো।</p>
 <label>আইডি / ইমেইল (ঐচ্ছিক)</label><input id="fi2" autocomplete="off" placeholder="${s.u?"বদলাতে নতুন আইডি লিখুন":""}">
 <label>পাসওয়ার্ড (ঐচ্ছিক)</label><input id="fp" type="password" autocomplete="new-password" placeholder="${s.p?"বদলাতে নতুন পাসওয়ার্ড লিখুন":""}">
 <p class="hint">আইডি/পাসওয়ার্ড দিলে পিন দিয়ে লক হয়ে ফোনেই থাকবে।</p>
 <div class="row"><button class="btn" data-close="1">বাতিল</button><button class="btn p" id="fs">সেভ করুন</button></div>`);
 const pv=()=>{$("#lp").innerHTML=icoHtml({name:$("#fn").value||"?",url:$("#fu").value,ic})};
 pv();$("#fn").oninput=()=>{if(ic&&ic.t==="L")pv()};$("#fu").onchange=pv;
 $("#la").onclick=()=>{ic=null;pv()};
 $("#lr").onclick=()=>{ic={t:"e",v:EMO[Math.random()*EMO.length|0],h:Math.random()*360|0};pv()};
 $("#ll").onclick=()=>{ic={t:"L"};pv()};
 $("#lu").onclick=()=>$("#lf").click();
 $("#lf").onchange=async e=>{try{ic={t:"img",v:await cropImg(e.target.files[0])};pv()}catch(x){toast("ছবি পড়া যায়নি")}};
 $("#fs").onclick=()=>{
  const name=$("#fn").value.trim().slice(0,60),url=$("#fu").value.trim().slice(0,500),u=$("#fi2").value,p=$("#fp").value,ct=$("#fc").value.trim().slice(0,20);
  if(!name||!url)return toast("নাম ও URL দিন");
  if(norm(url)==="about:blank")return toast("URL ঠিক নেই");
  const fin=async()=>{const o=n?{id:Date.now(),fav:0,n:0}:s;o.name=name;o.url=url;if(ic)o.ic=ic;else delete o.ic;if(ct)o.cat=ct;else delete o.cat;
   if(u||p){if(u)o.u=await enc(u);if(p)o.p=await enc(p)}
   if(n)sites.push(o);save();closeSheet();render()};
  const go=()=>{(u||p)?needKey(fin):fin()};
  if(n&&sites.some(x=>host(x.url)===host(url)))ask("এই সাইট আগে থেকেই আছে। আবার যোগ করবেন?",go);else go();
 };
}

/* ---- detail ---- */
function detail(id){
 const s=sites.find(x=>x.id===id);if(!s)return;
 openSheet(`<div class="dh"><div class="wrap">${icoHtml(s)}</div><div><h3>${esc(s.name)}</h3><p class="hint">${esc(host(s.url))}${s.n?" · "+bn(s.n)+" বার খোলা":""}</p></div></div>
 <button class="btn p w" id="do">ক্রোমে খুলুন</button>
 ${s.u||s.p?`<div class="row">${s.u?'<button class="btn" id="cu">আইডি কপি</button>':""}${s.p?'<button class="btn" id="cp">পাসওয়ার্ড কপি</button>':""}</div>`:""}
 <div class="acts"><button class="btn" id="df">${s.fav?"★ প্রিয় সরান":"☆ প্রিয়"}</button><button class="btn" id="de">✎ এডিট</button><button class="btn d" id="dd">🗑 মুছুন</button></div>`);
 $("#do").onclick=()=>{closeSheet();openSite(s);render()};
 $("#df").onclick=()=>{s.fav=s.fav?0:1;save();closeSheet();render()};
 $("#de").onclick=()=>form(s);
 $("#dd").onclick=()=>ask("মুছে ফেলবেন?",()=>{sites=sites.filter(x=>x.id!==id);save();render()});
 const cp=f=>()=>needKey(async()=>{try{await navigator.clipboard.writeText(await dec(s[f]));toast("কপি হয়েছে, ৩০ সেকেন্ডে মুছে যাবে");setTimeout(()=>{try{navigator.clipboard.writeText("")}catch(e){}},30000)}catch(e){toast("কপি করা যায়নি")}});
 if($("#cu"))$("#cu").onclick=cp("u");if($("#cp"))$("#cp").onclick=cp("p");
}

/* ---- events ---- */
const M=$("#main");
M.addEventListener("pointerdown",e=>{lp=0;clearTimeout(lpT);const t=e.target.closest("[data-o]");if(!t||e.target.closest("[data-m]"))return;lpT=setTimeout(()=>{lp=1;try{navigator.vibrate&&navigator.vibrate(15)}catch(x){}detail(+t.dataset.o)},450)});
["pointerup","pointerleave","pointercancel","pointermove"].forEach(v=>M.addEventListener(v,()=>clearTimeout(lpT)));
M.addEventListener("contextmenu",e=>{if(e.target.closest("[data-o]"))e.preventDefault()});
M.addEventListener("click",e=>{
 if(lp){lp=0;return}
 const mb=e.target.closest("[data-m]");if(mb)return detail(+mb.dataset.m);
 const t=e.target.closest("[data-o]");if(t){const s=sites.find(x=>x.id==t.dataset.o);if(s){openSite(s);render()}}});
M.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.dataset.o)e.target.click()});
$("#q").addEventListener("input",e=>{q=e.target.value.trim();render()});
$("#chips").addEventListener("click",e=>{const c=e.target.closest("[data-c]");if(c){cat=c.dataset.c;render()}});
$("#fab").onclick=()=>form();
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{tab=b.dataset.t;cat="";setNav()});
applyPrefs();applyLogo();setNav();
let idle,hid;const lock=()=>{key=null};
const bump=()=>{clearTimeout(idle);idle=setTimeout(lock,180000)};
["click","touchstart","keydown"].forEach(v=>addEventListener(v,bump,{passive:true}));
document.addEventListener("visibilitychange",()=>{if(document.hidden)hid=setTimeout(lock,60000);else clearTimeout(hid)});
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
