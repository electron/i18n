## 类: TouchBar

> 为原生macOS应用创建TouchBar布局

Process: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *实验功能*

* `参数` 对象 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (可选的)

用指定的项目创建一个新的触摸栏。 使用`BrowserWindow.setTouchBar`将 `TouchBar`添加到窗口。

**注意:** TouchBar API目前为实验性质，可能会更改或删除。

**提示：**如果您没有带Touch Bar的MacBook，则可以使用[ Touch Bar Simulator ](https://github.com/sindresorhus/touch-bar-simulator)来测试应用中的Touch Bar使用情况。

### 实例属性

在`TouchBar`的实例中有以下属性可用：

#### `touchBar.escapeItem`

`TouchBarItem`设置的内容将替换掉Touch bar中的“esc”按钮 将该项设为`null`以使用默认的"esc"按钮 修改这个值将立即更新Touch bar中的返回按钮

## 示例

下面是一个带有一个按钮和若干文本的简易Touch bar老虎机游戏示例

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

### 运行以上示例

要运行上面的示例，您需要 (假设您已经在将要运行该示例的目录中打开了一个终端)：

1. 将上述文件保存到您的电脑上，并命名为 `touchbar.js`
2. 通过 `npm install electron` 来安装 Electron
3. 在 Electron 中运行示例：`./node_modules/.bin/electron touchbar.js`

接下来这个应用会在你的Touch bar (或者Touch bar模拟器) 上运行，你将能看到一个Electron窗口