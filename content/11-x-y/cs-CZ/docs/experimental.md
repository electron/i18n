# Experimentální API

Některé z Electrons API jsou v dokumentaci označeny značkou `_Experimental_`. Tato značka označuje, že API nelze považovat za stabilní a API může být odstraněno nebo upraveno častěji než jiné API s menším varováním.

## Podmínky pro označení API jako experimentální

Každý může požádat o označení API jako experimentální ve funkci PR, Neshody týkající se experimentální povahy funkce mohou být diskutovány v API WG, pokud nelze vyřešit v PR.

## Proces odstranění experimentální značky

Jakmile je API stabilní a alespoň ve dvou hlavních stabilních linkách release může být nominováno na odstranění experimentálního tagu.  Tato diskuse by se měla uskutečnit na schůzce API WG.  Věci, které je třeba vzít v úvahu při diskusi / jmenování:

* Výše uvedená podmínka "dvou hlavních uvolňovacích linek" musí být splněna.
* Během té doby neměly být přijetím této funkce způsobeny žádné velké chyby / problémy
* API je dostatečně stabilní a nebylo silně ovlivněno aktualizacemi Chromium
* Je někdo používající API?
* Plní API původní navrhované využití, má nějaké mezery?
