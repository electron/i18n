# contentTracing

> Собирает данные трассировки из содержимого модуля Chromium для поиска узких мест производительности и медленных операций.

Процесс: [Основной](../glossary.md#main-process)

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

* `resultFilePath` String (optional)

Returns `Promise<String>` - resolves with a path to a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Останавливает запись во всех процессах.

Дочерние процессы кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в главный процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be written to a temporary file, and the path will be returned in the promise.

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

* `value` Number
* `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state.