# pagsubaybay ng nilalaman

> Collect tracing data from Chromium's content module for finding performance bottlenecks and slow operations.

Proseso:[Pangunahi](../glossary.md#main-process)

This module does not include a web interface so you need to open `chrome://tracing/` in a Chrome browser and load the generated file to view the result.

**Note:** You should not use this module until the `ready` event of the app module is emitted.

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

## Mga Paraan

Ang `contentTracing` modyul ay ang sumusunod na pamamaraan:

### `contentTracing.getCategories(callback)
 `

* `callback` na Function
  * `categories` String[]

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached.


### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` na Function

Simulan ang pagtatala ng lahat ng mga proseso.

Ang pagrerekord ay nagsisimula kaagad sa local at asynchronously sa child processes sa oras na matanggap nila ang kahilingan ng EnableRecording. The `callback` will be called once all child processes have acknowledged the `startRecording` request.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Simulan ang pagtatala ng lahat ng mga proseso.

Ang pagrerekord ay nagsisimula kaagad sa local at asynchronously sa child processes sa oras na matanggap nila ang kahilingan ng EnableRecording.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` na Function
  * `resultFilePath` String

Itigil ang pagtatala ng mga proseso.

Kadalasang kinaka-cache trace ang data ng child processes and minsan lang ito binabalik sa pangunahing proseso. Tumutulong ito upang mabawasan ang runtime overhead ng pagtukoy  dahil mahal na operasyon ang pag padala nga trace data gamit ang IPC. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Itigil ang pagtatala ng mga proseso.

Kadalasang kinaka-cache trace ang data ng child processes and minsan lang ito binabalik sa pangunahing proseso. Tumutulong ito upang mabawasan ang runtime overhead ng pagtukoy  dahil mahal na operasyon ang pag padala nga trace data gamit ang IPC. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` na Function
  * Bagay
    * `value` Number
    * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.

**[Deprecated Soon](modernization/promisification.md)**

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

Get the maximum usage across processes of trace buffer as a percentage of the full state.
