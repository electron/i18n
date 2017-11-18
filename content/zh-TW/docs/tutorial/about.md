# 關於 Electron

[Electron](https://electron.atom.io) 是由 GitHub 開發的開放原始碼專案，開發者可以用 HTML, CSS 和 JavaScript 打造跨平臺的桌面應用程式。 Electron 將 [Chromium](https://www.chromium.org/Home) 及 [Node.js](https://nodejs.org) 整合成單一執行環境，並且能打包成 Mac, Windows 及 Linux 應用程式。

Electron 源於 2013 年，是 GitHub 文字編輯器 [Atom](https://atom.io) 中的建置框架。這兩項專案都在 2014 春季開放原始碼。

Electron 已經成為開放原始碼開發者、新創公司及老字號公司的熱門工具。[看看誰在用 Electron](https://electron.atom.io/apps/)。

請繼續閱讀，學習更多關於貢獻者與 Electron 發布版本的資訊，或是瀏覽 [Quick Start Guide](quick-start.md) 開始使用 Electron 開發。

## 核心團隊和貢獻者

Electron 是由 GitHub 的一個團隊以及一群來自社群的 [活躍的貢獻者](https://github.com/electron/electron/graphs/contributors) 所維護的。 有些貢獻者是個人，而有些貢獻者工作於大型公司，這些公司正在使用 Electron 開發。 我們很樂於將經常貢獻的貢獻者加入專案，作為維護人員。 閱讀更多關於[貢獻 Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)。

## 版本發佈

[Electron 發佈](https://github.com/electron/electron/releases)頻繁。當有重大的臭蟲修復、提供新的 API、或是 Chromium 或 Node.js 有版本更新時，我們會發佈 Electron。

### 相依套件更版

Electron 的 Chromium 版本通常會在 Chromium 穩定版釋出後的一至兩個星期內更新，這取決於 Chromium 更新版所牽涉的努力。

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### 版號規則

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### 長期支援

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## 核心理念

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## 歷史

下列是 Electron 的里程碑。

| :calendar:     | :tada:                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| **2013 年 4 月** | [Atom Shell 啟動](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45)。  |
| **2013 年 5 月** | [Atom Shell 原始碼公開](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html)。                        |
| **2015 年 4 月** | [Atom Shell 改名為 Electron](https://github.com/electron/electron/pull/1389)。                              |
| **2016 年 5 月** | [Electron 發佈 `1.0.0` 版](https://electron.atom.io/blog/2016/05/11/electron-1-0)。                         |
| **2016 年 5 月** | [Electron 應用程式相容 Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide)。 |
| **2016 年 8 月** | [Electron 應用程式支援 Windows Store](https://electron.atom.io/docs/tutorial/windows-store-guide)。            |