# Display Object

* `id` Number - Unique identifier associated with the display.
* `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Pode ser `available`, `unavailable` ou `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Tamanho](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.