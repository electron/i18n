## 类: TouchBarSegmentedControl

> 创建一个分段控件（按钮组），其中一个按钮具有选定状态

进程：[主进程](../glossary.md#main-process)

### `新的触摸栏隔离控制（选项）`

* `选项` 对象
  * `segmentStyle` 字符串（可选） - 段的样式：
    * `automatic` - 默认值。 分段控制的外观 根据显示控制 的窗口类型和窗口内的位置自动确定。 地图到 `NSSegmentStyleAutomatic`。
    * `rounded` - 控件的呈现使用圆形风格。 地图到 `NSSegmentStyleRounded`。
    * `textured-rounded` - 控件的呈现使用纹理圆形风格。 地图到 `NSSegmentStyleTexturedRounded`。
    * `round-rect` - 以圆角矩形样式显示控件。 地图到 `NSSegmentStyleRoundRect`。
    * `round-rect` - 以带纹理的矩形样式显示控件。 地图到 `NSSegmentStyleTexturedSquare`。
    * `capsule` - 以胶囊样式的风格显示控件 地图到 `NSSegmentStyleCapsule`。
    * `small-square` - 以小尺寸的矩形样式显示控件 地图到 `NSSegmentStyleSmallSquare`。
    * 表示控件的当前段样式。更新此值会立即更新触摸栏中的控件。 地图到 `NSSegmentStyleSeparated`。
  * `mode` 字符串（可选） - 控制的选择模式：
    * `single` - 默认值。 一次选择一个项目，选择一个项目取消选择之前选择的项目。 地图到 `NSSegmentSwitchTrackingSelectOne`。
    * `multiple` - 可以选多个项。 地图到 `NSSegmentSwitchTrackingSelectAny`。
    * `buttons` - 将段作为按钮使用, 每一段都可以被按下和释放但是不会被标记为激活状态 地图到 `NSSegmentSwitchTrackingMomentary`。
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - 被放到控件中的段的集合
  * `selectedIndex` Integer (optional) - 当前选中的段的下标, 这个值会在用户交互时自动更改 当模式 `multiple` 它将是最后选定的项目。
  * `change` 功能（可选） - 当用户选择新细分市场时调用。
    * `selectedIndex` Integer - 用户选中的段的下标。
    * `isSelected` Boolean - 当前段的选中状态

### 实例属性

以下为 ` TouchBarSegmentedControl ` 实例的可用属性:

#### `touchBarSegmentedControl.segmentStyle`

表示控件当前段样式的 `String` 。 更新此值立即更新触摸栏中的控制 。

#### `touchBarSegmentedControl.segments`

`SegmentedControlSegment[]`类型表示的控件中段的集合 改变这个值会立刻刷新touch bar内的控件。 然而改变数组某元素内的嵌套属性**不会刷新touch bar**。

#### `touchBarSegmentedControl.selectedIndex`

`Integer`类型表示的当前选中段 改变这个值会立即触发更新当前段 用户对触摸条的操作会自动更新这个值

#### `触摸栏隔离控制。模式`

代表当前控制选择模式的 `String` 。  可以 `single`， `multiple` 或 `buttons`。
