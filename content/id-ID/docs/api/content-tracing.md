# pelacakan konten

> Kumpulkan data pelacakan dari modul konten Chromium untuk menemukan kemacetan kinerja dan operasi yang lambat.

Proses:  Utama </ 0></p> 

Modul ini tidak menyertakan antarmuka web sehingga Anda perlu membuka `chrome://tracing/` di browser Chrome dan muat file yang dihasilkan untuk melihat hasil.

**Catatan:** Anda tidak boleh menggunakan modul ini sampai acara ` siap` dari aplikasi modul dipancarkan.

```javascript
const {app, contentTracing} = require ('elektron')

app.on ('siap', () = > {
  pilihan const = {
    categoryFilter: '*',
    traceOptions: 'record-until-full, enable-sampling'
  }

  contentTracing.startRecording (pilihan, () = > {
    console.log ('penelusuran dimulai')

    setTimeout (() => {
      contentTracing.stopRecording ('', (path) = > {
        console.log ('Tracing data direkam ke' + path)
      })
    }, 5000)
  })
})
```

## Methods

Modul ` contentTracing ` memiliki metode berikut:

### `contentTracing.getCategories (callback)`

* `callback` Fungsi 
  * `kategori ` String []

Dapatkan satu kelompok kategori. Kelompok kategori dapat berubah sebagai jalur kode baru tercapai.

Setelah semua proses anak mengakui permintaan`getCategories` `callback` dipanggil dengan sekelompok grup kategori.

### `contentTracing.startRecording (pilihan,callback)`

* `pilihan` Objek 
  * `kategori Filter ` String
  * `traceOptions ` String
* `callback ` Fungsi

Mulai rekaman pada semua proses.

Pencatatan dimulai segera secara lokal dan asinkron pada proses anak segera setelah mereka menerima permintaan Aktifkan Rekaman. The `callback ` akan menjadi dipanggil sekali semua proses anak telah mengakui permintaan ` startRecording `.

`categoryFilter ` adalah filter untuk mengontrol grup kategori apa yang seharusnya ditelusuri. Filter dapat memiliki awalan `-` opsional untuk mengecualikan grup kategori yang berisi kategori yang cocok. Memiliki keduanya termasuk dan dikecualikan pola kategori dalam daftar yang sama tidak didukung.

Contoh:

* `test_MyTest*`,
* `test_MyTest*,test_OtherStuff`,
* `"-excluded_category1, -kategori yang dikecualikan 2`

`traceOptions ` mengontrol jenis pelacakan yang diaktifkan, ini adalah koma-delimited daftar. Pilihan yang mungkin adalah:

* `record-sampai-penuh`
* `rekam terus menerus`
* `trace-to-console`
* `mengaktifkan-contoh`
* `mengaktifkan-systrace`

3 pilihan pertama adalah mode perekaman jejak dan karenanya saling eksklusif. Jika lebih dari satu mode perekaman jejak muncul di string ` traceOptions ` yang terakhir diutamakan. Jika tidak ada mode perekaman jejak ditentukan, mode perekaman `record-until-full`.

The trace option will first be reset to the default option (`record_mode` set to `record-until-full`, `enable_sampling` and `enable_systrace` set to `false`) before options parsed from `traceOptions` are applied on it.

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Fungsi 
  * `resultFilePath` String

Stop recording on all processes.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This helps to minimize the runtime overhead of tracing since sending trace data over IPC can be an expensive operation. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

### `contentTracing.startMonitoring(options, callback)`

* `pilihan` Object 
  * `kategori Filter ` String
  * `traceOptions ` String
* `callback ` Fungsi

Start monitoring on all processes.

Monitoring begins immediately locally and asynchronously on child processes as soon as they receive the `startMonitoring` request.

Once all child processes have acknowledged the `startMonitoring` request the `callback` will be called.

### `contentTracing.stopMonitoring(callback)`

* `callback ` Fungsi

Stop monitoring on all processes.

Once all child processes have acknowledged the `stopMonitoring` request the `callback` is called.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Fungsi 
  * `resultFilePath` String

Get the current monitoring traced data.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This is because it may be an expensive operation to send the trace data over IPC and we would like to avoid unneeded runtime overhead from tracing. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `captureMonitoringSnapshot` request the `callback` will be called with a file that contains the traced data.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Fungsi 
  * `value` Number
  * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.