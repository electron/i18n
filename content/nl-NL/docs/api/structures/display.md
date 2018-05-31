# Display Object

* `id-` Number - Unieke identificatie die is gekoppeld aan het object.
* `rotation` Number - Opties zijn 0, 90, 180, 270. Stelt de schermrotatie voor in graden (kloksgewijs).
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.