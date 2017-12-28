# Glosario

Esta página define algunos términos que comúnmente se utilizan en el desarrollo de Electron.

### ASAR

ASAR significa formato de archivo de Shell de Atom. Un archivo de [asar](https://github.com/electron/asar) es un simple `tar`-como formato que concatena archivos en un solo archivo. Electron puede leer archivos arbitrarios de él sin desempacar el archivo entero.

El formato ASAR fue creado principalmente para mejorar el rendimiento en Windows... Por hacer

### Brightray

Brightray [fue](https://github.com/electron-archive/brightray) una biblioteca estática que hizo a [libchromiumcontent](#libchromiumcontent) más fácil de usar en aplicaciones. Ahora es obsoleta y se ha fusionado de la base de código de Electron.

### CRT

La Librería C Run-time (CRT) es la parte de la Librería Estándar de C++ que incorpora a la librería estándar de ISO C99. Las librerías de Visual C++ que implementan el apoyo CRT desarrollo de código nativo, y tanto código mixto nativo y como código administrado, y puro código administrado para el desarrollo .NET.

### DMG

Una imagen de disco de Apple es un formato de empaquetado utilizado por macOS. Archivos DMG se utilizan comúnmente para la distribución de aplicaciones "instaladores". [electron-builder](https://github.com/electron-userland/electron-builder) soporta `dmg` como objetivo compilar.

### IME

Método de entrada del editor. A program that allows users to enter characters and symbols not found on their keyboard. For example, this allows users of Latin keyboards to input Chinese, Japanese, Korean and Indic characters.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

Una biblioteca compartida que incluye el [módulo de contenido de Chromium](https://www.chromium.org/developers/content-module) y todas sus dependencias (por ejemplo, Blink, [V8](#v8), etc). También se le denomina "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### proceso principal

El proceso principal, comúnmente un archivo llamado `main.js`, es el punto de entrada a la aplicación de cada Electron. Controla la vida de la aplicación, de abrir a cerrar. También maneja elementos nativos como el menú, barra de menú, bandeja, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Véase también: [proceso](#process), [proceso de renderizado](#renderer-process)

### MAC

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### módulos nativos

Los módulos nativos (también llamados [addons](https://nodejs.org/api/addons.html) en Node.js) son módulos escritos en C o C++ que puede ser cargado en Node.js o Electron mediante la función include() y utilizado como si fueran un módulo ordinario de Node.js. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Nativo nodo módulos están soportados por el Electron, pero puesto que el Electron es muy probable que utilice una versión V8 del nodo binario instalada en su sistema, usted tiene que especificar manualmente la ubicación de cabeceras del Electron al compilar los módulos nativos.

Véase también [Usando Módulos de Nodo Nativos](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) soporta NSIS como objetivo compilar.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### proceso

A process is an instance of a computer program that is being executed. Aplicaciones de Electron que hacen usan de la [main](#main-process) y uno o muchos procesos [renderer](#renderer-process) están ejecutando varios programas simultáneamente.

En Node.js y Electron, cada proceso en ejecución tiene un objeto de `process`. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

Véase también: [proceso principal](#main-process), [proceso de renderizado](#renderer-process)

### proceso de renderizado

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

Véase también: [proceso](#process), [proceso principal](#main-process)

### Squirrel

Squirrel es un marco de código abierto que permite a aplicaciones de Electron actualizar automáticamente como se liberan nuevas versiones. Ver el [autoUpdater](api/auto-updater.md) API para información sobre cómo empezar con Squirrel.

### entorno

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Como nodo, Electron se centra en tener un pequeño conjunto de APIs que proporcionan a todas las primitivas necesarias para el desarrollo de aplicaciones de escritorio multiplataformas. Esta filosofía de diseño permite Electron a seguir siendo una herramienta flexible sin ser excesivamente prescriptivas sobre cómo deben utilizarse. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### vistaweb

`webview` etiquetas se utilizan para incrustar contenido de 'guest' (como páginas web externas) en su aplicación Electron. Son similares a `iframe`s, pero se diferencian en que cada vista Web se ejecuta en un proceso separado. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.