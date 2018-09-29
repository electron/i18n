# screen

> 画面サイズ、ディスプレイ、カーソルの位置などについての情報を取得します。

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

`app` モジュールの `ready` イベントが発生するまでは、このモジュールを require、または使用できません。

`screen` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) です。

**注釈:** レンダラー / 開発者向けツールでは、`window.screen` は予約済みの DOM プロパティなので、`let {screen} = require('electron')` と書くことはできません。

以下は画面全体を埋めるウインドウを作成する例です。

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({width, height})
  win.loadURL('https://github.com')
})
```

以下は外部ディスプレイにウィンドウを作成するもう一つの例です。

```javascript
const electron = require('electron')
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
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

### `screen.screenToDipPoint(point)` *Windows*

* `point` [Point](structures/point.md)

戻り値 [`Point`](structures/point.md)

スクリーンの物理ポイントをスクリーンの DIP ポイントに変換します。DPI スケールは物理ポイントを含むディスプレイと相対的に計算されます。

### `screen.dipToScreenPoint(point)` *Windows*

* `point` [Point](structures/point.md)

戻り値 [`Point`](structures/point.md)

スクリーンの DIP ポイントをスクリーンの物理ポイントに変換します。DPI スケールは DIP ポイントを含むディスプレイと相対的に計算されます。

### `screen.screenToDipRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

戻り値 [`Rectangle`](structures/rectangle.md)

スクリーンの物理矩形をスクリーンのの DIP 矩形に変換します。 DPI スケールは `window` に近いディスプレイと相対的に計算されます。 `window` が null の場合、スケールは `rect` に近いディスプレイと相対的に計算されます。

### `screen.dipToScreenRect(window, rect)` *Windows*

* `window` [BrowserWindow](browser-window.md) | null
* `rect` [Rectangle](structures/rectangle.md)

戻り値 [`Rectangle`](structures/rectangle.md)

Converts a screen DIP rect to a screen physical rect. DPI スケールは `window` に近いディスプレイと相対的に計算されます。 `window` が null の場合、スケールは `rect` に近いディスプレイと相対的に計算されます。