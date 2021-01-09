# Electron FAQ

## Waarom ondervind ik problemen met het installeren van Electron?

Bij het uitvoeren van `npm install electron`, krijgen sommige mensen een error.

In bijna alle gevallen zijn de fouten het resultaat van een netwerk probleem en niet een probleem met de `electron` npm package. Errors zoals `ELIFECYCLE` `EAI_AGAIN`, `ECONNRESET` en `ETIMEDOUT` zijn indicaties van dergelijke netwerkproblemen. De beste oplossing is om te proberen de netwerkverbinding te wijzigen of even te wachten en de installatie opnieuw uit te voeren.

Je kunt ook Electron direct hieronder proberen [electron/electron/releases](https://github.com/electron/electron/releases) te downloaden als de installatie via `npm` blijft mislukken.

## Wanneer wordt Electron geüpgraded naar de nieuwste versie van Chrome?

De Chrome-versie van Electron wordt meestal binnen een week of twee later geïmplementeerd nadat er een nieuwe stabiele versie voor Chrome is uitgebracht. Deze schatting is niet gegarandeerd en hangt af van de hoeveelheid werk die gemoeid is met upgraden.

Alleen het stabiele kanaal van Chrome wordt gebruikt. Als een belangrijke fix in beta of desv kanaal is, zullen we deze backporten.

Raadpleeg de [beveiligingsintroductie](tutorial/security.md) voor meer informatie.

## Wanneer word Electron geüpgrade worden naar de laatste Node.js?

Zodra een nieuwe versie van Node.js uitgebracht word, wachten wij ongeveer een maand voordat wij upgraden. Op die manier kunnen wij voorkomen dat bugs ons beïnvloeden.

Nieuwe functionaliteiten van Node.js worden meestal mogelijk gemaakt door V8-upgrades. Aangezien Electron de met Chrome-browser meegeleverde V8 gebruikt, moet u de nieuwe JavaScript-functies gebruiken De nieuwe Node.js-versie is meestal al beschikbaar in Electron.

## Data delen tussen webpagina's.

Om data te delen tussen webpagina's (de rendere processes) is het het gemakkelijkst om de HTML5 APIs te gebruiken die al beschikbaar zijn in browsers. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Of je kunt het IPC systeem, specifiek voor Electron, gebruiken om objecten in het hoofdproces als een globale variabele op te slaan, en deze dan te kunnen gebruiken vanuit de renderers via gebruik van de `remote` property van de `electron` module:

```javascript
// In het main proces.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Het werkvak van mijn app verdween na een paar minuten.

Dit gebeurt wanneer de variabele die wordt gebruikt om het systeemvak op te slaan, garbage collected krijgt.

Wanneer je dit probleem tegenkomt, zullen de volgende artikelen misschien van pas komen:

* [Geheugenbeheer][memory-management]
* [Variabel bereik][variable-scope]

Als je een snelle oplossing zoekt, kun je de variabelen globaal maken door de code te veranderen naar het volgende:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hallo wereld')
})
```

naar dit:

```javascript
const { app, Tray } = require('electron')
laat tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hallo wereld')
})
```

## Ik kan geen jQuery/RequireJS/Meteor/AngularJS gebruiken in Electron.

Vanwege de Node.js integratie van Electron zijn er een aantal extra symbolen aan de DOM toegevoegd, zoals `module`, `exports` en `require`. Dit kan problemen veroorzaken voor sommige bibliotheken omdat ze symbolen met dezelfde namen willen toevoegen.

Om dit op te lossen kan je de node integratie uitschakelen in Electron:

```javascript
// In het main proces.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Maar als je de mogelijkheden wilt behouden om Node.js en Electron API's te gebruiken, moet je de symbolen in de pagina hernoemen voordat je andere bibliotheken kunt opnemen:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined.

Bij het gebruik van de ingebouwde module van Electron, zou u een fout kunnen tegenkomen zoals deze:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Het is zeer waarschijnlijk dat u de module in het verkeerde proces gebruikt. Bijvoorbeeld `electron.app` kan alleen worden gebruikt in het hoofdproces, terwijl `electron.webFrame` alleen beschikbaar is in renderer processen.

## Het lettertype ziet er wazig, wat is dit en wat kan ik doen?

Als [subpixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is gedeactiveerd, dan kunnen lettertypen op LCD-schermen er wazig uitzien. Voorbeeld:

![subpixel rendering example][]

Sub-pixel anti-aliasing heeft een niet-transparante achtergrond nodig van de laag die de lettertype symbolen bevat. (Zie [dit probleem](https://github.com/electron/electron/issues/6344#issuecomment-420371918) voor meer informatie).

To achieve this goal, set the background in the constructor for [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
laat winnen = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Zelfs als je geen verschil ziet, kunnen sommige gebruikers dat doen. Het is het beste om de achtergrond altijd op deze manier in te stellen, tenzij er redenen zijn om dat niet te doen.

Merk op dat het instellen van de achtergrond in de CSS niet het gewenste effect heeft.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[browser-window]: api/browser-window.md
[subpixel rendering example]: images/subpixel-rendering-screenshot.gif
