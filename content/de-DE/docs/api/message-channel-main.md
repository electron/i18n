# MessageChannelMain

`MessageChannelMain` ist das hauptprozessseitige Äquivalent des DOM- [`MessageChannel`][] -Objekts. Seine einzigartige Funktion besteht darin, ein Paar zu erstellen, das [`MessagePortMain`](message-port-main.md) -Objekten verbunden ist.

Weitere Informationen zur Verwendung Channel Messaging finden Sie in der Dokumentation [Channel Messaging][] .

## Klasse: MessageChannelMain

Prozess: [Main](../glossary.md#main-process)

Beispiel:

```js
Hauptprozess
const { port1, port2 } = neue MessageChannelMain()
w.webContents.postMessage('port', null, [port2])
port1.postMessage({ some: 'message' })

/ Renderer-Prozess
const { ipcRenderer } = require('electron')
ipcRenderer.on('port', (e) => '
  * e.ports ist eine Liste der Ports, die zusammen mit dieser Nachricht gesendet werden,
  e.ports[0].on('message', (messageEvent

  .log
    > )
```

### Instanz Eigenschaften

#### `channel.port1`

Eine [`MessagePortMain`](message-port-main.md) Eigenschaft.

#### `channel.port2`

Eine [`MessagePortMain`](message-port-main.md) Eigenschaft.

[`MessageChannel`]: https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
[Channel Messaging]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
