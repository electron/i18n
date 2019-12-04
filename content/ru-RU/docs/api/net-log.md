# netLog

> Журналирование сетевых событий сессии.

Процесс: [Главный](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async () => {
  await netLog.startLogging('/path/to/net-log')
  // После некоторых сетевых событий
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

Смотрите [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) для регистрации сетевых событий на протяжении всего жизненного цикла приложения.

**Примечание:** Все методы, если не указано другого, могут быть использованы только после того, как событие `ready` модуля `app` будет отправлено.

## Методы

### `netLog.startLogging(path[, options])`

* `path` String - путь к файлу для записи сетевых журналов.
* `options` Object (опционально) 
  * `captureMode` String (опционально) - Какие типы данных должны быть зафиксированы. По умолчанию будут записаны только метаданные о запросах. Установка этого в `includeSensitive` будет включать cookies и данные аутентификации. Setting it to `everything` will include all bytes transferred on sockets. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

Starts recording network events to `path`.

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

Stops recording network events. If not called, net logging will automatically end when app quits.

## Свойства

### `netLog.currentlyLogging` *Readonly*

A `Boolean` property that indicates whether network logs are recorded.

### `netLog.currentlyLoggingPath` *Readonly* *Deprecated*

A `String` property that returns the path to the current log file.