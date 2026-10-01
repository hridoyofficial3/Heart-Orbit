
const $=s=>document.querySelector(s);
const bn=n=>P.lang==="en"?String(n):String(n).replace(/\d/g,d=>"০১২৩৪৫৬৭৮৯"[d]);
if(window.top!==window.self)document.documentElement.style.display="none";
const EMO=["🚀","🎬","🎮","📚","🛒","💼","🎧","📰","💡","🌍","🔥","⭐","🍕","🎨","📷","💬","🏆","🧠","⚡","🎯","🌈","🦋","🐯","🦊","🍀","💎","🎵","🧩","🔮","🌙"];
const B64R=/^[A-Za-z0-9+\/=]+$/,ENCR=/^[A-Za-z0-9+\/=]+\.[A-Za-z0-9+\/=]+$/,IMGR=/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/;
const str=(v,n)=>typeof v==="string"?v.slice(0,n):"";
function clean(a){return(Array.isArray(a)?a:[]).slice(0,500).map((x,i)=>{if(!x||typeof x!=="object")return null;
 const o={id:x.id>0&&Number.isFinite(+x.id)?+x.id:Date.now()+i,name:str(x.name,60),url:str(x.url,500),fav:x.fav?1:0};if(!o.name||!o.url)return null;
 const cl=[...new Set([...(Array.isArray(x.cs)?x.cs:[]),x.cat].map(c=>str(c,24).trim()).filter(Boolean))].slice(0,8);if(cl.length)o.cs=cl;const dsc=str(x.ds,200).trim();if(dsc)o.ds=dsc;if(+x.n>0)o.n=Math.min(+x.n|0,1e6);if(+x.t>0)o.t=+x.t;
 if(ENCR.test(x.u||""))o.u=x.u;if(ENCR.test(x.p||""))o.p=x.p;const c=x.ic;
 if(c&&c.t==="img"&&IMGR.test(c.v||"")&&c.v.length<200000)o.ic={t:"img",v:c.v};
 else if(c&&c.t==="L")o.ic={t:"L"};
 else if(c&&c.t==="e"&&EMO.includes(c.v))o.ic={t:"e",v:c.v,h:(+c.h||0)%360};
 return o}).filter(Boolean).map((o,i,a)=>{if(a.findIndex(y=>y.id===o.id)!==i)o.id=Date.now()*1000+i;return o})}
const cleanMeta=m=>m&&B64R.test(m.salt||"")&&ENCR.test(m.chk||"")?{salt:m.salt,chk:m.chk,it:m.it===250000?250000:150000}:null;
const DEF=$("#fav").getAttribute("href");
let LOGO=DEF;function applyLogo(){let v=DEF;try{const l=localStorage.getItem("wh_logo");if(l&&IMGR.test(l))v=l}catch(e){}
 LOGO=v;$("#applogo").src=v;$("#fav").href=v;let a=document.querySelector("link[rel=apple-touch-icon]");
 if(!a){a=document.createElement("link");a.rel="apple-touch-icon";document.head.appendChild(a)}a.href=v}
let sites=[],meta=null,key=null,tab="home",seed=true;
try{seed=localStorage.getItem("wh_sites")===null;sites=clean(JSON.parse(localStorage.getItem("wh_sites")||"[]"));meta=cleanMeta(JSON.parse(localStorage.getItem("wh_vault")||"null"))}catch(e){}
if(!sites.length&&seed)sites=[["ফেসবুক","facebook.com","সোশ্যাল মিডিয়া"],["ইউটিউব","youtube.com"],["গুগল","google.com"]].map((a,i)=>Object.assign({id:Date.now()+i,name:a[0],url:a[1],fav:0},a[2]?{cs:[a[2]]}:{}));
let saveBad=0;
const save=q=>{try{localStorage.setItem("wh_sites",JSON.stringify(sites));saveBad=0;return true}catch(e){saveBad=1;if(!q)toast("⚠ সেভ হয়নি! জায়গা শেষ — এখনই ব্যাকআপ নিন");return false}};
const stor=()=>{let n=0;try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);n+=k.length+localStorage.getItem(k).length}}catch(e){}return Math.min(100,Math.round(n/5e4))};
const cleanCats=a=>[...new Set((Array.isArray(a)?a:[]).map(c=>str(c,24).trim()).filter(Boolean))].slice(0,30);
let CATS;try{const r=localStorage.getItem("wh_cats");CATS=r===null?["সোশ্যাল মিডিয়া"]:cleanCats(JSON.parse(r))}catch(e){CATS=["সোশ্যাল মিডিয়া"]}
let BIN=[];try{BIN=JSON.parse(localStorage.getItem("wh_bin")||"[]").slice(0,200).map(x=>({t:+(x&&x.t)||0,s:clean([x&&x.s])[0]})).filter(x=>x.s&&Date.now()-x.t<2592e6)}catch(e){}
let LOG=[];try{LOG=JSON.parse(localStorage.getItem("wh_log")||"[]").filter(x=>Array.isArray(x)&&x[1]>0).slice(-1500)}catch(e){}
const saveBin=()=>{try{localStorage.setItem("wh_bin",JSON.stringify(BIN))}catch(e){toast("সেভ করা যায়নি")}};
const saveCats=()=>{try{localStorage.setItem("wh_cats",JSON.stringify(CATS))}catch(e){toast("সেভ করা যায়নি")}};
let toT,clipP=0;function toast(m,act){const t=$("#toast");t.textContent=m;t.classList.toggle("act",!!act);
 if(act){const b=document.createElement("button");b.textContent=act[0];b.onclick=()=>{t.classList.remove("show");act[1]()};t.appendChild(b)}
 t.classList.add("show");clearTimeout(toT);toT=setTimeout(()=>t.classList.remove("show"),act?6000:1800)}
const clipClr=()=>{if(!clipP)return;try{navigator.clipboard.writeText("").then(()=>{clipP=0},()=>{})}catch(e){}};
const bkGet=k=>{try{return+localStorage.getItem(k)||0}catch(e){return 0}};
try{if(localStorage.getItem("wh_bk")===null)localStorage.setItem("wh_bk",Date.now())}catch(e){}
const bkDue=()=>sites.length>=3&&Date.now()-bkGet("wh_bk")>2592e6&&Date.now()-bkGet("wh_bks")>6048e5;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=u=>{u=String(u||"").trim();if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(u))u="https://"+u;try{const x=new URL(u);return/^https?:$/.test(x.protocol)?x.href:"about:blank"}catch(e){return"about:blank"}};
const openSite=s=>{const u=norm(s.url);if(u==="about:blank")return toast("URL ঠিক নেই");s.n=(s.n||0)+1;s.t=Date.now();save(1);LOG.push([s.id,s.t]);LOG=LOG.slice(-1500);try{localStorage.setItem("wh_log",JSON.stringify(LOG))}catch(e){}window.open(u,"_blank","noopener,noreferrer")};
const host=u=>{try{return new URL(norm(u)).hostname.replace(/^www\./,"")||u}catch(e){return u}};
const color=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%360;return`hsl(${h} 55% 50%)`};
const initial=n=>{const t=n.trim();let g;try{g=[...new Intl.Segmenter("bn",{granularity:"grapheme"}).segment(t)][0].segment}catch(e){g=[...t][0]}return esc((g||"?").toUpperCase())};

/* ---- crypto: PIN -> AES-GCM ---- */
const b64=b=>btoa(String.fromCharCode(...new Uint8Array(b)));
const unb=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function derive(pin,salt,it){const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(pin),"PBKDF2",false,["deriveKey"]);
return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:it,hash:"SHA-256"},k,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function enc(t){const iv=crypto.getRandomValues(new Uint8Array(12));const c=await crypto.subtle.encrypt({name:"AES-GCM",iv},key,new TextEncoder().encode(t));return b64(iv)+"."+b64(c)}
async function dec(s){const[i,c]=s.split(".");return new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:unb(i)},key,unb(c)))}
function needKey(then,back){
 if(key)return then();
 const first=!meta;
 openSheet(`<h3>${first?"পিন সেট করুন":"পিন দিন"}</h3><p class="hint">${first?"আইডি/পাসওয়ার্ড এই পিন দিয়ে লক থাকবে। পিন ভুলে গেলে পাসওয়ার্ড উদ্ধার করা যাবে না।":"সেভ করা পাসওয়ার্ড দেখতে পিন লাগবে।"}</p>
 <label>${first?"পিন (কমপক্ষে ৬ অক্ষর)":"পিন"}</label><input id="pin" type="password" autocomplete="off">${first?'<label>পিন আবার লিখুন</label><input id="pin2" type="password" autocomplete="off">':""}
 <div class="row"><button class="btn" id="pcx">বাতিল</button><button class="btn p" id="pok">ঠিক আছে</button></div>`);
 $("#pcx").onclick=()=>{closeSheet();if(back)back()};
 $("#pok").onclick=async()=>{
  const pin=$("#pin").value;let L={};try{L=JSON.parse(localStorage.getItem("wh_lock")||"{}")}catch(e){}
  if(L.t>Date.now())return toast("অনেকবার ভুল হয়েছে, "+bn(Math.ceil((L.t-Date.now())/1000))+" সেকেন্ড পরে চেষ্টা করুন");
  if(first&&pin.length<6)return toast("কমপক্ষে ৬ অক্ষরের পিন দিন");if(first&&pin!==$("#pin2").value)return toast("দুই পিন মিলছে না");
  if(!pin)return toast("পিন দিন");
  try{
   if(first){const salt=crypto.getRandomValues(new Uint8Array(16));key=await derive(pin,salt,250000);meta={salt:b64(salt),it:250000,chk:await enc("ok")};localStorage.setItem("wh_vault",JSON.stringify(meta))}
   else{key=await derive(pin,unb(meta.salt),meta.it||150000);
    try{if(await dec(meta.chk)!=="ok")throw 0}catch(e){key=null;const n=(+L.n||0)+1;localStorage.setItem("wh_lock",JSON.stringify({n,t:n>=5?Date.now()+Math.min(30000*2**(n-5),3600000):0}));return toast("ভুল পিন")}}
  }catch(e){key=null;return toast("এই ব্রাউজারে লক সাপোর্ট নেই")}
  try{localStorage.removeItem("wh_lock")}catch(e){}
  closeSheet();then()};
}

function chPin(){if(!meta)return toast("এখনো কোনো পিন সেট করা নেই");
 needKey(()=>{openSheet(`<h3>পিন বদলান</h3><label>নতুন পিন (কমপক্ষে ৬ অক্ষর)</label><input id="n1" type="password" autocomplete="off"><label>আবার লিখুন</label><input id="n2" type="password" autocomplete="off"><div class="row"><button class="btn" data-close="1">বাতিল</button><button class="btn p" id="nk">বদলান</button></div>`);
  $("#nk").onclick=async()=>{const a=$("#n1").value;if(a.length<6)return toast("কমপক্ষে ৬ অক্ষরের পিন দিন");if(a!==$("#n2").value)return toast("দুই পিন মিলছে না");
   const old=key;try{const salt=crypto.getRandomValues(new Uint8Array(16)),nk=await derive(a,salt,250000),pl=[];
    const all=[...sites,...BIN.map(x=>x.s)];for(const s of all)pl.push([s.u?await dec(s.u):null,s.p?await dec(s.p):null]);
    key=nk;const m={salt:b64(salt),it:250000,chk:await enc("ok")};
    const nw=[];for(const x of pl)nw.push([x[0]!==null?await enc(x[0]):null,x[1]!==null?await enc(x[1]):null]);
    const bak=all.map(s=>[s.u,s.p]),om=meta;
    all.forEach((s,i)=>{if(nw[i][0]!==null)s.u=nw[i][0];if(nw[i][1]!==null)s.p=nw[i][1]});
    try{localStorage.setItem("wh_vault",JSON.stringify(m));localStorage.setItem("wh_sites",JSON.stringify(sites));localStorage.setItem("wh_bin",JSON.stringify(BIN))}
    catch(e){all.forEach((s,i)=>{if(bak[i][0]!==undefined)s.u=bak[i][0];if(bak[i][1]!==undefined)s.p=bak[i][1]});try{localStorage.setItem("wh_vault",JSON.stringify(om));localStorage.setItem("wh_sites",JSON.stringify(sites));localStorage.setItem("wh_bin",JSON.stringify(BIN))}catch(x){}throw e}
    meta=m;closeSheet();toast("পিন বদলেছে")}catch(e){key=old;toast("পিন বদলানো যায়নি")}}})}
