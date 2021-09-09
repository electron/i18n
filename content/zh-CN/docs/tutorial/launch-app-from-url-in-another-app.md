---
title: Launching Your Electron App From a URL In Another App
description: 本指南将会指导您配置 Electron 应用为特定协议的默认处理器。
slug: 从其他应用中的URL启动应用
hide_title: true
---

# 从其他应用中的 URL 启动您的应用

## 概览

<!-- ✍ Update this section if you want to provide more details -->

This guide will take you through the process of setting your Electron app as the default handler for a specific [protocol](https://www.electronjs.org/docs/api/protocol).

通过此教程，您会掌握如何设置您的应用以拦截并处理任意特定协议的URL的点击事件。 在本指南中，我们假定这个协议名为“`electron-fiddle://`”。

## 示例

### 主进程（main.js）

First, we will import the required modules from `electron`. These modules help control our application lifecycle and create a native browser window.

```javascript
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
```

其次，我们将应用注册为“`electron-fiddle://`”协议的处理器。

```javascript
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

现在我们定义负责创建浏览器窗口的函数，并加载应用的 `index.html` 文件。

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

紧接着，我们将创建 `BrowserWindow` 并在应用中定义如何处理此外部协议被点击的事件。

This code will be different in Windows compared to MacOS and Linux. This is due to Windows requiring additional code in order to open the contents of the protocol link within the same Electron instance. 请点击 [此处](https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock) 了解更多

#### Windows 下代码：

```javascript
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 用户正在尝试运行第二个实例，我们需要让焦点指向我们的窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // 创建 mainWindow，加载其他资源，等等……
  app.whenReady().then(() => {
    createWindow()
  })

  // Handle the protocol. 在本例中，我们选择显示一个错误提示对话框。
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
  })
}
```

#### MacOS 与 Linux 下代码：

```javascript
// Electron 在完成初始化，并准备创建浏览器窗口时，
// 会调用这个方法。
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
})

// Handle the protocol. 在本例中，我们选择显示一个错误提示对话框。
app.on('open-url', (event, url) => {
  dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
})
```

Finally, we will add some additional code to handle when someone closes our application.

```javascript
// 在除 MacOS 的其他平台上，当所有窗口关闭后，退出当前应用。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

## Important notes

### 打包

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

## 结论

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
