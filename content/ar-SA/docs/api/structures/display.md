# كائن Display

* `id` رقم - معرف فريد مرتبط بـ display.
* `rotation` رقم - يمكن أن يكون 0, 90, 180, 270, يمثل درجات دوران الشاشة في إتجاه عقارب الساعة.
* `scaleFactor` رقم - عامل قياس البكسل الخاص بأجهزة الإخراج.
* `touchSupport` سلسلة نصية - يمكن أن تكون `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.