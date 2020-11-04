# Glossary

This page defines some terminology that is commonly used in Electron development.

### ASAR

ASAR stands for Atom Shell Archive Format. An [asar](https://github.com/electron/asar) archive is a simple `tar`-like format that concatenates files into a single file. Electron can read arbitrary files from it without unpacking the whole file.

Formát ASAR byl vytvořen především pro zlepšení výkonu v systému Windows... TODO

### CRT

The C Run-time Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

An Apple Disk Image is a packaging format used by macOS. DMG files are commonly used for distributing application "installers". [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### IME

Input Method Editor. A program that allows users to enter characters and symbols not found on their keyboard. For example, this allows users of Latin keyboards to input Chinese, Japanese, Korean and Indic characters.

### IDL

Jazyk popisu rozhraní. Zapisovat podpisy funkcí a datové typy ve formátu, který lze použít pro generování rozhraní v Javě, C++, JavaScript, atd.

### IPC

IPC značí komunikaci mezi procesy. Electron používá IPC k odesílání serializovaných JSON zpráv mezi [hlavním](#main-process) a [přehrávačem](#renderer-process) procesy.

### libchromiumcontent

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Also referred to as "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### hlavní proces

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Hlavní soubor procesu každé aplikace je zadán v `hlavní` vlastnosti v `package.json`. Takto `elektroron .` ví, jaký soubor se má spustit při spuštění.

V chromu je tento proces označován jako „proces prohlížeče“. It is renamed in Electron to avoid confusion with renderer processes.

See also: [process](#process), [renderer process](#renderer-process)

### MAS

Akronym pro Mac App Store společnosti Apple. Podrobnosti o odeslání aplikace na MAS, naleznete v [Mac App Store Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (vykreslování mimo obrazovku) lze použít pro načtení silné stránky na pozadí a poté ji zobrazit (bude mnohem rychlejší). Umožňuje vykreslit stránku bez zobrazení na obrazovce.

### proces

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### vykreslovací proces

Proces vykreslování je okno prohlížeče ve vaší aplikaci. Na rozdíl od hlavního procesu může existovat více těchto procesů a každý z nich probíhá odděleně. Lze je také skrýt.

V běžných prohlížečích webové stránky obvykle běží v pískovacím prostředí a nemají přístup k původním zdrojům. Uživatelé Electronu však mají sílu používat Node.js API na webových stránkách, které umožňují interakce s operačním systémem na nižší úrovni .

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 je open source JavaScript engine Google. Je napsán v C++ a používá se v Google Chrome. V8 může běžet samostatně, nebo může být vloženo do libovolné aplikace C++.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

Čísla verzí V8 vždy odpovídají číslům Google Chrome. Chrome 59 zahrnuje V8 5.9, Chrome 58 zahrnuje V8 5.8 atd.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.
