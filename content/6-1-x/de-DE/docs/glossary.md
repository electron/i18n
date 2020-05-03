# Glossar

Diese Seite enthält Begriffe, die während der Entwicklung von Electron häufig verwendet werden.

### ASAR

ASAR steht für Atom-Shell-Archiv-Format. Ein [asar](https://github.com/electron/asar)-Archiv ist ein simples, `tar`-ähnliches Format, das die Dateien in einer einzelnen Datei zusammenführt. Electron kann willkürliche Dateien aus dem Archiv lesen ohne diese zu entpacken.

Das ASAR-Format wurde primär für bessere Performance unter Windows entwickelt... TODO

### CRT

Die C Runtime Library (CRT) ist Teil der C++ Standard Library, welche die ISO C66 Standard Library beinhaltet. Die Visual C++ Bibliotheken, welche die CRT implementieren, unterstützen native Codeentwicklung sowie gemischt nativen und verwalteten Code als auch reiner verwalteter Code für .NET-Entwicklung.

### DMG

"Apple Disk Image" ist ein Paket-Format von macOS. DMG-Dateien werden oft zur Distribution von Installern verwendet. [electron-builder](https://github.com/electron-userland/electron-builder) unterstützt `dmg` als Build-Ziel.

### IME

Input Method Editor. Ein Programm, dass dem Benutzer die Eingabe von Buchstaben und Zeichen, welche nicht auf der Tastatur vertreten sind, erlaubt. Zum Beispiel können Benutzer einer lateinischen Tastatur chinesische, japanische, koreanische und indische Zeichen einzugeben.

### IDL

Interface description language. Schreiben Sie Funktionssignaturen und Datentypen in einem Format, mit dem Schnittstellen in Java, C++, JavaScript usw. generiert werden können.

### IPC

IPC steht für Inter-Process Communication. Electron verwendet IPC-serialisierte JSON Nachrichten zwischen den [Haupt-](#main-process) und [Renderer](#renderer-process) Prozessen.

### libchromiumcontent

Eine gemeinsame Bibliothek, die das [Chromium Content Modul](https://www.chromium.org/developers/content-module) und alle seine Abhängigkeiten (z.B. Blink, [V8](#v8), etc.) enthält. Auch als "libcc" bezeichnet.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

Der Main-Prozess, gewöhnlich in einer Datei namens `main.js`, ist der Einstiegspunkt für jede Electron-App. Es steuert die App, vom Öffnen bis zum Schließen. Er steurert auch Native Elemente wie Menu, Menu Bar, Dock, Tray, usw. Der Hauptprozess ist für die Erstellung jedes neuen Renderer-Prozesses in der App verantwortlich. Die vollständige Node-API ist eingebaut.

Die Datei für den Hauptprozess jeder App ist in der `main` Eigenschaft in `package.json` angegeben. This is how `electron .` knows what file to execute at startup.

In Chromium wird dieser Prozess als "Browser-Prozess" bezeichnet. In Electron wird er umbenannt, um Verwechslung mit Renderer-Prozessen zu vermeiden.

Siehe auch: [process](#process), [renderer process](#renderer-process)

### MAS

Abkürzung für Apple's Mac App Store. Für Infromationen zum Einreichen deiner App zum MAS siehe [Anleitung: Mac App Store Veröffentlichung](tutorial/mac-app-store-submission-guide.md).

### Mojo

Ein IPC-System zur Kommunikation innerhalb und zwischen Prozessen. Das ist wichtig, da Chrome seine Arbeit in verschiedene Prozesse teilen möchte, oder auch nicht, abhängig von der RAM-Nutzung, usw.

Siehe https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### systemeigene Module

Native Module, in Node.js auch [addons](https://nodejs.org/api/addons.html) genannt, sind Module, welche in C oder C++ geschrieben werden und genau wie normale mithilfe der require() Funktion geladen werden können. Sie werden in erster Linie dazu eingesetzt, um eine Schnittstelle zwischen JavaScript in Node.js und C/C++-Bibliotheken zur Verfügung zu stellen.

Native Node-Module werden von Electron unterstützt, aber da Electron sehr es wahrscheinlich eine andere V8-Version als die von der auf ihrem System verwendete Node.js Version verwendet, musst du den Ort der Electron-Header beim Bauen von nativen Modulen manuell angeben.

Siehe auch: [Nutzen von Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

"Nullsoft Scriptable Install System" ist ein Werkzeug zur Erstellung von Installern auf Microsoft Windows. Es ist verfügbar unter einer Kombination freier Software-Lizenzen und eine vielgenutzte Alternative zu kommerziellen Produkten wie InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) unterstützt NSIS als Build-Ziel.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

Ein Prozess ist eine Instanz eines Computerprogramms, welches ausgeführt wird. Electron Anwendungen, welche einen [main](#main-process)- und einen oder mehrere [renderer](#renderer-process)-Prozesse verwenden, bestehen eigentlich aus mehreren parallel laufenden Programmen.

In Node.js und Electron hat jeder laufende Prozess ein `process`-Objekt. Dieses globale Objekt stellt Informationen und Steuerungsmöglichkeiten über den aktuellen Prozess bereit. Als globales Objekt ist es immer verfügbar für Anwendungen, welche nicht require() benutzen.

Siehe auch: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In regulären Browsern laufen Webseiten normalerweise in einer isolierten Umgebung und haben daher keinen Zugriff auf native Ressourcen. Als Nutzer von Electron haben Sie die Option Node.js-APIs in den Webseiten zu nutzen. Damit werden Interaktionen auf Betriebssystemebene möglich.

Siehe auch: [process](#process), [main process](#main-process)

### Squirrel

Squirrel ist ein Open-Source Framework, welches Electron Apps ermöglicht sich automatisch zu aktualisieren, wenn neue Versionen veröffentlicht werden. Siehe dir die [autoUpdater](api/auto-updater.md) API an für mehr Informationen wie du mit Squirrel startest.

### userland

Der Begriff hat seinen Ursprung in der Unix Community, wo "userland" oder "userspace" für Programme steht, die außerhalb des Kernels des Betriebssystems agieren. Seit einiger Zeit wird der Begriff auch in der Node und npm Community verwendet, um zwischen Features, die im "Node core" verfügbar sind, und Paketen, die in der npm registry veröffentlicht wurden, zu unterscheiden.

Wie Node fokussiert sich auch Electron darauf, eine relativ einfache API mit allen nötigen primitiven Werkzeugen, die es braucht, um Multi-Plattform Desktop-Anwendungen zu entwickeln, bereitzustellen. Diese Design-Philosophie ermöglicht es Electron, ein flexibles Werkzeug zu sein, ohne zu stark in der Art, wie es benutzt werden kann, einzuschränken. Userland erlaubt Nutzern das Erstellen und Teilen von Tools, die weitere, komplexere Funktionalität bereitstellt, zusätzlich zu denen, die im "Core" existieren.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron baut V8 als Teil von Chromium und weist dann Node beim Bauen darauf hin.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` Tags werden verwendet, um "Gast"-Inhalte, wie zum Beispiel externe Webseiten, in der Electron-Anwendung einzubetten. Sie verhalten sich ähnlich wie `iframe`s, aber unterscheiden sich darin, dass sie jeweils in einem eigenen Prozess laufen. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.
