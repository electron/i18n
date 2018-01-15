# Display Object

* `id` Number - Natatanging tagatukoy na kaugnay sa display.
* `pag-ikot` Number - Maaring 0, 90, 180, 270, kumakatawan sa pag-ikot ng screen nang clock-wise degrees.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.