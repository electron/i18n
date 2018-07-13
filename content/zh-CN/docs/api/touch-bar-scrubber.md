## 类: TouchBarScrubber

> 创建一个scrubber (可滚动的选择程序)

进程：[主进程](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *实验功能*

* `选项` 对象 
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

一个Scrubberitem[] 数组代表Scrubber里的所有物品。 改变数组里的值会立即改变到touch bar的控制。 Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarScrubber.selectedStyle`

Scrubber中被选择的物品需要有的，一个代表的样式的字符串。 改变这个值会立即影响到touch bar的控制。可选值：

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.overlayStyle`

A `String` representing the style that selected items in the scrubber should have. This style is overlayed on top of the scrubber item instead of being placed behind it. Updating this value immediately updates the control in the touch bar. 可选值

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.showArrowButtons`

一个boolean值代表是否在scrubber中显示左/右选择箭头。改变这个值立即影响touch bar的控制。

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Updating this value immediately updates the control in the touch bar. Possible values:

* `fixed` - Maps to `NSScrubberModeFixed`.
* `free` - Maps to `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Updating this value immediately updates the control in the touch bar.