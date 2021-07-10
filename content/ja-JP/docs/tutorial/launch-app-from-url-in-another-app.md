---
title: launch-app-from-URL-in-another-app
description: このガイドでは、Electron アプリを特定のプロトコルのデフォルトハンドラとして設定する手順を説明します。
slug: launch-app-from-url-in-another-app
hide_title: true
---

# 他アプリ内の URL から自分の Electron アプリを起動する

## 概要

<!-- ✍ Update this section if you want to provide more details -->

このガイドでは、Electron アプリを特定の [protocol](https://www.electronjs.org/docs/api/protocol) のデフォルトハンドラとして設定する手順を説明します。

このチュートリアルを終える頃には、特定のプロトコルで始まる URL がクリックされた場合、アプリがそれに干渉してハンドリングするように設定できます。 このガイドでは、使用するプロトコルを "`electron-fiddle://`" とします。

## サンプル

### メインプロセス (main.js)

最初に `electron` から必要なモジュールをインポートします。 これらのモジュールは、アプリケーションの動作の制御と、ネイティブなブラウザウィンドウの作成を助けます。

```js
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
```

Next, we will proceed to register our application to handle all "`electron-fiddle://`" protocols.

```js
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

We will now define the function in charge of creating our browser window and load our application's `index.html` file.

```js
function createWindow () {
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

In this next step, we will create our  `BrowserWindow` and tell our application how to handle an event in which an external protocol is clicked.

This code will be different in WindowsOS compared to MacOS and Linux. This is due to Windows requiring additional code in order to open the contents of the protocol link within the same electron instance. Read more about this [here](https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock).

### Windows code:

```js
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow()
  })

  // handling the protocol. In this case, we choose to show an Error Box.
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
}
```

### MacOS and Linux code:

```js
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady().then(() => {
  createWindow()
})

// handling the protocol. In this case, we choose to show an Error Box.
app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})
```

Finally, we will add some additional code to handle when someone closes our application

```js
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

## Important Note:

### パッケージ化

This feature will only work on macOS when your app is packaged. It will not work when you're launching it in development from the command-line. When you package your app you'll need to make sure the macOS `plist` for the app is updated to include the new protocol handler. If you're using [`electron-packager`](https://github.com/electron/electron-packager) then you can add the flag `--extend-info` with a path to the `plist` you've created. The one for this app is below:

### Plist

```XML
  <p>
  <h5>macOS plist</h5>
  <pre><code>
    <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
            <plist version="1.0">
                <dict>
                    <key>CFBundleURLTypes</key>
                    <array>
                        <dict>
                            <key>CFBundleURLSchemes</key>
                            <array>
                                <string>electron-api-demos</string>
                            </array>
                            <key>CFBundleURLName</key>
                            <string>Electron API Demos Protocol</string>
                        </dict>
                    </array>
                    <key>ElectronTeamID</key>
                    <string>VEKTX9H2N7</string>
                </dict>
            </plist>
        </code>
    </pre>
  <p>
```

## おわりに

After you start your electron app, you can now enter in a URL in your browser that contains the custom protocol, for example `"electron-fiddle://open"` and observe that the application will respond and show an error dialog box.

<!--
    Because Electron examples usually require multiple files (HTML, CSS, JS
    for the main and renderer process, etc.), we use this custom code block
    for Fiddle (https://www.electronjs.org/fiddle).
    Please modify any of the files in the referenced folder to fit your
    example.
    The content in this codeblock will not be rendered in the website so you
    can leave it empty.
-->

```fiddle docs/fiddles/system/protocol-handler/launch-app-from-url-in-another-app

```

<!-- ✍ Explanation of the code below -->
