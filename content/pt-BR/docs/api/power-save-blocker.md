# powerSaveBlocker

> Block the system from entering low-power (sleep) mode.

Processo: [Main](../glossary.md#main-process)

Como por exemplo:

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Métodos

The `powerSaveBlocker` module has the following methods:

### `powerSaveBlocker.start(type)`

* `type` String - Power save blocker type.
  * `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Returns `Integer` - The blocker ID that is assigned to this power blocker.

Starts preventing the system from entering lower-power mode. Retorna um inteiro identificar o bloqueador de economia de energia.

**Nota:** `prevent-display-sleep` tem maior precedência sobre `prevent-app-suspension`. Apenas o tipo de maior precedência faz efeito. Em outras palavras, `prevent-display-sleep` sempre prevalece sobre `prevent-app-suspension`.

Por exemplo, uma API chamando A solicitações de `prevent-app-suspension`e outro chamado B solicita `prevent-display-sleep`. `prevent-display-sleep` serão utilizadas até que B pare sua solicitação. Depois disso, `prevent-app-suspension` é usado.

### `powerSaveBlocker.stop(id)`

* `id` Integer - O bloqueio de energia devolvido por `powerSaveBlocker.start`.

Pára o bloqueador de salvamento de energia especificado.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - O bloqueio de energia devolvido por `powerSaveBlocker.start`.

Retornos `Boolean` - Se a `powerSaveBlocker` correspondente já começou.
