# Pagde-debug sa macOS

Kung ikaw ay nakararanas ng mga pag-crash o may nagaganap na di tama sa Electron at naniniwala ka na ito'y hindi sanhi ng iyong JavaScript na aplikasyon, sa halip ang problema ay nasa Electron mismo, ang pagde-debug ay posibleng maging medyo nakakalito, lalo na sa mga tagabuo na hindi gumagamit ng native/C++ na pagde-debug. Ganoon pa man, sa paggamit ang lldb at source code ng Electron, ito ay masyadong madali upang paganahin ang isang hakbang-hakbang na pagde-debug kasama ang mga breakpoint sa loob ng source code ng Electron.

## Mga Kinakailangan

* **Isang debug na build ng Elektron**: Ang pinakamadaling paraan ay kadalasan ang pagbuo mo nito mismo, gamit ang mga kagamitan at mga paunang kinakailangan na nasa [instruksyon sa pagbuo para sa Windows](build-instructions-osx.md). Habang kaya mong madaliang ilakip sa at i-debug ang Electron gaya ng kaya mong direkta itong i-download, makikita mong lubos itong na-optimize, na ginagawa ang pagde-debug na mas mahirap: Ang taga-debug ay hindi kayang ipakita sa iyo ang nilalaman ng lahat ng mga variable at ang landas ng pagsunod ay magmumukhang kakaiba dahil sa pag-inline, mga hulihang tawag at iba pang mga optimisasyon sa compiler.

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

Ang mga mahahalagang code file ay matatagpuan sa `./atom/` tulad ng Brightray na matatagpuan sa `./brightray/browser` at `./brightray/common`. Kung ikaw ay harcore, maaaring mo ring direktang i-debug si Chromium na matatagpuan sa `chromium_src`.

Ipagpalagay natin na ang gusto mong i-debug ay `app.setName()`, na syang tumutukoy sa `browser.cc` bilang `Browser::SetName()`. Itakda ang breakpoint gamit ang command na `breakpoint` na tumutukoy sa file at linya:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Pagkatapos, simulan ang Electron:

```sh
(lldb) run
```

Ang app ay mabilis na hihinto dahil ang Elektron ay nagtatakda ng pangalan ng app sa launch:

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

Para maipakita ang mga argumento at mga lokal na "variable" para sa kasalukuyang balangkas nito, patakbuhin ang `frame variable` (o `fr v`), na magpapakita sa'yo na ang "app" ay kasalukuyang itinatakda ang pangalan sa Elektron.

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

Para magawa ang lebel ng "source" sa isang hakbang sa kasalukuyang napiling "thread", palabasin ang `step` (o `s`). Ito ang magdadala sa'yo sa `name_override_.empty()`. Para magpatuloy at isagawa ang hakbang, patakbuhin ang `next` (o `n`).

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

Sa puntong ito, para matapos ang "debugging", patakbuhin ang `process continue`. Maaari ka ring magpatuloy hanggang ang tiyak na linya ay matamaan sa "thread" na to (`thread until 100`). Ang "command" na ito ay patatakbuhin ang "thread" sa kasalukuyan nitong balangkas hanggang ito'y umabot sa 100 na linya o patigilin kapag iniwan ang kasalukuyang balangkas.

Ngayon, kung iyong bubuksan ang "developer tools" ng Elektron at tinatawag na `setName`, matatamaan mong muli ang "breakpoint".

### Para sa Pagpapatuloy ng Pagbabasa

"LLDB" ay ang pinakamalakas na gamit magandang dokumentasyon. Para sa karagdagang kaalaman tungkol dito, isaalang-alang ang dokumentasyon sa "debugging" ng Apple, halimbawa ang [LLDB Command Structure Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) o ang panimula ng [Using LLDB as a Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

Maaari mo ring tingnan ang kamangha-manghang [manual and tutorial](http://lldb.llvm.org/tutorial.html) ng "LLDB", na mas magpapaliwanag ng iba't-ibang maaaring mangyari sa "complex debugging".