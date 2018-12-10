# Objekt DesktopCapturerSource

* `id` Text - Identifikátor okna, nebo obrazovky - bude použit jako `chromeMediaSourceId` omezení během volání [`navigator.webkitGetUserMedia`]. Formát identifikátoru je `window:XX` nebo `screen:XX`, kde `XX` je náhodně číslo.
* `name` Text - Název obrazovky pojmenované výše `celá obrazovka` nebo `Obrazovka <index>`, pokud název zdrojového okna odpovídá nadpisu okna.
* `thumbnail` [NativeImage](../native-image.md) - Obrázek s náhledem. **POZOR:** Není zaručeno, že velikost náhledu bude odpovídat parametru `thumbnailSize` nastavenému v `options` předanému `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.
* `display_id` String - A unique identifier that will correspond to the `id` of the matching [Display](display.md) returned by the [Screen API](../screen.md). On some platforms, this is equivalent to the `XX` portion of the `id` field above and on others it will differ. It will be an empty string if not available.