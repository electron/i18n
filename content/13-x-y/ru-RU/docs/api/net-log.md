# netLog

> Журналирование сетевых событий сессии.

Процесс: [Основной](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.whenReady().then(async () => {
  await netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

Смотрите [`--log-net-log`](command-line-switches.md#--log-net-logpath) для регистрации сетевых событий на протяжении всего жизненного цикла приложения.

**Примечание:** Все методы, если не указано другого, могут быть использованы только после того, как событие `ready` модуля `app` будет отправлено.

## Методы

### `netLog.startLogging(path[, options])`

* `path` String - путь к файлу для записи сетевых журналов.
* `options` Object (опционально)
  * `captureMode` String (опционально) - Какие типы данных должны быть зафиксированы. По умолчанию будут записаны только метаданные о запросах. Установка этого в `includeSensitive` будет включать cookies и данные аутентификации. Установка на `everything` включит все байты, передаваемые на сокеты. Может быть `default`, `includeSensitive` или `everything`.
  * `maxFileSize` Number (опционально) - Когда журнал заполнится и станет больше этого размера, регистрация автоматически прекратится. По умолчанию неограничено.

Возвращает `Promise<void>` - разрешает, когда сетевой журнал начал запись.

Запускает запись сетевых событий в `path`.

### `netLog.stopLogging()`

Returns `Promise<void>` - resolves when the net log has been flushed to disk.

Остановка записи сетевых событий. Если не вызвано, ведение сетевого журнала автоматически закроется при выходе из приложения.

## Свойства

### `netLog.currentlyLogging` _Только чтение_

A `Boolean` property that indicates whether network logs are currently being recorded.
