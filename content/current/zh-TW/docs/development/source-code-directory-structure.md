# 原始碼目錄結構

Electron 的原始碼可分成幾個部分，主要是對照到 Chromium 模組切分的結構。

為了更加了解原始碼，你應該熟悉 [Chromium 的多處理序架構](https://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 原始碼結構

```diff
Electron
├── build/ - Build configuration files needed to build with GN.
├── buildflags/ - Determines the set of features that can be conditionally built.
├── chromium_src/ - Source code copied from Chromium that isn't part of the content layer.
├── default_app/ - A default app run when Electron is started without
|                  providing a consumer app.
├── docs/ - Electron's documentation.
|   ├── api/ - Documentation for Electron's externally-facing modules and APIs.
|   ├── development/ - Documentation to aid in developing for and with Electron.
|   ├── fiddles/ - A set of code snippets one can run in Electron Fiddle.
|   ├── images/ - Images used in documentation.
|   └── tutorial/ - Tutorial documents for various aspects of Electron.
├── lib/ - JavaScript/TypeScript source code.
|   ├── browser/ - Main process initialization code.
|   |   ├── api/ - API implementation for main process modules.
|   |   └── remote/ - Code related to the remote module as it is
|   |                 used in the main process.
|   ├── common/ - Relating to logic needed by both main and renderer processes.
|   |   └── api/ - API implementation for modules that can be used in
|   |              both the main and renderer processes
|   ├── isolated_renderer/ - Handles creation of isolated renderer processes when
|   |                        contextIsolation is enabled.
|   ├── renderer/ - Renderer process initialization code.
|   |   ├── api/ - API implementation for renderer process modules.
|   |   ├── extension/ - Code related to use of Chrome Extensions
|   |   |                in Electron's renderer process.
|   |   ├── remote/ - Logic that handes use of the remote module in
|   |   |             the main process.
|   |   └── web-view/ - Logic that handles the use of webviews in the
|   |                   renderer process.
|   ├── sandboxed_renderer/ - Logic that handles creation of sandboxed renderer
|   |   |                     processes.
|   |   └── api/ - API implementation for sandboxed renderer processes.
|   └── worker/ - Logic that handles proper functionality of Node.js
|                 environments in Web Workers.
├── patches/ - Patches applied on top of Electron's core dependencies
|   |          in order to handle differences between our use cases and
|   |          default functionality.
|   ├── boringssl/ - Patches applied to Google's fork of OpenSSL, BoringSSL.
|   ├── chromium/ - Patches applied to Chromium.
|   ├── node/ - Patches applied on top of Node.js.
|   └── v8/ - Patches applied on top of Google's V8 engine.
├── shell/ - C++ source code.
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
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Building rules of Electron.
```

## 其他目錄的結構

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - `script/create-dist.py` 建立發佈檔時產生的暫存目錄。
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.
* **node_modules** - 建置時使用的第三方 Node 模組。
* **npm** - Logic for installation of Electron via npm.
* **out** - `ninja` 的暫存目錄。
* **script** - 開發時期用的腳本，例如建置、打包、測試等。
```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```
* **tools** - Helper scripts used by GN files.
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

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
