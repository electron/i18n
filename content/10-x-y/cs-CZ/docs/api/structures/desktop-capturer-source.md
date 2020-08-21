# Objekt DesktopCapturerSource

* `id` Text - Identifikátor okna, nebo obrazovky - bude použit jako `chromeMediaSourceId` omezení během volání [`navigator.webkitGetUserMedia`]. Formát identifikátoru je `window:XX` nebo `screen:XX`, kde `XX` je náhodně číslo.
* `name` Text - Název obrazovky pojmenované výše `celá obrazovka` nebo `Obrazovka <index>`, pokud název zdrojového okna odpovídá nadpisu okna.
* `thumbnail` [NativeImage](../native-image.md) - Obrázek s náhledem. **POZOR:** Není zaručeno, že velikost náhledu bude odpovídat parametru `thumbnailSize` nastavenému v `options` předanému `desktopCapturer.getSources`. Skutečná velikost závisí na poměru obrazovky, nebo okna.
* `display_id` Text - unikátní identifikátor odpovídající `id` odpovídajícího [Display](display.md) vráceného od [Screen API](../screen.md). Na některých platformách odpovídá `XX` části `id` záznamu výše, v některých je různá. Pokud není dostupné, vrací prázdný řetězec.
* `appIcon` [NativeImage](../native-image.md) - An icon image of the application that owns the window or null if the source has a type screen. The size of the icon is not known in advance and depends on what the the application provides.
