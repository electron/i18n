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
  * `companyName` String (optional)
  * `submitURL` String - URL that crash reports will be sent to as POST.
  * `productName` String (optional) - Defaults to `app.getName()`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server Default is `true`.
  * `ignoreSystemCrashHandler` Boolean (optional) - Default is `false`.
  * `extra` Object (optional) - An object you can define that will be sent along with the report. Only string properties are sent correctly. Nested objects are not supported and the property names and values must be less than 64 characters long.

You are required to call this method before using any other `crashReporter` APIs and in each process (main/renderer) from which you want to collect crash reports. You can pass different options to `crashReporter.start` when calling from different processes.

**Note** Child processes created via the `child_process` module will not have access to the Electron modules. Therefore, to collect crash reports from them, use `process.crashReporter.start` instead. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. You can test this out by calling `process.crash()` to crash the child process.

**Note:** To collect crash reports from child process in Windows, you need to add this extra code as well. This will start the process that will monitor and send the crash reports. Replace `submitURL`, `productName` and `crashesDirectory` with appropriate values.

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `setExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

```js
 const args = [
   `--reporter-url=${submitURL}`,
   `--application-name=${productName}`,
   `--crashes-directory=${crashesDirectory}`
 ]
 const env = {
   ELECTRON_INTERNAL_CRASH_SERVICE: 1
 }
 spawn(process.execPath, args, {
   env: env,
   detached: true
 })
```

**Note:** On macOS, Electron uses a new `crashpad` client for crash collection and reporting. If you want to enable crash reporting, initializing `crashpad` from the main process using `crashReporter.start` is required regardless of which process you want to collect crashes from. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

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
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.