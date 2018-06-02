## Class: TouchBarPopover

> 为macOS原生应用在触摸栏中创建一个弹出控件

线程：[主线程](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *实验功能*

* `options` Object 
  * ` label `String (可选) 弹出按钮文本。
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 弹出按钮图标。
  * `items` [TouchBar](touch-bar.md) (可选) -弹出中展示的元素。
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Default is `true`.

### 实例属性

The following properties are available on instances of `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.