/* ---- sheet ---- */
function openSheet(h){$("#sh").innerHTML=h;$("#ov").classList.add("show")}
let gating=false,vo=0,vk=null,vl=[],vm=null,ve=0,vx=0,vtt=[],vh;
function closeSheet(){if(gating&&!key)return;if(vo){vlock();$("#sh").innerHTML=""}$("#ov").style.visibility="";$("#ov").classList.remove("show")}
function ask(msg,yes,no){openSheet(`<h3>${esc(msg)}</h3><div class="row"><button class="btn" id="nn">না</button><button class="btn d" id="yy">হ্যাঁ</button></div>`);$("#nn").onclick=()=>{closeSheet();if(no)no()};$("#yy").onclick=()=>{closeSheet();yes()}}
$("#ov").addEventListener("click",e=>{if(e.target.id==="ov"||e.target.closest("[data-close]"))closeSheet()});
const wf=i=>{if(i._w)return;i._w=1;const ok=()=>i.naturalWidth>=24?i.classList.add("ok"):i.remove();if(i.complete)i.naturalWidth?ok():i.remove();else{i.onload=ok;i.onerror=()=>i.remove()}};
new MutationObserver(()=>document.querySelectorAll("img[data-fav]").forEach(wf)).observe(document.body,{childList:true,subtree:true});

/* ---- prefs ---- */
const parsePrefs=x=>{x=x||{};return{view:x.view==="list"?"list":"grid",cols:[3,4,5].includes(x.cols)?x.cols:4,accent:[345,265,175,38,215].includes(x.accent)?x.accent:345,theme:["auto","dark","light"].includes(x.theme)?x.theme:"auto",sort:["added","name","used"].includes(x.sort)?x.sort:"added",auto:x.auto===0?0:1,group:x.group===0?0:1,lang:x.lang==="en"?"en":"bn",dsc:x.dsc===1?1:0,fs:[0,1,2].includes(x.fs)?x.fs:0,hc:x.hc===1?1:0,sg2:x.sg2===1?1:0,rcv:x.rcv===0?0:1,rcx:+x.rcx>0?+x.rcx:0,gd:x.gd===1?1:0,al:x.al===1?1:0,hid:Array.isArray(x.hid)?[...new Set(x.hid.filter(c=>typeof c==="string"&&c.length<=24))].slice(0,40):[]}};
let P=parsePrefs();try{P=parsePrefs(JSON.parse(localStorage.getItem("wh_prefs")||"{}"))}catch(e){}
const savePrefs=()=>{try{localStorage.setItem("wh_prefs",JSON.stringify(P))}catch(e){}};
function applyPrefs(){const r=document.documentElement;r.style.setProperty("--h",P.accent);r.style.setProperty("--cols",P.cols);if(P.theme==="auto")delete r.dataset.theme;else r.dataset.theme=P.theme;r.lang=P.lang;r.style.setProperty("--z",[1,1.15,1.3][P.fs]);if(P.hc)r.dataset.hc="1";else delete r.dataset.hc;trAll()}

/* ---- language (bn/en): DOM text translation, originals kept so switching back is lossless ---- */
const OT=new WeakMap(),OA=new WeakMap();
const tx=s=>{if(P.lang!=="en")return s;const k=s.trim();if(!k)return s;let r=EN[k];
 if(r===undefined)for(const[a,f]of RX){const m=a.exec(k);if(m){r=f(m);break}}
 return r===undefined?s:s.replace(k,()=>r)};
function trN(n){
 if(n.nodeType===3){if(n.parentNode&&/^(TEXTAREA|SCRIPT|STYLE)$/.test(n.parentNode.nodeName))return;const o=OT.has(n)?OT.get(n):n.nodeValue;OT.set(n,o);const v=tx(o);if(n.nodeValue!==v)n.nodeValue=v}
 else if(n.nodeType===1){for(const a of["placeholder","aria-label"]){if(!n.hasAttribute(a))continue;let m=OA.get(n);if(!m)OA.set(n,m={});if(!(a in m))m[a]=n.getAttribute(a);const v=tx(m[a]);if(n.getAttribute(a)!==v)n.setAttribute(a,v)}
  n.childNodes.forEach(trN)}}
function trAll(){if(document.body)trN(document.body)}
new MutationObserver(ms=>{for(const m of ms)m.addedNodes.forEach(trN)}).observe(document.body,{childList:true,subtree:true});

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
let cat="",q="",lp=0,lpT,cLog=[];
const cats=()=>[...CATS,...new Set(sites.flatMap(s=>s.cs||[]).filter(c=>!CATS.includes(c)))];
function greet(){const h=new Date().getHours();return`শুভ ${h<5?"রাত":h<12?"সকাল":h<16?"দুপুর":h<18?"বিকেল":h<20?"সন্ধ্যা":"রাত"} · ${bn(vsites().length)}টি সাইট`}
const alx=h=>{let e="";for(const k in AL){const v=AL[k].split("|");if(h.includes(k)||v.some(x=>h.includes(x)))e+=" "+k+" "+v.join(" ")}return e};
function list(){let l=sites.filter(s=>hv(s)&&(tab!=="fav"||s.fav));if(cat==="__fav")l=l.filter(s=>s.fav);else if(cat)l=l.filter(s=>(s.cs||[]).includes(cat));
 if(q){const k=q.toLowerCase();l=l.filter(s=>{const h=(s.name+" "+s.url+" "+(s.cs||[]).join(" ")+" "+(s.ds||"")).toLowerCase();return(h+alx(h)).includes(k)})}
 if(P.sort==="name")l=[...l].sort((a,b)=>a.name.localeCompare(b.name,"bn"));else if(P.sort==="used")l=[...l].sort((a,b)=>(b.n||0)-(a.n||0));return l}
const badges=s=>(sm&&selSet.has(s.id)?'<i class="bd ck">✓</i>':"")+(s.fav?'<i class="bd st">★</i>':"")+(s.u||s.p?'<i class="bd ky">🔒</i>':"");
const appHtml=s=>`<div class="app${sm&&selSet.has(s.id)?" sel":""}" role="button" tabindex="0" data-o="${s.id}"><div class="wrap">${icoHtml(s)}${badges(s)}</div><span class="nm">${esc(s.name)}</span>${P.dsc&&s.ds?`<span class="dsl2">${esc(s.ds)}</span>`:""}</div>`;
const rowHtml=s=>`<div class="li${sm&&selSet.has(s.id)?" sel":""}" role="button" tabindex="0" data-o="${s.id}"><div class="wrap">${icoHtml(s)}${badges(s)}</div><div class="tx"><b>${esc(s.name)}</b><small>${esc(host(s.url))}${(s.cs||[]).length?" · "+esc(s.cs.join("، ")):""}</small>${s.ds?`<small class="dsl">${esc(s.ds)}</small>`:""}</div><button class="mo" data-m="${s.id}" aria-label="আরও">⋯</button></div>`;
const rgHtml=s=>`<div class="app" data-r="${s.id}"><div class="wrap">${icoHtml(s)}${badges(s)}</div><span class="nm">${esc(s.name)}</span><button class="dg dgt" data-dg="${s.id}" aria-label="টেনে সরান">☰</button></div>`;
const roHtml=s=>`<div class="li ro" data-r="${s.id}"><button class="dg" data-dg="${s.id}" aria-label="টেনে সরান">☰</button><div class="wrap">${icoHtml(s)}${badges(s)}</div><div class="tx"><b>${esc(s.name)}</b><small>${esc((s.cs||[]).join("، ")||host(s.url))}</small></div></div>`;
let showHid=false;const hv=s=>showHid||!(s.cs||[]).some(c=>P.hid.includes(c)),vsites=()=>sites.filter(hv),vcats=()=>cats().filter(c=>showHid||!P.hid.includes(c));
let ro=false,sm=false;const selSet=new Set();
function sugg(){const n=new Date(),H=n.getHours()+n.getMinutes()/60,since=Date.now()-60*864e5,c={};let t=0;
 for(const x of LOG){if(x[1]<since)continue;const d=new Date(x[1]);let g=Math.abs(d.getHours()+d.getMinutes()/60-H);g=Math.min(g,24-g);if(g<=1.5){c[x[0]]=(c[x[0]]||0)+1;t++}}
 if(t<5)return[];return vsites().filter(s=>c[s.id]>=2).sort((a,b)=>c[b.id]-c[a.id]).slice(0,P.cols)}
function guide(){const g=[["➕","নতুন সাইট যোগ","নিচের + বাটন চাপুন। অন্য অ্যাপ থেকে Share করেও যোগ করা যায় (অ্যাপ ইনস্টল থাকলে)।"],["👆","আইকন চেপে ধরুন","এডিট, প্রিয় (★), বিবরণ ও পাসওয়ার্ডের অপশন আসবে।"],["⇅","সাজানো ও বাছাই","সার্চ বারের ⇅ দিয়ে ক্রম সাজান, ☑ দিয়ে একসাথে অনেক সাইট বাছাই করুন।"],["🔒","পাসওয়ার্ড লক","আইডি/পাসওয়ার্ড পিন (কমপক্ষে ৬ অক্ষর) দিয়ে লক থাকে। পিন ভুললে উদ্ধার হয় না।"],["💾","ব্যাকআপ","ডেটা শুধু এই ফোনেই থাকে। সেটিংস → ব্যাকআপ থেকে মাঝে মাঝে ফাইল নামিয়ে রাখুন।"],["📲","ইনস্টল","ক্রোমে ⋮ → \"Add to Home screen\" দিলে অ্যাপের মতো খুলবে।"]];
 P.gd=1;savePrefs();openSheet(`<h3>👋 Heart Orbit-এ স্বাগতম</h3>${g.map(x=>`<div class="li"><div class="tx"><b>${x[0]} ${x[1]}</b><small>${x[2]}</small></div></div>`).join("")}<button class="btn p w" data-close="1" id="gok">বুঝেছি, শুরু করি</button>`)}
function openAll(l){const done=new Set(),cnt=()=>`${bn(l.length)}টি সাইটের মধ্যে ${bn(done.size)}টি খোলা হয়েছে`;
 openSheet(`<h3>↗ সব খুলুন</h3><p class="hint">প্রতিটি সাইটে একবার করে ট্যাপ করুন। ব্রাউজার একসাথে অনেক ট্যাব খুলতে দেয় না।</p><p class="hint" id="oac"></p>${l.map((s,i)=>`<div class="li" role="button" tabindex="0" data-oi="${i}"><div class="tx"><b>${esc(s.name)}</b><small>${esc(host(s.url))}</small></div><span class="oam">↗</span></div>`).join("")}<button class="btn w" data-close="1">বন্ধ করুন</button>`);
 const u=()=>{$("#oac").textContent=cnt()};u();
 $("#sh").onclick=e=>{const r=e.target.closest("[data-oi]");if(!r)return;const s=l[+r.dataset.oi];if(!s)return;openSite(s);done.add(s.id);r.style.opacity=".55";r.querySelector(".oam").textContent="✓";u()};
 $("#sh").onkeydown=e=>{if(e.key==="Enter"&&e.target.dataset.oi!==undefined)e.target.click()}}
