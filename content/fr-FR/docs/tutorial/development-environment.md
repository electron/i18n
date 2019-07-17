# Environnement de développement

Le développement avec Electron est essentiellement du développement Node.js. Pour faire de votre système d'exploitation un environnement capable de construire des applications desktop avec Electron, vous aurez uniquement besoin de Node.js, npm, un éditeur de code de votre choix, et une compréhension rudimentaire du terminal (ligne de commande) de votre système d'exploitation.

## Mise en place sur macOS

> Electron supporte macOS 10.10 (Yosemite) et plus. Apple ne permet pas d'exécuter macOS dans des machines virtuelles à moins que l'ordinateur hôte soit déjà un ordinateur Apple, donc si vous avez besoin d'un Mac, pensez à utiliser un service cloud qui loue l'accès à des Macs (comme [MacInCloud](https://www.macincloud.com/) ou [xcloud](https://xcloud.me)).

Premièrement, installez une version récente de Node.js. Nous vous recommandons d'installer soit la dernière version `LTS` ou `Current` disponible. Visitez [la page de téléchargément de Node.js](https://nodejs.org/en/download/) et sélectionnez `macOS Installer`. Bien que Homebrew soit une option offerte, nous vous le déconseillons toutefois - de nombreux outils seront incompatibles avec la manière dont Homebrew installe Node.js.

Une fois téléchargé, exécutez l'installateur et laissez le guide d'installation vous guider à travers l'installation.

Une fois installé, confirmez que tout fonctionne comme prévu. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# Cette commande devrait afficher la version de Node.js
node -v

1 Cette commande devrait afficher la version de npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Mise en place sur Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Premièrement, installez une version récente de Node.js. Nous vous recommandons d'installer soit la dernière version `LTS` ou `Current` disponible. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Une fois téléchargé, exécutez l'installateur et laissez le guide d'installation vous guider à travers l'installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Une fois installé, confirmez que tout fonctionne comme prévu. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Cette commande devrait afficher la version de Node.js
node -v

1 Cette commande devrait afficher la version de npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Mise en place sur Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Premièrement, installez une version récente de Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

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