# Objeto DesktopCapturerSource

* `id` String - El identificador de una ventana o pantalla que puede ser usado como una restricción de `chromeMediaSourceId` cuando se llama a [`navigator.webkitGetUserMedia`]. El formato del identificador será `window:XX` o `screen:XX`, donde `XX` es un número generado aleatoriamente.
* `name` String - Un origen de pantalla sera nombrado como `Entire Screen` o `Screen <index>`, mientras que el nombre del origen de ventana coincidirá con el título de la ventana.
* `thumbnail` [NativeImage](../native-image.md) - Una imagen en miniatura. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. El tamaño real depende de la escala de la pantalla o ventana.
* `display_id` String - Un identificador único que va a corresponder el `id` que corresponda del [Display](display.md) retornado por el [Screen API](../screen.md). En algunas plataformas, esto será equivalente a la porción `XX` del campo `id` antes mencionado y en otras sera diferente. Será un string vació si no esta disponible.
* `appIcon` [NativeImage](../native-image.md) Un íncono de la aplicación que posee la ventana o nulo si el la fuente es de tipo pantalla. El tamaño del ícono no es conocido con antelación, depende de lo que la aplicación proporciona.
