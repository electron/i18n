# Debugging su macOS

Se si verificano arresti anomali o problemi in Electron che si ritiene non siano causati dall'applicazione JavaScript, ma invece da Electron stesso, il debug può essere un po 'complicato, specialmente per gli sviluppatori non utilizzati per il debug di nativi / C ++. Comunque, usando lldb, ed il codice sorgente di Electron, puoi abilitare il debug passo dopo passo con breakpoint interni al codice sorgente di Electron. Puoi anche usare [XCode per il debug](debugging-instructions-macos-xcode.md) se preferisci un'interfaccia grafica.

## Requisiti

* **Una build di debug di Electron**: Il modo più semplice è di solito costruirlo da se, usando gli strumenti ed i prerequisiti elencati nelle [istruzioni di costruzione per macOS](build-instructions-macos.md). Mentre puoi allegare e fare il debug di Electron come puoi scaricarlo direttamente, potresti trovare che è pesantemente ottimizzato, rendendo il debug sostanzialmente più difficile: Il debugger non potrà mostrarti il contenuto di tutte le variabili ed il percorso di esecuzione può sembrare strano per la messa in linea, le chiamate di coda, ed altre ottimizzazioni del compilatore.

* **Xcode**: Oltre ad Xcode, installa anche gli strumenti di linea di comando. Includono LLDB, il debugger predefinito in Xcode su Mac OS X. Supporta il debug di C, Objective-C e C++ su dispositivi desktop ed iOS e simulatori.

## Allegare a e Debug Electron

Per iniziare una sessione di debug, apri il Terminale ed avvia `lldb` passando una build di debug di Electron come parametro.

```sh
$ lldb ./out/Debug/Electron.app
(lldb) target create "./out/Debug/Electron.app"
Current executable set to './out/Debug/Electron.app' (x86_64).
```

### Impostare Breakpoint

LLDB è un potente strumento e supporta multiple strategie per l'ispezione del codice. Per questa introduzione di base, supponiamo che si stia chiamando un comando da JavaScript che non si sta comportando correttamente - quindi vorresti rompere sulla controparte di questo comando C++ all'interno della sorgente di Electron.

I file di codice rilevanti possono essere trovati in `./atom/`.

Supponiamo si voglia fare il debug di `app.setName()`, che è definito in `browser.cc` come `Browser::SetName()`. Imposta il breakpoint usando il comando `breakpoint`, specificando file e riga da rompere:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Poi, avvia Electron:

```sh
(lldb) run
```

L'app sarà immediatamente sospesa, poiché Electron imposta il nome dell'app all'avvio:

```sh
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/Debug/Electron.app/Contents/MacOS/Electron' (x86_64)
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

Per mostrare gli argomenti e le variabili locali per il frame corrente, esegui `frame variable` (o `fr v`), che ti mostrerà l'app che sta impostando correntemente il nome a "Electron".

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

Per fare un singolo passo di livello sorgente nel thread attualmente selezionato, esegui `step` (o `s`). Questo ti porterebbe in `name_override_.empty()`. Per procedere e fare un passo avanti, esegui `next` (o `n`).

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

Per finire il debug a questo punto, esegui `process continue`. Puoi anche continuare finché una certa riga è toccata in questo thread (`thread until 100`). Questo comando eseguirà il thread nel frame corrente finché raggiungerà la riga 100 in questo frame o si fermerà se lascia il frame corrente.

Ora, se apri gli strumenti sviluppatore di Electron e chiami `setName`, colpirai nuovamente il breakpoint.

### Ulteriori Letture
LLDB è un potente strumento con una grande documentazione. Per saperne di più, considera la documentazione di debug di Apple, per esempio la [Struttura di Riferimento Comando LLDB](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) o l'introduzione all'[Utilizzo LLDB come un Debugger Standalone](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

Puoi anche vedere il fantastico [manuale e tutorial](http://lldb.llvm.org/tutorial.html) di LLDB che spiegherà scenari di debug più complessi.
