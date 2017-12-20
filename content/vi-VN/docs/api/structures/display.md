# Đối tượng display

* `id` Number - Unique identifier associated with the display.
* `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

Đối tượng `display` đại diện cho một màn hình vật lý được kết nối với hệ thống. Một `Display` giả có thể tồn tại trên một headless system (hệ thống không có màn hình, giao diện người dùng; các thiết bị ngoại vi,...), hoặc `Display` có thể tương ứng với một màn hình ảo, màn hình từ xa.