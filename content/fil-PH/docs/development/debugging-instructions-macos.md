# Pagde-debug sa macOS

Kung ikaw ay nakararanas ng mga pag-crash o may nagaganap na di tama sa Electron at naniniwala ka na ito'y hindi sanhi ng iyong JavaScript na aplikasyon, sa halip ang problema ay nasa Electron mismo, ang pagde-debug ay posibleng maging medyo nakakalito, lalo na sa mga tagabuo na hindi gumagamit ng native/C++ na pagde-debug. However, using lldb, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code. You can also use [XCode for debugging](debugging-instructions-macos-xcode.md) if you prefer a graphical interface.

## Mga Kinakailangan

* **Isang debug na build ng Elektron**: Ang pinakamadaling paraan ay kadalasan ang pagbuo mo nito mismo, gamit ang mga kagamitan at mga paunang kinakailangan na nasa [instruksyon sa pagbuo para sa Windows](build-instructions-osx.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Xcode**: Bilang karagdagan sa Xcode, i-install rin ang mga kagamitan sa Xcode na pang-utoss na linya. Isinasali nila ang LLDB, ang default na taga-debug sa Xcode sa Mac OS X. Sinusuportahan nito ang debugging C, Objective-C at C++ sa desktop at ios na mga kasangkapan at taga-simulate.

## Pagkakabit at Pagde-debug sa Electron

Upang simulan ang debugging na sesyon, buksan ang Terminal at umpisahan ang `lldb`, habang pinapasa ang isang debug na build ng Electron bilang isang parametro.

```sh
lldb ./out/D/Electron.app
(lldb) target create "./out/D/Electron.app"
Current executable set to './out/D/Electron.app' (x86_64).
```

### Pagtatakda ng mga Breakpoint

Ang LLDB ay isang makapangyarihang kagamitan at sumusuporta sa maraming mga istratehiya sa pagsisiyasat ng code. Para sa simpleng introduksyong ito, ipagpalagay natin na nagtatawag ka ng isang utos mula sa JavaScript na hindi gumagalaw ng tama - kaya gusto mong magtuon sa katumbas nitong C++ na utos sa loob ng pinagkukunan ng Electron.

Ang mga may kaugnayang mga code file ay matatagpuan sa `./atom/` pati na rin sa Brightray na matatagpuan sa `./brightray/browser` at `./brightray/common`.

Ipagpalagay natin na gusto mong i-debug ang `app.setName()`, na syang inilalarawan sa `browser.cc` bilang `Browser::SetName()`. Itakda ang breakpoint gamit ang utos na `breakpoint` na tumutukoy sa file at linya na pagtutuonan:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Pagkatapos, simulan na ang Electron:

```sh
(lldb) run
```

Ang app ay madaliang ihihinto dahil ang Electron ay nagtatakda ng pangalan ng app sa paglunsad:

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

Para maipakita ang mga argumento at mga lokal na variable para sa kasalukuyang frame, paganahin ang `frame variable` (o `fr v`), na magpapakita sa'yo na ang app ay kasalukuyang itinatakda ang pangalan sa Elektron.

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

Upang makagawa ng isang hakbang sa antas ng pinagmulan sa kasalukuyang napiling thread, paganahin ang `step` (o `s`). Ito ang magdadala sa'yo sa `name_override_.empty()`. Upang makapagpatuloy at makagawa ng isang step over, paganahin ang `next` (o `n`).

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

Sa puntong ito, para matapos ang pagde-debug, paganahin ang `process continue`. Maaari ka ring magpatuloy hanggang ang isang tiyak na linya ay matamaan sa thread na ito (`thread until 100`). Ang utos na ito ay magpapatakbo sa thread sa kasalukuyan nitong frame hanggang ito'y umabot sa 100 na linya o patigilin kapag iniwan ang kasalukuyang frame.

Ngayon, kung iyong bubuksan ang mga kagamitan ng tagabuo ng Electron at tatawagin ang `setName`, matatamaan mong muli ang breakpoint.

### Karagdagang Pagbabasa

Ang LLDB ay ang isang makapangyarihang kagamitan na may magandang dokumentasyon. Upang mas makaalam pa tungkol dito, isaalang-alang ang dokumentasyon sa pagde-debug ng Apple, halimbawa ang [LLDB Command Structure Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) o ang panimula ng [Paggamit ng LLDB bilang isang Standalone na Taga-debug](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

Maaari mo ring tingnan ang kamangha-manghang [manwal and tyutoryal](http://lldb.llvm.org/tutorial.html) ng LLDB, na mas magpapaliwanag sa mga mas komplikadong sitwasyon ng pagde-debug.