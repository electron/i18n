# 應用程式發佈

要用 Electron 發佈應用程式，你要先下載 Electron [預先建置好的二進位檔](https://github.com/electron/electron/releases)。 接下來，你的應用程式應要放在 Electron 的資源目錄下，並命名為 `app`，就像以下的範例。 請注意，下列範例中以 `electron/` 表示 Electron 二進位檔存放的地方。

macOS 平臺:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Windows 及 Linux 平臺:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

執行 `Electron.app` (Linux 是 `electron`，Windows 是 `electron.exe`)，Electron 就會啟動你的應用程式。`electron` 目錄就是你要發佈給最終使用者的東西。

## 將你的應用程式打包成一個檔案

除了將應用程式的所有原始碼複製一份來發佈外，你還可以將應用程式打包成一個 [asar](https://github.com/electron/asar) 封存檔，免得使用者直接看到你應用程式的原始碼。

想用 `asar` 封存檔取代 `app` 資料夾，你得將封存檔改名為 `app.asar`，放到 Electron 的資源目錄中，就像下面的範例一樣。Electron 就會試著由封存檔載入並啟動應用程式。

macOS 平臺:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Windows 及 Linux 平臺:

```text
electron/resources/
└── app.asar
```

細節可以參考[應用程式打包](application-packaging.md)。

## Rebranding with Downloaded Binaries

After bundling your app into Electron, you will want to rebrand Electron before distributing it to users.

### Windows

你可以將 `electron.exe` 改成任何你想要的名字，再使用 [rcedit](https://github.com/atom/rcedit) 這類工具編輯圖示及其他資訊。

### macOS

你可以將 `Electron.app` 改成任何你想要的名字。此外，你還要修改下列檔案中的 `CFBundleDisplayName`、`CFBundleIdentifier` 及 `CFBundleName` 欄位:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

改名後的應用程式結構應該像:

    MyApp.app/Contents
    ├── Info.plist
    ├── MacOS/
    │   └── MyApp
    └── Frameworks/
        ├── MyApp Helper EH.app
        |   ├── Info.plist
        |   └── MacOS/
        |       └── MyApp Helper EH
        ├── MyApp Helper NP.app
        |   ├── Info.plist
        |   └── MacOS/
        |       └── MyApp Helper NP
        └── MyApp Helper.app
            ├── Info.plist
            └── MacOS/
                └── MyApp Helper
    

### Linux

你可以將 `electron` 執行檔改成任何你想要的名字。

## 打包工具

Apart from packaging your app manually, you can also choose to use third party packaging tools to do the work for you:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding by Rebuilding Electron from Source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to modify the `atom.gyp` file and have a clean rebuild.

### Creating a Custom Electron Fork

Creating a custom fork of Electron is almost certainly not something you will need to do in order to build your app, even for "Production Level" applications. Using a tool such as `electron-packager` or `electron-forge` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Creating a Custom Release with surf-build

1. 透過 npm 安裝 [Surf](https://github.com/surf-build/surf): `npm install -g surf-build@latest`

2. Create a new S3 bucket and create the following empty directory structure:
    
        - atom-shell/
          - symbols/
          - dist/
        

3. 設定以下環境變數:

* `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload node.js headers as well as symbols
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will just do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
* `TARGET_ARCH` - set to `ia32` or `x64` 

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. 很有耐心的等到建置完成。