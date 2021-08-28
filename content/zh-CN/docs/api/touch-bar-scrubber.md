## 类: TouchBarScrubber

> 创建一个scrubber (可滚动的选择程序)

进程：[主进程](../glossary.md#main-process)

### `new TouchBarScrubber(options)`

* `选项` 对象
  * `items` [ScrubberItem[]](structures/scrubber-item.md) 一个数组，表示 scrubber 里的项目。
  * `select` Function (optional) - Called when the user taps an item that was not the last tapped item.
    * `selectedIndex` Integer - 用户选中项排序。
  * `highlight` Function (optional) - Called when the user taps any item.
    * highlightedIndex Integer - 用户选中项排序.
  * `selectedStyle` String (optional) - Selected item style. Can be `background`, `outline` or `none`. 默认值为：`none`。
  * `overlayStyle` String (optional) - Selected overlay item style. Can be `background`, `outline` or `none`. 默认值为：`none`。
  * `showArrowButtons` Boolean (optional) - Whether to show arrow buttons. Defaults to `false` and is only shown if `items` is non-empty.
  * `mode` String (可选) - 可以是 `fixed` 或 `free`。 默认值为`free`.
  * `continuous` Boolean (optional) - Defaults to `true`.

### 实例属性

以下为 ` TouchBarScrubber ` 实例的可用属性:

#### `touchBarScrubber.items`

一个Scrubberitem[] 数组代表Scrubber里的所有物品。 改变这个值会立刻刷新touch bar内的控件。 然而改变数组某元素内的嵌套属性**不会刷新touch bar**。

#### `touchBarScrubber.selectedStyle`

一个`String`，用来表示在scrubber内被选择的组件应有的样式。 改变这个值会立刻刷新touch bar内的控件。 可选值：

* `background` - 映射为`[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - 映射为`[NSScrubberSelectionStyle outlineOverlayStyle]`
* `none` - Removes all styles.

#### `touchBarScrubber.overlayStyle`

一个`String`，用来表示在scrubber内被选择的组件应有的样式。 该样式将会覆盖在scrubber组件之上而非其后。 改变这个值会立刻刷新touch bar的控件。 可选值：

* `background` - 映射为`[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - 映射为`[NSScrubberSelectionStyle outlineOverlayStyle]`
* `none` - Removes all styles.

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. 改变这个值会立刻刷新touch bar内的控件。 可选值：

* `fixed` - 映射到`NSScrubberModeFixed`
* `free` - 映射到`NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. 改变这个值会立刻刷新touch bar内的控件。
