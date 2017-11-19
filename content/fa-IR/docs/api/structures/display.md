# نمایش دادن شئ

* id - (معنا:شناسه -نوع:شماره) - شناسه های خاص مربوط به صفحه نمایش.
* rotation - (معنا: چرخش - نوع:شماره) - چرخش صفحه نمایش در جهت عقربه های ساعت بر حسب درجه. می تواند(0 و 90 و 180 و 270) باشد.
* scaleFactor - (معنا: مقیاس عامل - نوع:شماره) - ضریب مقیاس خروجی دستگاه بر حسب پیکسل.
* touchSupport - (معنا:پشتیبانی از لمس - نوع: رشته) - می تواند available , unavailable , unknown باشد. (مقدار ها به ترتیب به معنای در دسترس , عدم دسترسی و نا شناخته هستند)
* size - (معنا: حدود - نوع: چهارگوش) - فاقد توضیح
* size - (معنا: اندازه - نوع: اندازه) - فاقد توضیح
* workArea - (معنا: ناحیه کاری - نوع: مستطیل) - فاقد توضیح
* workAreaSize - (معنا: اندازه ناحیه کاری - نوع: مسطیل) - فاقد توضیح

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.