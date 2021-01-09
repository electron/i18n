# contentTracing

> Collect tracing data from Chromium to find performance bottlenecks and slow operations.

İşlem: [Ana](../glossary.md#main-process)

This module does not include a web interface. Kaydedilen izleri görüntülemek için [ izleme görüntüleyici ](https://chromium.googlesource.com/catapult/+/HEAD/tracing/README.md) kullanın, Chrome'da ` chrome: // tracing ` adresinde bulunur.

**Not:** Uygulama modülünün `ready` etkinliği belirtilmeden bu modülü kullanmamalısınız.

```javascript
const { app, contentTracing } = require('electron')

app.whenReady().then(() => {
  (async () => {
    await contentTracing.startRecording({
      included_categories: ['*']
    })
    console.log('Tracing started')
    await new Promise(resolve => setTimeout(resolve, 5000))
    const path = await contentTracing.stopRecording()
    console.log('Tracing data recorded to ' + path)
  })()
})
```

## Yöntemler

`contentTracing` modülü aşağıdaki metodları içerir:

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached. See also the [list of built-in tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

> **NOTE:** Electron adds a non-default tracing category called `"electron"`. This category can be used to capture Electron-specific tracing events.

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Tüm işlemler kaydetmeye başlayın.

Kayıt işlemi, EnableRecording isteği alındığı gibi yerel ve asenkron olarak alt süreçlerde başlar.

If a recording is already running, the promise will be immediately resolved, as only one trace operation can be in progress at a time.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (optional)

Returns `Promise<String>` - resolves with a path to a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Kayıt işlemini tüm süreçlerde durdurur.

Alt süreçler tipik olarak izleme verilerini önbelleğe alır ve nadiren temizlerler ve izleme verisini ana sürece gönderirler. Bu çalışma zamanı yükünü en aza indirmeye yardımcı olur. İzleme verilerini IPC üzerinden gönderdikten sonra izlemenin pahalı bir işlemi olabilir. So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be written to a temporary file, and the path will be returned in the promise.

### `contentTracing.getTraceBufferUsage()`

Returns `Promise<Object>` - Resolves with an object containing the `value` and `percentage` of trace buffer maximum usage

* `value` numara
* `percentage` numara

Get the maximum usage across processes of trace buffer as a percentage of the full state.
