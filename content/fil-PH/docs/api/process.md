# proseso

> Karugtong sa prosesong bagay.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ang `prosesong` bagay ng Electron ay pinalawak mula sa [Node.js `proseso` bagay](https://nodejs.org/api/process.html). Ito ay nagdaragdag ng mga sumusunod na pangyayari, katangian, at mga pamamaraan:

## Mga event

### Pangyayari: 'puno'

Napalabas kapag na-load ng Electron ang kanyang panloob na inisyalisasyon iskrip at simulang mag load ang web page o sa pangunahin iskrip.

Pwede rin itong magamit ng preload iskrip para magdagdag ang tinanggal na Node global na simbolo pabalik sa global scope kung ang integrasyon ng node ay nakapatay. 

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Properties

### `proseso.defaultApp`

Ang `Boolean`. Kung ang app ay nagsimula sa pamamagitan ng ipinapasa bilang parametro sa default app, ang katangiang ito ay `totoo` sa pangunahing proseso, kunghindiman ito ay `malabo`

### `proseso.mas`

Ang `Boolean`. Para sa itinayo na Mac App Store, ang propyedad na ito ay `totoo`, para sa ibang initayo ito ay `malabo`.

### `proseso.noAsar`

Ang `Boolean` na nag kontrol ng ASAR ay nagsuporta sa loob ng iyong aplikasyon. Ang pag set nito sa `totoo` ay hindi mapapagana ang suporta para `asar`arkibos sa Node's built-in modyul.

### `proseso.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. Ang propeyedad na ito ai ginagamit sa halip na `--walang-deprecation` nagt-utos ng linya ng bandila.

### `proseso.pinagkukunanPath`

Ang `String` nag representa ng landas patungo sa pangunahing panuto.

### `proseso.itaponDeprecation`

Ang `Boolean` na kumokontrol kung o hindi ang mga babala sa deprecation ay matatapon bilang eskepsyon. Ang pagtatakda ng mga ito na `totoo` ay magtatapon ng mali para sa deprecations. Ang propeyedad na ito ay ginagamit sa halip na `--tapon-deprecation` naguutos sa bandilang linya.

### `proseso.bakasDeprecation`

Ang `Boolean` na nagkontrol kung o hindi ang deprecation ay nakalimbag sa `stderr` isinama ng isinalansan na bakas. Setting this to `true` will print stack traces for deprecations. Ang propeyedad na ito ay sa halip na ang `--bakas-deprecation` naguutos ng linyang bandila.

### `proseso.bakasProsesoBabala`

Ang `Boolean` na nagkontrol kung o hindi na ang mga babalang proseso ay nakalimbag sa `stderr` isama sa isinalansan na bakas. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `proseso.uri`

Ang `String` ay nagrepresenta sa kasalukuyang prosesong uri, pwede ring `"browser"`(i.e pangunahing proses) o `"gumawa"`.

### `proseso.bersyon.chrome`

Ang `String` nagrepresenta sa bersyon ng Chrome string.

### `proseso.bersyon.electron`

Ang `String` nag representang bersyon ng Electron string.

### `proseso.windowsStore`

Ang `Boolean`. Kung ang app ay tumatakbo bilang Windows Store app (appx), ang propeyedad a `totoo`, para kung hindimna ito ay `malabo`.

## Mga Paraan

Ang `proseso` na bagay ay may mga sumusunod na paraan:

### `proseso.crash()`

Ang mga dahilan ng pangunahing thread sa kasalukuyang proseso ay lumagpak.

### `proseso.getCPUUsage()`

Pagbabalik [` CPUUsage `](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Pagbabalik [`IOCounters`](structures/io-counters.md)

### `proseso.getProsesoMemoryaInfo()`

Returns `Object`:

* `workingSetSize`Integer - Ang halaga ng memorya ay kasalukuyang naka-pin sa aktwal na pisikal na RAM.
* `peakWorkingSetSize` Integer - Ang pinakamataas na halaga ng memorya na hindi pa nai-pin sa aktwal na pisikal RAM.
* `privateBytes` Integer - Ang halaga ng memorya na hindi ibinahagi ng iba pang mga proseso, tulad ng tambakan ng JS o mga nilalaman ng HTML.
* `sharedBytes` Integer - Ang halaga ng memorya na naibahagi sa bawat mga proseso, na kadalasan ay memoryang nagagamit ng mismong code ng Electron.

Nagbabalik ng mga bagay at nagbibigay ng memoryang paggamit ng istatistika tungkol sa kasalukuyang proseso. Tandaan na ang lahat ng istatistik ay iniulat sa Kilobytes.

### `proseso.getSystemMemoryInfo()`

Nagbabalik ng mga `bagay`:

* `kabuuan` Integer - Ang kabuuang halaga ng pisikal na memorya sa Kilobytes na maggagamit sa sistema. 
* `libre` Integer - Ang kabuuang halaga ng memorya na hindi nagagamit sa aplikasyon o disk cache.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Nagbabalik ng bagay at nagbibigay ng memoryang gamit na istatistika tungkol sa buong sistema. Tandaan na ang lahat ng istatistika ay inuulat sa Kilobytes.

### `proseso.hang()`

Dahilan na ang pangunahing thread sa kasalukuyang proseso sabit.

### `proseso.setFdLimit(maxDescriptors)`macOS</em>*Linux*

* `maxDescriptors` Integer

Itakda ang file na tagapaglarawan sa mahinang limitasyon sa `maxDescriptors` o sa OS malakas na limitasyon, alinman ang mas mababa sa kasalukuyang proseso.