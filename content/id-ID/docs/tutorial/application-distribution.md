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
    

### Linux

Anda dapat mengubah executable `electron` ke nama apapun yang anda suka.

## Alat Pengemas

Selain Kemasan aplikasi anda secara manual, Anda juga dapat memilih untuk menggunakan alat pengemas pihak ketiga untuk melakukan pekerjaan untuk anda:

* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding dengan membangun kembali elektron dari sumber

Anda juga dapat mengubah citra electron dengan mengubah nama produk dan membangunnya dari sumber. Untuk melakukan ini anda perlu memodifikasi file `atom.gyp` dan telah membangun kembali dari awal.

### grunt-build-atom-shell

Secara manual memeriksa kode electron dan membangun kembali akan sangat rumit, sehingga tugas Grunt yang telah dibuat yang akan menangani hal ini secara otomatis: [grunt-build-atom-shell](https://github.com/paulcbetts/grunt-build-atom-shell).

Tugas ini secara otomatis akan menangani pengeditan file `.gyp`, pembangunan dari sumber, kemudian membangun kembali aplikasi anda secara native menggunakan Node modul untuk mencocokkan nama eksekusi baru.

### Membuat Custom Fork Electron

Menciptakan sebuah kustom fork Electron ini hampir bukan sesuatu yang anda perlu lakukan untuk membangun aplikasi anda, bahkan untuk "Tingkat produksi" aplikasi. Menggunakan alat seperti `electron-packager` atau `electron-builder` akan memungkinkan anda untuk "Mengubah citra" electron tanpa harus melakukan langkah-langkah berikut.

Anda perlu Fork electron ketika anda memiliki kustom kode C++ yang telah anda patch langsung ke Electron, yang tidak dapat upstreamed atau ditolak dari versi resmi. Sebagai pengelola Electron, kita sangat ingin membuat skenario pekerjaan, silakan coba sesulit yang anda bisa untuk mendapatkan perubahan ke versi resmi Electron, itu akan semakin mudah untuk anda, dan kami menghargai bantuan anda.

#### Membuat sebuah Custom Release dengan surf-build

1. Menginstal [Surf](https://github.com/surf-build/surf), melalui npm: `npm install -g surf-build@latest`

2. Buat bucket S3 baru dan buat struktur direktori kosong berikut:
    
        - atom-shell/
          - symbols/
          - dist/
        

3. Tetapkan variabel lingkungan berikut:

* `ELECTRON_GITHUB_TOKEN` - token untuk membuat releases pada GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - merupakan tempat dimana anda akan mengunggah header node.js juga sebagai symbol
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will just do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
* `TARGET_ARCH` - set to `ia32` or `x64` 

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Wait a very, very long time for the build to complete.