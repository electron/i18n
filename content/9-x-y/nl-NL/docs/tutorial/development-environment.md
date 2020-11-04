# Ontwikkelaar Omgeving

Electron ontwikkeling is voornamelijk Node.js ontwikkeling. Om je besturingssysteem in een omgeving te veranderen die in staat is desktopapps te bouwen met Electron, heb je alleen Node. s, npm, een code editor van jouw keuze en een rudimentaire kennis van de command line client van je besturingssysteem

## MacOS instellen

> Electron ondersteunt macOS 10.10 (Yosemite) en hoger. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud][macincloud] or [xcloud](https://xcloud.me)).

Installeer eerst een recente versie van Node.js. We raden u aan om de nieuwste `LTS` of `Huidige` versie beschikbaar te installeren. Visit [the Node.js download page][node-download] and select the `macOS Installer`. Hoewel Homebrew een aangeboden optie is, raden we aan - veel tools zullen niet compatibel zijn met de manier waarop Homebrew installeert Node.js.

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

> Electron ondersteunt Windows 7 en latere versies – het proberen van Electron applicaties op eerdere versies van Windows zal niet werken. Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

Installeer eerst een recente versie van Node.js. We raden u aan om de nieuwste `LTS` of `Huidige` versie beschikbaar te installeren. Visit [the Node.js download page][node-download] and select the `Windows Installer`. Eenmaal gedownload, voer het installatieprogramma uit en laat u de installatiehandleiding door de installatie.

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

Installeer eerst een recente versie van Node.js. Afhankelijk van uw Linux -distributie, kunnen de installatiestappen verschillen. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

Je gebruikt Linux, dus je weet waarschijnlijk al hoe een opdrachtregel client moet werken. Open uw favoriete client en bevestig dat zowel `node` en `npm` wereldwijd beschikbaar zijn:

```sh
# Deze opdracht moet de versie van Node.js
node -v

# Deze opdracht moet de versie van npm
npm -v
```

Als beide commando's een versienummer laten drukken, ben je helemaal klaar! Voordat je begint, wil je misschien een [code editor installeren](#a-good-editor) geschikt voor JavaScript-ontwikkeling.

## Een goede editor

We might suggest two free popular editors built in Electron: GitHub's [Atom][atom] and Microsoft's [Visual Studio Code][code]. Both of them have excellent JavaScript support.

Als je een van de vele ontwikkelaars bent met een sterke voorkeur, weet dan dat vrijwel alle code editors en IDE's tegenwoordig JavaScript ondersteunen.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
