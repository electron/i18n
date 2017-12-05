# شئِ دریافت کننده‌ی منبعِ دسکتاپ

* `شناسه` رشته - مشخص کننده ی یک صفحه که می تواند به عنوان یک `منبع رسانه ای کروم` در هنگام فراخوانی استفاده شود. [`navigator.webkitGetUserMedia`]. The format of the identifier will be `window:XX` or `screen:XX`, where `XX` is a random generated number.
* `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.