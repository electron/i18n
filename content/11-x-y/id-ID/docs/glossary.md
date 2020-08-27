# Glossary

Halaman ini mendefinisikan beberapa terminologi yang umum digunakan dalam pengembangan Elektron.

### ASAR

ASAR singkatan dari Atom Shell Archive Format. Arsip [asar][asar] adalah sederhana `tar`-seperti format yang concatenates file ke satu file. Elektron dapat membaca file-file sewenang-wenang darinya tanpa membongkar seluruh berkas.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

C Run-time Library (CRT) adalah bagian dari C++ Standard Library itu menggabungkan perpustakaan standar ISO C99. Perpustakaan Visual C++ itu menerapkan pengembangan kode asli dukungan CRT, dan keduanya asli dan campuran kode dikelola, dan kode dikelola murni untuk .NET development.

### DMG

Image Disk Apple adalah format kemasan yang digunakan oleh macos . File DMG biasanya digunakan untuk mendistribusikan aplikasi "installer". [elektron-builder][] mendukung Nsis sebagai target membangun.

### IME

Editor Metode Masukan. Sebuah program yang memungkinkan pengguna memasukkan karakter dan simbol yang tidak ditemukan di keyboard mereka. Misalnya, ini memungkinkan pengguna keyboard Latin memasukkan karakter China, Jepang, Korea, dan Indic.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main][] and [renderer][] processes.

### konten libchromium

Perpustakaan bersama yang menyertakan [ modul Konten Kromium ][] dan semua isinya dependensi (misalnya, Blink, [ V8 ][], dll.). Disebut juga sebagai "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### proses utama

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. Ini juga mengelola elemen asli seperti Menu, Menu Bar, Dock , Tray, dll. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Lihat juga: [ proses ](#process), [ proses renderer ](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].

### Mojo

Sistem IPC untuk berkomunikasi intra- atau antar-proses, ini penting karena Chrome gemar membagi tugas ke proses yang berbeda atau tidak, tergantung pada tekanan memori, dll.

Lihat https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### modul asli

Modul asli (juga disebut [addons][] di Node.js) adalah modul yang ditulis dalam C atau C++ yang dapat dimuat ke Node.js atau Elektron menggunakan fungsi require(), dan digunakan seolah-olah mereka adalah sebuah modul Node.js biasa. Mereka digunakan terutama untuk menyediakan antarmuka antara JavaScript yang berjalan di perpustakaan Node.js dan C/c++.

Modul Node Asli didukung oleh Elektron , namun karena Elektron sangat mungkin menggunakan versi V8 yang berbeda dari biner Node yang terpasang di sistem Anda, Anda harus secara manual menentukan lokasi header Elektron saat membuat modul asli.

Lihat juga [ Menggunakan Modul Node Asli ][].

### NSIS

Nullsoft Scriptable Install System adalah Installer berbasis script authoring tool untuk Microsoft Windows. Ini dilepaskan di bawah kombinasi lisensi perangkat lunak bebas, dan merupakan alternatif yang banyak digunakan untuk produk berpemilik komersial seperti InstallShield. [elektron-builder][] mendukung NSIS sebagai target membangun.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### proses

Proses adalah turunan dari sebuah program komputer yang sedang dijalankan. Elektron aplikasi yang menggunakan proses [ utama ][] dan satu atau lebih [ renderer ][] Sebenarnya menjalankan beberapa program secara bersamaan.

Di Node.js dan Elektron, setiap proses yang berjalan memiliki ` proses ` objek. Objek ini bersifat global yang memberikan informasi tentang, dan kontrol atas, proses saat ini. Sebagai global, selalu tersedia untuk aplikasi tanpa menggunakan require ().

Lihat juga: [ proses ](#main-process), [ proses renderer ](#renderer-process)

### proses renderer

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Di normal browser, halaman web biasanya menjalankan dalam lingkungan sandboxed dan tidak diperbolehkan akses ke sumber daya yang asli. Pengguna Elektron, namun, memiliki kekuatan untuk menggunakan api Node.js di halaman web yang memungkinkan interaksi tingkat sistem operasi yang lebih rendah.

Lihat juga: [ proses ](#process), [ proses renderer ](#main-process)

### Tupai

Squirrel adalah kerangka sumber terbuka yang memungkinkan aplikasi Elektron diperbarui secara otomatis saat versi baru dilepaskan. Lihat [autoUpdater][] API untuk info tentang memulai dengan Tupai.

### userland

Istilah ini berasal dari komunitas Unix, di mana "userland" atau "userspace" mengacu pada program yang berjalan di luar kernel sistem operasi. Baru-baru ini, istilah ini telah dipopulerkan di komunitas Node dan npm untuk membedakan antara fitur yang ada di " inti Node " versus paket yang dipublikasikan ke registri npm oleh komunitas "pengguna" yang jauh lebih besar.

Seperti Node , Elektron difokuskan untuk memiliki sekumpulan API kecil yang menyediakan semua primitif yang diperlukan untuk pengembangan aplikasi desktop multi-platform. Filosofi desain ini memungkinkan Elektron untuk tetap menjadi alat yang fleksibel tanpa terlalu menentukan tentang bagaimana penggunaannya. Userland memungkinkan pengguna membuat dan berbagi alat yang menyediakan fungsionalitas tambahan di atas apa yang tersedia di "inti".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Elektron membangun V8 sebagai bagian dari Chromium dan kemudian mengarahkan Node ke V8 saat membangunnya.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. Ini tidak memiliki izin yang sama seperti halaman web Anda dan semua interaksi antara aplikasi dan konten tertanam Anda akan menjadi asinkron. Ini membuat aplikasi Anda tetap aman dari konten yang disematkan.

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[ modul Konten Kromium ]: https://www.chromium.org/developers/content-module
[elektron-builder]: https://github.com/electron-userland/electron-builder
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[ utama ]: #main-process
[renderer]: #renderer-process
[ renderer ]: #renderer-process
[ Menggunakan Modul Node Asli ]: tutorial/using-native-node-modules.md
[ V8 ]: #v8
