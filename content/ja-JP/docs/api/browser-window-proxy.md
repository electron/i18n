## クラス: BrowserWindowProxy

> 子ブラウザウィンドウを操作します。

プロセス: [Renderer](../glossary.md#renderer-process)

`BrowserWindowProxy` オブジェクトは、`window.open` から返却され、子ウインドウの限定的な機能を提供します。

### インスタンスメソッド

`BrowserWindowProxy` オブジェクトには、次のインスタンスメソッドがあります。

#### `win.blur()`

子ウインドウからフォーカスを外します。

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

### インスタンスプロパティ

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.