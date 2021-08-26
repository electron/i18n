---
title: 从其他应用中的URL启动应用
description: 本指南将会指导您配置 Electron 应用为特定协议的默认处理器。
slug: 从其他应用中的URL启动应用
hide_title: true
---

# 从其他应用中的 URL 启动您的应用

## 概览

<!-- ✍ Update this section if you want to provide more details -->

本指南将会指导您配置 Electron 应用为[特定协议](https://www.electronjs.org/docs/api/protocol)的默认处理器。

通过此教程，您会掌握如何设置您的应用以拦截并处理任意特定协议的URL的点击事件。 在本指南中，我们假定这个协议名为“`electron-fiddle://`”。

## 示例

### 主进程（main.js）

首先，我们需要从`electron`导入所需的模块。 这些模块有助于控制应用的生命周期，或创建原生的浏览器窗口。

```js
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
```

其次，我们将应用注册为“`electron-fiddle://`”协议的处理器。

```js
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}
```

现在我们定义负责创建浏览器窗口的函数，并加载应用的 `index.html` 文件。

```js
function createWindow () {
  // 创建浏览器窗口
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

与 MacOS 或 Linux 不同，在 Windows 下需要其他的代码。 这是因为在 Windows 中需要特别处理在同一个 Electron 实例中打开的协议的内容。 请点击 [此处](https://www.electronjs.org/docs/api/app#apprequestsingleinstancelock) 了解更多

### Windows 下代码：

```js
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

  // 处理协议。 在本例中，我们选择显示一个错误提示对话框。
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
  })
}
```

### MacOS 与 Linux 下代码：

```js
// Electron 在完成初始化，并准备创建浏览器窗口时，
// 会调用这个方法。
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
})

// 处理协议。 在本例中，我们选择显示一个错误提示对话框。
app.on('open-url', (event, url) => {
  dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
})
```

最后，我们还需要处理应用的关闭事件。

```js
// 在除 MacOS 的其他平台上，当所有窗口关闭后，退出当前应用。 在 MacOS 上，
// 应用及其菜单栏通常会保持活跃状态，
// 直到用户明确按下 Cmd + Q 退出应用。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

## 重要说明：

### 打包

在 MacOS 上的这个功能仅在应用打包后有效。 在命令行启动的开发版中无效。 打包 MacOS 应用时，您需要确保 `plist` 文件中包含了处理该协议的声明。 若您使用 [`electron-packager`](https://github.com/electron/electron-packager) 打包应用，您可以添加 `--extend-info` 标记，并附上 `plist` 文件的路径。 在本文的例子中如下所示：

### Plist

```XML
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
```

## 结论

启动 Electron 应用后，在浏览器内键入包含该自定义协议的 URL，如`“electron-fiddle://open”`，观察应用是否正确响应并显示一个错误提示对话框。

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
