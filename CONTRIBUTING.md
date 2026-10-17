# 贡献指南

欢迎补词、改译法和修复页面适配。

## 提交译文

1. 提供英文原词与页面上下文。相同词在不同音乐语境下可能有不同含义。
2. 修改 `dictionary.json`；不要直接修改生成的 `.user.js` 或 `extension/content.js`。
3. 保留歌名、艺人名与产品专名。描述音乐氛围时优先使用创作者看得懂的表达。
4. 执行 `npm ci && npm run build && npm test`，把词典和生成文件一起提交。

## 修改运行逻辑

不要改写原文本节点、表单值、URL 或请求数据。兼容性测试应验证真实约束，例如点击读取的英文、动态节点复用和样式恢复，而不只检查翻译属性存在。

涉及布局的修改请附测试页面或遮掉个人信息后的局部截图。不要提交 Cookie、令牌、音乐文件、个人账号信息或实际下载链接。

## 版本发布

维护者修改 `package.json` 与锁文件中的版本，运行构建和测试；创建 Git tag 与 GitHub Release，并上传 `epidemic-zh.user.js`、`epidemic-zh-extension.zip`。仅发布已检查的文件，发行说明列出已验证行为和剩余缺口。


---

# Contributing

## Translation changes

1. Include the English phrase and its page context. Musical context matters.
2. Edit `dictionary.json`, not the generated userscript or `extension/content.js`.
3. Keep track titles, artist names and product names unchanged. Prefer clear, idiomatic Chinese for musical moods.
4. Run `npm ci`, `npm run build` and `npm test`. Commit the dictionary and generated outputs together.

## Runtime changes

Preserve original text nodes, form values, URLs and request data. Tests should cover actual compatibility constraints: English text read by click handlers, reused dynamic nodes and restored styles.

For layout changes, include a test page or a cropped screenshot with personal information removed. Do not submit cookies, tokens, music files, private account details or direct music download URLs.

## Releases

Maintainers update the version in `package.json` and the lockfile, build and test, then create a Git tag and GitHub Release with the userscript and extension ZIP. Release notes should distinguish verified behavior from outstanding checks.
