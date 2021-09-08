---
title: Launching Your Electron App From a URL In Another App
description: このガイドでは、Electron アプリを特定のプロトコルのデフォルトハンドラとして設定する手順を説明します。
slug: launch-app-from-url-in-another-app
hide_title: true
---

# 他アプリ内の URL から自分の Electron アプリを起動する

## 概要

<!-- ✍ Update this section if you want to provide more details -->

This guide will take you through the process of setting your Electron app as the default handler for a specific [protocol](https://www.electronjs.org/docs/api/protocol).

このチュートリアルを終える頃には、特定のプロトコルで始まる URL がクリックされた場合、アプリがそれに干渉してハンドリングするように設定できます。 このガイドでは、使用するプロトコルを "`electron-fiddle://`" とします。

## サンプル

### メインプロセス (main.js)

First, we will import the required modules from `electron`. These modules help control our application lifecycle and create a native browser window.

```javascript
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
```

次に、"`electron-fiddle://`" プロトコルをすべて処理するために、アプリケーションを登録します。

```javascript
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

ここで、ブラウザのウインドウを作成し、アプリケーションの `index.html` ファイルを読み込む関数を定義します。

```javascript
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}
```

この次のステップで、`BrowserWindow` を作成し、外部プロトコルがクリックされたイベントの処理方法をアプリケーションに伝えます。

This code will be different in Windows compared to MacOS and Linux. This is due to Windows requiring additional code in order to open the contents of the protocol link within the same Electron instance. この詳細については、[こちら](https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock) をお読みください。

#### Windows のコード:

```javascript
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 誰かが 2 つ目のインスタンスを実行しようとしたので、ウインドウにフォーカスさせなければなりません。
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // mainWindow を作成する、アプリの残りを読み込む、等
  app.whenReady().then(() => {
    createWindow()
  })

  // Handle the protocol. 今回は、エラーボックスを表示することにします。
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
}
```

#### macOS と Linux のコード:

```javascript
// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができると呼び出されます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady().then(() => {
  createWindow()
})

// Handle the protocol. 今回は、エラーボックスを表示することにします。
app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})
```

Finally, we will add some additional code to handle when someone closes our application.

```javascript
// macOS 以外では、すべてのウインドウを閉じたときに終了します。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

## Important notes

### パッケージ化

On macOS and Linux, this feature will only work when your app is packaged. It will not work when you're launching it in development from the command-line. When you package your app you'll need to make sure the macOS `Info.plist` and the Linux `.desktop` files for the app are updated to include the new protocol handler. Some of the Electron tools for bundling and distributing apps handle this for you.

#### [Electron Forge](https://electronforge.io)

If you're using Electron Forge, adjust `packagerConfig` for macOS support, and the configuration for the appropriate Linux makers for Linux support, in your [Forge configuration](https://www.electronforge.io/configuration) _(please note the following example only shows the bare minimum needed to add the configuration changes)_:

```json
{
  "config": {
    "forge": {
      "packagerConfig": {
        "protocols": [
          {
            "name": "Electron Fiddle",
            "schemes": ["electron-fiddle"]
          }
        ]
      },
      "makers": [
        {
          "name": "@electron-forge/maker-deb",
          "config": {
            "mimeType": ["x-scheme-handler/electron-fiddle"]
          }
        }
      ]
    }
  }
}
```

#### [Electron Packager](https://github.com/electron/electron-packager)

For macOS support:

If you're using Electron Packager's API, adding support for protocol handlers is similar to how Electron Forge is handled, except `protocols` is part of the Packager options passed to the `packager` function.

```javascript
const packager = require('electron-packager')

packager({
  // ...other options...
  protocols: [
    {
      name: 'Electron Fiddle',
      schemes: ['electron-fiddle']
    }
  ]

}).then(paths => console.log(`SUCCESS: Created ${paths.join(', ')}`))
  .catch(err => console.error(`ERROR: ${err.message}`))
```

If you're using Electron Packager's CLI, use the `--protocol` and `--protocol-name` flags. For example:

```shell
npx electron-packager . --protocol=electron-fiddle --protocol-name="Electron Fiddle"
```

## おわりに

After you start your Electron app, you can enter in a URL in your browser that contains the custom protocol, for example `"electron-fiddle://open"` and observe that the application will respond and show an error dialog box.

<!--
    Because Electron examples usually require multiple files (HTML, CSS, JS
    for the main and renderer process, etc.), we use this custom code block
    for Fiddle (https://www.electronjs.org/fiddle).
    Please modify any of the files in the referenced folder to fit your
    example.
    The content in this codeblock will not be rendered in the website so you
    can leave it empty.
-->

```fiddle docs/fiddles/system/protocol-handler/launch-app-from-URL-in-another-app

```

<!-- ✍ Explanation of the code below -->
