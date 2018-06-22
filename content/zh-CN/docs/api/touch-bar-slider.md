## 类: TouchBarSlider

> 为本机 macOS 应用程序在触摸栏中创建滑块

进程：[主进程](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *实验功能*

* `选项` 对象 
  * `label` String (可选) - 标签文本.
  * `value` Integer (可选) - 选中值.
  * ` minValue ` Integer (可选) - 最小值.
  * ` maxValue ` Integer (可选) - 最大值.
  * `change` Function (optional) - 当滑块改变时调起该函数. 
    * `newValue` Number - 用户选中的值.

### 实例属性

以下为 ` TouchBarSlider ` 实例的可用属性:

#### `touchBarSlider.label`

`String`类型，用于为滑块添加展示文本。改变它的值会即时刷新触摸条中的滑块。

#### `touchBarSlider.value`

`Number`类型，滑块的当前值。改变它的值会即时刷新触摸条中的滑块。

#### `touchBarSlider.minValue`

`Number`类型，当前滑块的最小值。改变它的值会即时刷新触摸条中的滑块。

#### `touchBarSlider.maxValue`

`Number`类型，当前滑块的最大值。改变它的值会即时刷新触摸条中的滑块。