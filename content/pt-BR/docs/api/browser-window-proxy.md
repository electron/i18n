## Class: BrowserWindowProxy

> Manipular a janela filha

Processo: [Renderizador](../glossary.md#renderer-process)

O objeto `BrowserWindowProxy` é devolvido de `window.open` e fornece funcionalidade limitada com a janela da criança.

### Métodos de Instância

O objeto `BrowserWindowProxy` tem os seguintes métodos de instância:

#### `win.blur()`

Remove o foco da janela filha.

#### `win.close()`

Forçadamente fecha a janela filha sem chamar o evento unload.

#### `win.eval(code)`

* `code` String

Avalia o código na janela da criança.

#### `win.focus()`

Foca a janela da criança (traz a janela para a frente).

#### `win.print()`

Invoca o diálogo de impressão na janela da criança.

#### `win.postMessage(message, targetOrigin)`

* `message` qualquer
* `targetOrigin` String

Envia uma mensagem para a janela da criança com a origem especificada ou `*` sem preferência de origem .

Além desses métodos, a janela infantil implementa `window.opener` objeto sem propriedades e um único método.

### Propriedades de Instância

O objeto `BrowserWindowProxy` tem as seguintes propriedades de instância:

#### `win.closed`

Uma `Boolean` que é definida para acontecer depois que a janela da criança é fechada.
