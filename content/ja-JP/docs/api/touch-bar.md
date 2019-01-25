## クラス: TouchBar

> ネイティブ macOS アプリ向けに、TouchBar レイアウトを作成します

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBar(options)` *（実験的）*

* `options` オブジェクト 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (任意)

指定したアイテムの新しい Touch Bar を作成します。 `BrowserWindow.setTouchBar` でウインドウに `TouchBar` を追加することができます。

**注釈:** TouchBar API は現在実験的な機能で、将来の Electron リリースでは変更されたり削除されたりする可能性があります。

**Tip:** Touch Bar 付きの MacBook をお持ちでない場合は、Touch Bar を使用するアプリの検証に [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) をご利用になれます。

### インスタンスプロパティ

`TouchBar` のインスタンスには以下のプロパティがあります。

#### `touchBar.escapeItem`

設定すると、タッチバーの "esc" ボタンを置き換える `TouchBarItem`。 `null` に設定するとデフォルトの "esc" ボタンが復元されます。 この値を変更すると、タッチバーのエスケープアイテムがすぐに更新されます。

## サンプル

ボタンといくつかのラベルで構成される、シンプルな TouchBar 向けスロットゲームのコード例を示します。

```javascript
const { app, BrowserWindow, TouchBar } = require('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // Ignore clicks if already spinning
    if (spinning) {
      return
    }

    spinning = true
    result.label = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 seconds
    const startTime = Date.now()

    const spinReels = () => {
      updateReels()

      if ((Date.now() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Slow down a bit on each spin
        timeout *= 1.1
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  return values[Math.floor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1.label = getRandomValue()
  reel2.label = getRandomValue()
  reel3.label = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size
  if (uniqueValues === 1) {
    // All 3 values are the same
    result.label = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // No values are the same
    result.label = '🙁 Spin Again'
    result.textColor = null
  }
  spinning = false
}

const touchBar = new TouchBar([
  spin,
  new TouchBarSpacer({ size: 'large' }),
  reel1,
  new TouchBarSpacer({ size: 'small' }),
  reel2,
  new TouchBarSpacer({ size: 'small' }),
  reel3,
  new TouchBarSpacer({ size: 'large' }),
  result
])

let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

### 上記のサンプルを実行する

上記のサンプルを実行するには、(予めターミナルで適当なディレクトリを開いた上で) 以下の操作を行ってください。

1. 上記のコードを `touchbar.js` として保存する
2. `npm install electron` と入力し、 Electron をインストールします
3. `./node_modules/.bin/electron touchbar.js` と入力し、Electron でサンプルを実行する

すると、 Electron のウィンドウと、 Touch Bar 上（あるいは Touch Bar エミュレータ上）で動作するサンプルアプリをご覧になる事ができるはずです。