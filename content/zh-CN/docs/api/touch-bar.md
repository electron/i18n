# 触控板

## 类: TouchBar

> 为原生macOS应用创建TouchBar布局

进程：[主进程](../glossary.md#main-process)

### `new TouchBar(options)`

* `选项` 对象
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[] (optional)
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (可选的)

Creates a new touch bar with the specified items. Use `BrowserWindow.setTouchBar` to add the `TouchBar` to a window.

**注意:** TouchBar API目前为实验性质，以后的Electron版本可能会更改或删除。

**提示：**如果您没有带Touch Bar的MacBook，则可以使用[ Touch Bar Simulator ](https://github.com/sindresorhus/touch-bar-simulator)来测试应用中的Touch Bar使用情况。

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

#### `TouchBarOtherItemsProxy`

A [`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) reference to the `TouchBarOtherItemsProxy` class.

### 实例属性

在`TouchBar`的实例中有以下属性可用：

#### `touchBar.escapeItem`

`TouchBarItem`设置的内容将替换掉Touch bar中的“esc”按钮 将该项设为`null`以使用默认的"esc"按钮 修改这个值将立即更新Touch bar中的返回按钮

## 示例

下面是一个带有一个按钮和若干文本的简易Touch bar老虎机游戏示例

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

### 运行以上示例

要运行上面的示例，您需要 (假设您已经在将要运行该示例的目录中打开了一个终端)：

1. 将上述文件保存到您的电脑上，并命名为 `touchbar.js`
2. 通过 `npm install electron` 来安装 Electron
3. 在 Electron 中运行示例：`./node_modules/.bin/electron touchbar.js`

接下来这个应用会在你的Touch bar (或者Touch bar模拟器) 上运行，你将能看到一个Electron窗口
