# Glossario

Questa pagina definisce una terminologia comunemente utilizzata nello sviluppo di Electron.

### ASAR

ASAR è l'acronimo di Atom Shell Archive Format. An [asar](https://github.com/electron/asar) archive is a simple `tar`-like format that concatenates files into a single file. Electron può leggere file arbitrari da esso senza decomprimere l'intero file.

Il formato ASAR è stato creato principalmente per migliorare le prestazioni su Windows... TODO

### Brightray

Brightray [was](https://github.com/electron-archive/brightray) a static library that made [libchromiumcontent](#libchromiumcontent) easier to use in applications. Ora è deprecato ed è stato fuso nel codebase di Electron.

### CRT

The C Run-time Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

An Apple Disk Image is a packaging format used by macOS. I file DMG sono comunemente usati per distribuire gli "installer" dell'applicazione. [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### IME

Input Method Editor. Un programma che consente agli utenti di immettere caratteri e simboli non trovati sulla tastiera. Ad esempio, questo consente agli utenti di tastiere latine di inserire caratteri cinesi, giapponesi, coreani e indiani.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Also referred to as "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### processo principale

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. Il processo principale è responsabile della creazione di ogni nuovo processo di rendering nell'app. L'intera API Node è integrata.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Vedi anche: [processo](#process), [processo di rendering](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### moduli nativi

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Sono usati principalmente per fornire un'interfaccia tra JavaScript in esecuzione in Node.js e librerie C/C++.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

Un processo è un'istanza di un programma che è in fase di esecuzione. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. Questo oggetto è un globale che fornisce informazioni e controlla il processo corrente. As a global, it is always available to applications without using require().

Vedi anche: [processo principale](#main-process), [processo di rendering](#renderer-process)

### processo di rendering

Il processo di rendering è una finestra del browser nella tua app. A differenza del processo principale, possono esserci più di questi e ognuno viene eseguito in un processo separato. Possono anche essere nascosti.

Nei browser normali, le pagine web vengono eseguite in un ambiente circoscritto nel quale non è consentito l'accesso alle risorse native. Gli utenti di Electron, tuttavia, hanno il potere di usare le API di Node.js nelle pagine web consentendo interazioni di sistema operativo di livello inferiore.

Vedi anche: [processo](#process), [processo principale](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Come Node, Electron si concentra sull'avere un piccolo set di API che fornisce tutte le primitive necessarie per lo sviluppo di applicazioni desktop multipiattaforma. Questa filosofia progettuale consente a Electron di rimanere uno strumento flessibile senza essere eccessivamente prescrittivo su come dovrebbe essere usato. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 è l'engine JavaScript open source di Google. È scritto in C++ ed è usato in Google Chrome. V8 può essere eseguito standalone o può essere incorporato in qualsiasi applicazione in C++.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

I numeri delle versioni di V8 corrispondono sempre a quelli di Google Chrome. Chrome 59 include V8 5.9, Chrome 58 include V8 5.8, ecc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.