# Объект DesktopCapturerSource

* `id` String - идентификатор окна или экрана, который может использоваться как `chromeMediaSourceId` ограничение при вызове [`navigator.webkitGetUserMedia`]. Формат идентификатора будет `window:XX` или `screen:XX`, где `XX` является случайным сгенерированным числом.
* `name` String - источник экрана будет называться `Entire Screen` или `Screen <index>`, в то время как имя источника окна будет соответствовать заголовку окна.
* `thumbnail` [NativeImage](../native-image.md) - изображение миниатюры. **Примечание:** нет гарантии, что размер миниатюры совпадёт с размером `thumbnailSize` указанных в `options` переданных от `desktopCapturer.getSources`. Фактический размер зависит от масштаба экрана или окна.