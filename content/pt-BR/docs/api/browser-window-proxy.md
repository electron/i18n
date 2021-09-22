## Class: BrowserWindowProxy

> Manipular a janela filha

Process: [Renderer](../glossary.md#renderer-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

The `BrowserWindowProxy` object is returned from `window.open` and provides limited functionality with the child window.

### Métodos de Instância

O objeto `BrowserWindowProxy` possui os seguintes métodos de instância:

#### `win.blur()`

Remove o foco da janela filha.

#### `win.close()`

Forçadamente fecha a janela filha sem chamar o evento unload.

#### `win.eval(code)`

* `code` String

Evaluates the code in the child window.

#### `win.focus()`

Focuses the child window (brings the window to front).

#### `win.print()`

Invokes the print dialog on the child window.

#### `win.postMessage(message, targetOrigin)`

* `message` any
* `targetOrigin` String

Sends a message to the child window with the specified origin or `*` for no origin preference.

In addition to these methods, the child window implements `window.opener` object with no properties and a single method.

### Propriedades da Instância

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.
