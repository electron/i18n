# netLog

> Журналирование сетевых событий сессии.

Процесс: [Главный](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async function () {
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

Смотрите [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) для регистрации сетевых событий на протяжении всего жизненного цикла приложения.

**Примечание:** Все методы, если не указано другого, могут быть использованы только после того, как событие `ready` модуля `app` будет отправлено.

## Методы

### `netLog.startLogging(path)`

* `path` String - путь к файлу для записи сетевых журналов.

Запускает запись сетевых событий в `path`.

### `netLog.stopLogging([callback])`

* `callback` Function (опционально)
  * `path` String - File path to which network logs were recorded.

Остановка записи сетевых событий. Если не вызвано, ведение сетевого журнала автоматически закроется при выходе из приложения.

**[Скоро устареет](modernization/promisification.md)**

### `netLog.stopLogging()`

Возвращает `Promise<String>` - разрешает путь к файлу, в который были записаны сетевые журналы.

Остановка записи сетевых событий. Если не вызвано, ведение сетевого журнала автоматически закроется при выходе из приложения.

## Свойства

### `netLog.currentlyLogging`

Свойство `Boolean`, указывающее на запись сетевых журналов.

### `netLog.currentlyLoggingPath`

Свойство `String`, которое возвращает путь к текущему файлу журнала.
