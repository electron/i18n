# Display objekt

* `id` Number – unikátní identifikátor spojený s displayem.
* `rotation` Number – možné hodnoty jsou 0, 90, 180, 270 a reprezentují stupňovou rotaci obrazovky ve směru ručiček.
* `scaleFactor` Number – pixelové měřítko výstupního zařízení.
* `touchSupport` String – možné hodnoty jsou `available`, `unavailable` a `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

Objekt `Display` reprezentuje fyzický display spojený se systémem. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.