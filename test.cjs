const {JSDOM}=require('jsdom');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
const dom=new JSDOM(`<!doctype html><html><body>
<a id="nav" href="/music/search/">Music</a>
<div translate="no"><span id="taxonomy">Laid Back</span></div>
<button id="filter" data-value="dreamy">Dreamy</button>
<a id="track" href="/music/tracks/abc/">Happy</a>
<a id="artist" href="/artists/a/">Calm</a>
<input name="q" value="Dreamy"><div contenteditable="true"><span>Music</span></div>
<button id="leading"><svg></svg>Download</button><button id="trailing">Download<svg></svg></button>
<button id="icons"><svg></svg><span>Download</span></button>
<form><select name="mood"><option value="happy">Happy</option></select></form>
</body></html>`,{url:'https://www.epidemicsound.com/music/featured/',runScripts:'outside-only'});
const w=dom.window, doc=w.document;
const native=w.getComputedStyle.bind(w);
w.getComputedStyle=(el,pseudo)=>pseudo?{content:'none'}:new Proxy(native(el),{get(o,k){if(k==='fontSize')return '14px';return Reflect.get(o,k)}});
let requests=0; w.fetch=()=>{requests++;throw Error('unexpected network');};
const before=[...doc.querySelectorAll('body *')].map(el=>[el,el.textContent,el.getAttribute('href'),el.value]);
let clicked;
doc.querySelector('#filter').addEventListener('click',e=>clicked={text:e.target.textContent,value:e.target.dataset.value});
w.eval(fs.readFileSync('epidemic-zh.user.js','utf8'));
assert.equal(doc.querySelector('#nav').dataset.esZhNative,'音乐');
assert.equal(doc.querySelector('#leading').dataset.esZhNative,'下载');
assert.equal(doc.querySelector('#trailing').dataset.esZhNative,undefined);
assert.equal(doc.querySelector('#filter').dataset.esZhNative,'梦幻');
assert.equal(doc.querySelector('#taxonomy').dataset.esZhNative,'松弛悠闲');
for(const [el,text,href,value] of before){assert.equal(el.textContent,text);assert.equal(el.getAttribute('href'),href);assert.equal(el.value,value);}
assert.equal(doc.querySelector('#track').dataset.esZhNative,undefined);
assert.equal(doc.querySelector('#artist').dataset.esZhNative,undefined);
assert.equal(doc.querySelector('[contenteditable] span').dataset.esZhNative,undefined);
assert.equal(doc.querySelector('option').dataset.esZhNative,undefined);
assert.equal(doc.querySelector('#icons span').dataset.esZhNative,'下载');
doc.querySelector('#filter').click();assert.deepEqual(clicked,{text:'Dreamy',value:'dreamy'});
assert.equal(new w.FormData(doc.querySelector('form')).get('mood'),'happy');
doc.querySelector('#filter').textContent='Happy';
await new Promise(r=>setTimeout(r,160));
assert.equal(doc.querySelector('#filter').dataset.esZhNative,'欢快');
const added=doc.createElement('span');added.textContent='Stems';doc.body.append(added);
await new Promise(r=>setTimeout(r,160));assert.equal(added.dataset.esZhNative,'分轨音频');
// SPA reuse: a translated navigation link becomes a track title without replacing its node.
const nav=doc.querySelector('#nav');
nav.setAttribute('href','/music/tracks/reused/');
await new Promise(r=>setTimeout(r,160));
assert.equal(nav.dataset.esZhNative,undefined);
assert.equal(nav.textContent,'Music');
nav.setAttribute('href','/music/search/');
await new Promise(r=>setTimeout(r,160));
assert.equal(nav.dataset.esZhNative,'音乐');
// Unknown text must never inherit a stale translation.
added.textContent='Uncatalogued phrase';
await new Promise(r=>setTimeout(r,160));
assert.equal(added.dataset.esZhNative,undefined);
// Preserve existing styles and later changes made by the website.
const styled=doc.createElement('span');
styled.textContent='Moods';
styled.style.setProperty('--es-zh-font','19px','important');
styled.style.color='red';
doc.body.append(styled);
await new Promise(r=>setTimeout(r,160));
assert.equal(styled.dataset.esZhNative,'情绪氛围');
styled.style.color='blue';
// Repeated injections must not duplicate UI or keyboard handlers.
w.eval(fs.readFileSync('epidemic-zh.user.js','utf8'));
assert.equal(doc.querySelectorAll('es-zh-control').length,1);
doc.dispatchEvent(new w.KeyboardEvent('keydown',{altKey:true,shiftKey:true,code:'KeyC'}));
assert.equal(doc.querySelectorAll('[data-es-zh-native]').length,0);
assert.equal(doc.querySelector('#nav').hasAttribute('style'),false);
assert.equal(styled.style.getPropertyValue('--es-zh-font'),'19px');
assert.equal(styled.style.getPropertyPriority('--es-zh-font'),'important');
assert.equal(styled.style.color,'blue');
doc.dispatchEvent(new w.KeyboardEvent('keydown',{altKey:true,shiftKey:true,code:'KeyC'}));
assert.equal(doc.querySelector('#nav').dataset.esZhNative,'音乐');
assert.equal(requests,0);
console.log('PASS: original text / href / inputs / form values / click payload unchanged; protected names; dynamic updates; toggle restoration; no fetch.');
w.close();
})().catch(e=>{console.error(e);process.exitCode=1});
