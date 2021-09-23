# レンダラーからウインドウを開く

レンダラー内での信頼されたもしくは信頼されていないコンテンツからのウインドウ作成を制御する方法がいくつかあります。 ウインドウはレンダラーから以下の 2 つの方法で作成できます。

* `target=_blank` が付加された、リンクのクリックやフォームの送信
* JavaScript での `window.open()` 呼び出し

同一オリジンコンテンツの場合、新しいウインドウは同じプロセス内で作成され、親が子ウィンドウに直接アクセスできるようになります。 これは、アプリのサブウインドウが環境設定パネルなどとして機能する場合に非常に便利です。親はサブウインドウに対して、あたかも親が持つ `div` のように直接レンダリングできます。 これはブラウザと同じ動作です。

`nativeWindowOpen` を false に設定すると、`window.open` は代わりに `BrowserWindow` の軽いラッパーである [`BrowserWindowProxy`](browser-window-proxy.md) を作成します。

Electron は、このネイティブの Chrome `Window` と BrowserWindow をペアリングします。 レンダラーで作成されたウインドウに対して `webContents.setWindowOpenHandler()` を使用することで、メインプロセスでの BrowserWindow 作成と同じすべてのカスタマイズを活用できます。

BrowserWindow コンストラクタのオプションは、`window.open()` の `features` 文字列からパースされたオプション、親ウインドウから継承されたセキュリティ関連の webPreferences、[`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler) で与えられたオプションの順に設定されます。 注意として、`webContents.setWindowOpenHandler` はメインプロセスで呼び出されるため、最終的な決定権と完全なアクセス権限があります。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (任意)
* `features` String (任意)

戻り値 [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` は、ブラウザの標準フォーマットに従ったカンマ区切りのキーバリューリストです。 Electron は便宜上、このリストから `BrowserWindowConstructorOptions` をできるだけ解析します。 完全な制御とより良い人間工学を実現するため、`webContents.setWindowOpenHandler` で BrowserWindow の作成をカスタマイズするようにご検討ください。

`WebPreferences` のうちのいくつかは、次の features 文字列から直接フラットに設定できます。`zoomFactor`、`nodeIntegration`、`preload`、`javascript`、`contextIsolation`、`webviewTag` が設定できます。

以下がその例です。

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**注釈:**

* Node integration は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* コンテキストイソレーションは、親ウィンドウで有効になっている場合は、開いた `window` で常に有効になります。
* JavaScript は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* `features` で指定された非標準機能 (Chromium や Electron によって処理されない) は、`options` 引数内の登録された `webContents` の `did-create-window` イベントハンドラに渡されます。
* `frameName` は、[ネイティブのドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) にある `windowName` の仕様に従います。

ウインドウの作成をカスタマイズまたはキャンセルするにあたって、メインプロセスから `webContents.setWindowOpenHandler()` でオーバーライドハンドラーを任意設定できます。 `{ action: 'deny' }` を返すと、ウィンドウはキャンセルされます。 `{ action: 'allow', overrideBrowserWindowOptions: { ... } }` を返すと、ウインドウを開くことと、ウィンドウ作成時に使用する `BrowserWindowConstructorOptions` の設定を許可します。 これは、feature 文字列でオプションを渡すよりも強力であることに注意してください。レンダラーは、セキュリティ設定を決定する権限がメインプロセスよりも制限されているからです。

### ネイティブの `Window` のサンプル

```javascript
// main.js
const mainWindow = new BrowserWindow()

// この例では、URL が `about:blank` であるウインドウのみが作成されます。
// ほかのすべての URL はブロックされます。
mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url === 'about:blank') {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: false,
        fullscreenable: false,
        backgroundColor: 'black',
        webPreferences: {
          preload: 'my-child-window-preload-script.js'
        }
      }
    }
  }
  return { action: 'deny' }
})
```

```javascript
// レンダラープロセス (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```

### `BrowserWindowProxy` のサンプル

```javascript

// main.js
const mainWindow = new BrowserWindow({
  webPreferences: { nativeWindowOpen: false }
})

mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url.startsWith('https://github.com/')) {
    return { action: 'allow' }
  }
  return { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // 例えば...
  childWindow.webContents.on('will-navigate', (e) => {
    e.preventDefault()
  })
})
```

```javascript
// renderer.js
const windowProxy = window.open('https://github.com/', null, 'minimizable=false')
windowProxy.postMessage('hi', '*')
```
