# Electron Applicatie Architectuur

Voordat we in de API van Electron, kunnen duiken, moeten we de twee processen types die beschikbaar zijn in Electron bespreken. Ze zijn fundamenteel verschillend en belangrijk om te begrijpen.

## Hoofd en Renderer Processen

In Electron wordt het proces dat de `package.json`van het grootste</code> script `uitvoert
<strong x-id="2">het hoofdproces</strong>. Het script dat in het hoofdproces wordt uitgevoerd kan een
GUI weergeven door het maken van webpagina's. Een Electron app heeft altijd één hoofdproces, maar
nooit meer.</p>

<p spaces-before="0">Omdat Electron Chromium gebruikt voor het weergeven van webpagina's, wordt de Chromium
multi-procesarchitectuur ook gebruikt. Elke webpagina in Electron draait in
zijn eigen proces, dat <strong x-id="2">het rendererproces</strong> wordt genoemd.</p>

<p spaces-before="0">In normale browsers worden webpagina's meestal in een sandbox-omgeving uitgevoerd en hebben ze geen toegang tot inheemse bronnen. Electron-gebruikers hebben echter de macht om Node.js API's te gebruiken in webpagina's die interacties tussen lagere niveaus van het besturingssysteem mogelijk maken.</p>

<h3 spaces-before="0">Verschillen tussen Main Proces en Renderer Proces</h3>

<p spaces-before="0">Het hoofdproces maakt webpagina's door het maken van <code>BrowserWindow` instanties. Elke `BrowserWindow` instantie voert de webpagina uit in zijn eigen renderer-proces. Wanneer een `BrowserWindow` instantie wordt vernietigd, wordt het bijbehorende renderer proces ook beëindigd.

Het hoofdproces beheert alle webpagina's en hun overeenkomstige renderer processen. Elke spelerproces is geïsoleerd en geeft alleen aandacht aan de webpagina die daarin wordt uitgevoerd.

In webpagina's, het aanroepen van native GUI gerelateerde API's is niet toegestaan, omdat het beheren van native GUI bronnen in webpagina's zeer gevaarlijk is en het gemakkelijk is bronnen te lekken. Als u GUI bewerkingen wilt uitvoeren op een webpagina, het proces van de speler van de webpagina moet communiceren met het hoofdproces om te vragen dat het belangrijkste proces deze operaties uitvoert.

> #### Azië: Communicatie tussen processen
> 
> In Electron hebben we verschillende manieren om te communiceren tussen het hoofdproces en renderer processen, zoals [`ipcRenderer`](../api/ipc-renderer.md) en [`ipcMain`](../api/ipc-main.md) modules voor het verzenden van berichten, en de [externe](../api/remote.md) module voor RPC stijl communicatie. There is also an FAQ entry on [how to share data between web pages][share-data].

## Electron API's gebruiken

Electron biedt een aantal API's die de ontwikkeling van een desktop- applicatie ondersteunen in zowel het hoofdproces als het renderer-proces. In beide processen zou u toegang krijgen tot de API's van Electron, door het vereisen van de bijbehorende module:

```javascript
const electron = require('electron')
```

Alle Electron API's hebben een procestype toegewezen. Veel van hen kunnen alleen worden gebruikt uit het hoofdproces, sommige alleen uit een rendererproces, sommige uit beide. De documentatie voor elke individuele API zal bepalen uit welk proces het kan worden gebruikt.

Een venster in Electron is bijvoorbeeld gemaakt met behulp van de `BrowserWindow` class. Het is alleen beschikbaar in het hoofdproces.

```javascript
// Dit zal werken in het hoofdproces, maar wees `undefined` in een
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Omdat communicatie tussen de processen mogelijk is, kan een renderer proces het hoofdproces starten om taken uit te voeren. Electron komt met een module genaamd `remote` die API's laat zien, meestal alleen beschikbaar op het hoofdproces. Om een `Browservenster` van een renderer proces te maken, gebruiken we de afstandsbediening als een tussenland:

```javascript
// Dit zal werken in een renderer proces. maar wees `undefined` in het
// hoofdproces:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Het gebruik maken van Node.js API's

Electron geeft volledige toegang tot Node.js zowel in het hoofd- als het renderer-proces proces. Dit heeft twee belangrijke gevolgen:

1) Alle API's in Node.js zijn beschikbaar in Electron. Het aanroepen van de volgende code van een Electron app werkt:

```javascript
const fs = require('fs')

const root = fs. eaddirSync('/')

// Dit zal alle bestanden op het root-niveau van de schijf afdrukken,
// hetzij '/' of 'C:\'.
console.log(root)
```

Zoals je misschien al kunt raden, heeft dit belangrijke veiligheidsgevolgen als je ooit probeert externe inhoud te laden. You can find more information and guidance on loading remote content in our [security documentation][security].

2) U kunt Node.js modules gebruiken in uw applicatie. Kies je favoriete npm module. npm biedt op dit moment 's werelds grootste repository van open-source code – de mogelijkheid om goed onderhouden en geteste code die gebruikt wordt gereserveerd voor servertoepassingen is een van de belangrijkste functies van Electron.

Om de officiële AWS SDK te gebruiken in je applicatie, installeer je deze eerst als een afhankelijkheid:

```sh
npm installeren --opslaan aws-sdk
```

Vervolgens vereist en gebruikt u in uw Electron app de module alsof u een Node.js applicatie bouwt:

```javascript
// Een kant-en-klaar S3 Client
const S3 = require('aws-sdk/clients/s3')
```

Er is één belangrijke kanttekening: Native Node. s modules (dat wil zeggen, modules die compilatie van inheemse code vereisen voordat ze kunnen worden gebruikt) zullen moeten worden gecompileerd om te worden gebruikt met Electron.

The vast majority of Node.js modules are _not_ native. Slechts 400 van de ~650.000 modules zijn natief. However, if you do need native modules, please consult [this guide on how to recompile them for Electron][native-node].

[security]: ./security.md
[native-node]: ./using-native-node-modules.md
[share-data]: ../faq.md#how-to-share-data-between-web-pages
