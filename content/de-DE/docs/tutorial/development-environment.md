# Entwicklerumgebung

Electron Entwicklung ist weitestgehend gleich zu Node.js Entwicklung. Um in deinem Betriebssystem eine Umgebung einzurichten, die dazu geeignet ist Desktop Apps mit Electron zu entwickeln, brauchst du eigentlich nur Node.js, npm, einen Code Editor deiner Wahl und ein Grundwissen wie Du den Command Line Client deines Betriebssystems verwendest.

## Einrichtung auf macOS

> Electron unterstützt macOS 10.10 (Yosemite) und stäter. Apple erlaubt die Verwendung von macOS in Virtuellen Maschienen nicht es seiden der Host Computer selbst ist von Apple. Wenn du also einen Mac braucht, solltest du darüber nachdenken einen Cloud Service zu nutzen (wie [MacInCloud](https://www.macincloud.com/) oder [xcloud](https://xcloud.me)).

Installiere zuerste eine aktuelle Version von Node.js. Wir empfehlen Dir entweder die `LTS` oder die `Current` Version zu installieren. Gehe zur [Node.js Download Seite](https://nodejs.org/en/download/) und wähle den `macOS Installer`. Auch wenn Homebrew eine Möglichkeit wäre, wir raten dennoch davon ab. Viele Tools sind Inkompatibel mit der Art wie Homebrew Node.js installiert.

Wenn der Download fertig ist, führe den Installer aus und folge dem Installationswizard.

Wenn abgeschlossen, dann überprüfe dass alles funktioniert wie gewünscht. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# Dieses command gibt die Node.js Version aus
node -v

# Dieses command gibt die npm Version aus
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Einrichtung auf Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Installiere zuerste eine aktuelle Version von Node.js. Wir empfehlen Dir entweder die `LTS` oder die `Current` Version zu installieren. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Wenn der Download fertig ist, führe den Installer aus und folge dem Installationswizard.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Wenn abgeschlossen, dann überprüfe dass alles funktioniert wie gewünscht. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

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

Wenn du einer der Entwickler bist mit einer starken Präferenz für einen, solltest du wissen das im Grunde jeder Code Editor und jede IDE heutzutage JavaScript unterstützt.