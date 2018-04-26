# Ambiente Sviluppatore

Lo sviluppo Electron è essenzialmente lo sviluppo Node.js. Per variare il tuo sistema operativo in un ambiente capiente delle app di costruzione desktop con Electron, dovrai meramente necessitare Node.js, npm, un editor di codice a tua scelta ed una conoscenza rudimentale delle linee di comando del client del tuo sistema operativo.

## Configurazione su macOS

> Electron supporta Mac OS X 10.9 (e tutte le versioni nominate macOS) e superiori. Apple Non consente l'esecuzione di macOS in macchine virtuali a meno che il computer ospitante sia già un computer apple, così se ti trovi in bisogno di un Mac, considera di usare un servizio cloud che noleggi accessi ai Mac (come [MacInCloud](https://www.macincloud.com/) o [xcloud](https://xcloud.me)).

Primo, installa una versione recente di Node.js. Ti raccomandiamo do installare almeno l'ultima `LTS` o `Corrente` versione disponibile. Visita la [pagina di download di Node.js](https://nodejs.org/en/download/) e seleziona l'`Installatore macOS`. Mentre Homebrew è un'opzione offerta, ma raccomandiamo di non usarla, degli strumenti saranno incompatibili con il metodo di installazione di Node.js da Homebrew.

Una volta scaricato, esegui l'installatore e permetti di essere guidato per l'installazione.

Una volta installato, conferma che tutto lavori come aspettato. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by simply search for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Setting up Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Primo, installa una versione recente di Node.js. Ti raccomandiamo do installare almeno l'ultima `LTS` o `Corrente` versione disponibile. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Una volta scaricato, esegui l'installatore e permetti di essere guidato per l'installazione.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Una volta installato, conferma che tutto lavori come aspettato. Find the Windows PowerShell by simply opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Setting up Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Primo, installa una versione recente di Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

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