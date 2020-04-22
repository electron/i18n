## クラス: BrowserWindowProxy

> 子ブラウザウィンドウを操作します。

プロセス: [Renderer](../glossary.md#renderer-process)

`BrowserWindowProxy` オブジェクトは、`window.open` から返却され、子ウインドウの限定的な機能を提供します。

### インスタンスメソッド

`BrowserWindowProxy` オブジェクトには、次のインスタンスメソッドがあります。

#### `win.blur()`

子ウインドウからフォーカスを外します。

#### `win.close()`

unloadイベントを呼び出すことなく、子ウインドウを強制的に閉じます。

#### `win.eval(code)`

* `code` String

子ウインドウでコードを評価します。

#### `win.focus()`

子ウインドウにフォーカスします (ウインドウを前面に移動します)。

#### `win.print()`

子ウインドウで印刷ダイアログを呼び出します。

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

特定のオリジンまたはオリジン未設定を意味する `*` で子ウインドウにメッセージを送信します。

これらのメソッドに加えて、子ウインドウには、プロパティがなく、1つのメソッドを持つ `window.opener` オブジェクトが実装されています。

### インスタンスプロパティ

`BrowserWindowProxy` オブジェクトには、次のインスタンスプロパティがあります。

#### `win.closed`

子ウインドウが閉じた後にtrueが設定される `Boolean` 型のプロパティ。
