# DesktopCapturerSource Object

* `id` String - De id van een venster of scherm die gebruikt kan worden als `chromeMediaSourceId`-beperking bij het aanroepen van [`navigator.webkitGetUserMedia`]. Het formaat van de id zal zijn `window:XX` of `screen:XX`, waar `XX` een willekeurig gegenereerd getal is.
* `name` String - Een schermbron zal ofwel `Entire Screen` worden genoemd of `Screen <index>`, terwijl de naam van een vensterbron overeenkomt met de titel van het venster.
* `thumbnail` [NativeAfbeelding](../native-image.md) - Een miniatuurafbeelding. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. De werkelijke grootte hangt af van de grootte van het scherm of venster.
* `display_id` String - Een unieke id die overeenkomt met de `id` van de overeenkomende [Display](display.md) teruggegeven door de [Screen API](../screen.md). Op sommige platformen is dit gelijk aan `XX` deel van het `id` veld hierboven en op andere zal het verschillen. Het zal een lege string zijn als niet beschikbaar is.
* `appIcon` [NativeImage](../native-image.md) - An icon image of the application that owns the window or null if the source has a type screen. The size of the icon is not known in advance and depends on what the the application provides.
