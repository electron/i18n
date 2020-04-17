# pelacakan konten

> Collect tracing data from Chromium to find performance bottlenecks and slow operations.

Proses: [Main](../glossary.md#main-process)

This module does not include a web interface. To view recorded traces, use [trace viewer](https://github.com/catapult-project/catapult/blob/master/tracing), available at `chrome://tracing` in Chrome.

**Catatan:** Anda tidak boleh menggunakan modul ini sampai acara ` siap` dari aplikasi modul dipancarkan.

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

## Methods

Modul ` contentTracing ` memiliki metode berikut:

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached. See also the [list of built-in tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Mulai rekaman pada semua proses.

Pencatatan dimulai segera secara lokal dan asinkron pada proses anak segera setelah mereka menerima permintaan Aktifkan Rekaman.

If a recording is already running, the promise will be immediately resolved, as only one trace operation can be in progress at a time.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (optional)

Returns `Promise<String>` - resolves with a path to a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Berhenti merekam pada semua proses.

Proses anak biasanya menyimpan data jejak dan jarang disiram dan dikirim Jejak data kembali ke proses utama. Ini membantu meminimalkan overhead runtime Dari penelusuran sejak mengirim data jejak melalui IPC bisa menjadi operasi yang mahal. So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be written to a temporary file, and the path will be returned in the promise.

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

* `nilai` Nomor
* `persentase` Nomor

Get the maximum usage across processes of trace buffer as a percentage of the full state.
