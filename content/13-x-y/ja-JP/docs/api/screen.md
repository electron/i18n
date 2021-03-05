# screen

> 画面サイズ、ディスプレイ、カーソルの位置などについての情報を取得します。

プロセス: [Main](../glossary.md#main-process)

`app` モジュールの `ready` イベントが発生するまでは、このモジュールは使用できません。

`screen` は [EventEmitter][event-emitter] です。

**注意:** レンダラー / デベロッパー ツールでは、`window.screen` は予約された DOM プロパティなので、`let { screen } = require('electron')` と書くことはできません。

以下は画面全体を埋めるウインドウを作成する例です。

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require('electron')

let win
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

以下は外部ディスプレイにウィンドウを作成するもう一つの例です。

```javascript
const { app, BrowserWindow, screen } = require('electron')

let win

app.whenReady().then(() => {
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    win = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50
    })
    win.loadURL('https://github.com')
  }
})
```

## イベント

`screen` モジュールには以下のイベントがあります。

### イベント: 'display-added'

戻り値:

* `event` Event
* `newDisplay` [Display](structures/display.md)

`newDisplay` が追加されたときに発生します。

### イベント: 'display-removed'

戻り値:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

`oldDisplay` が削除されたときに発生します。

### イベント: 'display-metrics-changed'

戻り値:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

`display` 内の一つ以上の寸法が変化したときに発生します。 `changedMetrics` は、変化を示す文字列の配列です。 `bounds`、`workArea`、`scaleFactor`、`rotation` に変化できます。

## メソッド

`screen` モジュールには以下のメソッドがあります。

### `screen.getCursorScreenPoint()`

戻り値 [`Point`](structures/point.md)

マウスポインタの現在の絶対位置。

**注:** 戻り値は DIP ポイント単位です。画面の物理ポイント単位ではありません。

### `screen.getPrimaryDisplay()`

戻り値 [`Display`](structures/display.md) - 主要なディスプレイ。

### `screen.getAllDisplays()`

戻り値 [`Display[]`](structures/display.md) - 現在利用可能な display の配列。

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

戻り値 [`Display`](structures/display.md) - 指定した point に最も近い display。

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

戻り値 [`Display`](structures/display.md) - 指定した矩形に最も近い display。

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

戻り値 [`Point`](structures/point.md)

スクリーン上の物理的な点をスクリーン上の DIP な点に変換します。 DPI スケールは、物理的な点のあるディスプレイに対して相対的なものになります。

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

戻り値 [`Point`](structures/point.md)

スクリーン上の DIP な点をスクリーン上の物理的な点に変換します。 DPI スケールは、DIP な点のあるディスプレイに対して相対的なものになります。

### `screen.screenToDipRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

戻り値 [`Rectangle`](structures/rectangle.md)

スクリーンの物理矩形をスクリーンのの DIP 矩形に変換します。 DPI スケールは `window` に近いディスプレイと相対的に計算されます。 `window` が null の場合、スケールは `rect` に近いディスプレイと相対的に計算されます。

### `screen.dipToScreenRect(window, rect)` _Windows_

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

戻り値 [`Rectangle`](structures/rectangle.md)

スクリーンの DIP 矩形をスクリーンのの物理矩形に変換します。 DPI スケールは `window` に近いディスプレイと相対的に計算されます。 `window` が null の場合、スケールは `rect` に近いディスプレイと相対的に計算されます。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
