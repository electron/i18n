# işlem

> İşlem nesnesine uzantılar.

İşlem: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Elektron'un `process` nesnesi [Node.js `process` object](https://nodejs.org/api/process.html)'ten genişletilir. Aşağıdaki etkinlikleri, özellikleri ve yöntemleri ekler:

## Etkinlikler

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

### `process.mas`

Bir `Boolean`. Mac App Store kurmak için, bu özellik `true` olur, diğer kurulumlar için `undefined` olur.

### `process.noAsar`

Uygulamanızın içindeki ASAR desteğini kontrol eden bir `Boolean`. Bunu `true` olarak ayarlamak düğümün dahili modüllerindeki `asar` arşivleri için olan desteği devre dışı bırakacaktır.

### `process.noDeprecation`

İtiraz uyarılarının `stderr`'a yazdırılıp yazdırılmadığını kontrol eden bir `Boolean`.  
Bunu `true` olarak ayarlamak itiraz uyarılarını susturacaktır. Bu özellik `--no-deprecation` komut satırı etiketi yerine kullanılır.

### `process.resourcesPath`

Kaynaklar dizininin yolunu temsil eden bir `String`.

### `process.throwDeprecation`

İtiraz uyarılarının istisna olarak atılıp atılmayacağını kontrol eden bir `Boolean`. Bunu `true` olarak ayarlamak itirazlar için hatalar oluşturacak. Bu özellik `--throw-deprecation` komut satırı etiketi yerine kullanılır.

### `process.traceDeprecation`

İtirazların yığın izini içeren `stderr`'a yazdırılıp yazdırılmadığını kontrol eden bir `Boolean`. Bunu `true` olarak ayarlamak itirazların yığın izlerini yazdıracak. Bu özellik `--trace-deprecation` komut satırı etiketi yerine kullanılır.

### `process.traceProcessWarnings`

İşlem uyarılarının yığın izini içeren `stderr`'a yazdırılıp yazdırılmadığını kontrol eden bir `Boolean`. Bunu `true` olarak ayarlamak işlem uyarılarının yığın izlerini yazdıracak (itirazlar dahil). Bu özellik `--trace-warnings` komut satırı etiketinin yerine kullanılmalıdır.

### `process.type`

Geçerli işlemin türünü temsil eden bir `String`, `"browser"` (örneğin ana işlem) ya da `"renderer"` olabilir.

### `process.versions.chrome`

Chrome versiyonu dizesini temsil eden bir `String`.

### `process.versions.electron`

Elektron versiyonu dizesini temsil eden bir `String`.

### `process.windowsStore`

Bir `Boolean`. Eğer uygulama bir Windows Store uygulaması (appx) olarak çalışıyorsa, bu özellik `true` olur, aksi takdirde `undefined` olur.

## Yöntemler

`process` nesnesi aşağıdaki yöntemleri içerir:

### `process.crash()`

Geçerli işlemin ana iş parçacığının çökmesine neden olur.

### `process.getCPUUsage()`

[`CPUUsage`](structures/cpu-usage.md)'a döner

### `process.getIOCounters()` *Windows* *Linux*

[`IOCounters`](structures/io-counters.md)'a döner

### `process.getProcessMemoryInfo()`

`Object`'e döner:

* `workingSetSize` Tamsayı - O anda gerçek fiziksel RAM'e sabitlenmiş bellek miktarı.
* `peakWorkingSetSize` Tamsayı - Gerçek fiziksel RAM'e sabitlenmiş maksimum bellek miktarı.
* `privateBytes` Tamsayı - Diğer işlemlerle paylaşılmayan bellek miktarı, JS yığını ya da HTML içeriği gibi.
* `sharedBytes` Tamsayı - İşlemler arasında paylaşılan bellek miktarı, genel olarak Elektron kodunun kendisi tarafından tüketilen bellek

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes.

### `process.getSystemMemoryInfo()`

Returns `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer - The total amount of swap memory in Kilobytes available to the system. *Windows* *Linux*
* `swapFree` Integer - The free amount of swap memory in Kilobytes available to the system. *Windows* *Linux*

Tüm sistem hakkında bellek kullanım istatistiklerini veren bir nesneyi döndürür. Tüm istatistiklerin kilobayt cinsinden rapor edildiğini not et.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.