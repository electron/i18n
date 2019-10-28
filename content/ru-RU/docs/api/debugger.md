## Class: Debugger

> Альтернативный транспорт для удаленной отладки протокола Chrome.

Process: [Main](../glossary.md#main-process)

Инструменты разработчика Chrome имеют [специальную привязку](https://chromedevtools.github.io/devtools-protocol/) доступную во время выполнения JavaScript, что позволяет взаимодействовать со страницами и управлять ими.

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

### События экземпляра

#### Event: 'detach'

Возвращает:

* `event` Event
* `reason` String - Reason for detaching debugger.

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Event: 'message'

Возвращает:

* `event` Event
* `method` String - Method name.
* `params` unknown - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever the debugging target issues an instrumentation event.

### Методы экземпляра

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (optional) - Requested debugging protocol version.

Attaches the debugger to the `webContents`.

#### `debugger.isAttached()`

Returns `Boolean` - Whether a debugger is attached to the `webContents`.

#### `debugger.detach()`

Detaches the debugger from the `webContents`.

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` any (optional) - JSON object with request parameters.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Send given command to the debugging target.