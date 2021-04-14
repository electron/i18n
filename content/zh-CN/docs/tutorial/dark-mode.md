# 暗黑模式

## 概览

### 自动更新原生界面

"Native interfaces" include the file picker, window border, dialogs, context menus, and more - anything where the UI comes from your operating system and not from your app. The default behavior is to opt into this automatic theming from the OS.

### Automatically update your own interfaces

If your app has its own dark mode, you should toggle it on and off in sync with the system's dark mode setting. You can do this by using the [prefer-color-scheme][] CSS media query.

### Manually update your own interfaces

If you want to manually switch between light/dark modes, you can do this by setting the desired mode in the [themeSource](../api/native-theme.md#nativethemethemesource) property of the `nativeTheme` module. This property's value will be propagated to your Renderer process. Any CSS rules related to `prefers-color-scheme` will be updated accordingly.

## macOS 设置

在 macOS 10.14 Mojave中， Apple 为所有 macOS 电脑引入了一个全新的 [系统级黑暗模式][system-wide-dark-mode]。 如果您的 Electron 应用具有深色模式，您可以 使用"本机 api" [应用 `应用`](../api/native-theme.md)。

In macOS 10.15 Catalina, Apple introduced a new "automatic" dark mode option for all macOS computers. 为了让API `isDarkMode` 和 `Tray` 在这个模式中正常工作，你需要在 `Info.plist` 文件里把 `NSRequiresAquaSystemAppearance` 设置为 `false` ，或者使用 `>=7.0.0` 的Electron。 Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

If you wish to opt-out while using Electron &gt; 8.0.0, you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Please note that Electron 8.0.0 and above will not let you opt-out of this theming, due to the use of the macOS 10.14 SDK.

## 示例

We'll start with a working application from the [Quick Start Guide](quick-start.md) and add functionality gradually.

首先，让我们编辑我们的接口，以便用户可以在光线和暗色的 模式之间切换。  这个基本的界面包含更改 `原生主题源` 设置的按钮，并且包含一个文本元素，指明了哪些 `主题源` 值被选中。 By default, Electron follows the system's dark mode preference, so we will hardcode the theme source as "System".

将以下内容添加到 `index.html` 文件：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Hello World!</h1>
    <p>Current theme source: <strong id="theme-source">System</strong></p>

    <button id="toggle-dark-mode">Toggle Dark Mode</button>
    <button id="reset-to-system">Reset to System Theme</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>
```

Next, add [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) that listen for `click` events on the toggle buttons. Because the `nativeTheme` module only exposed in the Main process, you need to set up each listener's callback to use IPC to send messages to and handle responses from the Main process:

* when the "Toggle Dark Mode" button is clicked, we send the `dark-mode:toggle` message (event) to tell the Main process to trigger a themek change, and update the "Current Theme Source" label in the UI based on the response from the Main process.
* 单击"重置系统主题"按钮时，我们会发送 `暗模式：系统` 消息（事件），告诉主进程使用系统 配色方案，并更新"当前主题源"标签到 `系统`。

To add listeners and handlers, add the following lines to the `renderer.js` file:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
  document.getElementById('theme-source').innerHTML = isDarkMode ? "黑暗"："光"
}）

文档。获取"重置到系统"（"重置到系统"）。添加事件听者（"点击"，不对称（）=> {
  等待ipcRenderer.调用（"暗模式：系统"）
  文档
。
```

如果您此时运行代码，您将看到您的按钮尚未 任何内容，当 您单击按钮时，主过程将输出这样的错误： `Error occurred in handler for 'dark-mode:toggle': No handler registered for 'dark-mode:toggle'` 这是意料之中的- 我们实际上尚未触及任何 `nativeTheme` 代码。

现在，我们已经完成了从渲染器侧的 IPC 布线， 的下一步是更新 `main.js` 文件以处理来自渲染器过程的事件。

根据收到的事件，我们更新 [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) 属性， （如上下文菜单）在系统的原生UI元素上应用所需的主题，并将首选配色方案传播到渲染器 过程：

* 收到 `dark-mode:toggle`后，我们检查暗主题当前是否 使用 `nativeTheme.shouldUseDarkColors` 属性，并将 `themeSource` 设置为相反的主题。
* 收到 `dark-mode:system`后，我们将 `themeSource` 重置为 `system`。

```javascript
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate'，（）=> {
  如果（浏览器窗口。获取所有窗口）。长度==0）{
    创建窗口（）
  }
}）
```

最后一步是利用 CSS 属性 [`prefers-color-scheme`][prefer-color-scheme] ，为 UI 的 Web 部件添加一点造型，以启用暗模式。 `prefers-color-scheme` 的价值将遵循您的 `nativeTheme.themeSource` 设置。

创建一个 `styles.css` 文件，并添加以下行：

```css fiddle='docs/fiddles/features/macos-dark-mode'
@media（首选配色方案：深色）{
  身体{背景：#333;颜色：白色;}
}

@media（首选配色方案：浅色）{
  身体{背景：#ddd;颜色：黑色;}
}
```

启动 Electron 应用程序后，你可以通过点击相应按钮更改模式或将 主题重置为系统默认值。

![暗黑模式](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
