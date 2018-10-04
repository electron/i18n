# Об'єкт DesktopCapturerSource

* `id` String - Ідентифікатор вікна чи екрану, що може бути використаний як `chromeMediaSourceId` обмеження коли викликається [`navigator.webkitGetUserMedia`]. Формат ідентифікатора наступний `window:XX` чи `screen:XX`, де `XX` випадкове число.
* `name` String - Джерело екрану буде назване `Entire Screen` чи `Screen <index>`, тоді як джерело вікна буде відповідати його заголовку.
* `thumbnail` [NativeImage](../native-image.md) - Мініатюра. **Примітка:** Не гарантовано, що розмір мініатюри такий самий як `thumbnailSize`, визначеним в `options` переданих в `desktopCapturer.getSources`. Фактичний розмір залежить від масштабу екрану чи вікна.
* `display_id` String - A unique identifier that will correspond to the `id` of the matching [Display](display.md) returned by the [Screen API](../screen.md). On some platforms, this is equivalent to the `XX` portion of the `id` field above and on others it will differ. It will be an empty string if not available.