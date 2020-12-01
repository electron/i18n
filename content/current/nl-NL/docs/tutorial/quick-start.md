# Snelle startgids

## Snelstart

Electron is een framework waarmee u desktop-applicaties kunt maken met JavaScript, HTML en CSS. Deze applicaties kunnen dan verpakt worden om direct te draaien op macOS, Windows of Linux, of verspreid via de Mac App Store of de Microsoft Store.

Normaal gesproken maak je een desktop applicatie voor een operating system (OS) met behulp van elk besturingssysteem specifieke native toepassingskaders. Electron maakt het mogelijk om je applicatie te schrijven met behulp van technologieën die je al kent.

### Prerequisites

Voordat je verder gaat met Electron moet je [Node.js](https://nodejs.org/en/download/) installeren. We raden u aan de nieuwste `LTS` of `Huidige` versie beschikbaar te installeren.

> Installeer Node.js met vooraf gebouwde installatieprogramma's voor uw platform. Anders kun je problemen krijgen met incompatibiliteit met verschillende ontwikkelingsinstrumenten.

Om te controleren dat Node.js correct is geïnstalleerd, typ je de volgende commando's in je terminal client:

```sh
node -v
npm -v
```

De commando's moeten de versies van Node.js en npm overeenkomstig afdrukken. Als beide commando's geslaagd zijn, ben je klaar om Electron te installeren.

### Basistoepassing aanmaken

Vanuit een ontwikkelingsperspectief is een Electron applicatie in wezen een Node.js applicatie. Dit betekent dat het startpunt van uw Electron applicatie een `package.json` bestand zal zijn, zoals in elke andere Node.js applicatie. Een minimale Electron applicatie heeft de volgende structuur:

```plaintext
mijn-electron-app/
+unnamed@@0 Đpackage.json
½ main.js
ρρρindex.html
```

Laten we een basistoepassing maken op basis van de bovenliggende structuur.

#### Install Electron

Maak een map aan voor je project en installeer Electron daar:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Maak het hoofdscript bestand

Het hoofdscript specificeert het invoerpunt van uw Electron applicatie (in ons geval, het `main.js` bestand) dat het hoofdproces zal uitvoeren. Doorgaans controleert het script dat in het Hoofd proces de levenscyclus van de applicatie controleert, de grafische gebruikersinterface en de elementen ervan Voert native operating system interacties uit en maakt Renderer processen aan binnen de webpagina's. Een Electron applicatie kan slechts één Hoofd proces hebben.

Het hoofdscript kan er als volgt uitzien:

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

##### Wat gebeurt er hierboven?

1. Regel 1: Eerst importeer de `app` en `BrowserWindow` modules van het `elektron` pakket om de lifecycle events van uw applicatie te beheren evenals het maken en besturen van browservensters.
2. Regel 3: Daarna definieer je een functie die een [nieuw browservenster](../api/browser-window.md#new-browserwindowoptions) maakt met de node integratie ingeschakeld laadt `index. tml` bestand in dit venster (regel 12, we zullen het bestand later bespreken) en opent de ontwikkelaarshulpmiddelen (regel 13).
3. Regel 16: Je maakt een nieuw browservenster door de functie `createWindow` aan te roepen zodra de Electron applicatie [is geïnitialiseerd.](../api/app.md#appwhenready).
4. Regel 18: U voegt een nieuwe luisteraar toe die probeert de applicatie te verlaten wanneer deze geen open vensters meer heeft. Deze luisteraar is een no-op op op macOS als gevolg van het [vensterbeheer](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).
5. Regel 24: U voegt een nieuwe luisteraar toe die een nieuw browservenster alleen maakt als de applicatie geen zichtbare vensters heeft nadat deze is geactiveerd. Bijvoorbeeld na het starten van de applicatie voor de eerste keer, of de reeds lopende applicatie opnieuw opstarten.

#### Maak een webpagina

Dit is de webpagina die u wilt weergeven zodra de applicatie is geïnitialiseerd. Deze webpagina vertegenwoordigt het Renderer-proces. U kunt meerdere browservensters maken, waar elk venster zijn eigen onafhankelijke Renderer gebruikt. Elk venster kan optioneel worden verleend met volledige toegang tot Node.js API via de `nodeIntegration` voorkeur.

De `index.html` pagina ziet er als volgt uit:

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        and Electron <script>document.write(process.versions.electron)</script>.
    </p>
</body>
</html>
```

#### Wijzig uw package.json bestand

Uw Electron applicatie gebruikt het `package.json` bestand als het belangrijkste invoerpunt (zoals elke andere Node.js applicatie). Het hoofdscript van je applicatie is `main.js`, dus pas het bestand `package.json` aan.

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> OPMERKING: als het `hoofd` veld wordt weggelaten, zal Electron proberen een `index te laden. s` bestand uit de map `package.json`.

Standaard wordt het `npm start` commando het hoofdscript met Node.js uitgevoerd. Om het script met Electron uit te voeren, moet je het als zodanig wijzigen:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron ." ."
    }
}
```

#### Voer je applicatie uit

```sh
npm start
```

Uw draaiende Electron app zou er als volgt uit moeten zien:

![Gemakkelijke Electron app](../images/simplest-electron-app.png)

### Pakket en verdeel de applicatie

De eenvoudigste en snelste manier om uw nieuwe app te distribueren is met [Electron Forge](https://www.electronforge.io).

1. Importeer Electron Forge in je app map:

    ```sh
    npx @electron-forge/cli import

    ✔ Controleren van uw systeem
    ✔ Git Repository
    ✔ Schrijven van een aangepast pakket. son bestand
    ✔ Installeren van afhankelijkheden
    ✔ aangepast pakket schrijven zoon bestand
    ✔ Fixing . itignore

    We hebben GEATTEMPTED om uw app te converteren in een formaat dat elektron-forge begrijpt.

    Bedankt voor het gebruiken van "electron-forge"!!!
    ```

1. Maak een distributietabel:

    ```sh
    npm run maakt

    > my-gsod-electron-app@1.0. maak /my-electron-app
    > electron-forge

    ✔ Controleren van uw systeem
    ✔ Forgeinstalleerd Forge Config
    We moeten uw applicatie eerst inpakken voordat we het kunnen maken
    ✔ Voorbereiding van pakket applicatie voor arch: x64
    ✔ Voorbereiden van inheemse afhankelijkheden
    ✔ Pakket applicatie
    Making voor de volgende doelen:
    :heavy__mark: Making for target: zip - Op platform: win - arch: 64 xarchy: archief
    ```

    Electron-forge maakt de map `uit` waar je pakket zich zal bevinden:

    ```plain
    // Voorbeeld voor MacOS
    out/
    demanild-out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.zip
    ³ ...
    Doha-in/ike-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Leren van de basis

Deze sectie begeleidt je door de basisprincipes van hoe Electron werkt onder de kap. Het is gericht op het versterken van de kennis over Electron en de applicatie gemaakt eerder in het Quickstart gedeelte.

### Aanvraag architectuur

Electron bestaat uit drie belangrijke pijlers:

* **Chromium** voor het weergeven van webcontent.
* **Node.js** voor het werken met het lokale bestandssysteem en het besturingssysteem.
* **Aangepaste API's** voor het werken met vaak benodigde OS native functies.

Een toepassing ontwikkelen met Electron is als het bouwen van een Node.js app met een web interface of het bouwen van webpagina's met naadloze Node.js integratie.

#### Hoofd en Renderer Processen

Zoals het al eerder is genoemd, heeft Electron twee soorten processen: Main en Renderer.

* Het hoofdproces **maakt** webpagina's door `BrowserWindow` instanties aan te maken. Elke `BrowserWindow` instantie draait de webpagina in zijn Renderer-proces. Wanneer een `BrowserWindow` instantie wordt vernietigd, wordt het bijbehorende Renderer proces ook beëindigd.
* Het hoofdproces **beheert** alle webpagina's en hun overeenkomstige Renderer-processen.

----

* Het Renderer-proces **beheert alleen** de corresponderende webpagina. Een crash in één Renderer-proces heeft geen invloed op andere Renderer-processen.
* Het Renderer-proces **communiceert** met het hoofdproces via IPC om GUI-bewerkingen uit te voeren op een webpagina. Het aanroepen van oorspronkelijke GUI gerelateerde API's van het Renderer-proces is direct beperkt door veiligheidsproblemen en potentieel lekken van hulpbronnen.

----

De communicatie tussen processen is mogelijk via Inter-Process Communication (IPC) modules: [`ipcMain`](../api/ipc-main.md) en [`ipcRenderer`](../api/ipc-renderer.md).

#### API's

##### Electron API

Electron API's worden toegewezen op basis van het type proces, betekent dat sommige modules gebruikt kunnen worden vanuit het Main of Renderer proces, en sommige vanuit beide. De API-documentatie van Electron geeft aan uit welk proces elke module kan worden gebruikt.

Om bijvoorbeeld toegang te krijgen tot de Electron API in beide processen, heeft u de bijbehorende module nodig:

```js
const electron = require('electron')
```

Om een venster te maken, bel de `BrowserWindow` class, die alleen beschikbaar is in het hoofdproces:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Om het hoofdproces van de Renderer op te roepen, gebruik je de IPC-module:

```js
// In het Hoofd proces
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... acties uitvoeren namens de Renderer
})
```

```js
// In het Renderer-proces
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> OPMERKING: Omdat Renderer-processen niet-vertrouwde code kunnen draaien (vooral van derden), het is belangrijk om de verzoeken die bij de hoofdprocedure komen zorgvuldig te valideren.

##### Node.js API

> LET OP: Om de Node.js API van het Renderer-proces te bekijken, moet u de voorkeur `nodeIntegration` instellen op `true`.

Electron geeft volledige toegang tot Node.js API en de bijbehorende modules in zowel de Main als de Renderer-processen. Je kunt bijvoorbeeld alle bestanden van de hoofdmap lezen:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Om een Node.js module te gebruiken, moet u deze eerst installeren als afhankelijkheid:

```sh
npm installeren --opslaan aws-sdk
```

Vervolgens vereist in uw Electron applicatie de module:

```js
const S3 = require('aws-sdk/clients/s3')
```
