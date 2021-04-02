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

Emitido quando a sessão de depuração é encerrada. Isso acontece quando `webContents` é fechada ou as ferramentas são invocadas para o `webContents`anexado .

#### Evento: 'mensagem'

Retorna:

* `event` Event
* `method` String - Nome do método.
* `params` qualquer - Parâmetros de evento definidos pelos 'parâmetros' atributo no protocolo de depuração remota.
* `sessionId` String - Identificador exclusivo da sessão de depuração anexada, corresponderá ao valor enviado de `debugger.sendCommand`.

Emitido sempre que o alvo de depuração emite um evento de instrumentação.

### Métodos de Instância

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (opcional) - Versão do protocolo de debugging solicitado.

Anexa o debugger à `webContents`.

#### `debugger.isAttached()`

Retorna um `Boolean` - que mostra se o debugger está anexado à `webContents`.

#### `debugger.detach()`

Retira o debugger de `webContents`.

#### `debugger.sendCommand(método[, commandParams, sessionId])`

* `method` String - Nome do método, deve ser um dos métodos definidos pelo protocolo de depuração remota [][rdp].
* `commandParams` qualquer objeto (opcional) - JSON com parâmetros de solicitação.
* `sessionId` String (opcional) - enviar comando para o alvo com id de depuração de depuração associada. O valor inicial pode ser obtido enviando [Target.attachToTarget][attachToTarget] mensagem.

Devoluções `Promise<any>` - Uma promessa que resolve com a resposta definida por o atributo 'returns' da descrição do comando no protocolo de depuração remota ou é rejeitada indicando a falha do comando.

Envie o comando dado para o alvo de depuração.

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
