# كائن Display

* `id` رقم - معرف فريد مرتبط بـ display.
* `rotation` رقم - يمكن أن يكون 0, 90, 180, 270, يمثل درجات دوران الشاشة في إتجاه عقارب الساعة.
* `scaleFactor` رقم - عامل قياس البكسل الخاص بأجهزة الإخراج.
* `touchSupport` سلسلة نصية - يمكن أن تكون `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

كائن `Display` يمثل المعرض المادي المتصل بالنظام. الـ `Display` الزائفة قد توجد في نظام لا يحتوي على وحدة عرض، أو الـ `Display` يمكن أن تتوافق مع شاشة العرض الإفتراضية.