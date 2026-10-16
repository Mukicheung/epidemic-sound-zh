# Epidemic Sound Chinese UI

A small localization tool for Chinese-speaking creators who use Epidemic Sound. It displays reviewed Chinese labels in the original layout while preserving underlying English text, links and form values.

[中文说明](README.md) · [Install userscript](https://github.com/tainanzhui/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js) · [Download extension](https://github.com/tainanzhui/epidemic-sound-zh/releases/latest/download/epidemic-zh-extension.zip)

## Features

- 311 manually curated entries covering navigation, musical moods, genres and common actions.
- Native-looking layout using CSS generated content; original text nodes remain unchanged.
- Dynamic content support and an English/Chinese toggle (`Alt+Shift+C`).
- No translation API, page-text upload, cookie access or request interception in the script.
- Track titles and artist links stay in their original language.

## Install

Install [Tampermonkey](https://www.tampermonkey.net/), open the userscript link above, confirm installation and refresh Epidemic Sound. If the file downloads instead, import it from Tampermonkey's Utilities tab.

Alternatively, unzip the extension release, open `chrome://extensions`, enable Developer mode and load the extracted folder. Use one distribution at a time. The extension is not published in an extension store and requires manual updates. The userscript manager may check GitHub for updates according to its settings.

## Current scope

This is an early dictionary-based localization, not a complete translation of every page. Some long descriptions and complex controls remain English. Search input is never translated. Screen readers may announce both the original text and CSS-generated content. The language toggle resets on reload.

Live observations cover navigation, filter labels, unchanged English filter parameters and the download dialog. A completed music download and the standalone extension installation have not been verified. See [verification notes](docs/verification.md).

## Develop and contribute

Requires Node.js 24 and Python 3.

```sh
npm ci
npm run build
npm test
```

Edit `dictionary.json` to contribute translations. Both distributions share `runtime.js`. Please include the original phrase, context and suggested translation in an issue or pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).

Maintained by [tainanzhui](https://github.com/tainanzhui). Unofficial and not affiliated with Epidemic Sound. This tool does not provide music or change the service's subscription or licensing requirements. [MIT licensed](LICENSE).
