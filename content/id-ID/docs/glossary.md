# Glosarium

Halaman ini mendefinisikan beberapa terminologi yang umum digunakan dalam pengembangan Elektron .

### ASAR

ASAR singkatan dari Atom Shell Archive Format. Arsip [asar](https://github.com/electron/asar) adalah sederhana `tar`-seperti format yang concatenates file ke satu file. Elektron dapat membaca file-file sewenang-wenang darinya tanpa membongkar seluruh berkas.

The ASAR Format diciptakan terutama untuk meningkatkan kinerja pada Windows ... TODO

### Brightray

Brightray [was](https://github.com/electron-archive/brightray) a static library that made [libchromiumcontent](#libchromiumcontent) easier to use in applications. Sekarang sudah tidak berlaku lagi dan telah digabungkan ke dalam basis kode Elektron.

### CRT

C Run-time Library (CRT) adalah bagian dari C++ Standard Library itu menggabungkan perpustakaan standar ISO C99. Perpustakaan Visual C++ itu menerapkan pengembangan kode asli dukungan CRT, dan keduanya asli dan campuran kode dikelola, dan kode dikelola murni untuk .NET development.

### DMG

Image Disk Apple adalah format kemasan yang digunakan oleh macos . File DMG biasanya digunakan untuk mendistribusikan aplikasi "installer". [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### IME

Editor Metode Masukan. Sebuah program yang memungkinkan pengguna memasukkan karakter dan simbol yang tidak ditemukan di keyboard mereka. Misalnya, ini memungkinkan pengguna keyboard Latin memasukkan karakter China, Jepang, Korea, dan Indic.

### IPC

IPC singkatan dari Inter-Process Communication. Elektron menggunakan IPC untuk dikirim pesan JSON serial antara proses [ utama ](#main-process) dan [ renderer ](#renderer-process).

### konten libchromium

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Also referred to as "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. Ini juga mengelola elemen asli seperti Menu, Menu Bar, Dock , Tray, dll. Proses utama bertanggung jawab untuk membuat setiap proses renderer baru di aplikasi. API Node penuh dibangun di dalamnya.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

Di Chromium, proses ini disebut sebagai "proses browser". ini berganti nama menjadi Elektron untuk menghindari kebingungan dengan proses renderer.

See also: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### native modules

Modul asli (juga disebut [addons](https://nodejs.org/api/addons.html) di Node.js) adalah modul yang ditulis dalam C atau C++ yang dapat dimuat ke Node.js atau Elektron menggunakan fungsi require (), dan digunakan seolah-olah mereka adalah sebuah modul Node.js biasa. Mereka digunakan terutama untuk menyediakan antarmuka antara JavaScript yang berjalan di perpustakaan Node.js dan C/c++.

Modul Node Asli didukung oleh Elektron , namun karena Elektron sangat mungkin menggunakan versi V8 yang berbeda dari biner Node yang terpasang di sistem Anda, Anda harus secara manual menentukan lokasi header Elektron saat membuat modul asli.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. Ini dilepaskan di bawah kombinasi lisensi perangkat lunak bebas, dan merupakan alternatif yang banyak digunakan untuk produk berpemilik komersial seperti InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) dapat digunakan untuk memuat halaman berat di latar belakang dan kemudian menampilkannya setelah (akan jauh lebih cepat). Ini memungkinkan Anda membuat halaman tanpa menampilkannya di layar.

### proses

Proses adalah turunan dari sebuah program komputer yang sedang dijalankan. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. Objek ini bersifat global yang memberikan informasi tentang, dan kontrol atas, proses saat ini. Sebagai global, selalu tersedia untuk aplikasi tanpa menggunakan require ().

See also: [main process](#main-process), [renderer process](#renderer-process)

### proses renderer

Proses renderer adalah jendela browser di aplikasi Anda. Berbeda dengan proses utama, ada beberapa kelipatannya dan masing-masing dijalankan dalam proses terpisah. Mereka juga bisa disembunyikan.

Di normal browser, halaman web biasanya menjalankan dalam lingkungan sandboxed dan tidak diperbolehkan akses ke sumber daya yang asli. Pengguna Elektron, namun, memiliki kekuatan untuk menggunakan api Node.js di halaman web yang memungkinkan interaksi tingkat sistem operasi yang lebih rendah.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel adalah kerangka sumber terbuka yang memungkinkan aplikasi Elektron diperbarui secara otomatis saat versi baru dilepaskan. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

Istilah ini berasal dari komunitas Unix, di mana "userland" atau "userspace" mengacu pada program yang berjalan di luar kernel sistem operasi. Baru-baru ini, istilah ini telah dipopulerkan di komunitas Node dan npm untuk membedakan antara fitur yang ada di " inti Node " versus paket yang dipublikasikan ke registri npm oleh komunitas "pengguna" yang jauh lebih besar.

Seperti Node , Elektron difokuskan untuk memiliki sekumpulan API kecil yang menyediakan semua primitif yang diperlukan untuk pengembangan aplikasi desktop multi-platform. Filosofi desain ini memungkinkan Elektron untuk tetap menjadi alat yang fleksibel tanpa terlalu menentukan tentang bagaimana penggunaannya. Userland memungkinkan pengguna membuat dan berbagi alat yang menyediakan fungsionalitas tambahan di atas apa yang tersedia di "inti".

### V8

V8 adalah mesin JavaScript open source Google . Ini ditulis dalam bahasa C ++ dan digunakan di Google Chrome . V8 bisa berjalan standalone, atau bisa dimasukkan ke aplikasi C ++ apapun .

Elektron membangun V8 sebagai bagian dari Chromium dan kemudian mengarahkan Node ke V8 saat membangunnya.

Nomor versi V8 selalu sesuai dengan yang dimiliki Google Chrome . Chrome 59 menyertakan V8 5,9, Chrome 58 menyertakan V8 5.8, dll.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. Ini tidak memiliki izin yang sama seperti halaman web Anda dan semua interaksi antara aplikasi dan konten tertanam Anda akan menjadi asinkron. Ini membuat aplikasi Anda tetap aman dari konten yang disematkan.