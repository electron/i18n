# MessagePortMain

`MessagePortMain` は、メインプロセス側における DOM の [`MessagePort`][] オブジェクトです。 DOM の `EventTarget` イベントシステムの代わりに Node.js の `EventEmitter` システムを使用していることを除けば、DOM のものと同様の動作をします。 これは、イベントをリッスンする際には `port.onmessage = ...` や `port.addEventListener('message', ...)` の代わりに `port.on('message', ...)` を使うべきであるということです。

チャンネルメッセージングの使用方法の詳細については、[チャンネルメッセージング API][] のドキュメントを参照してください。

`MessagePortMain` は \[EventEmitter\]\[event-emitter\] を継承しています。

## Class: MessagePortMain

> メインプロセス内でチャンネルメッセージングをするためのポートインターフェイスです。

プロセス: [Main](../glossary.md#main-process)

### インスタンスメソッド

#### `port.postMessage(message, [transfer])`

* `message` any
* `transfer` MessagePortMain[] (任意)

ポートからメッセージを送信し、任意でオブジェクトの所有権を他のブラウジングコンテキストに転送します。

#### `port.start()`

ポートのキューに入れられたメッセージを送信し始めます。 このメソッドが呼び出されるまで、メッセージはキューに溜められます。

#### `port.close()`

ポートを切断し、これを無効にします。

### インスタンスイベント

#### イベント: 'message'

戻り値:

* `messageEvent` Object
  * `data` any
  * `ports` MessagePortMain[]

MessagePortMain オブジェクトがメッセージを受信したときに発生します。

#### イベント: 'close'

MessagePortMain オブジェクトの外部のもう一方が切断されたときに発生します。

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[チャンネルメッセージング API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
