## Clase: BrowserWindowProxy

> Manipula la ventana secundaria del navegador

Proceso: [Renderer](../glossary.md#renderer-process)

El objeto `BrowserWindowProxy` es devuelto de `window.open` y proporciona una funcionalidad limitada con la ventana secundaria.

### Métodos de Instancia

El objeto `BrowserWindowProxy` tiene los siguientes métodos de instancia:

#### `win.blur()`

Elimina el enfoque de la ventana secundaria.

#### `win.close()`

Cierra a la fuerza la ventana secundaria sin llamar a su evento de descarga.

#### `win.eval(code)`

* `codigo` String

Evalúa el código en la ventana secundaria.

#### `win.focus()`

Enfoca la ventana secundaria (trae la ventana al frente).

#### `win.print()`

Invoca en cuadro de diálogo en la ventana secundaria.

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the child window with the specified origin or `*` for no origin preference.

In addition to these methods, the child window implements `window.opener` object with no properties and a single method.

### Propiedades de Instancia

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.