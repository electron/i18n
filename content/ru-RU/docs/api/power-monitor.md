# powerMonitor (Мониторинг питания)

> Отслеживает изменения состояния питания устройства.

Процесс: [Основной](../glossary.md#main-process)

## События

Модуль `powerMonitor` выдает следующие события:

### Event: 'suspend' _macOS_ _Windows_

Возникает, когда система приостановлена.

### Событие: «резюме» _macOS_ _Windows_

Возникает при возобновлении работы системы.

### Событие: 'on-ac' _macOS_ _Windows_

Используется при переключении системы на питание от переменного тока (блока питания).

### Событие: "на батарее" _macOS_  _Windows_

Используется при переключении системы на питание от батареи.

### Событие: 'shutdown' _Linux_ _macOS_

Возникает, когда система собирается перезагрузиться или выключиться. Если обработчик события вызывает `e.preventDefault()`, Electron попытается отложить завершение работы системы, чтобы приложение корректно завершило работу. Если вызывается `e.preventDefault()`, приложение должно выйти как можно скорее, вызвав что-то вроде `app.quit()`.

### Событие: 'lock-screen' _macOS_ _Windows_

Возникает, когда система собирается заблокировать экран.

### Событие: 'unlock-screen' _macOS_ _Windows_

Возникает, как только система разблокирует экран.

### Событие: 'пользователь-сделал-стал активным' _macOS_

Излучается при активации сеанса входа. Дополнительную информацию [можно](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) в документации.

### Событие: 'пользователь-сделал-уйти в отставку-активный' _macOS_

Испускаемый при отключении сеанса входа. Дополнительную информацию [можно](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) в документации.

## Методы

Модуль `powerMonitor` имеет следующие методы:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Возвращает `String` - текущее состояние системы. Может быть `active`, `idle`, `locked` или `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` доступна только на поддерживаемых системах.

### `powerMonitor.getSystemIdleTime()`

Возвращает `Integer` - время простоя в секундах

Расчет времени простоя системы в секундах.

### `powerMonitor.isOnBatteryPower()`

Возвращает `Boolean` - ли система находится на батарее.

Для мониторинга изменений в этом свойстве используйте `on-battery` и `on-ac` события.

## Свойства

### `powerMonitor.onBatteryPower`

Свойство `Boolean` . Правда, если система находится на батарее.

Смотрите [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).
