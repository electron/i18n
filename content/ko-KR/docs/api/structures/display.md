# 디스플레이 개체

* `아이디` Number - 디스플레이와 관련된 고유 식별자.
* `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.