# `window.open`関数

> 新しいウインドウを開き、URL をロードします。

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

プロキシは、従来のウェブページと互換性があるように実装された、限定された標準機能を有します。 新しいウィンドウを完全に制御するには、`BrowserWindow` を直接作成する必要があります。

新しく作成された `BrowserWindow` は、デフォルトで親ウィンドウのオプションを継承します。 継承されたオプションをオーバーライドするには、`features` 文字列で設定することができます。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (任意)
* `features` String (任意)

戻り値 [`BrowserWindowProxy`](browser-window-proxy.md) - 新しいウインドウを作成し、`BrowserWindowProxy` クラスのインスタンスを返します。

`features` 文字列は、標準ブラウザの形式に従いますが、各機能は `BrowserWindow` のオプションのフィールドになっていければなりません。

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