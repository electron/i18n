# Debugging on macOS

If you experience crashes or issues in Electron that you believe are not caused by your JavaScript application, but instead by Electron itself, debugging can be a little bit tricky, especially for developers not used to native/C++ debugging. However, using lldb, and the Electron source code, it is fairly easy to enable step-through debugging with breakpoints inside Electron's source code.

## Spécifications requises

* **Un debug build d'Electron** : le moyen le plus simple est généralement de le build vous-même, en utilisant les outils et prérequis énumérées dans les [instructions de compilation pour macOS](build-instructions-osx.md). Alors que vous pouvez facilement débogguer Electron puisque vous pouvez le télécharger directement, vous trouverez qu’il est fortement optimisé, ce qui rend le déboggage sensiblement plus difficile : le déboggueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’in-Lining, queue d’appels et autres optimisations du compilateur.

* **Xcode**: En plus de Xcode, vous devez aussi installer les outils de ligne de commande de Xcode. Ils incluent LLDB, le déboggueur par défaut dans Xcode sur Mac OS X. Il prend en charge le déboggage C, Objective-C et C++ sur les ordinateurs et les appareils iOS et simulateur.

## Attaching to and Debugging Electron

Pour démarrer une session de déboggage, ouvrez terminal et lancez `lldb`, passez une version debug d'Electron en tant que paramètre.

```bash
$ lldb ./out/D/Electron.app
(lldb) target create "./out/D/Electron.app"
Current executable set to './out/D/Electron.app' (x86_64).
```

### Setting Breakpoints

LLDB est un outil puissant et supporte plusieurs stratégies d'inspection de code. Pour cette introduction basique, assumons que vous exécutez une commande JavaScript qui ne se comporte pas correctement - donc vous aimeriez voir l'equivalent de cette commande en C++.

Relevant code files can be found in `./atom/` as well as in Brightray, found in `./vendor/brightray/browser` and `./vendor/brightray/common`. If you're hardcore, you can also debug Chromium directly, which is obviously found in `chromium_src`.

Let's assume that you want to debug `app.setName()`, which is defined in `browser.cc` as `Browser::SetName()`. Set the breakpoint using the `breakpoint` command, specifying file and line to break on:

```bash
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Ensuite, démarrez Electron :

```bash
(lldb) run
```

L’app sera immédiatement suspendu, puisque l’électron définit le nom de l’application au lancement :

```bash
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/D/Electron.app/Contents/MacOS/Electron' (x86_64) Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
  frame #0: 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118 
  115 }
  116
  117 void Browser::SetName(const std::string& name) {
-> 118 name_override_ = name;
  119 }
  120
  121 int Browser::GetBadgeCount() { 
(lldb)
```

To show the arguments and local variables for the current frame, run `frame variable` (or `fr v`), which will show you that the app is currently setting the name to "Electron".

```bash
(lldb) frame variable 
(atom::Browser *) this = 0x0000000108b14f20 
(const string &) name = "Electron": {
   [...]
}
```

To do a source level single step in the currently selected thread, execute `step` (or `s`). This would take you into into `name_override_.empty()`. To proceed and do a step over, run `next` (or `n`).

```bash
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

### Lectures additionnelles

LLDB is a powerful tool with a great documentation. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) or the introduction to [Using LLDB as a Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

Vous pouvez également consulter les fantastiques [manuel et tutoriel](http://lldb.llvm.org/tutorial.html) pour LLDB, qui vous expliquera des scénarios de déboggage plus complexes.