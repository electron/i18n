# Debugging sa macOS

Kung ikaw ay nakararanas ng pagbagsak o may nagaganap na di tama sa Electron at alam mo na ito'y di sanhi hindi ng JavaScript application, sa halip ang problema ay nasa mismong Electron, ang pagtatama ng mali (debugging) ay medyo nakakalito lalo na sa mga naglilinang nito na hindi gumagamit ng native/C++ upang mahanap o maitama ang mga mali nito (debugging). Ganoon pa man, gamit ang lldb at source code ng Electron, ito ay magiging madali upang mag-debug gamit ang mga breakpoint sa loob ng source code nito.

## Mga kinakailangan

* **Ang debug na gawa ng Electron**: Kadalasan, ang pinakamadaling paraan upang buuin ito ay gamit ang kanyang sarili sa pamamagitan ng mga gamit at mga pangunahing kailangan na nasa [build instructions para sa Windows](build-instructions-osx.md). Kapag ang Electron ay tuwirang kinuha (download), ito ay madaling maikakabit at matutukoy ang problema (debug), at ito'y siguradong gagana nang higit na mas maayos. Ginagawa nitong mas mahirap ang paghahanap at pag-aayos ng mga problema (debugging): Ang debugger ay hindi kayang ipakita ang lahat ng laman ng variable at mapapansin ang execution path ay maaaring maging kakaiba dahil sa inlining, tail calls at iba pang compiler optimizations.

* **Xcode**: Sa karagdagan, ang Xcode ay ginagamit din ang Xcode command line tools. Kasama rin ang LLDB, ang default debugger ng Xcode sa Mac OS X. Sinusuportahan nito ang debugging C, Objective-C and C++ sa desktop at iOS devices at simulator.

## Pagkakabit at Pagde-debug sa Electron

Para simulan ang debugging session, buksan ang Terminal at umpisahan ang `lldb`, na dadaan sa debug na gawa ng Electron bilang parameter.

```sh
lldb ./out/D/Electron.app
(lldb) target create "./out/D/Electron.app"
Current executable set to './out/D/Electron.app' (x86_64).
```

### Pagtatakda ng mga Breakpoint

Ang LLDB ang pinakamahalagang kasangkapan at sumusuporta sa karamihan ng estratihiya para siyasatin ang code. Para sa simula ng pundasyon, ipagpalagay natin na ang tinatawag na command galing sa JavaScript ay di gumagana ng maayos - at ngayon, hindi mo nanaisin na gamitin ang C++ bilang command katapat sa loob ng source ng Electron.

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