(function(r,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(r=typeof globalThis<"u"?globalThis:r||self,f(r.rosana={}))})(this,function(r){"use strict";const f=class{constructor(){this.element=null,this.elementClasses=[],this.eventListeners=[]}addChild(t){return t instanceof f&&this.element?this.element.appendChild(t.element):console.error("Mounted Child Is Not A Rosana Component"),this}set alignment(t){t?$(this.element,t):console.log("Alignment Options Undefined")}batch(t){return Object.entries(t).forEach(([n,s])=>{requestAnimationFrame(()=>{this.element&&(this.element[n]=s)})}),this}on(t,n){var s;return(s=this.element)==null||s.addEventListener(t,n),this.eventListeners.push([t,n]),this}css(t){var s;const n=a(t);return(s=this.element)==null||s.classList.add(n),this.elementClasses.push(n),this}destroyChild(t){var n;return t instanceof f?(t.eventListeners.forEach(([s,e])=>{var o;(o=t.element)==null||o.removeEventListener(s,e)}),(n=t.element)==null||n.remove()):console.error("Child Is Not A Rosana Component"),this}show(){this.css({visibility:"visible"})}hide(){this.css({visibility:"hidden"})}set gone(t){this.css({display:t?"none !important":"block",visibility:t?"hidden":"visible"})}};let x=0,v=0;function w(){return`rosana-id-${x++}`}function N(){return`rosana-class-${v++}`}const a=(t,...n)=>{const s=N(),e=document.styleSheets[0];let o="",i=[],l=[];const g=(u,c)=>{let d="";return Object.entries(u).forEach(([h,m])=>{if(typeof m=="object")if(h.startsWith("@"))l.push({media:h,selector:c,styles:m});else if(h.startsWith("&:")){const D=h.replace("&",c);i.push({selector:D,styles:m})}else i.push({selector:`${c} ${h}`,styles:m});else d+=`${h.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${m}; `}),d};return typeof t=="object"&&!Array.isArray(t)?o=g(t,`.${s}`):Array.isArray(t)&&(o=t.reduce((u,c,d)=>u+c+(n[d]||""),"")),o&&e.insertRule(`.${s} { ${o} }`,e.cssRules.length),i.forEach(({selector:u,styles:c})=>{const d=g(c,u);if(d){const h=`${u} { ${d} }`;e.insertRule(h,e.cssRules.length)}}),l.forEach(({media:u,selector:c,styles:d})=>{const h=g(d,c);if(h){const m=`${u} { ${c} { ${h} } }`;e.insertRule(m,e.cssRules.length)}}),s};let R=["noscrollbar","scrollxy","scrollx","scrolly","top","bottom","left","right","horizontal","vertical","vcenter","center","fillxy","fillx","filly"];const $=(t,n)=>{const s={noscrollbar:()=>{t.classList.add("noscrollbar")},fillxy:()=>{let e=a({width:"100%",height:window.innerHeight+"px"});t.classList.add(e)},fillx:()=>{let e=a({width:"100%"});t.classList.add(e)},filly:()=>{let e=a({height:window.innerHeight+"px"});t.classList.add(e)},scrollxy:()=>{let e=a({overflow:"auto"});t.classList.add(e)},scrollx:()=>{let e=a({overflowX:"auto"});t.classList.add(e)},scrolly:()=>{let e=a({overflowY:"auto"});t.classList.add(e)},left:()=>{let e=a({display:"flex",justifyContent:"flex-start"});t.classList.add(e)},right:()=>{let e=a({display:"flex",justifyContent:"flex-end"});t.classList.add(e)},center:()=>{let e=a({display:"flex",alignItems:"center",justifyContent:"center"});t.classList.add(e)},vcenter:()=>{let e=a({display:"flex",justifyContent:"center",alignItems:"center"});t.classList.add(e)},bottom:()=>{let e=a({display:"flex",alignItems:"flex-end"});t.classList.add(e)},top:()=>{let e=a({display:"flex",alignItems:"flex-start"});t.classList.add(e)},horizontal:()=>{let e=a({display:"flex",flexDirection:"row !important"});t.classList.add(e)},vertical:()=>{let e=a({display:"flex",flexDirection:"column"});t.classList.add(e)}};n.toLowerCase().replace(/\s/g,"").split(",").forEach(e=>{R.includes(e)?s[e]():console.error(`Unknown option: ${e}`)})};function _(t,n,s){s&&$(t,s);let e=n.toLowerCase();if(e=="linear"){let o=a({display:"inline-flex",position:"relative !important",flexDirection:"column !important"});t.classList.add(o)}else if(e=="absolute"){let o=a({display:"flex"});t.classList.add(o)}else console.error("Unknown Layout ",t)}let A=class extends f{constructor(t,n){super(),this.element=document.createElement("div"),this.element.id=w(),this.element.type="Layout",t&&_(this.element,t,n)}},T=class extends f{constructor(t,n,s){if(super(),this.element=document.createElement(t),this.element.id=w(),Object.entries(s).forEach(([e,o])=>{requestAnimationFrame(()=>{this.element[e]=o})}),n instanceof f)n.addChild(this);else{console.error("No Parent For Component To Attach To.");return}}};const j=function(t="linear",n="fillxy, vcenter"){return new A(t,n)},E=function(t,n,s={}){return new T(t,n,s)},z=function(t){return{_rootComponent:t,_plugins:[],mount:function(s){const e=document.querySelector(s);if(!e){console.error(`No element found for selector "${s}"`);return}document.body.style.margin="0",document.body.style.width="100%",e.innerHTML="";const o=this._rootComponent;return e.appendChild(o.element),this},use(s){return typeof s._install=="function"&&(s._install(this),this._plugins.push(s)),this}}},L=function(t=null){let n=t,s=[];const e=function(o){for(let i of s)i(n)};return{set value(o){n=o,e()},get value(){return n},subscribe:o=>{s.push(o)}}},S=function(t={}){let n={...t};const s=new Set;return{set(e,o){n[e]=o,s.forEach(i=>i(n))},get(e){return n[e]},subscribe(e){return s.add(e),()=>s.delete(e)}}},b=(navigator.language||navigator.userLanguage).split("-")[0];let y={},p;const F=async function(t=b,n){p=L(t);const s=await fetch(n);if(!s.ok){console.log("Translation File Not Loaded");return}const e=await s.json();y={...y,...e}},I=function(t){p.value=t};let C=function(t,n){if(!p||!p.value)return t;let e=(y[p.value]||y[b]||{})[t]||t;return n&&Object.keys(n).forEach(o=>{e=e.replace(`{${o}}`,n[o])}),e};f.prototype.localizedText=async function(t,n){if(!p||!p.value)return t;const s=await C(t,n);this.element.textContent=s,p.subscribe(async()=>{const e=await C(t,n);this.element.textContent=e})};const P=function(t){return{routes:t,currentRoute:null,params:{},_init:function(){return console.table(this.routes),window.addEventListener("hashchange",this._handleHashChange.bind(this)),window.location.hash?this._handleHashChange():window.location.hash="#/",this},_install:function(s){this._init(),s.router=this},_render:function(){const s=document.querySelector("#app");if(!s){console.error("App container not found.");return}if(s.innerHTML="",this.currentRoute&&this.currentRoute.component){const e=this.currentRoute.component;s.appendChild(e.element),typeof e.updateParams=="function"&&e.updateParams(this.params)}else console.error("No valid component found for route.")},_handleHashChange:function(){const s=window.location.hash.slice(1)||"/",e=this._matchRoute(s);e?(this.currentRoute=e.route,this.params=e.params,this._render()):console.error(`Route not found: ${s}`)},_matchRoute(s){for(const e of this.routes){const{regex:o,keys:i}=this._pathToRegex(e.path),l=s.match(o);if(l){const g=i.reduce((u,c,d)=>(u[c]=l[d+1],u),{});return{route:e,params:g}}}return null},_pathToRegex(s){const e=[],o=s.replace(/:([\w]+)/g,(i,l)=>(e.push(l),"([^\\/]+)")).replace(/\//g,"\\/");return{regex:new RegExp(`^${o}$`),keys:e}},navigate(s,e={}){const o=s.replace(/:([\w]+)/g,(i,l)=>e[l]===void 0?(console.error(`Parameter "${l}" not provided for path: ${s}`),`:${l}`):e[l]);window.location.hash=o},back:function(){history.back()},forward:function(){history.forward()}}},H=function(t,n,s){if(n===void 0||s===void 0){console.error("showIF not called, one of the elements is undefined");return}t?n.show():n.hide(),t?s.hide():s.show()},O=(t,n,s)=>{const e=[],o=()=>e.forEach(i=>i());if(n.type==="Layout"&&s.type==="Layout"){if(!s.hasChild(n)){console.error(`FallBack is not a child of ${s}`);return}ap.mount(n);const i=()=>{n.show(),s.hide()},l=()=>{s.show(),n.hide()};i(),Promise.resolve(t()).then(()=>{l(),o()}).catch(()=>i())}else console.error("suspense must be used with both containers as a layout");return{effects:i=>e.push(i)}};r.$component=E,r.$createApp=z,r.$hashRouter=P,r.$layout=j,r.$localize=F,r.$setLanguage=I,r.$showIF=H,r.$signal=L,r.$store=S,r.$suspense=O,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=rosana.umd.js.map