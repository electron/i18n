# Entwicklerumgebung

Electron Entwicklung ist weitestgehend gleich zu Node.js Entwicklung. Um in deinem Betriebssystem eine Umgebung einzurichten, die dazu geeignet ist Desktop Apps mit Electron zu entwickeln, brauchst du eigentlich nur Node.js, npm, einen Code Editor deiner Wahl und ein Grundwissen wie Du den Command Line Client deines Betriebssystems verwendest.

## Einrichtung auf macOS

> Electron supports macOS 10.10 (Yosemite) and up. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

First, install a recent version of Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `macOS Installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# Dieses command gibt die Node.js Version aus
node -v

# Dieses command gibt die npm Version aus
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Einrichtung auf Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

First, install a recent version of Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Once downloaded, execute the installer and let the installation wizard guide you through the installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Dieses command gibt die Node.js Version aus
node -v

# Dieses command gibt die npm Version aus
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Einrichtung auf Linux

> Generell unterstützt Electron Ubuntu ab 12.04, Feudora ab 21 und Debian ab 8.

Installiere zuerst eine aktuelle Version von Node.js. Abhängig von der Linux Distribution können sie die Installationsschritte unterscheiden. Davon ausgehen das Du Software auf dem normalen Weg mit `apt` oder `pacman`, dan lies die offizielle [Node.js Anleitung zur Installation auf Linux](https://nodejs.org/en/download/package-manager/).

Du verwendest Linux, so weißt du wohl schon wie man einen Command Line Client verwendet. Öffne deine bevorzugten Client und überprüfe ob `node` und `npm` global verfügbar sind:

```sh
# Dieses command gibt die Node.js Version aus
node -v

# Dieses command gibt die npm Version aus
npm -v
```

Wenn beide commands eine Versionsnummer ausgeben, dann bist du bereit! Bevor du anfängst solltest du dir noch einen [code editor](#a-good-editor) installieren der sich für JavaScript Entwicklung eignet.

## Ein guter Editor

Wir würden dir zwei freie und beliebte Editoren vorschlagen die beide mit Electron gebaut wurden: GitHub's [Atom](https://atom.io/) und Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Beide haben exzellenten JavaScript Support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.