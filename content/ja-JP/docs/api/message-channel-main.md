# MessageChannelMain

`MessageChannelMain` はメインプロセス側における DOM の [`MessageChannel`][] オブジェクトです。 .

チャンネルメッセージングの使用方法の詳細については、[チャンネルメッセージング API][] のドキュメントを参照してください。

## Class: MessageChannelMain

プロセス: [Main](../glossary.md#main-process)

サンプル:

```js
メインプロセス
const { port1, port2 } = 新しいメッセージチャネルメイン()
w.webContents.postMessage('port', null、 [port2])
port1.postMessage({ some: 'message' })

// レンダラープロセス
const { ipcRenderer } = 必須 ('electron')
ipcRenderer.on('電子', (e) => {
  // e.port は、このメッセージと一緒
  に送信されるポートのリストです[0]

  .log
    > このメッセージと一緒に送信されます。
```

### インスタンスプロパティ

#### `channel.port1`

[`MessagePortMain`](message-port-main.md) 型のプロパティ。

#### `channel.port2`

[`MessagePortMain`](message-port-main.md) 型のプロパティ。

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[チャンネルメッセージング API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
