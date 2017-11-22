# DesktopCapturerSource Объект

* `id` String - Идентификатор окна или экрана, который может использоваться как `chromeMediaSourceId` ограничение при вызове [`navigator.webkitGetUserMedia`]. Формат идентификатора будет `window:XX` или `screen:XX`, где `XX` является случайным сгенерированным числом.
* `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.