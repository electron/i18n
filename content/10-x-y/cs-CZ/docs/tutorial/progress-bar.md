# Lišta pokroku na panelu úkolů (Windows, macOS, Unity)

V systému Windows lze použít tlačítko na hlavní liště k zobrazení ukazatele průběhu. This enables a window to provide progress information to the user without the user having to switch to the window itself.

Na macOS se ukazatel průběhu zobrazí jako součást ikony doku.

Unity DE má také podobnou funkci, která vám umožňuje určit ukazatel postupu v spouštěči.

__Ukazatel průběhu na tlačítku hlavního panelu:__

![Lišta pokroku v hlavním panelu][1]

Na všechny tři případy se vztahuje stejné API - `setProgressBar()` metoda dostupná na instancích `BrowserWindows`. Zavolejte jí číslo v rozmezí od `0` do `1` k označení vašeho postupu. Pokud máte dlouhotrvající úkol, který je na 63% k dokončení, zavoláte mu `setProgressBar(0.63)`.

Obecně řečeno, nastavení parametru na hodnotu pod nulou (jako `-1`) odstraní ukazatel průběhu při jeho nastavení na hodnotu vyšší než jedna (jako `2`) přepne ukazatel průběhu do režimu meziproduktů.

See the [API documentation for more options and modes][setprogressbar].

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress
