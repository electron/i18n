# Glossar

Diese Seite enthält Begriffe, die während der Entwicklung von Electron häufig verwendet werden.

### ASAR

ASAR steht für Atom-Shell-Archiv-Format. Ein [asar][]-Archiv ist ein simples, `tar`-ähnliches Format, das die Dateien in einer einzelnen Datei zusammenführt. Electron kann willkürliche Dateien aus dem Archiv lesen ohne diese zu entpacken.

The ASAR format was created primarily to improve performance on Windows when reading large quantities of small files (e.g. when loading your app's JavaScript dependency tree from `node_modules`).

### code signing

Code signing is a process where an app developer digitally signs their code to ensure that it hasn't been tampered with after packaging. Both Windows and macOS implement their own version of code signing. As a desktop app developer, it's important that you sign your code if you plan on distributing it to the general public.

For more information, read the [Code Signing][] tutorial.

### context isolation

Context isolation is a security measure in Electron that ensures that your preload script cannot leak privileged Electron or Node.js APIs to the web contents in your renderer process. With context isolation enabled, the only way to expose APIs from your preload script is through the `contextBridge` API.

For more information, read the [Context Isolation][] tutorial.

See also: [preload script](#preload-script), [renderer process](#renderer-process)

### CRT

The C Runtime Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. Die Visual C++ Bibliotheken, welche die CRT implementieren, unterstützen native Codeentwicklung sowie gemischt nativen und verwalteten Code als auch reiner verwalteter Code für .NET-Entwicklung.

### DMG

"Apple Disk Image" ist ein Paket-Format von macOS. DMG-Dateien werden oft zur Distribution von Installern verwendet.

### IME

Input Method Editor. Ein Programm, dass dem Benutzer die Eingabe von Buchstaben und Zeichen, welche nicht auf der Tastatur vertreten sind, erlaubt. Zum Beispiel können Benutzer einer lateinischen Tastatur chinesische, japanische, koreanische und indische Zeichen einzugeben.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.

siehe auch: [main process](#main-process), [renderer process](#renderer-process)

### Main-Prozess

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. Er steurert auch Native Elemente wie Menu, Menu Bar, Dock, Tray, usw. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Die Datei für den Hauptprozess jeder App ist in der `main` Eigenschaft in `package.json` angegeben. This is how `electron .` knows what file to execute at startup.

In Chromium wird dieser Prozess als "Browser-Prozess" bezeichnet. In Electron wird er umbenannt, um Verwechslung mit Renderer-Prozessen zu vermeiden.

Siehe auch: [process](#process), [renderer process](#renderer-process)

### MAS

Abkürzung für Apple's Mac App Store. Für Infromationen zum Einreichen deiner App zum MAS siehe [Anleitung: Mac App Store Veröffentlichung][].

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

Siehe https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

See also: [IPC](#ipc)

### MSI

On Windows, MSI packages are used by the Windows Installer (also known as Microsoft Installer) service to install and configure applications.

More information can be found in [Microsoft's documentation][msi].

### systemeigene Module

Native Module, in Node.js auch [addons][] genannt, sind Module, welche in C oder C++ geschrieben werden und genau wie normale mithilfe der require() Funktion geladen werden können. Sie werden in erster Linie dazu eingesetzt, um eine Schnittstelle zwischen JavaScript in Node.js und C/C++-Bibliotheken zur Verfügung zu stellen.

Native Node-Module werden von Electron unterstützt, aber da Electron sehr es wahrscheinlich eine andere V8-Version als die von der auf ihrem System verwendete Node.js Version verwendet, musst du den Ort der Electron-Header beim Bauen von nativen Modulen manuell angeben.

For more information, read the [Native Node Modules] tutorial.

### notarization

Notarization is a macOS-specific process where a developer can send a code-signed app to Apple servers to get verified for malicious components through an automated service.

See also: [code signing](#code-signing)

### OSR

OSR (offscreen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

For more information, read the [Offscreen Rendering][][osr] tutorial.

### preload script

Preload scripts contain code that executes in a renderer process before its web contents begin loading. These scripts run within the renderer context, but are granted more privileges by having access to Node.js APIs.

See also: [renderer process](#renderer-process), [context isolation](#context-isolation)

### process

Ein Prozess ist eine Instanz eines Computerprogramms, welches ausgeführt wird. Electron Anwendungen, welche einen [main][]- und einen oder mehrere [renderer][]-Prozesse verwenden, bestehen eigentlich aus mehreren parallel laufenden Programmen.

In Node.js und Electron hat jeder laufende Prozess ein `process`-Objekt. Dieses globale Objekt stellt Informationen und Steuerungsmöglichkeiten über den aktuellen Prozess bereit. Als globales Objekt ist es immer verfügbar für Anwendungen, welche nicht require() benutzen.

Siehe auch: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Siehe auch: [process](#process), [main process](#main-process)

### sandbox

The sandbox is a security feature inherited from Chromium that restricts your renderer processes to a limited set of permissions.

For more information, read the [Process Sandboxing][] tutorial.

See also: [process](#process)

### Squirrel

Squirrel ist ein Open-Source Framework, welches Electron Apps ermöglicht sich automatisch zu aktualisieren, wenn neue Versionen veröffentlicht werden. Siehe dir die [autoUpdater][] API an für mehr Informationen wie du mit Squirrel startest.

### userland

Der Begriff hat seinen Ursprung in der Unix Community, wo "userland" oder "userspace" für Programme steht, die außerhalb des Kernels des Betriebssystems agieren. Seit einiger Zeit wird der Begriff auch in der Node und npm Community verwendet, um zwischen Features, die im "Node core" verfügbar sind, und Paketen, die in der npm registry veröffentlicht wurden, zu unterscheiden.

Wie Node fokussiert sich auch Electron darauf, eine relativ einfache API mit allen nötigen primitiven Werkzeugen, die es braucht, um Multi-Plattform Desktop-Anwendungen zu entwickeln, bereitzustellen. Diese Design-Philosophie ermöglicht es Electron, ein flexibles Werkzeug zu sein, ohne zu stark in der Art, wie es benutzt werden kann, einzuschränken. Userland erlaubt Nutzern das Erstellen und Teilen von Tools, die weitere, komplexere Funktionalität bereitstellt, zusätzlich zu denen, die im "Core" existieren.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron baut V8 als Teil von Chromium und weist dann Node beim Bauen darauf hin.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[Code Signing]: tutorial/code-signing.md
[Context Isolation]: tutorial/context-isolation.md
[Anleitung: Mac App Store Veröffentlichung]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[msi]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[Offscreen Rendering]: tutorial/offscreen-rendering.md
[Process Sandboxing]: tutorial/sandbox.md
[renderer]: #renderer-process
