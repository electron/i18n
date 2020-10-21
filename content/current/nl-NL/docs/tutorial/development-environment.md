# Ontwikkelaar Omgeving

Electron ontwikkeling is voornamelijk Node.js ontwikkeling. Om je besturingssysteem in een omgeving te veranderen die in staat is desktopapps te bouwen met Electron, heb je alleen Node. s, npm, een code editor van jouw keuze en een rudimentaire kennis van de command line client van je besturingssysteem

## MacOS instellen

> Electron ondersteunt macOS 10.10 (Yosemite) en hoger. Apple staat het draaien van macOS in virtuele machines niet toe, tenzij de host computer al een Apple computer is, dus als je een Mac nodig hebt, overweeg met behulp van een cloud service die toegang geeft tot Macs (zoals [MacInCloud](https://www.macincloud.com/) of [xcloud](https://xcloud.me)).

Installeer eerst een recente versie van Node.js. We raden u aan om de nieuwste `LTS` of `Huidige` versie beschikbaar te installeren. Bezoek [de Node.js downloadpagina](https://nodejs.org/en/download/) en selecteer de `macOS Installer`. Hoewel Homebrew een aangeboden optie is, raden we aan - veel tools zullen niet compatibel zijn met de manier waarop Homebrew installeert Node.js.

Eenmaal gedownload, voer het installatieprogramma uit en laat u de installatiehandleiding door de installatie.

Eenmaal geïnstalleerd, bevestig dat alles werkt zoals verwacht. Zoek de macOS `Terminal` applicatie in uw `/Applications/Utilities` map (of door te zoeken naar het woord `Terminal` in Spotlight). Open `Terminal` of een andere opdrachtregelclient naar uw keuze en bevestig dat zowel `node` als `npm` beschikbaar zijn:

```sh
# Deze opdracht moet de versie van Node.js
node -v

# Deze opdracht moet de versie van npm
npm -v
```

Als beide commando's een versienummer laten drukken, ben je helemaal klaar! Voordat je begint, wil je misschien een [code editor installeren](#a-good-editor) geschikt voor JavaScript-ontwikkeling.

## Windows instellen

> Electron ondersteunt Windows 7 en latere versies – het proberen van Electron applicaties op eerdere versies van Windows zal niet werken. Microsoft biedt gratis [virtuele machine afbeeldingen met Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) voor ontwikkelaars.

Installeer eerst een recente versie van Node.js. We raden u aan om de nieuwste `LTS` of `Huidige` versie beschikbaar te installeren. Bezoek [de Node.js downloadpagina](https://nodejs.org/en/download/) en selecteer de `Windows Installer`. Eenmaal gedownload, voer het installatieprogramma uit en laat u de installatiehandleiding door de installatie.

Op het scherm waarmee u de installatie kunt configureren, zorg ervoor dat u de `node
selecteert. s runtime`, `npm package manager`en `Add to PATH` opties.

Eenmaal geïnstalleerd, bevestig dat alles werkt zoals verwacht. Vind de Windows PowerShell door het Start Menu te openen en `PowerShell` te typen. Open op `PowerShell` of een andere opdrachtregelclient naar uw keuze en bevestig dat zowel `knooppunt` als `npm` beschikbaar zijn:

```powershell
# Deze opdracht moet de versie van Node.js
node -v

# Deze opdracht moet de versie van npm
npm -v
```

Als beide commando's een versienummer laten drukken, ben je helemaal klaar! Voordat je begint, wil je misschien een [code editor installeren](#a-good-editor) geschikt voor JavaScript-ontwikkeling.

## Linux instellen

> Over het algemeen ondersteunt Electron Ubuntu 12.04, Fedora 21, Debian 8 en hoger.

Installeer eerst een recente versie van Node.js. Afhankelijk van uw Linux -distributie, kunnen de installatiestappen verschillen. Ervan uitgaande dat u normaal software installeert met behulp van een pakketmanager zoals `apt` of `pacman`, gebruik de officiële [Node. s begeleiding bij installeren op Linux](https://nodejs.org/en/download/package-manager/).

Je gebruikt Linux, dus je weet waarschijnlijk al hoe een opdrachtregel client moet werken. Open uw favoriete client en bevestig dat zowel `node` en `npm` wereldwijd beschikbaar zijn:

```sh
# Deze opdracht moet de versie van Node.js
node -v

# Deze opdracht moet de versie van npm
npm -v
```

Als beide commando's een versienummer laten drukken, ben je helemaal klaar! Voordat je begint, wil je misschien een [code editor installeren](#a-good-editor) geschikt voor JavaScript-ontwikkeling.

## Een goede editor

We kunnen twee gratis populaire editors voorstellen die gebouwd zijn in Electron: GitHub's [Atom](https://atom.io/) en Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

Als je een van de vele ontwikkelaars bent met een sterke voorkeur, weet dan dat vrijwel alle code editors en IDE's tegenwoordig JavaScript ondersteunen.
