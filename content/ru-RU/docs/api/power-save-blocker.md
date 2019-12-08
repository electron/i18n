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

Возвращает `Integer` - Идентификатор блокировщика, назначенный этому блокировщику питания.

Начинает препятствовать работе системы в режиме пониженной мощности. Возвращает целое число, идентифицирующее блокировщик энергосбережения.

**Примечание:** `prevent-display-sleep` имеет более высокий приоритет перед `prevent-app-suspension`. Вступает в силу только наиболее высокий тип приоритета. Другими словами, `prevent-display-sleep` всегда выше `prevent-app-suspension`.

Например, API-интерфейс, вызывающий запросы A для `prevent-app-suspension`, и другой вызов запросов B для `prevent-display-sleep`. `prevent-display-sleep` будет использоваться до тех пор, пока B не прекратит свой запрос. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.