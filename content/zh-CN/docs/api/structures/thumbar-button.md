# ThumbarButton 对象

* `icon` [NativeImage](../native-image.md) - 显示在缩略图工具栏中的图标.
* `click` Function
* `tooltip` String (可选) - 按钮的提示文本.
* `flags` 字符串[]（可选） - 控制 按钮的特定状态和行为。 默认情况下，它是 `['enabled']`。

`flags` 属性是一个数组，包含以下`String`类型的值:

* `enabled` - 该按钮处于活动状态并可供用户使用.
* `disabled` - 按钮已禁用。 它存在，但有一个可视状态 表示它不会响应用户操作。
* `dismissonclick` - 当按钮被点击时，缩略图窗口立即关闭。
* `nobackground` - 不可以画按钮边框，只能使用图片背景。
* `hidden` - 该按钮对用户不可见。
* `noninteractive` - 按钮已启用，但未交互式：没有按下 按钮状态绘制。 此值用于在通知中使用按钮 的情况。