function render(){
 $("#greet").textContent=greet();
 const isSet=tab==="set";document.body.classList.toggle("s",isSet);document.body.classList.toggle("ro",ro&&!isSet);$("#rob").classList.toggle("on",ro);$("#selb").classList.toggle("on",sm);document.body.classList.toggle("sm",sm&&!isSet);
 $("#bar").innerHTML=sm&&!isSet?`<span>${bn(selSet.size)}টি বাছাই করা</span><button data-b="all">সব</button><button data-b="fav">★ প্রিয়</button><button data-b="cat">🗂 ক্যাটাগরি</button><button data-b="del">🗑 মুছুন</button><button data-b="x" aria-label="বাতিল">✕</button>`:"";
 const m=$("#main");if(isSet)return settings(m);
 const cs=vcats();if(cat&&cat!=="__fav"&&!cs.includes(cat))cat="";if(cat==="__fav"&&tab==="fav")cat="";
 $("#chips").innerHTML=`<button class="chip${cat?"":" on"}" data-c="">সব</button>`+(tab==="home"?`<button class="chip${cat==="__fav"?" on":""}" data-c="__fav">প্রিয়</button>`:"")+cs.map(c=>`<button class="chip${cat===c?" on":""}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
 const l=list();let h="";
 if(ro)h+=`<div class="rb"><span>☰ চেপে ধরে টেনে সাজান</span><button class="btn sm p" data-ro="0">শেষ</button></div>`;
 if(!ro&&!sm&&tab==="home"&&!q){const sp=stor();if(saveBad)h+=`<div class="rb"><span>⚠ ডেটা সেভ হচ্ছে না — স্টোরেজ ভরে গেছে। ব্যাকআপ নিন।</span><button class="btn sm p" data-bk="g">ব্যাকআপ নিন</button></div>`;else if(sp>=80)h+=`<div class="rb"><span>⚠ স্টোরেজ প্রায় ভরে গেছে (${bn(sp)}%)। ব্যাকআপ নিন।</span><button class="btn sm p" data-bk="g">ব্যাকআপ নিন</button></div>`}
 if(!ro&&!sm&&tab==="home"&&!q&&showHid&&P.hid.length)h+=`<div class="rb"><span>🔓 লুকানো ক্যাটাগরি দেখা যাচ্ছে</span><button class="btn sm p" data-hl="1">🔒 আবার লুকান</button></div>`;
 if(!ro&&!sm&&tab==="home"&&!q&&bkDue())h+=`<div class="rb"><span>💾 অনেকদিন ব্যাকআপ নেওয়া হয়নি</span><button class="btn sm" data-bk="s">পরে</button><button class="btn sm p" data-bk="g">ব্যাকআপ নিন</button></div>`;
 if(!ro&&!sm&&!q&&cat&&cat!=="__fav"&&l.filter(s=>norm(s.url)!=="about:blank").length>1)h+=`<div class="rb"><span>🗂 ${esc(cat)}</span><button class="btn sm p" data-oa="1">↗ সব খুলুন</button></div>`;
 if(!l.length)h+=`<div class="empty">${q?"কিছু পাওয়া যায়নি":cat?"এই ক্যাটাগরিতে কোনো সাইট নেই।<br>+ বাটনে চেপে যোগ করুন।":tab==="fav"?"কোনো প্রিয় সাইট নেই।<br>আইকন চেপে ধরে ★ দিন।":"কোনো সাইট নেই।<br>নিচের + বাটনে চেপে যোগ করুন।"}</div>`;
 else if(ro)h+=P.view==="grid"?`<div id="rl" class="grid rg">${l.map(rgHtml).join("")}</div>`:`<div id="rl">${l.map(roHtml).join("")}</div>`;
 else{
  const rc=P.rcv&&tab==="home"&&!q&&!cat?vsites().filter(s=>s.t&&s.t>P.rcx).sort((a,b)=>b.t-a.t).slice(0,P.cols):[];
  const fvs=tab==="home"&&!q&&!cat?vsites().filter(s=>s.fav).slice(0,P.cols):[];
  const sg=P.sg2&&tab==="home"&&!q&&!cat&&!sm?sugg():[];
  if(sg.length)h+=`<section class="rc"><h2>এই সময়ে সাধারণত খোলেন</h2><div class="grid">${sg.map(appHtml).join("")}</div></section>`;
  if(fvs.length)h+=`<section class="rc"><h2>প্রিয়</h2><div class="grid">${fvs.map(appHtml).join("")}</div></section>`;
  if(rc.length)h+=`<section class="rc"><h2>সম্প্রতি খোলা<span style="flex:1"></span><button type="button" class="mo" data-rca="clr" aria-label="তালিকা মুছুন">${ic("trash")}</button><button type="button" class="mo" data-rca="off" aria-label="এই তালিকা বন্ধ করুন">${ic("x")}</button></h2><div class="grid">${rc.map(appHtml).join("")}</div></section>`;
  if(rc.length||fvs.length||sg.length)h+=`<h2 class="hd">সব সাইট</h2>`;
  const blk=a=>P.view==="list"?a.map(rowHtml).join(""):`<div class="grid">${a.map(appHtml).join("")}</div>`;
  if(P.group&&!cat&&!q){
   const g=cs.map(c=>[c,l.filter(s=>(s.cs||[]).includes(c))]).filter(x=>x[1].length),o=l.filter(s=>!(s.cs||[]).some(c=>cs.includes(c)));
   if(o.length)g.push([g.length?"অন্যান্য":"",o]);
   h+=g.map(x=>(x[0]?`<h2 class="gh">${esc(x[0])} · ${bn(x[1].length)}</h2>`:"")+blk(x[1])).join("");
  }else h+=blk(l);
  h+=`<p class="tip">টিপস: আইকন চেপে ধরলে এডিট, প্রিয় ও পাসওয়ার্ডের অপশন আসে। ক্রম সাজাতে সার্চ বারের ⇅ বাটন চাপুন। ক্যাটাগরির নাম চেপে ধরে টেনে আগে-পিছে করুন।</p>`;
 }
 m.innerHTML=h;
 m.querySelectorAll("[data-rca]").forEach(b=>b.onclick=()=>{if(b.dataset.rca==="clr"){const o=P.rcx;P.rcx=Date.now();savePrefs();render();toast("সম্প্রতি খোলা তালিকা মুছে ফেলা হয়েছে",["ফিরিয়ে আনুন",()=>{P.rcx=o;savePrefs();render()}])}else{P.rcv=0;savePrefs();render();toast("সম্প্রতি খোলা বন্ধ করা হয়েছে",["ফিরিয়ে আনুন",()=>{P.rcv=1;savePrefs();render()}])}});
}
const seg=(k,o)=>`<div class="seg">${o.map(x=>`<button data-p="${k}" data-v="${x[0]}" class="${P[k]===x[0]?"on":""}">${x[1]}</button>`).join("")}</div>`;
const tog=(k,l)=>`<div class="trow"><span>${l}</span><button type="button" role="switch" class="tg${P[k]?" on":""}" aria-checked="${P[k]?"true":"false"}" aria-label="${l}" data-p="${k}" data-v="${P[k]?0:1}"></button></div>`;
let oS=new Set();
/* ---- stats / tools ---- */
function statsHtml(){
 const now=Date.now(),D=864e5,st=new Date();st.setHours(0,0,0,0);const t0=st.getTime();
 const vi=new Set(vsites().map(s=>s.id)),ds=[...Array(7)].map((_,i)=>{const a=t0-(6-i)*D;return{a,n:LOG.filter(x=>vi.has(x[0])&&x[1]>=a&&x[1]<a+D).length}});
 const tot=ds.reduce((a,d)=>a+d.n,0),mx=Math.max(1,...ds.map(d=>d.n));
 let fm;try{fm=new Intl.DateTimeFormat(P.lang==="en"?"en":"bn",{weekday:"short"})}catch(e){fm={format:()=>""}}
 const top=vsites().filter(s=>s.n).sort((a,b)=>b.n-a.n).slice(0,5),old=vsites().filter(s=>(s.t||0)<now-90*D&&(s.id>1e14?s.id/1000:s.id)<now-90*D);
 if(!tot&&!top.length&&!old.length)return"<p>এখনো কোনো ব্যবহারের তথ্য নেই। সাইট খুললে এখানে পরিসংখ্যান জমবে।</p>";
 let h=`<div class="bars">${ds.map(d=>`<div class="bc"><div class="tr"><i style="height:${Math.round(d.n/mx*100)}%"></i></div><small>${esc(fm.format(d.a))}</small></div>`).join("")}</div><p class="hint">গত ৭ দিনে ${bn(tot)} বার খোলা হয়েছে</p>`;
 if(top.length)h+=`<p class="lbl">সবচেয়ে বেশি খোলা</p>`+top.map(s=>`<div class="li"><div class="tx"><b>${esc(s.name)}</b><small>${bn(s.n)} বার খোলা</small></div></div>`).join("");
 if(old.length)h+=`<p class="lbl">৩ মাসে খোলা হয়নি (${bn(old.length)})</p><p class="hint">${old.slice(0,12).map(s=>esc(s.name)).join("، ")}${old.length>12?"…":""}</p><button class="btn d w" id="stc">${ic("trash")}এগুলো বিনে পাঠান</button>`;
 return h}
function toBin(ids,undoable){const rm=sites.map((s,i)=>[i,s]).filter(x=>ids.has(x[1].id));sites=sites.filter(s=>!ids.has(s.id));
 rm.forEach(x=>BIN.unshift({t:Date.now(),s:x[1]}));BIN=BIN.slice(0,200);saveBin();save();render();
 toast(bn(rm.length)+"টি সাইট রিমুভ হয়েছে",["ফিরিয়ে আনুন",()=>{BIN=BIN.filter(x=>!rm.some(r=>r[1]===x.s));saveBin();rm.forEach(r=>sites.splice(Math.min(r[0],sites.length),0,r[1]));save();render()}])}
const dl=(name,text,type)=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000)};
function expCsv(){const q=v=>{v=String(v??"");if(/^[=+\-@\t\r]/.test(v))v="'"+v;return'"'+v.replace(/"/g,'""')+'"'};
 const rows=[["name","url","categories","description","favorite","opens"],...sites.map(s=>[s.name,s.url,(s.cs||[]).join("; "),s.ds||"",s.fav?1:0,s.n||0])];
 dl("heart-orbit-sites.csv","\uFEFF"+rows.map(r=>r.map(q).join(",")).join("\r\n"),"text/csv")}
function expBk(){const l=sites.filter(s=>norm(s.url)!=="about:blank").map(s=>`<DT><A HREF="${esc(norm(s.url))}"${s.t?` LAST_VISIT="${Math.floor(s.t/1000)}"`:""}>${esc(s.name)}</A>`).join("\n");
 dl("heart-orbit-bookmarks.html",`<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>\n${l}\n</DL><p>\n`,"text/html")}
function addMany(items){const have=new Set(sites.map(x=>host(x.url)));let add=0,skip=0;
 for(const it of items){const url=String(it.url||"").trim().slice(0,500);if(norm(url)==="about:blank"||have.has(host(url))||sites.length>=500){skip++;continue}
  have.add(host(url));const ps=host(url).split("."),b=ps.length>2?ps[ps.length-2]:ps[0],nm=String(it.name||"").trim().slice(0,60)||b.charAt(0).toUpperCase()+b.slice(1);
  sites.push({id:Date.now()*1000+add,name:nm,url,fav:0,n:0});add++}
 if(add)save();render();toast(add?bn(add)+"টি নতুন সাইট যোগ হয়েছে"+(skip?", "+bn(skip)+"টি বাদ":""):"যোগ করার মতো কিছু পাওয়া যায়নি")}
function bulkAdd(){
 openSheet(`<h3>অনেক সাইট একসাথে যোগ</h3><p class="hint">প্রতি লাইনে একটি। নামসহ লিখতে পারেন: ফেসবুক, facebook.com</p><textarea id="bt" rows="8" placeholder="example.com"></textarea><div class="rw"><button class="btn" id="bf">🔖 ক্রোম বুকমার্ক ফাইল</button></div><input type="file" id="bfi" accept=".html,.htm" hidden><div class="row"><button class="btn" data-close="1">বাতিল</button><button class="btn p" id="bo">যোগ করুন</button></div>`);
 $("#bo").onclick=()=>{const it=$("#bt").value.split(/\r?\n/).map(l=>l.trim()).filter(Boolean).map(l=>{const m=l.match(/(https?:\/\/\S+|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[\/?#]\S*)?)/i);if(!m)return null;
  return{url:m[0],name:(l.slice(0,m.index)+l.slice(m.index+m[0].length)).replace(/^[\s,|;:\-–]+|[\s,|;:\-–]+$/g,"")}}).filter(Boolean);closeSheet();addMany(it)};
 $("#bf").onclick=()=>$("#bfi").click();
 $("#bfi").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f)return;try{const d=new DOMParser().parseFromString(await f.text(),"text/html");
  const it=[...d.querySelectorAll("a[href]")].map(a=>({url:a.getAttribute("href")||"",name:a.textContent||""})).filter(x=>/^https?:\/\//i.test(x.url));closeSheet();addMany(it)}catch(x){toast("ফাইলটি ঠিক নেই")}}}

const ic=n=>`<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`,bi=(n,t)=>ic(n)+t;
function settings(m){
 $("#chips").innerHTML="";
 const SUB={lang:"অ্যাপের ভাষা বদলান",look:"থিম, রঙ ও লেআউট",cat:"গ্রুপ ও ক্রম সাজান",logo:"অ্যাপ ও সাইটের লোগো",stats:"সাপ্তাহিক ব্যবহার",tools:"ইমপোর্ট, এক্সপোর্ট ও আপডেট",bin:"মুছে ফেলা সাইট ফিরিয়ে আনুন",priv:"অ্যাপ-লক ও লুকানো ক্যাটাগরি",sec:"পিন ও এনক্রিপশন",bk:"ডেটা সেভ ও রিস্টোর",use:"ইনস্টল ও গাইড",about:"অ্যাপ ও ডেভেলপার"};
 const grp=t=>`<p class="grp">${t}</p>`;
 const hero=()=>{const vs=vsites();return `<div class="hero"><div class="hd"><img src="${esc(($("#applogo")||{}).src||"icon-192.png")}" width="56" height="56" alt=""><div><b>Heart <em>Orbit</em></b><small>পছন্দের সব ওয়েবসাইট এক জায়গায়</small></div></div><div class="hs"><div><strong>${bn(vs.length)}</strong><span>সাইট</span></div><div><strong>${bn(vs.filter(s=>s.fav).length)}</strong><span>প্রিয়</span></div><div><strong>${bn(cats().filter(c=>showHid||!P.hid.includes(c)).length)}</strong><span>ক্যাটাগরি</span></div></div></div>`};
 const sec=(id,t,b)=>{const q=t.indexOf("|");return `<details class="card" data-sec="${id}"${oS.has(id)?" open":""}><summary><span class="st"><span class="ib">${ic(t.slice(0,q))}</span><span class="tt"><b>${t.slice(q+1)}</b><small>${SUB[id]||""}</small></span></span></summary><div class="cb">${b}</div></details>`};
 m.innerHTML=hero()
 +grp("ব্যক্তিগতকরণ")
 +sec("lang","globe|ভাষা / Language",`${seg("lang",[["bn","বাংলা"],["en","English"]])}`)
 +sec("look","palette|চেহারা",`<p class="lbl">থিম</p>${seg("theme",[["auto","অটো"],["dark","ডার্ক"],["light","লাইট"]])}<p class="lbl">রঙ</p><div class="sws">${[345,265,175,38,215].map(h=>`<button class="sw${P.accent===h?" on":""}" style="--s:${h}" data-p="accent" data-v="${h}" aria-label="রঙ বাছুন"></button>`).join("")}</div><p class="lbl">দেখানোর ধরন</p>${seg("view",[["grid","গ্রিড"],["list","লিস্ট"]])}<p class="lbl">প্রতি সারিতে আইকন</p>${seg("cols",[[3,"৩টি"],[4,"৪টি"],[5,"৫টি"]])}${tog("dsc","আইকনের নিচে বিবরণ")}${tog("sg2","সময় অনুযায়ী পরামর্শ (হোমে)")}${tog("rcv","সম্প্রতি খোলা দেখান (হোমে)")}<button class="btn w" id="rcc" style="margin:6px 0">${ic("trash")}সম্প্রতি খোলা তালিকা মুছুন</button><p class="lbl">লেখার আকার</p>${seg("fs",[[0,"সাধারণ"],[1,"বড়"],[2,"আরও বড়"]])}${tog("hc","হাই কন্ট্রাস্ট")}<p class="lbl">সাজানো</p>${seg("sort",[["added","নিজের ক্রম"],["name","নাম"],["used","বেশি ব্যবহৃত"]])}`)
 +sec("cat","folder|ক্যাটাগরি ও ক্রম",`${tog("group","হোমে ক্যাটাগরি অনুযায়ী গ্রুপ")}<button class="btn w" id="cmb">${ic("folder")}ক্যাটাগরি সাজান ও ম্যানেজ</button><button class="btn w" id="rob2">${ic("sort")}আইকনের ক্রম সাজান</button>`)
 +sec("logo","image|লোগো",`<p>সাইটের নিজের লোগো থাকলে সেটি দেখানো হয়, না থাকলে অ্যাপের লোগো।</p>${tog("auto","সাইটের লোগো অনলাইন থেকে আনা")}<p class="hint" style="margin-top:8px">চালু থাকলে সাইটের ডোমেইন নাম গুগলের লোগো সার্ভিসে যায়।</p><p class="lbl">অ্যাপের লোগো</p><div class="rw"><button class="btn" id="al">${ic("image")}নিজের ছবি</button><button class="btn" id="ar">${ic("undo")}ডিফল্ট</button></div><input type="file" id="alf" accept="image/*" hidden>`)
 +grp("ডেটা ও টুলস")
 +sec("stats","chart|ব্যবহারের পরিসংখ্যান",statsHtml())
 +sec("tools","tools|টুলস",`<p class="hint">CSV ও বুকমার্ক ফাইলে পাসওয়ার্ড থাকে না।</p><button class="btn w" id="bpb">${ic("clip")}অনেক URL পেস্ট করুন</button><button class="btn w" id="csv">${ic("download")}CSV নামান</button><button class="btn w" id="bmx">${ic("download")}বুকমার্ক ফাইল (HTML)</button><button class="btn w" id="upd">${ic("refresh")}আপডেট খুঁজুন</button>`)
 +sec("bin",`trash|রিসাইকেল বিন (${bn(BIN.filter(x=>hv(x.s)).length)})`,BIN.some(x=>hv(x.s))?`<p class="hint">মুছে ফেলা সাইট ৩০ দিন এখানে থাকে।</p>`+BIN.map((x,i)=>!hv(x.s)?"":`<div class="li"><div class="tx"><b>${esc(x.s.name)}</b><small>${esc(host(x.s.url))} · ${bn(Math.max(0,30-Math.floor((Date.now()-x.t)/864e5)))} দিন বাকি</small></div><button class="mo" data-br="${i}" aria-label="ফিরিয়ে আনুন">${ic("undo")}</button><button class="mo" data-bx="${i}" aria-label="চিরতরে মুছুন">${ic("x")}</button></div>`).join("")+`<button class="btn d w" id="bne">বিন খালি করুন</button>`:`<p>বিন খালি। মুছে ফেলা সাইট ৩০ দিন এখানে থাকে।</p>`)
 +sec("bk","download|ব্যাকআপ",`<p>সাইট, ক্যাটাগরি ও লক করা পাসওয়ার্ড ফাইলে সেভ করুন বা ফিরিয়ে আনুন। ফাইলটি নিরাপদ জায়গায় রাখুন।</p><p class="hint">স্টোরেজ ব্যবহার: ${bn(stor())}%</p><div class="rw"><button class="btn" id="ex">${ic("download")}নামান</button><button class="btn" id="im">${ic("upload")}ফেরত আনুন</button></div><input type="file" id="fi" accept=".json" hidden>`)
 +grp("গোপনীয়তা ও নিরাপত্তা")
 +sec("priv","eyeoff|গোপনীয়তা",`<p class="lbl">অ্যাপ খুলতে পিন: <span>${P.al&&meta?"চালু":"বন্ধ"}</span></p><button class="btn w" id="alb">${P.al&&meta?"অ্যাপ-লক বন্ধ করুন":"অ্যাপ-লক চালু করুন"}</button><p class="lbl">লুকানো ক্যাটাগরি</p><p class="hint">লুকানো ক্যাটাগরির সাইট হোম, সার্চ ও পরিসংখ্যানে দেখা যায় না; দেখতে পিন লাগে। এটি শুধু চোখের আড়াল করার ব্যবস্থা, ডেটা এনক্রিপ্ট হয় না। নামান/ব্যাকআপ ফাইলে সবই থাকে।</p><button class="btn w" id="hdb">${showHid?ic("lock")+"আবার লুকান":ic("unlock")+"আনলক করে দেখুন"}</button><button class="btn w" id="hdm">${ic("eyeoff")}ক্যাটাগরি লুকান / দেখান</button>`)
 +sec("sec","shield|নিরাপত্তা",`<p>পাসওয়ার্ড AES-256 দিয়ে এনক্রিপ্ট হয়ে শুধু এই ফোনে থাকে। ৫ বার ভুল পিনে সাময়িক লক হয়। অ্যাপ থেকে ১ মিনিট বাইরে থাকলে বা ৩ মিনিট বসে থাকলে নিজে থেকে লক হয়। পিন যত লম্বা, তত নিরাপদ।</p><button class="btn w" id="lk">${ic("lock")}এখনই লক করুন</button><button class="btn w" id="cpn">${ic("key")}পিন বদলান</button><button class="btn d w" id="wp">সব ডেটা মুছুন</button>`)
 +grp("সহায়তা")
 +sec("use","info|ক্রোমে ব্যবহার",`<p>ক্রোমে এই পেজ খুলে ⋮ → "Add to Home screen" দিন। কোনো সাইটে ট্যাপ করলে সেটি ক্রোমের নতুন ট্যাবে খুলবে। সাইটে একবার লগইন করে "Save password" দিলে ক্রোমই পরে অটো-ফিল করবে।</p><button class="btn w" id="gdb">${ic("help")}শুরুর গাইড দেখুন</button>`)
 +sec("about","info|সম্পর্কে",`<p class="lbl">এই অ্যাপ কেন</p><p>পছন্দের ওয়েবসাইটগুলো ব্রাউজারের বুকমার্ক, হিস্ট্রি আর চ্যাটে ছড়িয়ে থাকে। Heart Orbit সেগুলো এক জায়গায় রাখে, যেন এক ট্যাপেই খুলতে পারেন।</p><p class="lbl">কী কী করা যায়</p><p>• সাইট যোগ করে ক্যাটাগরিতে সাজানো, প্রিয় চিহ্ন দেওয়া ও খুঁজে পাওয়া</p><p>• ড্র্যাগ করে ক্রম বদলানো, গ্রিড বা লিস্ট ভিউ, থিম ও রং বাছা</p><p>• সাইটের আইডি ও পাসওয়ার্ড পিন দিয়ে লক করে রাখা</p><p>• ব্যাকআপ নেওয়া ও ফেরত আনা; মুছে ফেলা সাইট ৩০ দিন রিসাইকেল বিনে থাকে</p><p>• ইন্টারনেট ছাড়াও অ্যাপ খোলে (সাইটগুলো খুলতে অবশ্য নেট লাগে)</p><p class="lbl">প্রাইভেসি</p><p>• আপনার সব ডেটা শুধু এই ফোনের ব্রাউজার স্টোরেজে থাকে। কোনো সার্ভার, অ্যাকাউন্ট, বিজ্ঞাপন বা ট্র্যাকিং নেই; আপনার তথ্য ডেভেলপারের কাছে যায় না।</p><p>• সেভ করা আইডি ও পাসওয়ার্ড AES-256 দিয়ে এনক্রিপ্ট হয়ে থাকে এবং আপনার পিন ছাড়া খোলে না। পিন ভুলে গেলে সেগুলো ফেরত পাওয়ার উপায় নেই; পিন যত লম্বা, তত নিরাপদ।</p><p>• সাইটের লোগো অনলাইন থেকে আনা চালু থাকলে সাইটের ডোমেইন নাম গুগলের লোগো সার্ভিসে যায়। চাইলে সেটিংস → লোগো থেকে বন্ধ করতে পারেন।</p><p>• লুকানো ক্যাটাগরি ও অ্যাপ-লক চোখের আড়াল করার ব্যবস্থা, এনক্রিপশন নয়। ব্যাকআপ ফাইলে আপনার সব সাইটের তালিকা থাকে, তাই ফাইলটি নিরাপদ জায়গায় রাখুন।</p><p>• ব্রাউজারের ডেটা মুছলে অ্যাপের সব তথ্যও মুছে যায়, তাই মাঝে মাঝে ব্যাকআপ নিন।</p><p>• কোনো সাইটে ট্যাপ করলে সেটি ক্রোমের নতুন ট্যাবে খোলে; তখন ওই সাইটের নিজের প্রাইভেসি নীতি প্রযোজ্য।</p><p class="lbl">ডেভেলপার</p><p><b>Imran Islam Hridoy</b></p><button class="btn w" id="fbl">${ic("globe")}Facebook: facebook.com/hridoyofficial3</button>`)
 +`<p class="ver">Heart Orbit · v30</p>`;
 m.querySelectorAll("details").forEach(x=>{x.querySelector("summary").addEventListener("click",()=>{x.dataset.u=1});
  x.ontoggle=()=>{if(x.open){m.querySelectorAll("details").forEach(y=>{if(y!==x&&y.open){y.open=false;oS.delete(y.dataset.sec)}});oS.add(x.dataset.sec);
    if(x.dataset.u){requestAnimationFrame(()=>x.scrollIntoView({block:"nearest",behavior:"smooth"}))}}else oS.delete(x.dataset.sec);delete x.dataset.u}});
 m.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{const k=b.dataset.p,v=b.dataset.v;P[k]=["cols","accent","auto","group","dsc","fs","hc","sg2","rcv"].includes(k)?+v:v;savePrefs();applyPrefs();render()});
 m.querySelectorAll("[data-br]").forEach(b=>b.onclick=()=>{const i=+b.dataset.br,x=BIN[i];if(!x)return;const s=x.s;if(sites.some(y=>y.id===s.id))s.id=Date.now()*1000+i;sites.push(s);BIN.splice(i,1);saveBin();save();toast("ফিরিয়ে আনা হয়েছে");render()});
 m.querySelectorAll("[data-bx]").forEach(b=>b.onclick=()=>ask("এটি চিরতরে মুছবেন?",()=>{BIN.splice(+b.dataset.bx,1);saveBin();render()}));
 if($("#bne"))$("#bne").onclick=()=>ask("বিন খালি করবেন? এগুলো আর ফেরানো যাবে না।",()=>{BIN=[];saveBin();render()});
 if($("#stc"))$("#stc").onclick=()=>{const now=Date.now(),D=864e5,ids=new Set(vsites().filter(s=>(s.t||0)<now-90*D&&(s.id>1e14?s.id/1000:s.id)<now-90*D).map(s=>s.id));ask(bn(ids.size)+"টি সাইট বিনে পাঠাবেন?",()=>toBin(ids))};
 $("#bpb").onclick=bulkAdd;$("#csv").onclick=expCsv;$("#bmx").onclick=expBk;
 $("#upd").onclick=()=>{if(!("serviceWorker"in navigator))return toast("আপডেট সাপোর্ট নেই");navigator.serviceWorker.getRegistration().then(r=>{if(r)r.update()}).catch(()=>{});toast("আপডেট খোঁজা হয়েছে। নতুন সংস্করণ থাকলে জানানো হবে।")};
 $("#cmb").onclick=()=>catMgr();
 $("#rob2").onclick=()=>{tab="home";cat="";ro=true;if(P.sort!=="added"){P.sort="added";savePrefs()}setNav()};
 $("#al").onclick=()=>$("#alf").click();
 $("#alf").onchange=async e=>{try{localStorage.setItem("wh_logo",await cropImg(e.target.files[0],192));applyLogo();toast("লোগো বদলেছে")}catch(x){toast("ছবি পড়া যায়নি")}};
 $("#rcc").onclick=()=>{P.rcx=Date.now();savePrefs();render();toast("সম্প্রতি খোলা তালিকা মুছে ফেলা হয়েছে")};
 $("#ar").onclick=()=>{try{localStorage.removeItem("wh_logo")}catch(e){}applyLogo();toast("ডিফল্ট লোগো ফিরেছে")};
 $("#lk").onclick=()=>{relock();toast("লক হয়েছে");if(P.al&&meta)gate()};
 $("#cpn").onclick=chPin;
 $("#alb").onclick=()=>{const on=P.al&&meta;needKey(()=>{P.al=on?0:1;savePrefs();toast(on?"অ্যাপ-লক বন্ধ হয়েছে":"অ্যাপ-লক চালু হয়েছে");render()},()=>render())};
 $("#hdb").onclick=()=>{if(showHid){showHid=false;return render()}if(!meta)return toast("কোনো ক্যাটাগরি লুকানো নেই");needKey(()=>{showHid=true;tab="home";cat="";setNav();toast("লুকানো ক্যাটাগরি দেখা যাচ্ছে")})};
 $("#hdm").onclick=()=>catMgr();
 if($("#gdb"))$("#gdb").onclick=guide;
 if($("#fbl"))$("#fbl").onclick=()=>{const w="https://www.facebook.com/profile.php?id=100011167967711";window.open(/Android/i.test(navigator.userAgent)?"intent://profile/100011167967711#Intent;scheme=fb;package=com.facebook.katana;S.browser_fallback_url="+encodeURIComponent(w)+";end":w,"_blank","noopener,noreferrer")};
 $("#wp").onclick=()=>ask("সব সাইট, পাসওয়ার্ড, লুকানো তালিকা, সেটিংস ও লোগো মুছে যাবে। নিশ্চিত?",()=>wipeAll());
 $("#ex").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({sites,meta,prefs:P,cats:cats()})],{type:"application/json"}));a.download="heart-orbit-backup.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000);try{localStorage.setItem("wh_bk",Date.now())}catch(x){}toast("ব্যাকআপ নামানো হয়েছে")};
 $("#im").onclick=()=>$("#fi").click();
 $("#fi").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f)return;try{const d=JSON.parse(await f.text());if(!Array.isArray(d.sites))throw 0;const inc=clean(d.sites),dc=Array.isArray(d.cats)?d.cats:[];
 openSheet(`<h3>ব্যাকআপ ফেরত আনুন</h3><p class="hint">ফাইলে ${bn(inc.length)}টি সাইট আছে, এখন আছে ${bn(sites.length)}টি।</p><button class="btn p w" id="imm">➕ মার্জ করুন (বর্তমান ডেটা থাকবে)</button><button class="btn d w" id="imr">♻ সব বদলে ফেলুন</button><button class="btn w" data-close="1">বাতিল</button>`);
 const done=()=>{save();saveCats();savePrefs();applyPrefs();closeSheet();tab="home";setNav()};
 $("#imr").onclick=()=>{BIN.forEach(x=>{delete x.s.u;delete x.s.p});saveBin();sites=inc;CATS=cleanCats(dc);meta=cleanMeta(d.meta);key=null;P=parsePrefs(d.prefs);try{if(meta)localStorage.setItem("wh_vault",JSON.stringify(meta));else localStorage.removeItem("wh_vault")}catch(x){}toast("ফেরত আনা হয়েছে");done()};
 $("#imm").onclick=()=>{const im=cleanMeta(d.meta);let strip=false;
  if(im&&!meta){meta=im;try{localStorage.setItem("wh_vault",JSON.stringify(meta))}catch(x){}}else if(!im||im.salt!==meta.salt)strip=true;
  const have=new Set(sites.map(x=>host(x.url)));let add=0;
  inc.forEach(x=>{if(have.has(host(x.url)))return;if(strip){delete x.u;delete x.p}x.id=Date.now()*1000+add;sites.push(x);add++});
  CATS=cleanCats([...CATS,...dc]);toast(bn(add)+"টি নতুন সাইট যোগ হয়েছে"+(strip?" (আইডি/পাসওয়ার্ড ছাড়া)":""));done()};
}catch(x){toast("ফাইলটি ঠিক নেই")}};
}
function setNav(){document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.t===tab));render()}

