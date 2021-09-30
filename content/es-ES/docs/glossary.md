# Glosario

Esta página define algunos términos que comúnmente se utilizan en el desarrollo de Electron.

### ASAR

ASAR significa formato de archivo de Shell de Atom. Un archivo de [asar][] es un simple formato tipo `tar` que concatena archivos en un solo archivo. Electron puede leer archivos arbitrarios de él sin desempacar el archivo entero.

El formato ASAR fue creado principalmente para mejorar el rendimiento en Windows cuando se cargan grandes cantidades de archivos pequeños (p.e. al cargar el árbol de dependencia JavaScript de tu aplicación desde `node_modules`).

### firma de código

La firma de código es un proceso donde un desarrollador de aplicación firma digitalmente su código para asegurarse que el código no haya sido manipulado después del empaquetado. Tanto Windows y macOS implementan su propia versión de la firma de código. Como desarrollar de aplicaciones de escritorio, es importante que firmes tu código si planeas distribuirlo al publico en general.

Para más información, consulta el tutorial [Code Signing][].

### aislamiento del contexto

El aislamiento de contexto es una medida de seguridad en Electro que asegura que tu script de precarga no pueda filtrar las APIs privilegiadas de Electron o Node.js a los contenidos web en tu renderer process. Con el aislamiento de contexto activado, la única manera de exponer las APIs, desde tu scrip de precarga es a través de la API `contextBridge`.

Para más información, consulta el tutorial [Context Isolation][].

