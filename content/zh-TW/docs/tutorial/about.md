# 關於 Electron

[Electron](https://electronjs.org) 是由 GitHub 開發的開放原始碼專案，開發者可以用 HTML, CSS 和 JavaScript 打造跨平臺的桌面應用程式。 Electron 將 [Chromium](https://www.chromium.org/Home) 及 [Node.js](https://nodejs.org) 整合成單一執行環境，並且能打包成 Mac, Windows 及 Linux 應用程式。

Electron 源於 2013 年，是 GitHub 文字編輯器 [Atom](https://atom.io) 中的建置框架。這兩項專案都在 2014 春季開放原始碼。

Electron 已經成為開放原始碼開發者、新創公司及老字號公司的熱門工具。[看看誰在用 Electron](https://electronjs.org/apps)。

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

Electron 2.0 版開始[遵照 `semver` 規範](https://semver.org)。 對大多數使用 npm 的應用程式而言，執行 `$ npm install electron` 就可以了。

詳細的版本升級流程請參考[版號規則文件](electron-versioning.md)。

### 長期支援

目前並沒有舊版 Electron 的長期支援方案。 如果你目前這一版 Electron 用起來沒什麼問題，你可以一路繼續用下去。 如果你想要用新版提供的功能，你應該升到新一點的版本。

`1.0.0` 版帶來了幾項重大更新。 如果你還沒使用到這一版，應該先[瞭解 `1.0.0` 版變更事項](https://electronjs.org/blog/electron-1-0)。

## 核心理念

為了保持 Electron 的精巧 (檔案大小) 及永續性 (相依套件及 API 擴展)，我們限縮了核心專案的範圍。

For instance, Electron uses Chromium's rendering library rather than all of Chromium. 這使得升級 Chromium 更容易，但相對的也代表 Electron 可能會少了某些 Google Chrome 中有的功能。

新增進 Electron 中的功能主要都是原生 API。 如果一個功能可以獨立成為 Node.js 模組，就該這樣做。 請參閱[由社群打造的 Electron 工具](https://electronjs.org/community)。

## 歷史

下列是 Electron 的里程碑。

| :calendar:     | :tada:                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| **2013 年 4 月** | [Atom Shell 啟動](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45)。 |
| **2014 年 5 月** | [Atom Shell 原始碼公開](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html)。                      |
| **2015 年 4 月** | [Atom Shell 改名為 Electron](https://github.com/electron/electron/pull/1389)。                             |
| **2016 年 5 月** | [Electron 發佈 `1.0.0` 版](https://electronjs.org/blog/electron-1-0)。                                     |
| **2016 年 5 月** | [Electron 應用程式相容 Mac App Store](mac-app-store-submission-guide.md)。                                    |
| **2016 年 8 月** | [Electron 應用程式支援 Windows Store](windows-store-guide.md)。                                               |