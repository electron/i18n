# Entorno del desarrollador

El desarrollo Electron es esencialmente un desarrollo Node.js. Para convertir su sistema operativo en un entorno capaz de construir aplicaciones para escritorio con Electron, simplemente necesita Node.js, nopm, un editor de códigos de su elección, y un entendimiento rudimentario de su cliente de linea de comando del sistema operativo.

## Configurar macOS

> Electron es compatible con macOS 10.10 (Yosemite) y posteriores. Apple no permite la ejecución de macOS en máquinas virtuales a menos que la máquina anfitrión sea un ordenador Apple, así que si necesita un Mac, considere el uso de un servicio de alquiler de acceso a Macs (como [MacInCloud](https://www.macincloud.com/) o [xcloud](https://xcloud.me)).

Lo primero, instale una versión reciente de Node.js. Recomendamos que instale bien la `LTS` más actual, bien la `Current` versión disponible. Visite [ la página de descargas de Node.js](https://nodejs.org/en/download/) y seleccione el `instalador para macOS`. Aunque Homebrew es una opción, no la recomendamos - muchas herramientas son incompatibles con la manera en la que Homebrew instala Node.js.

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

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Lo primero, instale una versión reciente de Node.js. Recomendamos que instale bien la `LTS` más actual, bien la `Current` versión disponible. Visite [la página de descarga de Node.js](https://nodejs.org/en/download/) y seleccione `Windows Installer`. Una vez descargado, ejecutar el instalador y dejar que el asistente de instalación le guíe durante el proceso.

En la pantalla que le permite configurar la instalación, asegúrese de seleccionar las opciones `Node.js runtime`, `npm package manager`, y `Add to PATH`.

Una vez instalado, confirme que todo funciona como se esperaba. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
#Este comando debería imprimir la versión de Node.js
node -v

# Este comando debería imprimir la versión de npm 
npm -v
```

Si ambos comandos imprimieron un número de versión, ¡Ya está todo listo! Antes de empezar, es posible que desee instalar un [editor de código](#a-good-editor) adecuado para el desarrollo de JavaScript.

## Configurar Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Lo primero, instale una versión reciente de Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
#Este comando debería imprimir la versión de Node.js
node -v

# Este comando debería imprimir la versión de npm 
npm -v
```

Si ambos comandos imprimieron un número de versión, ¡Ya está todo listo! Antes de empezar, es posible que desee instalar un [editor de código](#a-good-editor) adecuado para el desarrollo de JavaScript.

## Un buen editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Ambos poseen un excelente soporte de Javascript.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.