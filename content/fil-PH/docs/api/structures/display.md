# Mga bagay sa Display

* `id` Number - Natatanging tagatukoy na may kaugnayan sa display.
* `rotation` Number - Maaring 0, 90, 180, 270, na kumakatawan sa pag-ikot ng screen nang clock-wise degrees.
* `scaleFactor` Number - dahilan ng sukat ng pixel ng output device.
* `touchSupport` String - Maaring `magagamit`, `hindi magagamit`, `hindi kilala`.
* `mga hangganan`[Parihaba](rectangle.md)
* `laki`[Laki](size.md)
* `workArea` [Parihaba](rectangle.md)
* `workAreaSize` [Laki](size.md)

Ang `Display` object ay kumakatawan sa isang pisikal na display na konektado sa sistema. Isang pekeng `Display` ang maaring umiral sa isang headless na sistema, o isang `Display` ay maaring tumugma sa isang remote, virtual display.