Ver también: [preload script](#preload-script), [renderer process](#renderer-process)

### CRT

La biblioteca de Run-time C (CRT) es la parte de la biblioteca estándar de C++ que incorpora la biblioteca estándar de ISO C99. Las librerías de Visual C++ que implementan el apoyo CRT desarrollo de código nativo, y tanto código mixto nativo y como código administrado, y puro código administrado para el desarrollo .NET.

### DMG

Una imagen de disco de Apple es un formato de empaquetado utilizado por macOS. Los archivos DMG se utilizan comúnmente para la distribución de aplicaciones "instaladores".

### IME

Método de entrada del editor. Un programa que permite a los usuarios introducir caracteres y símbolos no encontrados en su teclado. Por ejemplo, esto permite a los usuarios de teclados de latín introducir caracteres chinos, japoneses, coreanos e indios.

### IDL

Lenguaje de descripción de interfaz. Escribe firmas de funciones y tipos de datos en un formato que se puede utilizar para generar interfaces en Java, C++, JavaScript, etc.

### IPC

IPC se refiere a la comunicación entre procesos. Electron utiliza IPC para enviar mensajes JSON serializados entre el proceso principal y los procesos renderizadores.

véase también: [proceso principal](#main-process), [proceso de renderizado](#renderer-process)

### proceso principal

The main process, commonly a file named `main.js`, is the entry point to every Electron app. Controla la vida de la aplicación, de abierto a cerrado. También maneja elementos nativos como el menú, barra de menú, bandeja, etc. The main process is responsible for creating each new renderer process in the app. La API completa de Node está integrada.

El archivo de proceso principal de cada aplicación se especifica en la propiedad `main` en `package.json`. Así es como `electron` sabe qué archivo ejecutar al inicio.

En Chromium, este proceso se denomina "proceso del navegador". Se renombró en Electron para evitar confusiones con los procesos del renderizador (browser process).

Véase también: [proceso](#process), [proceso de renderizado](#renderer-process)

### MAC

Acrónimo para la App Store de Apple. Para más detalles sobre el envío de su aplicación al MAS, consulte la [Guía de envíos de Mac App Store][].

### Mojo

Un sistema IPC para comunicarse dentro o entre procesos, y eso es importante porque Chrome está interesado en poder dividir su trabajo en procesos separados o no, dependiendo de las presiones de la memoria, etc.

Ver https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

Ver también: [IPC](#ipc)

### MSI

En Windows, los paquetes MSI son usados por el servicio Windows Installer (también conocido como Microsoft Installer) para instalar y configurar aplicaciones.

Puede encontrar más información en [Microsoft's documentation][msi].

### Módulos nativos

Los módulos nativos (también llamados [addons][] en Node.js) son módulos escritos en C o C++ que pueden ser cargados en Node.js o Electron mediante la función require() y utilizarlos como si fueran un módulo ordinario de Node.js. Son usados principalmente para ofrecer una interfaz entre JavaScript corriendo en Node.js y las librerías C/C++.

Nativo nodo módulos están soportados por el Electron, pero puesto que el Electron es muy probable que utilice una versión V8 del nodo binario instalada en su sistema, usted tiene que especificar manualmente la ubicación de cabeceras del Electron al compilar los módulos nativos.

Para más información, lea el tutorial [Native Node Modules].

### notarización

La notarización es un proceso específico de macOS en el que un desarrollador puede enviar una aplicación firmada con código a los servidores de Apple para verificar la presencia de componentes maliciosos a través de un servicio automatizado.

Ver también: [code signing](#code-signing)

### OSR

OSR (representación fuera de pantalla) puede ser usado para cargar una página pesada en segundo plano y luego mostrarla después (será mucho más rápido). It allows you to render page without showing it on screen.

Para más información, lea el tutorial [Offscreen Rendering][][osr].

### script de precarga

Los scripts de precarga contienen el código que se ejecuta en un proceso de renderizado antes de que su contenido web comience a cargar. Estos scripts se ejecutan dentro del contexto del renderizador, pero tienen más privilegios al tener acceso a las APIs de Node.js.

Ver también: [renderer process](#renderer-process), [context isolation](#context-isolation)

### process

Un proceso es una instancia en un programa de computadora que está siendo ejecutado. Aplicaciones de Electron que hacen usan de la [main][] y uno o muchos procesos [renderer][] están ejecutando varios programas simultáneamente.

En Node.js y Electron, cada proceso en ejecución tiene un objeto de `process`. Este objeto es un global que proporciona información sobre, y control sobre, el proceso actual. Como un global, siempre está disponible para aplicaciones sin utilizar require().

Véase también: [proceso principal](#main-process), [proceso de renderizado](#renderer-process)

### proceso de renderizado

El renderer process es una ventana de navegador en tu aplicación. Unlike the main process, there can be multiple of these and each is run in a separate process. También pueden ocultarse.

Véase también: [proceso](#process), [proceso principal](#main-process)

### sandbox

El sandbox es una característica de seguridad heredada de Chromium que restringe tus procesos de rederizados a u conjunto limitado de permisos.

Para más información, lea el tutorial [Process Sandboxing][].

Ver también: [process](#process)

### Squirrel

Squirrel es un marco de código abierto que permite a aplicaciones de Electron actualizar automáticamente como se liberan nuevas versiones. Ver el [autoUpdater][] API para información sobre cómo empezar con Squirrel.

### entorno

Este término que se originó en la comunidad Unix, donde "userland" o "userspace" se refiere a programas que se ejecutan afuera del kernel del sistema operativo. Más recientemente, el término se ha popularizado en la comunidad Node y npm para distinguir entre las características disponibles en el "núcleo Node" versus los paqutes publicados por el registro npm por la comunidad de "usuarios" mucho más grande.

Como Node, Electron se centra en tener un pequeño conjunto de APIs que proporcionan a todas las primitivas necesarias para el desarrollo de aplicaciones de escritorio multiplataformas. Esta filosofía de diseño permite Electron a seguir siendo una herramienta flexible sin ser excesivamente prescriptivas sobre cómo deben utilizarse. Userland permite a los usuarios crear y compartir herramientas que proporcionen funcionalidad adicional además de lo que está disponible en el "núcleo".

### V8

V8 es el motor JavaScript de código abierto de Google. Está escrito en C++ y es usado en Google Chrome. V8 puede ejecutarse de independiente o puede incrustarse en cualquier aplicación de C++.

Electrón forma V8 como parte de Chromium y luego apunta el Nodo ese V8 cuando lo está formando.

Los números de versión V8's siempre se corresponden con los de Google Chrome. Chrome 59 incluye V8 5.9, Chrome 58 incluye V8 5.8, etc.

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
