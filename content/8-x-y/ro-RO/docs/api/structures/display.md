# Display Object

* `id` Number - Identificator unic asociat cu afișajul.
* `rotation` Number - Poate fi 0, 90, 180, 270, reprezintă rotirea ecranului în grade în ceas.
* `scaleFactor` Number - Factor de scală pixel al dispozitivului de ieșire.
* `touchSupport` String - Poate fi `disponibil`, `indisponibil`, `necunoscut`.
* `monochrome` Boolean - Indiferent dacă ecranul este sau nu un ecran monocrom.
* `accelerometerSupport` String - Poate fi `disponibil`, `indisponibil`, `necunoscut`.
* `colorSpace` String - reprezintă un spațiu de culoare (object tridimensional care conține toate combinațiile de culori realizabile) în scopul conversiilor de culori
* `colorDepth` Number - Numărul de biți per pixel.
* `depthPerComponent` Number - Numărul de biți per componentă de culoare.
* `bounds` [Rectangle](rectangle.md)
* `size` [Dimensiune](size.md)
* `workArea` [Dreptunghi](rectangle.md)
* `workAreaSize` [Dimensiune](size.md)
* `internal` Boolean - `true` pentru un afișaj intern și `false` pentru un afișaj extern

Obiectul `Display` reprezintă un afișaj fizic conectat la sistem. Un fals `Display` poate exista pe un sistem fără cap sau un `Display` poate corespunde un ecran de la distanță, virtuale.
