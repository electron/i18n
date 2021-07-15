# ThumbarButton Object

* `icon` [NativeImage](../native-image.md) - The icon showing in thumbnail toolbar.
* `click` Function
* `tooltip` String (可选) - 按钮的提示文本.
* `flags` String[] (可选) - 控制按钮的特定状态和行为。 默认情况下，值为 `['enabled']`。

`flags` 属性是一个数组，包含以下`String`类型的值:

* `enabled` - 该按钮处于活动状态并可供用户使用.
* `disabled` - 按钮已禁用。 会以一种视觉状态表示它不会响应用户操作的形式显示。
* `dismissonclick` - 当按钮被点击时，缩略图窗口立即关闭。
* `nobackground` - 仅仅使用图像而不绘制边框。
* `hidden` - 该按钮对用户不可见。
* `noninteractive` - 按钮已启用，但不交互；不绘制按钮按下的状态。 此值用于在通知中使用按钮的实例。
