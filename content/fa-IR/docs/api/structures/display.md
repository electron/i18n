# نمایش دادن شئ

* id - (معنا:شناسه -نوع:شماره) - شناسه های خاص مربوط به صفحه نمایش.
* rotation - (معنا: چرخش - نوع:شماره) - چرخش صفحه نمایش در جهت عقربه های ساعت بر حسب درجه. می تواند(0 و 90 و 180 و 270) باشد.
* scaleFactor - (معنا: مقیاس عامل - نوع:شماره) - ضریب مقیاس خروجی دستگاه بر حسب پیکسل.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.