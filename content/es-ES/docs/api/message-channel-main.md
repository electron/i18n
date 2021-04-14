# MessageChannelMain

`MessageChannelMain` es el equivalente del lado del proceso principal del DOM [`MessageChannel`][] objeto. Su función singular es crear un par de [conectados`MessagePortMain`](message-port-main.md) objetos.

Consulta la documentación de la API de mensajería de [Channel][] para obtener más información sobre el uso de mensajería de canal.

## Clase: MessageChannelMain

Proceso: [Main](../glossary.md#main-process)

Ejemplo:

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
w.webContents.postMessage('port', null, [port2])
port1.postMessage({ some: 'message' })

// Renderer process
const { ipcRenderer } = require('electron')
ipcRenderer.on('port', (e) => {
  // e.ports is a list of ports sent along with this message
  e.ports[0].on('message', (messageEvent) => {
    console.log(messageEvent.data)
  })
})
```

### Propiedades de Instancia

#### `channel.port1`

Una propiedad [`MessagePortMain`](message-port-main.md).

#### `channel.port2`

Una propiedad [`MessagePortMain`](message-port-main.md).

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[Channel]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
