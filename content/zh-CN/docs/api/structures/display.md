# Display对象

* `id`数字-与显示相关联的唯一的标志符。
* `rotation `数字 - 可以是 0, 90, 180, 270, 代表屏幕旋转角度。
* ` scaleFactor `数字-输出设备的像素比例因子。
* ` touchSupport `字符串--可以是 `available `、`unavailable `、` unknown `。
* `monochrome` 布尔值-表示display对象是否是一个单色的显示对象(monochrome display)
* `accelerometerSupport` 字符串-可以是 `available`、`unavailable`、`unknown`。
* `colorSpace` 字符串 -  表示用于颜色转换的颜色空间(包含可选颜色的三维对象)
* `colorDepth` 数字 - 表示Display对象对应于色彩空间的比特深度
* `深度` 数字 - 每个颜色组件的比例数。
* `displayFrequency` Number - 显示刷新率。
* `bounds` [Rectangle](rectangle.md) - the bounds of the display in DIP points.
* ` size `[ 尺寸](size.md)
* `workArea` [Rectangle](rectangle.md) - the work area of the display in DIP points.
* ` workAreaSize `[尺寸 ](size.md)
* `internal` 布尔值 - `true` for an internal display and `false` for an external display

` Display ` 对象表示一个连接到系统的物理显示。 一个伪 ` Display ` 可能存在于无图形界面（Gui）系统上, 或者 一个` Display ` 可能与一个远程的虚拟显示相对应。
