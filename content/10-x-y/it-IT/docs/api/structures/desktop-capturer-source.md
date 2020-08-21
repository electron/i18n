# Oggetto DesktopCapturerSource

* `id` Stringa - L'identificatore di una finestra o schermo utilizzabile come constraint `chromeMediaSourceId` quando si invoca [`navigator.webkitGetUserMedia`]. Il formato dell'identificatore sarà `window:XX` oppure `screen:XX`, dove `XX` è un numero generato casualmente.
* `name` Stringa - Una sorgente scherom sarà chiamata o `Entire Screen` o `Screen <index>`, mentre il nome di una sorgente finestra corrisponderà al titolo della finestra.
* `thumbnail` [NativeImage](../native-image.md) - Una miniatura di un'immagine. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. La dimensione attuale dipende dalla scala dello schermo o della finestra.
* `display_id` String - Un identificativo univoco che corrisponderà all' `id` dell'accoppiamento con [Display](display.md) restituito dallo [Screen API](../screen.md). Su alcune piattaforme, questa è equivalente alla porzione `XX` del campo `id` sopra e su altri differirà. Sarà una stringa vuota se non è disponibile.
* `appIcon` [NativeImage](../native-image.md) - An icon image of the application that owns the window or null if the source has a type screen. La dimensione dell'icona non è conosciuta in anticipo e dipende da quella fornita dall'applicazione.
