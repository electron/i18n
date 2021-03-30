---
title: 触摸条支持
author: kevinsawicki
date: '2017-03-08'
---

Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) beta 版本包含对macOS [Touch Bar](https://developer.apple.com/macos/touch-bar) 的初始支持。

---

新的 Touch Bar API 允许您添加按钮、标签、弹出窗口、颜色 选取器、滑块和空格。 这些元素可以动态地更新， 当它们与之互动时，也会释放事件。

这是此 API 的第一个版本，因此它将在下一个 个少量Electron 版本中演变。 请查看版本说明以获取更多更新 并打开 [个问题](https://github.com/electron/electron/issues) 以获取任何问题 或缺失的功能。

You can install this version via `npm install electron@beta` and learn more about it in the [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) and [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

非常感谢 [@MarshallOfSound](https://github.com/MarshallOfSound) 为Electron做出贡献。 :tada:

## 触摸条示例

![触摸条边框](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

下面是在触摸条中创建一个简单的栏位游戏的例子。 它演示如何创建一个触摸栏，样式条目，将其与 窗口关联， 按键点击事件并动态更新标签。

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

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
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    结果.文本颜色="#FDFF00"
  }其他=
    //没有值是相同的
    结果。标签="🙁再次旋转"
    结果
  



  
  。
  新的触摸栏空间器（{size: 'large'}），
  卷轴1，
  新的触摸栏空间器（{size: 'small'}），
  卷轴2，
  个新的 TouchBarSpacer （{size: 'small'}），
  卷轴 3，
  个新的 TouchbarSpacer （{size: 'large'}），
  结果
]）

让窗口

应用程序
    
  > 。：假的，
    标题BarStyle：'隐藏嵌套'，
    宽度：200，
    高度：200，
    背景颜色："#000"
  }）
  窗口

  。
```

