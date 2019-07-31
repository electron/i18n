# Glossar

Diese Seite enthält Begriffe, die während der Entwicklung von Electron häufig verwendet werden.

### ASAR

ASAR steht für Atom-Shell-Archiv-Format. Ein [asar](https://github.com/electron/asar)-Archiv ist ein simples, `tar`-ähnliches Format, das die Dateien in einer einzelnen Datei zusammenführt. Electron kann willkürliche Dateien aus dem Archiv lesen ohne diese zu entpacken.

Das ASAR-Format wurde primär für bessere Performence unter Windows entwickelt.... TODO

### CRT

Die C Run-time Library (CRT) ist Teil der C++ Standard Library welche die ISO C66 Standard Library beinhaltet. Die Visual C++ Bibliotheken welche die CRT implementieren unterstützen native Codeentwicklung sowie gemischt nativen und verwalteten Code als auch reiner verwalteter Code für .NET-Entwicklung.

### DMG

Ein Apple Disk Image ist ein Packetformat von macOS. DMG-Dateien werde oft zur Distribution von Installern verwendet. [electron-builder](https://github.com/electron-userland/electron-builder) unterstützt `dmg` als Build-Ziel.

### IME

Input Method Editor. Ein Programm welches dem Benutzer die Eingabe von Buchstaben und Zeichen, welche nicht auf der Tastatur vertreten sind, erlaubt. Zum Beispiel können Benutzer einer lateinischen Tastatur, chinesische, japanische, koreanische und indische Zeichen einzugeben.

### IDL

Sprache der Schnittstellenbeschreibung. Schreiben Sie Funktionssignaturen und Datentypen in einem Format, mit dem Schnittstellen in Java, C++, JavaScript usw. generiert werden können.

### IPC

IPC steht für Inter-Process-Communication. Electron verwendet IPC serialisierte JSON-Nachrichten zwischen den [main](#main-process) und [renderer](#renderer-process) processes.

### libchromiumcontent

Eine gemeinsame Bibliothek, die das [Chromium Content Modul](https://www.chromium.org/developers/content-module) und alle seine Abhängigkeiten (z.B. Blink, [V8](#v8), etc.) enthält. Auch als "libcc" bezeichnet.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### Main-Prozess

Der Main-Prozess, gewöhnlich in einer Datei namens `main.js`, ist der Einstiegspunkt für jede Electron-App. Es steuert die App, vom Öffnen bis zum Schließen. Er steurert auch Native Elemente wie Menu, Menu Bar, Dock, Tray, usw. Der Hauptprozess ist für die Erstellung jedes neuen Renderer-Prozesses in der App verantwortlich. Die vollständige Node-API ist eingebaut.

Die Hauptprozessdatei jeder App ist in der `main`-Eigenschaft in der `package.json` spezifiziert. Nur so weiß `Electron`, welche Datei beim Start ausgeführt werden muss.

In Chromium wird dieser Prozess als "Browser-Prozess" bezeichnet. Er wurde in Electron umbenannt, um Verwechslung mit dem Renderer-Prozess zu vermeiden.

Siehe auch: [process](#process), [renderer process](#renderer-process)

### MAS

Abkürzung für Apples Mac App Store. Für Infromationen zum Einreichen deiner App zum MAS siehe [Anleitung: Mac App Store Veröffentlichung](tutorial/mac-app-store-submission-guide.md).

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

OSR (Off-screen rendering, Verarbeitung außerhalb des Bildschirms) kann verwendet werden, um große Seiten im Hintergrund zu laden, bevor sie sichtbar werden, wodurch die Zeit bis zum vollständigen Laden sich merklich verkürzt.

### process

Ein Prozess ist eine Instanz eines Computerprogramms, welches ausgeführt wird. Electron Anwendungen, welche einen [main](#main-process)- und einen oder mehrere [renderer](#renderer-process)-Prozesse verwenden, bestehen eigentlich aus mehreren parallel laufenden Programmen.

In Node.js und Electron hat jeder laufende Prozess ein `process`-Objekt. Dieses globale Objekt stellt Informationen und Steuerungsmöglichkeiten über den aktuellen Prozess bereit. Als globales Objekt ist es immer verfügbar für Anwendungen, welche nicht require() benutzen.

Siehe auch: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

Der renderer process ist ein Browser-Fenster deiner Anwendungen. Anders als beim main process können mehrere von ihm mehrere existieren, wobei jeder in einem eigenen Prozess läuft. Sie können außerdem versteckt werden.

In regulären Browsern laufen Webseiten normalerweise in einer isolierten Umgebung und haben daher keinen Zugriff auf native Ressourcen. Als Nutzer von Electron haben Sie die Option Node.js-APIs in den Webseiten zu nutzen. Damit werden Interaktionen auf Betriebssystemebene möglich.

Siehe auch: [process](#process), [main process](#main-process)

### Squirrel

Squirrel ist ein Open-Source Framework, welches Electron Apps ermöglicht sich automatisch zu aktualisieren, wenn neue Versionen veröffentlicht werden. Siehe dir die [autoUpdater](api/auto-updater.md) API an für mehr Informationen wie du mit Squirrel startest.

### userland

Der Begriff hat seinen Ursprung in der Unix Community, wo "userland" oder "userspace" für Programme steht, die außerhalb des Kernels des Betriebssystems agieren. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.