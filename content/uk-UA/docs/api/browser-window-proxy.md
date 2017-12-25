## Клас: BrowserWindowProxy

> Маніпулюйте дочірнім вікном браузера

Процес: [Renderer](../glossary.md#renderer-process)

Об'єкт `BrowserWindowProxy` повертається з `window.open` і надає обмежений функціонал керування дочірнім вікном.

### Методи Екземпляра

Об'єкт `BrowserWindowProxy` має наступні методи:

#### `win.blur()`

Removes focus from the child window.

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

### Властивості Екземпляра

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.