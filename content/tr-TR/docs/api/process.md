# işlem

> İşlem nesnesine uzantılar.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Elektron'un `process` nesnesi [Node.js `process` object](https://nodejs.org/api/process.html)'ten genişletilir. Aşağıdaki etkinlikleri, özellikleri ve yöntemleri ekler:

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:

* `crash()`
* `hang()`
* `getCreationTime()`
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
* `sandboxed`
* `tip`
* `version`
* `versions`
* `mas`
* `windowsStore`

## Events

### Etkinlik: 'yüklenen'

Elektron dahili başlatma komut dosyasını yüklediğinde ve web sayfası ya da ana komut dosyası yüklenmeye başladığında yayılır.

Düğüm entegrasyonu kapatıldığında kaldırılan düğüm genel sembollerini evrensel alana geri eklemek için önyükleme komut dosyası tarafından kullanılabilir:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Özellikler

### `process.defaultApp`

Bir `Boolean`. Uygulama varsayılan uygulamaya parametre olarak geçirilip başlatıldığında, bu özellik ana işlemde `true` olur, aksi takdirde `undefined` olur.

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

Bir `Boolean`. Mac App Store kurmak için, bu özellik `true` olur, diğer kurulumlar için `undefined` olur.

### `process.noAsar`

Uygulamanızın içindeki ASAR desteğini kontrol eden bir `Boolean`. Bunu `true` olarak ayarlamak düğümün dahili modüllerindeki `asar` arşivleri için olan desteği devre dışı bırakacaktır.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. Bu özellik `--no-deprecation` komut satırı etiketi yerine kullanılır.

### `process.enablePromiseAPIs`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr` when formerly callback-based APIs converted to Promises are invoked using callbacks. Setting this to `true` will enable deprecation warnings.

### `process.resourcesPath`

Kaynaklar dizininin yolunu temsil eden bir `String`.

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

İtiraz uyarılarının istisna olarak atılıp atılmayacağını kontrol eden bir `Boolean`. Bunu `true` olarak ayarlamak itirazlar için hatalar oluşturacak. Bu özellik `--throw-deprecation` komut satırı etiketi yerine kullanılır.

### `process.traceDeprecation`

İtirazların yığın izini içeren `stderr`'a yazdırılıp yazdırılmadığını kontrol eden bir `Boolean`. Setting this to `true` will print stack traces for deprecations. Bu özellik `--trace-deprecation` komut satırı etiketi yerine kullanılır.

### `process.traceProcessWarnings`

İşlem uyarılarının yığın izini içeren `stderr`'a yazdırılıp yazdırılmadığını kontrol eden bir `Boolean`. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

A `String` representing the current process's type, can be `"browser"` (i.e. main process), `"renderer"`, or `"worker"` (i.e. web worker).

### `process.versions.chrome`

Chrome versiyonu dizesini temsil eden bir `String`.

### `process.versions.electron`

Elektron versiyonu dizesini temsil eden bir `String`.

### `process.windowsStore`

Bir `Boolean`. Eğer uygulama bir Windows Store uygulaması (appx) olarak çalışıyorsa, bu özellik `true` olur, aksi takdirde `undefined` olur.

## Metodlar

`process` nesnesi aşağıdaki yöntemleri içerir:

### `process.crash()`

Geçerli işlemin ana iş parçacığının çökmesine neden olur.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

[`CPUUsage`](structures/cpu-usage.md)'a döner

### `process.getIOCounters()` *Windows* *Linux*

[`IOCounters`](structures/io-counters.md)'a döner

### `process.getHeapStatistics()`

`Object` 'i geri getirir:

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

`Object` 'i geri getirir:

* `residentSet` Integer *Linux* and *Windows* - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

`Object` 'i geri getirir:

* `total` Tamsayı - Sistemde kullanılabilir durumda olan fiziksel belleğin Kilobayt olarak toplam miktarı.
* `free` Tamsayı - Uygulamalar ve disk önbelleği tarafından kullanılmayan belleğin toplam miktarı.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Tüm sistem hakkında bellek kullanımı istatistiklerini veren bir nesneye döner. Tüm nesnelerin Kilobayt olarak raporlandığına dikkat edin.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Geçerli işlemin ana iş parçacığının askıda kalmasına neden olur.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Tamsayı

Dosya tanımlayıcısının düşük limitini veya OS yüksek limitini `maxDescriptors` olarak ayarlar, geçerli işlem için hangisi daha düşükse.