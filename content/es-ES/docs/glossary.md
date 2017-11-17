# Glosario

Esta página define algunos términos que comúnmente se utilizan en el desarrollo de Electron.

### ASAR

ASAR significa formato de archivo de Shell de Atom. Un archivo de [asar](https://github.com/electron/asar) es un simple `tar`-como formato que concatena archivos en un solo archivo. Electron puede leer archivos arbitrarios de él sin desempacar el archivo entero.

El formato ASAR fue creado principalmente para mejorar el rendimiento en Windows... Por hacer

### Brightray

Brightray [fue](https://github.com/electron-archive/brightray) una biblioteca estática que hizo [libchromiumcontent](#libchromiumcontent) más fáciles de utilizar en aplicaciones. Es ahora obsoleto y se ha fusionado del Electron codebase.

### CRT

La biblioteca de Run-time C (CRT) es la parte de la biblioteca estándar de C++ que incorpora la biblioteca estándar de ISO C99. Las bibliotecas de Visual C++ que implementan el CRT apoyan desarrollo de código nativo y código mixto nativo y administrado tanto como solo código administrado para el desarrollo. NET.

### DMG

Una imagen de disco de Apple es un formato de empaquetado utilizado por macOS. Archivos DMG se utilizan comúnmente para la distribución de aplicaciones "instaladores". [electron-builder](https://github.com/electron-userland/electron-builder) soporta `dmg` como objetivo de compilación.

### IME

Método de entrada del editor. Un programa que permite a los usuarios introducir caracteres y símbolos no encontrados en su teclado. Por ejemplo, esto permite a los usuarios de teclados latinos a caracteres de chino, Japonés, Coreano e Indio de entrada.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

Una biblioteca compartida que incluye el [módulo de contenido de Chromium](https://www.chromium.org/developers/content-module) y todas sus dependencias (por ejemplo, Blink, [V8](#v8), etc). También se le denomina "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### proceso principal

El proceso principal, comúnmente un archivo llamado `main.js`, es el punto de entrada a la aplicación de cada aplicación Electron. Controla la vida de la aplicación, desde que se abre hasta que se cierra. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

See also: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### native modules

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

## OSR

Off-screen rendering.

### proceso

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

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