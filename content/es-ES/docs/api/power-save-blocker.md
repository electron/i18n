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
  * `prevent-app-suspension` - Evita que la aplicación sea suspendida. Mantiene el sistema activo pero permite apagar la pantalla. Ejemplo de casos de uso: descargar un archivo o reproducir audio.
  * `prevent-display-sleep` - Evita que la pantalla quede inactiva. Mantiene el sistema y la pantalla activos. Ejemplo de caso de uso: reproducción de video.

Devuelve `Integer` - El ID bloqueador que se asigna al bloqueador de energía.

Inicia evitando que el sistema entre en modo de bajo consumo. Devuelve un entero que identifica el bloqueador de ahorro de energía.

**Nota:** `prevent-display-sleep` tiene mayor prioridad sobre `prevent-app-suspension`. Solo el tipo de mayor prioridad tiene efecto. En otras palabras, `prevent-display-sleep` tiene mayor prioridad sobre `prevent-app-suspension`.

Por ejemplo, una API llamada A solicita a `prevent-app-suspension`, y otra llamada B solicita a `prevent-display-sleep`. Se utilizará `prevent-display-sleep` hasta que B detenga su solicitud. Luego de eso, se utilizará `prevent-app-suspension`.

### `powerSaveBlocker.stop(id)`

* `id` Entero - El id de bloqueo de ahorro de energía devuelto por `powerSaveBlocker.start`.

Detiene el bloqueador de ahorro de energía especificado.

### `powerSaveBlocker.isStarted(id)`

* `id` Entero - El id de bloqueo de ahorro de energía devuelto por `powerSaveBlocker.start`.

Devuelve `Boolean` - Si ha iniciado el `powerSaveBlocker` correspondiente.
