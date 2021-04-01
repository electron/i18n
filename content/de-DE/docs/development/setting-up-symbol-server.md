# Einrichtung eines Symbol Servers im Debugger

Debug-Symbole ermöglichen es Ihnen, bessere Debugging-Sitzungen zu haben. Sie enthalten Informationen über die Funktionen in Anwendungen und Bibliotheken und ermöglichen es ihnen saubere Call-Stacks zu erhalten. Ein Symbolserver erlaubt es dem Debugger die richtigen Symbole, Binärdateien und Quellcode automatisch zu laden, ohne den Nutzer zum Herunterladen großer Debuggingdateien zu zwingen. Der Server funktioniert wie [Symbolserver von Microsoft](https://support.microsoft.com/kb/311503) , so dass die Dokumentation dort nützlich sein kann.

Da veröffentlichte Electron-Builds stark optimiert sind, ist das Debuggen nicht immer einfach. Der Debugger kann Ihnen nicht den Inhalt aller Variablen anzeigen, und der Ausführungspfad kann aufgrund von Inlining, Tail Aufrufen und anderen Compileroptimierungen seltsam erscheinen. Die einzige Problemumgehung besteht darin, einen nicht optimierten lokalen Build zu erstellen.

Die offizielle Symbolserver-URL für Electron ist https://symbols.electronjs.org. Sie können diese URL nicht direkt besuchen, Sie müssen sie dem Symbolpfad Ihres Debugging-Tools hinzufügen. In den folgenden Beispielen wird ein lokales Cacheverzeichnis verwendet, um zu vermeiden, dass wiederholt die PDB vom Server abruft. Ersetzen Sie `c:\code\symbols` durch ein entsprechendeCacheverzeichnis auf Ihrem Computer.

## Verwenden des Symbolservers in Windbg

Der Windbg-Symbolpfad ist mit einem Zeichenfolgenwert konfiguriert, der durch Sternchen Zeichen begrenzt ist. Um nur den Electron-Symbolserver zu verwenden, fügen Sie den folgenden Eintrag zum Symbolpfad hinzu (**Hinweis:** Sie `c:\code\symbols` durch ein beliebiges beschreibbares -Verzeichnis auf Ihrem Computer ersetzen können, wenn Sie einen anderen Speicherort für heruntergeladene Symbole bevorzugen):

```powershell
SRV*c:-Code-Symbole*https://symbols.electronjs.org
```

Legen Sie diese Zeichenfolge als `_NT_SYMBOL_PATH` in der Umgebung fest, indem Sie die Windbg-Menüs verwenden, oder indem Sie den Befehl `.sympath` eingeben. Wenn Sie auch Symbole von Symbolserver von Microsoft erhalten möchten, sollten Sie dies zuerst auflisten:

```powershell
SRV*c:-Code-Symbole*https://msdl.microsoft.com/download/symbols; SRV*c:-Code-Symbole*https://symbols.electronjs.org
```

## Verwenden des Symbolservers in Visual Studio

![Werkzeuge -> Optionen](https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg) ![Symboleinstellungen](https://mdn.mozillademos.org/files/2497/2005_options.gif)

## Fehlerbehebung: Symbole werden nicht geladen

Geben Sie die folgenden Befehle in Windbg ein, um zu drucken, warum Symbole nicht geladen werden:

```powershell
> !sym laut
> .reload /f elektron.exe
```
