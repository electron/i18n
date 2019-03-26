# Woordenlijst

Deze pagina definieert terminologie die veel gebruikt wordt in de ontwikkeling van Electron.

### ASAR

ASAR staat voor Atom Shell Archive Format. Een [asar](https://github.com/electron/asar) archief is een eenvoudig `tar`-achtig format dat bestanden samenvoegt tot één enkel bestand. Electron kan willekeurige bestanden ervan aflezen zonder het hele bestand uit te pakken.

Het ASAR-formaat is primair gemaakt om de prestaties op Windows te verbeteren... TODO

### CRT

De C Run-time Bibliotheek (CRT) is het deel van de C++ Standaard Bibliotheek dat de ISO C99 standaard bibliotheek bevat. De Visuele C++ bibliotheken die de CRT-ondersteuning van de oorspronkelijke code-ontwikkeling implementeren, en zowel gemengd oorspronkelijke als beheerde code, en zuivere beheerde code voor .NET-ontwikkeling.

### DMG

Een Apple Disk Image is een verpakkingsformaat dat wordt gebruikt door macOS. DMG-bestanden worden over het algemeen gebruikt voor het verspreiden van applicatie "installers". [elektron-bouwer](https://github.com/electron-userland/electron-builder) ondersteunt `dmg` als een build-doel.

### IME

Input Method Editor. Een programma dat gebruikers toestaat om tekens en symbolen in te voeren die niet te vinden zijn op hun toetsenbord. Zo kunnen bijvoorbeeld gebruikers van Latijnse toetsenborden Chinese, Japanse, Koreaanse en Indische tekens invoeren.

### IDL

Interface description language. Schrijf functiehandtekeningen en gegevenstypen in een format dat kan worden gebruikt om interfaces te genereren in Java, C++, JavaScript, enz.

### IPC

IPC staat voor Inter-Process Communication. Electron gebruikt IPC om gecorrigeerde JSON-berichten te verzenden tussen [hoofd-](#main-process) en [render](#renderer-process)processen.

### libchromiumcontent

Een gedeelde bibliotheek die de [Chromium Content module](https://www.chromium.org/developers/content-module) en al zijn afhankelijkheden (bijv. Blink, [V8](#v8), etc.) bevat. Ook wel "libcc" genoemd.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### hoofd-proces

Het hoofd-proces, meestal een bestand genaamd `main.js`, is het invoerpunt voor elke Electron-app. Het bepaalt het leven van de app, van openen tot sluiten. Het beheert ook oorspronkelijke elementen zoals het menu, menubalk, dock, tray, etc. Het hoofd-proces is verantwoordelijk voor het maken van elk nieuw render-proces in de app. De volledige Node API is ingebouwd.

Het hoofd-proces-bestand van elke app is gespecificeerd in de `main` eigenschap in `package.json`. Dit is hoe `Electron` weet welk bestand het uit moet voeren tijdens het opstarten.

In Chromium wordt dit proces aangeduid als het "browserproces". Het is hernoemd in Electron om verwarring te voorkomen met render-processen.

Zie ook: [proces](#process), [render-proces](#renderer-process)

### MAS

Acroniem voor Apple's Mac App Store. Voor details over het verzenden van je app naar de MAS, zie de [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

Een IPC-systeem voor communiceren intra- of inter-proces, en dat is belangrijk omdat Chrome erop gebrand is om zijn werk te kunnen splitsen in afzonderlijke processen of niet, afhankelijk van geheugendruk, enz.

Zie https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### inheemse modules

Inheemse modules (ook [addons genoemd](https://nodejs.org/api/addons.html) in Node.js) zijn modules geschreven in C of C++ die kunnen worden geladen in Node.js of Electron met behulp van de require() functie, en gebruikt alsof ze een gewone Node.js module zijn. Ze worden voornamelijk gebruikt om een interface te bieden tussen JavaScript dat draait in Node.js en C/C++ bibliotheken.

Inheemse Node-modules worden ondersteund door Electron, maar aangezien Electron zeer waarschijnlijk een andere V8-versie zal gebruiken van de Node binary geïnstalleerd in je systeem, moet je handmatig de locatie van de headers van Electron specificeren wanneer je inheemse modules bouwt.

Zie ook [Gebruik Inheemse Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. Het wordt vrijgegeven onder een combinatie van gratis softwarelicenties, en is een wijdverbreid alternatief voor commerciële propriëtaire producten zoals InstallShield. [elektron-builder](https://github.com/electron-userland/electron-builder) ondersteunt NSIS als een build-doel.

### OSR

OSR (Off-screen rendering) kan worden gebruikt voor het laden van een zware pagina in de achtergrond en daarna weergeven (het zal veel sneller zijn). Het stelt je in staat om een pagina te renderen zonder het op het scherm te tonen.

### proces

Een proces is een instantie van een computerprogramma dat wordt uitgevoerd. Electron-apps die gebruik maken van de [hoofd](#main-process) en een van de vele [render-](#renderer-process)processen zijn eigenlijk meerdere programma's tegelijk aan het draaien.

In Node.js en Electron heeft elk lopend proces een `process` object. Dit object is een globaal object dat informatie verstrekt en controle heeft over het huidige proces. Als globaal object is het altijd beschikbaar voor applicaties zonder require() te gebruiken.

Zie ook: [hoofdproces](#main-process), [render-proces](#renderer-process)

### render-proces

Het render-proces is een browservenster in je app. In tegenstelling tot het hoofdproces kunnen er meerdere zijn en elk wordt uitgevoerd in een apart proces. Ze kunnen ook verborgen zijn.

In normale browsers worden webpagina's meestal in een sandbox-omgeving uitgevoerd en hebben ze geen toegang tot inheemse bronnen. Electron-gebruikers hebben echter de macht om Node.js API's te gebruiken in webpagina's die interacties tussen lagere niveaus van het besturingssysteem mogelijk maken.

Zie ook: [proces](#process), [hoofdproces](#main-process)

### Squirrel

Squirrel is een open-source framework dat Electron-apps in staat stelt om automatisch te updaten wanneer nieuwe versies worden vrijgegeven. Zie de [autoUpdater](api/auto-updater.md) API voor info over aan de slag gaan met Squirrel.

### userland

Deze term is ontstaan in de Unix-community, waar "userland" of "userspace" verwees naar programma's die buiten de besturingssysteem-kernel draaien. Meer recentelijk is de term populair geworden in de Node- en npm-community om onderscheid te maken tussen de functies die beschikbaar zijn in "Node core" en de pakketten die door de veel grotere "gebruikers"-community in het npm-register worden gepubliceerd.

Net als Node is Electron gericht op een kleine set API's die voorzien in alle noodzakelijke primitives voor het ontwikkelen van multi-platform desktop-applicaties. Deze ontwerpfilosofie maakt het mogelijk dat Electron een flexibele tool blijft zonder te dwingend te zijn over hoe het gebruikt moet worden. Userland stelt gebruikers in staat om tools te maken en te delen die extra functionaliteit bieden bovenop wat beschikbaar is in "core".

### V8

V8 is Google's open source JavaScript engine. Het is geschreven in C++ en wordt gebruikt in Google Chrome. V8 kan op zichzelf uitgevoerd worden of kan worden ingebed in een C++ applicatie.

Electron bouwt V8 as onderdeel van Chromium en verwijst vervolgens Node naar die V8 wanneer hij wordt gebouwt.

V8's versienummers komen altijd overeen met die van Google Chrome. Chrome 59 bevat V8 5.9, Chrome 58 bevat V8 5.8, enz.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags worden gebruikt om 'gast'-inhoud (zoals externe webpagina's) in je Electron-app in te voegen. Ze zijn vergelijkbaar met `iframe`s, maar verschillen in het feit dat elke webview een apart proces draait. Het heeft niet dezelfde rechten als je webpagina en alle interacties tussen je app en ingesloten inhoud zullen asynchroon zijn. Dit houdt je app veilig van de ingesloten inhoud.