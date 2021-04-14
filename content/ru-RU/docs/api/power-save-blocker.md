# powerSaveBlocker

> Предотвращает переход системы в режим пониженного потребления питания.

Процесс: [Основной](../glossary.md#main-process)

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

* `type` String - Тип блокировщика энергоемкого сохранения.
  * `prevent-app-suspension` - Предотвратить приостановление подачи заявки. Сохраняет активную систему, но позволяет выключить экран. Пример использования случаев: загрузку файла или воспроизведение звука.
  * `prevent-display-sleep` - Предотвращение отображения от сна. Сохраняет систему и экран активным. Пример использования случая: воспроизведение видео.

Возвращает `Integer` - Идентификатор блокировщика, назначенный этому блокировщику питания.

Начинает препятствовать вводу системы в режим с меньшей мощностью. Возвращает integer идентифицирует блокатор энергосберег.

**Примечание:** `prevent-display-sleep` имеет более высокий приоритет над `prevent-app-suspension`. Вступает в силу только наиболее высокий тип приоритета. Другими словами, `prevent-display-sleep` всегда выше `prevent-app-suspension`.

Например, API-интерфейс, вызывающий запросы A для `prevent-app-suspension`, и другой вызов запросов B для `prevent-display-sleep`. `prevent-display-sleep` будет использоваться до тех пор, пока B не прекратит свой запрос. После этого, будет использоваться `prevent-app-suspension`.

### `powerSaveBlocker.stop(id)`

* `id` Integer - Идентификатор блокировщика энергосбережения, возвращённый `powerSaveBlocker.start`.

Останавливает указанный блокировщик энергосбережения.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - Идентификатор блокировщика энергосбережения, возвращённый `powerSaveBlocker.start`.

Возвращает `Boolean` - Запущен ли соответствующий `powerSaveBlocker`.
