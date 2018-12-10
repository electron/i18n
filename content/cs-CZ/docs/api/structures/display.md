# Objekt Display

* `id` Číslo – unikátní identifikátor spojený s displayem.
* `rotation` Číslo – možné hodnoty jsou 0, 90, 180, 270 a reprezentují stupňovou rotaci obrazovky ve směru ručiček.
* `scaleFactor` Číslo – pixelové měřítko výstupního zařízení.
* `touchSupport` Text – možné hodnoty jsou `available`, `unavailable` a `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

Objekt `Display` reprezentuje fyzický display spojený se systémem. `Display` může být emulovaný na headless systémech, anebo může `Display` odpovídat vzdálenému virtuálnímu display.