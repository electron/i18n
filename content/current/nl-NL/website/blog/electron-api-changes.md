---
title: API wijzigingen die beschikbaar zijn in Electron 1.0
author: zcbenz
date: '2015-11-17'
---

Sinds het begin van Electro, vanaf een stap terug toen dat vroeger Atom-Shell heette, we zijn aan het experimenteren met het bieden van een leuke cross-platform JavaScript API voor Chromium's inhoudsmodule en native GUI-componenten. De API's zijn zeer organisch van start gegaan en in de loop der tijd hebben wij verschillende wijzigingen aangebracht om de oorspronkelijke ontwerpen te verbeteren.

---

Nu Electron zich ontwikkelt voor een 1.0 release, willen we van de gelegenheid gebruik maken om te veranderen door in te gaan op de laatste niggling API details. De hieronder beschreven wijzigingen zijn opgenomen in **0,35.**, met de oude API's waarschuwingen, zodat je up to date kunt voor de toekomstige versie 1.0. Een Electron 1.0 zal enkele maanden niet meer leeg zijn, dus u heeft wat tijd voordat deze wijzigingen gaan vastlopen.

## Afscheidingswaarschuwingen

Standaard worden waarschuwingen weergegeven als je verouderde API's gebruikt. Om ze uit te zetten kun je `process.noDeprecation` instellen op `true`. Om de bronnen van verouderd API-gebruik te volgen, kunt u het proces `instellen. hrowDeprecation` to `true` to throw uitzonderingen in plaats van het printen van waarschuwingen, of stel `proces in. raceDeprecation` to `true` om de sporen van de afkeuringen af te drukken.

## Nieuwe manier om ingebouwde modules te gebruiken

Ingebouwde modules zijn nu gegroepeerd in één module, in plaats van ingedeeld in onafhankelijke modules, dus je kunt ze gebruiken [zonder conflicten met andere modules](https://github.com/electron/electron/issues/387):

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

De oude manier van `require('app')` wordt nog steeds ondersteund voor achterwaartse compatibiliteit, maar je kunt ook uitzetten als je dit uitschakelt:

```javascript
require('electron').hideInternalModules()
require('app') // gooit fout.
```

## Een makkelijkere manier om de `externe` module te gebruiken

Vanwege de manier waarop het gebruik van ingebouwde modules is veranderd, hebben we het makkelijker gemaakt om hoofdprocess-side modules te gebruiken in het renderer-proces. U kunt nu enkel toegang krijgen tot `externe`attributen om ze te gebruiken:

```javascript
// Nieuwe manier.
var app = require('electron').remote.app
var BrowserWindow = benodigd ('electron').remote.BrowserWindow
```

In plaats van een lange ketting te gebruiken:

```javascript
// Oude manier.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Splitsen van de `ipc` module

De `ipc` module bestond zowel op het hoofdproces als op het renderer proces en de API was verschillend aan beide kanten. wat verwarrend is voor nieuwe gebruikers. We hebben de module hernoemd naar `ipcMain` in het hoofdproces, en `ipcRenderer` in het renderer proces om verwarring te voorkomen:

```javascript
// In main process.
var ipcMain = require('electron').ipcMain
```

```javascript
// In het renderer-proces.
var ipcRenderer = require('electron').ipcRenderer
```

En voor de `ipcRenderer` module, is er een extra `gebeurtenis` object toegevoegd bij het ontvangen van berichten, om overeen te komen hoe berichten worden behandeld in `ipcMain` modules:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Opties `Browserwindow` standaardiseren

De `BrowserWindow` opties hadden verschillende stijlen gebaseerd op de opties van andere API's, en waren een beetje moeilijk te gebruiken in JavaScript vanwege de `-` in de namen. Ze zijn nu gestandaardiseerd naar de traditionele JavaScript-namen:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Volgt de DOM-conventies voor API-namen

De API-namen in Electron gebruiken om camelCase te verkiezen voor alle API-namen, zoals `Url` naar `URL`, maar het DOM heeft zijn eigen conventies, en ze geven de voorkeur aan `URL` boven `Url`, terwijl `Id` gebruikt in plaats van `ID`. We hebben de volgende API hernamen gedaan om te voldoen aan de DOM's stijlen:

* `URL` is hernoemd naar `URL`
* `Csp` is hernoemd naar `CSP`

Als gevolg van deze wijzigingen zal je veel deprecations merken wanneer je Electron v0.35.0 voor je app gebruikt. Een eenvoudige manier om deze op te lossen is door alle exemplaren van `Url` te vervangen door `URL`.

## Wijzigingen in `Tray`'s gebeurtenisnamen

De stijl van `Tray` event namen waren een beetje anders dan andere modules dus er is een hernoem gedaan om het overeen te laten komen met de anderen.

* `geklikt` is hernoemd naar `klik`
* `dubbelklik` wordt hernoemd naar `dubbelklik`
* `met de rechtermuisknop` wordt hernoemd naar `rechtsklik`

