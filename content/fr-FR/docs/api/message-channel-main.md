# MessageChannelMain

`MessagePortMain` est l’équivalent coté processus principal de [`MessagePort`][] du DOM . Son unique fonction est de créer une paire d'objets [`MessagePortMain`](message-port-main.md) connectés .

Pour plus d'informations sur son utilisation consultez la documentation de [Channel Messaging API][].

## Class: MessageChannelMain

> Interface de canal pour la messagerie de canal dans le processus principal.

Processus : [Main](../glossary.md#main-process)

Exemple :

```js
// processus principal
const { MessageChannelMain } = require('electron')
const { port1, port2 } = new MessageChannelMain()
w.webContents.postMessage('port', null, [port2])
port1.postMessage({ some: 'message' })

// processus de rendu
const { ipcRenderer } = require('electron')
ipcRenderer.on('port', (e) => {
  // e.ports est une liste de ports envoyée conjointement avec ce message
  e.ports[0].on('message', (messageEvent) => {
    console.log(messageEvent.data)
  })
})
```

### Propriétés d'instance

#### `channel.port1`

Une propriété [`MessagePortMain`](message-port-main.md).

#### `channel.port2`

Une propriété [`MessagePortMain`](message-port-main.md).

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
