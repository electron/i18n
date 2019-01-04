# pagsubaybay ng nilalaman

> Pagkolekta ng tracing data galing sa Chromium's content modyul para paghanap ng pagganap bottlenecks at mahinang operasyon.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang modyul na ito ay hindi kinabibilangan ng isang web interface kaya kailangan mong buksan ang `chrome://tracing/` sa Chrome browser at i-load ang nabuong file to makita ang resulta. 

**Note:** Hindi mo dapat gamitin ang modyul na ito hanggang sa ` kaganapan ng mga app
modulo ay napalabas.</p>

<pre><code class="javascript">const { app, contentTracing } = require('electron')

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
`</pre> 

## Mga Paraan

Ang `contentTracing` modyul ay ang sumusunod na pamamaraan:

### `contentTracing.getCategories(callback)
 `

* `callback` Function 
  * `categories` String[]

Magkuha ng isang set ng mga kategorya ng mga grupo. Ang kategorya ng mga grupo ay maaaring magbago kapag ang bagong code paths ay nakamit.

Kapag lahat ng child processes ay nakakilla ng `getCategories` magrequest ng `callback` ay mahihingi sa isang array ng mga kategorya ng mga grupo. 

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` na Function

Simulan ang pagtatala ng lahat ng mga proseso. 

Ang pagrerekord ay nagsisimula kaagad sa local at asynchronously sa child processes sa oras na matanggap nila ang kahilingan ng EnableRecording. Ang `callback` ay tatawagan kapag kinilala ng lahat ng child processes ang kahilingan ng`startRecording`. 

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Punsyon 
  * `resultFilePath` String

Stop recording on all processes.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This helps to minimize the runtime overhead of tracing since sending trace data over IPC can be an expensive operation. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

### `contentTracing.startMonitoring(options, callback)

`

* `pagpipilian` Bagay 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` na Function

Start monitoring on all processes.

Monitoring begins immediately locally and asynchronously on child processes as soon as they receive the `startMonitoring` request.

Once all child processes have acknowledged the `startMonitoring` request the `callback` will be called.

### `contentTracing.stopMonitoring(callback)`

* `callback` na Function

Stop monitoring on all processes.

Once all child processes have acknowledged the `stopMonitoring` request the `callback` is called.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Punsyon 
  * `resultFilePath` String

Get the current monitoring traced data.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This is because it may be an expensive operation to send the trace data over IPC and we would like to avoid unneeded runtime overhead from tracing. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `captureMonitoringSnapshot` request the `callback` will be called with a file that contains the traced data.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Punsyon 
  * `value` Number
  * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.