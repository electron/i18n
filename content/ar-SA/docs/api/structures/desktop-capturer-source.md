# كائن DesktopCapturerSource

* `id` سلسلة نصية - المعرف الخاص بـ window أو screen والتي يمكن إستخدامها كقيد `chromeMediaSourceId` عند إستدعاء [`navigator.webkitGetUserMedia`]. شكل المعرف سوف يكون `window:XX` أو `screen:XX`, حيث `XX` هو رقم عشوائي.
* `name` سلسلة نصية - سيتم تسمية مصدر الشاشة إما `Entire Screen` أو `Screen <index>`, بينما إسم مصدر النافذة سيطابق عنوان النافذة.
* `thumbnail` [NativeImage](../native-image.md) - الصورة المصغرة. **ملحوظة:** ليس هناك ما يضمن أن حجم الصورة المصغرة هو نفسه `thumbnailSize` المحدد في `options` الممرر إلى `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.