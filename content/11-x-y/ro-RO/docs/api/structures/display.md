# Display Object

* `id` Number - Unique identifier associated with the display.
* `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* ` colorSpace ` String - reprezintă un spațiu de culoare (object tridimensional care conține toate combinațiile de culori realizabile) în scopul conversiilor de culori
* ` colorDepth ` Number - Numărul de biți pe pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.
