# كائن Display

* `id` رقم - معرف فريد 0مرتبط بـ display.
* `rotation` رقم - يمكن أن يكون 0, 90, 180, 270, يمثل درجات دوران الشاشة في إتجاه عقارب الساعة.
* `scaleFactor` رقم - عامل قياس البكسل الخاص بأجهزة الإخراج.
* `touchSupport` سلسلة نصية - يمكن أن تكون `available`, `unavailable`, `unknown`.
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

كائن `Display` يمثل المعرض المادي المتصل بالنظام. الـ `Display` الزائفة قد توجد في نظام لا يحتوي على وحدة عرض، أو الـ `Display` يمكن أن تتوافق مع شاشة العرض الإفتراضية.
