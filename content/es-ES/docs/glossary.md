# Glosario

Esta página define algunos términos que comúnmente se utilizan en el desarrollo de la Electron.

### ASAR

ASAR significa formato de archivo de Shell de Atom. Un archivo de [asar](https://github.com/electron/asar) es un simple formato de`tar`-como que concatena archivos en un solo archivo. Electrón puede leer archivos arbitrarios de él sin desempacar el archivo entero.

El formato ASAR fue creado principalmente para mejorar el rendimiento en Windows... TODO

### Brightray

[Brightray](https://github.com/electron/brightray) es una biblioteca estática que hace que [libchromiumcontent](#libchromiumcontent) más fácil de usar en aplicaciones. Fue creado específicamente para el Electron, pero puede utilizarse para habilitar a renderer del cromo en aplicaciones nativas que no están basadas en la Electron.

Brightray es una dependencia bajo nivel del Electron que no se refiere a la mayoría de los usuarios de la Electron.

### DMG

Una imagen de disco de Apple es un formato de embalaje utilizado por macOS. Archivos DMG se utilizan comúnmente para la distribución de aplicaciones "instaladores". [electron-builder](https://github.com/electron-userland/electron-builder) soporta `dmg` como objetivo compilar.

### CIP

IPC está parado para la comunicación entre procesos. Electrónica usa IPC para enviar serializado JSON mensajes entre los procesos de [main](#main-process) y [renderer](#renderer-process).

### libchromiumcontent

Una biblioteca única, compartida que incluye el módulo de contenido de cromo y todas sus dependencias (por ejemplo, Blink, [V8](#v8), etcetera).

### proceso principal

El proceso principal, comúnmente un archivo llamado `main.js`, es el punto de entrada a la aplicación de cada Electron. Controla la vida de la aplicación, de abrir a cerrar. También maneja elementos nativos como el menú, barra de menú, muelle, bandeja, etcetera. El proceso principal es responsable de crear cada nuevo proceso de renderizado de la aplicación. Todo el nodo API está construido.

Archivo de proceso principal de cada aplicación se especifica en la propiedad `main` en `package.json`. Esto es cómo `electron .` sabe qué archivo a ejecutar al inicio.

Vea también: [process](#process), [renderer process](#renderer-process)

### MAS

Acrónimo de Mac App Store de Apple. Para obtener más información sobre cómo enviar su aplicación a las MAS, vea la Guide</a> de presentación Mac App Store.</p> 

### módulos nativos

Los módulos nativos (también llamados [addons](https://nodejs.org/api/addons.html) en Node.js) son módulos escritos en C o C++ que puede ser cargado en Node.js o Electron mediante la función include() y utilizado como si fueran un módulo ordinario de Node.js. Se utilizan principalmente para proporcionar una interfaz entre en Node.js y C/C++ bibliotecas JavaScript.

Nativo nodo módulos están soportados por el Electron, pero puesto que el Electron es muy probable que utilice una versión V8 del nodo binario instalada en su sistema, usted tiene que especificar manualmente la ubicación de cabeceras del Electron al compilar los módulos nativos.

Véase también [Using Modules](tutorial/using-native-node-modules.md) nativa de nodo.

## NSIS

Nullsoft Scriptable Install System es un instalador basada en secuencias de comandos de herramienta de edición para Microsoft Windows. Está liberado bajo una combinación de licencias de software libre y es una alternativa ampliamente utilizado a productos comerciales como InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) soporta NSIS como objetivo compilar.

### proceso

Un proceso es una instancia de un programa informático que está siendo ejecutado. Aplicaciones de Electron que hacen usan de la [main](#main-process) y uno o muchos procesos [renderer](#renderer-process) están ejecutando varios programas simultáneamente.

En Node.js y Electron, cada proceso en ejecución tiene un objeto de `process`. Este objeto es un global que proporciona información sobre y control sobre, el proceso actual. Como una global, está siempre disponible para aplicaciones sin utilizar require().

Vea también: [main process](#main-process), [renderer process](#renderer-process)

### proceso de renderizado

El proceso de renderizado es una ventana del navegador en su aplicación. A diferencia del proceso principal, pueden existir varios de estos y cada uno se ejecutan en un proceso separado. También pueden ser ocultadas.

En los navegadores normales, páginas web generalmente se ejecutan en un entorno de espacio aislado y no se permite el acceso a recursos nativos. Los usuarios de la Electron, sin embargo, tienen el poder de utilizar Node.js APIs en las páginas web permitiendo interacciones inferiores de nivel de sistema operativo.

Vea también: [process](#process), [main process](#main-process)

### Ardilla

Ardilla es un marco de código abierto que permite a aplicaciones de Electron actualizar automáticamente como se liberan nuevas versiones. Consulte la API de [autoUpdater](api/auto-updater.md) para información sobre cómo empezar a ardilla.

### entorno de usuario

Este término que se originó en la comunidad Unix, donde "userland" o "userspace" que se refiere a programas que se ejecutan fuera del núcleo del sistema operativo. Más recientemente, el término ha sido popularizado en la comunidad nodo y MNP para distinguir entre las funciones disponibles en el "Nodo central" versus paquetes publicado en el registro de la nueva gestión pública de la comunidad de "el usuario" mucho más grande.

Como nodo, Electron se centra en tener un pequeño conjunto de APIs que proporcionan a todas las primitivas necesarias para el desarrollo de aplicaciones de escritorio multiplataformas. Esta filosofía de diseño permite Electron a seguir siendo una herramienta flexible sin ser excesivamente prescriptivas sobre cómo deben utilizarse. Modo de usuario permite a los usuarios crear y compartir herramientas que proporcionan funcionalidad adicional sobre lo que está disponible en "core".

### V8

V8 es el motor de JavaScript de código abierto de Google. Está escrito en C++ y utiliza en Google Chrome. V8 puede funcionar independiente, o puede ser embebido en cualquier aplicación C++.

### WebView

`webview` etiquetas se utilizan para incrustar contenido de 'guest' (como páginas web externas) en su aplicación Electron. Son similares a `iframe`s, pero se diferencian en que cada vista Web se ejecuta en un proceso separado. No tiene los mismos permisos que su página web y todas las interacciones entre su aplicación y contenido incrustado será asincrónicas. Esto protege a su aplicación de contenido incrustado.