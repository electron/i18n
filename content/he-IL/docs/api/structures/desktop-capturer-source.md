# אובייט DesktopCapturerSource

* String `id` - מזהה של window או screen שיכול להיות בשימוש בתור constraint של `chromeMediaSourceId` כאשר קוראים ל-[`navigator.webkitGetUserMedia`]. פורמט המזהה יהיה: `window:XX` או `screen:XX`, כאשר `XX` הוא מספר אקראי.
* String `name` - מקור ה-screen יהיה `Entire Screen` או `Screen`, כאשר השם של חלון המקור יהיה זהה לכותרת החלון.
* [NativeImage](../native-image.md) `thumbnail` - תמונה ממוזערת. **הערה:** אין הבטחה שגודל התמונה הממוזערת יהיה זהה ל-`thumbnailSize` שמוגדר ב-`options` שמועבר ל-`desktopCapture.getSources`. The actual size depends on the scale of the screen or window.
* `display_id` String - A unique identifier that will correspond to the `id` of the matching [Display](display.md) returned by the [Screen API](../screen.md). On some platforms, this is equivalent to the `XX` portion of the `id` field above and on others it will differ. It will be an empty string if not available.
* `appIcon` [NativeImage](../native-image.md) - An icon image of the application that owns the window or null if the source has a type screen. The size of the icon is not known in advance and depends on what the the application provides.