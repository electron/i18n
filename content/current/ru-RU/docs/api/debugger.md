## Class: Debugger

> Альтернативный транспорт для удаленной отладки протокола Chrome.

Процесс: [Главный](../glossary.md#main-process)

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

#### Событие: 'detach'

Возвращает:

* Событие типа `event`
* `reason` String - причина отсоединения отладчика.

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Событие: 'message'

Возвращает:

* `event` Event
* `method` String - имя метода.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.
* `sessionId` String - Unique identifier of attached debugging session, will match the value sent from `debugger.sendCommand`.

Возникает при отладке инструментальных событий.

### Методы экземпляра

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (опционально) - запрошенная версия протокола отладки.

Подключает отладчик к `webContents`.

#### `debugger.isAttached()`

Возвращает `Boolean` - если отладчик присоединен к `webContents`.

#### `debugger.detach()`

Отключает отладчик от `webContents`.

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` any (опционально) - JSON объект с параметрами запроса.
* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget) message.

Возвращает `Promise<any>` - Promise, которое разрешается с ответом, определенным атрибутом 'returns' описания команды в протоколе удаленной отладки, или отклоняется, указывая на сбой команды.

Отправьте заданную команду на цель отладки.
