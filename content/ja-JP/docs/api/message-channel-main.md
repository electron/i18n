# MessageChannelMain

`MessageChannelMain` はメインプロセス側における DOM の [`MessageChannel`][] オブジェクトです。 .

チャンネルメッセージングの使用方法の詳細については、[チャンネルメッセージング API][] のドキュメントを参照してください。

## Class: MessageChannelMain

> メインプロセス内でチャンネルメッセージングをするためのチャンネルインターフェイスです。

プロセス: [Main](../glossary.md#main-process)

サンプル:

```js
// メインプロセス
const { MessageChannelMain } = require('electron')
const { port1, port2 } = new MessageChannelMain()
w.webContents.postMessage('port', null, [port2])
port1.postMessage({ some: 'message' })

// レンダラープロセス
const { ipcRenderer } = require('electron')
ipcRenderer.on('port', (e) => {
  // e.ports はこのメッセージに付加されるポートのリストです
  e.ports[0].on('message', (messageEvent) => {
    console.log(messageEvent.data)
  })
})
```

### インスタンスプロパティ

#### `channel.port1`

[`MessagePortMain`](message-port-main.md) 型のプロパティ。

#### `channel.port2`

[`MessagePortMain`](message-port-main.md) 型のプロパティ。

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[チャンネルメッセージング API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