/* ---- add / edit ---- */
function form(s,d){
 const n=!s;s=s||{};d=d||{};let ic=d.ic!==undefined?d.ic:(s.ic||null),xu=0,xp=0;const fv=n&&(tab==="fav"||cat==="__fav");
 const sel=new Set(d.cs||s.cs||(n&&cat&&cat!=="__fav"?[cat]:[])),nw=[...sel].filter(c=>!cats().includes(c));
 openSheet(`<h3>${n?"নতুন ওয়েবসাইট":"এডিট করুন"}</h3>
 <label>ওয়েবসাইটের নাম</label><input id="fn" maxlength="60" value="${esc(d.name??s.name)}" placeholder="যেমন: ফেসবুক">
 <label>URL</label><input id="fu" value="${esc(d.url??s.url)}" placeholder="facebook.com" inputmode="url" autocapitalize="off" autocomplete="off">
 <label>এই সাইটের কাজ কী? (ঐচ্ছিক)</label><textarea id="fd" maxlength="200" rows="3" placeholder="যেমন: ক্লাসের নোট দেখি, বিল পরিশোধ করি…">${esc(d.ds??s.ds)}</textarea>
 <label class="cl">ক্যাটাগরি <small>একাধিক বাছতে পারেন</small><button type="button" class="lnk" id="cso">↕ সাজান</button></label><div id="cpk" class="cpk"></div>
 <div class="cadd"><input id="cnw" maxlength="24" placeholder="নতুন ক্যাটাগরির নাম লিখুন"><button type="button" class="btn sm p" id="cna">＋ যোগ</button></div>
 <label>লোগো</label><div class="lg"><div id="lp"></div><div class="lb">
 <button type="button" class="btn sm" id="la">🌐 অটো</button><button type="button" class="btn sm" id="lr">🎲 এলোমেলো</button>
 <button type="button" class="btn sm" id="lu">🖼 ছবি</button><button type="button" class="btn sm" id="ll">Aa অক্ষর</button><input type="file" id="lf" accept="image/*" hidden></div></div>
 <p class="hint">অটো: সাইটের নিজের লোগো আসবে, না থাকলে অ্যাপের লোগো।</p>
 <label>আইডি / ইমেইল (ঐচ্ছিক)</label><input id="fi2" autocomplete="off" value="${esc(d.u)}" placeholder="${s.u?"বদলাতে নতুন আইডি লিখুন":""}">
 <label>পাসওয়ার্ড (ঐচ্ছিক)</label><input id="fp" type="password" autocomplete="new-password" value="${esc(d.p)}" placeholder="${s.p?"বদলাতে নতুন পাসওয়ার্ড লিখুন":""}">
 <p class="hint">আইডি/পাসওয়ার্ড দিলে পিন দিয়ে লক হয়ে ফোনেই থাকবে।</p>${s.u||s.p?`<div class="rw">${s.u?'<button type="button" class="btn sm" id="xu">🗑 সেভ করা আইডি মুছুন</button>':""}${s.p?'<button type="button" class="btn sm" id="xp">🗑 সেভ করা পাসওয়ার্ড মুছুন</button>':""}</div>`:""}
 <div class="row"><button class="btn" data-close="1">বাতিল</button><button class="btn p" id="fs">সেভ করুন</button></div>`);
 const dd=()=>({name:$("#fn").value,url:$("#fu").value,u:$("#fi2").value,p:$("#fp").value,ds:$("#fd").value,cs:[...sel],ic});
 const pv=()=>{$("#lp").innerHTML=icoHtml({name:$("#fn").value||"?",url:$("#fu").value,ic})};
 const cp=()=>{$("#cpk").innerHTML=[...vcats(),...nw].map(c=>`<button type="button" class="cp${sel.has(c)?" on":""}" data-k="${esc(c)}">${sel.has(c)?"✓ ":""}${esc(c)}</button>`).join("")||'<span class="hint">এখনো কোনো ক্যাটাগরি নেই। নিচে নাম লিখে যোগ করুন।</span>'};
 const addc=()=>{const v=$("#cnw").value.trim().slice(0,24);if(!v)return;if(!sel.has(v)&&sel.size>=8)return toast("একটি সাইটে সর্বোচ্চ ৮টি ক্যাটাগরি");if(![...cats(),...nw].includes(v))nw.push(v);sel.add(v);$("#cnw").value="";cp()};
 cp();pv();
 $("#cpk").onclick=e=>{const b=e.target.closest("[data-k]");if(!b)return;const k=b.dataset.k;if(sel.has(k))sel.delete(k);else if(sel.size>=8)return toast("একটি সাইটে সর্বোচ্চ ৮টি ক্যাটাগরি");else sel.add(k);cp()};
 $("#cna").onclick=addc;$("#cnw").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();addc()}};
 $("#cso").onclick=()=>{const x=dd();cLog=[];catMgr(()=>{x.cs=x.cs.map(c=>{for(const[o,v]of cLog)if(c===o)c=v;return c}).filter(Boolean);cLog=[];form(n?null:s,x)})};
 $("#fn").oninput=()=>{if(ic&&ic.t==="L")pv()};$("#fu").onchange=pv;
 $("#la").onclick=()=>{ic=null;pv()};
 $("#lr").onclick=()=>{ic={t:"e",v:EMO[Math.random()*EMO.length|0],h:Math.random()*360|0};pv()};
 $("#ll").onclick=()=>{ic={t:"L"};pv()};
 $("#lu").onclick=()=>$("#lf").click();
 $("#lf").onchange=async e=>{try{ic={t:"img",v:await cropImg(e.target.files[0])};pv()}catch(x){toast("ছবি পড়া যায়নি")}};
 if($("#xu"))$("#xu").onclick=()=>{xu=1;$("#xu").disabled=true;$("#xu").textContent="সেভ করলে মুছে যাবে"};
 if($("#xp"))$("#xp").onclick=()=>{xp=1;$("#xp").disabled=true;$("#xp").textContent="সেভ করলে মুছে যাবে"};
 $("#fs").onclick=()=>{
  const pend=$("#cnw").value.trim().slice(0,24);if(pend)sel.add(pend);
  const name=$("#fn").value.trim().slice(0,60),url=$("#fu").value.trim().slice(0,500),u=$("#fi2").value,p=$("#fp").value,ds=$("#fd").value.trim().slice(0,200),cl=[...sel].slice(0,8);
  if(!name||!url)return toast("নাম ও URL দিন");
  if(norm(url)==="about:blank")return toast("URL ঠিক নেই");
  const fin=async()=>{const o=n?{id:Date.now(),fav:fv?1:0,n:0}:s;o.name=name;o.url=url;if(ds)o.ds=ds;else delete o.ds;if(ic)o.ic=ic;else delete o.ic;
   cl.forEach(c=>{if(!cats().includes(c)){CATS=cats();CATS.push(c);saveCats()}});if(cl.length)o.cs=cl;else delete o.cs;delete o.cat;
   if(xu&&!u)delete o.u;if(xp&&!p)delete o.p;
   if(u||p){if(u)o.u=await enc(u);if(p)o.p=await enc(p)}
   if(n)sites.push(o);save();closeSheet();render()};
  const go=()=>{if(u||p){const x=dd();needKey(fin,()=>form(n?null:s,x))}else fin()};
  if(n&&sites.some(x=>host(x.url)===host(url))){const x=dd();ask("এই সাইট আগে থেকেই আছে। আবার যোগ করবেন?",go,()=>form(n?null:s,x))}else go();
 };
}

