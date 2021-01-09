# Je Eerste Electron App schrijven

Electron maakt het mogelijk om desktop apps te maken met puur JavaScript, door tijdens het runnen van de applicatie gebruik te maken van native (besturingssysteem) APIs. Je kunt het zien als een variant van Node.js runtime, die gefocust is op desktop apps inplaats van web servers.

Dit betekent niet dat Electron een JavaScript-verbinding is voor de grafische gebruikersinterface (GUI) bibliotheken. Electron gebruikt webpagina's als zijn GUI, dus u kunt het ook zien als een minimale Chromium browser, beheerd door JavaScript.

**Opmerking**: Dit voorbeeld is ook beschikbaar als repository die je [direct kan downloaden en uitvoeren](#trying-this-example).

Wat ontwikkeling betreft is een Electron applicatie in wezen een Node.js applicatie. Het startpunt is een `package.json` die identiek is aan die van een Node.js module. Een meest eenvoudige Electron app zou de volgende map structuur hebben:

```plaintext
jou-app/
(INI) package.json
½ main.js
・wom-index.html
```

Maak een nieuwe lege map voor de nieuwe Electron applicatie. Open je command line client en voer `npm init` uit die zelfde map.

```sh
npm init
```

npm zal je begeleiden bij het maken van een eenvoudig `package.json` bestand. Het script opgegeven door het `hoofd` veld is het opstartscript van uw app, dat het hoofdproces zal uitvoeren. Een voorbeeld van uw `package.json` zou er als volgt uit kunnen zien:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Note__: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). Als dit eigenlijk een simpele node applicatie was, voeg een `start` script toe dat `node` instrueert om het huidige pakket uit te voeren:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Deze Node toepassing omzetten in een Electron applicatie is vrij eenvoudig - wij vervangen alleen de `node` runtime met de `elektron` runtime.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Electron installeren

Op dit punt moet je `electron` zelf installeren. De aanbevolen manier is om het te installeren als een ontwikkelingsachterstand in uw app, waarmee aan meerdere apps met verschillende Electron versies kan werken. Voer hiervoor het volgende commando uit van de map van je app:

```sh
npm install --save-dev electron
```

Andere middelen om Electron te installeren zijn er. Raadpleeg de [installatiehandleiding](installation.md) voor meer informatie over gebruik met proxies, mirrors, en aangepaste caches.

## Electron Development in een notendop

Electron apps zijn ontwikkeld in JavaScript met behulp van dezelfde principes en methoden gevonden in Node.js ontwikkeling. Alle API's en functies van Electron zijn toegankelijk via de `elektron` module, welke vereist kunnen zijn, zoals elk ander Node. s module:

```javascript
const electron = require('electron')
```

De `elektron` module stelt functies in de namespaces bloot. Als voorbeelden wordt de levenscyclus van de applicatie beheerd via `electron. Pp`, vensters kunnen worden gemaakt met behulp van de `electron.BrowserWindow` class. Een eenvoudig `main.js` bestand kan wachten op voordat de applicatie klaar is en een venster openen:

```javascript
const { app, BrowserWindow } = require('electron')

functie createWindow () {
  // Creëer het browservenster.
  let win = nieuwe BrowserWindow({
    breedte: 800,
    hoogte: 600,
    webVoorkeuren: {
      nodeIntegration: true
    }
  })

  // en laad de index.html van de app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

De `main.js` zou vensters moeten maken en alle systeemgebeurtenissen moeten behandelen die uw applicatie zou kunnen tegenkomen. Een completere versie van bovenstaande versie kan ontwikkelaarshulpmiddelen openen, het venster dat wordt gesloten, beheren of opnieuw vensters maken op macOS als de gebruiker op het pictogram van de app in het dock klikt.

```javascript
const { app, BrowserWindow } = require('electron')

functie createWindow () {
  // Creëer het browservenster.
  const win = new BrowserWindow({
    breedte: 800,
    hoogte: 600,
    webVoorkeuren: {
      nodeIntegration: true
    }
  })

  // en laad de index.html van de app.
  win.loadFile('index.html')

  // Open de DevTools.
  win.webContents.openDevTools()
}

// Deze methode zal worden opgeroepen wanneer Electron is voltooid
// initialisatie en klaar is om browservensters te maken.
// Sommige API's kunnen alleen worden gebruikt na deze gebeurtenis.
app.whenReady().then(createWindow)

// Stop wanneer alle vensters worden gesloten.
app.on('window-all-closed', () => {
  // Op macOS is het gebruikelijk voor applicaties en hun menubalk
  // actief te blijven totdat de gebruiker expliciet stopt met Cmd + Q
  als (proces. latform !== 'donker') {
    app. uit()
  }
})

app. n('activeren', () => {
  // Op macOS is het gebruikelijk om opnieuw een venster in de app aan te maken wanneer op het
  // dock pictogram wordt geklikt en er geen andere vensters open zijn.
  if (BrowserWindow.getAllWindows(). ength === 0) {
    createWindow()
  }
})

// In dit bestand kan je de rest van het hoofdproces van je app meenemen
// code. Je kunt ze ook in aparte bestanden plaatsen en ze hier nodig hebben.
```

Ten slotte is de `index.html` de webpagina die je wilt tonen:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Je App starten

Zodra je je initiële `main.js`hebt gemaakt, `index.html`en `pakket. zoon` bestanden, je kunt je app proberen door `npm` uit te voeren vanuit de map van je applicatie.

## Proberen dit voorbeeld

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`][quick-start] repository.

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# Kloon de repository
$ git kloon https://github. om/electron/electron-quick-start
# Ga naar de repository
$ cd electron-quick-start
# Installeer afhankelijkheden
$ npm install
# Start de app
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation][boilerplates].

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
