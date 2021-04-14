# MessageChannelMain

`MessageChannelMain` é o equivalente principal do objeto [`MessageChannel`][] DOM. Sua função singular é criar um par de objetos conectados [`MessagePortMain`](message-port-main.md) .

Consulte a API de mensagens do canal [][] documentação para obter mais informações sobre o uso de mensagens de canal.

## Classe: MessageChannelMain

Processo: [Main](../glossary.md#main-process)

Exemplo:

```js
Principal processo
const { port1, port2 } = novo MessageChannelMain()
w.webContents.postMessage ('port', nulo, [port2])
port1.postMessage ({ some: 'message' })

// Processo renderizador
const { ipcRenderer } = require('electron')
ipcRenderer.on('port','port'. (e) => {
  // e.ports é uma lista de portas enviadas junto com esta mensagem
  e.ports[0].on('message', (messageEvent) => {
    console.log(messageEvent.data)
  })
})
```

### Propriedades de Instância

#### `canal.port1`

Uma propriedade [`MessagePortMain`](message-port-main.md) .

#### `canal.port2`

Uma propriedade [`MessagePortMain`](message-port-main.md) .

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
