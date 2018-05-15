# Debugging on macOS

Jika Anda mengalami crash atau masalah di Electron yang Anda percaya tidak disebabkan oleh Anda JavaScript aplikasi, melainkan oleh elektron itu sendiri, debugging bisa menjadi sedikit rumit, terutama untuk pengembang tidak digunakan untuk native / C ++ debugging. However, using lldb, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code. You can also use [XCode for debugging](debugging-instructions-macos-xcode.md) if you prefer a graphical interface.

## Persyaratan

* **Membangun sebuah debug Elektron**: Cara termudah biasanya membangun sendiri, menggunakan alat dan prasyarat yang tercantum dalam [membangun petunjuk untuk MacOS](build-instructions-osx.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Xcode**: Selain Xcode, juga menginstal alat baris perintah Xcode. Mereka termasuk LLDB, debugger default dalam Xcode di Mac OS X. Ini mendukung debugging C , Objective- C dan C ++ pada desktop dan perangkat iOS dan simulator.

## Menempelkan dan Debugging Electron

Untuk memulai sesi debugging, membuka Terminal dan mulai `lldb`, melewati debug membangun Elektron sebagai parameter.

```sh
$ lldb ./out/D/Electron.app
(lldb) target create "./out/D/Electron.app"
Current executable set to './out/D/Electron.app' (x86_64).
```

### Pengaturan Breakpoints

LLDB adalah alat yang ampuh dan mendukung beberapa strategi untuk pemeriksaan kode. Untuk pengenalan dasar ini, mari kita asumsikan bahwa Anda menelepon perintah dari JavaScript yang tidak berperilaku dengan benar - sehingga Anda ingin istirahat pada bahwa perintah ini C ++ rekan dalam Elektron sumber.

File kode yang relevan dapat ditemukan di `./atom/` serta dalam Brightray, ditemukan di `./brightray/browser` dan `./brightray/common`.

Mari kita berasumsi bahwa Anda ingin debug `app.setName()`, yang didefinisikan dalam `browser.cc` sebagai `Browser::setName()`. Mengatur breakpoint menggunakan `breakpoint` perintah, menentukan berkas dan garis untuk istirahat pada:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Kemudian, mulai Electron :

```sh
(lldb) run
```

Aplikasi ini akan segera dihentikan sementara, karena Electron menetapkan nama aplikasi pada peluncuran:

```sh
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/D/Electron.app/Contents/MacOS/Electron' (x86_64)
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118
   115  }
   116
   117  void Browser::SetName(const std::string& name) {
-> 118    name_override_ = name;
   119  }
   120
   121  int Browser::GetBadgeCount() {
(lldb)
```

Untuk menunjukkan argumen dan lokal variabel untuk frame, menjalankan `variabel frame` (atau `fr v`), yang akan menunjukkan bahwa aplikasi saat ini pengaturan nama untuk " Elektron ".

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

Untuk melakukan satu langkah tingkat sumber di thread yang sedang dipilih, lakukan `langkah` (atau `s`). Hal ini akan membawa Anda ke `name_override_.empty()`. Untuk melanjutkan dan melakukan langkah lebih, jalankan `berikutnya` (atau `n`).

```sh
(lldb) step
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119
   116
   117  void Browser::SetName(const std::string& name) {
   118    name_override_ = name;
-> 119  }
   120
   121  int Browser::GetBadgeCount() {
   122    return badge_count_;
```

Untuk menyelesaikan debugging pada titik ini, jalankan `process continue`. Anda juga dapat berlanjut sampai garis tertentu terkena di thread ini (`thread until 100`). Perintah ini akan menjalankan thread di frame sampai mencapai garis 100 dalam bingkai ini atau berhenti jika ia meninggalkan frame.

Sekarang, jika Anda membuka alat pengembang Electron dan memanggil `setName`, Anda akan sekali lagi memukul breakpoint.

### Bacaan lebih lanjut

LLDB adalah alat yang ampuh dengan dokumentasi yang bagus. Untuk mempelajari lebih lanjut tentang hal itu, mempertimbangkan Apple dokumentasi debugging, misalnya [LLDB Command Struktur Referensi](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) atau pengantar [Menggunakan LLDB sebagai Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

Anda juga dapat memeriksa LLDB ini fantastis [manual dan tutorial](http://lldb.llvm.org/tutorial.html), yang akan menjelaskan skenario debugging lebih kompleks.