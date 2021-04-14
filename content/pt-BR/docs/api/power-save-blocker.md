# powerSaveBlocker

> Bloqueie o sistema de entrar no modo de baixa potência (sono).

Processo: [Main](../glossary.md#main-process)

Como por exemplo:

```javascript
const { powerSaveBlocker } = require ('electron')

const id = powerSaveBlocker.start ('prevent-display-sleep')
console.log (powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Métodos

O módulo `powerSaveBlocker` tem os seguintes métodos:

### `powerSaveBlocker.start(tipo)`

* `type` String - Tipo de bloqueador de energia.
  * `prevent-app-suspension` - Impedir que o pedido seja suspenso. Mantém o sistema ativo, mas permite que a tela seja desligada. Exemplos de casos de uso: baixar um arquivo ou reproduzir áudio.
  * `prevent-display-sleep` - Evite que o display durma. Mantém sistema e tela ativos. Caso de uso de exemplo: reprodução de vídeo.

Devoluções `Integer` - O ID do bloqueador atribuído a este bloqueador de energia.

Começa a impedir que o sistema entre no modo de baixa potência. Retorna um inteiro identificar o bloqueador de economia de energia.

**Nota:** `prevent-display-sleep` tem maior precedência sobre `prevent-app-suspension`. Apenas o tipo de maior precedência faz efeito. Em outras palavras, `prevent-display-sleep` sempre prevalece sobre `prevent-app-suspension`.

Por exemplo, uma API chamando A solicitações de `prevent-app-suspension`e outro chamado B solicita `prevent-display-sleep`. `prevent-display-sleep` serão utilizadas até que B pare sua solicitação. Depois disso, `prevent-app-suspension` é usado.

### `powerSaveBlocker.stop(id)`

* `id` Integer - O bloqueio de energia devolvido por `powerSaveBlocker.start`.

Pára o bloqueador de salvamento de energia especificado.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - O bloqueio de energia devolvido por `powerSaveBlocker.start`.

Retornos `Boolean` - Se a `powerSaveBlocker` correspondente já começou.
