# proses

> Ekstensi untuk memproses objek.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Objek `proses` Elektron diperpanjang dari [Node.js `proses` objek](https://nodejs.org/api/process.html). Ini menambahkan peristiwa, properti, dan metode berikut:

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:
- `crash()`
- `hang()`
- `getCreationTime()`
- `getHeapStatistics()`
- `getBlinkMemoryInfo()`
- `getProcessMemoryInfo()`
- `getSystemMemoryInfo()`
- `getSystemVersion()`
- `getCPUUsage()`
- `getIOCounters()`
- `argv`
- `execPath`
- `env`
- `pid`
- `arch`
- `platform`
- `sandboxed`
- `type`
- `version`
- `versions`
- `mas`
- `windowsStore`

## Events

### Acara: 'dimuat'

Emitted ketika Elektron telah memuat inisialisasi internal script dan mulai memuat halaman web atau script utama.

Ini dapat digunakan oleh skrip preload untuk menambahkan simbol global Node yang dihapus ke lingkup global saat integrasi simpul dimatikan:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## properti

### `process.defaultApp` _Readonly_

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _Readonly_

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _Readonly_

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. Properti ini digunakan bukan flag baris perintah `--no-deprecation `.

### `process.enablePromiseAPIs`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr` when formerly callback-based APIs converted to Promises are invoked using callbacks. Setting this to `true` will enable deprecation warnings.

### `process.resourcesPath` _Readonly_

A `String` mewakili jalur ke direktori sumber daya.

### `process.sandboxed` _Readonly_

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

A `Boolean` yang mengontrol apakah peringatan dimusnahkan atau tidak akan dilemparkan pengecualian. Menetapkan ini ke `benar` akan membuang kesalahan untuk penolakan. Properti ini digunakan sebagai pengganti flag baris perintah `-throw-deprecation`.

### `process.traceDeprecation`

A `Boolean` yang mengontrol apakah pencabutan atau tidak dicocokkan ke `stderr ` sertakan jejak tumpukan mereka. Setting this to `true` will print stack traces for deprecations. Properti ini bukan flag baris perintah `- trace deprecation`.

### `process.traceProcessWarnings`
A `Boolean` yang mengontrol apakah proses peringatan atau tidak untuk mencetak `stderr` disertakan  jejak tumpukan mereka. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type` _Readonly_

A `String` representing the current process's type, can be `"browser"` (i.e. main process), `"renderer"`, or `"worker"` (i.e. web worker).

### `process.versions.chrome` _Readonly_

A ` String` mewakili string versi Chrome.

### `process.versions.electron` _Readonly_

A `String` mewakili string versi Elektron.

### `process.windowsStore` _Readonly_

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## Metode

Objek `proses` memiliki metode berikut:

### `process.crash()`

Penyebab benang utama dari proses crash saat ini.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. Waktu direpresentasikan dalam satuan milisecond. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Mengembalikan[`Penggunaan CPU`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

Mengembalikan [`IO Penghitung`](structures/io-counters.md)

### `process.getHeapStatistics()`

Mengembalikan `Objek`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Returns an object with V8 heap statistics. Perhatikan bahwa semua statistik dilaporkan di Kilobytes.

### `process.getBlinkMemoryInfo()`

Mengembalikan `Objek`:

* `allocated` Integer - Size of all allocated objects in Kilobytes.
* `marked` Integer - Size of all marked objects in Kilobytes.
* `total` Integer - Total allocated space in Kilobytes.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Returns `Promise<ProcessMemoryInfo>` - Resolves with a [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

Mengembalikan `Objek`:

* `total`Integer - Jumlah total memori fisik di Kilobyte tersedia untuk sistem.
* `gratis` Integer - Jumlah total memori yang tidak digunakan oleh aplikasi atau disk cache.
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

Contoh:

```js
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
```

**Note:** It returns the actual operating system version instead of kernel version on macOS unlike `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Penyebab benang utama dari proses saat ini hang.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

Menetapkan file descriptor soft limit ke `maxDescriptors`atau OS yang keras batas, mana yang lebih rendah untuk proses saat ini.
