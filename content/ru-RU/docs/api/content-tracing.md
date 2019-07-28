# contentTracing

> Собирает данные трассировки из содержимого модуля Chromium для поиска узких мест производительности и медленных операций.

Процесс: [Главный](../glossary.md#main-process)

Этот модуль не включает веб-интерфейс, поэтому Вам необходимо открыть `chrome://tracing/` в браузере Chrome и загрузить сгенерированный файл для просмотра результатов.

**Примечание:** Вам не следует использовать данный модуль до тех пор, пока событие `ready` модуля app не произошло.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Трассировка начата')

    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Трассирующие данные записаны в ' + path)
      })
    }, 5000)
  })
})
```

## Методы

Модуль ` contentTracing` имеет следующие методы:

### `contentTracing.getCategories(callback)`

* `callback` Function 
  * `categories` String[]

Получает набор групп категорий. Группы категорий могут меняться по мере достижения новых путей к коду.

Как только все дочерние процессы признают запрос `getCategories`, `callback` вызывается с массивом групп категорий.

**[Скоро устареет](promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Получает набор групп категорий. Группы категорий могут меняться по мере достижения новых путей к коду.

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

Начинает запись во всех процессах.

Запись начинается незамедлительно локально и ассинхронно в дочерних процессах, как только они получили запрос EnableRecording. `callback` будет вызван, как только все дочерние процессы выполнили запрос `startRecording`.

**[Скоро устареет](promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Начинает запись во всех процессах.

Запись начинается незамедлительно локально и ассинхронно в дочерних процессах, как только они получили запрос EnableRecording.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

Останавливает запись во всех процессах.

Дочерние процессы кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в главный процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить трассировку, необходимо ассинхронно запросить все дочерние процессы очистить оставшиеся данные трассировки.

Когда все дочерние процессы выполнили запрос `stopRecording`, вызывается `callback` с именем файла, который содержит данные трассировки.

Данные трассировки будут записаны в `resultFilePath` если он не пуст или во временный файл. Настоящий путь будет передан в `callback`, если он не является `null`.

**[Скоро устареет](promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Останавливает запись во всех процессах.

Дочерние процессы кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в главный процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить трассировку, необходимо ассинхронно запросить все дочерние процессы очистить оставшиеся данные трассировки.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

Получает максимальное использование буфера трассировки в процентах среди всех процессов. Когда значение TraceBufferUsage определено, `callback` будет вызван.