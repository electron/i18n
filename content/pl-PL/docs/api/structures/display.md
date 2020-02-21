# Obiekt Display

* `id` Number - Unikalny identyfikator powiązany z wyświetlaczem.
* `rotation` Number - może być równy 0, 90, 180, 270, reprezentuje obrót ekranu w stopniach według ruchu wskazówek zegara.
* `scaleFactor` Numer - współczynnik skali pikseli urządzenia wyjściowego.
* `touchSupport` String - może przyjmować wartości `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String - represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - Liczba bitów na piksel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` dla wyświetlacza wewnętrznego i `false` dla wyświetlacza zewnętrznego

Obiekt `Display` reprezentuje fizyczny wyświetlacz połączony z systemem. Fałszywy `Display` może istnieć w systemie headless, lub `Display` może odpowiadać do wirtualnego, zdalnego wyświetlacza.