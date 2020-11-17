# Oggetto Display

* `id` Numero - Identificatore univoco associato al display.
* `rotation` Numero - Può essere 0, 90, 180, 270 e rappresenta la rotazione dello schermo in gradi in senso orario.
* `scaleFactor` Numero - Fattore di scala in pixel del dispositivo di output.
* `touchSupport` Stringa - Può essere `available`, `unavailable` o `unknown`.
* `monocrome` Booleano - Se il display è o meno un display monocromatico.
* `touchSupport` Stringa - Può essere `available`, `unavailable` o `unknown`.
* `colorSpace` Stringa - rappresentano uno spazio di colore (oggetto tridimensionale che contiene tutte le combinazioni di colori realizzabili) allo scopo di conversioni di colori
* `colorDepth` Numero - Il numero di bit per pixel.
* `depthPerComponent` Numero - Il numero di bit per componente di colore.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `interno` Booleano - `vero` per un display interno e `false` per un display esterno

L'oggetto `Display` rappresenta un display fisico connesso al sistema. Un finto `Display` potrebbe esistere in un sistema headless, o un `Display` potrebbe corrispondere ad un display virtuale remoto.
