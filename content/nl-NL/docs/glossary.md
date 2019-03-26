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

### hoofdproces

Het hoofdproces, meestal een bestand genaamd `main.js`, is het invoerpunt voor elke Electron-app. Het bepaalt het leven van de app, van openen tot sluiten. Het beheert ook oorspronkelijke elementen zoals het menu, menubalk, dock, tray, etc. Het hoofdproces is verantwoordelijk voor het maken van elk nieuw render-proces in de app. De volledige Node API is ingebouwd.

Het hoofdprocesbestand van elke app is gespecificeerd in de `main` eigenschap in `package.json`. Dit is hoe `Electron` weet welk bestand het uit moet voeren tijdens het opstarten.

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

### process

Een process is een instantie van een computerprogramma dat wordt uitgevoerd. Electron-apps die gebruik maken van de [hoofd](#main-process) en een van de vele [render-](#renderer-process)process zijn eigenlijk meerdere programma's tegelijk aan het draaien.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. Het is geschreven in C++ en wordt gebruikt in Google Chrome. V8 kan op zichzelf uitgevoerd worden of kan worden ingebed in een C++ applicatie.

Electron bouwt V8 as onderdeel van Chromium en verwijst vervolgens Node naar die V8 wanneer hij wordt gebouwt.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.