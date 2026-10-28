const fs=require('fs'),vm=require('vm'),assert=require('assert');
function run({id=123,host='clinic.example',disabled=false}={}){
 const trace=[],listeners={};const memory=disabled?JSON.stringify({analytics:false,noticeDismissed:true,expires:Date.now()+864e5}):null;
 const document={readyState:'loading',cookie:'',head:{append:node=>trace.push(['script',node.src])},body:{append:node=>trace.push(['banner',node.className])},createElement:()=>({setAttribute(){}}),querySelector:()=>null,querySelectorAll:()=>[],addEventListener:(name,fn)=>listeners[name]=fn};
 const ctx={document,location:{hostname:host,origin:'https://'+host,pathname:'/catalog.html',search:'?q=private'},localStorage:{getItem:()=>memory,setItem(){},removeItem(){}},requestAnimationFrame:fn=>fn(),Date};ctx.window=ctx;ctx.siteConfig={metricaId:id,allowLocalAnalytics:false};ctx.addEventListener=()=>{};vm.createContext(ctx);vm.runInContext(fs.readFileSync('privacy.js','utf8'),ctx);
 const before=trace.length;listeners.DOMContentLoaded();return {trace,before,queue:ctx.ym?.a};
}
assert.equal(run({id:null}).before,0);assert.equal(run({disabled:true}).before,0);assert.equal(run({host:'127.0.0.1'}).before,0);
const soft=run();assert.equal(soft.before,1);assert.equal(soft.trace[0][0],'script');assert.equal(soft.trace[1][0],'banner');assert.equal(soft.queue[0][1],'init');assert.equal(soft.queue[0][2].webvisor,false);assert.equal(soft.queue[1][2],'https://clinic.example/catalog.html');assert(!JSON.stringify(soft.queue).includes('private'));
console.log('OK: no ID / local / opt-out do not load Metrica; soft start precedes banner; URL parameters omitted.');
