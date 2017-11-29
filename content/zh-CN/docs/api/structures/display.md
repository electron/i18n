# 显示对象

* `id`数字-与显示相关联的唯一的标志符
* `rotation `数字--可以是 0, 90, 180, 270, 代表屏幕旋转角度。
* ` scaleFactor `数字-输出设备的像素比例因子。
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.