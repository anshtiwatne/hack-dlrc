(()=>{var e={};e.id=931,e.ids=[931],e.modules={55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{"use strict";e.exports=require("assert")},6113:e=>{"use strict";e.exports=require("crypto")},9523:e=>{"use strict";e.exports=require("dns")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},85158:e=>{"use strict";e.exports=require("http2")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},77282:e=>{"use strict";e.exports=require("process")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},11825:()=>{},95201:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>a.a,__next_app__:()=>x,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c});var l=s(67096),n=s(16132),i=s(37284),a=s.n(i),r=s(32564),o={};for(let e in r)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>r[e]);s.d(t,o);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,68203)),"C:\\Users\\ansht\\Documents\\GitHub\\dlrc-hackathon\\src\\app\\page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,60132)),"C:\\Users\\ansht\\Documents\\GitHub\\dlrc-hackathon\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\ansht\\Documents\\GitHub\\dlrc-hackathon\\src\\app\\page.tsx"],u="/page",x={require:s,loadChunk:()=>Promise.resolve()},m=new l.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},89519:(e,t,s)=>{Promise.resolve().then(s.bind(s,35387))},35387:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>Home});var l=s(30784),n=s(67040),i=s.n(n),a=s(39135),r=s.n(a),o=s(52451),c=s.n(o),d=s(11440),u=s.n(d),x=s(9885),m=s(10111),h=s(44811),p=s(7288),f=s(43429),j=s(61380),g=s.n(j),v=s(6682),b=s(61522);function Countdown(){let{width:e}=(0,f.displaySize)(),{countdown:t}=(0,h.serverTime)(),[s,n]=(0,x.useState)("");function handleSubscribe(){if(console.log(s),s){let e=(0,b.JU)(v.db,"mailList","subscribers");(0,b.r7)(e,{emails:(0,b.vr)(s)})}alert("You'll receive a reminder soon"),n("")}let i=Math.floor(t/864e5).toString().padStart(2,"0"),a=Math.floor(t%864e5/36e5).toString().padStart(2,"0"),r=Math.floor(t%36e5/6e4).toString().padStart(2,"0"),o=Math.floor(t%6e4/1e3).toString().padStart(2,"0");return(0,l.jsxs)("div",{className:"flex-grow flex items-center justify-center flex-col pb-16",children:[(0,l.jsxs)("div",{className:"flex flex-col text-gray-400 font-medium",children:[(0,l.jsxs)("div",{className:"flex flex-grow mb-[-2dvw]",children:[l.jsx("div",{className:"flex justify-center w-[15.38%]"}),l.jsx("div",{className:"flex justify-center w-[15.38%]",children:"days"}),l.jsx("div",{className:"flex justify-center w-[07.69%]"}),l.jsx("div",{className:"flex justify-center w-[15.38%]",children:"hours"}),l.jsx("div",{className:"flex justify-center w-[07.69%]"}),l.jsx("div",{className:"flex justify-center w-[15.38%]",children:"min"}),l.jsx("div",{className:"flex justify-center w-[07.69%]"}),l.jsx("div",{className:"flex justify-center w-[15.38%]",children:"sec"})]}),(0,l.jsxs)("div",{className:`${g().className} font-extrabold text-zinc-700 ${e>1100?"text-[8dvw]":"text-[10dvw]"}`,children:["T-",i,":",a,":",r,":",o]})]}),(0,l.jsxs)("div",{className:"flex justify-center items-center w-screen px-4 pt-4",children:[l.jsx("div",{className:"font-semibold text-xl text-gray-800 whitespace-nowrap",children:"Remind me"}),(0,l.jsxs)("div",{className:"flex",children:[l.jsx("input",{value:s,onChange:e=>n(e.currentTarget.value),className:"w-full bg-slate-200 ml-4 px-4 py-2 outline-none rounded-l-full font-medium text-gray-900",type:"email",placeholder:"email"}),l.jsx("button",{onClick:handleSubscribe,className:"bg-slate-500 font-semibold text-white px-4 py-2 rounded-r-full hover:bg-slate-600",children:"Submit"})]})]})]})}function Leaderboard(){let[e,t]=(0,x.useState)([]);return(0,x.useEffect)(()=>{(async function(){let e=(0,b.IO)((0,b.hJ)(v.db,"users"),(0,b.Xo)("points","desc")),s=await (0,b.PL)(e),l=s.docs.map(e=>e.data());t(l)})()},[]),l.jsx("div",{className:"flex h-full w-full flex-grow items-center justify-center overflow-y-scroll",children:l.jsx("ol",{className:"flex h-full w-full max-w-5xl flex-grow flex-col p-4 pr-6",children:e.map((e,t)=>(0,l.jsxs)("li",{className:"my-2 ml-1 flex w-full items-center justify-between rounded bg-slate-100 py-2 pl-3 pr-4 profile-shadow",children:[(0,l.jsxs)("div",{className:"flex items-center",children:[l.jsx("div",{className:"relative mr-2 h-8 w-8",children:l.jsx(c(),{className:"rounded-full",src:e?.photoURL,alt:"Profile Picture",fill:!0})}),l.jsx("div",{className:"font-medium text-gray-800",children:e.name})]}),l.jsx("div",{className:"font-semibold text-gray-800",children:null!==e.points?(0,l.jsxs)("div",{children:["⭐ ",e.points]}):""})]},t))})})}function Sponsor({imgSrc:e,imgAlt:t,description:s,text:n}){return(0,l.jsxs)("div",{className:"flex w-full flex-col items-center",children:[l.jsx("div",{className:"relative h-12 w-full",children:l.jsx(c(),{src:e,alt:t,fill:!0,objectFit:"contain",style:{width:"100%",height:"100%"}})}),l.jsx("div",{className:"font-medium px-4 py-2 text-gray-600",children:s}),l.jsx("div",{className:"font-medium px-4 py-2 text-gray-600",children:n})]})}function Sponsors(){let{width:e,height:t}=(0,f.displaySize)();return(0,l.jsxs)("div",{className:"flex h-full items-center flex-col px-5 overflow-y-scroll",children:[l.jsx("div",{className:`pt-5 font-light text-gray-600 ${e>1100?"text-4xl":"text-[7dvw]"}`,children:"Our Amazing Sponsors"}),e>1100?(0,l.jsxs)("div",{className:"flex flex-grow items-center pb-10",children:[l.jsx(Sponsor,{imgSrc:"stckme.png",imgAlt:"stck.me logo",description:"The best place for writers to earn money from their fans. Start selling your stories, e-books, essays, poetry, and more!",text:"They're sponsoring each participant with a ₹5000 giftable stck.me pro membership!"}),l.jsx(Sponsor,{imgSrc:"interviewcake.svg",imgAlt:"Interview Cake logo",description:"Interview Cake is a study tool that preps software engineering candidates for programming interviews.",text:"They're sponsoring each participant with a $249 Interview Cake full course!"}),l.jsx(Sponsor,{imgSrc:"github.svg",imgAlt:"GitHub logo",description:"GitHub, Inc is a platform and cloud-based service for software development and version control using Git.",text:"They're providing each participant with a GitHub sticker!"})]}):(0,l.jsxs)("div",{className:"flex flex-grow items-center pb-10 max-w-lg flex-col",children:[l.jsx("div",{className:"py-5",children:l.jsx(Sponsor,{imgSrc:"stckme.png",imgAlt:"stck.me logo",description:"The best place for writers to earn money from their fans. Start selling your stories, e-books, essays, poetry, and more!",text:"They're sponsoring each participant with a ₹5000 giftable stck.me pro membership!"})}),l.jsx("div",{className:"py-5",children:l.jsx(Sponsor,{imgSrc:"interviewcake.svg",imgAlt:"Interview Cake logo",description:"Interview Cake is a study tool that preps software engineering candidates for programming interviews.",text:"They're sponsoring each participant with a $249 Interview Cake full course!"})}),l.jsx("div",{className:"py-5",children:l.jsx(Sponsor,{imgSrc:"github.svg",imgAlt:"GitHub logo",description:"GitHub, Inc is a platform and cloud-based service for software development and version control using Git.",text:"They're providing each participant with a GitHub sticker!"})})]})]})}var y=s(86119),w=s(1027);function Contact({name:e,email:t,phone:s}){return(0,l.jsxs)("div",{className:"flex flex-col items-center px-4",children:[l.jsx("div",{className:"font-semibold text-xl text-gray-600",children:e}),(0,l.jsxs)("div",{className:"flex flex-col items-center font-light text-lg text-gray-800",children:[(0,l.jsxs)(u(),{href:`mailto:${t}`,children:[l.jsx(y.Z,{className:"mx-2"}),t]}),(0,l.jsxs)(u(),{href:`tel:${s}`,children:[l.jsx(w.Z,{className:"mx-2"}),s]})]})]})}function Help(){let{width:e}=(0,f.displaySize)();return(0,l.jsxs)("div",{className:"flex flex-col justify-center items-center h-full px-6 py-4",children:[l.jsx("div",{className:"text-xl text-gray-800",children:"In case you run into any issues during the hackathon, feel free to contact one of us using the details below"}),e>1100?(0,l.jsxs)("div",{className:"flex pt-10",children:[l.jsx(Contact,{name:"Ansh",email:"ansh.tiwatne@gmail.com",phone:"+91 9075055300"}),l.jsx(Contact,{name:"Aneesh",email:"aneesh1701@gmail.com",phone:"+91 9146196969"})]}):(0,l.jsxs)("div",{className:"flex flex-col pb-10 flex-grow justify-evenly",children:[l.jsx("div",{className:"",children:l.jsx(Contact,{name:"Ansh",email:"ansh.tiwatne@gmail.com",phone:"+91 9075055300"})}),l.jsx("div",{className:"",children:l.jsx(Contact,{name:"Aneesh",email:"aneesh1701@gmail.com",phone:"+91 9146196969"})})]})]})}function formattedText(e,t=!1){if(void 0===e)return l.jsx("span",{});let s=e.replace(/\`(.*?)\`/g,(e,t)=>'<span class="font-bold">'+t+"</span>");return t?l.jsx("span",{dangerouslySetInnerHTML:{__html:s.replace(/\\n/g,"<br />")}}):l.jsx("span",{dangerouslySetInnerHTML:{__html:s}})}function Submit({questionNum:e,questionData:t,isLoading:s}){let[n,i]=(0,x.useState)("");function handleSubmit(){return null}return l.jsx("div",{className:"flex",children:l.jsx("div",{children:(0,l.jsxs)("div",{className:"flex items-center justify-center text-sm",children:[l.jsx("button",{onClick:handleSubmit,className:"rounded-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600",children:"Get Input"}),(0,l.jsxs)("div",{className:"flex",children:[l.jsx("input",{value:n,onChange:e=>i(e.currentTarget.value),className:"ml-4 w-full rounded-l-full bg-slate-200 px-4 py-2 font-medium text-gray-900 outline-none",type:"text",placeholder:"Answer"}),l.jsx("button",{onClick:handleSubmit,className:"rounded-r-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600",children:"Submit"})]})]})})})}function Question({questionNum:e,questionData:t,isLoading:s}){if(s)return l.jsx("p",{className:`${screen.width>1100?"w-[50dvw]":"w-[100dvw]"}`,children:"Loading..."});if(!t)return l.jsx("p",{className:`${screen.width>1100?"w-[50dvw]":"w-[100dvw]"}`,children:"No question data"});let n=l.jsx("div",{});return void 0!==t.resources&&(n=l.jsx("div",{className:"py-4 text-blue-600",children:t.resources.map((e,t)=>l.jsx("a",{href:Object.entries(e)[0][1],children:Object.entries(e)[0][0]},t))})),(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{className:"text-xl font-medium text-gray-800",children:[t.title," (",t.points,"pts)"]}),l.jsx("div",{className:"py-4 text-gray-900",children:formattedText(t.description)}),l.jsx("div",{className:"text-xl font-medium text-gray-800",children:"Example"}),l.jsx("div",{className:"py-4 text-gray-900",children:formattedText(t.example)}),l.jsx("div",{className:"text-xl font-medium text-gray-800",children:"Additional Info"}),l.jsx("div",{className:"py-4 text-gray-900",children:t.additionalInfo.map((e,t)=>(0,l.jsxs)("div",{children:[t+1,". ",formattedText(e)]},t))}),l.jsx("div",{className:`text-xl font-medium text-gray-800 ${void 0==t.resources?"hidden":""}`,children:"Resources"}),n,l.jsx("br",{}),l.jsx(Submit,{questionNum:e,questionData:t,isLoading:s})]})}function QuestionNav({totalQuestions:e}){let[t,s]=(0,x.useState)(1),[n,i]=(0,x.useState)(!0),[a,r]=(0,x.useState)(void 0);(0,x.useEffect)(()=>{(async function(){let e=(0,b.JU)(v.db,"problems",t.toString()),s=await (0,b.QT)(e),l=s.data();r(l),i(!1)})()},[t]);let o=Array.from({length:e},(e,t)=>t+1);return(0,l.jsxs)("div",{className:"flex h-full flex-col",children:[l.jsx("nav",{className:"flex justify-center pb-2 pt-4 text-zinc-700",children:o.map(e=>l.jsx("button",{onClick:()=>s(e),className:`mx-2 h-8 w-8 rounded-md border ${e===t?"bg-blue-600 text-neutral-50":"bg-slate-50 hover:bg-slate-100"}`,children:e},e))}),l.jsx("div",{className:"h-1 flex-grow overflow-auto p-4 pt-0",children:l.jsx(Question,{questionNum:t,questionData:a,isLoading:n})})]})}var N=s(22059),S=s.n(N),k=s(54997),C=s(9036),_=s(17404),L=s(51858),H=s(95894);let z={js:{display:"JavaScript",monaco:"javascript",codex:"js",comment:"// you can also code in your own setup",helloWorld:'console.log("Hello, HackDLRC")'},python:{display:"Python",monaco:"python",codex:"py",comment:"# you can also code in your own setup",helloWorld:'print("Hello, HackDLRC")'},java:{display:"Java",monaco:"java",codex:"java",comment:"// you can also code in your own setup",helloWorld:'class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, HackDLRC");\n    }\n}'},c:{display:"C",monaco:"c",codex:"c",comment:"// you can also code in your own setup",helloWorld:'#include <stdio.h>\n\nint main() {\n    printf("Hello, HackDLRC");\n}'},cs:{display:"C#",monaco:"csharp",codex:"cs",comment:"// you can also code in your own setup",helloWorld:'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        Console.WriteLine("Hello, HackDLRC");\n    }\n}'},cpp:{display:"C++",monaco:"cpp",codex:"cpp",comment:"// you can also code in your own setup",helloWorld:'#include <iostream>\n\nint main() {\n    std::cout << "Hello, HackDLRC";\n}'},go:{display:"Go",monaco:"go",codex:"go",comment:"// you can also code in your own setup",helloWorld:'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, HackDLRC")\n}'},other:{display:"Other",monaco:"plaintext",codex:"null",comment:"sorry if your language isn't supported :(\nyou can code in your own setup instead",helloWorld:""}};function runCode(e,t,s){let l={method:"post",url:"https://api.codex.jaagrav.in",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:S().stringify({code:e,language:t,input:s})};return new Promise(s=>{""===e||"null"===t?s(["",""]):(0,k.Z)(l).then(function(e){s([e.data.output,e.data.error]),console.log(e.data)}).catch(e=>{s(["",e.message])})})}function CodeEditor({minimized:e,setMinimized:t}){let{isMobile:s}=(0,f.displaySize)(),[n,i]=(0,x.useState)(z.js),a=(0,x.useRef)(null),r=(0,x.useRef)(null);function handleEditorDidMount(e){a.current=e}function inputDidMount(e){r.current=e}let[o,c]=(0,x.useState)("");async function handleClick(){c("Running...");let e=a.current?.getValue(),t=r.current?.getValue(),s=await runCode(e,n.codex,t);c(s[0]+s[1])}return s?l.jsx("div",{}):(0,l.jsxs)("div",{className:"flex h-full",children:[l.jsx("div",{className:"flex items-center",children:l.jsx("button",{onClick:()=>{t(!e)},className:"flex-nowrap whitespace-nowrap ml-[-2rem] h-10 rounded-l-full bg-blue-600 px-1 text-neutral-50 hover:bg-blue-700",children:e?l.jsx(_.Z,{}):l.jsx(L.Z,{})})}),(0,l.jsxs)("div",{className:`flex flex-col h-full rounded-sm bg-[#1E1E1E] text-neutral-50 ${e?"hidden":"w-full"}`,children:[(0,l.jsxs)("div",{children:[l.jsx("select",{className:"m-2 rounded-md bg-neutral-700 p-1 outline-none",name:"language",id:"lang",onChange:e=>{let t=e.target.value;i(z[t])},children:Object.keys(z).map(e=>l.jsx("option",{value:e,children:z[e].display},e))}),l.jsx("button",{className:`m-2 ml-0 rounded-md bg-neutral-700 p-1 py-[0.15rem] ${"null"===n.codex?"hidden":""}`,onClick:handleClick,children:(0,l.jsxs)("div",{className:"pr-2",children:[l.jsx(H.Z,{})," Run"]})}),l.jsx("hr",{className:"border-neutral-700"})]}),(0,l.jsxs)("div",{className:"flex flex-grow flex-col",children:[(0,l.jsxs)("div",{className:"inline-block h-[75%] w-full pt-2",children:[l.jsx(C.ZP,{theme:"vs-dark",language:n.monaco,value:n.helloWorld?`${n.comment}

