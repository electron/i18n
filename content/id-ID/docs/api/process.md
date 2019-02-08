# proses

> Ekstensi untuk memproses objek.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Objek `proses` Elektron diperpanjang dari [Node.js `proses` objek](https://nodejs.org/api/process.html). Ini menambahkan peristiwa, properti, dan metode berikut:

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:

* `crash()`
* `hang()`
* `getHeapStatistics()`
* `getProcessMemoryInfo()`
* `getSystemMemoryInfo()`
* `getCPUUsage()`
* `getIOCounters()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `resourcesPath`
* `sandboxed`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`

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

### `process.defaultApp`

A `Boolean`. Saat aplikasi dimulai dengan diteruskan sebagai parameter ke aplikasi default, ini properti `benar` dalam proses utama, jika tidak `tidak terdefinisi`.

### `process.mas`

A `Boolean`. Untuk pembuatan Mac App Store, properti ini `benar`, untuk bangunan lainnya `tidak terdefinisi`.

### `process.noAsar`

A `Boolean` yang mengontrol dukungan ASAR di dalam aplikasi Anda. Setting ini ke `benar` akan menonaktifkan dukungan untuk arsip` asar` di modul built-in Node.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. Properti ini digunakan bukan flag baris perintah `--no-deprecation `.

### `process.resourcesPath`

A `String` mewakili jalur ke direktori sumber daya.

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

A `Boolean` yang mengontrol apakah peringatan dimusnahkan atau tidak akan dilemparkan pengecualian. Menetapkan ini ke `benar` akan membuang kesalahan untuk penolakan. Properti ini digunakan sebagai pengganti flag baris perintah `-throw-deprecation`.

### `process.traceDeprecation`

A `Boolean` yang mengontrol apakah pencabutan atau tidak dicocokkan ke `stderr ` sertakan jejak tumpukan mereka. Setting this to `true` will print stack traces for deprecations. Properti ini bukan flag baris perintah `- trace deprecation`.

### `process.traceProcessWarnings`

A `Boolean` yang mengontrol apakah proses peringatan atau tidak untuk mencetak `stderr` disertakan  jejak tumpukan mereka. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

A `String` mewakili tipe proses saat ini, bisa jadi ` "browser" ` (yaitu proses utama) atau `"renderer" `.

### `process.versions.chrome`

A ` String` mewakili string versi Chrome.

### `process.versions.electron`

A `String` mewakili string versi Elektron.

### `process.windowsStore`

A `Boolean`. Jika aplikasi berjalan sebagai aplikasi Store Windows (appx), properti ini `benar`, karena jika tidak `tidak terdefinisi`.

## Metode

Objek `proses` memiliki metode berikut:

### `process.crash()`

Penyebab benang utama dari proses crash saat ini.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Mengembalikan[`Penggunaan CPU`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

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

Returns an object with V8 heap statistics. Note that all statistics are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Mengembalikan `Objek`:

* `residentSet` Integer *Linux* and *Windows* - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

Mengembalikan `Objek`:

* `total`Integer - Jumlah total memori fisik di Kilobyte tersedia untuk sistem.
* `gratis` Integer - Jumlah total memori yang tidak digunakan oleh aplikasi atau disk cache.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Mengembalikan objek yang memberikan statistik penggunaan memori tentang keseluruhan sistem. Catatan bahwa semua statistik dilaporkan di Kilobytes.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Penyebab benang utama dari proses saat ini hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Menetapkan file descriptor soft limit ke `maxDescriptors`atau OS yang keras batas, mana yang lebih rendah untuk proses saat ini.