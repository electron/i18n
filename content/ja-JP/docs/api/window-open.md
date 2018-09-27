# `window.open`関数

> 新しいウインドウを開き、URL をロードします。

ウェブページで新しいウィンドウを作成するために `window.open` が呼び出されると、[`BrowserWindow`](browser-window.md) の新しいインスタンスが `url` に対して作成され、 ページの制御が制限されるように、プロキシが `window.open` に返されます。

プロキシは、従来のウェブページと互換性があるように実装された、限定された標準機能を有します。 新しいウィンドウを完全に制御するには、`BrowserWindow` を直接作成する必要があります。

新しく作成された `BrowserWindow` は、デフォルトで親ウィンドウのオプションを継承します。 継承されたオプションをオーバーライドするには、`features` 文字列で設定することができます。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (任意)
* `features` String (任意)

戻り値 [`BrowserWindowProxy`](browser-window-proxy.md) - 新しいウインドウを作成し、`BrowserWindowProxy` クラスのインスタンスを返します。

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

例:

```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* Node integration は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* コンテキストイソレーションは、親ウィンドウで有効になっている場合は、開いた `window` で常に有効になります。
* JavaScript は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* `features` で指定された非標準機能 (Chromium や Electron によって処理されない) は、`additionalFeatures` 引数内の登録された `webContents` の `new-window` イベントハンドラに渡されます。

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Chrome の `window.open()` 実装の使用

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