# Display Object

* `id-` Number - Unieke identificatie die is gekoppeld aan het object.
* `rotation` Number - Opties zijn 0, 90, 180, 270. Stelt de schermrotatie voor in graden (kloksgewijs).
* `scaleFactor` Number - Geeft de pixel-schalingsfactor van het toestel terug.
* `touchSupport` String - Opties zijn `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

Het `Display` object representeert een fysisch scherm aangesloten op het systeem. Een vals `Display` kan bestaan op een systeem zonder fysisch scherm, of een `Display` kan overeenkomen met een virtueel scherm op afstand.