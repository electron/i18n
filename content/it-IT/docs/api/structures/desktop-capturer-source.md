# Oggetto DesktopCapturerSource

* `id` Stringa - L'identificatore di una finestra o schermo utilizzabile come constraint `chromeMediaSourceId` quando si invoca [`navigator.webkitGetUserMedia`]. Il formato dell'identificatore sarà `window:XX` oppure `screen:XX`, dove `XX` è un numero generato casualmente.
* `name` Stringa - Una sorgente scherom sarà chiamata o `Entire Screen` o `Screen <index>`, mentre il nome di una sorgente finestra corrisponderà al titolo della finestra.
* `miniatura` [ImmagineNativa](../native-image.md) - Una miniatura di un'immagine. **Note:** Non si garantisce che la taglia della miniatura sia uguale alle `DimensioniMiniatura` specificate nelle `opzioni` passate a `Catturatoredesktop.ottieniFonti`. La taglia attuale dipende dalla scala dello schermo o della finestra.