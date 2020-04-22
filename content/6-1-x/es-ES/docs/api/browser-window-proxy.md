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

* `code` Cadena de caracteres

Evalúa el código en la ventana secundaria.

#### `win.focus()`

Enfoca la ventana secundaria (trae la ventana al frente).

#### `win.print()`

Invoca en cuadro de diálogo en la ventana secundaria.

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Envía un mensaje a la ventana secundaria con el origen específicado o `*` sin origen de preferencia.

Además de estos métodos, la ventana secundaria implementa el objeto `window.opener` sin ninguna propiedad y un método único.

### Propiedades de Instancia

El objeto `BrowserWindowProxy` tiene las siguientes propiedades de instancia:

#### `win.closed`

Un `Boolean` que cambia a true cuando la ventana secundaria se cierra.
