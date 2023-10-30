(()=>{var e={};e.id=931,e.ids=[931],e.modules={5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},9523:e=>{"use strict";e.exports=require("dns")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},1825:()=>{},6181:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c});var n=r(7096),s=r(6132),a=r(7284),i=r.n(a),l=r(2564),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,8203)),"C:\\Users\\ansht\\OneDrive\\Documents\\GitHub\\dlrc-hackathon\\src\\app\\page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,9113)),"C:\\Users\\ansht\\OneDrive\\Documents\\GitHub\\dlrc-hackathon\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\ansht\\OneDrive\\Documents\\GitHub\\dlrc-hackathon\\src\\app\\page.tsx"],u="/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},4575:(e,t,r)=>{Promise.resolve().then(r.bind(r,7429))},7429:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Home});var n=r(784);r(3824);var s=r(2059),a=r.n(s),i=r(3258),l=r(9885),o=r(9036),c=r(2856),d=r(1522);let u=(0,c.ZF)({apiKey:"AIzaSyCBHUFCh8uhn1vIW3b9EpQV7qAzAEHT2Oo",authDomain:"hack-dlrc.firebaseapp.com",projectId:"hack-dlrc",storageBucket:"hack-dlrc.appspot.com",messagingSenderId:"331587865815",appId:"1:331587865815:web:d8dd1daef0c3d1ceceb492",measurementId:"G-KZZ2TZ0JZQ"}),p=(0,d.ad)(u);function QuestionNav({number:e}){let[t,r]=(0,l.useState)(1),[s,a]=(0,l.useState)(!0),[i,o]=(0,l.useState)(void 0);(0,l.useEffect)(()=>{(async function(){let e=(0,d.JU)(p,"problems",t.toString()),r=await (0,d.QT)(e),n=r.data();o(n),a(!1)})()},[t]);let c=Array.from({length:e},(e,t)=>t+1);return(0,n.jsxs)("div",{className:"flex h-full flex-col",children:[n.jsx("nav",{className:"flex justify-center pb-2 pt-4 text-zinc-700",children:c.map(e=>n.jsx("button",{onClick:()=>r(e),className:`mx-2 h-8 w-8 rounded-md border ${e===t?"bg-blue-600 text-neutral-50":"bg-slate-50 hover:bg-slate-100"}`,children:e},e))}),n.jsx("div",{className:"h-1 flex-grow overflow-auto p-4 pt-0",children:n.jsx(Question,{questionData:i,isLoading:s})})]})}function formattedText(e){let t=e.replace(/\`(.*?)\`/g,(e,t)=>'<span class="font-bold">'+t+"</span>");return n.jsx("span",{dangerouslySetInnerHTML:{__html:t}})}function Question({questionData:e,isLoading:t}){if(t)return n.jsx("p",{className:"mr-2 w-[50vw]",children:"Loading..."});if(!e)return n.jsx("p",{className:"mr-2 w-[50vw]",children:"No question data"});let r=n.jsx("div",{});return void 0!==e.resources&&(r=n.jsx("div",{className:"py-4 text-blue-600",children:e.resources.map((e,t)=>n.jsx("a",{href:Object.entries(e)[0][1],children:Object.entries(e)[0][0]},t))})),(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"text-xl font-medium text-gray-800",children:[e.title," (",e.points,"pts)"]}),n.jsx("div",{className:"py-4 text-gray-900",children:formattedText(e.description)}),n.jsx("div",{className:"text-xl font-medium text-gray-800",children:"Example"}),n.jsx("div",{className:"py-4 text-gray-900",children:e.positiveData.map((e,t)=>(0,n.jsxs)("div",{children:[t+1,". ",formattedText(e)]},t))}),n.jsx("div",{className:"text-xl font-medium text-gray-800",children:"Additional Info"}),n.jsx("div",{className:"py-4 text-gray-900",children:e.additionalInfo.map((e,t)=>(0,n.jsxs)("div",{children:[t+1,". ",formattedText(e)]},t))}),n.jsx("div",{className:`text-xl font-medium text-gray-800 ${void 0==e.resources?"hidden":""}`,children:"Resources"}),r]})}let m={java:{display:"Java",monaco:"java",codex:"java",helloWorld:'class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, HackDLRC");\n    }\n}'},python:{display:"Python",monaco:"python",codex:"py",helloWorld:'print("Hello, HackDLRC")'},cpp:{display:"C++",monaco:"cpp",codex:"cpp",helloWorld:'#include <iostream>\n\nint main() {\n    std::cout << "Hello, HackDLRC";\n}'},c:{display:"C",monaco:"c",codex:"c",helloWorld:'#include <stdio.h>\n\nint main() {\n    printf("Hello, HackDLRC");\n}'},go:{display:"Go",monaco:"go",codex:"go",helloWorld:'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, HackDLRC")\n}'},cs:{display:"C#",monaco:"csharp",codex:"cs",helloWorld:'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        Console.WriteLine("Hello, HackDLRC");\n    }\n}'},js:{display:"JavaScript",monaco:"javascript",codex:"js",helloWorld:'console.log("Hello, HackDLRC")'},other:{display:"Other",monaco:"plaintext",codex:"null",helloWorld:"your language here\n\nyour code here"}};function runCode(e,t,r){let n={method:"post",url:"https://api.codex.jaagrav.in",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:a().stringify({code:e,language:t,input:r})};return new Promise(r=>{""===e||"null"===t?r(["",""]):(0,i.Z)(n).then(function(e){r([e.data.output,e.data.error]),console.log(e.data)}).catch(e=>{r(["",e.message])})})}function IDE(){let[e,t]=(0,l.useState)(m.java),r=(0,l.useRef)(null),s=(0,l.useRef)(null);function handleEditorDidMount(e){r.current=e}function inputDidMount(e){s.current=e}let[a,i]=(0,l.useState)("");async function handleClick(){i("Running...");let t=r.current?.getValue(),n=s.current?.getValue(),a=await runCode(t,e.codex,n);i(a[0]+a[1])}return(0,n.jsxs)("div",{className:"flex h-full flex-col bg-[#1E1E1E] text-neutral-50 rounded-sm",children:[(0,n.jsxs)("div",{children:[n.jsx("select",{className:"m-2 rounded-md bg-neutral-700 p-1 outline-none",name:"language",id:"lang",onChange:e=>{let r=e.target.value;t(m[r])},children:Object.keys(m).map(e=>n.jsx("option",{value:e,children:m[e].display},e))}),n.jsx("button",{className:`m-2 ml-0 rounded-md bg-neutral-700 p-1 py-[0.15rem] ${"null"===e.codex?"hidden":""}`,onClick:handleClick,children:"▶ Run"}),n.jsx("hr",{className:"border-neutral-700"})]}),(0,n.jsxs)("div",{className:"flex flex-grow flex-col",children:[(0,n.jsxs)("div",{className:"inline-block h-[75%] w-full pt-2",children:[n.jsx(o.ZP,{theme:"vs-dark",language:e.monaco,value:e.helloWorld,options:{fontSize:14,fontFamily:"JetBrains Mono",fontLigatures:!0,minimap:{enabled:!1},scrollbar:{horizontalScrollbarSize:5,verticalScrollbarSize:5},overviewRulerLanes:0},onMount:handleEditorDidMount}),n.jsx("hr",{className:`border-neutral-700 ${"null"===e.codex?"hidden":""}`})]}),(0,n.jsxs)("div",{className:`flex w-full flex-grow ${"null"===e.codex?"hidden":""}`,children:[(0,n.jsxs)("div",{className:"inline-block w-1/2",children:[n.jsx("div",{className:"mx-7 mb-1 mt-2 text-sm font-light text-neutral-200",children:"INPUT"}),n.jsx(o.ZP,{className:"pl-1 pr-4",height:"15vh",theme:"vs-dark",language:"plaintext",options:{fontSize:14,fontFamily:"JetBrains Mono",fontLigatures:!0,minimap:{enabled:!1},scrollbar:{horizontalScrollbarSize:5,verticalScrollbarSize:5,useShadows:!1},overviewRulerLanes:0,cursorStyle:"block",lineNumbers:"off"},onMount:inputDidMount})]}),n.jsx("div",{className:`my-2 border border-neutral-700 ${"null"===e.codex?"hidden":""}`}),(0,n.jsxs)("div",{className:"inline-block w-1/2",children:[n.jsx("div",{className:"mx-6 mb-1 mt-2 text-sm font-light text-neutral-200",children:"OUTPUT"}),n.jsx(o.ZP,{className:"pr-1",height:"15vh",theme:"vs-dark",language:"plaintext",value:a,options:{fontSize:14,fontFamily:"JetBrains Mono",fontLigatures:!0,minimap:{enabled:!1},scrollbar:{horizontalScrollbarSize:5,verticalScrollbarSize:5,useShadows:!1},overviewRulerLanes:0,readOnly:!0,domReadOnly:!0,lineNumbers:"off",renderLineHighlight:"none",renderWhitespace:"none",guides:{indentation:!1}}})]})]})]})]})}function Home(){return(0,n.jsxs)("main",{className:"flex flex-grow justify-between",children:[n.jsx("div",{className:"inline-block w-[55%]",children:n.jsx(QuestionNav,{number:10})}),n.jsx("div",{className:"inline-block w-[45%]",children:n.jsx(IDE,{})})]})}},8203:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>a,default:()=>o});var n=r(5153);let s=(0,n.createProxy)(String.raw`C:\Users\ansht\OneDrive\Documents\GitHub\dlrc-hackathon\src\app\page.tsx`),{__esModule:a,$$typeof:i}=s,l=s.default,o=l},3881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var n=r(8531);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,n.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}},3824:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[779,260,813],()=>__webpack_exec__(6181));module.exports=r})();