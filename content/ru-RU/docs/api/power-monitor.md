# powerMonitor

> Отслеживает изменения состояния питания устройства.

Процесс: [Основной](../glossary.md#main-process)

## События

Модуль `powerMonitor` выдает следующие события:

### Event: 'suspend' _macOS_ _Windows_

Возникает, когда система приостановлена.

### Event: 'resume' _macOS_ _Windows_

Возникает при возобновлении работы системы.

### Event: 'on-ac' _macOS_ _Windows_

Используется при переключении системы на питание от переменного тока (блока питания).

### Event: 'on-battery' _macOS_  _Windows_

Используется при переключении системы на питание от батареи.

### Событие: 'shutdown' _Linux_ _macOS_

Возникает, когда система собирается перезагрузиться или выключиться. Если обработчик события вызывает `e.preventDefault()`, Electron попытается отложить завершение работы системы, чтобы приложение корректно завершило работу. Если вызывается `e.preventDefault()`, приложение должно выйти как можно скорее, вызвав что-то вроде `app.quit()`.

### Событие: 'lock-screen' _macOS_ _Windows_

Возникает, когда система собирается заблокировать экран.

### Событие: 'unlock-screen' _macOS_ _Windows_

Возникает, как только система разблокирует экран.

### Event: 'user-did-become-active' _macOS_

Emitted when a login session is activated. See [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) for more information.

### Event: 'user-did-resign-active' _macOS_

Emitted when a login session is deactivated. See [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) for more information.

## Методы

Модуль `powerMonitor` имеет следующие методы:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Может быть `active`, `idle`, `locked` или `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Возвращает `Integer` - время простоя в секундах

Расчет времени простоя системы в секундах.

### `powerMonitor.isOnBatteryPower()`

Returns `Boolean` - Whether the system is on battery power.

To monitor for changes in this property, use the `on-battery` and `on-ac` events.

## Свойства

### `powerMonitor.onBatteryPower`

A `Boolean` property. True if the system is on battery power.

See [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).