/* ---- detail ---- */
function detail(id){
 const s=sites.find(x=>x.id===id);if(!s)return;
 openSheet(`<div class="dh"><div class="wrap">${icoHtml(s)}</div><div><h3>${esc(s.name)}</h3><p class="hint">${esc(host(s.url))}${s.n?" · "+bn(s.n)+" বার খোলা":""}</p>${(s.cs||[]).length?`<p class="hint">🗂 ${esc(s.cs.join("، "))}</p>`:""}</div></div>
 ${s.ds?`<p class="ds">${esc(s.ds)}</p>`:'<p class="hint">এই সাইটের কাজ লেখা নেই। ✎ এডিট থেকে যোগ করতে পারেন।</p>'}
 <button class="btn p w" id="do">ক্রোমে খুলুন</button>
 ${s.u||s.p?`<div class="row">${s.u?'<button class="btn" id="cu">আইডি কপি</button>':""}${s.p?'<button class="btn" id="cp">পাসওয়ার্ড কপি</button>':""}</div>`:""}
 <div class="row"><button class="btn" id="df">${s.fav?"★ প্রিয় সরান":"☆ প্রিয়"}</button><button class="btn" id="de">✎ এডিট</button></div>
 <button class="btn d w" id="dd">🗑 রিমুভ করুন</button>`);
 $("#do").onclick=()=>{closeSheet();openSite(s);render()};
 $("#df").onclick=()=>{s.fav=s.fav?0:1;save();closeSheet();render()};
 $("#de").onclick=()=>form(s);
 $("#dd").onclick=()=>ask("\""+s.name+"\" রিমুভ করবেন?",()=>{const ix=sites.indexOf(s);sites=sites.filter(x=>x!==s);BIN.unshift({t:Date.now(),s});BIN=BIN.slice(0,200);saveBin();save();render();toast("রিমুভ হয়েছে",["ফিরিয়ে আনুন",()=>{BIN=BIN.filter(x=>x.s!==s);saveBin();sites.splice(Math.min(ix,sites.length),0,s);save();render()}])});
 const cp=f=>()=>needKey(async()=>{try{await navigator.clipboard.writeText(await dec(s[f]));toast("কপি হয়েছে। অ্যাপে ফিরলে ক্লিপবোর্ড মুছে যাবে");clipP=1;setTimeout(clipClr,30000)}catch(e){toast("কপি করা যায়নি")}});
 if($("#cu"))$("#cu").onclick=cp("u");if($("#cp"))$("#cp").onclick=cp("p");
}

