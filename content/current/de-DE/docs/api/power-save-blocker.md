# powerSaveBlocker

> Verhindere, dass das System in den Stromspar-/Schlafmodus geht.

Prozess: [Haupt](../glossary.md#main-process)

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

* `type` String - Power Save Blocker Typ. 
  * `prevent-app-suspension` - Verhindert, dass die Anwendung unterbrochen wird. Hält das System aktiv, aber erlaubt es den Bildschirm abzuschalten. Anwendungsbeispiele: Eine Datei herunterladen, oder Audio abspielen.
  * `prevent-display-sleep` - Verhindert, dass der Bildschirm einschläft. Hält sowohl System als auch Bildschirm aktiv. Anwendungsbeispiel: Videowiedergabe.

Gibt `Integer` zurück - Die Blocker-ID, die diesem Power-Blocker zugeordnet ist.

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.