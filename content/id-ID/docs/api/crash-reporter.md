# kerusakanReporter

> Kirim laporan kerusakan ke server jauh.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Berikut ini adalah contoh untuk secara otomatis mengirimkan laporan kerusakan ke server jauh:

```javascript
const { crashReporter } = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

Untuk menyiapkan server untuk menerima dan memproses laporan kerusakan, Anda dapat menggunakan proyek berikut ini:

* [socorro](https://github.com/mozilla/socorro)
* [mini-istirahat pad-server](https://github.com/electron/mini-breakpad-server)

Or use a 3rd party hosted solution:

* [Backtrace I/O](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)

Laporan kerusakan disimpan secara lokal di folder direktori khusus aplikasi. Untuk `nama produk </ 0> dari <code> nama kamu </ 0> , laporan kerusakan akan disimpan dalam folder bernama <code> nama Crash kamu </ 0> di dalam direktori temp. Anda dapat menyesuaikan lokasi direktori sementara ini untuk aplikasi Anda dengan memanggil <code> app.setPath ( 'temp', '/ my / custom / temp') </ 0> 
API sebelum memulai reporter kecelakaan.</p>

<h2>Methods</h2>

<p>The <code> kecelakaan Reporter </ 0> modul memiliki metode berikut:</p>

<h3><code>kecelakaan Reporter.mulai (pilihan)`</h3> 

* `pilihan` Objek 
  * `companyName` String
  * ` submitURL </ 0>  String - URL bahwa laporan kerusakan akan dikirim ke POST.</li>
<li><code> nama product</ 0>  String (opsional) - Default ke <code> app.getName () </ 0> .</li>
<li><code> ungkah ke Server </ 0>  Boolean (opsional) - Apakah laporan kerusakan harus dikirim ke server Default adalah <code> true </ 0> .</li>
<li><code> mengabaikan Sistem jatuh Handler </ 0>  Boolean (opsional) - Default adalah <code> false </ 0> .</li>
<li><code> ekstra </ 0> Objek (opsional) - Objek yang dapat Anda tentukan yang akan dikirim bersamaan dengan laporan. Hanya properti string yang dikirim dengan benar. Objek bersarang tidak didukung dan nama dan nilai properti harus panjangnya kurang dari 64 karakter.</li>
<li><code>crashesDirectory` String (optional) - Directory to store the crashreports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

Anda diminta untuk memanggil metode ini sebelum menggunakan API ` crashReporter </ 0> lainnya dan dalam setiap proses (utama / perender) yang ingin Anda kumpulkan laporan kerusakan.
Anda bisa melewati pilihan yang berbeda untuk <code> kecelakaan Reporter.mulai </ 0> saat memanggil dari berbagai proses.</p>

<p><strong> Catatan </ 0> Proses anak yang dibuat melalui modul <code> child_process </ 1> tidak akan memiliki akses ke modul Elektron .
Oleh karena itu, untuk mengumpulkan laporan kerusakan dari mereka, gunakan <code> process.crashReporter.start </ 0> . Lewati pilihan yang sama seperti di atas dan yang tambahan yang disebut <code> crash Direktori</ 0> yang seharusnya mengarah ke direktori untuk menyimpan laporan kerusakan sementara. Anda bisa menguji ini dengan memanggil <code> process.crash () </ 0> untuk menabrak proses anak.</p>

<p><strong>Note:</strong> If you need send additional/updated <code>extra` parameters after your first call `start` you can call `addExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

**Note:** On macOS and windows, Electron uses a new `crashpad` client for crash collection and reporting. If you want to enable crash reporting, initializing `crashpad` from the main process using `crashReporter.start` is required regardless of which process you want to collect crashes from. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### `kecelakaan Reporter.dapatkan terakhir kecelakaan Reporter ()`

Returns [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

### `kecelakaan reporter.dapatkan unggahan repoter ()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)`

* ` unggah ke Server </ 0>  Boolean  <em> macOS </ 1> - Apakah laporan harus diserahkan ke server.</li>
</ul>

<p>This would normally be controlled by user preferences. This has no effect if
called before <code>start` is called.</p> 
  **Note:** This API can only be called from the main process.
  
  ### `crashReporter.addExtraParameter(key, value)` *macOS* *Windows*
  
  * ` kunci </ 0>  String - Kunci parameter, harus panjangnya kurang dari 64 karakter.</li>
<li><code>value` String - Parameter value, must be less than 64 characters long.
  
  Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS and windows, if you need to add/update extra parameters on Linux after your first call to `start` you can call `start` again with the updated `extra` options.
  
  ### `crashReporter.removeExtraParameter(key)` *macOS* *Windows*
  
  * ` kunci </ 0>  String - Kunci parameter, harus panjangnya kurang dari 64 karakter.</li>
</ul>

<p>Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.</p>

<h3><code>crashReporter.getParameters()`</h3> 
    See all of the current parameters being passed to the crash reporter.
    
    ## Laporan Kecelakaan Payload
    
    The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:
    
    * ` ver </ 0>  String - Versi Elektron .</li>
<li><code> platform </ 0>  String - misal 'win32'.</li>
<li><code> proses_tipe </ 0>  String - misalnya 'renderer'.</li>
<li><code> guid </ 0>  String - misal '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.</li>
<li><code> _version </ 0>  String - Versi di <code> package.json </ 0> .</li>
<li><code>_companyName` String - Nama perusahaan di opsi `crashReporter` `options` obyek. ok
    * `prod` String - Nama produk yang mendasarinya. Dalam hal ini Elektron.
    * `_companyName` String - Nama perusahaan di opsi `crashReporter` `options` obyek.
    * `upload_file_minidump` File - Laporan kerusakan dalam format `minidump`.
    * Semua tingkat satu sifat objek `ekstra` di `crashReporter` `pilihan` objek.