# BrowserView

`BrowserView` は、[`BrowserWindow`](browser-window.md) に追加のウェブコンテンツを埋め込むのに使用することができます。 外側のウインドウを基準にして配置される点を除いて、子ウインドウのようなものです。 `webview` タグの代替となるものです。

## クラス: BrowserView

> ビューを作成したり、制御したりします。

プロセス: [Main](../glossary.md#main-process)

### サンプル

```javascript
// メインプロセス
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _実験的_

* `options` Object (任意)
  * `webPreferences` Object (任意) - [BrowserWindow](browser-window.md) を参照してください。

### インスタンスプロパティ

`new BrowserView` で作成されたオブジェクトは、以下のプロパティを持っています。

#### `view.webContents` _実験的_

このビューによって保持されている [`WebContents`](web-contents.md) オブジェクト。

### インスタンスメソッド

`new BrowserView` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

#### `view.setAutoResize(options)` _実験的_

* `options` Object
  * `width` Boolean (任意) - `true` の場合、ビューの横幅はウインドウと一緒に伸び縮みします。 省略値は `false` です。
  * `height` Boolean (任意) - `true` の場合、ビューの高さはウインドウと一緒に伸び縮みします。 省略値は `false` です。
  * `horizontal` Boolean (任意) - `true` の場合、ビューの x 位置と幅はウィンドウに比例して増減します。 省略値は `false` です。
  * `vertical` Boolean (任意) - `true` の場合、ビューの y 位置と高さはウィンドウに比例して増減します。 省略値は `false` です。

#### `view.setBounds(bounds)` _実験的_

* `bounds` [Rectangle](structures/rectangle.md)

ウインドウを基準に指定された境界までビューをリサイズしたり、移動させたりします。

#### `view.getBounds()` _実験的_

戻り値 [`Rectangle`](structures/rectangle.md)

`Object` としてのこの BrowserView インスタンスの `bounds`。

#### `view.setBackgroundColor(color)` _実験的_

* `color` String - `#aarrggbb` や `#argb` といった形式の色。 アルファチャンネルは任意です。
