# contentTracing

> Collect tracing data from Chromium to find performance bottlenecks and slow operations.

Proseso:[Pangunahi](../glossary.md#main-process)

This module does not include a web interface. To view recorded traces, use [trace viewer](https://github.com/catapult-project/catapult/blob/master/tracing), available at `chrome://tracing` in Chrome.

**Note:** Hindi mo dapat gamitin ang modyul na ito hanggang sa ` kaganapan ng mga app
modulo ay napalabas.</p>

<pre><code class="javascript">const { app, contentTracing } = require('electron')

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
`</pre>

## Mga Paraan

Ang `contentTracing` modyul ay ang sumusunod na pamamaraan:

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached. See also the [list of built-in tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Simulan ang pagtatala ng lahat ng mga proseso.

Ang pagrerekord ay nagsisimula kaagad sa local at asynchronously sa child processes sa oras na matanggap nila ang kahilingan ng EnableRecording.

If a recording is already running, the promise will be immediately resolved, as only one trace operation can be in progress at a time.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (optional)

Returns `Promise<String>` - resolves with a path to a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Itigil ang pagtatala ng mga proseso.

Kadalasang kinaka-cache trace ang data ng child processes and minsan lang ito binabalik sa pangunahing proseso. Tumutulong ito upang mabawasan ang runtime overhead ng pagtukoy  dahil mahal na operasyon ang pag padala nga trace data gamit ang IPC. So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be written to a temporary file, and the path will be returned in the promise.

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

* `value` Number
* `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state.
