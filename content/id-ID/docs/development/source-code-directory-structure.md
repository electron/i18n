# Struktur direktori sumber kode

Kode sumber dari electron dipisahkan menjadi beberapa bagian, sebagian besar mengikuti Chromium pada konvensi pemisahan.

Anda mungkin perlu terbiasa dengan [multi-proses Chromium's arsitektur](https://dev.chromium.org/developers/design-documents/multi-process-architecture) untuk memahami kode sumber yang lebih baik.

## Struktur Sumber Kode

```diff
Electron
├── atom/ - C++ sumber kode.
|   ├── app / - Sistem daftar kode.
|   ├── browser/ -  Frontend termasuk jendela utama, UI, dan semua
|   |   hal proses utama. Ini berbicara kepada renderer untuk mengelola halaman web.
|   |   ├── ui/ - Implementasi barang UI untuk platform yang berbeda.
|   |   |   ├── cocoa/ - Kode sumber spesifik kakao.
|   |   |   ├── win/ - Windows GUI sumber kode spesifik.
|   |   |   └── x/ - X11 sumber kode spesifik.
|   |   ├── api/ - Implementasi dari proses utama APIs.
|   |   ├── net/ - kode jaringan terkait.
|   |   ├── mac/ - Sumber kode Objective-C Mac tertentu.
|   |   └── resources/ - Ikon, file yang bergantung pada platform, dll.
|   ├── renderer/ - Kode yang berjalan dalam proses renderer.
|   |   └── api/ - Implementasi proses renderer APIs.
|   └── common/ - Kode yang digunakan oleh proses utama dan renderer,
|       termasuk beberapa fungsi utilitas dan kode untuk mengintegrasikan pesan node
|       loop ke loop pesan Chromium.
|       └── api/ - Pelaksanaan API umum, dan yayasan
|           Modul built-in Electron.
├── brightray / - Thin shim over libcc yang membuatnya lebih mudah digunakan.
├── chromium_src / - Sumber kode disalin dari Chromium. Lihat di bawah.
├── default_app / - Halaman default untuk ditampilkan saat Electron dimulai tanpa
|   menyediakan sebuah aplikasi.
├── docs/ - Dokumentasi.
├── lib/ - Sumber kode JavaScript.
|   ├── browser/ - kode inisialisasi proses utama javascript.
|   |   └── api/ - Implementasi API Javascript.
|   ├── common/ - JavaScript digunakan oleh proses utama dan renderer
|   |   └── api/ - Implementasi API Javascript.
|   └── renderer/ - Kode inisialisasi proses renderer utama javascript.
|       └── api/ - Implementasi API Javascript.
├── spec / - tes otomatis.
├── electron.gyp - Aturan pembangunan electron.
└── common.gypi - Pengaturan spesifik Compiler dan aturan bangunan untuk lainnya
     komponen seperti `node` dan` breakpad`.
```

## `/chromium_src`

File di ` / chromium_src </ code> cenderung menjadi potongan Chromium yang bukan bagian dari
lapisan konten Misalnya untuk menerapkan Pepper API, kita memerlukan beberapa kabel
mirip dengan yang dilakukan Chrome resmi. We could have built the relevant
sources as a part of <a href="../glossary.md#libchromiumcontent">libcc</a> but most
often we don't require all the features (some tend to be proprietary,
analytics stuff) so we took parts of the code. Ini bisa dengan mudah telah patch di libcc, tapi pada saat ini ditulis tujuan libcc adalah mempertahankan patch minimal dan perubahan kromium_src cenderung yang besar. Juga, perhatikan bahwa tambalan ini tidak pernah bisa diupgrade seperti yang lainnya patch libcc yang kita pertahankan sekarang.</p>

<h2>Struktur Direktori Lain</h2>

<ul>
<li><strong>skrip</strong> - Skrip yang digunakan untuk tujuan pembangunan seperti bangunan, kemasan,
pengujian, dll.</li>
<li><strong>alat</strong> - Skrip pembantu yang digunakan oleh file gyp, tidak seperti <code>skrip`, skrip diletakkan disini jangan pernah dipanggil oleh pengguna secara langsung.</li> 

* **vendor** - sumber kode dari dependensi pihak ketiga, kami tidak menggunakannya `third_party` sebagai nama karena akan membingungkannya dengan direktori yang sama di Pohon sumber kode Chromium.
* **node_modules** - Modul simpul pihak ketiga digunakan untuk bangunan.
* **keluar** - Direktori keluaran sementara `ninja`.
* **dist** - Direktori sementara dibuat oleh skrip `script/create-dist.py` saat membuat distribusi.
* **external_binaries** - Download binari kerangka pihak ketiga yang jangan mendukung bangunan dengan `gyp`.</ul> 

## Menjaga Git Submodul Up to Date

Repositori Electron memiliki beberapa dependensi yang dipesan, ditemukan di [/vendor](https://github.com/electron/electron/tree/master/vendor). Terkadang Anda mungkin melihat pesan seperti ini saat menjalankan `status git`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

Untuk memperbarui dependensi ini, jalankan perintah berikut:

```sh
git submodule update --init --recursive
```

Jika Anda sering menjalankan perintah ini, Anda bisa membuat alias untuk itu di berkas `~/.gitconfig` Anda:

```sh
[alias]
    su = submodule update --init --recursive
```