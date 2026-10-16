"""Build both distributions from the reviewed dictionary and one runtime."""
from pathlib import Path
import json
import zipfile

ROOT = Path(__file__).resolve().parent
meta = json.loads((ROOT / 'package.json').read_text())
words = json.loads((ROOT / 'dictionary.json').read_text())
normalized = [' '.join(key.split()).lower() for key in words]
assert len(normalized) == len(set(normalized)), 'Duplicate normalized dictionary keys'
assert all(isinstance(v, str) and v.strip() for v in words.values())
version = meta['version']
runtime = (ROOT / 'runtime.js').read_text().replace('__DICTIONARY__', json.dumps(words, ensure_ascii=False))
header = f'''// ==UserScript==
// @name         Epidemic Sound 原生中文
// @namespace    local.muki.epidemic-zh
// @version      {version}
// @description  本地人工词典，原位中文排版，保留底层英文与站点操作逻辑。
// @author       tainanzhui
// @license      MIT
// @homepageURL  https://github.com/MukiCheung/epidemic-sound-zh
// @supportURL   https://github.com/MukiCheung/epidemic-sound-zh/issues
// @downloadURL  https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js
// @updateURL    https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js
// @match        https://www.epidemicsound.com/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==
'''
(ROOT / 'epidemic-zh.user.js').write_text(header + runtime)
ext = ROOT / 'extension'
ext.mkdir(exist_ok=True)
(ext / 'content.js').write_text(runtime)
manifest = {'manifest_version': 3, 'name': 'Epidemic Sound 原生中文', 'version': version,
            'description': '本地人工词典，保留英文数据的原位中文界面。',
            'homepage_url': meta['homepage'],
            'content_scripts': [{'matches': ['https://www.epidemicsound.com/*'], 'js': ['content.js'], 'run_at': 'document_idle'}]}
(ext / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
with zipfile.ZipFile(ROOT / 'epidemic-zh-extension.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(ext.iterdir()):
        archive.write(file, file.name)
print(f'Built v{version}: {len(words)} dictionary entries, userscript + MV3 extension')
