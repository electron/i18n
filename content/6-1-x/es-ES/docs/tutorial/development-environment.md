# Entorno del desarrollador

El desarrollo en Electron es esencialmente un desarrollo de Node.js. Para convertir su sistema operativo en un entorno capaz de construir aplicaciones para escritorio con Electron, simplemente necesita Node.js, npm, un editor de códigos de su elección, y un entendimiento rudimentario de su cliente de linea de comando del sistema operativo.

## Configurando macOS

> Electron es compatible con macOS 10.10 (Yosemite) y posteriores. Apple no permite la ejecución de macOS en máquinas virtuales a menos que la máquina anfitrión sea un ordenador Apple, así que si necesita un Mac, considere el uso de un servicio de alquiler de acceso a Macs (como [MacInCloud](https://www.macincloud.com/) o [xcloud](https://xcloud.me)).

Lo primero, instale una versión reciente de Node.js. Recomendamos que instale ya sea la versión `LTS` ó la versión `Current` disponible. Visite [ la página de descargas de Node.js](https://nodejs.org/en/download/) y seleccione el `instalador para macOS`. Aunque Homebrew es una opción, no la recomendamos - muchas herramientas son incompatibles con la manera en la que Homebrew instala Node.js.

Una vez descargado, ejecutar el instalador y dejar que el asistente de instalación le guíe durante el proceso.

Una vez instalado, confirme que todo funciona como se espera. Busque el `Terminal` macOS en su carpeta `/Applications/Utilities` (o buscando la palabra `Terminal` en Spotlight). Abra el `Terminal` u otro cliente de línea de comandos de su elección y confirme que tanto el comando `node` como el comando `npm` están disponibles:

```sh
#Este comando debería imprimir la versión de Node.js
node -v

# Este comando debería imprimir la versión de npm 
npm -v
```

Si ambos comandos imprimieron un número de versión, ¡Ya está todo listo! Antes de empezar, es posible que desee instalar un [editor de código](#a-good-editor) adecuado para el desarrollo de JavaScript.

## Configurar Windows

> Electron soporta Windows 7 y versiones posteriores -  intentar desarrollar aplicaciones Electron con versiones anteriores de Windows no va a funcionar. Microsoft provee [imágenes de maquinas virtuales con Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) gratuitas para desarrolladores.

Lo primero, instale una versión reciente de Node.js. Recomendamos que instale ya sea la versión `LTS` ó la versión `Current` disponible. Visite [la página de descarga de Node.js](https://nodejs.org/en/download/) y seleccione `Windows Installer`. Una vez descargado, ejecutar el instalador y dejar que el asistente de instalación le guíe durante el proceso.

En la pantalla que le permite configurar la instalación, asegúrese de seleccionar las opciones `Node.js runtime`, `npm package manager`, y `Add to PATH`.

Una vez instalado, confirme que todo funciona como se esperaba. Encuentre el Windows PowerShell abirendo el Menu Inicio y escribiendo `PowerShell`. Abra el `PowerShell` u otro cliente de linea de comandos de su elección y confirme que `node` y `npm` están disponible:

```powershell
#Este comando debería imprimir la versión de Node.js
node -v

# Este comando debería imprimir la versión de npm 
npm -v
```

Si ambos comandos imprimieron un número de versión, ¡Ya está todo listo! Antes de empezar, es posible que desee instalar un [editor de código](#a-good-editor) adecuado para el desarrollo de JavaScript.

## Configurar Linux

> En términos generales, Electron soporta Ubuntu 12.04, Fedora 21, Debian 8 y superiores.

Lo primero, instale una versión reciente de Node.js. Dependiendo de su distribución Linux, los pasos de instalación pueden ser diferentes. Asumiendo que normalmente instalas software usando un manejador de paquetes como `apt` o `pacman`, use la guía oficial de [Node.js en Linux](https://nodejs.org/en/download/package-manager/).

Está ejecutando Linux, probablemente ya sepa como operar un cliente de línea de comandos. Abra su cliente favorito y confirme que `node` y `npm` están disponible de forma global:

```sh
#Este comando debería imprimir la versión de Node.js
node -v

# Este comando debería imprimir la versión de npm 
npm -v
```

Si ambos comandos imprimieron un número de versión, ¡Ya está todo listo! Antes de empezar, es posible que desee instalar un [editor de código](#a-good-editor) adecuado para el desarrollo de JavaScript.

## Un buen editor

Podemos sugerir dos editores populares gratis construidos en Electron: GitHub [Atom](https://atom.io/) y Microsoft [Visual Studio Code](https://code.visualstudio.com/). Ambos poseen un excelente soporte de Javascript.

SI eres uno de los muchos desarrolladores con una fuerte preferencia, sepa que virtualmente todos los editores de código e IDEs de la actualidad soportan JavaScript.
