## 类: TouchBarSlider

> 为本机 macOS 应用程序在触摸栏中创建滑块

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSlider(options)` _实验功能_

* `options` Object
  * `label` String (可选) - 标签文本.
  * `value` Integer (可选) - 选中值.
  * ` minValue ` Integer (可选) - 最小值.
  * ` maxValue ` Integer (可选) - 最大值.
  * `change` Function (optional) - Function to call when the slider is changed.
    * `newValue` Number - 用户选中的值.

### 实例属性

以下为 ` TouchBarSlider ` 实例的可用属性:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.
