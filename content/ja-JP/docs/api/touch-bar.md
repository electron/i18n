# TouchBar

## クラス: TouchBar

> ネイティブ macOS アプリ向けに、TouchBar レイアウトを作成します

プロセス: [Main](../glossary.md#main-process)

### `new TouchBar(options)`

* `options` Object
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[] (任意)
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (任意)

指定したアイテムの新しい Touch Bar を作成します。 `BrowserWindow.setTouchBar` でウインドウに `TouchBar` を追加することができます。

**注釈:** TouchBar API は現在実験的な機能で、将来の Electron リリースでは変更されたり削除されたりする可能性があります。

**Tip:** Touch Bar 付きの MacBook をお持ちでない場合は、Touch Bar を使用するアプリの検証に [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) をご利用になれます。

### 静的プロパティ

#### `TouchBarButton`

[`typeof TouchBarButton`](./touch-bar-button.md) であり、`TouchBarButton` クラスの参照です。

#### `TouchBarColorPicker`

[`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) であり、`TouchBarColorPicker` クラスの参照です。

#### `TouchBarGroup`

[`typeof TouchBarGroup`](./touch-bar-group.md) であり、`TouchBarGroup` クラスの参照です。

#### `TouchBarLabel`

[`typeof TouchBarLabel`](./touch-bar-label.md) であり、`TouchBarLabel` クラスの参照です。

#### `TouchBarPopover`

[`typeof TouchBarPopover`](./touch-bar-popover.md) であり、`TouchBarPopover` クラスの参照です。

#### `TouchBarScrubber`

[`typeof TouchBarScrubber`](./touch-bar-scrubber.md) であり、`TouchBarScrubber` クラスの参照です。

#### `TouchBarSegmentedControl`

[`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) であり、`TouchBarSegmentedControl` クラスの参照です。

#### `TouchBarSlider`

[`typeof TouchBarSlider`](./touch-bar-slider.md) であり、`TouchBarSlider` クラスの参照です。

#### `TouchBarSpacer`

[`typeof TouchBarSpacer`](./touch-bar-spacer.md) であり、`TouchBarSpacer` クラスの参照です。

#### `TouchBarOtherItemsProxy`

[`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) であり、`TouchBarOtherItemsProxy` クラスの参照です。

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

// リールのラベル
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
    // 回転中のクリックを無視
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
        // 各回転を少し遅くする
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
    // 3 つすべての値が同じ場合
    result.label = '💰 ジャックポット!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 つの値が同じ場合
    result.label = '😍 やったね!'
    result.textColor = '#FDFF00'
  } else {
    // No values are the same
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

app.whenReady().then(() => {
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
