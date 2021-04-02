## 类: TouchBarSlider

> 为本机 macOS 应用程序在触摸栏中创建滑块

进程：[主进程](../glossary.md#main-process)

### `新的触摸滑机（选项）`

* `选项` 对象
  * `label` String (可选) - 标签文本.
  * `value` Integer (可选) - 选中值.
  * ` minValue ` Integer (可选) - 最小值.
  * ` maxValue ` Integer (可选) - 最大值.
  * `change` 函数（可选） - 更改滑块时调用的功能。
    * `newValue` Number - 用户选中的值.

### 实例属性

以下为 ` TouchBarSlider ` 实例的可用属性:

#### `touchBarSlider.label`

表示滑块当前文本的 `String` 。 更改此值会立即更新触摸栏中 的滑块。

#### `touchBarSlider.value`

表示滑块当前值的 `Number` 。 更改此值会立即更新触摸栏中 的滑块。

#### `touchBarSlider.minValue`

表示滑块当前最小值的 `Number` 。 更改此值会立即更新触摸栏中的 滑块。

#### `touchBarSlider.maxValue`

表示滑块当前最大值的 `Number` 。 更改此值会立即更新触摸栏中的 滑块。