/* ---- category manager ---- */
function catMgr(back){
 CATS=cats();
 openSheet(`<h3>ক্যাটাগরি সাজান</h3><p class="hint">☰ ধরে টেনে বা ▲▼ চেপে আগে-পিছে করুন। হোমে গ্রুপ ও চিপ এই ক্রমেই দেখাবে।</p>
 <div id="cml">${CATS.some(c=>showHid||!P.hid.includes(c))?CATS.map((c,i)=>!showHid&&P.hid.includes(c)?"":`<div class="cm" data-ci="${i}"><button class="dg" data-cg="1" aria-label="টেনে সরান">☰</button><b>${esc(c)}</b><small>${bn(sites.filter(x=>(x.cs||[]).includes(c)).length)}টি</small><button class="mo" data-cu="${i}" aria-label="উপরে">▲</button><button class="mo" data-cd="${i}" aria-label="নিচে">▼</button><button class="mo" data-ch="${i}" aria-label="${P.hid.includes(c)?"দেখান":"লুকান"}">${P.hid.includes(c)?"👁":"🙈"}</button><button class="mo" data-ce="${i}" aria-label="নাম বদলান">✎</button><button class="mo" data-cx="${i}" aria-label="মুছুন">🗑</button></div>`).join(""):'<p class="hint">কোনো ক্যাটাগরি নেই</p>'}</div>
 <label>নতুন ক্যাটাগরি</label><div class="cadd"><input id="cn" maxlength="24" placeholder="যেমন: কাজ, গেম, পড়াশোনা"><button class="btn sm p" id="ca">＋ যোগ</button></div>
 <div class="row"><button class="btn p" id="cmx">${back?"ফর্মে ফিরুন":"শেষ"}</button></div>`);
 $("#cmx").onclick=()=>{closeSheet();if(back)back()};
 $("#ca").onclick=()=>{const n=$("#cn").value.trim().slice(0,24);if(!n)return toast("নাম দিন");if(CATS.includes(n))return toast("এটি আগে থেকেই আছে");CATS.push(n);saveCats();render();catMgr(back)};
 $("#cn").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();$("#ca").click()}};
 $("#cml").addEventListener("pointerdown",e=>{const h=e.target.closest("[data-cg]");if(!h)return;e.preventDefault();const row=h.closest(".cm");row.classList.add("drag");
  const mv=ev=>{const t=document.elementsFromPoint(ev.clientX,ev.clientY).find(x=>x!==row&&x.matches&&x.matches("#cml .cm"));if(!t)return;const r=t.getBoundingClientRect();if(ev.clientY<r.top+r.height/2)t.before(row);else t.after(row)};
  const up=()=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);
   {const v=[...document.querySelectorAll("#cml .cm")].map(x=>CATS[+x.dataset.ci]);CATS=[...v,...CATS.filter(c=>!v.includes(c))]}saveCats();render();catMgr(back)};
  addEventListener("pointermove",mv);addEventListener("pointerup",up);addEventListener("pointercancel",up)});
 $("#cml").onclick=e=>{const g=k=>{const b=e.target.closest("["+k+"]");return b?+b.getAttribute(k):-1};
  const u=g("data-cu"),d=g("data-cd"),ed=g("data-ce"),x=g("data-cx"),ch=g("data-ch");
  if(ch>=0){const c=CATS[ch],tg=()=>{if(P.hid.includes(c))P.hid=P.hid.filter(z=>z!==c);else{P.hid.push(c);if(cat===c)cat=""}savePrefs();render();toast(P.hid.includes(c)&&!showHid?"লুকানো হয়েছে। দেখতে সেটিংস → গোপনীয়তা থেকে আনলক করুন":"আপডেট হয়েছে");catMgr(back)};
   return(P.hid.includes(c)||meta)?tg():needKey(tg,()=>catMgr(back))}
  if(u>=0||d>=0){const i=u>=0?u:d,dir=u>=0?-1:1;let j=i+dir;while(j>=0&&j<CATS.length&&!showHid&&P.hid.includes(CATS[j]))j+=dir;if(j>=0&&j<CATS.length){[CATS[i],CATS[j]]=[CATS[j],CATS[i]];saveCats();render()}return catMgr(back)}
  if(ed>=0){const old=CATS[ed];openSheet(`<h3>নাম বদলান</h3><input id="rn" maxlength="24" value="${esc(old)}"><div class="row"><button class="btn" id="rc">বাতিল</button><button class="btn p" id="rs">সেভ করুন</button></div>`);
   $("#rc").onclick=()=>catMgr(back);
   $("#rs").onclick=()=>{const n=$("#rn").value.trim().slice(0,24);if(!n)return toast("নাম দিন");if(n!==old&&CATS.includes(n))return toast("এটি আগে থেকেই আছে");
    cLog.push([old,n]);CATS[ed]=n;P.hid=P.hid.map(c=>c===old?n:c);savePrefs();sites.forEach(z=>{if(z.cs)z.cs=[...new Set(z.cs.map(c=>c===old?n:c))]});if(cat===old)cat=n;save();saveCats();render();catMgr(back)}}
  if(x>=0){const old=CATS[x];ask("\""+old+"\" ক্যাটাগরি মুছবেন? সাইটগুলো থাকবে, শুধু ক্যাটাগরি সরবে।",()=>{cLog.push([old,null]);CATS.splice(x,1);P.hid=P.hid.filter(c=>c!==old);savePrefs();sites.forEach(z=>{if(z.cs){z.cs=z.cs.filter(c=>c!==old);if(!z.cs.length)delete z.cs}});if(cat===old)cat="";save();saveCats();render();catMgr(back)},()=>catMgr(back))}
 };
}

/* ---- reorder ---- */
function move(id,dir){const v=list().map(x=>x.id),i=v.indexOf(id),j=i+dir;if(i<0||j<0||j>=v.length)return;
 const a=sites.findIndex(x=>x.id===id),b=sites.findIndex(x=>x.id===v[j]);[sites[a],sites[b]]=[sites[b],sites[a]];save();render();
 const el=document.querySelector(`[data-r="${id}"]`);if(el)el.scrollIntoView({block:"nearest"})}
let dr=null;
let dX=0,dY=0,dT;
function place(){if(!dr)return;const t=document.elementsFromPoint(dX,dY).find(n=>n!==dr&&n.matches&&n.matches("#rl [data-r]"));
 if(!t)return;const r=t.getBoundingClientRect();if(t.classList.contains("app")?dX<r.left+r.width/2:dY<r.top+r.height/2)t.before(dr);else t.after(dr)}
function dm(e){dX=e.clientX;dY=e.clientY;place()}
function du(){if(!dr)return;const row=dr;dr=null;clearInterval(dT);row.classList.remove("drag");
 removeEventListener("pointermove",dm);removeEventListener("pointerup",du);removeEventListener("pointercancel",du);
 const ids=[...document.querySelectorAll("#rl [data-r]")].map(n=>+n.dataset.r),set=new Set(ids),slots=[];
 sites.forEach((x,i)=>{if(set.has(x.id))slots.push(i)});const by=new Map(sites.map(x=>[x.id,x]));
 slots.forEach((p,k)=>{sites[p]=by.get(ids[k])});save();render()}
$("#main").addEventListener("pointerdown",e=>{const h=e.target.closest("[data-dg]");if(!h)return;e.preventDefault();
 try{h.releasePointerCapture(e.pointerId)}catch(x){}
 dr=h.closest("[data-r]");dr.classList.add("drag");dX=e.clientX;dY=e.clientY;dT=setInterval(()=>{const mr=$("#main").getBoundingClientRect();if(dY<mr.top+70)$("#main").scrollTop-=10;else if(dY>mr.bottom-130)$("#main").scrollTop+=10;place()},16);addEventListener("pointermove",dm);addEventListener("pointerup",du);addEventListener("pointercancel",du)});

