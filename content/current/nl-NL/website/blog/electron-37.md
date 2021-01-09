---
title: Wat is er nieuw in Electron 0.37
author: zeke
date: '2016-03-25'
---

Electron `0. 7` werd onlangs [vrijgegeven](https://github.com/electron/electron/releases) en bevatte een belangrijke upgrade van Chrome 47 naar Chrome 49 en ook meerdere nieuwe core API's. Deze laatste versie bevat alle nieuwe functies die zijn verzonden in [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) en [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Dit omvat CSS aangepaste eigenschappen, verhoogd [ES6](http://www.ecma-international.org/ecma-262/6.0/) ondersteuning, `KeyboardEvent` verbeteringen, `Belofte` verbeteringen, en veel andere nieuwe functies zijn nu beschikbaar in de Electron app.

---

## Wat is nieuw

### CSS Custom Properties

Als je vooraf verwerkte talen zoals Sass en Less, hebt gebruikt, ben je waarschijnlijk bekend met *variabelen*, waarmee u herbruikbare waarden kunt definiëren voor zaken zoals kleurschema's en lay-outs. Variabelen helpen je stylesheets DRY en beter onderhouden.

Aangepaste CSS-eigenschappen zijn vergelijkbaar met preverwerkte variabelen in dat ze herbruikbaar zijn maar ze hebben ook een unieke kwaliteit die ze nog krachtiger en flexibeler maakt: **ze kunnen worden gemanipuleerd met JavaScript**. Deze subtiele maar krachtige functie maakt dynamische veranderingen naar visuele interfaces mogelijk, terwijl ze nog steeds profiteren van [CSS-hardwareversnelling](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), en verminderde dubbele code tussen uw frontend code en stylesheets.

Zie het [MDN-artikel](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) en de [Google Chrome demo](https://googlechrome.github.io/samples/css-custom-properties/) voor meer info over aangepaste CSS-eigenschappen.

#### CSS variabelen In actie

Laten we door een eenvoudig variabele voorbeeld lopen dat live aangepast kan worden in je app.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

De variabele waarde kan direct in JavaScript worden opgehaald en gewijzigd:

```js
// Haal de variabele waarde ' #A5ECFA'
let kleur = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Stel de variabele waarde in op 'oranje'
document.body.style.setProperty('--awesome-color', 'orange')
```

De variabele waarden kunnen ook worden bewerkt vanuit de **stijlen** sectie van de ontwikkeltools voor snelle feedback en tweaks:

![CSS-eigenschappen in het tabblad stijlen](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` Eigenschap

Chrome 48 heeft de nieuwe `code` eigenschap toegevoegd die beschikbaar is op `KeyboardEvent` gebeurtenissen die de fysieke sleutel zullen zijn ingedrukt, onafhankelijk van de operating systeem toetsenbord lay-out.

Dit zou het implementeren van aangepaste sneltoetsen in je Electron app nauwkeuriger en consistenter moeten maken tussen machines en configuraties.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} werd ingedrukt.`)
})
```

Bekijk [dit voorbeeld](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) om het in actie te zien.

### Belofte Afwijzing Gebeurtenissen

Chrome 49 heeft twee nieuwe `venster` gebeurtenissen toegevoegd waarmee je op de hoogte gebracht kan worden wanneer een afgewezen [belofte](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) niet wordt behandeld.

```js
window.addEventListener('unhandledrejection', functie (event) {
  console.log('Een afgewezen belofte was afgehandeld', event.promise, event.reason)
})

venster. ddEventListener('rejectionhandled', function (event) {
  console.log('Een geweigerde belofte werd afgehandeld', event.promise, event.reason)
})
```

Bekijk [dit voorbeeld](https://googlechrome.github.io/samples/promise-rejection-events/index.html) om het in actie te zien.

### ES2015 Updates in V8

De versie van V8 nu in Electron bevat [91% van ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Hier zijn een paar interessante toevoegingen die je uit het vak kan gebruiken — zonder vlaggen of pre-compilers:

#### Standaard parameters

```js
functie multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Destructuring assignment

Chrome 49 heeft [destructurerende toewijzing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) toegevoegd om het ontwerp van variabelen en functieparameters veel gemakkelijker te maken.

Dit maakt Electron schoner en compacter om nu toe te kennen:

##### Browser proces vereist

```js
const {app, BrowserWindow, Menu} = benodigd ('electron')
```

##### Renderer-proces vereist

```js
const {dialog, Tray} = benodigd ('electron').remote
```

##### Andere voorbeelden

```js
// Vernietigen van een array en overslaan het tweede element
const [eerst, , last] = findAll()

// Verwoestings functie parameters
functie whois({displayName: displayName, fullName: {firstName: name}}){
  console. og(`${displayName} is ${name}`)
}

let gebruiker = {
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      lastName: "Doe"
  }
}
whois(user) // "jdoe is John"

// Vernietiging van een object
let {name, avatar} = getUser()
```

## Nieuwe Electron API's

Enkele van de nieuwe Electron API's zijn hieronder, u kunt elke nieuwe API zien in de release notities voor [Electron releases](https://github.com/electron/electron/releases).

#### `toon` en `verberg` gebeurtenissen in `Browservenster`

Deze gebeurtenissen worden uitgestoten wanneer het venster wordt getoond of verborgen.

```js
const {BrowserWindow} = require('electron')

laat venster = new BrowserWindow({width: 500, height: 500})
venster. n('show', function () { console.log('Window werd getoond') })
window.on('hide', function () { console.log('Window was verborgen') })
```

#### `platform-theme-changed` on `app` for `OS X`

Dit evenement wordt uitgestoten wanneer het thema [Donkere modus](https://discussions.apple.com/thread/6661740) van het systeem is ingeschakeld.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform thema gewijzigd. In donkere modus? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` voor `OS X`

Deze methode geeft `waar` als het systeem in Donkere modus is en `onwaar` anders.

#### `scroll-touch-start` en `scroll-touch-end` events voor BrowserWindow voor `OS X`

Deze gebeurtenissen worden uitgestoten wanneer de fase van het scrollwiel is begonnen of is beëindigd.

```js
const {BrowserWindow} = require('electron')

let venster = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Scroll touch sterted') })
window.on('scroll-touch-end', function () { console.log('Scroll touch geëindigd) })
```

