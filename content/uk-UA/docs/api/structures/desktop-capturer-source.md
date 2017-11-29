# Об'єкт DesktopCapturerSource

* `id` String - Ідентифікатор вікна чи екрану, що може бути використаний як `chromeMediaSourceId` обмеження коли викликається [`navigator.webkitGetUserMedia`]. Формат ідентифікатора наступний `window:XX` чи `screen:XX`, де `XX` випадкове число.
* `name` String - Джерело екрану буде назване `Entire Screen` чи `Screen <index>`, тоді як джерело вікна буде відповідати його заголовку.
* `thumbnail` [NativeImage](../native-image.md) - Мініатюра. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.