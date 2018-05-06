## クラス: BrowserView

> ビューを作成したり、制御したりします。

**注:** 現在のところ、BrowserView APIは実験的な機能であり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。

プロセス: [Main](../glossary.md#main-process)

`BrowserView` は、[`BrowserWindow`](browser-window.md) に追加のウェブコンテンツを埋め込むのに使用することができます。 外側のウインドウを基準にして配置される点を除いて、子ウインドウのようなものです。 `webview` タグの代替となるものです。

## 例

```javascript
// メインプロセス
const {BrowserView, BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

let view = new BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
})
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` *実験的*

* `options` Object (任意) 
  * `webPreferences` Object (任意) - [BrowserWindow](browser-window.md) を参照してください。

### 静的メソッド

#### `BrowserView.getAllViews()`

戻り値 `BrowserView[]` - 開かれたすべてのBrowserViewの配列。

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

戻り値 `BrowserView | null` - 指定された `webContents` を保持しているBrowserViewまたはコンテンツがBrowserViewによって保持されていない場合、`null`。

#### `BrowserView.fromId(id)`

* `id` Integer

戻り値 `BrowserView` - 指定された `id` のビュー。

### インスタンスプロパティ

`new BrowserView` で作成されたオブジェクトは、以下のプロパティを持っています。

#### `view.webContents` *実験的*

このビューによって保持されている [`WebContents`](web-contents.md) オブジェクト。

#### `view.id` *実験的*

ビューの一意のIDを表す `Integer`。

### インスタンスメソッド

`new BrowserView` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

#### `view.destroy()`

強制的にビューを閉じます。`unload` と `beforeunload` イベントは、Webページで発生しません。 ビューでやることが終わった後、メモリや他のリソースを解放するため、できるだけ早くこのファンクションを呼び出してください。

#### `view.isDestroyed()`

戻り値 `Boolean` - ビューが破棄されているかどうか。

#### `view.setAutoResize(options)` *実験的*

* `options` Object 
  * `width` Boolean - `true` の場合、ビューの横幅はウインドウと一緒に伸び縮みします。省略値は、`false` です。
  * `height` Boolean - `true` の場合、ビューの高さはウインドウと一緒に伸び縮みします。省略値は、`false` です。

#### `view.setBounds(bounds)` *実験的*

* `bounds` [Rectangle](structures/rectangle.md) 

ウインドウを基準に指定された境界までビューをリサイズしたり、移動させたりします。

#### `view.setBackgroundColor(color)` *実験的*

* `color` String - `#aarrggbb` や `#argb` といった形式の色。アルファチャンネルは任意です。