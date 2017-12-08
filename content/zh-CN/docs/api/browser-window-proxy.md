## 类: BrowserWindowProxy

> 操纵子浏览器窗口

Process: [Renderer](../glossary.md#renderer-process)

The `BrowserWindowProxy` object is returned from `window.open` and provides limited functionality with the child window.

### 实例方法

The `BrowserWindowProxy` object has the following instance methods:

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

### 实例属性

` BrowserWindowProxy ` 对象具有以下实例属性:

#### `win.closed`

在子窗口关闭后设置为 true 的 ` Boolean `。