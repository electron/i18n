# Debugging in macOS

Wenn Sie Abstürze oder Probleme in Electron auftreten, von denen Sie glauben, dass sie nicht JavaScript-Anwendung, sondern von Electron selbst kann das Debuggen ein wenig schwierig sein, vor allem für Entwickler, die nicht an native/C++ gewöhnt sind Debuggen. Mit lldb und dem Electron-Quellcode können Sie jedoch schrittweises Debuggen mit Haltepunkten im Quellcode von Electron aktivieren. Sie können [XCode auch zum Debuggen](debugging-instructions-macos-xcode.md) verwenden, wenn Sie eine grafische Benutzeroberfläche bevorzugen.

## Anforderungen

* **Ein Debug-Build von Electron**: Der einfachste Weg ist es, es in der Regel sich selbst zu erstellen, indem sie die Tools und Voraussetzungen verwenden, die in den [Buildanweisungen für macOS](build-instructions-macos.md)aufgeführt sind. Während Sie an Electron anhängen und sie debuggen können, da Sie es direkt herunterladen können, werden Sie feststellen, dass es stark optimiert ist, was das Debuggen wesentlich schwieriger macht: Der Debugger wird Nicht in der Lage sein, Ihnen den Inhalt aller Variablen anzuzeigen, und der Ausführungspfad kann aufgrund von Inlining, -Tail-Aufrufen und anderen Compileroptimierungen seltsam erscheinen.

* **Xcode**: Zusätzlich zu Xcode, installieren Sie auch die Xcode-Befehlszeilentools. Dazu gehört LLDB, der Standarddebugger in Xcode unter macOS. Es unterstützt Debuggen von C, Objective-C und C++ auf Desktop- und iOS-Geräten und Simulatoren.

* **.lldbinit**: Erstellen oder bearbeiten Sie `~/.lldbinit` , damit Chromium-Code ordnungsgemäß mit der Quelle zugeordnet werden kann.

   ```text
   Befehlsskriptimport n/electron/src/tools/lldb/lldbinit.py
   ```

## Anfügen und Debuggen von Electron

Um eine Debugging-Sitzung zu starten, öffnen Sie Terminal und starten Sie `lldb`, indem Sie eine Nicht-Release- -Build von Electron als Parameter übergeben.

```sh
$ lldb ./out/Testing/Electron.app
(lldb) Ziel erstellen "./out/Testing/Electron.app"
Aktuelle ausführbare Datei auf './out/Testing/Electron.app' (x86_64).
```

### Breakpoints setzen

LLDB ist ein leistungsstarkes Tool und unterstützt mehrere Strategien für die Codeprüfung. Für dieser grundlegenden Einführung nehmen wir an, dass Sie einen Befehl aus JavaScript aufrufen, , der sich nicht korrekt verhält , also möchten Sie das C++- -Gegenstück dieses Befehls innerhalb der Elektronenquelle unterbrechen.

Relevante Codedateien finden Sie in `./shell/`.

Angenommen, Sie möchten `app.setName()`debuggen, der in `browser.cc` als `Browser::SetName()`definiert ist. Legen Sie den Haltepunkt mit dem Befehl `breakpoint` fest und geben Sie Datei und Zeile an, auf der Folgendes aufgebrochen werden soll:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Dann starte Electron:

```sh
(lldb) run
```

Die App wird sofort angehalten, da Electron den Namen der App beim Start festlegt:

```sh
(lldb) ausführen
Process 25244 gestartet: '/Users/fr/Code/electron/out/Testing/Electron.app/Contents/MacOS/Electron' (x86_64)
Process 25244 stoppt
* Thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 bei browser.cc:118, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100162db4 Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 bei browser.cc:118
   115 '
   116
   117 void Browser::SetName(const std::string& name
   
   
   name_override_> 
) ::GetBadgeCount() -
(lldb)
```

Um die Argumente und lokalen Variablen für den aktuellen Frame anzuzeigen, führen Sie `frame variable` (oder `fr v`) aus, , die Ihnen zeigt, dass die App derzeit den Namen auf "Electron" setzt.

```sh
(lldb) Frame-Variable
(atom::Browser *) dies = 0x0000000108b14f20
(const string &) name = "Electron"
    [...]:
}
```

Führen Sie `step` (oder `s`) aus, um einen einzelnen Schritt auf Quellebene im aktuell ausgewählten Thread auszuführen. Dies würde Sie in `name_override_.empty()`bringen. Um fortzufahren und einen Schritt zu machen, führen `next` (oder `n`) aus.

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

**HINWEIS:** Wenn Sie den Quellcode nicht sehen, wenn Sie der Meinung sind, dass Sie es sollten, haben Sie die oben genannte `~/.lldbinit` Datei möglicherweise nicht hinzugefügt.

Führen Sie `process continue`aus, um das Debuggen an dieser Stelle abzuschließen. Sie können auch fortfahren, bis eine bestimmte Zeile in diesem Thread (`thread until 100`) getroffen wird. Dieser Befehl führt den Thread im aktuellen Rahmen aus, bis er Zeile 100 in diesem Frame erreicht oder stoppt, wenn er den aktuellen Frame verlässt.

Jetzt wenn du Electrons DevTools öffnest und `setName` aufrufst triffst du wieder den Breakpoint.

### Weiterführende Informationen

LLDB ist ein leistungsstarkes Tool mit einer großartigen Dokumentation. Um mehr darüber zu erfahren, sollten Sie die Debugdokumentation von Apple in Betracht ziehen, z. B. die [LLDB-Befehlsstrukturreferenz][lldb-command-structure] oder die Einführung in [Verwenden von LLDB als eigenständigedebugger][lldb-standalone].

Sie können sich auch llDbs fantastisches [Handbuch und Tutorial][lldb-tutorial]ansehen, das komplexere Debugging-Szenarien erklären wird.

[lldb-command-structure]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2
[lldb-standalone]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html
[lldb-tutorial]: https://lldb.llvm.org/tutorial.html
