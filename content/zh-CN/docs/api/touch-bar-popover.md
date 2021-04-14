## 类: TouchBarPopover

> 为macOS原生应用在触摸栏中创建一个弹出控件

进程：[主进程](../glossary.md#main-process)

### `新的触摸栏弹出（选项）`

* `选项` 对象
  * ` label `String (可选) 弹出按钮文本。
  * `icon` ([NativeImage](native-image.md) | String) (可选) - 弹出按钮图标。
  * `items` [触摸栏](touch-bar.md) - 在弹出窗口中显示的项目。
  * `showCloseButton` 布尔（可选） - `true` 显示一个关闭按钮 在弹出窗口的左边， `false` 不显示它。 默认值为 `true`。

### 实例属性

以下为 ` TouchBarPopover ` 实例的可用属性:

#### `touchBarPopover.label`

`String` 表示弹出窗口当前按钮文本。 更改此值会立即更新触摸栏中的 弹出窗口。

#### `touchBarPopover.icon`

代表弹出窗口当前按钮图标的 `NativeImage` 。 更改此值会立即更新触摸栏中的 弹出窗口。
