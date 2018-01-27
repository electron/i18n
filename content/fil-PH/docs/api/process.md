# proseso

> Karugtong sa prosesong bagay.

Proseso:[Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ang `prosesong` bagay ng Electron ay pinalawak mula sa [Node.js `proseso` bagay](https://nodejs.org/api/process.html). Ito ay nagdaragdag ng mga sumusunod na pangyayari, katangian, at mga pamamaraan:

## Pangyayari

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

## Mga Katangian

### `proseso.defaultApp`

Ang `Boolean`. Kung ang app ay nagsimula sa pamamagitan ng ipinapasa bilang parametro sa default app, ang katangiang ito ay `totoo` sa pangunahing proseso, kunghindiman ito ay `malabo`

### `proseso.mas`

Ang `Boolean`. Para sa itinayo na Mac App Store, ang propyedad na ito ay `totoo`, para sa ibang initayo ito ay `malabo`.

### `proseso.noAsar`

Ang `Boolean` na nag kontrol ng ASAR ay nagsuporta sa loob ng iyong aplikasyon. Ang pag set nito sa `totoo` ay hindi mapapagana ang suporta para `asar`arkibos sa Node's built-in modyul.

### `proseso.noDeprecation`

Ang `Boolean` na nag kokontrol kung ang mga babala ng deprecation ay ililimbag sa `stderr`.  
Patatakda nito sa `totoo` ay patatahimikin ang babala ng deprecation. Ang propeyedad na ito ai ginagamit sa halip na `--walang-deprecation` nagt-utos ng linya ng bandila.

### `proseso.pinagkukunanPath`

Ang `String` nag representa ng landas patungo sa pangunahing panuto.

### `proseso.itaponDeprecation`

Ang `Boolean` na kumokontrol kung o hindi ang mga babala sa deprecation ay matatapon bilang eskepsyon. Ang pagtatakda ng mga ito na `totoo` ay magtatapon ng mali para sa deprecations. Ang propeyedad na ito ay ginagamit sa halip na `--tapon-deprecation` naguutos sa bandilang linya.

### `proseso.bakasDeprecation`

Ang `Boolean` na nagkontrol kung o hindi ang deprecation ay nakalimbag sa `stderr` isinama ng isinalansan na bakas. Ang pagtatakda nito sa `totoo` ay maglilimbag ng isinalansan na bakas. Ang propeyedad na ito ay sa halip na ang `--bakas-deprecation` naguutos ng linyang bandila.

### `proseso.bakasProsesoBabala`

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

A `String` representing the current process's type, can be `"browser"` (i.e. main process) or `"renderer"`.

### `process.versions.chrome`

A `String` representing Chrome's version string.

### `process.versions.electron`

A `String` representing Electron's version string.

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## Pamamaraan

The `process` object has the following methods:

### `process.crash()`

Causes the main thread of the current process crash.

### `process.getCPUUsage()`

Returns [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Returns [`IOCounters`](structures/io-counters.md)

### `process.getProcessMemoryInfo()`

Returns `Object`:

* `workingSetSize` Integer - The amount of memory currently pinned to actual physical RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes.

### `process.getSystemMemoryInfo()`

Returns `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer - The total amount of swap memory in Kilobytes available to the system. *Windows* *Linux*
* `swapFree` Integer - The free amount of swap memory in Kilobytes available to the system. *Windows* *Linux*

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.