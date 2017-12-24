# Debugging pada Windows

Jika Anda mengalami crash atau masalah di Electron yang Anda percaya tidak disebabkan oleh Anda JavaScript aplikasi, melainkan oleh elektron itu sendiri, debugging bisa menjadi sedikit rumit, terutama untuk pengembang tidak digunakan untuk native / C ++ debugging. Namun, dengan menggunakan Visual Studio, GitHub ini diselenggarakan Electron Simbol Server, dan Electron kode sumber, itu cukup mudah untuk mengaktifkan debugging langkah-melalui dengan breakpoints dalam Electron kode sumber 's.

## Persyaratan

* **Sebuah membangun debug Elektron**: Cara termudah biasanya membangun sendiri, menggunakan alat dan prasyarat yang tercantum dalam [membangun petunjuk untuk Windows](build-instructions-windows.md). Meskipun Anda dapat dengan mudah menempel dan debug Electron karena Anda dapat men-download secara langsung, Anda akan menemukan bahwa itu sangat dioptimalkan, membuat debugging secara substansial lebih sulit: debugger tidak akan dapat menunjukkan isi semua variabel dan jalur eksekusi bisa tampak aneh karena inlining, panggilan ekor, dan optimasi compiler lainnya.

* ** Visual Studio dengan C ++ Alat </ 0> : Edisi masyarakat bebas dari Visual Studio 2013 dan Visual Studio 2015 keduanya bekerja. Setelah terinstal,  mengkonfigurasi Visual Studio untuk menggunakan GitHub ini Electron Simbol Server </ 0> . Ini akan memungkinkan Visual Studio untuk mendapatkan pemahaman yang lebih baik dari apa yang terjadi di dalam Electron , sehingga lebih mudah untuk menyajikan variabel dalam format yang dapat dibaca manusia.</p></li> 
    
    * ** ProcMon </ 0> : The  alat SysInternals bebas </ 1> memungkinkan Anda untuk memeriksa sebuah proses parameter, file menangani, dan operasi registry.</p></li> </ul> 
        
        ## Menempelkan dan Debugging Electron
        
        Untuk memulai sesi debugging, membuka PowerShell / CMD dan melaksanakan debug membangun Anda Elektron , menggunakan aplikasi untuk membuka sebagai parameter.
        
        ```powershell
$ ./out/D/electron.exe ~ / my-elektron-app /
```
    
    ### pengaturan Breakpoints
    
    Kemudian, membuka Visual Studio. Elektron tidak dibangun dengan Visual Studio dan karenanya tidak berisi file project - namun Anda dapat membuka file kode sumber "Sebagai File", yang berarti bahwa Visual Studio akan membuka mereka sendiri. Anda masih dapat mengatur breakpoints - Visual Studio secara otomatis akan mengetahui bahwa kode sumber sesuai dengan kode yang berjalan dalam proses melekat dan istirahat sesuai.
    
    File kode yang relevan dapat ditemukan di  ./ atom / </ 0> serta dalam Brightray, ditemukan di
 <code> ./brightray/browser </ 0> dan <code> ./brightray/common </ 0 > . Jika Anda hardcore, Anda juga dapat men-debug Chromium langsung, yang jelas ditemukan dalam <code> kromium _src </ 0> .</p>

<h3>melampirkan</h3>

<p>Anda dapat melampirkan Visual Studio debugger untuk proses yang berjalan pada lokal komputer atau remote. Setelah proses ini berjalan, klik Debug / Lampirkan untuk Proses (atau tekan <code> CTRL + ALT + P </ 0> ) untuk membuka "Lampirkan untuk Proses" kotak dialog. Anda dapat menggunakan kemampuan ini untuk debug aplikasi yang berjalan pada lokal komputer atau remote, beberapa proses men-debug secara bersamaan.</p>

<p>Jika Elektron berjalan di bawah account pengguna yang berbeda, pilih
 <code> Tampilkan proses dari semua pengguna </ 0> kotak centang. Perhatikan bahwa tergantung pada berapa banyak BrowserWindows aplikasi dibuka, Anda akan melihat beberapa proses. Sebuah aplikasi satu-jendela khas akan menghasilkan Visual Studio menyajikan Anda dengan dua
 <code> Electron.exe </ 0> entri - satu untuk proses utama dan satu untuk proses penyaji. Karena daftar hanya memberikan nama, saat ini tidak ada cara yang dapat diandalkan untuk mencari tahu yang mana.</p>

<h3>Proses Yang Harus Saya Lampirkan ke?</h3>

<p>Kode dieksekusi dalam proses utama (yaitu, kode yang ditemukan di atau akhirnya dijalankan oleh utama Anda JavaScript file) serta kode yang disebut menggunakan remote ( <code> membutuhkan ( 'elektron'). Jarak jauh </ 0> ) akan dijalankan di dalam proses utama, sementara kode lainnya akan mengeksekusi dalam proses penyaji masing-masing.</p>

<p>Anda dapat dilampirkan ke beberapa program ketika Anda debugging, tetapi hanya satu program yang aktif di debugger setiap saat. Anda dapat mengatur program aktif dalam <code> Debug Lokasi </ 0> toolbar atau <code> Proses jendela </ 0> .</p>

<h2>Menggunakan ProcMon untuk Amati Proses sebuah</h2>

<p>Sementara Visual Studio fantastis untuk memeriksa jalur kode tertentu, kekuatan ProcMon adalah benar-benar dalam mengamati segala aplikasi Anda lakukan dengan sistem operasi - menangkap File, Registry, Jaringan, Proses, dan rincian Profiling proses. Ia mencoba untuk log <strong> semua </ 0> peristiwa yang terjadi dan dapat cukup besar, tetapi jika Anda berusaha untuk memahami apa dan bagaimana aplikasi Anda lakukan untuk sistem operasi, dapat menjadi sumber daya berharga.</p>

<p>Untuk pengenalan dasar dan lanjutan fitur debugging ProcMon ini, pergi memeriksa <a href="https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor"> video ini tutorial </ 0> disediakan oleh Microsoft.</p>