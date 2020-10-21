---
title: Cosa c'è di nuovo in Electron 0.37
author: zeke
date: '2016-03-25'
---

Electron `0. 7` è stato recentemente [rilasciato](https://github.com/electron/electron/releases) e incluso un importante aggiornamento da Chrome 47 a Chrome 49 e anche diverse nuove API di base. Questa ultima versione porta in tutte le nuove funzionalità spedite in [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) e [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Questo include proprietà personalizzate CSS, supporto [ES6](http://www.ecma-international.org/ecma-262/6.0/) , miglioramenti `KeyboardEvent` , `Promise` miglioramenti, e molte altre nuove funzionalità ora disponibili nella tua app Electron.

---

## Novità

### CSS Custom Properties

Se hai usato lingue preelaborate come Sass e Less, probabilmente conosci le variabili **, che consentono di definire valori riutilizzabili per cose come schemi di colori e layout. Le variabili aiutano a mantenere i tuoi fogli di stile DRY e più mantenibili.

Le proprietà personalizzate CSS sono simili alle variabili preelaborate in quanto riutilizzabili, ma hanno anche una qualità unica che li rende ancora più potenti e flessibili: **possono essere manipolati con JavaScript**. Questa caratteristica sottile ma potente consente di modificare dinamicamente le interfacce visive pur beneficiando dell'accelerazione hardware di [CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), e la duplicazione di codice ridotta tra il codice del frontend e i fogli di stile.

Per ulteriori informazioni sulle proprietà personalizzate CSS, vedere l'articolo [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) e la demo [di Google Chrome](https://googlechrome.github.io/samples/css-custom-properties/).

#### Variabili CSS In Azione

Camminiamo attraverso un semplice esempio di variabile che può essere modificato in diretta nella tua app.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

Il valore della variabile può essere recuperato e modificato direttamente in JavaScript:

```js
// Ottieni il valore variabile ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Imposta il valore variabile a 'orange'
document.body.style.setProperty('--awesome-color', 'orange')
```

I valori della variabile possono essere modificati anche dalla sezione **Stili** degli strumenti di sviluppo per un feedback rapido e dei tweak:

![Proprietà CSS nella scheda Stili](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` Property

Chrome 48 ha aggiunto la nuova proprietà `code` disponibile su `KeyboardEvent` eventi che saranno il tasto fisico premuto indipendentemente dal layout della tastiera del sistema operativo.

Questo dovrebbe rendere l'implementazione di scorciatoie da tastiera personalizzate nell'app Electron più accurate e coerenti tra macchine e configurazioni.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} was pressed.`)
})
```

Dai un'occhiata a [questo esempio](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) per vederlo in azione.

### Eventi Di Rifiuto Promessa

Chrome 49 ha aggiunto due nuovi `finestra` eventi che consentono di essere avvisati quando una [Promessa rifiutata](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) non viene gestita.

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('A rejected promise was unhandled', event.promise, event.reason)
})

window. ddEventListener('rejectionhandled', function (event) {
  console.log('Una promessa rifiutata è stata gestita', event.promise, event.reason)
})
```

Dai un'occhiata a [questo esempio](https://googlechrome.github.io/samples/promise-rejection-events/index.html) per vederlo in azione.

### Aggiornamenti ES2015 in V8

La versione di V8 ora in Electron incorpora [91% di ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Ecco alcune aggiunte interessanti che puoi utilizzare fuori dalla scatola: senza bandiere o pre-compilatori:

#### Parametri predefiniti

```js
function multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Destructuring assignment

Chrome 49 ha aggiunto [distruggendo l'assegnazione](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) per rendere molto più facile l'assegnazione di variabili e parametri di funzione.

Questo rende Electron richiede più pulito e più compatto per assegnare ora:

##### Processo Di Browser Richiede

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Richiede Il Processo Del Renderer

```js
const {dialog, Tray} = require('electron').remote
```

##### Altri Esempi

```js
// Destructuring an array and skipping the second element
const [first, , , last] = findAll()

// Destructuring function parameters
function whois({displayName: displayName, fullName: {firstName: name}}){
  console. og(`${displayName} è ${name}`)
}

let user = {
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      lastName: "Doe"
  }
}
whois(user) // "jdoe is John"

// Destructuring an object
let {name, avatar} = getUser()
```

## Nuove API Electron

Alcune delle nuove API Electron sono qui sotto, puoi vedere ogni nuova API nelle note di rilascio per le versioni [Electron](https://github.com/electron/electron/releases).

#### `mostra` e `nascondi` eventi su `BrowserWindow`

Questi eventi vengono emessi quando la finestra viene mostrata o nascosta.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window. n('show', function () { console.log('Window was shown') })
window.on('hide', function () { console.log('Window was hidden') })
```

#### `platform-theme-changed` on `app` for `OS X`

Questo evento viene emesso quando il tema [Modalità scura](https://discussions.apple.com/thread/6661740) del sistema viene attivato.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform theme changed. In modalità scura? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` per `OS X`

Questo metodo restituisce `true` se il sistema è in Modalità Oscura e `false` altrimenti.

#### `scroll-touch-start` and `scroll-touch-end` events to BrowserWindow for `OS X`

Questi eventi vengono emessi quando la fase dell'evento della rotella è iniziata o è terminata.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Scroll touch started') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```

