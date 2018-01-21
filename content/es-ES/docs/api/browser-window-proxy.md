## Clase: BrowserWindowProxy

> Manipula la ventana secundaria del navegador

Proceso: [Renderer](../glossary.md#renderer-process)

El objeto `BrowserWindowProxy` es devuelto de `window.open` y proporciona una funcionalidad limitada con la ventana secundaria.

### Métodos de Instancia

El objeto `BrowserWindowProxy` tiene los siguientes métodos de instancia:

#### `win.blur()`

Removes focus from the child window.

#### `win.close()`

Forcefully closes the child window without calling its unload event.

#### `win.eval(code)`

* `codigo` String

Evaluates the code in the child window.

#### `win.focus()`

Focuses the child window (brings the window to front).

#### `win.print()`

Invokes the print dialog on the child window.

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the child window with the specified origin or `*` for no origin preference.

In addition to these methods, the child window implements `window.opener` object with no properties and a single method.

### Propiedades de Instancia

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.