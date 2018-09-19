## 类: TouchBarScrubber

> 创建一个scrubber (可滚动的选择程序)

进程：[主进程](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *实验功能*

* `参数` 对象 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) 一个数组，表示 scrubber 里的项目。
  * `select` 函数 - 当用户点了一个项目，但是不是上一次点击的项目时调用。 
    * `selectedIndex` Integer - 用户选中项排序。
  * `highlight` Function - 当用户点击某一项时调用. 
    * highlightedIndex Integer - 用户选中项排序.
  * ` selectedStyle ` String - 选中项样式. 默认为 `null`.
  * ` overlayStyle ` String - 选中遮罩项样式. 默认为 ` null `.
  * `showArrowButtons` Boolean - 默认为 `false`.
  * `mode` String -默认为` free `。
  * `continuous` Boolean - 默认为`true`。

### 实例属性

以下为 ` TouchBarScrubber ` 实例的可用属性:

#### `touchBarScrubber.items`

一个Scrubberitem[] 数组代表Scrubber里的所有物品。 改变这个值会立刻刷新touch bar内的控件。 然而改变数组某元素内的嵌套属性**不会刷新touch bar**。

#### `touchBarScrubber.selectedStyle`

Scrubber中被选择的物品需要有的，一个代表的样式的`String`。 改变这个值会立刻刷新touch bar的控件。可选值：

* `background` - 映射为`[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - 映射到`[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - 真实意义上的null，不是字符串且不含任何样式。

#### `touchBarScrubber.overlayStyle`

一个`String`，用来表示在scrubber内被选择的组件应有的样式。 该样式将会覆盖在scrubber组件之上而非其后。 改变这个值会立刻刷新touch bar的控件。 可选值：

* `background` - 映射为`[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - 映射为`[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - 真实意义上的null，不是字符串且不含任何样式。

#### `touchBarScrubber.showArrowButtons`

一个`Boolean`值，表示是否在scrubber中显示左/右选择箭头。改变这个值会立刻刷新touch bar的控件。

#### `touchBarScrubber.mode`

一个代表scrubber模式的`string`。改变这个值会立刻刷新touch bar的控件。可选值：

* `fixed` - 映射到`NSScrubberModeFixed`
* `free` - 映射到`NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

一个`Boolean`值，表示scrubber是否连续。改变这个值会立刻刷新touch bar的控件。