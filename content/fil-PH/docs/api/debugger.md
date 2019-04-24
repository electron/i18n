## Klase: "Debugger"

> Ang alternatibong paglipat para sa "Chrome's remote" na sistematikong panuntunan ng "debugging".

Proseso:[Pangunahi](../glossary.md#main-process)

Chrome Developer Tools has a [special binding](https://chromedevtools.github.io/devtools-protocol/) available at JavaScript runtime that allows interacting with pages and instrumenting them.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

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

### Mga Pamamaraan ng Instance

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (opsyunal) - Ang hiling na bersyon ng sistematikong panuntunan para sa "debugging".

Idikit ang "debugger" sa `webContents`.

#### `debugger.isAttached()`

Pagbabalik sa `Boolean` - Kung ang "debugger" ay nakadikit sa `webContents`.

#### `debugger.detach()`

Pagtanggal ng "debugger" galing sa `webContents`.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Object (opsyunal) - "JSON object" na may hiling na parameters.
* `callback` Gamit (opsyunal) - Pagtugon 
  * `error` Object - Ang maling mensahe ay nagpapahiwatig ng pagkabigo ng "command".
  * `result` Kahit ano - Ang pagtugon ay tinutukoy gamit ang 'returns' na may katangian na paglalarawan ng "command" sa "remote" ng sistematikong panuntunan ng "debugging".

Ipadala ang binigay na "command" sa "debugging target".

**[Deprecated Soon](promisification.md)**

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Object (opsyunal) - "JSON object" na may hiling na parameters.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Ipadala ang binigay na "command" sa "debugging target".

### Halimbawa ng mga Event

#### Event: 'detach'

* `kaganapan` kaganapan
* `reason` String - Reason for detaching debugger.

Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Event: 'message'

* `event` na Kaganapan
* `method` String - Method name.
* `params` Object - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever debugging target issues instrumentation event.