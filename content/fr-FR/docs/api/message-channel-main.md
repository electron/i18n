# MessageChannelMain

`MessageChannelMain` 'est l’équivalent principal du côté du processus du DOM [`MessageChannel`][] objet. Sa fonction singulière est de créer une paire de objets [`MessagePortMain`](message-port-main.md) connectés.

Pour plus d'informations sur l'utilisation de la messagerie de canal, consultez la documentation de [Channel Messaging API][].

## Classe: MessageChannelMain

Processus : [Main](../glossary.md#main-process)

Exemple :

```js
Processus principal
const { port1, port2 } = nouveau MessageChannelMain()
w.webContents.postMessage ('port', null, [port2])
port1.postMessage({ some: 'message' })

// Renderer process
const { ipcRenderer } = require ('electron')
ipcRenderer.on('port', e) => {
  // e.ports est une liste de ports envoyés avec ce message
  par exemple ports[0].on ('message', (messageEvent) => { console
    .log (messageEvent.data)
  })
})
```

### Propriétés d'instance

#### `channel.port1 (en)`

Une [`MessagePortMain`](message-port-main.md) propriété.

#### `channel.port2 (en)`

Une [`MessagePortMain`](message-port-main.md) propriété.

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
