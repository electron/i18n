# contentTracing

> Pagkolekta ng tracing data galing sa Chromium's content modyul para paghanap ng pagganap bottlenecks at mahinang operasyon.

Proseso: [Main](../glossary.md#main-process)

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

## Pamamaraan

Ang `contentTracing` modyul ay ang sumusunod na pamamaraan:

### `contentTracing.getCategories(callback)
 `

* `callback` Function 
  * `categories` String[]

Magkuha ng isang set ng mga kategorya ng mga grupo. Ang kategorya ng mga grupo ay maaaring magbago kapag ang bagong code paths ay nakamit.

Kapag lahat ng child processes ay nakakilla ng `getCategories` magrequest ng `callback` ay mahihingi sa isang array ng mga kategorya ng mga grupo. 

### `contentTracing.startRecording(options, callback)`

* `options` Bagay 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Simulan ang pagtatala ng lahat ng mga proseso. 

Ang pagrerekord ay nagsisimula kaagad sa local at asynchronously sa child processes sa oras na matanggap nila ang kahilingan ng EnableRecording. Ang `callback` ay tatawagan kapag kinilala ng lahat ng child processes ang kahilingan ng`startRecording`. 

`categoryFilter` ay isang filter upang makontrol kung anong grupo ng kategorya ang dapat matunton. Ang filter ay may opsiyonal `` panlapi upang ibukod ang mga grupo ng kategorya na naglalamagn ng nagtutugmang kategorya. HIndi suportado ang pagkakaroon ng kapwa kabilang at hindi kabilang kategoryang patterns sa parehong listahan.

Mga Halimbawa:

* `test_MyTest*`,
* `test_MyTest*,test_OtherStuff`,
* `"-excluded_category1,-excluded_category2`

`traceOptions` nagkokontrol kung anong uri ng pagsunod ang pinagana, ito ay comma-delimited na listahan. Posibling pagpipilian ay:

* `talaan hanggang puno`
* `talaan-patuloy`
* `trace-to-console`
* `enable-sampling`
* `enable-systrace`

Ang unang tatlong opsyons ay bakas rekording mode at kaya eksklusibong pare-pareho. Kung mahigit isang bakas rekording mode ang lumitaw sa `traceOptions` string, ang huli ang uunahin. Pag walang bakas rekording modes ay tinukoy, recording mode ay ` record-until-full`.

Ang opsyon na bakas ay marereset muna sa default opsyon(`record_mode` magtakda ng mga `record-until-full`, `enable_sampling` at `enable_systrace` nakatakda sa `false`) bago ang mga opsyon na parsed mula sa `traceOptions` ay nilalapat sa mga ito.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` function 
  * `resultFilePath` String

Itigil ang pagtatala ng mga proseso. 

Kadalasang kinaka-cache trace ang data ng child processes and minsan lang ito binabalik sa pangunahing proseso. Tumutulong ito upang mabawasan ang runtime overhead ng pagtukoy dahil mahal na operasyon ang pag padala nga trace data gamit ang IPC. Kaya, para tigilan ang pagsunod, kailangang i-asynchronously ang pagtanong sa child processes para ipantay ang anumang nakabinbin na bakas. 

Kapag kinilala ng child processes ang `stopRecording` request, `callback` ay tatawagan gamit ang file na naglalaman ng traced data. 

Ang trace data ay maaaring isulat sa `resultFilePath` kung hindi ito walang laman o sa isang pansamantalang talakasan. Ang talagang file path ay ipasa sa `callback` kung hindi sa `null` .

### `contentTracing.startMonitoring(options, callback)

`

* `opsyons` Bagay 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Simulan ang pagtatala sa lahat ng mga proseso. 

Ang pagtatala ay nagsisimula agad sa lokal at asynchronous sa child processes sa oras na matanggap nila ang reuest na `startMonitoring`.

Kapag kinilala ng child processes ang`startMonitoring` request the `callback` ay tatawagan.

### `contentTracing.stopMonitoring(callback)`

* `callback` Function

Tigilan ang pagtatala sa lahat ng proseso.

Kapag kinilala ng child processes ang`stopMonitoring` request the `callback` ay tatawagan.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` function 
  * `resultFilePath` String

Kumuha ng kasalukuyang nagtatala ng traced data.

Kadalasang kinaka-cache trace ang data ng child processes and minsan lang ito binabalik sa pangunahing proseso. Ito ay dahil baka mahal ang opersayon ng pagpapadala ng trace data gamit ang IPC at gusto nating maiwasan ang mga hindi kailangang runtime overhead mula sa tracing. Kaya, para matigilan ang tracing, dapat nating tanunging ng pa-asynchronous ang lahat ng child processes para ipantay ang anumang nakabinbin na trace data. 

Kapag kinilala ng child processes ang `captureMonitoringSnapshot` request the `callback` ay tatawagan gamit ang talaksan na naglalaman ng traced data.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

Kunin ang pinakamataas na paggamit ng proseso ng trace buffer bilang bahagdan ng buon estado. Kung ang TraceBufferUsage value ay makilala ang `callback` ay tatawagan.