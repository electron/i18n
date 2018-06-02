## Class: TouchBarPopover

> 为macOS原生应用在触摸栏中创建一个弹出控件

线程：[主线程](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *实验功能*

* `options` Object 
  * ` label `String (可选) 弹出按钮文本。
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 弹出按钮图标。
  * `items` [TouchBar](touch-bar.md) (可选) -弹出中展示的元素。
  * `showCloseButton` Boolean (可选) - `true` 是指在弹出左侧展示关闭按钮, `false` 则相反. 默认为 `true`.

### 实例属性

以下为 ` TouchBarPopover ` 实例的可用属性:

#### `touchBarPopover.label`

`String`类型，用于为弹出添加展示文本。改变这个字符串的值会即时刷新触摸条中的弹出。

#### `touchBarPopover.icon`

`NativeImage`类型，用于为弹出添加按钮图标。改变它的的值会即时刷新触摸条中的弹出。