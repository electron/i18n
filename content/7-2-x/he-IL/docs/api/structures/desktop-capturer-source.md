# אובייט DesktopCapturerSource

* String `id` - מזהה של window או screen שיכול להיות בשימוש בתור constraint של `chromeMediaSourceId` כאשר קוראים ל-[`navigator.webkitGetUserMedia`]. פורמט המזהה יהיה: `window:XX` או `screen:XX`, כאשר `XX` הוא מספר אקראי.
* String `name` - מקור ה-screen יהיה `Entire Screen` או `Screen`, כאשר השם של חלון המקור יהיה זהה לכותרת החלון.
* [NativeImage](../native-image.md) `thumbnail` - תמונה ממוזערת. **הערה:** אין הבטחה שגודל התמונה הממוזערת יהיה זהה ל-`thumbnailSize` שמוגדר ב-`options` שמועבר ל-`desktopCapture.getSources`. הגודל בפועל תלוי בקנה המידה של המסך או החלון.
* String `display_id` - מזהה ייחודי שיתאים ל-`id` שזוהה על-ידי [Display](display.md) שהוחזר מ-[Screen API](../screen.md). בפלטפורמות מסוימות, זהו שווה ערך לחלק ה-`XX` בשדה `id` שמעל, ועבור אחרים, הוא יהיה שונה. הוא יהיה string ריק אם לא יסופק.
* [NativeImage](../native-image.md) `appIcon` - תמונת icon של התוכנה שבבעלות החלון או null אם המקור הוא מסוג screen. הגודל של ה-icon לא ידוע מראש ותלוי במה שהתוכנה מספקת.
