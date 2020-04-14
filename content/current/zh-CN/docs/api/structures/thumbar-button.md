# ThumbarButton 对象

* `icon` [NativeImage](../native-image.md) - 显示在缩略图工具栏中的图标.
* `click` Function
* `tooltip` String (可选) - 按钮的提示文本.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` 属性是一个数组，包含以下`String`类型的值:

* `enabled` - 该按钮处于活动状态并可供用户使用.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - 当按钮被点击时，缩略图窗口立即关闭。
* `nobackground` - 不可以画按钮边框，只能使用图片背景。
* `hidden` - 该按钮对用户不可见。
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
