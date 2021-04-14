## Класс: Работники сервиса

> Запрос и получение событий от сессий активных работников службы.

Процесс: [Основной](../glossary.md#main-process)

К экземплярам `ServiceWorkers` доступны с помощью `serviceWorkers` имущества `Session`.

Например:

```javascript
const { session } требуют ('электрон')

// Получить все работники службы.
консоль.log (session.defaultSession.serviceWorkers.getAllRunning())

// Ручка журналов и получить информацию работника службы
session.defaultSession.serviceWorkers.on ('консоль-сообщение', (событие, сообщениеОтделы) -> - консоль
  .log (
    'Got service worker message',
    messageDetails,
    'from',
    session.defaultSession.serviceWorkers.getFromVersionID (messageDetails.versionId)
  )
)
```

### События экземпляра

Следующие события доступны на экземплярах `ServiceWorkers`:

#### Событие: 'консоль-сообщение'

Возвращает:

* `event` Event
* `messageDetails` объект - Информация о сообщении консоли
  * `message` строка - фактическое сообщение консоли
  * `versionId` номер - Идентификатор версии сотрудника службы, который отправил сообщение журнала
  * `source` String - Тип источника для этого сообщения.  Могут быть `javascript`, `xml`, `network`, `console-api`, `storage`, `app-cache`, `rendering`, `security`, `deprecation`, `worker`, `violation`, `intervention`, `recommendation` или `other`.
  * `level` номер - уровень журнала, от 0 до 3. Для того, чтобы он `verbose`, `info`, `warning` и `error`.
  * `sourceUrl` строка - URL сообщение пришло от
  * `lineNumber` номер - номер строки источника, который вызвал это сообщение консоли

Излучаемый, когда работник службы регистрирует что-то на консоли.

### Методы экземпляра

Следующие методы доступны на экземплярах `ServiceWorkers`:

#### `serviceWorkers.getAllRunning()`

Возвращает `Record<Number, ServiceWorkerInfo>` - [ServiceWorkerInfo](structures/service-worker-info.md) объект, где ключи являются идентификатором версии работника службы и значениями являются информация об этом работнике службы.

#### `serviceWorkers.getFromVersionID (версияId)`

* `versionId` номер

Возвращает [`ServiceWorkerInfo`](structures/service-worker-info.md) - Информация об этом сервисе работника

Если работник службы не существует или не работает, этот метод будет делать исключение.
