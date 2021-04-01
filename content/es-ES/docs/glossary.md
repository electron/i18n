# Glosario

Esta página define algunos términos que comúnmente se utilizan en el desarrollo de Electron.

### ASAR

ASAR significa formato de archivo de Shell de Atom. Un archivo de [asar][asar] es un simple formato tipo `tar` que concatena archivos en un solo archivo. Electron puede leer archivos arbitrarios de él sin desempacar el archivo entero.

El formato ASAR se creó principalmente para mejorar el rendimiento en Windows... TODO

### CRT

La Librería C Run-time (CRT) es la parte de la Librería Estándar de C++ que incorpora a la librería estándar de ISO C99. Las librerías de Visual C++ que implementan el apoyo CRT desarrollo de código nativo, y tanto código mixto nativo y como código administrado, y puro código administrado para el desarrollo .NET.

### DMG

Una imagen de disco de Apple es un formato de empaquetado utilizado por macOS. Los archivos DMG se utilizan comúnmente para la distribución de aplicaciones "instaladores". [electron-builder][] soporta `dmg` como objetivo de compilación.

### IME

Método de entrada del editor. Un programa que permite a los usuarios introducir caracteres y símbolos no encontrados en su teclado. Por ejemplo, esto permite a los usuarios de teclados de latín introducir caracteres chinos, japoneses, coreanos e indios.

### IDL

Idioma de descripción de la interfaz. Escribe firmas de funciones y tipos de datos en un formato que se puede utilizar para generar interfaces en Java, C++, JavaScript, etc.

### IPC

El IPC significa la comunicación entre procesos. Electron utiliza IPC para enviar los mensajes JSON serializados entre los procesos [main][] y [renderer][].

### libchromiumcontent

Una biblioteca compartida que incluye el [módulo de contenido de Chromium][] y todas sus dependencias (por ejemplo, Blink, [V8][], etc). También se le denomina "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### proceso principal

The main process, commonly a file named `main.js`, is the entry point to every Electron app. Controla la vida de la aplicación, de abierto a cerrado. También maneja elementos nativos como el menú, barra de menú, bandeja, etc. The main process is responsible for creating each new renderer process in the app. La API completa de Node está integrada.

El archivo de proceso principal de cada aplicación se especifica en la propiedad `main` en `package.json`. Así es como `electron` sabe qué archivo ejecutar al inicio.

En Chromium, este proceso se denomina "proceso del navegador". Se renombró en Electron para evitar confusiones con los procesos del renderizador (browser process).

Véase también: [proceso](#process), [proceso de renderizado](#renderer-process)

### MAC

Acrónimo para la App Store de Apple. Para más detalles sobre el envío de su aplicación al MAS, consulte la [Guía de envíos de Mac App Store][].

### Mojo

Un sistema IPC para la comunicación intra - o inter-proceso, y eso es importante porque Chrome está muy interesada en poder dividir su trabajo en procesos separados o no, dependiendo de las presiones de memoria, etc.

Ver https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### módulos nativos

Los módulos nativos (también llamados [addons][] en Node.js) son módulos escritos en C o C++ que pueden ser cargados en Node.js o Electron mediante la función require() y utilizarlos como si fueran un módulo ordinario de Node.js. Son usados principalmente para ofrecer una interfaz entre JavaScript corriendo en Node.js y las librerías C/C++.

Nativo nodo módulos están soportados por el Electron, pero puesto que el Electron es muy probable que utilice una versión V8 del nodo binario instalada en su sistema, usted tiene que especificar manualmente la ubicación de cabeceras del Electron al compilar los módulos nativos.

Véase también [Usando Módulos de Nodo Nativos][].

### NSIS

Nullsoft Scriptable Install System es un instalador basado en secuencias de comandos de herramienta de edición para Microsoft Windows. Fue lanzado bajo una combinación de licencias de software libre y es una alternativa ampliamente usada para productos comerciales como InstallShield. [electron-builder][] soporta NSIS como objetivo compilar.

### OSR

OSR (representación fuera de pantalla) puede utilizarse para cargar una página pesada en segundo plano en y luego mostrarla después (será mucho más rápido). Te permite renderizar la página sin mostrarla en pantalla.

### process

Un proceso es una instancia en un programa de computadora que está siendo ejecutado. Aplicaciones de Electron que hacen usan de la [main][] y uno o muchos procesos [renderer][] están ejecutando varios programas simultáneamente.

En Node.js y Electron, cada proceso en ejecución tiene un objeto de `process`. Este objeto es un global que proporciona información sobre, y control sobre, el proceso actual. Como un global, siempre está disponible para aplicaciones sin utilizar require().

Véase también: [proceso principal](#main-process), [proceso de renderizado](#renderer-process)

### proceso de renderizado

El renderer process es una ventana de navegador en tu aplicación. Unlike the main process, there can be multiple of these and each is run in a separate process. También se pueden ocultar.

En los navegadores normales, las páginas web generalmente se ejecutan en espacio aislado y no se les permite el acceso a recursos nativos. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

Véase también: [proceso](#process), [proceso principal](#main-process)

### Squirrel

Ardilla es un marco de código abierto que permite a aplicaciones de Electron actualizar automáticamente como se liberan nuevas versiones. Ver el [autoUpdater][] API para información sobre cómo empezar con Squirrel.

### entorno

Este término que se originó en la comunidad Unix, donde "userland" o "userspace" se refiere a programas que se ejecutan afuera del kernel del sistema operativo. Más recientemente, el término se ha popularizado en la comunidad Node y npm para distinguir entre las características disponibles en el "núcleo Node" versus los paqutes publicados por el registro npm por la comunidad de "usuarios" mucho más grande.

Como nodo, Electron se centra en tener un pequeño conjunto de APIs que proporcionan a todas las primitivas necesarias para el desarrollo de aplicaciones de escritorio multiplataformas. Esta filosofía de diseño permite Electron a seguir siendo una herramienta flexible sin ser excesivamente prescriptivas sobre cómo deben utilizarse. Userland permite a los usuarios crear y compartir herramientas que proporcionen funcionalidad adicional además de lo que está disponible en el "núcleo".

### V8

V8 es el motor JavaScript de código abierto de Google. Está escrito en C++ y se utiliza en Google Chrome. V8 puede ejecutarse autónomamente, o puede ser embebido en cualquier aplicación de C++.

Electrón forma V8 como parte de Chromium y luego apunta el Nodo ese V8 cuando lo está formando.

Los números de versión de V8 siempre corresponden a los de Google Chrome. Chrome 59 incluye V8 5.9, Chrome 58 incluye V8 5.8, etc.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. No tiene los mismos permisos que su página web y todas las interacciones entre tu aplicación y el contenido incluido serán asincrónicas. Esto mantiene a tu aplicación protegida de contenido incluido.

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[módulo de contenido de Chromium]: https://www.chromium.org/developers/content-module
[electron-builder]: https://github.com/electron-userland/electron-builder
[Guía de envíos de Mac App Store]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[renderer]: #renderer-process
[Usando Módulos de Nodo Nativos]: tutorial/using-native-node-modules.md
[V8]: #v8
