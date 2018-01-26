# Oggetto FonteCatturatoreDesktop

* `id` Stringa - L'identificatore di una finestra o schermo utilizzabile come `FonteMediaIdchrome` costretta quando si chiama [`navigatore.kitwebOttieniMediaaUtente`]. Il formato dell'identificatore sarà `finestra:XX` o `schermo:XX`, dove `XX` é un numero generato casualmente.
* `nome` Stringa - Una fonte a schermo sarà nominata o `Schermo Intero` o `Schermo <index>`, mentre il nome di una fonte della finestra corrisponderà al titolo della finestra.
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.