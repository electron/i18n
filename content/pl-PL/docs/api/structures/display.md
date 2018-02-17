# Obiekt Display

* `id` Number - Unikalny identyfikator powiązany z wyświetlaczem.
* `rotation` Number - może być równa 0, 90, 180, 270, reprezentuje obrót ekranu w stopniach według ruchu wskazówek zegara.
* `scaleFactor` Numer - współczynnik skali pikseli urządzenia wyjściowego.
* `touchSupport` String - może przyjmować wartości `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

Obiekt `Display` reprezentuje fizyczny wyświetlacz połączony z systemem. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.