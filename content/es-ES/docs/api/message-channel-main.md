# MessageChannelMain

`MessageChannelMain` es el equivalente del lado del proceso principal del DOM [`MessageChannel`][] objeto. Su función singular es crear un par de [conectados`MessagePortMain`](message-port-main.md) objetos.

Consulta la documentación de la API de mensajería de [Channel][] para obtener más información sobre el uso de mensajería de canal.

## Clase: MessageChannelMain

Proceso: [Main](../glossary.md#main-process)

Ejemplo:

```js
Proceso principal
const { port1, port2 } = New MessageChannelMain ()
w. webContents. postMessage (' Port ', null, [port2])
PORT1. postMessage ({ some: 'message' })

//proceso del representador
const { ipcRenderer } = require (' Electron ')
ipcRenderer. on (' Port ', (e) => {
  //e. Ports es una lista de puertos enviados junto con este mensaje
  e. Ports[0]. on (' Message ', (messageEvent) => {
    Console. log (messageEvent. Data)
  })
})
```

### Propiedades de Instancia

#### `Channel. PORT1`

Una [`MessagePortMain`](message-port-main.md) propiedad.

#### `Channel. port2`

Una [`MessagePortMain`](message-port-main.md) propiedad.

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[Channel]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
