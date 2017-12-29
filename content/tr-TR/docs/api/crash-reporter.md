# crashReporter

> Çökme raporlarını uzak sunucuya gönderin.

Süreç: [Ana](../glossary.md#main-process), [Oluşturucu](../glossary.md#renderer-process)

Aşağıda bir çökme durumunun otomatik olarak uzak sunucuya gönderilmesinin bir örneği var:

```javascript
const {crashReporter} = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://web-adresiniz.com/gonderilecek-adres',
  uploadToServer: true
})
```

Gelen çökme raporlarını kabul edip işleyen bir sunucu kurmak için aşağıdaki projeleri kullanabilirsiniz:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Çökme raporları uygulamaya özel bir geçici dizinde kaydedilir. `isminizin` `ürünü` için çökme raporları `İsminiz Crashes` dizinimde /temp dizini altında tutulacaktır. Bu geçici dizinin yolunu `app.setPath('temp', '/my/custom/temp')` şeklinde kendinize göre ayarlayabilirsiniz.

## Metodlar

`crashReporter` modülü aşağıdaki metodlara sahiptir:

### `crashReporter.start(options)`

* `options` Nesne 
  * `companyName` Katar (opsiyonel)
  * `submitURL` Katar - Çökme raporlarının POST olarak yollanacağı URL.
  * `productName` Katar (opsiyonel) - Varsayılan olarak `app.getName()`.
  * `uploadToServer` Boolean (opsiyonel) - Çökme raporları sunucuya yollansın mı? Varsayılan `true`.
  * `ignoreSystemCrashHandler` Boolean (opsiyonel) - Varsayılan değeri `false`.
  * `extra` Obje (opsiyonel) - Raporla beraber yollanabilir şekilde tanımlayabileceğiniz bir obje. Sadece katar tipinde özellikler düzgün şekilde yollanır. Iç içe objeler desteklenmez, özellik isimleri ve değerleri 64 karakterden küçük olmalıdır.

`crashReporter` API'lerini kullanmak için ve süreçlerin çökme raporlarını almak için her süreçte (main/renderer) bu metodu çağırmalısınız. Farklı süreçlerden farklı opsiyonları `crashReporter.start`'a geçebilirsiniz.

**Not** `child_process` tarafından yaratılmış çocuk süreçlerin Electron modüllerine erişimi olmaz. Bu yüzden, çocuk süreçlere ait raporları toplamak için `process.crashReporter.start` kullanın. Çökme raporlarını geçici olarak tutan dizini işaret eden `crashesDirectory` ile birlikte aynı opsiyonları geçin. `process.crash()` ile çocuk süreci çökerterek bunu test edebilirsiniz.

**Not:** Çocuk süreçlerden çökme raporlarını toplamak için, bu ek kodu da eklemelisiniz. Bu çökmeleri dinleyen ve yollayan süreci başlatır. `submitURL`'i, `productName` ve `crashesDirectory`'i uygun değerlerle değiştirin.

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `setExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

```js
 const args = [
   `--reporter-url=${gonderilecekURL}`,
   `--application-name=${urunIsmi}`,
   `--crashes-directory=${cokmeRaporuDizini}`
 ]
 const env = {
   ELECTRON_INTERNAL_CRASH_SERVICE: 1
 }
 spawn(process.execPath, args, {
   env: env,
   detached: true
 })
```

**Not:** macOS üzerinde Electron, çökme raporu toplama ve raporlama için `crashpad` istemcisi kullanır. Çökme raporlamayı aktif hale getirmek için, `crashpad<code>'i ana süreç içerisinden -hangi süreçten çökmeleri toplayacağınızdan bağımsız olarak-
 <0>crashReporter.start` ile başlatmanız gerekir. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. If no crash reports have been sent or the crash reporter has not been started, `null` is returned.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.setExtraParameter(key, value)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.
* `value` String - Parameter value, must be less than 64 characters long. Specifying `null` or `undefined` will remove the key from the extra parameters.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

## Çökme Raporu verisi

Çökme raporlarlayıcısı aşağıdaki verileri `submitURL` adresine `multipart/form-data` `POST` olarak yollayacaktır:

* `ver` Katar - Electron versiyonu.
* `platform` Katar - örneğin. 'win32'.
* `process_type` Katar - örneğin. 'renderer'.
* `guid` Katar - örneğin. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'
* `_version` Katar - `package.json` içerisindeki versiyon.
* `_productName` Katar - `crashReporter` `options` objesi içerisindeki ürün ismi.
* `prod` Katar - Arkadaki temel ürünün ismi. Bu durum için Electron.
* `_companyName` Katar - `crashReporter` `options` objesi içerisindeki şirket ismi.
* `upload_file_minidump` Dosya - `minidump` formatında çökme raporu.
* `crashReporter``options` objesi içerisindeki `extra`'nın tüm birinci seviye özellikleri.