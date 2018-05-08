# 原始碼目錄結構

Electron 的原始碼可分成幾個部分，主要是對照到 Chromium 模組切分的結構。

為了更加了解原始碼，你應該熟悉 [Chromium 的多處理序架構](https://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 原始碼結構

```diff
Electron
├── atom/ - C++ 原始碼。
|   ├── app/ - 系統入口點程式碼。
|   ├── browser/ - 前端程式碼，包含主視窗、UI 及所有主處理序的東西。
|   |    跟畫面轉譯器溝通以管理頁面。
|   |   ├── ui/ - 不用平臺的 UI 實作。
|   |   |   ├── cocoa/ - Cocoa 專用原始碼。
|   |   |   ├── win/ - Windows GUI 專用原始碼。
|   |   |   └── x/ - X11 專用原始碼。
|   |   ├── api/ - 主處理序 API 的實作。
|   |   ├── net/ - 網路相關原始碼。
|   |   ├── mac/ - Mac 專用的 Objective-C 原始碼。
|   |   └── resources/ - 圖示等跨平臺的東西。
|   ├── renderer/ - 在畫面轉譯處理序中執行的程式碼。
|   |   └── api/ - 畫面轉譯處理序 API 的實作。
|   └── common/ - 主處理序及畫面轉譯處理序期用的程式碼。包含一些工具函式，
|       以及將 Node 訊息迴圈整合進 Chromium 訊息迴圈的程式碼。
|       └── api/ - 共用 API 實作、Electron 內建模組的基礎架構。
├── brightray/ - 方便使用 libcc 的填充碼。
├── chromium_src/ - 由 Chromium 複製過來的原始碼。 參考下方說明。
├── default_app/ - Electron 沒有指定 app 啟動時使用的預設頁面。
├── docs/ - 文件。
├── lib/ - JavaScript 原始碼。
|   ├── browser/ - JavaScript 主處理序初始化程式碼。
|   |   └── api/ - JavaScript API 實作。
|   ├── common/ - 主處理序及畫面轉譯處理序共用的 JavaScript 程式碼。
|   |   └── api/ - JavaScript API 實作。
|   └── renderer/ - JavaScript 畫面轉譯處理序初始化程式碼。
|       └── api/ - JavaScript API 實作。
├── spec/ - 自動測試案例。
├── electron.gyp - Electron 建置規則。
└── common.gypi - 供 `node` 及 `breakpad` 等其他元件使用的編譯器設定及建置規則。
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## 其他目錄的結構

* **script** - 開發時期用的腳本，例如建置、打包、測試等。
* **tools** - 供 gyp 檔用的輔助腳本，跟 `script` 不同，放在這裡的腳本使用者應該都不會直接用到。
* **vendor** - 第三方相依模組的原始碼。我們不用 `third_party`，是為了避免與 Chromium 原始碼目錄裡的那份混淆。
* **node_modules** - 建置時使用的第三方 Node 模組。
* **out** - `ninja` 的暫存目錄。
* **dist** - `script/create-dist.py` 建立發佈檔時產生的暫存目錄。
* **external_binaries** - 不支援以 `gyp` 建置的第三方框架下載檔。

## 持續更新 Git 子模組

Electron 儲存庫裡有一些外部的相依模組，存放在 [/vendor](https://github.com/electron/electron/tree/master/vendor) 目錄中。 執行 `git status` 時，你可能會看到這樣的訊息:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

執行下列指令可以更新相依的外部模組:

```sh
git submodule update --init --recursive
```

如果你覺得自己很常執行這組指令，可以在 `~/.gitconfig` 檔中建立別名:

```sh
[alias]
    su = submodule update --init --recursive
```