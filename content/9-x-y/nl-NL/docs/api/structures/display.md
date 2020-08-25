# Display Object

* `id-` Number - Unieke identificatie die is gekoppeld aan het object.
* `rotation` Number - Opties zijn 0, 90, 180, 270. Stelt de schermrotatie voor in graden (kloksgewijs).
* `scaleFactor` Number - Geeft de pixel-schalingsfactor van het toestel terug.
* `touchSupport` String - Opties zijn `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Of het scherm een monochroom scherm is of niet.
* `accelerometerSupport` String - Kan `beschikbaar`, `niet beschikbaar`,`onbekend` zijn.
* `colorSpace` String - Geef een kleurruimte weer (3-dimensionaal object dat alle realiseerbare kleurcombinaties bevat) voor het doel van kleurconversies
* `colorDepth` Number - Het aantal bits per pixel.
* `depthPerComponent` Number - Het aantal bits per kleurcomponent.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` voor een interne weergave en `false` voor een externe weergave

Het `Display` object representeert een fysisch scherm aangesloten op het systeem. Een vals `Display` kan bestaan op een systeem zonder fysisch scherm, of een `Display` kan overeenkomen met een virtueel scherm op afstand.
