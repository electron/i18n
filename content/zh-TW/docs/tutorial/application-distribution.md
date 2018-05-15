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

## 針對下載的二位進檔客製品牌

將你的應用程式包進 Electron 後，你可能會想要客製化 Electron 品牌後再發佈給使用者。

### Windows

你可以將 `electron.exe` 改成任何你想要的名字，再使用 [rcedit](https://github.com/atom/rcedit) 這類工具編輯圖示及其他資訊。

### macOS

你可以將 `Electron.app` 改成任何你想要的名字。此外，你還要修改下列檔案中的 `CFBundleDisplayName`、`CFBundleIdentifier` 及 `CFBundleName` 欄位:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

你也可以修改輔助應用程式的名字，不要讓 `Electron Helper` 出現在「活動監視器」中，只將輔助應用程式執行檔的名稱改掉就好。

改名後的應用程式結構應該像:

```text
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
```

### Linux

你可以將 `electron` 執行檔改成任何你想要的名字。

## 打包工具

除了手動打包以外，你也可以考慮選用第三方打包工具來幫你完成這些事情:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## 由原始碼開始客製品牌

也可以從原始碼修改 Electron 產品名稱再建置，達到品牌客製化的目的。為此，你需要修改 `atom.gyp` 檔，清楚先前建置產出的檔案後再重新建置。

### 建立客製化的 Electron 分支

你不太可能會需要建立客製的 Electron 分支，就算你的應用程式該有「上線水準」也不例外。 使用 `electron-packager` 或 `electron-forge` 這些工具，讓你省下這些步驟也能對 Electron 「客製品牌」。

如果你直接修改了 Electron 中的 C++ 程式碼，而且不能回饋回上游，或是被官方版本拒絕了，就需要建立 Electron 分支。 身為 Electron 的維護團隊，我們殷切期望能符合你的使用情境，希望你能盡可能將修改的地方回饋進 Electron 官方版，對你而言也會更容易維護。衷心感謝你的幫忙。

#### 以 surf-build 建立客製化發行版

1. 透過 npm 安裝 [Surf](https://github.com/surf-build/surf): `npm install -g surf-build@latest`

2. 建立新的 S3 Bucket，並建立以下空目錄:
    
    ```sh
    - atom-shell/
      - symbols/
      - dist/
    ```

3. 設定以下環境變數:

* `ELECTRON_GITHUB_TOKEN` - 能在 GitHub 建立 Release 的 Token。
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - 要上傳 Node.js 標頭檔及符號檔的地方
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - 設為 `true`，否則會失敗
* `GITHUB_TOKEN` - 設成跟 `ELECTRON_GITHUB_TOKEN` 一樣
* `SURF_TEMP` - 在 Windows 下設為 `C:\Temp`，防止碰到路徑過長問題
* `TARGET_ARCH` - 設為 `ia32` 或 `x64`

1. 在 `script/upload.py` 中，你*必須*將 `ELECTRON_REPO` 設為你的分支 (`MYORG/electron`)，如果你同時也是原版 Electron 的貢獻者時更要特別注意。

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. 很有耐心的等到建置完成。