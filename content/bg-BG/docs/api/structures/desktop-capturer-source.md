# Обект DesktopCapturerSource

* `id` String - Идентификатор на прозорец или екран, който може да бъде използван като `chromeMediaSourceId` константа при извикване на [`navigator.webkitGetUserMedia`]. Форматът на идентификатора ще бъде `window:XX` или `screen:XX`, където `ХХ` е случайно генерирано число.
* `name` String - Източник на екрана ще бъде наименуван или като `Entire Screen` или `Screen <index>`, докато името на източник на прозорец ще съвпада със заглавието на прозореца.
* `thumbnail` [NativeImage](../native-image.md) - Миниатюрно изображение. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.