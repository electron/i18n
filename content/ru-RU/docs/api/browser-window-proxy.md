## Класс: BrowserWindowProxy

> Манипулирование дочерним окном браузера

Процесс: [Renderer](../glossary.md#renderer-process)

`window.open` возвращает `BrowserWindowProxy` и предоставляет ограниченное управление дочерним окном.

### Методы экземпляра

Экземпляр объекта `BrowserWindowProxy` содержит следующие методы:

#### `win.blur()`

Дефокусирует дочернее окно.

#### `win.close()`

Forcefully closes the child window without calling its unload event.

#### `win.eval(code)`

* `code` String

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

### Instance Properties

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.