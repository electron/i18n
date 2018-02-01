# Oggetto Display

* `id` Numero - Unico identificatore associato al display.
* `rotazione` Numero - Può essere 0, 90, 180, 270 e rappresenta la rotazione dello schermo in gradi in senso orario.
* `Fattorescala` Numero - Fattore di scala in pixel del dispositivo d'uscita.
* `Supportotocco` Stringa - Può essere `disponibile`, `non disponibile`, `sconosciuto`.
* `limiti` [Rettangolo](rectangle.md)
* `dimensione` [Dimensione](size.md)
* `Arealavoro` [Rettangolo](rectangle.md)
* `DimensioniArealavoro` [Dimensioni](size.md)

L'oggetto `Display` rappresenta un display fisico connesso al sistema. Un finto `Display` potrebbe esistere in un sistema senza capo, o un `Display` potrebbe corrispondere ad un display remoto e virtuale.