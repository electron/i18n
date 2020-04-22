## クラス: BrowserView

> ビューを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

`BrowserView` は、[`BrowserWindow`](browser-window.md) に追加のウェブコンテンツを埋め込むのに使用することができます。 外側のウインドウを基準にして配置される点を除いて、子ウインドウのようなものです。 `webview` タグの代替となるものです。

### サンプル

```javascript
// メインプロセス
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

let view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _実験的_

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

#### `view.webContents` _実験的_

このビューによって保持されている [`WebContents`](web-contents.md) オブジェクト。

#### `view.id` _実験的_

ビューの一意のIDを表す `Integer`。

### インスタンスメソッド

`new BrowserView` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

#### `view.destroy()`

強制的にビューを閉じます。`unload` と `beforeunload` イベントは、Webページで発生しません。 ビューでやることが終わった後、メモリや他のリソースを解放するため、できるだけ早くこのファンクションを呼び出してください。

#### `view.isDestroyed()`

戻り値 `Boolean` - ビューが破棄されているかどうか。

#### `view.setAutoResize(options)` _実験的_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. 省略値は `false` です。
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. 省略値は `false` です。
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. 省略値は `false` です。
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. 省略値は `false` です。

#### `view.setBounds(bounds)` _実験的_

* `bounds` [Rectangle](structures/rectangle.md)

ウインドウを基準に指定された境界までビューをリサイズしたり、移動させたりします。

#### `view.getBounds()` _実験的_

戻り値 [`Rectangle`](structures/rectangle.md)

`Object` としてのこの BrowserView インスタンスの `bounds`。

#### `view.setBackgroundColor(color)` _実験的_

* `color` String - `#aarrggbb` や `#argb` といった形式の色。 アルファチャンネルは任意です。