/* ---- events ---- */
const M=$("#main");
let lx=0,ly=0;
const lpOpen=t=>{if(lp||sm)return;lp=1;clearTimeout(lpT);try{navigator.vibrate&&navigator.vibrate(15)}catch(x){}detail(+t.dataset.o)};
M.addEventListener("pointerdown",e=>{lp=0;clearTimeout(lpT);const t=e.target.closest("[data-o]");if(!t||e.target.closest("[data-m]"))return;lx=e.clientX;ly=e.clientY;lpT=setTimeout(()=>lpOpen(t),450)});
M.addEventListener("pointermove",e=>{if(Math.abs(e.clientX-lx)>12||Math.abs(e.clientY-ly)>12)clearTimeout(lpT)});
["pointerup","pointercancel"].forEach(v=>M.addEventListener(v,()=>clearTimeout(lpT)));
M.addEventListener("contextmenu",e=>{const t=e.target.closest("[data-o]");if(t){e.preventDefault();lpOpen(t)}});
M.addEventListener("click",e=>{
 if(lp){lp=0;return}
 if(sm){const t=e.target.closest("[data-o]");if(t){const id=+t.dataset.o;if(selSet.has(id))selSet.delete(id);else selSet.add(id);render()}return}
 if(e.target.closest("[data-ro]")){ro=false;return render()}
 if(e.target.closest("[data-hl]")){showHid=false;return render()}
 if(e.target.closest("[data-oa]"))return openAll(list().filter(s=>norm(s.url)!=="about:blank"));
 const bk=e.target.closest("[data-bk]");if(bk){if(bk.dataset.bk==="s"){try{localStorage.setItem("wh_bks",Date.now())}catch(x){}render()}else{tab="set";setNav()}return}
 const mu=e.target.closest("[data-u]");if(mu)return move(+mu.dataset.u,-1);
 const md=e.target.closest("[data-d]");if(md)return move(+md.dataset.d,1);
 const mb=e.target.closest("[data-m]");if(mb)return detail(+mb.dataset.m);
 const t=e.target.closest("[data-o]");if(t){const s=sites.find(x=>x.id==t.dataset.o);if(s){openSite(s);render()}}});
M.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.dataset.o)e.target.click()});
$("#q").addEventListener("input",e=>{q=e.target.value.trim();render()});
let chipSwallow=0;
$("#chips").addEventListener("click",e=>{if(Date.now()<chipSwallow)return;if(e.target.closest("[data-mg]"))return catMgr();const c=e.target.closest("[data-c]");if(c){cat=c.dataset.c;render()}});
/* long-press a category chip, then drag left/right to reorder (saved in the same order the category manager uses) */
(()=>{const box=$("#chips");let tm=0,sx=0,sy=0,chip=null,pid=0,drag=false,lx=0,raf=0;
 const reorderable=el=>el&&el.dataset.c&&el.dataset.c!=="__fav";
 const stopTouch=e=>{if(e.cancelable)e.preventDefault()};
 const loop=()=>{if(!drag)return;const r=box.getBoundingClientRect();if(lx<r.left+36)box.scrollLeft-=9;else if(lx>r.right-36)box.scrollLeft+=9;raf=requestAnimationFrame(loop)};
 const end=save=>{clearTimeout(tm);tm=0;if(!chip)return;const was=drag;drag=false;cancelAnimationFrame(raf);
  box.removeEventListener("pointermove",mv);box.removeEventListener("pointerup",up);box.removeEventListener("pointercancel",cn);document.removeEventListener("touchmove",stopTouch);
  try{box.releasePointerCapture(pid)}catch(x){}
  chip.classList.remove("drag");chip=null;
  if(was){chipSwallow=Date.now()+350;if(save){const vis=vcats(),v=[...box.querySelectorAll(".chip")].map(x=>x.dataset.c).filter(c=>c&&c!=="__fav"&&vis.includes(c));
    let k=0;CATS=cats().map(c=>vis.includes(c)?v[k++]:c);saveCats();toast("ক্যাটাগরির ক্রম বদলেছে")}render()}};
 const mv=e=>{if(e.pointerId!==pid||!chip)return;lx=e.clientX;
  if(!drag){if(Math.hypot(e.clientX-sx,e.clientY-sy)>9){clearTimeout(tm);tm=0;end(false)}return}
  e.preventDefault();
  const t=[...box.querySelectorAll(".chip")].find(x=>x!==chip&&reorderable(x)&&e.clientX>=x.getBoundingClientRect().left&&e.clientX<=x.getBoundingClientRect().right);
  if(t){const r=t.getBoundingClientRect(),after=chip.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING;
   if(after&&e.clientX>r.left+r.width/2)t.after(chip);else if(!after&&e.clientX<r.left+r.width/2)t.before(chip)}};
 const up=e=>{if(e.pointerId===pid)end(true)},cn=e=>{if(e.pointerId===pid)end(true)};
 box.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;const c=e.target.closest(".chip");if(!reorderable(c))return;
  chip=c;pid=e.pointerId;sx=lx=e.clientX;sy=e.clientY;drag=false;
  box.addEventListener("pointermove",mv);box.addEventListener("pointerup",up);box.addEventListener("pointercancel",cn);
  tm=setTimeout(()=>{tm=0;if(!chip)return;drag=true;chip.classList.add("drag");try{box.setPointerCapture(pid)}catch(x){}
   document.addEventListener("touchmove",stopTouch,{passive:false});try{navigator.vibrate&&navigator.vibrate(18)}catch(x){}raf=requestAnimationFrame(loop)},380)});
 box.addEventListener("contextmenu",e=>{if(e.target.closest(".chip"))e.preventDefault()})})();
$("#fab").onclick=()=>form();
$("#selb").onclick=()=>{sm=!sm;selSet.clear();if(sm)ro=false;render()};
function bulkCat(){const pick=new Set(),nw=[];
 openSheet(`<h3>ক্যাটাগরি বাছুন</h3><div id="bcp" class="cpk"></div><div class="cadd"><input id="bcn" maxlength="24" placeholder="নতুন ক্যাটাগরির নাম লিখুন"><button type="button" class="btn sm p" id="bca">＋ যোগ</button></div><div class="row"><button class="btn" id="bcr">এগুলো থেকে সরান</button><button class="btn p" id="bcy">এগুলোতে যোগ করুন</button></div><button class="btn w" data-close="1">বাতিল</button>`);
 const cp=()=>{$("#bcp").innerHTML=[...vcats(),...nw].map(c=>`<button type="button" class="cp${pick.has(c)?" on":""}" data-k="${esc(c)}">${pick.has(c)?"✓ ":""}${esc(c)}</button>`).join("")};cp();
 $("#bcp").onclick=e=>{const b=e.target.closest("[data-k]");if(!b)return;const k=b.dataset.k;if(pick.has(k))pick.delete(k);else pick.add(k);cp()};
 const addc=()=>{const v=$("#bcn").value.trim().slice(0,24);if(!v)return;if(![...cats(),...nw].includes(v))nw.push(v);pick.add(v);$("#bcn").value="";cp()};
 $("#bca").onclick=addc;$("#bcn").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();addc()}};
 const done=n=>{save();saveCats();closeSheet();toast(bn(n)+"টি সাইট আপডেট হয়েছে");render()};
 $("#bcy").onclick=()=>{if(!pick.size)return toast("ক্যাটাগরি বাছুন");CATS=cats();nw.forEach(c=>{if(pick.has(c)&&!CATS.includes(c))CATS.push(c)});let n=0;
  sites.forEach(s=>{if(selSet.has(s.id)){s.cs=[...new Set([...(s.cs||[]),...pick])].slice(0,8);n++}});done(n)};
 $("#bcr").onclick=()=>{if(!pick.size)return toast("ক্যাটাগরি বাছুন");let n=0;
  sites.forEach(s=>{if(selSet.has(s.id)&&s.cs){s.cs=s.cs.filter(c=>!pick.has(c));if(!s.cs.length)delete s.cs;n++}});done(n)}}
$("#bar").addEventListener("click",e=>{const b=e.target.closest("[data-b]");if(!b)return;const k=b.dataset.b;
 if(k==="x"){sm=false;selSet.clear();return render()}
 if(k==="all"){const ids=list().map(x=>x.id);if(ids.length&&ids.every(i=>selSet.has(i)))selSet.clear();else ids.forEach(i=>selSet.add(i));return render()}
 if(!selSet.size)return toast("কিছু বাছাই করুন");
 if(k==="fav"){const ss=sites.filter(s=>selSet.has(s.id)),all=ss.every(s=>s.fav);ss.forEach(s=>s.fav=all?0:1);save();toast("প্রিয় তালিকা আপডেট হয়েছে");return render()}
 if(k==="cat")return bulkCat();
 if(k==="del")ask(bn(selSet.size)+"টি সাইট রিমুভ করবেন? বিনে ৩০ দিন থাকবে।",()=>{
  const rm=sites.map((s,i)=>[i,s]).filter(x=>selSet.has(x[1].id));sites=sites.filter(s=>!selSet.has(s.id));
  rm.forEach(x=>BIN.unshift({t:Date.now(),s:x[1]}));BIN=BIN.slice(0,200);saveBin();save();sm=false;selSet.clear();render();
  toast(bn(rm.length)+"টি সাইট রিমুভ হয়েছে",["ফিরিয়ে আনুন",()=>{BIN=BIN.filter(x=>!rm.some(r=>r[1]===x.s));saveBin();rm.forEach(r=>sites.splice(Math.min(r[0],sites.length),0,r[1]));save();render()}])})});

$("#rob").onclick=()=>{ro=!ro;if(ro){sm=false;selSet.clear()}if(ro&&P.sort!=="added"){P.sort="added";savePrefs();toast("নিজের ক্রম চালু হয়েছে")}render()};
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{tab=b.dataset.t;cat="";ro=false;sm=false;selSet.clear();setNav()});
applyPrefs();applyLogo();setNav();
let pend=null;
{const sp=new URLSearchParams(location.search);if(sp.get("new")==="1"||sp.has("url")||sp.has("text")||sp.has("title")){let u=sp.get("url")||"";if(!u){const m=(sp.get("text")||"").match(/https?:\/\/[^\s]+/i);if(m)u=m[0]}
 const nm=(sp.get("title")||"").slice(0,60)||(u?host(u):"");history.replaceState(null,"",location.pathname);pend=()=>{u||nm?form(null,{url:u,name:nm}):form()}}}
if(P.al&&meta)gate(pend);else if(pend)pend();else if(seed&&!P.gd)guide();
addEventListener("focus",clipClr);document.addEventListener("visibilitychange",()=>{if(!document.hidden)clipClr()});

/* ---- panel ---- */
let vbz=0;const VK="wh_ui",VR=/^[A-Za-z0-9+\/=]+$/;
const vb64=b=>{const u=new Uint8Array(b);let r="";for(let i=0;i<u.length;i+=8192)r+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(r)};
async function venc(t){const iv=crypto.getRandomValues(new Uint8Array(12));return vb64(iv)+"."+vb64(await crypto.subtle.encrypt({name:"AES-GCM",iv},vk,new TextEncoder().encode(t)))}
async function vdec(k,s){const[i,c]=s.split(".");return new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:unb(i)},k,unb(c)))}
function vload(){let r;try{r=localStorage.getItem(VK)}catch(e){return 0}if(r===null)return null;
 try{const m=JSON.parse(r);if(m&&VR.test(m.s||"")&&ENCR.test(m.d||"")){const i=+m.i;return{s:m.s,i:i>=1e5&&i<=1e6?i:250000,d:m.d,f:+m.f||0,l:+m.l||0}}}catch(e){}return 0}
