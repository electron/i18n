# Объект DesktopCapturerSource

* `id` String - идентификатор окна или экрана, который может использоваться как `chromeMediaSourceId` ограничение при вызове [`navigator.webkitGetUserMedia`]. Формат идентификатора будет `window:XX` или `screen:XX`, где `XX` является случайным сгенерированным числом.
* `name` String - источник экрана будет называться `Entire Screen` или `Screen <index>`, в то время как имя источника окна будет соответствовать заголовку окна.
* `thumbnail` [NativeImage](../native-image.md) - изображение миниатюры. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. Фактический размер зависит от масштаба экрана или окна.
* `display_id` String - уникальный идентификатор, который будет соответствовать `id` объекта [Display](display.md), возвращаемого [Screen API](../screen.md). На некоторых платформах, это эквивалентно части `XX` поля `id`, расположенного выше, а на других оно будет отличаться. Если он недоступен, будет пустая строка.
* `appIcon` [NativeImage](../native-image.md) - изображение иконки приложения, которое имеет окно или null, если источник имеет тип экрана. Размер значка не известен заранее и зависит от того, что предоставляет приложение.
