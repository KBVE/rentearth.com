let y=0,k=[];function O(){return y+=1,()=>{if(y-=1,y===0){let e=k;k=[];for(let n of e)n()}}}function L(e){let n=O();return e().finally(n)}let f=[],p=(e,n)=>{let t=[],l={get(){return l.lc||l.listen(()=>{})(),l.value},l:n||0,lc:0,listen(a,i){return l.lc=t.push(a,i||l.l)/2,()=>{let s=t.indexOf(a);~s&&(t.splice(s,2),l.lc--,l.lc||l.off())}},notify(a){let i=!f.length;for(let s=0;s<t.length;s+=2)f.push(t[s],l.value,a,t[s+1]);if(i){for(let s=0;s<f.length;s+=4){let h=!1;for(let u=s+7;u<f.length;u+=4)if(f[u]<f[s+3]){h=!0;break}h?f.push(f[s],f[s+1],f[s+2],f[s+3]):f[s](f[s+1],f[s+2])}f.length=0}},off(){},set(a){l.value!==a&&(l.value=a,l.notify())},subscribe(a,i){let s=l.listen(a,i);return a(l.value),s},value:e};return l};const M=5,g=6,E=10;let N=(e,n,t,l)=>(e.events=e.events||{},e.events[t+E]||(e.events[t+E]=l(a=>{e.events[t].reduceRight((i,s)=>(s(i),i),{shared:{},...a})})),e.events[t]=e.events[t]||[],e.events[t].push(n),()=>{let a=e.events[t],i=a.indexOf(n);a.splice(i,1),a.length||(delete e.events[t],e.events[t+E](),delete e.events[t+E])}),U=1e3,$=(e,n)=>N(e,l=>{let a=n(l);a&&e.events[g].push(a)},M,l=>{let a=e.listen;e.listen=(...s)=>(!e.lc&&!e.active&&(e.active=!0,l()),a(...s));let i=e.off;return e.events[g]=[],e.off=()=>{i(),setTimeout(()=>{if(e.active&&!e.lc){e.active=!1;for(let s of e.events[g])s();e.events[g]=[]}},U)},()=>{e.listen=a,e.off=i}}),R=(e={})=>{let n=p(e);return n.setKey=function(t,l){typeof l>"u"?t in n.value&&(n.value={...n.value},delete n.value[t],n.notify(t)):n.value[t]!==l&&(n.value={...n.value,[t]:l},n.notify(t))},n},m=e=>e,d={},c={addEventListener(){},removeEventListener(){}};function S(){try{return typeof localStorage<"u"}catch{return!1}}S()&&(d=localStorage);let A={addEventListener(e,n,t){window.addEventListener("storage",n),window.addEventListener("pageshow",t)},removeEventListener(e,n,t){window.removeEventListener("storage",n),window.removeEventListener("pageshow",t)}};typeof window<"u"&&(c=A);function T(e,n={},t={}){let l=t.encode||m,a=t.decode||m,i=R(),s=i.setKey;i.setKey=(r,o)=>{typeof o>"u"?(t.listen!==!1&&c.perKey&&c.removeEventListener(e+r,u,v),delete d[e+r]):(t.listen!==!1&&c.perKey&&!(r in i.value)&&c.addEventListener(e+r,u,v),d[e+r]=l(o)),s(r,o)};let h=i.set;i.set=function(r){for(let o in r)i.setKey(o,r[o]);for(let o in i.value)o in r||i.setKey(o)};function u(r){r.key?r.key.startsWith(e)&&(r.newValue===null?s(r.key.slice(e.length),void 0):s(r.key.slice(e.length),a(r.newValue))):h({})}function v(){let r={...n};for(let o in d)o.startsWith(e)&&(r[o.slice(e.length)]=a(d[o]));i.set(r)}return $(i,()=>{if(v(),t.listen!==!1)return c.addEventListener(e,u,v),()=>{c.removeEventListener(e,u,v);for(let r in i.value)c.removeEventListener(e+r,u,v)}}),i}Object.freeze("");const z="e77af3f6-a0e3-44b7-82f8-b7c098d38022",D="https://js.hcaptcha.com/1/api.js",Q=p(""),w=p(""),W=T("kbve:");T("rent:");const _=async e=>{L(async()=>{w.set(e),console.log(`[LOG] ${w.get()}`)})},G=async e=>{L(async()=>{Q.set(e)})},I=async(e,n)=>{L(async()=>{_(`Storing ${n} into locker for ${e}`),W.setKey(e,n)})};export{D as a,Q as b,I as c,p as d,z as h,W as k,_ as l,G as n};