function vput(){try{localStorage.setItem(VK,JSON.stringify(vm));return true}catch(e){return false}}
async function vsave(){try{vm.d=await venc(JSON.stringify(vl));return vput()}catch(e){return false}}
async function vpersist(then){if(!await vsave())toast("সেভ করা যায়নি");then()}
function vlock(){const w=vo;vo=0;vk=null;vl=[];vm=null;ve=0;vx=0;return w}
function vsweep(){if(!vo)return;vlock();$("#sh").innerHTML="";$("#ov").style.visibility="";$("#ov").classList.remove("show")}
function vopen(){if(vo||$("#ov").classList.contains("show"))return;const m=vload();if(m===0)return;if(m&&m.l>Date.now())return;vm=m;vo=1;if(m)vask();else vsetup()}
function vsetup(){
 openSheet(`<h3>পিন সেট করুন</h3><p class="hint">পিন ভুলে গেলে এই তালিকা ফেরত পাওয়া যাবে না।</p><label>পিন (কমপক্ষে ৬ অক্ষর)</label><input id="vp" type="password" autocomplete="off"><label>পিন আবার লিখুন</label><input id="vp2" type="password" autocomplete="off"><div class="row"><button class="btn" id="vc">বাতিল</button><button class="btn p" id="vg">ঠিক আছে</button></div>`);
 $("#vc").onclick=closeSheet;
 $("#vg").onclick=async()=>{if(vbz)return;const a=$("#vp").value;if(a.length<6)return toast("কমপক্ষে ৬ অক্ষরের পিন দিন");if(a!==$("#vp2").value)return toast("দুই পিন মিলছে না");
  vbz=1;let ok=0;
  try{const salt=crypto.getRandomValues(new Uint8Array(16)),k=await derive(a,salt,250000);if(!vo){vbz=0;return}vk=k;vm={s:vb64(salt),i:250000,d:"",f:0,l:0};vl=[];ok=await vsave()}
  catch(e){vbz=0;vk=null;vm=null;return toast("এই ব্রাউজারে লক সাপোর্ট নেই")}
  vbz=0;if(!vo)return;if(!ok){vk=null;vm=null;return toast("সেভ করা যায়নি")}vview(1)}}
function vask(){
 openSheet(`<h3>পিন দিন</h3><input id="vp" type="password" autocomplete="off"><div class="row"><button class="btn" id="vc">বাতিল</button><button class="btn p" id="vg">ঠিক আছে</button></div><button class="btn w" id="vf" style="background:none;color:var(--mu);font-weight:400;font-size:12px">পিন ভুলে গেছি</button>`);
 $("#vp").focus();$("#vc").onclick=closeSheet;$("#vp").onkeydown=e=>{if(e.key==="Enter")$("#vg").click()};
 $("#vf").onclick=()=>ask("তালিকা মুছে নতুন করে শুরু করবেন?",()=>{try{localStorage.removeItem(VK)}catch(e){}});
 $("#vg").onclick=async()=>{const a=$("#vp").value;if(!a||vbz)return;vbz=1;const m=vm;let k=null,L=null;
  try{k=await derive(a,unb(m.s),m.i);L=JSON.parse(await vdec(k,m.d));if(!Array.isArray(L))throw 0}catch(e){k=null}
  vbz=0;if(!vo||vm!==m)return;if(!k){vm.f=(vm.f||0)+1;vm.l=vm.f>=5?Date.now()+Math.min(30000*2**(vm.f-5),3600000):0;vput();return closeSheet()}
  vk=k;vl=L.slice(0,150).map((x,i)=>({id:x&&x.id>0?+x.id:Date.now()+i,name:str(x&&x.name,60),url:str(x&&x.url,500)})).filter(x=>x.name&&x.url).map((x,i,r)=>r.findIndex(y=>y.id===x.id)!==i?{...x,id:Date.now()+1e6+i}:x);vm.f=0;vm.l=0;vput();vview(1)}}
const vico=x=>`<div class="wrap"><div class="ico" style="background:${color(x.name)}">${initial(x.name)}</div></div>`;
const vopn=x=>{const u=norm(x.url);if(u==="about:blank")return toast("URL ঠিক নেই");window.open(u,"_blank","noopener,noreferrer")};
function vview(){
 openSheet(`<div class="row" style="margin:0 0 10px;justify-content:flex-end;gap:0"><button class="mo" id="vtl" aria-label="আরও">⋯</button><button class="mo" id="vcl" aria-label="বন্ধ করুন">✕</button></div><div class="grid" id="vgd">${vl.map(x=>`<div class="app" role="button" tabindex="0" data-vo="${x.id}">${vico(x)}<span class="nm">${esc(x.name)}</span></div>`).join("")}<div class="app" role="button" tabindex="0" data-vadd="1"><div class="wrap"><div class="ico" style="background:var(--sf2);color:var(--ac)"><svg class="i" style="width:28px;height:28px"><use href="#i-plus"/></svg></div></div><span class="nm">যোগ করুন</span></div></div>`);
 $("#vcl").onclick=closeSheet;$("#vtl").onclick=vtools;
 const g=$("#vgd");let lt,lp=0,px=0,py=0;
 g.onpointerdown=e=>{lp=0;clearTimeout(lt);const r=e.target.closest("[data-vo]");if(!r)return;px=e.clientX;py=e.clientY;lt=setTimeout(()=>{lp=1;vdet(+r.dataset.vo)},450)};
 g.onpointermove=e=>{if(Math.abs(e.clientX-px)>12||Math.abs(e.clientY-py)>12)clearTimeout(lt)};
 g.onpointerup=g.onpointercancel=()=>clearTimeout(lt);
 g.oncontextmenu=e=>{const r=e.target.closest("[data-vo]");if(r){e.preventDefault();clearTimeout(lt);lp=1;vdet(+r.dataset.vo)}};
 g.onclick=e=>{if(lp){lp=0;return}if(e.target.closest("[data-vadd]"))return vform(0);const r=e.target.closest("[data-vo]");if(r){const x=vl.find(z=>z.id===+r.dataset.vo);if(x)vopn(x)}};
 g.onkeydown=e=>{if(e.key==="Enter"&&e.target.dataset&&(e.target.dataset.vo!==undefined||e.target.dataset.vadd!==undefined))e.target.click()}}
function vdet(id){
 const x=vl.find(z=>z.id===id);if(!x)return vview();
 openSheet(`<div class="dh">${vico(x)}<div><h3>${esc(x.name)}</h3><p class="hint">${esc(host(x.url))}</p></div></div><button class="btn p w" id="vdo">ক্রোমে খুলুন</button><div class="row"><button class="btn" id="vde">✎ এডিট</button><button class="btn d" id="vdd">🗑 রিমুভ করুন</button></div><button class="btn w" id="vdb">পিছনে</button>`);
 let arm=0;$("#vdb").onclick=()=>vview();$("#vdo").onclick=()=>vopn(x);$("#vde").onclick=()=>vform(id);
 $("#vdd").onclick=()=>{if(!arm){arm=1;$("#vdd").textContent="হ্যাঁ, মুছুন";return}vl=vl.filter(z=>z.id!==id);vpersist(()=>vview())}}
function vform(id){
 const x=id?vl.find(z=>z.id===id):null;
 openSheet(`<h3>${x?"এডিট করুন":"নতুন ওয়েবসাইট"}</h3><label>ওয়েবসাইটের নাম</label><input id="vn" maxlength="60" autocomplete="off" value="${esc(x?x.name:"")}"><label>URL</label><input id="vu" maxlength="500" inputmode="url" autocapitalize="off" autocomplete="off" placeholder="facebook.com" value="${esc(x?x.url:"")}"><div class="row"><button class="btn" id="vb">বাতিল</button><button class="btn p" id="vsv">সেভ করুন</button></div>`);
 $("#vb").onclick=()=>vview();
 $("#vsv").onclick=()=>{const n=$("#vn").value.trim().slice(0,60),u=$("#vu").value.trim().slice(0,500);
  if(!n||!u)return toast("নাম ও URL দিন");if(norm(u)==="about:blank")return toast("URL ঠিক নেই");
  if(x){x.name=n;x.url=u}else{if(vl.length>=150)return toast("সীমা শেষ");vl.push({id:Math.max(Date.now(),...vl.map(z=>z.id))+1,name:n,url:u})}
  vpersist(()=>vview())}}
function vtools(){
 openSheet(`<div class="row" style="margin-top:0"><button class="btn" id="vbk">নামান</button><button class="btn" id="vim">ফেরত আনুন</button></div><input type="file" id="vfi" hidden><button class="btn w" id="vpc">🔑 পিন বদলান</button><button class="btn p w" id="vtb">পিছনে</button>`);
 $("#vtb").onclick=()=>vview();
 $("#vbk").onclick=()=>{dl("cache-"+new Date().toISOString().slice(0,10).replace(/-/g,"")+".dat",JSON.stringify({s:vm.s,i:vm.i,d:vm.d}),"application/octet-stream");toast("ব্যাকআপ নামানো হয়েছে")};
 $("#vim").onclick=()=>$("#vfi").click();
 $("#vfi").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f)return;
  try{if(f.size>2e6)throw 0;const d=JSON.parse(await f.text()),i=+d.i;if(!(VR.test(d.s||"")&&ENCR.test(d.d||"")&&i>=1e5&&i<=1e6))throw 0;
   ask("বর্তমান তালিকা বদলে ফেলবেন? ব্যাকআপের পিন লাগবে।",()=>{try{localStorage.setItem(VK,JSON.stringify({s:d.s,i,d:d.d,f:0,l:0}));toast("ফেরত আনা হয়েছে")}catch(x){toast("সেভ করা যায়নি")}})}catch(x){toast("ফাইলটি ঠিক নেই")}};
 $("#vpc").onclick=vpin}
function vpin(){
 openSheet(`<h3>পিন বদলান</h3><label>নতুন পিন (কমপক্ষে ৬ অক্ষর)</label><input id="vn1" type="password" autocomplete="off"><label>আবার লিখুন</label><input id="vn2" type="password" autocomplete="off"><div class="row"><button class="btn" id="vb">বাতিল</button><button class="btn p" id="vs">বদলান</button></div>`);
 $("#vb").onclick=()=>vtools();
 $("#vs").onclick=async()=>{if(vbz)return;const a=$("#vn1").value;if(a.length<6)return toast("কমপক্ষে ৬ অক্ষরের পিন দিন");if(a!==$("#vn2").value)return toast("দুই পিন মিলছে না");
  vbz=1;const cur=vm,ok=vk,om={...cur};
  try{const salt=crypto.getRandomValues(new Uint8Array(16)),nk=await derive(a,salt,250000);if(!vo||vm!==cur){vbz=0;return}vk=nk;vm.s=vb64(salt);vm.i=250000;if(!await vsave())throw 0;vbz=0;toast("পিন বদলেছে")}
  catch(e){vbz=0;if(vo&&vm===cur){vk=ok;Object.assign(vm,om);toast("পিন বদলানো যায়নি")}}
  if(vo)vview(1)}}
$("#applogo").addEventListener("click",()=>{const n=Date.now();vtt=vtt.filter(t=>n-t<3000);vtt.push(n);if(vtt.length>=5){vtt=[];vopen()}});
document.addEventListener("visibilitychange",()=>{clearTimeout(vh);if(!vo)return;$("#ov").style.visibility=document.hidden?"hidden":"";if(document.hidden)vh=setTimeout(vsweep,45000)});
let idle,hid;
const relock=()=>{key=null;vsweep();if(showHid){showHid=false;render()}};
const wipeAll=()=>{["wh_sites","wh_vault","wh_lock","wh_logo","wh_prefs","wh_cats","wh_bk","wh_bks","wh_bin","wh_log","wh_ui"].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});location.reload()};
function gate(then){if(gating)return;gating=true;document.body.classList.add("gated");
 const go=()=>{needKey(()=>{gating=false;document.body.classList.remove("gated");if(then)then()},go);
  $("#sh").insertAdjacentHTML("beforeend",'<button class="btn d w" id="gfg">পিন ভুলে গেছি</button>');
  $("#gfg").onclick=()=>ask("সব সাইট, পাসওয়ার্ড, লুকানো তালিকা ও সেটিংস মুছে অ্যাপ নতুন করে শুরু হবে। নিশ্চিত?",wipeAll,go)};go()}
const lock=()=>{relock();if(P.al&&meta)gate()};
const bump=()=>{clearTimeout(idle);idle=setTimeout(lock,180000)};
["click","touchstart","keydown"].forEach(v=>addEventListener(v,bump,{passive:true}));
document.addEventListener("visibilitychange",()=>{if(document.hidden)hid=setTimeout(lock,60000);else clearTimeout(hid)});
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
if("serviceWorker"in navigator){const had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)toast("নতুন সংস্করণ তৈরি আছে",["রিলোড",()=>location.reload()])});addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}
