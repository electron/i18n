# 應用程式發佈

## 概述

To distribute your app with Electron, you need to package and rebrand it. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Manual distribution

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). 接下來，你的應用程式應要放在 Electron 的資源目錄下，並命名為 `app`，就像以下的範例。

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*macOS 平臺:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Windows 及 Linux 平臺:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

想用 `asar` 封存檔取代 `app` 資料夾，你得將封存檔改名為 `app.asar`，放到 Electron 的資源目錄中，就像下面的範例一樣。Electron 就會試著由封存檔載入並啟動應用程式。

*macOS 平臺:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Windows 及 Linux 平臺:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

將你的應用程式包進 Electron 後，你可能會想要客製化 Electron 品牌後再發佈給使用者。

#### macOS

你可以將 `Electron.app` 改成任何你想要的名字。此外，你還要修改下列檔案中的 `CFBundleDisplayName`、`CFBundleIdentifier` 及 `CFBundleName` 欄位:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

你也可以修改輔助應用程式的名字，不要讓 `Electron Helper` 出現在「活動監視器」中，只將輔助應用程式執行檔的名稱改掉就好。

改名後的應用程式結構應該像:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

你可以將 `electron.exe` 改成任何你想要的名字，再使用 [rcedit](https://github.com/electron/rcedit) 這類工具編輯圖示及其他資訊。

#### Linux

你可以將 `electron` 執行檔改成任何你想要的名字。

### Rebranding by rebuilding Electron from source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.
