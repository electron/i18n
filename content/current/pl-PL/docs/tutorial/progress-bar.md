# Pasek postępu w pasku zadań (Windows, macOS, Unity)

W systemie Windows przycisk paska zadań może służyć do wyświetlania paska postępu. Pozwala to na przekazywanie informacji o postępach użytkownikowi bez konieczności przełączenia się do samego okna.

W systemie MacOS pasek postępu będzie wyświetlany jako część ikony dock'a.

Unity DE posiada również podobną funkcję, która pozwala określić pasek postępu w launcherze.

__Pasek postępu na pasku zadań:__

![Pasek postępu paska zadań](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Wszystkie trzy przypadki są objęte tym samym API - metoda `setProgressBar()` dostępna na instancjach `BrowserWindows`. Zadzwoń z numerem między `0` i `1` aby wskazać swoje postępy. Jeśli masz długotrwałe zadanie, które obecnie osiąga 63% w celu ukończenia, zadzwonisz do niego z `setProgressBar(0,63)`.

Ogólnie rzecz biorąc, ustawienie parametru na wartość poniżej zera (jak `-1`) usunie pasek postępu podczas ustawiania go na wartość wyższą niż jeden (jak `2`) przełączy pasek postępu na tryb pośredni.

Zobacz [Dokumentacje API dla większej liczby opcji i trybów](../api/browser-window.md#winsetprogressbarprogress-options).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```
