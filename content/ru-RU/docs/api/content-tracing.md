# contentTracing

> Собирает данные трассировки из содержимого модуля Chromium для поиска узких мест производительности и медленных операций.

Процесс: [Основной](../glossary.md#main-process)

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

**[Скоро устареет](modernization/promisification.md)**

### `contentTracing.getCategories()`

Возвращает `Promise<String[]>` - возвращает массив групп категорий, как только все дочерние процессы признают запрос `getCategories`

Получает набор групп категорий. Группы категорий могут меняться по мере достижения новых путей к коду.

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

Начинает запись во всех процессах.

Запись начинается сразу локально и асинхронно на дочерних процессах как только они получат запрос на запись. `callback` будет вызываться, как только все дочерние процессы признают запрос `startRecording`.

**[Скоро устареет](modernization/promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Возвращает `Promise<void>` - возвращается, как только все дочерние процессы признают запрос `startRecording`.

Начинает запись во всех процессах.

Запись начинается сразу локально и асинхронно на дочерних процессах как только они получат запрос на запись.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

Останавливает запись во всех процессах.

Дочерние процессы обычно кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в основной процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить трассировку, необходимо ассинхронно запросить у всех дочерних процессов очистить оставшиеся данные трассировки.

Когда все дочерние процессы признают запрос `stopRecording`, вызывается `callback` с именем файла, который содержит данные трассировки.

Данные трассировки будут записаны в `resultFilePath`, если он не пуст, или во временный файл. Настоящий путь будет передан в `callback`, если он не является `null`.

**[Скоро устареет](modernization/promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

Возвращает `Promise<String>` - возвращает файл, который содержит данные трассировки, как только все дочерние процессы признают запрос `stopRecording`

Останавливает запись во всех процессах.

Дочерние процессы обычно кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в основной процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить трассировку, необходимо ассинхронно запросить у всех дочерних процессов очистить оставшиеся данные трассировки.

Данные трассировки будут записаны в `resultFilePath`, если он не пуст, или во временный файл.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * Object 
    * `value` Number
    * `percentage` Number

Получает максимальное использование буфера трассировки в процентах среди всех процессов. Когда значение TraceBufferUsage определено, `callback` будет вызван.

**[Скоро устареет](modernization/promisification.md)**

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

Get the maximum usage across processes of trace buffer as a percentage of the full state.