# contentTracing

> Собирает данные трассировки из содержимого модуля Chromium для поиска узких мест производительности и медленных операций.

Процесс: [Главный](../glossary.md#main-process)

Этот модуль не содержит веб-интерфейса. Для просмотра записанных треков, используйте [trace viewer](https://github.com/catapult-project/catapult/blob/master/tracing), доступного по адресу `chrome://tracing` в Chrome.

**Примечание:** Вам не следует использовать данный модуль до тех пор, пока событие `ready` модуля app не произошло.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  (async () => {
    await contentTracing.startRecording({
      include_categories: ['*']
    })
    console.log('Tracing started')
    await new Promise(resolve => setTimeout(resolve, 5000))
    const path = await contentTracing.stopRecording()
    console.log('Tracing data recorded to ' + path)
  })()
})
```

## Методы

Модуль ` contentTracing` имеет следующие методы:

### `contentTracing.getCategories()`

Возвращает `Promise<String[]>` - возвращает массив групп категорий, как только все дочерние процессы признают запрос `getCategories`

Получить набор групп категорий. Группы категорий могут меняться при достижении новых путей кода. Смотрите также [список встроенных категорий трассировки](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Возвращает `Promise<void>` - возвращается, как только все дочерние процессы признают запрос `startRecording`.

Начинает запись во всех процессах.

Запись начинается незамедлительно локально и ассинхронно в дочерних процессах, как только они получили запрос EnableRecording.

Если запись уже запущена, promise будет немедленно разрешен, поскольку одновременно может выполняться только одна операция трассировки.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (опционально)

Возвращает `Promise<String>` - возвращает путь к файлу, который содержит данные трассировки, как только все дочерние процессы признают запрос `stopRecording`

Останавливает запись во всех процессах.

Дочерние процессы кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в главный процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить Chromium ассинхронно запрашивает все дочерние процессы, чтобы очистить оставшиеся данные трассировки.

Данные трассировки будут записаны в `resultFilePath`. Если `resultFilePath` является пустым или не указано, Данные трассировки будут записаны во временный файл, и путь будет возвращен в promise.

### `contentTracing.getTraceBufferUsage()`

Возвращает `Promise <Object> ` - разрешается с объектом, содержащим `value` и `percentage` максимального использования буфера трассировки

* `value` Number
* `percentage` Number

Максимальное использование в различных процессах буфера трассировки в процентах от полного состояния.
