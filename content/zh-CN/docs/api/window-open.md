# `window.open` 函数

> 打开一个新窗口并加载 URL。

当调用 ` window.open` 以在网页中创建新窗口时，将为`url `创建一个新的[BrowserWindow](browser-window.md) 实例，并返回一个代理至 `window.open` 以让页面对其进行有限的控制。

该代理具有有限的标准功能，与传统网页兼容。要完全控制新窗口，你应该直接创建一个` BrowserWindow `。

默认情况下, 新创建的 ` BrowserWindow ` 将继承父窗口的选项。若要重写继承的选项, 可以在 ` features ` 字符串中设置它们。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String（可选）
* `features` String（可选）

Returns [`BrowserWindowProxy`](browser-window-proxy.md) - 创建一个新窗口，并返回一个 `BrowserWindowProxy` 类的实例。

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

例如：

```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* 如果在父窗口中禁用了 Node integration, 则在打开的 `window ` 中将始终被禁用。
* 如果在父窗口中启用了上下文隔离, 则在打开的 ` window ` 中将始终被启用。
* 父窗口禁用 Javascript，打开的 `window` 中将被始终禁用
* ` features ` 中给定的非标准特性 (不由 Chromium 或 Electron 处理) 将被传递到 ` additionalFeatures ` 参数中的任何已注册 ` webContent ` 的 ` new-window` 事件处理程序。

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### 使用 Chrome 的 `window.open()`

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

This option can also be set on `<webview>` tags as well:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

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