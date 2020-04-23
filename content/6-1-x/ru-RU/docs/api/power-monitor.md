# powerMonitor (Мониторинг питания)

> Отслеживает изменения состояния питания устройства.

Процесс: [Главный](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

Например:

```javascript
const electron = require('electron')
const { app } = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## События

Модуль `powerMonitor` выдает следующие события:

### Событие: 'suspend'

Возникает, когда система приостановлена.

### Событие: 'resume'

Возникает при возобновлении работы системы.

### Событие: 'on-ac' _Windows_

Используется при переключении системы на питание от переменного тока (блока питания).

### Событие: 'on-battery' _Windows_

Используется при переключении системы на питание от батареи.

### Событие: 'shutdown' _Linux_ _macOS_

Возникает, когда система собирается перезагрузиться или выключиться. Если обработчик события вызывает `e.preventDefault()`, Electron попытается отложить завершение работы системы, чтобы приложение корректно завершило работу. Если вызывается `e.preventDefault()`, приложение должно выйти как можно скорее, вызвав что-то вроде `app.quit()`.

### Событие: 'lock-screen' _macOS_ _Windows_

Возникает, когда система собирается заблокировать экран.

### Событие: 'unlock-screen' _macOS_ _Windows_

Возникает, как только система разблокирует экран.

## Методы

Модуль `powerMonitor` имеет следующие методы:

### `powerMonitor.querySystemIdleState(idleThreshold, callback)` _(Deprecated)_

* `idleThreshold` Integer
* `callback` Function
  * `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

### `powerMonitor.querySystemIdleTime(callback)` _(Deprecated)_

* `callback` Function
  * `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Возвращает `Integer` - время простоя в секундах

Calculate system idle time in seconds.

