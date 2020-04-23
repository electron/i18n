## 类: TouchBarSegmentedControl

> 创建一个分段控件（按钮组），其中一个按钮具有选定状态

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSegmentedControl(options)` _实验功能_

* `options` Object
  * `segmentStyle` String (optional) - Style of the segments:
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `rounded` - 控件的呈现使用圆形风格。 Maps to `NSSegmentStyleRounded`.
    * `textured-rounded` - 控件的呈现使用纹理圆形风格。 Maps to `NSSegmentStyleTexturedRounded`.
    * `round-rect` - 以圆角矩形样式显示控件。 Maps to `NSSegmentStyleRoundRect`.
    * `round-rect` - 以带纹理的矩形样式显示控件。 Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - 以胶囊样式的风格显示控件 Maps to `NSSegmentStyleCapsule`.
    * `small-square` - 以小尺寸的矩形样式显示控件 Maps to `NSSegmentStyleSmallSquare`.
    * 表示控件的当前段样式。更新此值会立即更新触摸栏中的控件。 Maps to `NSSegmentStyleSeparated`.
  * `mode` String (optional) - The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - 可以选多个项。 Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - 将段作为按钮使用, 每一段都可以被按下和释放但是不会被标记为激活状态 Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - 被放到控件中的段的集合
  * `selectedIndex` Integer (optional) - 当前选中的段的下标, 这个值会在用户交互时自动更改 When the mode is `multiple` it will be the last selected item.
  * `change` Function (optional) - Called when the user selects a new segment.
    * `selectedIndex` Integer - 用户选中的段的下标。
    * `isSelected` Boolean - 当前段的选中状态

### 实例属性

以下为 ` TouchBarSegmentedControl ` 实例的可用属性:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

`SegmentedControlSegment[]`类型表示的控件中段的集合 改变这个值会立刻刷新touch bar内的控件。 然而改变数组某元素内的嵌套属性**不会刷新touch bar**。

#### `touchBarSegmentedControl.selectedIndex`

`Integer`类型表示的当前选中段 改变这个值会立即触发更新当前段 用户对触摸条的操作会自动更新这个值
