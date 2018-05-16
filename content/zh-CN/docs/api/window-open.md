# `window.open` 函数

> 打开一个新窗口并加载 URL。

When `window.open` is called to create a new window in a web page, a new instance of `BrowserWindow` will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

该代理具有有限的标准功能，与传统网页兼容。要完全控制新窗口，你应该直接创建一个` BrowserWindow `。

默认情况下, 新创建的 ` BrowserWindow ` 将继承父窗口的选项。若要重写继承的选项, 可以在 ` features ` 字符串中设置它们。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String（可选）
* `features` String（可选）

Returns [`BrowserWindowProxy`](browser-window-proxy.md) - 创建一个新窗口，并返回一个 `BrowserWindowProxy` 类的实例。

`features` 字符串遵循标准浏览器的格式，但每个 feature 必须是`BrowserWindow` 选项中的字段。

**注意：**

* 如果在父窗口中禁用了 Node integration, 则在打开的 `window ` 中将始终被禁用。
* 如果在父窗口中启用了上下文隔离, 则在打开的 ` window ` 中将始终被启用。
* 父窗口禁用 Javascript，打开的 `window` 中将被始终禁用
* ` features ` 中给定的非标准特性 (不由 Chromium 或 Electron 处理) 将被传递到 ` additionalFeatures ` 参数中的任何已注册 ` webContent ` 的 ` new-window` 事件处理程序。

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

将消息发送给指定来源的父窗口，如果未指定来源则发送给`*`，即所有窗口。

### 使用 Chrome 的 `window.open()`

如果要使用 Chrome 的内置 `window.open()`，请在 `webPreferences` 选项中将 `nativeWindowOpen` 设置为 `true`。

原生 ` window.open () ` 允许同步打开窗口, 因此可以方便的选择是对话框还是首选项窗口。

该选项也可以设置在`<webview>`标签上：

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

` BrowserWindow `的创建可通过` WebContents ` 的 ` new-window `事件进行定制 。

```javascript
// main process
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // open window as modal
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      parent: mainWindow,
      width: 100,
      height: 100
    })
    event.newGuest = new BrowserWindow(options)
  }
})
```

```javascript
// renderer process (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```