# 關於 Electron

[Electron](https://electron.atom.io) 是由 GitHub 開發的開放源碼庫，使開發者可以用 HTML，CSS 和 JavaScript 構建跨平臺的桌面應用程式。 Electron 藉由結合 [Chromium](https://www.chromium.org/Home) 與 [Node.js](https://nodejs.org) 成為單一執行環境，以及提供應用程式打包至 Mac 、Windows 及 Linux 平台，來實現這個特性。

Electron 起源於 2013 年，作為 [Atom](https://atom.io)，GitHub 的可改造的文字編輯器，開發所需要的應用程式框架。這兩個專案在 2014 春天被開放其原始碼。

Electron 已經成為開放原始碼開發者、新創公司及設立許久的公司所使用的熱門工具。[看看誰使用 Electron](https://electron.atom.io/apps/)。

請繼續閱讀，學習更多關於貢獻者與 Electron 發布版本的資訊，或是瀏覽 [Quick Start Guide](quick-start.md) 開始使用 Electron 開發。

## 核心團隊和貢獻者

Electron 是由 GitHub 的一個團隊以及一群來自社群的 [活躍的貢獻者](https://github.com/electron/electron/graphs/contributors) 所維護的。 有些貢獻者是個人，而有些貢獻者工作於大型公司，這些公司正在使用 Electron 開發。 We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## 版本發布

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### 更新相依性

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### 版本號

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### 長期支援

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## 核心哲學

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## 歷史

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).        |
| **May 2014**    | [Atom Shell is open sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                            |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                                    |
| **May 2016**    | [Electron releases `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                  |
| **May 2016**    | [Electron apps compatible with Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **August 2016** | [Windows Store support for Electron apps](https://electron.atom.io/docs/tutorial/windows-store-guide).                |