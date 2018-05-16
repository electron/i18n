# bumagsakReporter

> Isumite ang mga ulat ng pag bagsak sa isang remote server.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ang mga ito ay halimbawa ng awtomatikong pag pasa ng mga crash report patungo sa remote server:

```javascript
const{crashReporter} = require('electron')

crashReporter.start({
Pangalan ng produkto : 'Pangalan mo''
Pangalan ng Kompanya: 'Pangalan ng Kompanya mo'
ipasa sa URL: 'https;//your-domain.com/url-to-submit',uploadToServer: true
}}
```

Para pag set up sa server para tanggapin at iproseso ang mga bagsak na ulat, puwedeng gamitin ang mga halimbawa na proyekto:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Ang mga ulat na bumagsak ay naka save sa isang lokal na application-specifc temp direktoryo folder. Para sa `PangalanngProdukto`sa`PangalanMo`, bagsak na ulat ay nakaimbak sa isang folder pangalan `PangalanMo Bagsak` loob ng temp directory. Puwede mong i-customize ang temp directory lokasyon para sa iyong app sa pagtawag ng `app.setPath('temp','/my/custom/temp')` API bago mag start ang mga bagsak na ulat.

## Mga Paraan

Ang `crashReporter`module ay merong sumusunod na paraan:

### `crashReporter.start(options)`

* `options` Bagay 
  * `PangalanngKompanya`String(optional)
  * `sumbitURL` String-- URL na magpapadala sa mga bagsak na ulat na naka POST.
  * `pangalanngProdukto` String (optinal) - Defaults para sa `app.getName()`.
  * `uploadToServer`Boolean(optional) - kung ang mga bagsak na ulat ay dapat ma i-sent sa server. Ang default ay `true`.
  * `ignoreSystemCrashHandler`Boolean (optional) - ang default ay `false`.
  * `extra`Object (optional) - Ang bagay na kaya mong bigyan ng kahulogan ay maisama sa pag submit ng mga report. Ang katangian lang ng string ang maipasa ng wasto. Ang mga bagay na Nested ay hindi suportado at ang pangalan ng ari-arian at ang halaga ay hindi bababa sa 64 na mga character.

Ikaw ay kailangan na tumawag sa mga pamaraan bago mag gamit ng ibang `crashReporter` APIs at bawas proseso (main/renderer) kung saan ka mangolekta ng mga bagsak na ulat. Puwede kang mag pasa ng iba't-ibang opsyon sa `crashReporter.start`kung tumawag sa iba't-ibang proseso.

**Tala**Magkakaron ng mga proseso sa mga bata gamit ang `child_process`modyul ay hindi maka access sa elektron modyul. Samakatuwid, para makakolekta ng mga bagsak na ulat mula sa kanila, gamitin ang `process.crashReporter.start`sa halip. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. You can test this out by calling `process.crash()` to crash the child process.

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

## Crash Report Payload

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.