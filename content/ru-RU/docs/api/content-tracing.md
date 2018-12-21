# contentTracing

> Получайте данные трассировки из модуля содержимого (content module) Chromium для поиска узких мест производительности и медленных операций.

Process: [Main](../glossary.md#main-process)

Этот модуль не включает веб-интерфейс, поэтому Вам необходимо открыть `chrome://tracing/` в браузере Chrome и загрузить сгенерированный файл для просмотра результатов.

**Примечание:** Вам не следует использовать данный модуль до тех пор, пока событие `ready` приложения не произошло.

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Tracing started')

    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Tracing data recorded to ' + path)
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

Получает множество категорий групп. Группы категорий могут быть изменены по мере достижения новых путей кода.

Как только все дочерние процессы выполнили запрос `getCategories`, вызывается `callback` с массивом групп категорий.

### `contentTracing.startRecording(options, callback)`

* `options` Object 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Начинает запись во всех процессах.

Запись начинается незамедлительно локально и ассинхронно в дочерних процессах, как только они получили запрос EnableRecording. `callback` будет вызван, как только все дочерние процессы выполнили запрос `startRecording`.

`categoryFilter` – фильтр, который контролирует какие группы категорий должны быть отслежены. Фильтр может иметь опциональный префикс `-`, чтобы исключить группы категорий, которые содержат соответствующую категорию. Категория не может быть и включена, и исключена одновременно.

Примеры:

* `test_MyTest*`,
* `test_MyTest*`,
* `"-excluded_category1,-excluded_category2`

`traceOptions` контролирует какой тип трассировки включен. Данный параметр представляет собой список, разделенный запятыми. Возможные опции:

* `record-until-full`
* `record-continuously`
* `trace-to-console`
* `enable-sampling`
* `enable-systrace`

Первые 3 опции – режимы записи трассировки, и поэтому они являются взаимоисключающими. Если в строке `traceOptions` появляются более чем один режим записи трассировки, последний имеет приоритет. Если ни один из режимов записи трассировки не указан, режим записи будет `record-until-full`.

Опции трассировки изначально будет установлены в значения по умолчанию (`record_mode` будет `record-until-full`, `enable_sampling` и `enable_systrace` будут `false`), после чего будут установлены значения из `traceOptions`.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

Останавливает запись во всех процессах.

Дочерние процессы кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в главный процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить трассировку, необходимо ассинхронно запросить все дочерние процессы очистить оставшиеся данные трассировки.

Когда все дочерние процессы выполнили запрос `stopRecording`, вызывается `callback` с именем файла, который содержит данные трассировки.

Данные трассировки будут записаны в `resultFilePath` если он не пуст или во временный файл. Настоящий путь будет передан в `callback`, если он не является `null`.

### `contentTracing.startMonitoring(options, callback)`

* `options` Object 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Начинает мониторинг во всех процессах.

Мониторинг начинается незамедлительно локально и ассинхронно в дочерних процессах, как только они получили запрос `startMonitoring`.

`callback` будет вызван, как только все дочерние процессы выполнили запрос ` startMonitoring`.

### `contentTracing.stopMonitoring(callback)`

* `callback` Function

Останавливает мониторинг во всех процессах.

Когда все дочерние процессы выполнили запрос ` stopMonitoring `, вызывается `callback`.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

Получает текущие данные мониторинга.

Дочерние процессы кэшируют данные трассировки и только изредка очищают и отправляют эти данные обратно в главный процесс. Это помогает свести к минимуму издержки трассировки, так как отправка данных трассировки через IPC может быть дорогостоящей операцией. Поэтому, чтобы окончить трассировку, необходимо ассинхронно запросить все дочерние процессы очистить оставшиеся данные трассировки.

Когда все дочерние процессы выполнили запрос ` captureMonitoringSnapshot`, вызывается `callback` с именем файла, который содержит данные трассировки.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

Получает максимальное использование буфера трассировки в процентах среди всех процессов. Когда значение TraceBufferUsage определено, `callback` будет вызван.