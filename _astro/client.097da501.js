import{r as e,c as y,h as p}from"./client.956ef83d.js";const a=({value:t,name:r,hydrate:o=!0})=>{if(!t)return null;const n=o?"astro-slot":"astro-static-slot";return e.createElement(n,{name:r,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:t}})};a.shouldComponentUpdate=()=>!1;function m(t){for(const r in t)if(r.startsWith("__reactContainer"))return r}const g=t=>(r,o,{default:n,...u},{client:f})=>{if(!t.hasAttribute("ssr"))return;const l={identifierPrefix:t.getAttribute("prefix")};for(const[c,d]of Object.entries(u))o[c]=e.createElement(a,{value:d,name:c});const s=e.createElement(r,o,n!=null?e.createElement(a,{value:n}):n),i=m(t);return i&&delete t[i],f==="only"?e.startTransition(()=>{y(t).render(s)}):e.startTransition(()=>{p(t,s,l)})};export{g as default};