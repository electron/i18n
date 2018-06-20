# Entorno del desarrollador

El desarrollo Electron es esencialmente un desarrollo Node.js. Para convertir su sistema operativo en un entorno capaz de construir aplicaciones para escritorio con Electron, simplemente necesita Node.js, nopm, un editor de códigos de su elección, y un entendimiento rudimentario de su cliente de linea de comando del sistema operativo.

## Configurar macOS

> Electron es compatible con Mac Os X 10.9(and all versions named macOS) y más. Apple no permite la ejecución de macOS en máquinas virtuales a menos que la máquina anfitrión sea un ordenador Apple, así que si necesita un Mac, considere el uso de un servicio de alquiler de acceso a Macs (como [MacInCloud](https://www.macincloud.com/) o [xcloud](https://xcloud.me)).

Lo primero, instale una versión reciente de Node.js. Recomendamos que instale bien la `LTS` más actual, bien la `Current` versión disponible. Visite [ la página de descargas de Node.js](https://nodejs.org/en/download/) y seleccione el `instalador para macOS`. Aunque Homebrew es una opción, no la recomendamos - muchas herramientas son incompatibles con la manera en la que Homebrew instala Node.js.

Una vez descargado, ejecutar el instalador y dejar que el asistente de instalación le guíe durante el proceso.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Configurar Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Lo primero, instale una versión reciente de Node.js. Recomendamos que instale bien la `LTS` más actual, bien la `Current` versión disponible. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Una vez descargado, ejecutar el instalador y dejar que el asistente de instalación le guíe durante el proceso.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Configurar Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Lo primero, instale una versión reciente de Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.