# `window.open` 函式

> 開啟新視窗並載入 URL。

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (選用)
* `features` String (選用)

Returns [`BrowserWindowProxy`](browser-window-proxy.md) - Creates a new window and returns an instance of `BrowserWindowProxy` class.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options.

**備註:**

* Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
* Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
* JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
* Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContent`'s `new-window` event handler in the `additionalFeatures` argument.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### 使用 Chrome 的 `window.open()` 實作

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

This option can also be set on `<webview>` tags as well:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

```javascript
// 主處理序
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // 將視窗以強制回應方式開啟
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
// 畫面轉譯處理序 (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>你好</h1>')
```