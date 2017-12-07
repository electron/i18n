# 關於 Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron 將 [Chromium](https://www.chromium.org/Home) 及 [Node.js](https://nodejs.org) 整合成單一執行環境，並且能打包成 Mac, Windows 及 Linux 應用程式。

Electron 源於 2013 年，是 GitHub 文字編輯器 [Atom](https://atom.io) 中的建置框架。這兩項專案都在 2014 春季開放原始碼。

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

請繼續看下去，瞭解更多有關 Electron 貢獻者與發行版本的資訊，或是從[快速入門導引](quick-start.md) 開始，用 Electron 開發。

## 核心團隊和貢獻者

Electron 是由 GitHub 的一組團隊以及社群[活躍貢獻者](https://github.com/electron/electron/graphs/contributors)們所維護。 有些貢獻者是個人，也有些貢獻者任職於使用 Electron 的大公司。 我們很樂於將經常貢獻的人設定成專案維護人員。 閱讀更多有關[貢獻 Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)的資訊。

## 版本發佈

[Electron 發佈](https://github.com/electron/electron/releases)頻繁。當有重大的臭蟲修復、新增 API 或是升級 Chromium 或 Node.js 時，我們就會發佈新版。

### 相依套件更版

Electron 中的 Chromium 通常會在 Chromium 穩定版發佈的一到兩週內更新，取決於升級 Chromium 時所要花的功夫。

Node.js 新版發佈後，Electron 通常會等一個月左右才開始升級，通常這時候的版本會比較穩定。

Electron 中的 Node.js 跟 Chromium 共用同一份 V8，通常是 Chromium 用的那版。大多數情況下這樣*就會動了*，不過有時可能要改動到 Node.js。

### 版號規則

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### 長期支援

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## 核心理念

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## 歷史

Below are milestones in Electron's history.

| :calendar:     | :tada:                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **2013 年 4 月** | [Atom Shell 啟動](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45)。              |
| **2013 年 5 月** | [Atom Shell 原始碼公開](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html)。                                    |
| **2015 年 4 月** | [Atom Shell 改名為 Electron](https://github.com/electron/electron/pull/1389)。                                          |
| **2016 年 5 月** | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **2016 年 5 月** | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **2016 年 8 月** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |