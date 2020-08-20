# `window.open` 関数

> 新しいウインドウを開き、URL をロードします。

ウェブページで新しいウィンドウを作成するために `window.open` が呼び出されると、[`BrowserWindow`](browser-window.md) の新しいインスタンスが `url` に対して作成され、 ページの制御が制限されるように、プロキシが `window.open` に返されます。

プロキシは、従来のウェブページと互換性があるように実装された、限定された標準機能を有します。 新しいウィンドウを完全に制御するには、`BrowserWindow` を直接作成する必要があります。

新しく作成された `BrowserWindow` は、デフォルトで親ウィンドウのオプションを継承します。 `features` 文字列の中に設定することで、継承されたオプションを上書きできます。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (任意)
* `features` String (任意)

戻り値 [`BrowserWindowProxy`](browser-window-proxy.md) - 新しいウインドウを作成し、`BrowserWindowProxy` クラスのインスタンスを返します。

`features` 文字列は、標準ブラウザの形式に従いますが、各機能は `BrowserWindow` のオプションのフィールドになっていければなりません。 `features` 文字列を通してセットできる機能は、 `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag` になります。

例:
```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**注釈:**

* Node integration は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* コンテキストイソレーションは、親ウィンドウで有効になっている場合は、開いた `window` で常に有効になります。
* JavaScript は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* `features` で指定された非標準機能 (Chromium や Electron によって処理されない) は、`additionalFeatures` 引数内の登録された `webContents` の `new-window` イベントハンドラに渡されます。

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

指定したオリジンか、オリジン未設定を意味する `*` で、親ウインドウにメッセージを送信します。

### Chrome の `window.open()` 実装の使用

Chrome の組み込み `window.open()` 実装を使用する場合は、`webPreferences` オプションオブジェクトで `nativeWindowOpen` を `true` に設定します。

ネイティブの `window.open()` は、開いたウィンドウに同期アクセスを許可するので、ダイアログや環境設定ウィンドウを開く必要がある場合に便利です。

このオプションは `<webview>` タグでも設定できます。

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

`BrowserWindow` の作成は `WebContents` の `new-window` イベントを介してカスタマイズできます。

```javascript
// メインプロセス
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // モーダルとしてウインドウを開きます
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
// レンダラープロセス (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```
