# screen

> 检索有关屏幕大小、显示器、光标位置等的信息。

进程：[主进程](../glossary.md#main-process)

在 ` app ` 模块 `emitted ready ` 事件之前，您不能使用此模块。

`screen` 是一个 [EventEmitter][event-emitter].

**注意：** 在渲染器/DevTools中， `window.screen` 是保留的DM 属性，因此编写 `let { screen } = require('electron')` 不起作用。

创建填充整个屏幕的窗口的示例:

```javascript fiddle='docs/fiddles/screen/fit-screen'
康斯特 { app, BrowserWindow, screen } =要求（'电子'）

让赢得
应用程序。当准备好。然后）=> {
  康斯特 { width, height } =屏幕。 工作规模
  赢=新浏览器窗口（{ width, height }）
  赢
.com。
```

另一个在外部显示器中创建窗口的例子

```javascript
康斯特 { app, BrowserWindow, screen } =要求（'电子'）

让赢

应用程序。当准备好时。然后）=> {
  const显示器=屏幕。getAllDisplay（）
  康斯特外部显示=显示器> 。
    返回显示器.bunds.x！=0 ||显示。bounds.y！=0
  [）

  如果（外部显示）{
    赢 = 新的浏览器窗口（+
      x： 外部显示。边界.x，
      y： 外部显示. bounds. y = 50
    [）
    获胜

  .com。
```

## 事件

`screen`模块触发以下事件:

### Event: 'display-added'

返回:

* `event` Event
* `newDisplay` [Display](structures/display.md)

当新的窗口`newDisplay`被添加的时候触发。

### Event: 'display-removed'

返回:

* `event` Event
* `oldDisplay` [Display](structures/display.md)

当旧的窗口`oldDisplay`被移除的时候触发。

### Event: 'display-metrics-changed'

返回:

* `event` Event
* `display` [Display](structures/display.md)
* `changedMetrics` String[]

当`display`中的一个或多个值发生改变时发出。 `changedMetrics`是描述更改信息的字符串数组。 可能改变的值有`bounds`, `workArea`, `scaleFactor` 和 `rotation`.

## 方法

`screen`模块有以下方法:

### `screen.getCursorScreenPoint()`

返回 [`Point`](structures/point.md)

当前鼠标的绝对位置。

### `screen.getPrimaryDisplay()`

返回主窗口[`Display`](structures/display.md)

### `screen.getAllDisplays()`

返回一个窗口数组[`Display[]`](structures/display.md)，表示当前可用的窗口。

### `screen.getDisplayNearestPoint(point)`

* `point` [Point](structures/point.md)

返回离指定点最近的一个窗口[`Display`](structures/display.md)

### `screen.getDisplayMatching(rect)`

* `rect` [Rectangle](structures/rectangle.md)

返回离指定的图形最密切相交一个窗口[`Display`](structures/display.md)

### `screen.screenToDipPoint(point)` _Windows_

* `point` [Point](structures/point.md)

返回 [`Point`](structures/point.md)

将屏幕物理点转换为屏幕 DIP 点。 相对于包含物理点的显示器执行 DPI 刻度。

### `screen.dipToScreenPoint(point)` _Windows_

* `point` [Point](structures/point.md)

返回 [`Point`](structures/point.md)

将屏幕 DIP 点转换为屏幕物理点。 相对于包含 DIP 点的显示器执行 DPI 刻度。

### `screen.screenToDipRect(window, rect)` _视窗_

* `window` [浏览器窗口](browser-window.md) |空
* `rect` [Rectangle](structures/rectangle.md)

返回 [`Rectangle`](structures/rectangle.md)

将屏幕物理直流转换为屏幕 DIP 直流。 DPI比例是相对于最接近 `window`的显示器执行的。 如果 `window` 为空，将执行缩放到离 `rect`最近的显示屏。

### `screen.dipToScreenRect(window, rect)` _视窗_

* `window` [浏览器窗口](browser-window.md) |空
* `rect` [Rectangle](structures/rectangle.md)

返回 [`Rectangle`](structures/rectangle.md)

将屏幕 DIP 直流转换为屏幕物理直流。 DPI比例是相对于最接近 `window`的显示器执行的。 如果 `window` 为空，将执行缩放到离 `rect`最近的显示屏。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
