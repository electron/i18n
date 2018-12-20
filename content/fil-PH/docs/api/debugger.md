## Klase: "Debugger"

> Ang alternatibong paglipat para sa "Chrome's remote" na sistematikong panuntunan ng "debugging".

Proseso: [Pangunahin](../glossary.md#main-process)

Ang "Chrome Developer Tools" ay may [special binding](https://developer.chrome.com/devtools/docs/debugger-protocol) na matatagpuan sa "JavaScript" na hinahayaang makipag-ugnayan sa mga pahina at paggamit sa kanila.

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

### Mga Halimbawa ng Sistematikong Paraan

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (opsyunal) - Ang hiling na bersyon ng sistematikong panuntunan para sa "debugging".

Idikit ang "debugger" sa `webContents`.

#### `debugger.isAttached()`

Pagbabalik sa `Boolean` - Kung ang "debugger" ay nakadikit sa `webContents`.

#### `debugger.detach()`

Pagtanggal ng "debugger" galing sa `webContents`.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String - Ang pangalan ng sistematikong paraan ay dapat na isa sa mga paraan na tinutukoy gamit ang "remote debugging protocol".
* `commandParams` Object (opsyunal) - "JSON object" na may hiling na parameters.
* `muling pagtawag` Gamit (opsyunal) - Pagtugon 
  * `error` Object - Ang maling mensahe ay nagpapahiwatig ng pagkabigo ng "command".
  * `result` Kahit ano - Ang pagtugon ay tinutukoy gamit ang 'returns' na may katangian na paglalarawan ng "command" sa "remote" ng sistematikong panuntunan ng "debugging".

Ipadala ang binigay na "command" sa "debugging target".

### Mga Halimbawa ng Pangyayari

#### Pangyayari: 'pagtanggal'

* `event` Event
* `reason` String - Dahilan para sa pagtanggal ng "debugger".

Lumalabas kapag ang sesyon ng "debugging" ay tuluyan nang inihinto o winakasan. Ito ay nangyayari kapag ang `webContents` ay nakasara o ang "devtools" ay ginamit para sa pagdikit sa `webContents`.

#### Pangyayari: 'mensahe'

* `event` na Kaganapan
* `method` String - Pangalan ng sistematikong paraan.
* `params` Object - Ang "Event parameters" ay tinutukoy gamit ang katangian ng 'parameters' sa "remote" ng sistematikong panuntunan ng "debugging".

Lumalabas sa tuwing ang mga isyu na pinupuntirya ng "debugging" ay ginagamit sa pangyayari.