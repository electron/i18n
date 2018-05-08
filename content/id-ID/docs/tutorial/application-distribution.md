# Distribusi Aplikasi

Untuk mendistribusikan aplikasi Anda dengan electron, Anda perlu mengunduh electron[prebuilt binari](https://github.com/electron/electron/releases). Selanjutnya, folder yang berisi aplikasi anda harus diberi nama `app` dan ditempatkan di direktori sumber daya electron seperti yang ditampilkan dalam contoh berikut. Perhatikan bahwa lokasi binari prebuilt elektron yang ditunjukan dengan `electron /` dalam contoh berikut.

Pada macOS:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Pada Windows dan Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Kemudian jalankan `Electron.app` (atau `electron` pada Linux, `electron.exe` pada Windows), dan electron akan berjalan sebagai aplikasi Anda. Direktori `electron` yang kemudian akan menjadi distribusi anda untuk diberikan kepada pengguna akhir.

## Mengemas aplikasi Anda ke File

Selain pengiriman aplikasi anda dengan menyalin semua file sumber, Anda dapat juga paket aplikasi Anda ke arsip [asar](https://github.com/electron/asar) untuk menghindari mengekspos kode sumber aplikasi anda untuk pengguna.

Untuk menggunakan arsip `asar` untuk mengganti folder `app`, anda perlu untuk mengubah nama arsip menjadi `app.asar`, dan meletakkannya di direktori sumber daya electron yang seperti di bawah ini, dan electron akan mencoba untuk membaca arsip dan mulai dari sana.

Pada macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Pada Windows dan Linux:

```text
electron/resources/
└── app.asar
```

Rincian lebih lanjut dapat ditemukan di [Mengemas Aplikasi](application-packaging.md).

## Rebranding dengan mengunduh binari

Setelah memaket aplikasi anda ke electron, anda akan dapat mengubah citra elektron sebelum mendistribusikannya ke pengguna.

### Windows

Anda dapat mengubah `electron.exe` ke nama apapun yang Anda suka, dan mengedit ikon dan informasi lainnya dengan alat seperti [rcedit](https://github.com/atom/rcedit).

### macOS

Anda dapat mengubah `Electron.app` ke nama yang Anda inginkan, dan anda juga perlu mengubah nama bidang `CFBundleDisplayName`, `CFBundleIdentifier` dan `CFBundleName` dalam file-file berikut:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Anda juga dapat mengubah nama helper app untuk menyembunyikan `Electron helper` pada Activity Monitor, tapi pastikan anda telah berganti nama menjadi nama file executable helper app.

Struktur aplikasi yang diganti namanya akan jadi seperti:

```text
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    ├── MyApp Helper EH.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper EH
    ├── MyApp Helper NP.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper NP
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

Anda dapat mengubah executable `electron` ke nama apapun yang anda suka.

## Alat Pengemas

Selain Kemasan aplikasi anda secara manual, Anda juga dapat memilih untuk menggunakan alat pengemas pihak ketiga untuk melakukan pekerjaan untuk anda:

* [elektron-penempa](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding dengan membangun kembali elektron dari sumber

Anda juga dapat mengubah citra electron dengan mengubah nama produk dan membangunnya dari sumber. Untuk melakukan ini anda perlu memodifikasi file `atom.gyp` dan telah membangun kembali dari awal.

### Membuat Custom Fork Electron

Menciptakan sebuah kustom fork Electron ini hampir bukan sesuatu yang anda perlu lakukan untuk membangun aplikasi anda, bahkan untuk "Tingkat produksi" aplikasi. Dengan menggunakan alat seperti ` electron -packager ` atau ` electron-forge ` akan memungkinkan Anda untuk "Rebrand" Electron tanpa harus melakukan langkah-langkah ini.

Anda perlu Fork electron ketika anda memiliki kustom kode C++ yang telah anda patch langsung ke Electron, yang tidak dapat upstreamed atau ditolak dari versi resmi. Sebagai pengelola Electron, kita sangat ingin membuat skenario pekerjaan, silakan coba sesulit yang anda bisa untuk mendapatkan perubahan ke versi resmi Electron, itu akan semakin mudah untuk anda, dan kami menghargai bantuan anda.

#### Membuat sebuah Custom Release dengan surf-build

1. Menginstal [Surf](https://github.com/surf-build/surf), melalui npm: `npm install -g surf-build@latest`

2. Buat bucket S3 baru dan buat struktur direktori kosong berikut:
    
    ```sh
- atom-shell/
  - symbols/
  - dist/
```

3. Tetapkan variabel lingkungan berikut:

* `ELECTRON_GITHUB_TOKEN` - token untuk membuat releases pada GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - merupakan tempat dimana anda akan mengunggah header node.js juga sebagai symbol
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - Atur ke `true` atau lainnya akan gagal
* `GITHUB_TOKEN` - atur sama seperti `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - atur ke `C:\Temp` pada Windows untuk mencegah masalah terlalu panjang jalan
* `TARGET_ARCH` - atur ke `ia32` atau `x64`

1. Di `script/upload.py`, anda *harus* mengatur `ELECTRON_REPO` ke Fork anda (`MYORG/electron`), terutama jika anda adalah seorang kontributor ke elektron yang tepat.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Tunggu waktu yang sangat, sangat lama untuk membangun sampai selesai.