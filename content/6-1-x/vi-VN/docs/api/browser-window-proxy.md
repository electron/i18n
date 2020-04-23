## Class: BrowserWindowProxy

> Manipulate the child browser window

Process: [Renderer](../glossary.md#renderer-process)

The `BrowserWindowProxy` object is returned from `window.open` and provides limited functionality with the child window.

### Các phương thức riêng

The `BrowserWindowProxy` object has the following instance methods:

#### `win.blur()`

Ngừng focus cửa sổ con.

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

### Các Thuộc Tính

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.
