import{S as c,i as l,s as f,u,v as p,w as m,x as g,y as d,z as h,o as $,e as _,c as x,A as w,b,f as S,n as y,d as v}from"./index.62c63a4e.js";import{W as L}from"./WidgetWrapper.dd4a4674.js";import{l as M}from"./appwrite.3f3751a0.js";import{c as r,n as i,l as H}from"./storage.4a41c484.js";import"./_commonjsHelpers.725317a4.js";function D(s){let e,n='<div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-400"></div> <p class="py-5 text-lg gradient-text">Logging Out...</p>';return{c(){e=_("selection"),e.innerHTML=n,this.h()},l(t){e=x(t,"SELECTION",{class:!0,"data-svelte-h":!0}),w(e)!=="svelte-zq891h"&&(e.innerHTML=n),this.h()},h(){b(e,"class","flex flex-col justify-center items-center")},m(t,a){S(t,e,a)},p:y,d(t){t&&v(e)}}}function W(s){let e,n;return e=new L({props:{background:"https://images.unsplash.com/photo-1530406472580-81dc39c4babe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1446&q=80",$$slots:{default:[D]},$$scope:{ctx:s}}}),{c(){u(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){m(e,t,a),n=!0},p(t,[a]){const o={};a&4&&(o.$$scope={dirty:a,ctx:t}),e.$set(o)},i(t){n||(g(e.$$.fragment,t),n=!0)},o(t){d(e.$$.fragment,t),n=!1},d(t){h(e,t)}}}function q(s,e,n){let t=!1;const a=async()=>{try{const o=await M();r("email",""),r("uuid",""),r("last",""),r("emailVerification",""),r("phoneVerification",""),r("phone",""),r("username",""),i("User has been logged out!")}catch(o){o instanceof Error&&(H(o.message),i(o.message))}finally{location.assign("/")}};return $(()=>{n(0,t=!0)}),s.$$.update=()=>{s.$$.dirty&1&&t&&a()},[t]}class j extends c{constructor(e){super(),l(this,e,q,W,f,{})}}export{j as default};