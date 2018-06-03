## 类: TouchBarSlider

> 为本机 macOS 应用程序在触摸栏中创建滑块

进程：[主进程](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *实验功能*

* `选项` 对象 
  * `label` String (可选) - 标签文本.
  * `value` Integer (optional) - Selected value.
  * `minValue` Integer (optional) - Minimum value.
  * `maxValue` Integer (optional) - Maximum value.
  * `change` Function (optional) - Function to call when the slider is changed. 
    * `newValue` Number - The value that the user selected on the Slider.

### 实例属性

The following properties are available on instances of `TouchBarSlider`:

#### `touchBarSlider.label`

`String`类型，用于为滑块添加展示文本。改变它的值会即时刷新触摸条中的滑块。

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.