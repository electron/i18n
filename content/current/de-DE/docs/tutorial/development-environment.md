# Entwicklungsumgebung

Electron Entwicklung ist weitestgehend gleich zu Node.js Entwicklung. Um in deinem Betriebssystem eine Umgebung einzurichten, die dazu geeignet ist Desktop Apps mit Electron zu entwickeln, brauchst du eigentlich nur Node.js, npm, einen Code Editor deiner Wahl und ein Grundwissen wie Du den Command Line Client deines Betriebssystems verwendest.

## Einrichtung auf macOS

> Electron unterstützt macOS 10.10 (Yosemite) und stäter. Apple erlaubt die Verwendung von macOS  in Virtuellen Maschienen nicht es seiden der Host Computer selbst ist von Apple. Wenn du also einen Mac braucht, solltest du darüber nachdenken einen Cloud Service zu nutzen (wie  [MacInCloud](https://www.macincloud.com/)  oder [xcloud](https://xcloud.me)).

Installiere zuerste eine aktuelle Version von Node.js. Wir empfehlen Dir entweder die `LTS` oder die `Current` Version zu installieren. Gehe zur [Node.js Download Seite](https://nodejs.org/en/download/) und wähle den `macOS Installer`. Auch wenn Homebrew eine Möglichkeit wäre, wir raten dennoch davon ab. Viele Tools sind Inkompatibel mit der Art wie Homebrew Node.js installiert.

Wenn der Download fertig ist, führe den Installer aus und folge dem Installationswizard.

Wenn abgeschlossen ist, dann überprüfe ob alles wie gewünscht funktioniert. Die macOS `Terminal` App findest du in `/Programme/Dienstprogramme` oder mit einer Suche nach dem Wort `Terminal` in Spotlight. Öffne das `Terminal` oder ein anderen Command Line Client deiner wahl und überprüfe das beide, `node` und `npm` verfügbar sind:

```sh
# Dieses command gibt die Node.js Version aus
node -v

# Dieses command gibt die npm Version aus
npm -v
```

Wenn beide commands eine Versionsnummer ausgeben, dann bist du bereit! Bevor du anfängst solltest du dir noch einen [code editor](#a-good-editor) installieren der sich für JavaScript Entwicklung eignet.

## Einrichtung auf Windows

> Electron unterstützt Windows 7 und neuere Versionen – Versuche, Electron Anwendungen auf früheren Versionen von Windows zu entwickeln, werden fehlschlagen. Microsoft stellt kostenlose [virtual machine images mit Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) für Entwickler zur Verfügung.

Installiere zuerste eine aktuelle Version von Node.js. Wir empfehlen Dir entweder die `LTS` oder die `Current` Version zu installieren. Besuche [die Node.js Download-Seite](https://nodejs.org/en/download/) und wähle den `Windows-Installer` aus. Wenn der Download fertig ist, führe den Installer aus und folge dem Installationswizard.

Stellen sicher, dass Sie in dem Fenster, welches Ihnen erlaubt die Installation zu konfigurieren, `Node.js runtime`, `npm package manager`, und `Add to PATH` auswählen.

Wenn abgeschlossen, bestätigen Sie, dass alles wie gewünscht funktioniert. Finden Sie die Windows PowerShell, indem Sie das Startmenü öffnen und beginnen `PowerShell` einzugeben. Öffnen Sie PowerShell oder einen anderen Command Line Client Ihrer Wahl und bestätigen Sie, dass sowohl `node`, als auch `npm` verfügbar sind:

```powershell
# Dieser Befehl gibt die Node.js Version aus
node -v

# Dieser Befehl gibt die npm Version aus
npm -v
```

Wenn beide Befehle eine Versionsnummer ausgeben, dann sind Sie bereit! Bevor du anfängst solltest du dir noch einen [code editor](#a-good-editor) installieren der sich für JavaScript Entwicklung eignet.

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

Wenn du einer der Entwickler bist mit einer starken Präferenz für einen, solltest du wissen, dass im Grunde jeder Code Editor und jede IDE heutzutage JavaScript unterstützt.
