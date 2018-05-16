## クラス: TouchBar

> ネイティブ macOS アプリ向けに、TouchBar レイアウトを作成します

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *（実験的）*

* `options` Object 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (任意)

指定したアイテムで新たなタッチバーを作成します。`BrowserWindow.setTouchBar` でウインドウに `TouchBar` を追加することができます。

**注:** 現在のところ、TouchBar APIは実験的な機能であり、将来のElectronのリリースで変更されたり、削除されたりする可能性があります。

**Tip:** Touch Bar 付きの MacBook をお持ちでない場合は、Touch Bar を使用するアプリの検証に [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) をご利用になれます。

### インスタンスプロパティ

`TouchBar` のインスタンスには以下のプロパティがあります。

#### `touchBar.escapeItem`

設定すると、タッチバーの "esc" ボタンを置き換える `TouchBarItem`。 `null` に設定するとデフォルトの "esc" ボタンが復元されます。 この値を変更すると、タッチバーのエスケープアイテムがすぐに更新されます。

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

上記のサンプルを実行するには、(予めターミナルで適当なディレクトリを開いた上で) 以下の操作を行ってください。

1. 上記のコードを `touchbar.js` として保存する
2. `npm install electron` と入力し、 Electron をインストールします
3. `./node_modules/.bin/electron touchbar.js` と入力し、Electron でサンプルを実行する

すると、 Electron のウィンドウと、 Touch Bar 上（あるいは Touch Bar エミュレータ上）で動作するサンプルアプリをご覧になる事ができるはずです。