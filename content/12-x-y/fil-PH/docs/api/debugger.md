## Klase: "Debugger"

> Ang alternatibong paglipat para sa "Chrome's remote" na sistematikong panuntunan ng "debugging".

Proseso:[Pangunahi](../glossary.md#main-process)

Ang "Chrome Developer Tools" ay may [special binding][rdp] na matatagpuan sa "JavaScript" na hinahayaang makipag-ugnayan sa mga pahina at paggamit sa kanila.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Debugger attach failed : ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('Debugger detached due to : ', reason)
})

win.webContents.debugger.on('message', (event, method, params) => {
  if (method === 'Network.requestWillBeSent') {
    if (params.request.url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.sendCommand('Network.enable')
```

### Halimbawa ng mga Event

#### Pangyayari: 'pagtanggal'

Pagbabalik:

* `event` na Kaganapan
* `reason` String - Dahilan para sa pagtanggal ng "debugger".

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Pangyayari: 'mensahe'

Pagbabalik:

* `event` na Kaganapan
* `method` String - Pangalan ng sistematikong paraan.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.
* `sessionId` String - Unique identifier of attached debugging session, will match the value sent from `debugger.sendCommand`.

Emitted whenever the debugging target issues an instrumentation event.

### Mga Halimbawa ng Sistematikong Paraan

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (opsyunal) - Ang hiling na bersyon ng sistematikong panuntunan para sa "debugging".

Idikit ang "debugger" sa `webContents`.

#### `debugger.isAttached()`

Pagbabalik sa `Boolean` - Kung ang "debugger" ay nakadikit sa `webContents`.

#### `debugger.detach()`

Pagtanggal ng "debugger" galing sa `webContents`.

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol][rdp].
* `commandParams` any (optional) - JSON object with request parameters.
* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget][attachToTarget] message.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Ipadala ang binigay na "command" sa "debugging target".

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
