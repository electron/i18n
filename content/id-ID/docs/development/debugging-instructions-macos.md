# Debugging on macOS

Jika Anda mengalami crash atau masalah di Electron yang Anda percaya tidak disebabkan oleh Anda JavaScript aplikasi, melainkan oleh elektron itu sendiri, debugging bisa menjadi sedikit rumit, terutama untuk pengembang tidak digunakan untuk native / C ++ debugging. Namun, dengan menggunakan lldb, dan Electron kode sumber, itu cukup mudah untuk mengaktifkan debugging langkah-melalui dengan breakpoints dalam Electron kode sumber 's.

## Persyaratan

* ** Sebuah membangun debug Elektron </ 0> : Cara termudah biasanya membangun sendiri, menggunakan alat dan prasyarat yang tercantum dalam  membangun petunjuk untuk MacOS </ 1> . Meskipun Anda dapat dengan mudah menempel dan debug Electron karena Anda dapat men-download secara langsung, Anda akan menemukan bahwa itu sangat dioptimalkan, membuat debugging secara substansial lebih sulit: debugger tidak akan dapat menunjukkan isi semua variabel dan jalur eksekusi bisa tampak aneh karena inlining, panggilan ekor, dan optimasi compiler lainnya.</p></li> 
    
    * ** Xcode </ 0> : Selain Xcode, juga menginstal alat baris perintah Xcode. Mereka termasuk LLDB, debugger default dalam Xcode di Mac OS X. Ini mendukung debugging C , Objective- C dan C ++ pada desktop dan perangkat iOS dan simulator.</p></li> </ul> 
        
        ## Melekat dan Debugging Electron
        
        Untuk memulai sesi debugging, membuka Terminal dan mulai ` lldb </ 0> , melewati debug membangun Elektron sebagai parameter.</p>

<pre><code class="sh">$ Lldb ./out/D/Electron.app (lldb) menargetkan menciptakan "./out/D/Electron.app" Saat set dieksekusi untuk './out/D/Electron.app' (x86_64).
`</pre> 
        
        ### pengaturan Breakpoints
        
        LLDB adalah alat yang ampuh dan mendukung beberapa strategi untuk pemeriksaan kode. Untuk pengenalan dasar ini, mari kita asumsikan bahwa Anda menelepon perintah dari JavaScript yang tidak berperilaku dengan benar - sehingga Anda ingin istirahat pada bahwa perintah ini C ++ rekan dalam Elektron sumber.
        
        File kode yang relevan dapat ditemukan di `` ./ atom / </ 0> serta dalam Brightray, ditemukan di
 <code> ./brightray/browser </ 0> dan <code> ./brightray/common </ 0 > . Jika Anda hardcore, Anda juga dapat men-debug Chromium langsung, yang jelas ditemukan dalam <code> kromium _src </ 0> .</p>

<p>Mari kita berasumsi bahwa Anda ingin debug <code> app.setName () </ 0> , yang didefinisikan dalam <code> browser.cc </ 0> 
sebagai <code> Browser :: setName () </ 0> . Mengatur breakpoint menggunakan <code> breakpoint </ 0> perintah, menentukan berkas dan garis untuk istirahat pada:</p>

<pre><code class="sh">(lldb) breakpoint ditetapkan browser.cc --file --line 117 Breakpoint 1: mana = Electron Framework`atom: : Browser: : setName (std: : __ 1: : basic_string <char, std::__1::char_traits<char> , std: : __ 1: : pengalokasi < 1>  & gt; const & amp; ) + 20 di browser.cc:118, alamat = 0x000000000015fdb4
``</pre> 
        
        Kemudian, mulai Electron :
        
        ```sh
(Lldb) run
```
    
    Aplikasi ini akan segera dihentikan sementara, karena Electron menetapkan nama aplikasi pada peluncuran:
    
    ```sh
(lldb) Proses run 25.244 diluncurkan: '/ Users / fr / Kode / elektron / keluar / D / Elektron App / Isi / MacOS / Electron ' (x86_64) Proses 25.244 berhenti * benang # 1: tid = 0x839a4c, 0x0000000100162db4 Electron Kerangka `atom: : Browser: : setName (ini = 0x0000000108b14f20, nama = " Electron ") + 20 di browser.cc:118, antrian = 'com.apple.main-benang', berhenti alasan = breakpoint 1.1
     bingkai # 0: 0x0000000100162db4 elektron Framework`atom: : Browser: : setName (ini = 0x0000000108b14f20, nama = " elektron ") + 20 di browser.cc:118
    115}
    116
    117 kekosongan Browser :: setName (const std :: string& amp; nama) {- & gt; 118 name_override_ = nama;
   119}
    120
    121 int Browser :: GetBadgeCount () {(lldb)
```

Untuk menunjukkan argumen dan lokal variabel untuk frame, menjalankan ` variabel bingkai </ 0> (atau <code> fr v </ 0> ), yang akan menunjukkan bahwa aplikasi saat ini pengaturan nama untuk " Elektron ".</p>

<pre><code class="sh">(lldb) bingkai variabel (atom :: Browser *) ini = 0x0000000108b14f20 (const string yang  & amp; ) name = " Elektron ": {
 [...] 
}    
`</pre> 

Untuk melakukan satu langkah tingkat sumber di thread yang sedang dipilih, mengeksekusi `` langkah </ 0> (atau <code> s </ 0> ).
Hal ini akan membawa Anda ke <code> name_override_.empty () </ 0> . Untuk melanjutkan dan melakukan langkah lebih, jalankan <code> berikutnya </ 0> (atau <code> n </ 0> ).</p>

<pre><code class="sh">(lldb) Langkah Proses 25.244 berhenti * benang # 1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom: : Browser: : setName (ini = 0x0000000108b14f20, nama = " Electron ") + 44 di browser.cc:119, antrian = ' com.apple.main-benang', berhenti alasan = langkah dalam
     bingkai # 0: 0x0000000100162dcc Electron Framework`atom: : Browser: : setName (ini = 0x0000000108b14f20, nama = " Electron ") + 44 di browser.cc:119
    116
    117 kekosongan Browser :: setName (std :: string const & amp; nama) {
    118 name_override_ = nama; - & gt; 119}
    120
    121 int Browser :: GetBadgeCount () {
   122 badge_count_ kembali;
``</pre> 

Untuk menyelesaikan debugging pada titik ini, jalankan  proses terus </ 0> . Anda juga dapat berlanjut sampai garis tertentu terkena di thread ini ( <code> benang sampai 100 </ 0> ). Perintah ini akan menjalankan thread di frame sampai mencapai garis 100 dalam bingkai ini atau berhenti jika ia meninggalkan frame.</p>

<p>Sekarang, jika Anda membuka alat pengembang Electron dan memanggil <code> setName </ 0> , Anda akan sekali lagi memukul breakpoint.</p>

<h3>Bacaan lebih lanjut</h3>

<p>LLDB adalah alat yang ampuh dengan dokumentasi yang bagus. Untuk mempelajari lebih lanjut tentang hal itu, mempertimbangkan Apple dokumentasi debugging, misalnya <a href="https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2"> LLDB Command Struktur Referensi </ 0> 
atau pengantar <a href="https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html"> Menggunakan LLDB sebagai Standalone Debugger </ 1> .</p>

<p>Anda juga dapat memeriksa LLDB ini fantastis <a href="http://lldb.llvm.org/tutorial.html"> tutorial manual dan </ 0> , yang akan menjelaskan skenario debugging lebih kompleks.</p>