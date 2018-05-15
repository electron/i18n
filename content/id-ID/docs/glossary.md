# Glosarium

Halaman ini mendefinisikan beberapa terminologi yang umum digunakan dalam pengembangan Elektron .

### ASAR

ASAR singkatan dari Atom Shell Archive Format. Arsip [asar](https://github.com/electron/asar) adalah sederhana `tar`-seperti format yang concatenates file ke satu file. Elektron dapat membaca file-file sewenang-wenang darinya tanpa membongkar seluruh berkas.

The ASAR Format diciptakan terutama untuk meningkatkan kinerja pada Windows ... TODO

### Brightray

Brightray [adalah](https://github.com/electron-archive/brightray) sebuah perpustakaan statis yang membuat [libchromiumcontent](#libchromiumcontent) lebih mudah untuk menggunakan dalam aplikasi. Sekarang sudah tidak berlaku lagi dan telah digabungkan ke dalam basis kode Elektron.

### CRT

C Run-time Library (CRT) adalah bagian dari C++ Standard Library itu menggabungkan perpustakaan standar ISO C99. Perpustakaan Visual C++ itu menerapkan pengembangan kode asli dukungan CRT, dan keduanya asli dan campuran kode dikelola, dan kode dikelola murni untuk .NET development.

### DMG

Image Disk Apple adalah format kemasan yang digunakan oleh macos . File DMG biasanya digunakan untuk mendistribusikan aplikasi "installer". [elektron-builder](https://github.com/electron-userland/electron-builder) mendukung Nsis sebagai target membangun.

### IME

Editor Metode Masukan. Sebuah program yang memungkinkan pengguna memasukkan karakter dan simbol yang tidak ditemukan di keyboard mereka. Misalnya, ini memungkinkan pengguna keyboard Latin memasukkan karakter China, Jepang, Korea, dan Indic.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC singkatan dari Inter-Process Communication. Elektron menggunakan IPC untuk dikirim pesan JSON serial antara proses [ utama ](#main-process) dan [ renderer ](#renderer-process).

### konten libchromium

Perpustakaan bersama yang menyertakan [ modul Konten Kromium ](https://www.chromium.org/developers/content-module) dan semua isinya dependensi (misalnya, Blink, [ V8 ](#v8), dll.). Disebut juga sebagai "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### proses utama

Proses utama, biasanya sebuah file bernama ` main.js `, entry point untuk setiap Aplikasi elektron Ini mengendalikan kehidupan aplikasi, dari buka sampai tutup. Ini juga mengelola elemen asli seperti Menu, Menu Bar, Dock , Tray, dll. Proses utama bertanggung jawab untuk membuat setiap proses renderer baru di aplikasi. API Node penuh dibangun di dalamnya.

Setiap aplikasi file proses utama ditentukan di properti ` utama ` di ` package.json `. Ini adalah bagaimana ` elektron. ` mengetahui file apa yang akan dijalankan saat startup.

Di Chromium, proses ini disebut sebagai "proses browser". ini berganti nama menjadi Elektron untuk menghindari kebingungan dengan proses renderer.

Lihat juga: [ proses ](#process), [ proses renderer ](#renderer-process)

### MAS

Akronim untuk App Store Apple Mac. Untuk detail tentang mengirimkan aplikasi Anda ke MAS, lihat Panduan Pengiriman Mac App Store </a>.

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### modul asli

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Mereka digunakan terutama untuk menyediakan antarmuka antara JavaScript yang berjalan di perpustakaan Node.js dan C/c++.

Modul Node Asli didukung oleh Elektron , namun karena Elektron sangat mungkin menggunakan versi V8 yang berbeda dari biner Node yang terpasang di sistem Anda, Anda harus secara manual menentukan lokasi header Elektron saat membuat modul asli.

Lihat juga [ Menggunakan Modul Node Asli ](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System adalah Installer berbasis script authoring tool untuk Microsoft Windows. Ini dilepaskan di bawah kombinasi lisensi perangkat lunak bebas, dan merupakan alternatif yang banyak digunakan untuk produk berpemilik komersial seperti InstallShield. [elektron-builder](https://github.com/electron-userland/electron-builder) mendukung NSIS sebagai target membangun.

### OSR

OSR (Off-screen rendering) dapat digunakan untuk memuat halaman berat di latar belakang dan kemudian menampilkannya setelah (akan jauh lebih cepat). Ini memungkinkan Anda membuat halaman tanpa menampilkannya di layar.

### proses

Proses adalah turunan dari sebuah program komputer yang sedang dijalankan. Elektron aplikasi yang menggunakan proses [ utama ](#main-process) dan satu atau lebih [ renderer ](#renderer-process) Sebenarnya menjalankan beberapa program secara bersamaan.

Di Node.js dan Elektron, setiap proses yang berjalan memiliki ` proses ` objek. Objek ini bersifat global yang memberikan informasi tentang, dan kontrol atas, proses saat ini. Sebagai global, selalu tersedia untuk aplikasi tanpa menggunakan require ().

Lihat juga: [ proses ](#main-process), [ proses renderer ](#renderer-process)

### proses renderer

Proses renderer adalah jendela browser di aplikasi Anda. Berbeda dengan proses utama, ada beberapa kelipatannya dan masing-masing dijalankan dalam proses terpisah. Mereka juga bisa disembunyikan.

Di normal browser, halaman web biasanya menjalankan dalam lingkungan sandboxed dan tidak diperbolehkan akses ke sumber daya yang asli. Pengguna Elektron, namun, memiliki kekuatan untuk menggunakan api Node.js di halaman web yang memungkinkan interaksi tingkat sistem operasi yang lebih rendah.

Lihat juga: [ proses ](#process), [ proses renderer ](#main-process)

### Tupai

Squirrel adalah kerangka sumber terbuka yang memungkinkan aplikasi Elektron diperbarui secara otomatis saat versi baru dilepaskan. Lihat [autoUpdater](api/auto-updater.md) API untuk info tentang memulai dengan Tupai.

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

` webview ` digunakan untuk menyematkan konten 'tamu' (seperti halaman web eksternal) di aplikasi Elektron Anda. hal ini sama dengan ` iframe `, tapi berbeda pada masing-masing Webview yang berjalan dalam proses terpisah. Ini tidak memiliki izin yang sama seperti halaman web Anda dan semua interaksi antara aplikasi dan konten tertanam Anda akan menjadi asinkron. Ini membuat aplikasi Anda tetap aman dari konten yang disematkan.