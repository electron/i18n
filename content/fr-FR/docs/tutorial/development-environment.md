# Environnement de développement

Le développement avec Electron est essentiellement du développement Node.js. Pour faire de votre système d'exploitation un environnement capable de construire des applications desktop avec Electron, vous aurez uniquement besoin de Node.js, npm, un éditeur de code de votre choix, et une compréhension rudimentaire du terminal (ligne de commande) de votre système d'exploitation.

## Mise en place sur macOS

> Electron supporte macOS 10.10 (Yosemite) et plus. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

First, install a recent version of Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `macOS Installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# Cette commande devrait afficher la version de Node.js
node -v

1 Cette commande devrait afficher la version de npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Mise en place sur Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

First, install a recent version of Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Once downloaded, execute the installer and let the installation wizard guide you through the installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Cette commande devrait afficher la version de Node.js
node -v

1 Cette commande devrait afficher la version de npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Mise en place sur Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

First, install a recent version of Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# Cette commande devrait afficher la version de Node.js
node -v

1 Cette commande devrait afficher la version de npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Un bon éditeur

Nous pourrions suggérer deux éditeurs populaires gratuits construits avec Electron : [Atom](https://atom.io/) de GitHub et [Visual Studio Code](https://code.visualstudio.com/) de Microsoft. Les deux ont un excellent support JavaScript.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.