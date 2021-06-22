# レンダラーからウインドウを開く

レンダラー内での信頼されたもしくは信頼されていないコンテンツからのウインドウ作成を制御する方法がいくつかあります。 ウインドウはレンダラーから以下の 2 つの方法で作成できます。

* `target=_blank` が付加された、リンクのクリックやフォームの送信
* JavaScript での `window.open()` 呼び出し

サンドボックス化されていないレンダラーや `nativeWindowOpen` が false (既定値) の場合、[`BrowserWindowProxy`](browser-window-proxy.md) という `BrowserWindow` の軽いラッパーが作成されます。

しかし、`sandbox` (または `nativeWindowOpen` に直接) オプションが設定されている場合、ブラウザーで期待されるような `Window` インスタンスが作成されます。 同一オリジンコンテンツの場合、新しいウィンドウは同じプロセス内で作成され、親が子ウィンドウに直接アクセスできるようになります。 これは親ウインドウ内の `div` であるかのようにできるため、設定パネルとして機能するアプリのサブウインドウなどで非常に便利です。

Electron は、このネイティブの Chrome `Window` と BrowserWindow をペアリングします。 レンダラーで作成されたウインドウに対して `webContents.setWindowOpenHandler()` を使用することで、メインプロセスでの BrowserWindow 作成と同じすべてのカスタマイズを活用できます。

BrowserWindow コンストラクタのオプションは、親から継承したオプション、`window.open()` の `features` 文字列から解析したオプション、親から継承したセキュリティ関連の webPreferences、[`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler) の順で指定したものが設定されます。 注意として、`webContents.setWindowOpenHandler` はメインプロセスで呼び出されるため、最終的な決定権と完全なアクセス権限があります。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (任意)
* `features` String (任意)

戻り値 [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` は、ブラウザの標準フォーマットに従ったカンマ区切りのキーバリューリストです。 Electron は便宜上、このリストから `BrowserWindowConstructorOptions` をできるだけ解析します。 完全な制御とより良い人間工学を実現するため、`webContents.setWindowOpenHandler` で BrowserWindow の作成をカスタマイズするようにご検討ください。

`WebPreferences` のうちのいくつかは、次の features 文字列から直接フラットに設定できます。`zoomFactor`、`nodeIntegration`、`preload`、`javascript`、`contextIsolation`、`webviewTag` が設定できます。

例:

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**注釈:**

* Node integration は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* コンテキストイソレーションは、親ウィンドウで有効になっている場合は、開いた `window` で常に有効になります。
* JavaScript は、親ウィンドウで無効になっている場合は、開いた `window` でも常に無効になります。
* `features` で指定された非標準機能 (Chromium や Electron によって処理されない) は、`additionalFeatures` 引数内の登録された `webContents` の `did-create-window` イベントハンドラに渡されます。

ウインドウの作成をカスタマイズまたはキャンセルするにあたって、メインプロセスから `webContents.setWindowOpenHandler()` でオーバーライドハンドラーを任意設定できます。 `false` を返すとそのウインドウをキャンセルし、オブジェクトを返すとそのウインドウ作成時に使用する `BrowserWindowConstructorOptions` に返したオブジェクトを設定します。 これは、オプションを features 文字列に渡すよりも強力であることに注意しましょう。 レンダラーがセキュリティ設定を決定する場合は、メインプロセスよりも権限が制限されています。

### `BrowserWindowProxy` のサンプル

```javascript

// main.js
const mainWindow = new BrowserWindow()

mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url.startsWith('https://github.com/')) {
    return { action: 'allow' }
  }
  return { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // 例えば...
  childWindow.webContents('will-navigate', (e) => {
    e.preventDefault()
  })
})
```

```javascript
// renderer.js
const windowProxy = window.open('https://github.com/', null, 'minimizable=false')
windowProxy.postMessage('hi', '*')
```

### ネイティブの `Window` のサンプル

```javascript
// main.js
const mainWindow = new BrowserWindow({
  webPreferences: {
    nativeWindowOpen: true
  }
})

// In this example, only windows with the `about:blank` url will be created.
// All other urls will be blocked.
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
// renderer process (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```
