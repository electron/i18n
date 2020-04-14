# 原始碼目錄結構

Electron 的原始碼可分成幾個部分，主要是對照到 Chromium 模組切分的結構。

為了更加了解原始碼，你應該熟悉 [Chromium 的多處理序架構](https://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 原始碼結構

```diff
Electron
├── atom/ - C++ source code.
|   ├── app/ - 系統入口點程式碼。
|   ├── browser/ - The frontend including the main window, UI, and all of the
|   |   |          main process things. This talks to the renderer to manage web
|   |   |          pages.
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
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── chromium_src/ - Source code copied from Chromium. See below.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - Documentations.
├── lib/ - JavaScript source code.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - Automatic tests.
└── BUILD.gn - Building rules of Electron.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## 其他目錄的結構

* **script** - 開發時期用的腳本，例如建置、打包、測試等。
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
* **node_modules** - 建置時使用的第三方 Node 模組。
* **out** - `ninja` 的暫存目錄。
* **dist** - `script/create-dist.py` 建立發佈檔時產生的暫存目錄。
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

## 持續更新 Git 子模組

Electron 儲存庫裡有一些外部的相依模組，存放在 [/vendor](https://github.com/electron/electron/tree/master/vendor) 目錄中。 執行 `git status` 時，你可能會看到這樣的訊息:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
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
