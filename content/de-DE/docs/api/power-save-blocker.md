# powerSaveBlocker

> Verhindere, dass das System in den Stromspar-/Schlafmodus geht.

Prozess: [Main](../glossary.md#main-process)

Ein Beispiel:

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Methoden

Das `powerSaveBlocker`-Modul hat folgende Methoden:

### `powerSaveBlocker.start(type)`

* `type` String - Power Save Blocker-Typ.
  * `prevent-app-suspension` - Verhindern Sie, dass die Anwendung angehalten wird. Hält das System aktiv, lässt den Bildschirm jedoch ausgeschaltet werden. Beispiel anwendungsfälle: das Herunterladen einer Datei oder das Abspielen von Audio.
  * `prevent-display-sleep` - Verhindern Sie, dass das Display einschläft. Hält System und Bildschirm aktiv. Beispiel Anwendungsfall: Video abspielen.

Gibt `Integer` zurück - Die Blocker-ID, die diesem Power-Blocker zugeordnet ist.

Verhindert, dass das System in den Energiesparmodus wechselt. Gibt eine ganze Zahl zurück, den Energiesparblocker identifiziert.

**Hinweis:** `prevent-display-sleep` hat eine höhere Priorität gegenüber `prevent-app-suspension`. Nur der Typ mit der höchsten Priorität wird wirksam. Mit anderen Worten, `prevent-display-sleep` hat immer Vorrang vor `prevent-app-suspension`.

Beispielsweise fordert eine API, die A aufruft, `prevent-app-suspension`an und eine andere Aufrufen b-Anforderungen für `prevent-display-sleep`an. `prevent-display-sleep` wird verwendet, bis B seine Anforderung beendet. Danach wird `prevent-app-suspension` verwendet.

### `powerSaveBlocker.stop(id)`

* `id` Ganzzahl - Die Power Save Blocker-ID, die von `powerSaveBlocker.start`zurückgegeben wird.

Stoppt den angegebenen Energiesparblocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Ganzzahl - Die Power Save Blocker-ID, die von `powerSaveBlocker.start`zurückgegeben wird.

Gibt `Boolean` zurück - Gibt an, ob die entsprechende `powerSaveBlocker` gestartet wurde.
