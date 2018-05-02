# pelacakan konten

> Kumpulkan data pelacakan dari modul konten Chromium untuk menemukan kemacetan kinerja dan operasi yang lambat.

Proses: [Main](../glossary.md#main-process)

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

Pilihan jejak pertama akan diatur ulang ke opsi default (`record_mode` diatur ke `record-until-full `, `enable_sampling `dan` enable_systrace ` set ke `false`) sebelum pilihan yang diuraikan dari `traceOptions` diterapkan di dalamnya.

### `isi Tracing.stop Recording (hasil File Path, callback)`

* `resultFilePath ` String
* `callback` Fungsi 
  * `resultFilePath ` String

Berhenti merekam pada semua proses.

Proses anak biasanya menyimpan data jejak dan jarang disiram dan dikirim Jejak data kembali ke proses utama. Ini membantu meminimalkan overhead runtime Dari penelusuran sejak mengirim data jejak melalui IPC bisa menjadi operasi yang mahal. Begitu, Untuk mengakhiri penelusuran, kita harus secara asinkron meminta semua proses anak untuk menyiram apapun tertunda jejak data.

Setelah semua proses anak mengakui permintaan `stopRecording` `callback ` akan dipanggil dengan file yang berisi data yang dilacak.

Data jejak akan ditulis ke `resultFilePath` jika tidak kosong atau ke a file sementara Path file yang sebenarnya akan dilewatkan ke `callback` jika tidak `null`.

### `isi Tracing.startMonitoring (pilihan, callback)`

* `pilihan` Objek 
  * `kategori Filter ` String
  * `traceOptions ` String
* `callback ` Fungsi

Mulai memonitor semua proses.

Pemantauan dimulai segera secara lokal dan asinkron pada proses anak segera setelah mereka menerima permintaan ` startMonitoring `.

Setelah semua proses anak telah mengakui permintaan `startMonitoring` `callback` akan dipanggil.

### `isi Tracing.stop Monitoring (callback)`

* `callback ` Fungsi

Hentikan pemantauan pada semua proses.

Setelah semua proses anak telah mengakui `stopMonitoring` meminta `callback` dipanggil.

### `isi Tracing.capture Monitoring Snapshot (hasil File Path, callback)`

* `resultFilePath ` String
* `callback` Fungsi 
  * `resultFilePath ` String

Dapatkan data jejak pemantauan saat ini.

Proses anak biasanya menyimpan data jejak dan jarang disiram dan dikirim Jejak data kembali ke proses utama. Ini karena mungkin harganya mahal operasi untuk mengirim jejak data melalui IPC dan kami ingin menghindari yang tidak dibutuhkan runtime overhead dari penelusuran. Jadi, untuk mengakhiri penelusuran, kita harus secara asinkron bertanya semua proses anak untuk menyiram data jejak yang tertunda.

Setelah semua proses anak mengenali `captureMonitoringSnapshot` minta `callback` akan dipanggil dengan file yang berisi data yang dilacak.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Fungsi 
  * `nilai` Nomor
  * `persentase` Nomor

Dapatkan penggunaan maksimum di seluruh proses buffer jejak sebagai persentase dari penuh negara. Bila nilai TraceBufferUsage ditentukan, maka `callback` adalah bernama.