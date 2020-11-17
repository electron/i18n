# Obiekt Display

* `id` Number - Unikalny identyfikator powiązany z wyświetlaczem.
* `rotation` Number - może być równy 0, 90, 180, 270, reprezentuje obrót ekranu w stopniach według ruchu wskazówek zegara.
* `scaleFactor` Numer - współczynnik skali pikseli urządzenia wyjściowego.
* `touchSupport` String - może przyjmować wartości `available`, `unavailable`, `unknown`.
* `monochrome` - określa czy wyświetlacz jest wyświetlaczem monochromatycznym.
* `accelerometerSupport` String - może przyjmować wartości `available`, `unavailable`, `unknown`.
* `colorSpace` String -  reprezentuje przestrzeń kolorów (trójwymiarowy obiekt, który zawiera wszystkie możliwe kombinacje kolorów) na potrzeby konwersji kolorów
* `colorDepth` Number - Liczba bitów na piksel.
* `depthPerComponent` Liczba - Liczba bitów na komponent koloru.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` dla wyświetlacza wewnętrznego i `false` dla wyświetlacza zewnętrznego

Obiekt `Display` reprezentuje fizyczny wyświetlacz połączony z systemem. Fałszywy `Display` może istnieć w systemie headless, lub `Display` może odpowiadać do wirtualnego, zdalnego wyświetlacza.
