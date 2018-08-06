## 类: TouchBarSegmentedControl

> 创建一个分段控件（按钮组），其中一个按钮具有选定状态

进程：[主进程](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *实验功能*

* `选项` 对象 
  * `segmentStyle` String (可选) - 分段的样式： 
    * `automatic` - 默认的。分段控件的外观是通过窗口的类型和控件在窗口内呈现的位置自动确定的。
    * `rounded` - 控件的呈现使用圆形风格。
    * `textured-rounded` - 控件的呈现使用纹理圆形风格。
    * `round-rect` - 控件的呈现使用圆角矩形样式。
    * `textured-square` - The control is displayed using the textured square style.
    * `capsule` - The control is displayed using the capsule style.
    * `small-square` - The control is displayed using the small square style.
    * `separated` - The segments in the control are displayed very close to each other but not touching.
  * `mode` String (可选) - 控件的选择模式： 
    * `single` - 默认的。只能选一项。选择后会取消选择之前选择的项。
    * `multiple` - 可以选多个项。
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. When the mode is multiple it will be the last selected item.
  * `change` Function - Called when the user selects a new segment. 
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### 实例属性

以下为 ` TouchBarSegmentedControl ` 实例的可用属性:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control. 改变这个值会立刻刷新touch bar内的控件。 然而改变数组某元素内的嵌套属性**不会刷新touch bar**。

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Changing this value immediately updates the control in the touch bar. 使用touch bar的用户交互会自动更新这个值。