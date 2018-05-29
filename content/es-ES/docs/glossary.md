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

Método de entrada del editor. Un programa que permite a los usuarios introducir caracteres y símbolos no encontrados en su teclado. Por ejemplo, esto permite a los usuarios de teclados de latín introducir caracteres chinos, japoneses, coreanos e indios.

### IDL

Lenguaje de descripción de interfaz. Escribir las firmas de función y los tipos de datos en un formato que puede utilizarse para generar interfaces en Java, C++, JavaScript, etc.

### IPC

IPC significa Comunicación de Inter-Procesos. Electron usa IPC para enviar mensajes JSON serializados entre los procesos [principales](#main-process) y de [renderizado](#renderer-process).

### libchromiumcontent

Una biblioteca compartida que incluye el [módulo de contenido de Chromium](https://www.chromium.org/developers/content-module) y todas sus dependencias (por ejemplo, Blink, [V8](#v8), etc). También se le denomina "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### proceso principal

El proceso principal, comúnmente un archivo llamado `main.js`, es el punto de entrada a la aplicación de cada Electron. Controla la vida de la aplicación, de abrir a cerrar. También maneja elementos nativos como el menú, barra de menú, bandeja, etc. El proceso principal es responsable de crear cada proceso nuevo de renderizado en la aplicación. Todo el nodo API está construido.

Cada archivo de proceso principal de la aplicación está especificada en la propieda `main` en `package.json`. Así es cómo `electron.` sabe qué archivo a ejecutar al inicio.

En Chromium, este proceso se conoce como el "proceso de navegador". Se renombra en Electron para evitar la confusión con el proceso de renderizado.

Véase también: [proceso](#process), [proceso de renderizado](#renderer-process)

### MAC

Acrónimo para la Mac App Store de Apple. Para más detalles sobre cómo subir tu aplicación al MAS, vea la [Guía de Subidas de la Mac App Store](tutorial/mac-app-store-submission-guide.md).

### Mojo

Un sistema IPC para la comunicación intra - o inter-proceso, y eso es importante porque Chrome está muy interesada en poder dividir su trabajo en procesos separados o no, dependiendo de las presiones de memoria, etc.

Ver https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### módulos nativos

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Son usados principalmente para ofrecer una interfaz entre JavaScript corriendo en Node.js y las librerías C/C++.

Nativo nodo módulos están soportados por el Electron, pero puesto que el Electron es muy probable que utilice una versión V8 del nodo binario instalada en su sistema, usted tiene que especificar manualmente la ubicación de cabeceras del Electron al compilar los módulos nativos.

Véase también [Usando Módulos de Nodo Nativos](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System es un instalador basado en secuencias de comandos de herramienta de edición para Microsoft Windows. Fue lanzado bajo una combinación de licencias de software libre y es una alternativa ampliamente usada para productos comerciales como InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) soporta NSIS como objetivo compilar.

### OSR

El OSR (renderizado fuera de la pantalla) se puede utilizar para cargar un fondo de pantalla pesado y mostrarlo luego (será mucho más rápido). Permite renderizar la página sin mostrarla en pantalla.

### process

Un proceso es una instancia en un programa de computadora que está siendo ejecutado. Aplicaciones de Electron que hacen usan de la [main](#main-process) y uno o muchos procesos [renderer](#renderer-process) están ejecutando varios programas simultáneamente.

En Node.js y Electron, cada proceso en ejecución tiene un objeto de `process`. Este objeto es un global que proporciona información sobre, y control sobre, el proceso actual. Como un global, siempre está disponible para aplicaciones sin utilizar require().

Véase también: [proceso principal](#main-process), [proceso de renderizado](#renderer-process)

### proceso de renderizado

El proceso de renderizado es una ventana del navegador en tu aplicación. A diferencia del proceso principal, pueden existir varios de estos y cada uno se ejecutan en un proceso separado. También pueden ser ocultadas.

En los navegadores normales, las páginas web generalmente se ejecutan en espacio aislado y no se les permite el acceso a recursos nativos. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

Véase también: [proceso](#process), [proceso principal](#main-process)

### Squirrel

Ardilla es un marco de código abierto que permite a aplicaciones de Electron actualizar automáticamente como se liberan nuevas versiones. Ver el [autoUpdater](api/auto-updater.md) API para información sobre cómo empezar con Squirrel.

### entorno

Este término que se originó en la comunidad Unix, donde "userland" o "userspace" se refiere a programas que se ejecutan afuera del kernel del sistema operativo. Más recientemente, el término se ha popularizado en la comunidad Node y npm para distinguir entre las características disponibles en el "núcleo Node" versus los paqutes publicados por el registro npm por la comunidad de "usuarios" mucho más grande.

Como nodo, Electron se centra en tener un pequeño conjunto de APIs que proporcionan a todas las primitivas necesarias para el desarrollo de aplicaciones de escritorio multiplataformas. Esta filosofía de diseño permite Electron a seguir siendo una herramienta flexible sin ser excesivamente prescriptivas sobre cómo deben utilizarse. Userland permite a los usuarios crear y compartir herramientas que proporcionen funcionalidad adicional además de lo que está disponible en el "núcleo".

### V8

V8 es el motor de JavaScript de código abierto de Google. Está escrito en C++ y es usado en Google Chrome. V8 puede funcionar independientemente, o puede ser embebido en cualquier aplicación C++.

Electrón forma V8 como parte de Chromium y luego apunta el Nodo ese V8 cuando lo está formando.

Los números de versión de V8 siempre corresponden a aquellos de Google Chrome. Chrome 59 incluye V8 5.9, Chrome 58 incluye V8 5.8, etcétera.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### vistaweb

`webview` etiquetas se utilizan para incrustar contenido de 'guest' (como páginas web externas) en su aplicación Electron. Son similares a `iframe`s, pero se diferencian en que cada vista Web se ejecuta en un proceso separado. No tiene los mismos permisos que su página web y todas las interacciones entre tu aplicación y el contenido incluido serán asincrónicas. Esto mantiene a tu aplicación protegida de contenido incluido.