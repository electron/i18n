## Class: Debugger

> Um transporte alternativo para o protocolo de depuração remoto do Chrome.

Processo: [Main](../glossary.md#main-process)

As ferramentas de desenvolvedor do Chrome possuem [special binding](https://chromedevtools.github.io/devtools-protocol/) disponível no runtime do JavaScript que permite interagir com páginas e instrumentá-las.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Falha ao anexar o Debugger: ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('Debugger desanexado devido a : ', reason)
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

### Métodos de Instância

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (opcional) - Versão do protocolo de debugging solicitado.

Anexa o debugger à `webContents`.

#### `debugger.isAttached()`

Retorna um `Boolean` - que mostra se o debugger está anexado à `webContents`.

#### `debugger.detach()`

Retira o debugger de `webContents`.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Object (optional) - JSON object with request parameters.
* `callback` Function (optional) - Response
  * `error` Object - Error message indicating the failure of the command.
  * `result` Any - Response defined by the 'returns' attribute of the command description in the remote debugging protocol.

Send given command to the debugging target.

**[Deprecated Soon](modernization/promisification.md)**

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Object (optional) - JSON object with request parameters.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Send given command to the debugging target.

### Eventos de instância

#### Event: 'detach'

* `event` Event
* `reason` String - Reason for detaching debugger.

Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Event: 'message'

* `event` Event
* `method` String - Method name.
* `params` Object - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever debugging target issues instrumentation event.
