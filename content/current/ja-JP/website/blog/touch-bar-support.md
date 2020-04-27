---
title: Touch Bar サポート
author: kevinsawicki
date: '2017-03-08'
---

Electron の [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) ベータリリースは macOS の [Touch Bar](https://developer.apple.com/macos/touch-bar) に対する初期サポートを含みます。

---

新しい Touch Bar API により、ボタン、ラベル、ポップオーバー、カラーピッカー、スペーサを追加することができます。 これらの要素は動的に更新され、対話が起こった際にはイベントが発生します。

この API の最初のリリースに過ぎないため、いくつかの Electron のリリースの間に進化していくでしょう。 詳しい更新内容についてはリリースノートを参照してください。なんらかの問題が生じているか、機能が欠けている場合は、 [Issue](https://github.com/electron/electron/issues) を開いてください。

このバージョンは `npm install electron@beta` でインストールできます。詳細は Electron ドキュメントの [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) 及び [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) を参照してください。

[@MarshallOfSound](https://github.com/MarshallOfSound) による Electron への貢献に大いなる感謝を表します。 :tada:

## Touch Bar の例

![Touch Bar の Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

以下は Touch Bar を用いたシンプルなスロットゲームの例です。 Touch Bar の作成方法、アイテムにスタイルを適用する方法、ウィンドウと関連付ける方法、ボタンクリックイベントを扱う方法、ラベルを動的に更新する方法を示しています。

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let spinning = false

// リールのラベル
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// 結果のラベル
const result = new TouchBarLabel()

// スピンボタン
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // 常に回っていれば無視
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
        // スピンごとに少し遅くする
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
    // 3 つの値がすべて同じ
    result.label = '💰 ジャックポット!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 つの値が同じ
    result.label = '😍 勝利!'
    result.textColor = '#FDFF00'
  } else {
    // すべて違う値
    result.label = '🙁 もう一回'
    result.textColor = null
  }
  spinning = false
}

const touchBar = new TouchBar([
  spin,
  new TouchBarSpacer({size: 'large'}),
  reel1,
  new TouchBarSpacer({size: 'small'}),
  reel2,
  new TouchBarSpacer({size: 'small'}),
  reel3,
  new TouchBarSpacer({size: 'large'}),
  result
])

let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

