# crashReporter

> Çökme raporlarını uzak sunucuya gönderin.

İşlem: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Aşağıda bir çökme durumunun otomatik olarak uzak sunucuya gönderilmesinin bir örneği var:

```javascript
const { crashReporter } = require('electron')

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

Or use a 3rd party hosted solution:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Çökme raporları uygulamaya özel bir geçici dizinde kaydedilir. `isminizin` `ürünü` için çökme raporları `İsminiz Crashes` dizinimde /temp dizini altında tutulacaktır. Bu geçici dizinin yolunu `app.setPath('temp', '/my/custom/temp')` şeklinde kendinize göre ayarlayabilirsiniz.

## Metodlar

`crashReporter` modülü aşağıdaki metodlara sahiptir:

### `crashReporter.start(options)`

* `options` Object
  * `companyName` String
  * `submitURL` Katar - Çökme raporlarının POST olarak yollanacağı URL.
  * `productName` String (optional) - Defaults to `app.name`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. Varsayılanı `true`.
  * `ignoreSystemCrashHandler` Boolean (opsiyonel) - Varsayılan değeri `false`.
  * `extra` Record<String, String> (optional) - An object you can define that will be sent along with the report. Sadece katar tipinde özellikler düzgün şekilde yollanır. Nested objects are not supported. When using Windows, the property names and values must be fewer than 64 characters.
  * `crashesDirectory` String (optional) - Directory to store the crash reports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

`crashReporter` API'lerini kullanmak için ve süreçlerin çökme raporlarını almak için her süreçte (main/renderer) bu metodu çağırmalısınız. Farklı süreçlerden farklı opsiyonları `crashReporter.start`'a geçebilirsiniz.

**Note** Child processes created via the `child_process` module will not have access to the Electron modules. Bu yüzden, çocuk süreçlere ait raporları toplamak için `process.crashReporter.start` kullanın. Çökme raporlarını geçici olarak tutan dizini işaret eden `crashesDirectory` ile birlikte aynı opsiyonları geçin. `process.crash()` ile çocuk süreci çökerterek bunu test edebilirsiniz.

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

**Note:** On macOS and windows, Electron uses a new `crashpad` client for crash collection and reporting. Çökme raporlamayı aktif hale getirmek için, `crashpad<code>'i ana süreç içerisinden -hangi süreçten çökmeleri toplayacağınızdan bağımsız olarak-
 <0>crashReporter.start` ile başlatmanız gerekir. Bu şekilde başlatıldıktan sonra crashpad denetimcisi tüm süreçlerden çökmeleri toplar. Yine de `crashReporter.start`'ı renderer veya çoçuk süreçlerden çağırmanız gerekir, aksi halde çokmeler `companyName`, `productName` veya `ekstra` bilgiler olmadan toplanır.

### `crashReporter.getLastCrashReport()`

[`CrashReport`](structures/crash-report.md) döndürür:

Returns the date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

### `crashReporter.getUploadedReports()`

[`CrashReport[]`](structures/crash-report.md) döndürür:

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean _macOS_ - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` _macOS_ _Windows_

* `key` Katar - Parametre anahtarı, 64 karakterden az olmak zorundadır.
* `key` Dizge - Parametre anahtarı, 64 karakterden az olmak zorundadır.

Çökme raporu ile birlikte gönderilmesi için bir ek parametre girin. Burada belirtilen değerler, `start` çağrıldığında `extra` seçeneği ile belirlenen değerlere ek olarak gönderilir. This API is only available on macOS and windows, if you need to add/update extra parameters on Linux after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` _macOS_ _Windows_

* `key` Katar - Parametre anahtarı, 64 karakterden az olmak zorundadır.

Kilitlenme raporuyla birlikte gönderilemeyeceği için mevcut parametreler grubundan fazladan bir parametre kaldırın.

### `crashReporter.getParameters()`

Çökme raportörüne gönderilen şu anki parametrelerin tümünü görün.

### `crashReporter.getCrashesDirectory()`

Returns `String` - The directory where crashes are temporarily stored before being uploaded.

## Çökme Raporu Verisi

Çökme raporlarlayıcısı aşağıdaki verileri `submitURL` adresine `multipart/form-data` `POST` olarak yollayacaktır:

* `ver` Katar - Electron versiyonu.
* `platform` Katar - örneğin. 'win32'.
* `process_type` Katar - örneğin. 'renderer'.
* `guid` Katar - örneğin. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` Katar - `package.json` içerisindeki versiyon.
* `_productName` Katar - `crashReporter` `options` objesi içerisindeki ürün ismi.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` Katar - `crashReporter` `options` objesi içerisindeki şirket ismi.
* `upload_file_minidump` Dosya - `minidump` formatında çökme raporu.
* `crashReporter``options` objesi içerisindeki `extra`'nın tüm birinci seviye özellikleri.
