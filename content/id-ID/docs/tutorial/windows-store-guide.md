# Panduan Toko Windows

Dengan Windows 10, execut32 win32 tua yang baik mendapat saudara baru: Platform Windows Universal. Yang baru `.appx` format tidak hanya memungkinkan sejumlah API kuat baru seperti Cortana atau Push Notifications, namun melalui Windows Store, juga mempermudah pemasangan dan pemutakhiran.

Microsoft [ mengembangkan alat yang mengkompilasi aplikasi Elektron sebagai paket `.appx`](https://github.com/catalystcode/electron-windows-store), yang memungkinkan pengembang menggunakan beberapa barang yang ada di model aplikasi baru. Panduan ini menjelaskan cara menggunakannya - dan apa kemampuan dan keterbatasan paket Electron AppX.

## Latar Belakang dan Persyaratan

Windows 10 "Update Ulang Ulang" mampu menjalankan win32 `.exe` binari dengan meluncurkannya bersama dengan filesystem dan registri virtual. dibuat saat kompilasi dengan menjalankan aplikasi dan installer di dalam Windows Container, yang memungkinkan Windows untuk mengidentifikasi secara pasti modifikasi mana terhadap sistem operasi yang dilakukan saat instalasi. Memasangkan executable dengan filesystem virtual dan virtual registry memungkinkan Windows untuk mengaktifkan satu klik instalasi dan penghapusan instalasi.

Selain itu, exe diluncurkan di dalam model appx - yang berarti dapat menggunakan banyak API yang tersedia untuk Platform Windows Universal. Untuk mendapatkan kemampuan lebih, aplikasi Elektron dapat dipasangkan dengan tugas latar belakang UWP yang tak terlihat yang diluncurkan bersamaan dengan `exe` Semacam diluncurkan sebagai sidekick untuk menjalankan tugas di latar belakang, menerima notifikasi push, atau untuk berkomunikasi dengan aplikasi UWP lainnya.

Untuk mengkompilasi aplikasi Elektron yang ada, pastikan bahwa Anda memiliki persyaratan berikut:

* Windows 10 dengan Update Ulang Tahun (dirilis 2 Agustus 2016)
* Windows 10 SDK, [downloadable here](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Setidaknya Node 4 (untuk mengecek, jalankan `node -v`)

Lalu, pergi dan instal `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## Langkah 1: Kemas Aplikasi Elektron Anda

Kemas aplikasi dengan menggunakan [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

Outputnya harus terlihat kira-kira seperti ini:

```text
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Langkah 2: Menjalankan electron-windows-store

Dari PowerShell yang ditinggikan (jalankan sebagai "Administrator"), jalankan `electron-windows-store ` dengan parameter yang dibutuhkan, berikan kedua input tersebut dan direktori output, nama dan versi aplikasi, dan konfirmasi itu `node_modules ` harus diratakan.

```powershell
direktori-direktori-direktori-masukkan-direktori-C: \myelectronapp `--output-directory C:\output \ myelectronapp` --flatten true `--package-version 1.0.0.0` --package-name myelectronapp
```

Setelah dijalankan, alat bekerja: Ini menerima aplikasi Elektron Anda sebagai masukan, meratakan `node_modules`. Kemudian, arsipkan aplikasi Anda sebagai `app.zip`. Dengan menggunakan installer dan Windows Container, alat ini menciptakan AppX yang "diperluas" paket - termasuk Windows Application Manifest (` AppXManifest.xml `) sebagai serta sistem file virtual dan virtual registry di dalam output Anda map.

Setelah file AppX yang diperluas dibuat, alat ini menggunakan Windows App Packager (`MakeAppx.exe `) untuk membuat paket AppX satu file dari file di disk. Akhirnya, alat ini bisa digunakan untuk membuat sertifikat terpercaya di komputer Anda untuk menandatangani paket AppX baru. Dengan paket AppX yang telah ditandatangani, CLI juga bisa secara otomatis menginstal paket di mesin anda.

## Langkah 3: Menggunakan Paket AppX

Untuk menjalankan paket Anda, pengguna Anda memerlukan Windows 10 dengan apa yang disebutnya "Update Ulang Tahun" - rincian tentang cara memperbarui Windows dapat ditemukan [di sini](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

Sebagai lawan dari aplikasi UWP tradisional, aplikasi terpaket saat ini perlu menjalani proses verifikasi manual, yang bisa Anda terapkan [disini](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to install your package by double-clicking it, so a submission to the store might not be necessary if you're looking for an easier installation method. Di lingkungan yang dikelola (biasanya perusahaan), `Add-AppxPackage` [PowerShell Cmdlet dapat digunakan untuk menginstalnya secara otomatis](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Keterbatasan penting lainnya adalah paket AppX yang dikompilasi masih berisi win32 executable - dan karena itu tidak akan berjalan di Xbox, HoloLens, atau Phones.

## Opsional: Tambahkan Fitur UWP menggunakan BackgroundTask

Anda dapat memasangkan aplikasi Elektron Anda dengan tugas latar belakang UWP yang tak terlihat itu akan memanfaatkan sepenuhnya fitur Windows 10 - seperti pemberitahuan push, Integrasi Cortana, atau ubin hidup.

Untuk mengetahui bagaimana aplikasi Elektron yang menggunakan tugas latar belakang untuk mengirim roti panggang pemberitahuan dan ubin hidup, [periksa sampel yang disediakan Microsoft](https://github.com/felixrieseberg/electron-uwp-background).

## Opsional: Mengkonversi menggunakan Virtualization Penampung

Opsional: Tambahkan Fitur UWP menggunakan BackgroundTask Namun, jika Anda menggunakan installer kustom, atau jika Anda mengalami masalah dengan paket yang dihasilkan, Anda dapat mencoba membuat paket menggunakan kompilasi dengan Windows Container - dalam mode itu, CLI akan menginstal dan menjalankan aplikasi Anda di Windows kosong. Wadah untuk menentukan modifikasi apa yang sebenarnya dilakukan aplikasi Anda terhadap sistem operasi.

Sebelum menjalankan CLI untuk pertama kalinya, Anda harus menyiapkan "Windows Desktop App Converter". Ini akan memakan waktu beberapa menit, tapi jangan khawatir - Anda hanya perlu melakukan ini satu kali. Download dan Desktop App Converter dari [here](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). Anda akan menerima dua file: `DesktopAppConverter.zip ` dan ` BaseImage-14316.wim `.

1. Unzip `DesktopAppConverter.zip`. Dari PowerShell yang ditinggikan (dibuka dengan "jalankan sebagai Administrator", pastikan bahwa kebijakan eksekusi sistem Anda mengizinkan kami melakukannya jalankan semua yang ingin kita jalankan dengan memanggil `Set-ExecutionPolicy bypass`.
2. Kemudian, jalankan instalasi Desktop App Converter, lewat di lokasi Windows Base Image (diunduh sebagai `BaseImage-14316.wim `), oleh memanggil `.\DesktopAppConverter.ps1 -Setup -BaseImage.\ BaseImage-14316.wim `.
3. Jika menjalankan perintah di atas meminta Anda melakukan reboot, silahkan restart mesin dan jalankan perintah diatas lagi setelah berhasil restart.

Setelah instalasi berhasil, Anda dapat beralih ke kompilasi aplikasi Elektron Anda.