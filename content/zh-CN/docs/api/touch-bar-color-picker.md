## 类: TouchBarColorPicker

> 在macOS 应用程序中，为触控栏创建拾色器

进程：[主进程](../glossary.md#main-process)

### `新的触摸巴彩色选择器（选项）`

* `选项` 对象
  * `availableColors` String[] (可选) - 由可选的十六进位色值组成的字符串数组.
  * ` backgroundColor `String (可选) - 拾色器选中的颜色十六进位色值，例如 ` #ABCDEF `。
  * `change` 功能（可选） - 选择颜色时调用的功能。
    * `color` String - 用户从拾色器中选取的颜色.

### 实例属性

以下为` TouchBarColorPicker ` 实例的可用属性:

#### `touchBarColorPicker.availableColors`

代表颜色拾取器可用颜色的 `String[]` 阵列。 立即更改此值 更新触摸栏中的选色器。

#### `touchBarColorPicker.selectedColor`

`String` 六角形代码，表示选色器当前选择的颜色。 立即更改此值 更新触摸栏中的选色器。
