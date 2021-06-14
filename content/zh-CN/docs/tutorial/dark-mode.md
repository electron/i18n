# 暗黑模式

## 概览

### 自动更新原生界面

"本地界面"包括文件选择器、窗口边框、对话框、上下文 菜单等 - 任何UI来自操作系统而非应用的界面。 默认行为是从操作系统选择自动主题。

### 自动更新您自己的界面

如果您的应用有自己的黑暗模式，您应该在与系统黑暗模式设置同步时切换。 您可以通过使用[prefer-color-scheme] CSS 媒体查询来做到这一点。

### 手动更新您自己的界面

If you want to manually switch between light/dark modes, you can do this by setting the desired mode in the [themeSource](../api/native-theme.md#nativethemethemesource) property of the `nativeTheme` module. This property's value will be propagated to your Renderer process. Any CSS rules related to `prefers-color-scheme` will be updated accordingly.

## macOS 设置

在 macOS 10.14 Mojave中， Apple 为所有 macOS 电脑引入了一个全新的 [系统级黑暗模式][system-wide-dark-mode]。 如果您的 Electron 应用具有深色模式，您可以 使用"本机 api" [应用 `应用`](../api/native-theme.md)。

In macOS 10.15 Catalina, Apple introduced a new "automatic" dark mode option for all macOS computers. 为了让API `isDarkMode` 和 `Tray` 在这个模式中正常工作，你需要在 `Info.plist` 文件里把 `NSRequiresAquaSystemAppearance` 设置为 `false` ，或者使用 `>=7.0.0` 的Electron。 Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

If you wish to opt-out while using Electron &gt; 8.0.0, you must set the `NSRequiresAquaSystemAppearance` key in the `Info.plist` file to `true`. Please note that Electron 8.0.0 and above will not let you opt-out of this theming, due to the use of the macOS 10.14 SDK.

## 示例

此示例演示了Electron 应用程序从`nativeTheme`中获取主题颜色。 此外，它还使用 IPC 通道提供主题切换和重置控制。

```javascript fiddle='docs/fiddles/features/macos-dark-mode'

```

### 它是如何工作的呢？

从 `index.html` 文件开始：

```html title='index.html'
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

以及 `style.css` 文件：

```css title='style.css'
@media (prefers-color-scheme: dark) {
  body { background: #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body { background: #ddd; color: black; }
}
```

该示例渲染一个包含几个元素的 HTML 页面。 `<strong id="theme-source">` 元素显示当前选中的主题，两个 `<button>` 元素是 控件。 CSS 文件使用 [`prefers-color-scheme`][prefers-color-scheme] 媒体查询 设置 `<body>` 元素背景和文本颜色。

`preload.js` 脚本在 `window`对象中添加了一个新的 API叫做 `深色模式`。 此 API 暴露两个IPC 通道到渲染器进程，分别为 `'dark-mode:toggle'` 和 `'dark-mode:system'`。 它还分配了两个方法， `toggle` 和 `system`，它们将渲染器中的信息传递到 主进程。

```js title='preload.js'
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
```

现在，渲染器进程可以安全地与主进程通信，并对`nativeTheme` 对象执行必要的变更。

`renderer.js` 文件负责控制 `<button>` 功能。

```js title='renderer.js'
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})
```

使用 `addEventListener`， `renderer.js` 文件将`'click'` [事件监听器][event-listeners]添加到每个按钮元素上。 每个事件监听处理器都会调用到相关的 `window.darkmode` API 方法。

最后， `main.js` 文件代表了主进程并包含实际的 `nativeTheme` API。

```js
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
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

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

`ipcMain.handle` 方法表明主进程如何响应来自 HTML 页面上 按钮的点击事件。

`'dark-mode:toggle'` IPC 通道处理器方法检查 `shouldUseDarkColors` boolean属性 设置对应的 `themeSource`, 然后返回当前的 `shouldUseDarkColors` 属性。 回顾此 IPC 通道的渲染器进程事件监听器，此处理器的返回值为 `<strong id='theme-source'>` 元素指定正确的文本。

`'dark-mode:system'` IPC 通道处理器方法将字符串 `'system'` 赋值到 `themeSource` 同时无返回值。 这也对应于相应的渲染器进程事件监听器，因为方法正在等待，且不需要返回值。

使用Electron Fiddle运行示例，然后点击“切换深色模式”按钮； 应用程序应该开始在亮色和黑色背景颜色之间交替。

![暗黑模式](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[prefers-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[event-listeners]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
