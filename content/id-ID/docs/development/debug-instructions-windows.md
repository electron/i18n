# Debugging pada Windows

Jika Anda mengalami crash atau masalah di Electron yang Anda percaya tidak disebabkan oleh Anda JavaScript aplikasi, melainkan oleh elektron itu sendiri, debugging bisa menjadi sedikit rumit, terutama untuk pengembang tidak digunakan untuk native / C ++ debugging. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

## Persyaratan

* **Sebuah membangun debug Elektron**: Cara termudah biasanya membangun sendiri, menggunakan alat dan prasyarat yang tercantum dalam [membangun petunjuk untuk Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio dengan C ++ Alat**: Edisi masyarakat bebas dari Visual Studio 2013 dan Visual Studio 2015 keduanya bekerja. Setelah terinstal, [mengkonfigurasi Visual Studio untuk menggunakan GitHub ini Electron Simbol Server](setting-up-symbol-server.md). Ini akan memungkinkan Visual Studio untuk mendapatkan pemahaman yang lebih baik dari apa yang terjadi di dalam Electron , sehingga lebih mudah untuk menyajikan variabel dalam format yang dapat dibaca manusia.

* **ProcMon**: The [alat SysInternals bebas](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) memungkinkan Anda untuk memeriksa sebuah proses parameter, file menangani, dan operasi registry.

## Melekat dan Debugging Electron

Untuk memulai sesi debugging, membuka PowerShell / CMD dan melaksanakan debug membangun Anda Elektron , menggunakan aplikasi untuk membuka sebagai parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Pengaturan Breakpoints

Kemudian, membuka Visual Studio. Elektron tidak dibangun dengan Visual Studio dan karenanya tidak berisi file project - namun Anda dapat membuka file kode sumber "Sebagai File", yang berarti bahwa Visual Studio akan membuka mereka sendiri. Anda masih dapat mengatur breakpoints - Visual Studio secara otomatis akan mengetahui bahwa kode sumber sesuai dengan kode yang berjalan dalam proses melekat dan istirahat sesuai.

File kode yang relevan dapat ditemukan di `./atom/` serta dalam Brightray, ditemukan di `./brightray/browser` dan `./brightray/common`.

### melampirkan

Anda dapat melampirkan Visual Studio debugger untuk proses yang berjalan pada lokal komputer atau remote. Setelah proses ini berjalan, klik Debug / Lampirkan untuk Proses (atau tekan `CTRL+ALT+P`) untuk membuka "Lampirkan untuk Proses" kotak dialog. Anda dapat menggunakan kemampuan ini untuk debug aplikasi yang berjalan pada lokal komputer atau remote, beberapa proses men-debug secara bersamaan.

Jika Elektron berjalan di bawah account pengguna yang berbeda, pilih `Tampilkan proses dari semua pengguna` kotak centang. Perhatikan bahwa tergantung pada berapa banyak BrowserWindows aplikasi dibuka, Anda akan melihat beberapa proses. Sebuah aplikasi satu-jendela khas akan menghasilkan Visual Studio menyajikan Anda dengan dua `Electron.exe` entri - satu untuk proses utama dan satu untuk proses penyaji. Karena daftar hanya memberikan nama, saat ini tidak ada cara yang dapat diandalkan untuk mencari tahu yang mana.

### Proses Yang Harus Saya Lampirkan ke?

Kode dieksekusi dalam proses utama (yaitu, kode yang ditemukan di atau akhirnya dijalankan oleh utama Anda JavaScript file) serta kode yang disebut menggunakan remote (`require('electron').remote`) akan dijalankan di dalam proses utama, sementara kode lainnya akan mengeksekusi dalam proses penyaji masing-masing.

Anda dapat dilampirkan ke beberapa program ketika Anda debugging, tetapi hanya satu program yang aktif di debugger setiap saat. Anda dapat mengatur program aktif dalam `Debug Lokasi` toolbar atau `Proses window`.

## Menggunakan ProcMon untuk Amati Proses sebuah

Sementara Visual Studio fantastis untuk memeriksa jalur kode tertentu, kekuatan ProcMon adalah benar-benar dalam mengamati segala aplikasi Anda lakukan dengan sistem operasi - menangkap File, Registry, Jaringan, Proses, dan rincian Profiling proses. Ia mencoba untuk log **all** peristiwa yang terjadi dan dapat cukup besar, tetapi jika Anda berusaha untuk memahami apa dan bagaimana aplikasi Anda lakukan untuk sistem operasi, dapat menjadi sumber daya berharga.

Untuk pengenalan dasar dan lanjutan fitur debugging ProcMon ini, pergi memeriksa [ini video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) disediakan oleh Microsoft.