# Voortgangsbalk in de taakbalk (Windows, macOS, eenheid)

Op Windows kan een taakbalkknop worden gebruikt om een voortgangsbalk weer te geven. Dit stelt een venster in staat om voortgangsinformatie aan de gebruiker te geven zonder dat de gebruiker hoeft over te schakelen naar het venster zelf.

Op macOS wordt de voortgangsbalk weergegeven als onderdeel van het dock icoon.

Unity DE heeft ook een vergelijkbare functie waarmee u de voortgang balk in de launcher kunt opgeven.

__Voortgangsbalk in taakbalk knop:__

![Taakbalk Voortgangsbalk][1]

Alle drie gevallen vallen onder dezelfde API - de `setProgressBar()` methode beschikbaar op instanties van `BrowserWindows`. Bel het met een nummer tussen `0` en `1` om uw voortgang aan te geven. Als je een langlopende taak hebt die momenteel op 63% is in de richting van voltooiing, zou je het noemen met `setProgressBar(0.63)`.

Algemeen gesproken de parameter instellen op een waarde onder nul (zoals `-1`) zal de voortgangsbalk verwijderen terwijl deze wordt ingesteld op een waarde hoger dan één (zoals `2`) zal de voortgangsbalk veranderen in de tussenmodus.

See the [API documentation for more options and modes][setprogressbar].

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress
