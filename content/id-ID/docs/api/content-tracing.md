# pelacakan konten

> Kumpulkan data pelacakan dari modul konten Chromium untuk menemukan kemacetan kinerja dan operasi yang lambat.

Proses: [Main](../glossary.md#main-process)

Modul ini tidak menyertakan antarmuka web sehingga Anda perlu membuka `chrome://tracing/` di browser Chrome dan muat file yang dihasilkan untuk melihat hasil.

**Catatan:** Anda tidak boleh menggunakan modul ini sampai acara ` siap` dari aplikasi modul dipancarkan.

```javascript
const { app, contentTracing } = require ('elektron')

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

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

**[Deprecated Soon](promisification.md)**

### `contentTracing.getCategories()`

Returns `Promise<String[]>` - resolves with an array of category groups once all child processes have acknowledged the `getCategories` request

Get a set of category groups. The category groups can change as new code paths are reached.

### `contentTracing.startRecording (pilihan,callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback ` Fungsi

Mulai rekaman pada semua proses.

Pencatatan dimulai segera secara lokal dan asinkron pada proses anak segera setelah mereka menerima permintaan Aktifkan Rekaman. The `callback ` akan menjadi dipanggil sekali semua proses anak telah mengakui permintaan ` startRecording `.

**[Deprecated Soon](promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

Returns `Promise<void>` - resolved once all child processes have acknowledged the `startRecording` request.

Mulai rekaman pada semua proses.

Pencatatan dimulai segera secara lokal dan asinkron pada proses anak segera setelah mereka menerima permintaan Aktifkan Rekaman.

### `isi Tracing.stop Recording (hasil File Path, callback)`

* `resultFilePath ` String
* `callback` Fungsi 
  * `resultFilePath ` String

Berhenti merekam pada semua proses.

Proses anak biasanya menyimpan data jejak dan jarang disiram dan dikirim Jejak data kembali ke proses utama. Ini membantu meminimalkan overhead runtime Dari penelusuran sejak mengirim data jejak melalui IPC bisa menjadi operasi yang mahal. Begitu, Untuk mengakhiri penelusuran, kita harus secara asinkron meminta semua proses anak untuk menyiram apapun tertunda jejak data.

Setelah semua proses anak mengakui permintaan `stopRecording` `callback ` akan dipanggil dengan file yang berisi data yang dilacak.

Data jejak akan ditulis ke `resultFilePath` jika tidak kosong atau ke a file sementara Path file yang sebenarnya akan dilewatkan ke `callback` jika tidak `null`.

**[Deprecated Soon](promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath ` String

Returns `Promise<String>` - resolves with a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

Berhenti merekam pada semua proses.

Proses anak biasanya menyimpan data jejak dan jarang disiram dan dikirim Jejak data kembali ke proses utama. Ini membantu meminimalkan overhead runtime Dari penelusuran sejak mengirim data jejak melalui IPC bisa menjadi operasi yang mahal. Begitu, Untuk mengakhiri penelusuran, kita harus secara asinkron meminta semua proses anak untuk menyiram apapun tertunda jejak data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Fungsi 
  * `nilai` Nomor
  * `persentase` Nomor

Dapatkan penggunaan maksimum di seluruh proses buffer jejak sebagai persentase dari penuh negara. Bila nilai TraceBufferUsage ditentukan, maka `callback` adalah bernama.