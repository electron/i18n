# Debugging in Windows

Wenn Sie Abstürze oder Probleme in Electron auftreten, von denen Sie glauben, dass sie nicht JavaScript-Anwendung, sondern von Electron selbst kann das Debuggen ein wenig schwierig sein, vor allem für Entwickler, die nicht an native/C++ gewöhnt sind Debuggen. Mit Visual Studio, dem gehosteten Symbolserver von Electron, und dem Electron-Quellcode können Sie jedoch das schrittweise Debuggen mit Haltepunkten im Quellcode von Electron aktivieren.

**siehe auch**: Es gibt eine Fülle von Informationen über das Debuggen von Chromium, von denen ein Großteil auch für Electron gilt, auf der Chromium-Entwickler-Website: [Debugging Chromium auf Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Anforderungen

* **Ein Debug-Build von Electron**: Der einfachste Weg ist es in der Regel, es sich selbst zu erstellen, indem sie die Tools und Voraussetzungen verwenden, die in den [Buildanweisungen für Windows](build-instructions-windows.md)aufgeführt sind. Während Sie an Electron anhängen und sie debuggen können, da Sie es direkt herunterladen können, werden Sie feststellen, dass es stark optimiert ist, was das Debuggen wesentlich schwieriger macht: Der Debugger wird Nicht in der Lage sein, Ihnen den Inhalt aller Variablen anzuzeigen, und der Ausführungspfad kann aufgrund von Inlining, -Tail-Aufrufen und anderen Compileroptimierungen seltsam erscheinen.

* **Visual Studio mit C++-Tools**: Die kostenlosen Community-Editionen von Visual Studio 2013 und Visual Studio 2015 funktionieren. Nach der Installation [Visual Studio so konfigurieren, dass der Symbolserver von Electron](setting-up-symbol-server.md)verwendet wird. Visual Studio wird ein besseres Verständnis dessen erlangen, was in Electron geschieht, wodurch es einfacher wird, Variablen in einem für den Menschen lesbaren -Format darzustellen.

* **ProcMon**: Mit dem [kostenlosen SysInternals-Tool][sys-internals] können Sie Prozessparameter, Dateihandles und Registrierungsvorgänge überprüfen.

## Anfügen und Debuggen von Electron

Um eine Debugsitzung zu starten, öffnen Sie PowerShell/CMD und führen Sie Ihr Debug- Build von Electron aus, indem Sie die Anwendung als Parameter öffnen.

```powershell
$ ./out/Testing/Electron.exe ./my-electron-app/
```

### Breakpoints setzen

Öffnen Sie dann Visual Studio. Electron ist nicht mit Visual Studio erstellt und daher keine Projektdatei enthält - Sie können jedoch die Quellcodedateien "As File" öffnen, was bedeutet, dass Visual Studio sie selbst öffnet. Sie können noch Haltepunkte festlegen – Visual Studio ermittelt automatisch, dass der -Quellcode mit dem code übereinstimmt, der im angefügten Prozess ausgeführt wird, und entsprechend zu unterbrechen.

Relevante Codedateien finden Sie in `./shell/`.

### Anfügen

Sie können den Visual Studio-Debugger an einen laufenden Prozess auf einem lokalen oder Remotecomputer anfügen. Nachdem der Prozess ausgeführt wurde, klicken Sie auf Debuggen / An Prozess anfügen (oder drücken Sie `CTRL+ALT+P`), um das Dialogfeld "An Prozess anhängen" zu öffnen. Sie können diese Funktion verwenden, um Apps zu debuggen, die auf einem lokalen oder Remotecomputer ausgeführt werden, mehrere Prozesse gleichzeitig zu debuggen.

Wenn Electron unter einem anderen Benutzerkonto ausgeführt wird, aktivieren Sie das Kontrollkästchen `Show processes from all users` . Beachten Sie, dass je nachdem, wie viele browserWindows-BrowserWindows-Browsers Ihre App geöffnet hat, mehrere Prozesse angezeigt werden. Eine typische Ein-Fenster-App führt dazu, dass Visual Studio Ihnen zwei `Electron.exe` Einträge präsentiert - einen für den Hauptprozess und einen für den Renderer- Prozess. Da die Liste nur Namen enthält, gibt es derzeit keine zuverlässige Möglichkeit herauszufinden, welche welches ist.

### An welchen Prozess sollte ich anhängen?

Code, der innerhalb des Hauptprozesses ausgeführt wird (d. h. Code, der in Ihrer Haupt-JavaScript-Datei gefunden oder schließlich ausgeführt wird), wird innerhalb des Hauptprozesses ausgeführt, während andere Code innerhalb des jeweiligen Renderer-Prozesses ausgeführt werden.

Sie können beim Debuggen an mehrere Programme angefügt werden, aber nur ein Programm im Debugger aktiv ist. Sie können das aktive Programm in der `Debug Location` Symbolleiste oder im `Processes window`festlegen.

## Verwenden von ProcMon zum Beobachten eines Prozesses

Während Visual Studio fantastisch für die Überprüfung bestimmter Codepfade ist, besteht die Stärke von ProcMon darin, alles zu beobachten, was Ihre Anwendung mit dem betriebssystem macht – es erfasst Datei-, Registrierungs-, Netzwerk-, Prozess- und Profilerstellungsdetails Details von Prozessen. Es versucht, **alle** Ereignisse zu protokollieren, die auftreten und kann ziemlich überwältigend sein, aber wenn Sie versuchen zu verstehen, was und wie Ihre Anwendung mit dem Betriebssystem macht, kann es eine wertvolle Ressource sein.

Eine Einführung in die grundlegenden und erweiterten Debugfunktionen von ProcMon finden Sie [dieses Video-Tutorials][procmon-instructions] von Microsoft bereitgestellt.

[sys-internals]: https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx
[procmon-instructions]: https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor
