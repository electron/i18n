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

Получить набор групп категорий. Группы категорий могут меняться при достижении новых путей кода.

Как только все дочерние процессы признают запрос `getCategories`, `callback` вызывается с массивом групп категорий.

**[Скоро устареет](modernization/promisification.md)**

### `contentTracing.getCategories()`

Возвращает `Promise<String[]>` - возвращает массив групп категорий, как только все дочерние процессы признают запрос `getCategories`

Получить набор групп категорий. Группы категорий могут меняться при достижении новых путей кода.


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

Дочерние процессы кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в главный процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить трассировку, необходимо ассинхронно запросить все дочерние процессы очистить оставшиеся данные трассировки.

Когда все дочерние процессы признают запрос `stopRecording`, вызывается `callback` с именем файла, который содержит данные трассировки.

Данные трассировки будут записаны в `resultFilePath`, если он не пуст, или во временный файл. Фактический путь к файлу будет передан `callback` если он не `null`.

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

Максимальное использование в различных процессах буфера трассировки в процентах от полного состояния. При определении значения TraceBufferUsage вызывается `callback`.

**[Скоро устареет](modernization/promisification.md)**

### `contentTracing.getTraceBufferUsage()`

Возвращает `Promise <Object> ` - разрешается с объектом, содержащим `value` и `percentage` максимального использования буфера трассировки

Максимальное использование в различных процессах буфера трассировки в процентах от полного состояния.
