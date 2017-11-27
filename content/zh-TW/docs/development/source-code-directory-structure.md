# 原始碼目錄結構

Electron 的原始碼可分成幾個部分，主要是對照到 Chromium 模組切分的結構。

為了更加了解原始碼，你應該熟悉 [Chromium 的多處理序架構](http://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 原始碼結構

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
    |   ├── renderer/ - Code that runs in renderer process.
    |   |   └── api/ - The implementation of renderer process APIs.
    |   └── common/ - Code that used by both the main and renderer processes,
    |       including some utility functions and code to integrate node's message
    |       loop into Chromium's message loop.
    |       └── api/ - The implementation of common APIs, and foundations of
    |           Electron's built-in modules.
    ├── chromium_src/ - Source code that copied from Chromium.
    ├── default_app/ - The default page to show when Electron is started without
    |   providing an app.
    ├── docs/ - 文件。
    ├── lib/ - JavaScript 原始碼。
    |   ├── browser/ - Javascript main process initialization code.
    |   |   └── api/ - Javascript API implementation.
    |   ├── common/ - JavaScript used by both the main and renderer processes
    |   |   └── api/ - Javascript API implementation.
    |   └── renderer/ - Javascript renderer process initialization code.
    |       └── api/ - Javascript API implementation.
    ├── spec/ - 自動測試案例。
    ├── electron.gyp - Electron 建置規則。
    └── common.gypi - Compiler specific settings and building rules for other
        components like `node` and `breakpad`.
    

## 其他目錄的結構

* **script** - 開發時期用的腳本，例如建置、打包、測試等。
* **tools** - 供 gyp 檔用的輔助腳本，跟 `script` 不同，放在這裡的腳本使用者應該都不會直接用到。
* **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
* **node_modules** - 建置時使用的第三方 Node 模組。
* **out** - `ninja` 的暫存目錄。
* **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gyp`.

## 持續更新 Git 子模組

Electron 儲存庫裡有一些外部的相依模組，存放在 [/vendor](https://github.com/electron/electron/tree/master/vendor) 目錄中。 執行 `git status` 時，你可能會看到這樣的訊息:

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

    [alias]
        su = submodule update --init --recursive