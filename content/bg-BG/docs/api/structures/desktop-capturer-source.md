# Обект DesktopCapturerSource

* `id` String - Идентификатор на прозорец или екран, който може да бъде използван като `chromeMediaSourceId` константа при извикване на [`navigator.webkitGetUserMedia`]. Форматът на идентификатора ще бъде `window:XX` или `screen:XX`, където `ХХ` е случайно генерирано число.
* `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.