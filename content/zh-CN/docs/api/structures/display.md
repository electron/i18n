# Display对象

* `id`数字-与显示相关联的唯一的标志符
* `rotation `数字--可以是 0, 90, 180, 270, 代表屏幕旋转角度。
* ` scaleFactor `数字-输出设备的像素比例因子。
* ` touchSupport `字符串--可以是 `available `、`unavailable `、` unknown `。
* ` bounds`[ 矩形 ](rectangle.md)
* ` size `[ 尺寸](size.md)
* ` bounds`[ 矩形 ](rectangle.md)
* ` workAreaSize `[尺寸 ](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.