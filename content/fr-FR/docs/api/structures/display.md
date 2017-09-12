# Objet Display

* `id` Number - Identificateur unique associé à l'affichage.
* `rotation` Number - Peut être 0, 90, 180, 270, représente la rotation de l'écran en degrés dans le sens horaire.
* `scaleFactor` Number - Facteur d'échelle en pixel du périphérique de sortie.
* `touchSupport` String - Peut être `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

L’objet `Display` représente un affichage physique connecté au système. Un faux `Display` existe peut-être sur un système sans en-tête, ou un `Display` peut correspondre à un écran virtuel distant.