## Class: Debugger

> Альтернативный транспорт для удаленной отладки протокола Chrome.

Process: [Main](../glossary.md#main-process)

Инструменты разработчика Chrome имеют [специальную привязку](https://developer.chrome.com/devtools/docs/debugger-protocol) доступную во время выполнения JavaScript, что позволяет взаимодействовать со страницами и управлять ими.

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

### Методы экземпляра

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (опционально) - запрошенная версия протокола отладки.

Подключает отладчик к `webContents`.

#### `debugger.isAttached()`

Возвращает `Boolean` - если отладчик присоединен к `webContents`.

#### `debugger.detach()`

Отключает отладчик от `webContents`.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String - имя метода должно быть одним из методов, определенным удаленным протоколом отладки.
* `commandParams` Object (опционально) - JSON объект с параметрами запроса.
* `callback` Function (опционально) - ответ 
  * `error` Object - сообщение об ошибке, указывающее на сбой команды.
  * `result` Any - возвращает ответ, определяемый атрибутом 'returns' описание команды в протоколе удаленной отладки.

Отправьте заданную команду на цель отладки.

### События экземпляра

#### Событие: 'detach'

* `event` Event
* `reason` String - причина отсоединения отладчика.

Возникает при завершении сеанса отладки. Это происходит либо когда `webContents` закрыт или devtools вызывается для присоединения к `webContents`.

#### Событие: 'message'

* `event` Event
* `method` String - имя метода.
* `params` Object - параметры события, определенные 'параметрами' атрибута в протоколе удаленной отладки.

Возникает при отладке инструментальных событий.