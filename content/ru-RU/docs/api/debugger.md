## Class: Debugger

> Альтернативный транспорт для удаленной отладки протокола Chrome.

Процесс: [Основной](../glossary.md#main-process)

Инструменты разработчика Chrome имеют [специальную привязку][rdp] доступную во время выполнения JavaScript, что позволяет взаимодействовать со страницами и управлять ими.

```javascript
const { BrowserWindow } - требуют ('электрон')
const win - новый BrowserWindow ()

попробуйте -
  win.webContents.debugger.attach ('1.1')
- catch (ошибка) -
  console.log ('Debugger attach) ошибка)
-

win.webContents.debugger.on ('detach', (событие, причина) ->
  консоли.log ('Debugger отделено из-за : ', причина)
к)

win.webContents.debugger.on ('сообщение', (событие, метод, парамы) -> -
  если (метод - 'Network.requestWillBeSent') -
    если (парамс. request.url -1 'https://www.github.com') -
      win.webContents.debugger.detach()
    -
  -
)

win.webContents.debugger.sendCommand ('Network.enable')
```

### События экземпляра

#### Событие: 'detach'

Возвращает:

* `event` Event
* `reason` String - причина отсоединения отладчика.

Испускаемый при отладке сеанса. Это происходит либо при `webContents` , либо при использовании devtools для прилагаемого `webContents`.

#### Событие: 'message'

Возвращает:

* `event` Event
* `method` String - имя метода.
* `params` - Параметры события, определяемые "параметрами", атрибутом в протоколе удаленной отладки.
* `sessionId` String - Уникальный идентификатор прикрепленного сеанса отладки, будет соответствовать значению, отправленное `debugger.sendCommand`.

Возникает при отладке инструментальных событий.

### Методы экземпляра

#### `debugger.attach([protocolVersion])`

* `protocolVersion` String (опционально) - запрошенная версия протокола отладки.

Подключает отладчик к `webContents`.

#### `debugger.isAttached()`

Возвращает `Boolean` - если отладчик присоединен к `webContents`.

#### `debugger.detach()`

Отключает отладчик от `webContents`.

#### `debugger.sendCommand (метод, commandParams, sessionId)`

* `method` String - Название метода должно быть одним из методов, определяемых [отладки][rdp].
* `commandParams` any (опционально) - JSON объект с параметрами запроса.
* `sessionId` String (необязательно) - отправьте команду цели с идентификатором сеанса отладки. Начальное значение можно получить, отправив [Target.attachToTarget][attachToTarget] сообщение.

Возвращает `Promise<any>` - Promise, которое разрешается с ответом, определенным атрибутом 'returns' описания команды в протоколе удаленной отладки, или отклоняется, указывая на сбой команды.

Отправьте заданную команду на цель отладки.

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
