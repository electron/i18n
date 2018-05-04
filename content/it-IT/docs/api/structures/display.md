# Oggetto Display

* `id` Numero - Identificatore univoco associato al display.
* `rotation` Numero - Può essere 0, 90, 180, 270 e rappresenta la rotazione dello schermo in gradi in senso orario.
* `scaleFactor` Numero - Fattore di scala in pixel del dispositivo di output.
* `touchSupport` Stringa - Può essere `available`, `unavailable` o `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

L'oggetto `Display` rappresenta un display fisico connesso al sistema. Un finto `Display` potrebbe esistere in un sistema headless, o un `Display` potrebbe corrispondere ad un display virtuale remoto.