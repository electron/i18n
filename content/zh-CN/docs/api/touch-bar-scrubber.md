## 类: TouchBarScrubber

> 创建一个scrubber (可滚动的选择程序)

进程：[主进程](../glossary.md#main-process)

### `新的触摸栏（选项）`

* `选项` 对象
  * `items` [ScrubberItem[]](structures/scrubber-item.md) 一个数组，表示 scrubber 里的项目。
  * `select` 功能（可选） - 当用户点击不是最后一个点击项的项目时调用。
    * `selectedIndex` Integer - 用户选中项排序。
  * `highlight` 功能（可选） - 当用户点击任何项目时调用。
    * highlightedIndex Integer - 用户选中项排序.
  * `selectedStyle` 字符串（可选） - 选定的项目样式。 可以 `background`， `outline` 或 `none`。 `none`的默认值。
  * `overlayStyle` 字符串（可选） - 选定的叠加项目样式。 可以 `background`， `outline` 或 `none`。 `none`的默认值。
  * `showArrowButtons` 布尔（可选） - 默认 `false`。
  * `mode` 字符串（可选） - 可以 `fixed` 或 `free`。 默认值为 `free`。
  * `continuous` 布尔（可选） - 默认 `true`。

### 实例属性

以下为 ` TouchBarScrubber ` 实例的可用属性:

#### `touchBarScrubber.items`

一个Scrubberitem[] 数组代表Scrubber里的所有物品。 改变这个值会立刻刷新touch bar内的控件。 然而改变数组某元素内的嵌套属性**不会刷新touch bar**。

#### `touchBarScrubber.selectedStyle`

一个`String`，用来表示在scrubber内被选择的组件应有的样式。 改变这个值会立刻刷新touch bar内的控件。 可选值：

* `background` - 映射为`[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - 映射到`[NSScrubberSelectionStyle outlineOverlayStyle]`
* `none` - 删除所有样式。

#### `touchBarScrubber.overlayStyle`

一个`String`，用来表示在scrubber内被选择的组件应有的样式。 该样式将会覆盖在scrubber组件之上而非其后。 改变这个值会立刻刷新touch bar的控件。 可选值：

* `background` - 映射为`[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - 映射到`[NSScrubberSelectionStyle outlineOverlayStyle]`
* `none` - 删除所有样式。

#### `touchBarScrubber.showArrowButtons`

代表是否在此洗涤器中显示左/右选择箭头的 `Boolean` 。 更新此值 立即更新触摸栏中的控制。

#### `touchBarScrubber.mode`

代表此洗涤器模式的 `String` 。 改变这个值会立刻刷新touch bar内的控件。 可选值：

* `fixed` - 映射到`NSScrubberModeFixed`
* `free` - 映射到`NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

代表此洗涤器是否连续的 `Boolean` 。 改变这个值会立刻刷新touch bar内的控件。
