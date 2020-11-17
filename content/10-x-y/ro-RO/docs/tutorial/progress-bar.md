# Bara de progres în bara de activități (Windows, macOS, Unitate)

Pe Windows un buton din bara de activități poate fi folosit pentru a afișa o bară de progres. Aceasta activează o fereastră pentru a oferi utilizatorului informații de progres fără ca utilizatorul să trebuie să comute la fereastra în sine.

Pe macOS bara de progres va fi afișată ca parte a iconiței de andocare.

Unity DE are, de asemenea, o caracteristică similară care vă permite să specificați bara de progres în launcher.

__Bara de progres în bara de activităţi:__

![Bara de progres a barei de activități][1]

Toate cele trei cazuri sunt acoperite de acelaşi API - metoda `setProgressBar()` disponibilă pe instanţele `BrowserWindows`. Sună-l cu un număr între `0` şi `1` pentru a indica progresul tău. Dacă ai o sarcină lungă care este în prezent la 63% spre finalizare, o poți numi cu `setProgressBar(0.63)`.

În general, setarea parametrului la o valoare sub zero (ca `-1`) va elimina bara de progres în timp ce o va seta la o valoare mai mare de un (ca `2`) va comuta bara de progres în modul intermediar.

See the [API documentation for more options and modes][setprogressbar].

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress
