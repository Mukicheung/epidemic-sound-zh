// ==UserScript==
// @name         Epidemic Sound 原生中文
// @namespace    local.muki.epidemic-zh
// @version      0.1.3
// @description  本地人工词典，原位中文排版，保留底层英文与站点操作逻辑。
// @author       tainanzhui
// @license      MIT
// @homepageURL  https://github.com/tainanzhui/epidemic-sound-zh
// @supportURL   https://github.com/tainanzhui/epidemic-sound-zh/issues
// @downloadURL  https://github.com/tainanzhui/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js
// @updateURL    https://github.com/tainanzhui/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js
// @match        https://www.epidemicsound.com/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==
(() => {
  'use strict';
  if (document.getElementById('es-zh-style')) return;
  const DICTIONARY = {"Home": "首页", "Discover": "发现", "Music": "音乐", "Sound effects": "音效", "Voices": "配音", "Studio": "创作工作台", "Assistant": "选曲助手", "Adapt": "改编音乐", "Playlists": "歌单", "Downloads": "下载记录", "Apps": "应用", "Credits": "额度", "Creator": "创作者", "Search": "搜索", "Search by video": "以视频找配乐", "Search by mood, genre, reference track, and more": "按情绪、曲风、参考曲目等搜索", "More of what you like": "更多合你口味的音乐", "Recommendations based on your most recent": "根据你最近的下载推荐", "Popular": "热门", "Popular Segments": "热门片段", "Create versions": "生成不同长度版本", "Find similar": "找相似音乐", "Like": "收藏", "Unlike": "取消收藏", "Add to playlist": "加入歌单", "Download": "下载", "Copy link": "复制链接", "More tracks": "更多曲目", "Featured playlists & themes": "精选歌单与主题", "View all": "查看全部", "Now Trending": "当下热门", "Creator's Picks": "创作者精选", "Trending on YouTube": "YouTube 热门", "Newly Signed": "新签约艺人", "New Releases": "最新发布", "Autumn Leaves": "秋日落叶", "GRWM": "跟我一起准备出门", "Main Character Energy": "主角气场", "Y2K Radio": "千禧年电台", "Slow Burn Builds": "缓慢酝酿、层层推进", "Snaps & Claps": "响指与拍手节奏", "Staff Picks": "编辑精选", "Our favorite tracks right now — updated weekly.": "我们近期喜爱的曲目，每周更新。", "Genres": "曲风", "Moods": "情绪氛围", "Themes": "使用主题", "Electronic": "电子", "Beats": "节拍型配乐", "Dreamy": "梦幻", "Laid Back": "松弛悠闲", "Happy": "欢快", "Hopeful": "充满希望", "Restless": "躁动不安", "Busy & Frantic": "忙乱急促", "Bit Music": "像素游戏音乐", "Rock": "摇滚", "Grunge": "垃圾摇滚", "Sad": "忧伤", "Dark": "阴暗压抑", "Contemporary Classical": "当代古典", "Christmas": "圣诞", "Funny": "诙谐搞笑", "Elegant": "优雅", "Reggaeton": "雷鬼顿", "Romantic": "浪漫", "Sexy": "性感", "Soft House": "柔和浩室", "Corporate": "商务宣传", "Floating": "漂浮空灵", "Indie Pop": "独立流行", "Bedroom Pop": "卧室流行", "Hip Hop": "嘻哈", "Strange & Weird": "古怪离奇", "Mysterious": "神秘", "Latin Pop": "拉丁流行", "Jazz": "爵士", "Vocal Jazz": "人声爵士", "Sentimental": "感怀抒情", "Stems": "分轨音频", "Stems ▾": "分轨音频 ▾", "Previous": "上一首", "Next": "下一首", "Play": "播放", "Pause": "暂停", "Enable shuffle": "开启随机播放", "Enable repeat": "开启循环播放", "Collapse sidebar": "收起侧栏", "Expand sidebar": "展开侧栏", "Toggle volume slider dialog": "音量调节", "Feedback": "反馈", "Filters": "筛选", "Filter": "筛选", "Sort by": "排序", "Relevance": "相关度", "Newest": "最新", "Duration": "时长", "Length": "长度", "Tempo": "速度", "Vocals": "人声", "Instrumental": "纯音乐", "Instruments": "乐器", "Energy": "能量强度", "Clear all": "清空筛选", "Reset": "重置", "Apply": "应用", "Show more": "展开更多", "Show less": "收起", "Load more": "加载更多", "See all": "查看全部", "All": "全部", "Tracks": "曲目", "Albums": "专辑", "Artists": "艺人", "Saved": "已保存", "Similar tracks": "相似曲目", "Search results": "搜索结果", "No results found": "未找到结果", "Try another search": "换个关键词搜索", "Recently played": "最近播放", "Recently added": "最近添加", "Recommended for you": "为你推荐", "Featured": "精选", "Browse": "浏览", "Explore": "探索", "Your playlists": "你的歌单", "Create playlist": "创建歌单", "New playlist": "新建歌单", "Playlist name": "歌单名称", "Save": "保存", "Cancel": "取消", "Close": "关闭", "Continue": "继续", "Done": "完成", "Settings": "设置", "Account": "账户", "Subscription": "订阅", "Log out": "退出登录", "Log in": "登录", "Sign up": "注册", "Pricing": "价格方案", "Help center": "帮助中心", "Learn more": "了解更多", "Download track": "下载曲目", "Full mix": "完整混音", "Full track": "完整曲目", "Melody": "旋律", "Bass": "贝斯", "Drums": "鼓组", "Other": "其他", "WAV": "WAV 无损", "MP3": "MP3 音频", "Acoustic": "原声", "Acoustic Guitar": "原声吉他", "Electric Guitar": "电吉他", "Piano": "钢琴", "Strings": "弦乐", "Synth": "合成器", "Synthesizer": "合成器", "Percussion": "打击乐", "Orchestral": "管弦乐", "Ambient": "氛围音乐", "Cinematic": "电影感配乐", "Classical": "古典", "Pop": "流行", "Funk": "放克", "Soul": "灵魂乐", "R&B": "节奏布鲁斯", "Blues": "布鲁斯", "Country": "乡村", "Folk": "民谣", "Indie Folk": "独立民谣", "Dance": "舞曲", "House": "浩室", "Deep House": "深浩室", "Tech House": "科技浩室", "Techno": "科技舞曲", "Trance": "迷幻舞曲", "Trap": "陷阱嘻哈", "Dubstep": "回响贝斯", "Drum and Bass": "鼓打贝斯", "Disco": "迪斯科", "Nu Disco": "新迪斯科", "Lo-fi": "低保真氛围", "Lofi": "低保真氛围", "Lofi Hip Hop": "低保真嘻哈", "Chillhop": "慵懒嘻哈", "Chill Out": "舒缓放松", "Lounge": "休闲沙发音乐", "Reggae": "雷鬼", "Metal": "金属", "Heavy Metal": "重金属", "Punk": "朋克", "Indie Rock": "独立摇滚", "Alternative": "另类音乐", "Post Rock": "后摇", "Afrobeats": "非洲流行节奏", "Bossa Nova": "巴萨诺瓦", "Latin": "拉丁", "World": "世界音乐", "Gospel": "福音", "Easy Listening": "轻音乐", "Children": "儿童", "Comedy": "喜剧", "Epic": "史诗恢宏", "Calm": "平静", "Quirky": "古灵精怪", "Euphoric": "欣喜亢奋", "Uplifting": "昂扬振奋", "Energetic": "活力充沛", "Relaxing": "放松舒缓", "Peaceful": "宁静", "Dramatic": "戏剧张力", "Suspense": "悬念", "Suspenseful": "悬疑紧张", "Tense": "紧绷", "Scary": "惊悚", "Angry": "愤怒", "Aggressive": "强烈冲击", "Powerful": "强劲有力", "Emotional": "情感浓烈", "Nostalgic": "怀旧", "Melancholic": "惆怅", "Reflective": "沉思", "Intimate": "亲密细腻", "Warm": "温暖", "Bright": "明亮", "Playful": "俏皮", "Fun": "趣味", "Weird": "怪异", "Eccentric": "古怪独特", "Heavy & Ponderous": "沉重迟缓", "Chasing": "追逐紧迫", "Running": "奔跑动感", "Marching": "行进节奏", "Smooth": "顺滑柔和", "Groovy": "律动十足", "Bouncy": "弹跳轻快", "Laid-back": "松弛悠闲", "Dreamy & Floating": "梦幻空灵", "Beautiful": "优美", "Countryside": "田园", "Adventure": "冒险", "Travel": "旅行", "Vlogs": "视频日记", "Vlog": "视频日记", "Lifestyle": "生活方式", "Technology": "科技", "Sports": "运动", "Fitness": "健身", "Fashion": "时尚", "Food": "美食", "Nature": "自然", "Documentary": "纪录片", "Gaming": "游戏", "Podcast": "播客", "Wedding": "婚礼", "Meditation": "冥想", "Sleep": "睡眠", "News": "新闻", "Trailers": "预告片", "Advertising": "广告", "Transitions": "转场", "Whoosh": "掠过音效", "Whooshes": "掠过音效", "Impacts": "冲击音效", "Risers": "渐强上升音效", "Ambience": "环境底噪", "Foley": "拟音", "Footsteps": "脚步", "Water": "水声", "Rain": "雨声", "Wind": "风声", "Animals": "动物", "Cities": "城市", "Vehicles": "交通工具", "Human": "人声动作", "Cartoon": "卡通", "Horror": "恐怖", "Sci-Fi": "科幻", "Royalty-free music": "免逐次版税授权音乐", "English (US)": "英语（美国）", "View all genres": "全部曲风", "View all moods": "全部情绪", "View all themes": "全部主题", "Playlist": "歌单", "Key": "调性", "BPM": "每分钟节拍数", "Suggested order": "推荐顺序", "Related": "相关歌单", "Storytelling Techniques": "叙事手法", "Orchestral Hybrid": "管弦融合", "Synthwave": "合成器浪潮", "Neoclassical New Age": "新古典与新世纪", "Hybrid Trap": "融合 Trap", "Pulses": "脉冲节奏", "Melodic Dubstep": "旋律回响贝斯", "Electropop": "电子流行", "Future Bass": "未来贝斯", "Liquid Drum And Bass": "流畅旋律鼓打贝斯", "Dark Ambient": "暗黑氛围", "Build": "渐进铺陈", "Chillsynth": "舒缓合成器", "Electro": "电气舞曲", "Suspense Stories": "悬疑叙事", "Neutral Soundbeds": "中性衬底配乐", "Stories of Defeat": "失落叙事", "Dynamic Soundbeds": "动态衬底配乐", "Magical Wonder": "奇幻惊喜", "Intros & Outros": "片头与片尾", "Celebración Hispana": "西语文化庆典", "Tracks that start mellow and slowly build into something bigger. All genres, one common thread: slow progression, and a payoff worth waiting for. Made for cinematic moments, montages, and anything that needs a soundtrack with an evolving story.": "从舒缓开场，逐渐铺陈出更饱满的声势。曲风各异，但都循序推进，最终迎来值得等待的高潮。适合电影感段落、蒙太奇，以及需要配乐伴随故事发展的视频。"};
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
