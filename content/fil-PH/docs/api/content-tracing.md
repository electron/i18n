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

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[Deprecated Soon](promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached.

### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` na Function

Simulan ang pagtatala ng lahat ng mga proseso. 

Ang pagrerekord ay nagsisimula kaagad sa local at asynchronously sa child processes sa oras na matanggap nila ang kahilingan ng EnableRecording. Ang `callback` ay tatawagan kapag kinilala ng lahat ng child processes ang kahilingan ng`startRecording`. 

**[Deprecated Soon](promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Simulan ang pagtatala ng lahat ng mga proseso. 

Ang pagrerekord ay nagsisimula kaagad sa local at asynchronously sa child processes sa oras na matanggap nila ang kahilingan ng EnableRecording.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

Itigil ang pagtatala ng mga proseso. 

Kadalasang kinaka-cache trace ang data ng child processes and minsan lang ito binabalik sa pangunahing proseso. Tumutulong ito upang mabawasan ang runtime overhead ng pagtukoy dahil mahal na operasyon ang pag padala nga trace data gamit ang IPC. Kaya, para tigilan ang pagsunod, kailangang i-asynchronously ang pagtanong sa child processes para ipantay ang anumang nakabinbin na bakas. 

Kapag kinilala ng child processes ang `stopRecording` request, `callback` ay tatawagan gamit ang file na naglalaman ng traced data. 

Ang trace data ay maaaring isulat sa `resultFilePath` kung hindi ito walang laman o sa isang pansamantalang talakasan. Ang talagang file path ay ipasa sa `callback` kung hindi sa `null` .

**[Deprecated Soon](promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Itigil ang pagtatala ng mga proseso. 

Kadalasang kinaka-cache trace ang data ng child processes and minsan lang ito binabalik sa pangunahing proseso. Tumutulong ito upang mabawasan ang runtime overhead ng pagtukoy dahil mahal na operasyon ang pag padala nga trace data gamit ang IPC. Kaya, para tigilan ang pagsunod, kailangang i-asynchronously ang pagtanong sa child processes para ipantay ang anumang nakabinbin na bakas. 

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

Kunin ang pinakamataas na paggamit ng proseso ng trace buffer bilang bahagdan ng buon estado. Kung ang TraceBufferUsage value ay makilala ang `callback` ay tatawagan.