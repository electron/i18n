# Đối tượng display

* `id` Number - Unique identifier associated with the display.
* `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

Đối tượng `display` đại diện cho một màn hình vật lý được kết nối với hệ thống. Một `Display` giả có thể tồn tại trên một headless system (hệ thống không có màn hình, giao diện người dùng; các thiết bị ngoại vi,...), hoặc `Display` có thể tương ứng với một màn hình ảo, màn hình từ xa.
