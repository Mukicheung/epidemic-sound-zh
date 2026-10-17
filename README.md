<div align="center">

# Epidemic Sound 原生中文

在原来的界面里，用中文查看情绪、曲风和常用操作。

**简体中文** · [English](README.en.md)

[安装油猴脚本](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js) · [下载浏览器扩展](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh-extension.zip) · [更新记录](CHANGELOG.md) · [反馈问题](https://github.com/MukiCheung/epidemic-sound-zh/issues/new/choose)

[![CI](https://github.com/MukiCheung/epidemic-sound-zh/actions/workflows/ci.yml/badge.svg)](https://github.com/MukiCheung/epidemic-sound-zh/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/MukiCheung/epidemic-sound-zh)](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![中英文术语对照示意，不是网站截图](docs/overview.svg)

<sub>术语对照示意；不是网站实拍截图。</sub>

</div>

[功能](#现在能做什么) · [安装](#安装) · [覆盖范围](#覆盖范围与已知限制) · [常见问题](#常见问题) · [开发](#本地开发)

## 关于项目

这是一个基于本地词典的 Epidemic Sound 中文界面工具。菜单、情绪、曲风和常用操作在原位置显示中文，保留原英文文本、链接和表单值。提供油猴脚本和 Chrome / Edge 扩展两种安装方式。

## 现在能做什么

- **原位中文**：沿用网站字体、颜色、按钮和卡片布局。
- **311 条人工整理译文**：常用导航、情绪、曲风、部分主题与操作；曲目数量自动转换。
- **音乐语境译法**：`Laid Back → 松弛悠闲`、`Restless → 躁动不安`、`Stems → 分轨音频`。
- **保留原始数据**：不替换原英文文本节点，不改输入值、链接目标或网络请求。
- **动态页面适配**：翻页、筛选、加载新内容后，自动处理已收录词条。
- **一键切回英文**：右下角开关，或 `Alt + Shift + C`（Mac 为 `Option + Shift + C`）。

脚本本身不调用翻译 API，不发送页面文本，也不读取 Cookie。油猴管理器会按自身设置从 GitHub 检查更新；网站自己的请求照常运行。

## 术语示例

| 原文 | 中文显示 | 使用位置 |
| --- | --- | --- |
| Laid Back | 松弛悠闲 | 情绪标签 |
| Restless | 躁动不安 | 情绪标签 |
| Stems | 分轨音频 | 下载相关操作 |

## 安装

| 方式 | 适合谁 | 更新方式 |
| --- | --- | --- |
| 油猴脚本（推荐） | 已使用或愿意安装 Tampermonkey 的用户 | 由脚本管理器按设置检查更新 |
| Chrome / Edge 扩展 | 希望使用独立扩展的用户 | 下载新版、替换文件并重新加载 |


### 推荐：油猴脚本

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/)。
2. 点击 **[安装 Epidemic Sound 原生中文](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh.user.js)**，在油猴页面确认安装。
3. 打开或刷新 [Epidemic Sound](https://www.epidemicsound.com/music/featured/)。

如果链接只下载了文件：打开油猴管理面板 → 实用工具 → 从文件导入，选择 `.user.js`。若脚本没有运行，请按油猴提示启用浏览器的用户脚本支持。

### Chrome / Edge 扩展版

1. [下载扩展 ZIP](https://github.com/MukiCheung/epidemic-sound-zh/releases/latest/download/epidemic-zh-extension.zip)，解压到固定文件夹。
2. 打开 `chrome://extensions`（Edge：`edge://extensions`），启用开发者模式。
3. 点击「加载已解压的扩展程序」，选择含 `manifest.json` 的文件夹。
4. 刷新 Epidemic Sound。

两个版本二选一。扩展版尚未上架商店，更新时下载新版、替换文件，再在扩展管理页重新加载。停用或卸载后刷新网页即可恢复。

## 覆盖范围与已知限制

这是**持续补词的早期版本**，还不是全站完整翻译。

- 歌名、艺人名保留原文；未收录长文和部分复杂组件仍会显示英文。
- 搜索框输入不会自动中英转换；你的输入仍按原样交给网站。
- CSS 生成的中文可能与英文一起进入无障碍名称，读屏软件可能重复朗读。
- 目前每次打开页面默认开启中文；开关状态不跨刷新保存。
- 网站结构变化可能造成漏译或排版问题。可先切回英文，再[提交问题](https://github.com/MukiCheung/epidemic-sound-zh/issues/new/choose)。

实站已观察到中文导航、筛选栏及下载窗口正常显示，英文筛选参数保持原样。测试覆盖原文、链接、表单值、动态节点复用和开关恢复。**完整下载文件落盘、全部筛选组合及扩展版独立加载尚未完成验收。** 详见 [验证说明](docs/verification.md)。

## 常见问题

<details>
<summary><strong>会翻译歌名和搜索词吗？</strong></summary>

不会。歌名、艺人名保持原文，搜索框里的内容也按你的输入提交。

</details>

<details>
<summary><strong>需要翻译 API 或额外账号吗？</strong></summary>

不需要。翻译来自随脚本发布的本地词典。Epidemic Sound 本身的登录、订阅和音乐授权要求不变。

</details>

<details>
<summary><strong>装好了却没有中文，怎么排查？</strong></summary>

确认脚本或扩展已启用，刷新 Epidemic Sound；油猴用户检查浏览器是否允许用户脚本运行。不要同时启用两个版本。个别词没有变化，可能尚未收录，可在反馈中附上英文原词和页面位置。

</details>

<details>
<summary><strong>怎么恢复英文？</strong></summary>

点击右下角开关，或按 `Alt + Shift + C`（Mac：`Option + Shift + C`）。要完全停用，禁用脚本或扩展后刷新网页。

</details>

## 一起补全它

遇到漏译或译法不自然，欢迎提交 Issue：**页面位置 + 英文原词 + 建议中文**。可以附局部截图，请遮掉账号和个人信息。

会写代码的话，也欢迎直接修改 [`dictionary.json`](dictionary.json) 后提 PR。词典是唯一的翻译来源，油猴和扩展由同一份代码生成。参见 [贡献指南](CONTRIBUTING.md)。

## 本地开发

需要 Node.js 24 和 Python 3。

```sh
npm ci
npm run build
npm test
```

- `dictionary.json`：人工词典。
- `runtime.js`：原位显示、动态观察与关闭恢复逻辑。
- `build.py`：生成油猴脚本、扩展和发布 ZIP。
- `test.cjs`：DOM 兼容性回归测试。

通过 CSS 生成内容显示译文，原节点保持原英文；翻译只处理可适配的元素，并跳过输入区、编辑区和曲目/艺人链接。这个方法降低改动业务文本的风险，但不等于对网站全部内部逻辑和遥测的保证。

## 关于

由 [Muki Cheung](https://github.com/MukiCheung) 维护。

本项目与 Epidemic Sound 无隶属关系；不提供音乐资源，不改变订阅或授权要求。代码采用 [MIT License](LICENSE)。
