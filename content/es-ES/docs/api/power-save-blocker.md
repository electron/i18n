# powerSaveBlocker

> Bloquea al sistema para evitar que entre en el modo de bajo consumo (suspensión).

Proceso: [Main](../glossary.md#main-process)

Por ejemplo:

```javascript
const {powerSaveBlocker} = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Métodos

El módulo `powerSaveBlocker` tiene los siguientes métodos:

### `powerSaveBlocker.start(type)`

* `type` Cadena - El tipo de bloqueo de ahorro de energía. 
  * `prevent-app-suspension` - Evita que la aplicación se suspenda. Mantiene el sistema activo pero permite que la pantalla se apague. Por ejemplo en el caso de descargar un archivo o reproducir audio.
  * `prevent-display-sleep` - Evita que la pantalla se suspenda. Mantiene tanto el sistema como la pantalla activa. Por ejemplo al reproducir un video.

Devuelve `Integer` - El ID bloqueador que se asigna al bloqueador de energía

Comienza evitando que el sistema entre en modo bajo consumo de energía. Devuelve un entero que identifica el bloqueador de ahorro de energía.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.