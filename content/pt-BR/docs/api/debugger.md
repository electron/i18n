## Class: Debugger

> Um transporte alternativo para o protocolo de depuração remoto do Chrome.

Processo: [Main](../glossary.md#main-process)

As ferramentas de desenvolvedor do Chrome possuem [special binding][rdp] disponível no runtime do JavaScript que permite interagir com páginas e instrumentá-las.

```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Debugger attach failed : ', err)
}

win.webContents.debugger.on('desapegar', (evento, razão) => { console
  .log('Depurador destacado devido a : ', razão)
})

win.webContents.debugger.on('message', (evento, método, params) => {
  se (método === 'Network.requestWillBeSent') {
    se (params.request.url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.debugger.sendCommand('Network.enable')
```

### Eventos de instância

#### Evento: 'desapegar'

Retorna:

* `event` Event
* `reason` String - Razão para desprender depurador.

Emitido quando a sessão de depuração é encerrada. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Event: 'message'

Retorna:

* `event` Event
* `method` String - Method name.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.
* `sessionId` String - Unique identifier of attached debugging session, will match the value sent from `debugger.sendCommand`.

Emitted whenever the debugging target issues an instrumentation event.

### Métodos de Instância

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (opcional) - Versão do protocolo de debugging solicitado.

Anexa o debugger à `webContents`.

#### `debugger.isAttached()`

Retorna um `Boolean` - que mostra se o debugger está anexado à `webContents`.

#### `debugger.detach()`

Retira o debugger de `webContents`.

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol][rdp].
* `commandParams` any (optional) - JSON object with request parameters.
* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget][attachToTarget] message.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Send given command to the debugging target.

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
