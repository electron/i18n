# Display Object

* `id` Number - Natatanging tagatukoy na kaugnay sa display.
* `pag-ikot` Number - Maaring 0, 90, 180, 270, kumakatawan sa pag-ikot ng screen nang clock-wise degrees.
* `scaleFactor` Number - Nag-aa-output ng factor ng sukat ng pixel ng device.
* `touchSupport` String - Maaring `magagamit`, `hindi magagamit`, `hindi kilala`.
* `mga hangganan`[Parihaba](rectangle.md)
* `laki`[Laki](size.md)
* `workArea` [Parihaba](rectangle.md)
* `workAreaSize` [Laki](size.md)

Ang `Display` object ay kumakatawan sa isang pisikal na display na konektado sa sistema. Isang pekeng `Display` ang maaring umiral sa isang headless na sistema, o isang `Display` ay maaring tumugma sa isang remote, virtual display.