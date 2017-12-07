## クラス: TouchBar

> ネイティブ macOS アプリ向けに、TouchBar レイアウトを作成します

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *（実験的）*

* `options` オブジェクト 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (optional)

Creates a new touch bar with the specified items. Use `BrowserWindow.setTouchBar` to add the `TouchBar` to a window.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

**Tip:** If you don't have a MacBook with Touch Bar, you can use [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) to test Touch Bar usage in your app.

### Instance Properties

The following properties are available on instances of `TouchBar`:

#### `touchBar.escapeItem`

The `TouchBarButton` that will replace the "esc" button on the touch bar when set. Setting to `null` restores the default "esc" button. Changing this value immediately updates the escape item in the touch bar.

## サンプル

ボタンといくつかのラベルで構成される、シンプルな TouchBar 向けスロットゲームのコード例を示します。

```javascript
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '
```

### 上記のサンプルを実行する

上記のサンプルを実行するには、（予めターミナルで適当なディレクトリを開いた上で）以下の操作を行ってください。

1. 上記のコードを `touchbar.js` として保存する
2. `npm install electron` と入力し、 Electron をインストールします
3. `./node_modules/.bin/electron touchbar.js` と入力し、Electron でサンプルを実行する

You should then see a new Electron window and the app running in your touch bar (or touch bar emulator).