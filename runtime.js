(() => {
  'use strict';
  if (document.getElementById('es-zh-style')) return;
  const DICTIONARY = __DICTIONARY__;
  const words = new Map(Object.entries(DICTIONARY).map(([a,b]) => [normalize(a), b]));
  function normalize(s) { return s.replace(/\s+/g, ' ').trim().toLowerCase(); }
  function translate(s) {
    const k = normalize(s);
    if (words.has(k)) return words.get(k);
    const count = k.match(/^(\d[\d,]*) (tracks?|playlists?|results?)$/);
    if (count) return `${count[1]} ${count[2].startsWith('track') ? '首曲目' : count[2].startsWith('playlist') ? '个歌单' : '条结果'}`;
    return null;
  }
  // Generated CSS content leaves textContent, input values and link targets intact.
  // No network calls, request hooks, React state changes or input translation.
  const style = document.createElement('style');
  style.id = 'es-zh-style';
  style.textContent = `
    [data-es-zh-native] {font-size:0!important;letter-spacing:0!important;}
    [data-es-zh-native] > * {font-size:var(--es-zh-font)!important;}
    [data-es-zh-native]::after {content:attr(data-es-zh-native)!important;
      font-size:var(--es-zh-font)!important;letter-spacing:var(--es-zh-spacing)!important;
      line-height:var(--es-zh-line)!important;white-space:inherit;color:inherit;
      font-family:inherit;font-weight:inherit;pointer-events:none;}
  `;
  document.documentElement.append(style);
  const originals = new Map();
  let enabled = true, pending = false, scanning = false;
  const forbidden = 'script,style,noscript,textarea,input,select,option,svg,canvas,code,pre,[contenteditable]:not([contenteditable="false"]),[role="textbox"],es-zh-control';
  function eligible(el) {
    // Allow leading decorative icons, but never hide nested labels or reorder trailing icons.
    if (!el.children.length) return true;
    const nodes = [...el.childNodes];
    const textIndex = nodes.findIndex(n => n.nodeType === 3 && n.textContent.trim());
    return textIndex >= 0 && [...el.children].every(child =>
      nodes.indexOf(child) < textIndex &&
      (child.tagName.toLowerCase() === 'svg' || child.getAttribute('aria-hidden') === 'true') &&
      !child.textContent.trim());
  }
  function protectedName(el) {
    const link = el.closest('a[href]');
    if (!link) return false;
    try { return /^\/(?:music\/tracks|artists)\//.test(new URL(link.href, location.href).pathname); }
    catch { return true; }
  }
  function restore(el) {
    const old = originals.get(el);
    if (!old) return;
    el.removeAttribute('data-es-zh-native');
    for (const [name, value, priority] of old.props) {
      if (value) el.style.setProperty(name,value,priority); else el.style.removeProperty(name);
    }
    if (!old.hadStyle && !el.getAttribute('style')) el.removeAttribute('style');
    originals.delete(el);
  }
  function scan() {
    pending = false;
    if (!enabled || scanning) return;
    scanning = true;
    observer.disconnect();
    try {
      for (const [el, old] of originals) {
        if (!el.isConnected || el.textContent !== old.text || !eligible(el) || el.closest(forbidden) || protectedName(el)) restore(el);
      }
      // Leaf labels and leading decorative icons; no wrappers or node moves.
      for (const el of document.body.querySelectorAll('*')) {
        if (originals.has(el) || !eligible(el) || el.closest(forbidden) || protectedName(el)) continue;
        const raw = el.textContent;
        if (!raw || raw.length > 1000) continue;
        const zh = translate(raw);
        if (!zh) continue;
        const css = getComputedStyle(el);
        if (css.display === 'none' || css.visibility === 'hidden' || parseFloat(css.fontSize) === 0) continue;
        const after = getComputedStyle(el,'::after').content;
        const before = getComputedStyle(el,'::before').content;
        if (![after,before].every(x => !x || x === 'none' || x === 'normal' || x === '""')) continue;
        const props = ['--es-zh-font','--es-zh-spacing','--es-zh-line'].map(name => [name,el.style.getPropertyValue(name),el.style.getPropertyPriority(name)]);
        originals.set(el,{text:raw,props,hadStyle:el.hasAttribute('style')});
        el.style.setProperty('--es-zh-font',css.fontSize);
        el.style.setProperty('--es-zh-spacing',css.letterSpacing);
        el.style.setProperty('--es-zh-line',css.lineHeight);
        el.setAttribute('data-es-zh-native',zh);
      }
      status.textContent = `中文 · ${originals.size}`;
    } finally {
      observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','hidden','href','contenteditable']});
      scanning = false;
    }
  }
  function schedule() { if (!pending && enabled) { pending = true; setTimeout(scan,100); } }
  const observer = new MutationObserver(schedule);
  const host = document.createElement('es-zh-control');
  const shadow = host.attachShadow({mode:'closed'});
  const uiStyle = document.createElement('style');
  uiStyle.textContent = `:host{position:fixed;right:16px;bottom:120px;z-index:2147483647;font:12px system-ui}
    button{font:inherit;background:#222;color:#eee;border:1px solid #666;border-radius:18px;padding:6px 12px;cursor:pointer;opacity:.8}button:hover{opacity:1}`;
  const status = document.createElement('button');
  status.type = 'button';
  status.title = '切换中文 / 英文（Alt+Shift+C）；保留歌名和艺人原名';
  shadow.append(uiStyle,status);
  document.body.append(host);
  function toggle() {
    enabled = !enabled;
    if (enabled) scan();
    else {
      observer.disconnect();
      for (const el of [...originals.keys()]) restore(el);
      status.textContent = 'English · 中文已关';
    }
  }
  status.addEventListener('click', toggle);
  document.addEventListener('keydown', e => {
    if (e.altKey && e.shiftKey && e.code === 'KeyC' && !e.repeat) { e.preventDefault(); toggle(); }
  });
  scan();
})();
