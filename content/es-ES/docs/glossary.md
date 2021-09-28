# Glosario

Esta página define algunos términos que comúnmente se utilizan en el desarrollo de Electron.

### ASAR

ASAR significa formato de archivo de Shell de Atom. Un archivo de [asar][] es un simple formato tipo `tar` que concatena archivos en un solo archivo. Electron puede leer archivos arbitrarios de él sin desempacar el archivo entero.

El formato ASAR fue creado principalmente para mejorar el rendimiento en Windows cuando se cargan grandes cantidades de archivos pequeños (p.e. al cargar el árbol de dependencia JavaScript de tu aplicación desde `node_modules`).

### firma de código

La firma de código es un proceso donde un desarrollador de aplicación firma digitalmente su código para asegurarse que el código no haya sido manipulado después del empaquetado. Tanto Windows y macOS implementan su propia versión de la firma de código. Como desarrollar de aplicaciones de escritorio, es importante que firmes tu código si planeas distribuirlo al publico en general.

Para más información, consulta el tutorial [Code Signing][].

### context isolation

Context isolation is a security measure in Electron that ensures that your preload script cannot leak privileged Electron or Node.js APIs to the web contents in your renderer process. With context isolation enabled, the only way to expose APIs from your preload script is through the `contextBridge` API.

For more information, read the [Context Isolation][] tutorial.

See also: [preload script](#preload-script), [renderer process](#renderer-process)

### CRT

The C Runtime Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. Las librerías de Visual C++ que implementan el apoyo CRT desarrollo de código nativo, y tanto código mixto nativo y como código administrado, y puro código administrado para el desarrollo .NET.

### DMG

Una imagen de disco de Apple es un formato de empaquetado utilizado por macOS. Los archivos DMG se utilizan comúnmente para la distribución de aplicaciones "instaladores".

### IME

Método de entrada del editor. Un programa que permite a los usuarios introducir caracteres y símbolos no encontrados en su teclado. Por ejemplo, esto permite a los usuarios de teclados de latín introducir caracteres chinos, japoneses, coreanos e indios.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.

véase también: [proceso principal](#main-process), [proceso de renderizado](#renderer-process)

### proceso principal

The main process, commonly a file named `main.js`, is the entry point to every Electron app. Controla la vida de la aplicación, de abierto a cerrado. También maneja elementos nativos como el menú, barra de menú, bandeja, etc. The main process is responsible for creating each new renderer process in the app. La API completa de Node está integrada.

El archivo de proceso principal de cada aplicación se especifica en la propiedad `main` en `package.json`. Así es como `electron` sabe qué archivo ejecutar al inicio.

En Chromium, este proceso se denomina "proceso del navegador". Se renombró en Electron para evitar confusiones con los procesos del renderizador (browser process).

Véase también: [proceso](#process), [proceso de renderizado](#renderer-process)

### MAC

Acrónimo para la App Store de Apple. Para más detalles sobre el envío de su aplicación al MAS, consulte la [Guía de envíos de Mac App Store][].

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

Ver https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

See also: [IPC](#ipc)

### MSI

On Windows, MSI packages are used by the Windows Installer (also known as Microsoft Installer) service to install and configure applications.

More information can be found in [Microsoft's documentation][msi].

### Módulos nativos

Los módulos nativos (también llamados [addons][] en Node.js) son módulos escritos en C o C++ que pueden ser cargados en Node.js o Electron mediante la función require() y utilizarlos como si fueran un módulo ordinario de Node.js. Son usados principalmente para ofrecer una interfaz entre JavaScript corriendo en Node.js y las librerías C/C++.

Nativo nodo módulos están soportados por el Electron, pero puesto que el Electron es muy probable que utilice una versión V8 del nodo binario instalada en su sistema, usted tiene que especificar manualmente la ubicación de cabeceras del Electron al compilar los módulos nativos.

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

Un proceso es una instancia en un programa de computadora que está siendo ejecutado. Aplicaciones de Electron que hacen usan de la [main][] y uno o muchos procesos [renderer][] están ejecutando varios programas simultáneamente.

En Node.js y Electron, cada proceso en ejecución tiene un objeto de `process`. Este objeto es un global que proporciona información sobre, y control sobre, el proceso actual. Como un global, siempre está disponible para aplicaciones sin utilizar require().

Véase también: [proceso principal](#main-process), [proceso de renderizado](#renderer-process)

### proceso de renderizado

El renderer process es una ventana de navegador en tu aplicación. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Véase también: [proceso](#process), [proceso principal](#main-process)

### sandbox

The sandbox is a security feature inherited from Chromium that restricts your renderer processes to a limited set of permissions.

For more information, read the [Process Sandboxing][] tutorial.

See also: [process](#process)

### Squirrel

Squirrel es un marco de código abierto que permite a aplicaciones de Electron actualizar automáticamente como se liberan nuevas versiones. Ver el [autoUpdater][] API para información sobre cómo empezar con Squirrel.

### entorno

Este término que se originó en la comunidad Unix, donde "userland" o "userspace" se refiere a programas que se ejecutan afuera del kernel del sistema operativo. Más recientemente, el término se ha popularizado en la comunidad Node y npm para distinguir entre las características disponibles en el "núcleo Node" versus los paqutes publicados por el registro npm por la comunidad de "usuarios" mucho más grande.

Como Node, Electron se centra en tener un pequeño conjunto de APIs que proporcionan a todas las primitivas necesarias para el desarrollo de aplicaciones de escritorio multiplataformas. Esta filosofía de diseño permite Electron a seguir siendo una herramienta flexible sin ser excesivamente prescriptivas sobre cómo deben utilizarse. Userland permite a los usuarios crear y compartir herramientas que proporcionen funcionalidad adicional además de lo que está disponible en el "núcleo".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electrón forma V8 como parte de Chromium y luego apunta el Nodo ese V8 cuando lo está formando.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. No tiene los mismos permisos que su página web y todas las interacciones entre tu aplicación y el contenido incluido serán asincrónicas. Esto mantiene a tu aplicación protegida de contenido incluido.

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[Code Signing]: tutorial/code-signing.md
[Context Isolation]: tutorial/context-isolation.md
[Guía de envíos de Mac App Store]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[msi]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[Offscreen Rendering]: tutorial/offscreen-rendering.md
[Process Sandboxing]: tutorial/sandbox.md
[renderer]: #renderer-process
