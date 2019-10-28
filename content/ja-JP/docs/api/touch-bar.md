## クラス: TouchBar

> ネイティブ macOS アプリ向けに、TouchBar レイアウトを作成します

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBar(options)` *（実験的）*

* `options` オブジェクト 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[] (optional)
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (任意)

指定したアイテムの新しい Touch Bar を作成します。 `BrowserWindow.setTouchBar` でウインドウに `TouchBar` を追加することができます。

**注釈:** TouchBar API は現在実験的な機能で、将来の Electron リリースでは変更されたり削除されたりする可能性があります。

**Tip:** Touch Bar 付きの MacBook をお持ちでない場合は、Touch Bar を使用するアプリの検証に [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) をご利用になれます。

### Static Properties

#### `TouchBarButton`

A [`typeof TouchBarButton`](./touch-bar-button.md) reference to the `TouchBarButton` class.

#### `TouchBarColorPicker`

A [`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) reference to the `TouchBarColorPicker` class.

#### `TouchBarGroup`

A [`typeof TouchBarGroup`](./touch-bar-group.md) reference to the `TouchBarGroup` class.

#### `TouchBarLabel`

A [`typeof TouchBarLabel`](./touch-bar-label.md) reference to the `TouchBarLabel` class.

#### `TouchBarPopover`

A [`typeof TouchBarPopover`](./touch-bar-popover.md) reference to the `TouchBarPopover` class.

#### `TouchBarScrubber`

A [`typeof TouchBarScrubber`](./touch-bar-scrubber.md) reference to the `TouchBarScrubber` class.

#### `TouchBarSegmentedControl`

A [`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) reference to the `TouchBarSegmentedControl` class.

#### `TouchBarSlider`

A [`typeof TouchBarSlider`](./touch-bar-slider.md) reference to the `TouchBarSlider` class.

#### `TouchBarSpacer`

A [`typeof TouchBarSpacer`](./touch-bar-spacer.md) reference to the `TouchBarSpacer` class.

### インスタンスプロパティ

The following properties are available on instances of `TouchBar`:

#### `touchBar.escapeItem`

A `TouchBarItem` that will replace the "esc" button on the touch bar when set. Setting to `null` restores the default "esc" button. Changing this value immediately updates the escape item in the touch bar.

## サンプル

Below is an example of a simple slot machine touch bar game with a button and some labels.

```javascript
const { app, BrowserWindow, TouchBar } = require('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let spinning = false

// 回るラベル
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// 回した結果のラベル
const result = new TouchBarLabel()

// 回すボタン
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // 回っている間はクリックを無視する
    if (spinning) {
      return
    }

    spinning = true
    result.label = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 秒
    const startTime = Date.now()

    const spinReels = () => {
      updateReels()

      if ((Date.now() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // 回る毎に少し遅くなる
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
    // 3 つの値すべてが同じ
    result.label = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 つの値が同じ
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // どの値も異なる
    result.label = '🙁 Spin Again'
    result.textColor = null
  }
  spinning = false
}

const touchBar = new TouchBar({
  items: [
    spin,
    new TouchBarSpacer({ size: 'large' }),
    reel1,
    new TouchBarSpacer({ size: 'small' }),
    reel2,
    new TouchBarSpacer({ size: 'small' }),
    reel3,
    new TouchBarSpacer({ size: 'large' }),
    result
  ]
})

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

### Running the above example

To run the example above, you'll need to (assuming you've got a terminal open in the directory you want to run the example):

1. 上記のコードを `touchbar.js` として保存する
2. `npm install electron` と入力し、 Electron をインストールします
3. `./node_modules/.bin/electron touchbar.js` と入力し、Electron でサンプルを実行する

You should then see a new Electron window and the app running in your touch bar (or touch bar emulator).