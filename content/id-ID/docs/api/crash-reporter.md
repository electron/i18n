# kecelakaan reporter

> Kirim laporan kerusakan ke server jauh.

Proses:  Utama </ 0> ,  Renderer </ 1></p> 

Berikut ini adalah contoh untuk secara otomatis mengirimkan laporan kerusakan ke server jauh:

```javascript
const {kecelakaan Reporter} = require ('electron') kecelakaan Reporter.mulai ({nama produk: 'NamaAnda'nama perusahaan: 'PerusahaanAnda', submitURL: 'https://your-domain.com/url-to-submit', unggah keServer: benar})
```

Untuk menyiapkan server untuk menerima dan memproses laporan kerusakan, Anda dapat menggunakan proyek berikut ini:

* [socorro](https://github.com/mozilla/socorro)
* [mini-istirahat pad-server](https://github.com/electron/mini-breakpad-server)

Laporan kerusakan disimpan secara lokal di folder direktori khusus aplikasi. Untuk `nama produk </ 0> dari <code> nama kamu </ 0> , laporan kerusakan akan disimpan dalam folder bernama <code> nama Crash kamu </ 0> di dalam direktori temp. Anda dapat menyesuaikan lokasi direktori sementara ini untuk aplikasi Anda dengan memanggil <code> app.setPath ( 'temp', '/ my / custom / temp') </ 0> 
API sebelum memulai reporter kecelakaan.</p>

<h2>Metode</h2>

<p>The <code> kecelakaan Reporter </ 0> modul memiliki metode berikut:</p>

<h3><code>kecelakaan Reporter.mulai (pilihan)`</h3> 

* `pilihan` Objek 
  * ` nama perusahaan </ 0>  String (opsional)</li>
<li><code> submitURL </ 0>  String - URL bahwa laporan kerusakan akan dikirim ke POST.</li>
<li><code> nama product</ 0>  String (opsional) - Default ke <code> app.getName () </ 0> .</li>
<li><code> ungkah ke Server </ 0>  Boolean (opsional) - Apakah laporan kerusakan harus dikirim ke server Default adalah <code> true </ 0> .</li>
<li><code> mengabaikan Sistem jatuh Handler </ 0>  Boolean (opsional) - Default adalah <code> false </ 0> .</li>
<li><code> ekstra </ 0> Objek (opsional) - Objek yang dapat Anda tentukan yang akan dikirim bersamaan dengan laporan. Hanya properti string yang dikirim dengan benar. Objek bersarang tidak didukung dan nama dan nilai properti harus panjangnya kurang dari 64 karakter.</li>
</ul></li>
</ul>

<p>Anda diminta untuk memanggil metode ini sebelum menggunakan API <code> crashReporter </ 0> lainnya dan dalam setiap proses (utama / perender) yang ingin Anda kumpulkan laporan kerusakan.
Anda bisa melewati pilihan yang berbeda untuk <code> kecelakaan Reporter.mulai </ 0> saat memanggil dari berbagai proses.</p>

<p><strong>Note</strong> Child processes created via the <code>child_process` module will not have access to the Electron modules. Therefore, to collect crash reports from them, use `process.crashReporter.start` instead. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. You can test this out by calling `process.crash()` to crash the child process.</p> 
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