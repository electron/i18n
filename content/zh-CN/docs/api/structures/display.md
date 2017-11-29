# Display对象

* `id`数字-与显示相关联的唯一的标志符
* `rotation `数字--可以是 0, 90, 180, 270, 代表屏幕旋转角度。
* ` scaleFactor `数字-输出设备的像素比例因子。
* ` touchSupport `字符串--可以是 `available `、`unavailable `、` unknown `。
* ` bounds`[ 矩形 ](rectangle.md)
* ` size `[ 尺寸](size.md)
* ` bounds`[ 矩形 ](rectangle.md)
* ` workAreaSize `[尺寸 ](size.md)

` Display ` 对象表示一个连接到系统的物理显示。 一个伪 ` Display ` 可能存在于无图形界面（Gui）系统上, 或者 一个` Display ` 可能与一个远程的虚拟显示相对应。