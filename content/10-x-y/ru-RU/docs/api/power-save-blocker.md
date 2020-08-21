# powerSaveBlocker

> Предотвращает переход системы в режим пониженного потребления питания.

Процесс: [Главный](../glossary.md#main-process)

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

* `type` String - Power save blocker type.
  * `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Возвращает `Integer` - Идентификатор блокировщика, назначенный этому блокировщику питания.

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Примечание:** `prevent-display-sleep` имеет более высокий приоритет перед `prevent-app-suspension`. Вступает в силу только наиболее высокий тип приоритета. Другими словами, `prevent-display-sleep` всегда выше `prevent-app-suspension`.

Например, API-интерфейс, вызывающий запросы A для `prevent-app-suspension`, и другой вызов запросов B для `prevent-display-sleep`. `prevent-display-sleep` будет использоваться до тех пор, пока B не прекратит свой запрос. После этого, будет использоваться `prevent-app-suspension`.

### `powerSaveBlocker.stop(id)`

* `id` Integer - Идентификатор блокировщика энергосбережения, возвращённый `powerSaveBlocker.start`.

Останавливает указанный блокировщик энергосбережения.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - Идентификатор блокировщика энергосбережения, возвращённый `powerSaveBlocker.start`.

Возвращает `Boolean` - Запущен ли соответствующий `powerSaveBlocker`.
