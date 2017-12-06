# 原始碼目錄結構

Electron 的原始碼可分成幾個部分，主要是對照到 Chromium 模組切分的結構。

為了更加了解原始碼，你應該熟悉 [Chromium 的多處理序架構](http://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 原始碼結構

```sh
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
├── chromium_src/ - Source code copied from Chromium. See below.
├── default_app/ - The default page to show when Electron is started without
|   providing an app.
├── docs/ - Documentations.
├── lib/ - JavaScript source code.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── spec/ - Automatic tests.
├── electron.gyp - Building rules of Electron.
└── common.gypi - Compiler specific settings and building rules for other
    components like `node` and `breakpad`.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we just took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## Structure of Other Directories

* **script** - 開發時期用的腳本，例如建置、打包、測試等。
* **tools** - 供 gyp 檔用的輔助腳本，跟 `script` 不同，放在這裡的腳本使用者應該都不會直接用到。
* **vendor** - 第三方相依模組的原始碼。我們不用 `third_party`，是為了避免與 Chromium 原始碼目錄裡的那份混淆。
* **node_modules** - 建置時使用的第三方 Node 模組。
* **out** - `ninja` 的暫存目錄。
* **dist** - `script/create-dist.py` 建立發佈檔時產生的暫存目錄。
* **external_binaries** - 不支援以 `gyp` 建置的第三方框架下載檔。

## Keeping Git Submodules Up to Date

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

To update these vendored dependencies, run the following command:

```sh
git submodule update --init --recursive
```

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

```sh
[alias]
    su = submodule update --init --recursive
```