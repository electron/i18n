# powerSaveBlocker

> Bloquea al sistema para evitar que entre en el modo de bajo consumo (suspensión).

Proceso: [Main](../glossary.md#main-process)

Por ejemplo:

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Métodos

El módulo `powerSaveBlocker` tiene los siguientes métodos:

### `powerSaveBlocker.start(type)`

* `type` String - Power save blocker type.
  * `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Devuelve `Integer` - El ID bloqueador que se asigna al bloqueador de energía.

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Solo el tipo de mayor prioridad tiene efecto. En otras palabras, `prevent-display-sleep` tiene mayor prioridad sobre `prevent-app-suspension`.

Por ejemplo, una API llamada A solicita a `prevent-app-suspension`, y otra llamada B solicita a `prevent-display-sleep`. Se utilizará `prevent-display-sleep` hasta que B detenga su solicitud. Luego de eso, se utilizará `prevent-app-suspension`.

### `powerSaveBlocker.stop(id)`

* `id` Entero - El id de bloqueo de ahorro de energía devuelto por `powerSaveBlocker.start`.

Detiene el bloqueador de ahorro de energía especificado.

### `powerSaveBlocker.isStarted(id)`

* `id` Entero - El id de bloqueo de ahorro de energía devuelto por `powerSaveBlocker.start`.

Devuelve `Boolean` - Si ha iniciado el `powerSaveBlocker` correspondiente.
