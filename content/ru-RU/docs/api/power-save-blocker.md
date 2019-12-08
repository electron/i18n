# powerSaveBlocker

> Предотвращает переход системы в режим пониженного потребления питания.

Process: [Main](../glossary.md#main-process)

Например:

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Методы

Модуль `powerSaveBlocker` имеет следующие методы:

### `powerSaveBlocker.start(type)`

* `type` String -Типы блокировки функции энергосбережения. 
  * `prevent-app-suspension` - Предотвращение приостановки приложения. Сохраняет систему активной, но позволяет отключить экран. Примеры использования: загрузка файла или воспроизведение аудио.
  * `prevent-display-sleep` - Предотвращение переключения дисплея в спящий режим. Держит систему и экран активными. Пример использования: воспроизведение видео.

Returns `Integer` - The blocker ID that is assigned to this power blocker.

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.