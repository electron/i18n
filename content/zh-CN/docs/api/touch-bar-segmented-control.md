## 类: TouchBarSegmentedControl

> 创建一个分段控件（按钮组），其中一个按钮具有选定状态

进程：[主进程](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *实验功能*

* `参数` 对象 
  * `segmentStyle` String (可选) - 分段的样式： 
    * `automatic` - 默认的。分段控件的外观是通过窗口的类型和控件在窗口内呈现的位置自动确定的。
    * `rounded` - 控件的呈现使用圆形风格。
    * `textured-rounded` - 控件的呈现使用纹理圆形风格。
    * `round-rect` - 以圆角矩形样式显示控件。
    * `round-rect` - 以带纹理的矩形样式显示控件。
    * `capsule` - 以胶囊样式的风格显示控件
    * `small-square` - 以小尺寸的矩形样式显示控件
    * 表示控件的当前段样式。更新此值会立即更新触摸栏中的控件。
  * `mode` String (可选) - 控件的选择模式： 
    * `single` - 默认的。只能选一项。选择后会取消选择之前选择的项。
    * `multiple` - 可以选多个项。
    * `buttons` - 将段作为按钮使用, 每一段都可以被按下和释放但是不会被标记为激活状态
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - 被放到控件中的段的集合
  * `selectedIndex` Integer (optional) - 当前选中的段的下标, 这个值会在用户交互时自动更改 当处于多选模式时，这个值是选中段中最后一个的下标
  * `change` Function - 当用户点击某一个段时调用. 
    * `selectedIndex` Integer - 用户选中的段的下标。
    * `isSelected` Boolean - 当前段的选中状态

### 实例属性

以下为 ` TouchBarSegmentedControl ` 实例的可用属性:

#### `touchBarSegmentedControl.segmentStyle`

`String`类型表示的当前段的样式. 更新这个值会立即触发更新当前段

#### `touchBarSegmentedControl.segments`

`SegmentedControlSegment[]`类型表示的控件中段的集合 改变这个值会立刻刷新touch bar内的控件。 然而改变数组某元素内的嵌套属性**不会刷新touch bar**。

#### `touchBarSegmentedControl.selectedIndex`

`Integer`类型表示的当前选中段 改变这个值会立即触发更新当前段 用户对触摸条的操作会自动更新这个值