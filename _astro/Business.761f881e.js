import{S as Ne,i as Se,s as ce,e as h,t as Q,l as B,c as _,a as T,p as K,d as m,m as $,A as J,b as c,f as O,g as i,E as X,r as Y,n as se,h as ie,u as de,B as re,v as pe,w as me,x as A,y as R,H as ue,z as he,j as Be,o as $e,k as Le,D as te,F as Ae,O as Oe,G as We,I as fe}from"./index.62c63a4e.js";import{e as ye,A as oe}from"./constants.e82e8530.js";import{W as Fe}from"./WidgetWrapper.dd4a4674.js";import{b as De,n as H,c as ke,l as Me,k as Re}from"./storage.4a41c484.js";import Ge from"./Logo.07373d35.js";import{d as Ue,_ as Ve,Q as we}from"./appwrite.3f3751a0.js";import"./_commonjsHelpers.725317a4.js";function He(n){let t,s,e,o,u,l,a,r='<span class="sr-only">Close</span> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg>',d,w;return{c(){t=h("div"),s=h("div"),e=h("div"),o=h("div"),u=Q(n[0]),l=B(),a=h("button"),a.innerHTML=r,this.h()},l(b){t=_(b,"DIV",{class:!0});var p=T(t);s=_(p,"DIV",{class:!0});var I=T(s);e=_(I,"DIV",{id:!0,class:!0,role:!0});var v=T(e);o=_(v,"DIV",{class:!0});var x=T(o);u=K(x,n[0]),x.forEach(m),l=$(v),a=_(v,"BUTTON",{type:!0,class:!0,"data-dismiss-target":!0,"aria-label":!0,"data-svelte-h":!0}),J(a)!=="svelte-1xledel"&&(a.innerHTML=r),v.forEach(m),I.forEach(m),p.forEach(m),this.h()},h(){c(o,"class","ml-3 text-sm font-normal capitalize p-2"),c(a,"type","button"),c(a,"class","ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"),c(a,"data-dismiss-target","#toast-default"),c(a,"aria-label","Close"),c(e,"id","toast-default"),c(e,"class","flex float-right items-center w-full max-w-xs p-4 bg-offset rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"),c(e,"role","alert"),c(s,"class","absolute bottom-0 right-0"),c(t,"class","relative")},m(b,p){O(b,t,p),i(t,s),i(s,e),i(e,o),i(o,u),i(e,l),i(e,a),d||(w=X(a,"click",n[1]),d=!0)},p(b,[p]){p&1&&Y(u,b[0])},i:se,o:se,d(b){b&&m(t),d=!1,w()}}}function Je(n,t,s){let e;return ie(n,De,u=>s(0,e=u)),[e,async()=>{H("")}]}class Pe extends Ne{constructor(t){super(),Se(this,t,Je,He,ce,{})}}function Ee(n,t,s){const e=n.slice();return e[23]=t[s],e}function xe(n){let t,s,e=n[23].business_name+"",o,u,l,a=n[23].business_idea+"",r,d,w,b=new Date(n[23].created_at).toLocaleString()+"",p,I,v,x,G="Select",E,F,N;function M(){return n[12](n[23])}return{c(){t=h("tr"),s=h("td"),o=Q(e),u=B(),l=h("td"),r=Q(a),d=B(),w=h("td"),p=Q(b),I=B(),v=h("td"),x=h("button"),x.textContent=G,E=B(),this.h()},l(S){t=_(S,"TR",{});var y=T(t);s=_(y,"TD",{});var g=T(s);o=K(g,e),g.forEach(m),u=$(y),l=_(y,"TD",{});var L=T(l);r=K(L,a),L.forEach(m),d=$(y),w=_(y,"TD",{});var j=T(w);p=K(j,b),j.forEach(m),I=$(y),v=_(y,"TD",{});var V=T(v);x=_(V,"BUTTON",{class:!0,"data-svelte-h":!0}),J(x)!=="svelte-1d6cbk5"&&(x.textContent=G),V.forEach(m),E=$(y),y.forEach(m),this.h()},h(){c(x,"class","bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded")},m(S,y){O(S,t,y),i(t,s),i(s,o),i(t,u),i(t,l),i(l,r),i(t,d),i(t,w),i(w,p),i(t,I),i(t,v),i(v,x),i(t,E),F||(N=X(x,"click",M),F=!0)},p(S,y){n=S,y&16&&e!==(e=n[23].business_name+"")&&Y(o,e),y&16&&a!==(a=n[23].business_idea+"")&&Y(r,a),y&16&&b!==(b=new Date(n[23].created_at).toLocaleString()+"")&&Y(p,b)},d(S){S&&m(t),F=!1,N()}}}function qe(n){let t,s,e,o="Step 1: Define your business",u,l,a,r,d,w="Input your business name:",b,p,I,v,x="Input your business idea:",G,E,F,N,M,S=n[0]?"Loading":"Generate Business",y,g,L,j="Generated:",V,W,P,_e="<th>Business Name</th> <th>Business Idea</th> <th>Created At</th> <th>Select</th>",ae,ne,be,q=ye(n[4]),C=[];for(let f=0;f<q.length;f+=1)C[f]=xe(Ee(n,q,f));return{c(){t=h("selection"),s=h("div"),e=h("h1"),e.textContent=o,u=B(),l=h("div"),a=h("form"),r=h("div"),d=h("label"),d.textContent=w,b=B(),p=h("input"),I=B(),v=h("label"),v.textContent=x,G=B(),E=h("input"),F=B(),N=h("button"),M=h("span"),y=Q(S),g=B(),L=h("h2"),L.textContent=j,V=B(),W=h("table"),P=h("tr"),P.innerHTML=_e,ae=B();for(let f=0;f<C.length;f+=1)C[f].c();this.h()},l(f){t=_(f,"SELECTION",{});var D=T(t);s=_(D,"DIV",{class:!0});var k=T(s);e=_(k,"H1",{class:!0,"data-svelte-h":!0}),J(e)!=="svelte-12mc7nd"&&(e.textContent=o),u=$(k),l=_(k,"DIV",{});var z=T(l);a=_(z,"FORM",{class:!0,action:!0});var Z=T(a);r=_(Z,"DIV",{});var U=T(r);d=_(U,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),J(d)!=="svelte-wp5x2z"&&(d.textContent=w),b=$(U),p=_(U,"INPUT",{type:!0,name:!0,id:!0,class:!0,placeholder:!0}),I=$(U),v=_(U,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),J(v)!=="svelte-1a1t0fr"&&(v.textContent=x),G=$(U),E=_(U,"INPUT",{type:!0,name:!0,id:!0,class:!0,placeholder:!0}),U.forEach(m),F=$(Z),N=_(Z,"BUTTON",{type:!0,class:!0});var ge=T(N);M=_(ge,"SPAN",{});var ve=T(M);y=K(ve,S),ve.forEach(m),ge.forEach(m),Z.forEach(m),z.forEach(m),k.forEach(m),D.forEach(m),g=$(f),L=_(f,"H2",{"data-svelte-h":!0}),J(L)!=="svelte-1p0q7f"&&(L.textContent=j),V=$(f),W=_(f,"TABLE",{class:!0});var ee=T(W);P=_(ee,"TR",{"data-svelte-h":!0}),J(P)!=="svelte-uktvd7"&&(P.innerHTML=_e),ae=$(ee);for(let le=0;le<C.length;le+=1)C[le].l(ee);ee.forEach(m),this.h()},h(){c(e,"class","text-2xl font-semibold text-white-900 dark:text-white"),c(d,"for","username"),c(d,"class","block mb-2 text-sm font-medium"),c(p,"type","text"),c(p,"name","businessName"),c(p,"id","businessName"),c(p,"class","bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"),c(p,"placeholder","Wild Goat Coffee"),p.required=!0,c(v,"for","username"),c(v,"class","block mb-2 text-sm font-medium"),c(E,"type","text"),c(E,"name","businessIdea"),c(E,"id","businessIdea"),c(E,"class","bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"),c(E,"placeholder","Wild Goat Coffee is a Palo Alto Based Coffee Shop that sells coffee, tea, and pastries."),E.required=!0,c(N,"type","submit"),c(N,"class","w-full bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"),N.disabled=n[0],c(a,"class","space-y-4 md:space-y-6"),c(a,"action","#"),c(s,"class","p-6 sm:p-12"),c(W,"class","w-full text-sm text-left text-white-500 dark:text-gray-400")},m(f,D){O(f,t,D),i(t,s),i(s,e),i(s,u),i(s,l),i(l,a),i(a,r),i(r,d),i(r,b),i(r,p),te(p,n[1]),i(r,I),i(r,v),i(r,G),i(r,E),te(E,n[2]),i(a,F),i(a,N),i(N,M),i(M,y),O(f,g,D),O(f,L,D),O(f,V,D),O(f,W,D),i(W,P),i(W,ae);for(let k=0;k<C.length;k+=1)C[k]&&C[k].m(W,null);ne||(be=[X(p,"input",n[10]),X(E,"input",n[11]),X(a,"submit",Ae(n[7]))],ne=!0)},p(f,D){if(D&2&&p.value!==f[1]&&te(p,f[1]),D&4&&E.value!==f[2]&&te(E,f[2]),D&1&&S!==(S=f[0]?"Loading":"Generate Business")&&Y(y,S),D&1&&(N.disabled=f[0]),D&56){q=ye(f[4]);let k;for(k=0;k<q.length;k+=1){const z=Ee(f,q,k);C[k]?C[k].p(z,D):(C[k]=xe(z),C[k].c(),C[k].m(W,null))}for(;k<C.length;k+=1)C[k].d(1);C.length=q.length}},d(f){f&&(m(t),m(g),m(L),m(V),m(W)),Oe(C,f),ne=!1,We(be)}}}function Ce(n){let t=n[3].$id,s,e,o=Te();return{c(){o.c(),s=re()},l(u){o.l(u),s=re()},m(u,l){o.m(u,l),O(u,s,l),e=!0},p(u,l){l&8&&ce(t,t=u[3].$id)?(fe(),R(o,1,1,se),ue(),o=Te(),o.c(),A(o,1),o.m(s.parentNode,s)):o.p(u,l)},i(u){e||(A(o),e=!0)},o(u){R(o),e=!1},d(u){u&&m(s),o.d(u)}}}function Te(n){let t,s;return t=new Ge({}),{c(){de(t.$$.fragment)},l(e){pe(t.$$.fragment,e)},m(e,o){me(t,e,o),s=!0},p:se,i(e){s||(A(t.$$.fragment,e),s=!0)},o(e){R(t.$$.fragment,e),s=!1},d(e){he(t,e)}}}function Ie(n){let t,s;return t=new Pe({}),{c(){de(t.$$.fragment)},l(e){pe(t.$$.fragment,e)},m(e,o){me(t,e,o),s=!0},i(e){s||(A(t.$$.fragment,e),s=!0)},o(e){R(t.$$.fragment,e),s=!1},d(e){he(t,e)}}}function je(n){let t,s,e,o,u;t=new Fe({props:{background:"https://kbve.com/assets/img/curved-images/wave.jpg",$$slots:{default:[qe]},$$scope:{ctx:n}}});let l=(n[3]||n[5])&&Ce(n),a=n[6]&&Ie();return{c(){de(t.$$.fragment),s=B(),l&&l.c(),e=B(),a&&a.c(),o=re()},l(r){pe(t.$$.fragment,r),s=$(r),l&&l.l(r),e=$(r),a&&a.l(r),o=re()},m(r,d){me(t,r,d),O(r,s,d),l&&l.m(r,d),O(r,e,d),a&&a.m(r,d),O(r,o,d),u=!0},p(r,[d]){const w={};d&67108927&&(w.$$scope={dirty:d,ctx:r}),t.$set(w),r[3]||r[5]?l?(l.p(r,d),d&40&&A(l,1)):(l=Ce(r),l.c(),A(l,1),l.m(e.parentNode,e)):l&&(fe(),R(l,1,1,()=>{l=null}),ue()),r[6]?a?d&64&&A(a,1):(a=Ie(),a.c(),A(a,1),a.m(o.parentNode,o)):a&&(fe(),R(a,1,1,()=>{a=null}),ue())},i(r){u||(A(t.$$.fragment,r),A(l),A(a),u=!0)},o(r){R(t.$$.fragment,r),R(l),R(a),u=!1},d(r){r&&(m(s),m(e),m(o)),he(t,r),l&&l.d(r),a&&a.d(r)}}}let ze=!1;function Qe(n,t,s){let e,o;ie(n,Re,g=>s(15,e=g)),ie(n,De,g=>s(6,o=g));let u=!1,l=!1,a=!1,r,d=oe.CREATE_BUSINESS_APPWRITE_FUNCTION,w="",b="",p,I,v=[],x=!1;Be();const G=()=>b.length<1||w.length<1?(H("Data needs to be longer!"),!1):b.length>1e3||w.length>100?(H("Data needs to be shorter!"),!1):!0,E=()=>{H("Running"),G()&&F()},F=async()=>{try{s(0,u=!0),l=!0,p=JSON.stringify({businessName:w,businessIdea:b});const g=await Ue.createExecution(d,p);if(H("Loading..."),g.status==="failed")throw new Error("Internal Error. Try again later.");g.response&&(H("Business Created!"),s(3,I=JSON.parse(g.response)),I&&ke("business",JSON.stringify(I)),N())}catch(g){g instanceof Error&&(Me(g.message),H(g.message))}finally{s(0,u=!1)}},N=async()=>{try{const g=await Ve(oe.DATABASE,oe.BUSINESS,[we.equal("created_by",e.email),we.orderDesc("created_at")]),L=JSON.parse(g);s(4,v=L.documents.slice(0,5))}catch{}};$e(()=>{N(),s(8,a=!0)}),Le(()=>{});function M(){w=this.value,s(1,w)}function S(){b=this.value,s(2,b)}const y=g=>{ke("business",JSON.stringify(g)),s(3,I=g),s(5,x=!1),s(5,x=!0)};return n.$$.update=()=>{n.$$.dirty&768&&a&&!ze&&(s(9,r=window.document.getElementById("skeleton")),r&&r.remove())},[u,w,b,I,v,x,o,E,a,r,M,S,y]}class rt extends Ne{constructor(t){super(),Se(this,t,Qe,je,ce,{})}}export{rt as default};