${n.helloWorld}
`:`${n.comment}
`,options:{fontSize:14,fontFamily:"JetBrains Mono",fontLigatures:!0,minimap:{enabled:!1},scrollbar:{horizontalScrollbarSize:5,verticalScrollbarSize:5},overviewRulerLanes:0},onMount:handleEditorDidMount}),l.jsx("hr",{className:`border-neutral-700 ${"null"===n.codex?"hidden":""}`})]}),(0,l.jsxs)("div",{className:`flex w-full flex-grow ${"null"===n.codex?"hidden":""}`,children:[(0,l.jsxs)("div",{className:"inline-block w-1/2",children:[l.jsx("div",{className:"mx-7 mb-1 mt-2 text-sm font-light text-neutral-200",children:"INPUT"}),l.jsx(C.ZP,{className:"pl-1 pr-4",height:"15vh",theme:"vs-dark",language:"plaintext",options:{fontSize:14,fontFamily:"JetBrains Mono",fontLigatures:!0,minimap:{enabled:!1},scrollbar:{horizontalScrollbarSize:5,verticalScrollbarSize:5,useShadows:!1},overviewRulerLanes:0,cursorStyle:"block",lineNumbers:"off"},onMount:inputDidMount})]}),l.jsx("div",{className:`my-2 border border-neutral-700 ${"null"===n.codex?"hidden":""}`}),(0,l.jsxs)("div",{className:"inline-block w-1/2",children:[l.jsx("div",{className:"mx-6 mb-1 mt-2 text-sm font-light text-neutral-200",children:"OUTPUT"}),l.jsx(C.ZP,{className:"pr-1",height:"15vh",theme:"vs-dark",language:"plaintext",value:o,options:{fontSize:14,fontFamily:"JetBrains Mono",fontLigatures:!0,minimap:{enabled:!1},scrollbar:{horizontalScrollbarSize:5,verticalScrollbarSize:5,useShadows:!1},overviewRulerLanes:0,readOnly:!0,domReadOnly:!0,lineNumbers:"off",renderLineHighlight:"none",renderWhitespace:"none",guides:{indentation:!1}}})]})]})]})]})]})}function Sample_Question({questionNum:e,questionData:t,isLoading:s}){if(s)return l.jsx("p",{className:`${screen.width>1100?"w-[50dvw]":"w-[100dvw]"}`,children:"Loading..."});if(!t)return l.jsx("p",{className:`${screen.width>1100?"w-[50dvw]":"w-[100dvw]"}`,children:"No question data"});let n=l.jsx("div",{});return void 0!==t.resources&&(n=l.jsx("div",{className:"py-4 text-blue-600",children:t.resources.map((e,t)=>l.jsx(u(),{href:Object.entries(e)[0][1],children:Object.entries(e)[0][0]},t))})),(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{className:"text-xl font-medium text-gray-800",children:[t.title," (Sample)"]}),l.jsx("div",{className:"py-4 text-gray-900",children:formattedText(t.description)}),l.jsx("div",{className:"text-xl font-medium text-gray-800",children:"Example"}),l.jsx("div",{className:"py-4 text-gray-900",children:formattedText(t.example,!0)}),l.jsx("div",{className:"text-xl font-medium text-gray-800",children:"Additional Info"}),l.jsx("div",{className:"py-4 text-gray-900",children:t.additionalInfo.map((e,t)=>(0,l.jsxs)("div",{children:[t+1,". ",formattedText(e)]},t))}),l.jsx("div",{className:`text-xl font-medium text-gray-800 ${void 0==t.resources?"hidden":""}`,children:"Resources"}),n,l.jsx("br",{}),l.jsx(Sample_Submit,{questionNum:e,questionData:t,isLoading:s})]})}function Sample_Submit({questionNum:e,questionData:t,isLoading:s}){let[n,i]=(0,x.useState)("");function handleSubmit(){"1434572895"===n?alert("correct"):alert("incorrect"),i("")}return l.jsx("div",{className:"flex",children:l.jsx("div",{children:(0,l.jsxs)("div",{className:"flex justify-center items-center text-sm",children:[l.jsx(u(),{href:"https://pastebin.com/raw/SUn7vLUH",className:"bg-slate-500 font-semibold text-white px-4 py-2 rounded-full hover:bg-slate-600 whitespace-nowrap",children:"Get Input"}),(0,l.jsxs)("div",{className:"flex",children:[l.jsx("input",{value:n,onChange:e=>i(e.currentTarget.value),className:"w-full bg-slate-200 ml-4 px-4 py-2 outline-none rounded-l-full font-medium text-gray-900",type:"text",placeholder:"Answer"}),l.jsx("button",{onClick:handleSubmit,className:"bg-slate-500 font-semibold whitespace-nowrap text-white px-4 py-2 rounded-r-full hover:bg-slate-600",children:"Submit"})]})]})})})}function Sample_QuestionNav({totalQuestions:e}){let t="sample",[s,n]=(0,x.useState)(!0),[i,a]=(0,x.useState)(void 0);return(0,x.useEffect)(()=>{(async function(){let e=(0,b.JU)(v.db,"problems",t.toString()),s=await (0,b.QT)(e),l=s.data();a(l),n(!1)})()},[t]),l.jsx("div",{className:"flex h-full flex-col pt-4",children:l.jsx("div",{className:"h-1 flex-grow overflow-auto p-4 pt-0",children:l.jsx(Sample_Question,{questionNum:t,questionData:i,isLoading:s})})})}function Sample(){let{width:e,height:t}=(0,f.displaySize)(),[s,n]=e>1100?(0,x.useState)(!1):(0,x.useState)(!0);return(0,l.jsxs)("div",{className:"flex flex-grow justify-between",children:[l.jsx("div",{className:`inline-block ${s?"w-100":e>1100?"w-[55%]":"w-100"}`,children:l.jsx(Sample_QuestionNav,{totalQuestions:7})}),l.jsx("div",{className:`inline-block ${s?"w-0":e>1100?"w-[45%]":"w-0"}`,children:l.jsx(CodeEditor,{minimized:s,setMinimized:n})})]})}function Main(){let{user:e,signInWithGoogle:t,signOut:s}=(0,p.userAuth)(),{timer:n,countdown:a}=(0,h.serverTime)(),{width:o}=(0,f.displaySize)(),[d,j]=(0,x.useState)(0),g="",v="",b="",y="";async function handleSignIn(){try{await t()}catch(e){console.error("Error signing in with Google",e)}}async function handleSignOut(){try{await s()}catch(e){console.error("Error signing out with Google",e)}}function LargeHeader(){return(0,l.jsxs)("header",{children:[(0,l.jsxs)("div",{className:`${i().className} flex items-center justify-between p-4`,children:[(0,l.jsxs)("nav",{className:"flex items-center text-zinc-500",children:[l.jsx("button",{onClick:()=>j(0),className:"px-2 pr-8 text-xl font-bold text-zinc-800",children:"HackDLRC"}),l.jsx("button",{onClick:()=>j(1),className:"px-2 hover:text-zinc-600",children:"Sponsors"}),l.jsx("button",{onClick:()=>j(2),className:"px-2 hover:text-zinc-600",children:"Leaderboard"}),l.jsx("button",{onClick:()=>j(3),className:"px-2 hover:text-zinc-600",children:"Help"}),null!=a&&a>0&&l.jsx("button",{onClick:()=>j(4),className:"px-2 hover:text-zinc-600",children:"Sample Question"})]}),null===n?"":(0,l.jsxs)("div",{className:`${r().className} absolute left-1/2 -translate-x-1/2 transform text-xl font-bold text-zinc-700`,children:[g,":",v,":",b,":",y]}),e?(0,l.jsxs)("div",{className:"flex items-center",children:[null!=n&&n>0&&l.jsx("div",{className:"font-medium",children:"⭐ 0"}),null!=a&&a>0&&l.jsx(u(),{className:"px-2 text-zinc-500 hover:text-zinc-600",href:"https://forms.gle/RLTPQ8h9TQrzwJi5A",children:"Register a Team"}),l.jsx("button",{onClick:handleSignOut,className:"ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600",children:"Sign out"}),l.jsx("div",{className:"relative ml-4 h-8 w-8",children:l.jsx(c(),{className:"rounded-full",src:e?.photoURL,alt:"Profile Picture",referrerPolicy:"no-referrer",fill:!0})})]}):l.jsx("nav",{className:"flex items-center text-zinc-600",children:l.jsx("button",{onClick:handleSignIn,className:"ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600",children:"Sign in with Google"})})]}),l.jsx("hr",{})]})}function SmallHeader(){return(0,l.jsxs)("header",{children:[(0,l.jsxs)("div",{className:`${i().className} flex items-center justify-between p-4`,children:[(0,l.jsxs)("nav",{className:"flex items-center text-zinc-500",children:[l.jsx("button",{onClick:()=>j(-1),children:l.jsx(m.Z,{})}),l.jsx("button",{onClick:()=>j(0),className:"px-2 pr-8 text-xl font-bold text-zinc-800",children:"HackDLRC"})]}),e?(0,l.jsxs)("div",{className:"flex items-center",children:[null!=n&&n>0&&l.jsx("div",{className:"font-medium",children:"⭐ 0"}),l.jsx("button",{onClick:handleSignOut,className:"ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600",children:"Sign out"}),l.jsx("div",{className:"relative ml-4 h-8 w-8",children:l.jsx(c(),{className:"rounded-full",src:e?.photoURL,alt:"Profile Picture",referrerPolicy:"no-referrer",fill:!0})})]}):l.jsx("nav",{className:"flex items-center text-zinc-600",children:l.jsx("button",{onClick:handleSignIn,className:"ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600",children:"Sign in"})})]}),l.jsx("hr",{})]})}function HamburgerMenu(){return(0,l.jsxs)("nav",{className:"flex h-full w-full flex-col items-center bg-slate-50 px-4 font-medium text-gray-700",children:[l.jsx("button",{onClick:()=>j(0),className:"p-2 text-xl",children:"Home"}),l.jsx("hr",{className:"w-full"}),null!=a&&a>0&&(0,l.jsxs)("div",{className:"w-full flex justify-center items-center flex-col",children:[l.jsx(u(),{className:"p-2 text-xl",href:"https://forms.gle/RLTPQ8h9TQrzwJi5A",children:"Register a Team"}),l.jsx("hr",{className:"w-full"})]}),null!=a&&a>0&&(0,l.jsxs)("div",{className:"w-full flex justify-center items-center flex-col",children:[l.jsx("button",{onClick:()=>j(4),className:"p-2 text-xl",children:"Sample Question"}),l.jsx("hr",{className:"w-full"})]}),l.jsx("button",{onClick:()=>j(1),className:"p-2 text-xl",children:"Sponsors"}),l.jsx("hr",{className:"w-full"}),l.jsx("button",{onClick:()=>j(2),className:"p-2 text-xl",children:"Leaderboard"}),l.jsx("hr",{className:"w-full"}),l.jsx("button",{onClick:()=>j(3),className:"p-2 text-xl",children:"Help"}),l.jsx("hr",{className:"w-full"})]})}null!=n&&(g=Math.floor(n/864e5).toString().padStart(2,"0"),v=Math.floor(n%864e5/36e5).toString().padStart(2,"0"),b=Math.floor(n%36e5/6e4).toString().padStart(2,"0"),y=Math.floor(n%6e4/1e3).toString().padStart(2,"0"));let[w,N]=(0,x.useState)(!1);return(0,l.jsxs)("div",{className:"flex h-[100dvh] flex-col",children:[o>1100?l.jsx(LargeHeader,{}):l.jsx(SmallHeader,{}),0===d&&null!=a&&a>0&&l.jsx(Countdown,{}),0===d&&null!=a&&a<=0&&(0,l.jsxs)("div",{className:"flex flex-grow justify-between",children:[l.jsx("div",{className:`inline-block ${w?"w-100":o>1100?"w-[55%]":"w-100"}`,children:l.jsx(QuestionNav,{totalQuestions:7})}),l.jsx("div",{className:`inline-block ${w?"w-0":o>1100?"w-[45%]":"w-0"}`,children:l.jsx(CodeEditor,{minimized:w,setMinimized:N})})]}),1===d&&l.jsx(Sponsors,{}),2===d&&l.jsx(Leaderboard,{}),3===d&&l.jsx(Help,{}),4===d&&l.jsx(Sample,{}),-1===d&&l.jsx(HamburgerMenu,{})]})}function Home(){let{user:e}=(0,p.userAuth)();return(0,x.useEffect)(()=>{(async function(){if(e){let t=(0,b.hJ)(v.db,"users"),s=(0,b.JU)(t,e?.uid);(0,b.QT)(s).then(t=>{t.exists()?(0,b.pl)(s,{lastLogin:(0,b.Bt)()},{merge:!0}):(0,b.pl)(s,{name:e.displayName,username:e.email?.split("@")[0].replace(".",""),uid:e.uid,photoURL:e.photoURL,inputID:null,answers:{},points:0,teamMembers:[],lastLogin:(0,b.Bt)()})});let l=(0,b.JU)(v.db,"mailList","subscribers");(0,b.r7)(l,{emails:(0,b.vr)(e.email)})}})()},[e]),l.jsx("main",{className:"flex h-[100dvh] flex-col",children:l.jsx(Main,{})})}},68203:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>a,__esModule:()=>i,default:()=>o});var l=s(95153);let n=(0,l.createProxy)(String.raw`C:\Users\ansht\Documents\GitHub\dlrc-hackathon\src\app\page.tsx`),{__esModule:i,$$typeof:a}=n,r=n.default,o=r},73881:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var l=s(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,l.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[278,192,233],()=>__webpack_exec__(95201));module.exports=s})();