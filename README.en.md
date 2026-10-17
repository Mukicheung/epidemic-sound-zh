<div align="center">

# Epidemic Sound Chinese UI

Chinese labels for moods, genres and common actions, in the original interface.

[简体中文](README.md) · **English**

[Install userscript](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js) · [Download extension](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh-extension.zip) · [Changelog](CHANGELOG.md) · [Feedback](https://github.com/MukiCheung/epidemic-sound-zh/issues/new/choose)

[![CI](https://github.com/MukiCheung/epidemic-sound-zh/actions/workflows/ci.yml/badge.svg)](https://github.com/MukiCheung/epidemic-sound-zh/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/MukiCheung/epidemic-sound-zh)](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![English-to-Chinese terminology illustration, not a website screenshot](docs/overview.svg)

<sub>Terminology illustration; not a screenshot of the website.</sub>

</div>

[Features](#features) · [Installation](#installation) · [Coverage](#coverage-and-limitations) · [FAQ](#faq) · [Development](#development)

## About

A dictionary-based Chinese interface for Epidemic Sound. Navigation, moods, genres and common actions appear in Chinese at their original positions, while English text, links and form values are retained. Available as a userscript or a Chrome / Edge extension.

## Features

- **Original layout**: uses the site's typography, colors, buttons and cards.
- **311 curated entries**: navigation, moods, genres, selected themes and actions, plus dynamic track-count labels.
- **Musical context**: translations chosen for how creators describe music.
- **Original data retained**: does not replace English text nodes, input values, link targets or network requests.
- **Dynamic pages**: applies known translations after navigation, filtering and content loading.
- **Language toggle**: use the bottom-right switch or `Alt + Shift + C` (`Option + Shift + C` on Mac).

The script does not call a translation API, upload page text or read cookies. The userscript manager may check GitHub for updates according to its settings. The website's own requests continue normally.

## Translation examples

| Original | Chinese display | Context |
| --- | --- | --- |
| Laid Back | 松弛悠闲 | Mood |
| Restless | 躁动不安 | Mood |
| Stems | 分轨音频 | Download controls |

## Installation

| Option | For | Updates |
| --- | --- | --- |
| Userscript (recommended) | Users with Tampermonkey, or willing to install it | Managed by the userscript manager's update settings |
| Chrome / Edge extension | Users who prefer a standalone extension | Download, replace files and reload manually |

### Userscript

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open the [userscript installer](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js) and confirm installation in the manager.
3. Open or refresh [Epidemic Sound](https://www.epidemicsound.com/music/featured/).

If the link downloads a file, import the `.user.js` file through Tampermonkey's dashboard → Utilities. Follow the manager's instructions to enable browser userscript support if necessary.

### Chrome / Edge extension

1. [Download the ZIP](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh-extension.zip) and extract it to a permanent folder.
2. Open `chrome://extensions` (Edge: `edge://extensions`) and enable Developer mode.
3. Choose **Load unpacked** and select the folder containing `manifest.json`.
4. Refresh Epidemic Sound.

Use one distribution at a time. The extension is not published in an extension store. To update it, replace the extracted files with the new release and reload it in the extension manager. Disable or uninstall, then refresh the page to remove the Chinese display.

## Coverage and limitations

This is an early, expanding dictionary, not a complete translation of the site.

- Track titles and artist names stay unchanged. Unlisted text and some complex components remain English.
- Search input is submitted as typed, without automatic translation.
- Screen readers may announce both English and CSS-generated Chinese text.
- Chinese is enabled on each page load; the toggle state does not persist across refreshes.
- Website changes may cause missing translations or layout issues. Switch back to English and report the affected page.

Live observations cover Chinese navigation, filters and the download dialog, with English filter parameters retained. Tests cover original text, links, form values, dynamic node reuse and toggle restoration. **Completed music downloads, all filter combinations and independent extension loading have not completed acceptance checks.** See the [verification record](docs/verification.md) (Chinese).

## FAQ

<details>
<summary><strong>Does it translate song titles or search queries?</strong></summary>

No. Titles and artist names stay in their original language. Search input is sent as typed.

</details>

<details>
<summary><strong>Do I need a translation API or another account?</strong></summary>

No. Translations come from the bundled dictionary. Epidemic Sound's own login, subscription and licensing requirements still apply.

</details>

<details>
<summary><strong>Why do I still see English after installing?</strong></summary>

Check that the script or extension is enabled, then refresh the site. For Tampermonkey, check browser userscript permissions. Do not enable both distributions together. Individual phrases may be absent from the dictionary; report the original phrase and page location.

</details>

<details>
<summary><strong>How do I return to English?</strong></summary>

Use the bottom-right switch or `Alt + Shift + C` (`Option + Shift + C` on Mac). To disable the tool entirely, turn off the script or extension and refresh.

</details>

## Contributing

For missing or awkward translations, include **page location, original English and suggested Chinese** in an issue. Cropped screenshots help; remove account and personal details first.

For code contributions, edit [`dictionary.json`](dictionary.json). It is the single translation source, and both distributions are generated from the same runtime. See the bilingual [contribution guide](CONTRIBUTING.md).

## Development

Requires Node.js 24 and Python 3.

```sh
npm ci
npm run build
npm test
```

| File | Purpose |
| --- | --- |
| `dictionary.json` | Curated translations |
| `runtime.js` | Chinese display, dynamic observation and restoration |
| `build.py` | Userscript, extension and release ZIP generation |
| `test.cjs` | DOM compatibility regression tests |

Chinese is displayed through CSS generated content while the original English nodes remain in place. The runtime skips input/editable areas and track/artist links. This reduces changes to business text; it does not establish compatibility with every internal website behavior or telemetry path.

## About the project

Maintained by [Muki Cheung](https://github.com/MukiCheung).

Not affiliated with Epidemic Sound. This tool does not provide music or change subscription or licensing requirements. Code is licensed under [MIT](LICENSE).
