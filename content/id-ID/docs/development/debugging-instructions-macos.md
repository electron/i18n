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
        
        File kode yang relevan dapat ditemukan di ` ./ atom / </ 0> serta dalam Brightray, ditemukan di
 <code> ./brightray/browser </ 0> dan <code> ./brightray/common </ 0 > . Jika Anda hardcore, Anda juga dapat men-debug Chromium langsung, yang jelas ditemukan dalam <code> kromium _src </ 0> .</p>

<p>Let's assume that you want to debug <code>app.setName()`, which is defined in `browser.cc` as `Browser::SetName()`. Set the breakpoint using the `breakpoint` command, specifying file and line to break on:
        
        ```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```
    
    Then, start Electron:
    
    ```sh
(lldb) run
```

The app will immediately be paused, since Electron sets the app's name on launch:

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

To show the arguments and local variables for the current frame, run `frame variable` (or `fr v`), which will show you that the app is currently setting the name to "Electron".

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

To do a source level single step in the currently selected thread, execute `step` (or `s`). This would take you into `name_override_.empty()`. To proceed and do a step over, run `next` (or `n`).

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

To finish debugging at this point, run `process continue`. You can also continue until a certain line is hit in this thread (`thread until 100`). This command will run the thread in the current frame till it reaches line 100 in this frame or stops if it leaves the current frame.

Now, if you open up Electron's developer tools and call `setName`, you will once again hit the breakpoint.

### Further Reading

LLDB is a powerful tool with a great documentation. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) or the introduction to [Using LLDB as a Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

You can also check out LLDB's fantastic [manual and tutorial](http://lldb.llvm.org/tutorial.html), which will explain more complex debugging scenarios.