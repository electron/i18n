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

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

Siehe auch: [Nutzen von Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

Ein Prozess ist eine Instanz eines Computerprogramms, welches ausgeführt wird. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

Siehe auch: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In regulären Browsern laufen Webseiten normalerweise in einer isolierten Umgebung und haben daher keinen Zugriff auf native Ressourcen. Als Nutzer von Electron haben Sie die Option Node.js-APIs in den Webseiten zu nutzen. Damit werden Interaktionen auf Betriebssystemebene möglich.

Siehe auch: [process](#process), [main process](#main-process)

### Squirrel

Squirrel ist ein Open-Source Framework, welches Electron Apps ermöglicht sich automatisch zu aktualisieren, wenn neue Versionen veröffentlicht werden. Siehe dir die [autoUpdater](api/auto-updater.md) API an für mehr Informationen wie du mit Squirrel startest.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

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