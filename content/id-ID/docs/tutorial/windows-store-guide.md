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

Kemas aplikasi dengan menggunakan [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Pastikan untuk menghapus `node_modules` yang tidak Anda butuhkan dalam aplikasi akhir Anda, karena modul yang sebenarnya tidak Anda perlukan hanya akan meningkatkan ukuran aplikasi Anda.

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
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── snapshot_blob.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
 

```

## Langkah 2: Menjalankan electron-windows-store

Dari PowerShell yang ditinggikan (jalankan sebagai "Administrator"), jalankan `electron-windows-store ` dengan parameter yang dibutuhkan, berikan kedua input tersebut dan direktori output, nama dan versi aplikasi, dan konfirmasi itu `node_modules ` harus diratakan.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Setelah dijalankan, alat bekerja: Ini menerima aplikasi Elektron Anda sebagai masukan, meratakan `node_modules`. Kemudian, arsipkan aplikasi Anda sebagai `app.zip`. Dengan menggunakan installer dan Windows Container, alat ini menciptakan AppX yang "diperluas" paket - termasuk Windows Application Manifest (` AppXManifest.xml `) sebagai serta sistem file virtual dan virtual registry di dalam output Anda map.

Setelah file AppX yang diperluas dibuat, alat ini menggunakan Windows App Packager (`MakeAppx.exe `) untuk membuat paket AppX satu file dari file di disk. Akhirnya, alat ini bisa digunakan untuk membuat sertifikat terpercaya di komputer Anda untuk menandatangani paket AppX baru. Dengan paket AppX yang telah ditandatangani, CLI juga bisa secara otomatis menginstal paket di mesin anda.

## Langkah 3: Menggunakan Paket AppX

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to just install your package by double-clicking it, so a submission to the store might not be necessary if you're simply looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

## Optional: Add UWP Features using a BackgroundTask

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Opsional: Mengkonversi menggunakan Virtualization Penampung

Opsional: Tambahkan Fitur UWP menggunakan BackgroundTask Namun, jika Anda menggunakan installer kustom, atau jika Anda mengalami masalah dengan paket yang dihasilkan, Anda dapat mencoba membuat paket menggunakan kompilasi dengan Windows Container - dalam mode itu, CLI akan menginstal dan menjalankan aplikasi Anda di Windows kosong. Wadah untuk menentukan modifikasi apa yang sebenarnya dilakukan aplikasi Anda terhadap sistem operasi.

Sebelum menjalankan CLI untuk pertama kalinya, Anda harus menyiapkan "Windows Desktop App Converter". Ini akan memakan waktu beberapa menit, tapi jangan khawatir - Anda hanya perlu melakukan ini satu kali. Download dan Desktop App Converter dari [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.