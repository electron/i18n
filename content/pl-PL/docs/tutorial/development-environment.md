# Developer Environment

Electron development is essentially Node.js development. To turn your operating system into an environment capable of building desktop apps with Electron, you will merely need Node.js, npm, a code editor of your choice, and a rudimentary understanding of your operating system's command line client.

## Konfigurowanie systemu macOS

> Electron supports OS X Yosemite (version 10.10) and up. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

Najpierw należy zainstalować najnowszą wersję programu Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `macOS Installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Konfigurowanie systemu Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Najpierw należy zainstalować najnowszą wersję programu Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Once downloaded, execute the installer and let the installation wizard guide you through the installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Konfigurowanie systemu Linux

> Ogólnie rzecz biorąc Electron obsługuje Ubuntu 12.04, Fedora 21, Debian 8 i nowsze.

Najpierw należy zainstalować najnowszą wersję programu Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Dobry Edytor

Możemy zasugerować dwa darmowe i popularne edytory zbudowane na Electronie: [Atom](https://atom.io/) od GitHuba i [Visual Studio Code](https://code.visualstudio.com/) od Microsoftu. Oba świetnie obsługują JavaScript.

Jeśli jesteś jednym z wielu doświadczonych programistów wiesz, że praktycznie każdy IDE i edytor tekstu obsługuje dzisiaj JavaScript.