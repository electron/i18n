# crashReporter

> Isumite ang mga ulat ng pag bagsak sa isang remote server.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ang mga ito ay halimbawa ng awtomatikong pag pasa ng mga crash report patungo sa remote server:

```javascript
const{ crashReporter } = require('electron')

crashReporter.start({
Pangalan ng produkto : 'Pangalan mo''
Pangalan ng Kompanya: 'Pangalan ng Kompanya mo'
ipasa sa URL: 'https;//your-domain.com/url-to-submit',uploadToServer: true
}}
```

Para pag set up sa server para tanggapin at iproseso ang mga bagsak na ulat, puwedeng gamitin ang mga halimbawa na proyekto:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Or use a 3rd party hosted solution:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Ang mga ulat na bumagsak ay naka save sa isang lokal na application-specifc temp direktoryo folder. Para sa `PangalanngProdukto`sa`PangalanMo`, bagsak na ulat ay nakaimbak sa isang folder pangalan `PangalanMo Bagsak` loob ng temp directory. Puwede mong i-customize ang temp directory lokasyon para sa iyong app sa pagtawag ng `app.setPath('temp','/my/custom/temp')` API bago mag start ang mga bagsak na ulat.

## Mga Paraan

Ang `crashReporter`module ay merong sumusunod na paraan:

### `crashReporter.start(options)`

* `options` Object
  * `companyName` String
  * `sumbitURL` String-- URL na magpapadala sa mga bagsak na ulat na naka POST.
  * `productName` String (optional) - Defaults to `app.name`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. Ng default ay `tama`.
  * `ignoreSystemCrashHandler`Boolean (optional) - ang default ay `false`.
  * `extra` Record<String, String> (optional) - An object you can define that will be sent along with the report. Ang katangian lang ng string ang maipasa ng wasto. Nested objects are not supported. When using Windows, the property names and values must be fewer than 64 characters.
  * `crashesDirectory` String (optional) - Directory to store the crash reports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

Ikaw ay kailangan na tumawag sa mga pamaraan bago mag gamit ng ibang `crashReporter` APIs at bawas proseso (main/renderer) kung saan ka mangolekta ng mga bagsak na ulat. Puwede kang mag pasa ng iba't-ibang opsyon sa `crashReporter.start`kung tumawag sa iba't-ibang proseso.

**Note** Child processes created via the `child_process` module will not have access to the Electron modules. Samakatuwid, para makakolekta ng mga bagsak na ulat mula sa kanila, gamitin ang `process.crashReporter.start`sa halip. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. You can test this out by calling `process.crash()` to crash the child process.

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

**Note:** On macOS and windows, Electron uses a new `crashpad` client for crash collection and reporting. If you want to enable crash reporting, initializing `crashpad` from the main process using `crashReporter.start` is required regardless of which process you want to collect crashes from. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean _macOS_ - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` _macOS_ _Windows_

* `key` String - Parameter key, must be less than 64 characters long.
* `value` String - Parameter value, must be less than 64 characters long.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS and windows, if you need to add/update extra parameters on Linux after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` _macOS_ _Windows_

* `key` String - Parameter key, must be less than 64 characters long.

Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.

### `crashReporter.getParameters()`

See all of the current parameters being passed to the crash reporter.

### `crashReporter.getCrashesDirectory()`

Returns `String` - The directory where crashes are temporarily stored before being uploaded.

## Crash Report Payload

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.
