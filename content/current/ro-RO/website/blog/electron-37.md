---
title: Ce este nou în Electron 0,37
author: zeke
date: '2016-03-25'
---

Electron `0.37` was recently [released](https://github.com/electron/electron/releases) and included a major upgrade from Chrome 47 to Chrome 49 and also several new core APIs. Această ultimă versiune aduce toate caracteristicile noi expediate în [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) și [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Aceasta include proprietăți personalizate CSS, suport [ES6](http://www.ecma-international.org/ecma-262/6.0/) , `îmbunătățiri pentru tastatură` , `Propune îmbunătățiri` și multe alte funcții noi disponibile acum în aplicația ta Electron.

---

## Ce este nou

### CSS Custom Properties

Dacă ai folosit limbi preprocesate ca Sass și Less, probabil ești familiarizat cu *variabilele*, care vă permit să definiţi valori reutilizabile pentru lucruri cum ar fi schemele de culori şi machete. Variabilele vă ajută să țineți formatele DRY și mai întreținute.

Proprietățile personalizate CSS sunt similare cu variabilele preprocesate prin faptul că sunt reutilizabile, dar au și o calitate unică, care îi face și mai puternici și flexibili: **ei pot fi manipulați cu JavaScript**. Această caracteristică subtilă, dar puternică, permite modificări dinamice ale interfețelor vizuale în timp ce beneficiază în continuare de [accelerarea hardware a CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), si a redus duplicarea codului intre codul din frontend si stilurile de programare.

Pentru mai multe informații despre proprietățile personalizate CSS, consultați [articolul MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) și [Demo Google Chrome](https://googlechrome.github.io/samples/css-custom-properties/).

#### Variabile CSS în acțiune

Hai să trecem printr-un exemplu variabil simplu care poate fi modificat live în aplicația ta.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

Valoarea variabilei poate fi preluată și modificată direct în JavaScript:

```js
// Obține valoarea variabilă ' #A5ECFA'
let culoare = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

/ Setează valoarea variabilă la 'portocaliu'
document.body.style.setProperty('--awesome-color', 'orange')
```

Valorile variabile pot fi de asemenea editate din secțiunea **Stiluri** a uneltelor de dezvoltare pentru feedback rapid și modificări:

![Proprietăți CSS în fila Styles](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `Tastatură.code` Proprietate

Chrome 48 a adăugat noua proprietate `cod` disponibilă pe `evenimente tastatură` care vor fi apăsate independent de configurația tastaturii sistemului de operare.

Acest lucru ar trebui să facă implementarea scurtăturilor personalizate pentru tastatură în aplicația Electron mai precisă și mai consecventă între mașini și configurații.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} a fost apăsat.`)
})
```

Vezi [acest exemplu](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) pentru a-l vedea în acțiune.

### Evenimente de Respingere Promise

Chrome 49 a adăugat două evenimente noi `fereastră` care vă permit să fiți notificat atunci când o [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) nu este tratată.

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('A rejected promise a fost neprocesată', event.promise, event.reason)
})

window. ddEventListener('rejectionhandled', function (event) {
  console.log('O promisiune respinsă a fost gestionată', event.promise, event.reason)
})
```

Vezi [acest exemplu](https://googlechrome.github.io/samples/promise-rejection-events/index.html) pentru a-l vedea în acțiune.

### Actualizări ES2015 în V8

Versiunea V8 acum în Electron încorporează [91% din ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Aici sunt câteva adăugiri interesante pe care le poți folosi din cutie - fără steaguri sau pre-compilare:

#### Parametrii impliciti

```js
multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Destructuring assignment

Chrome 49 a adăugat [destructurare atribuire](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) pentru a face atribuirea variabilelor și a parametrilor funcției mult mai ușor.

Acest lucru face ca Electron să necesite mai curat și mai compact pentru a atribui acum:

##### Procesul de navigare necesită

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Procesul de redare necesită

```js
const {dialog, Tray} = require('electron').remote
```

##### Alte exemple

```js
// Destructurând un array și sărind al doilea element
const [primul, , , last] = findAll()

// Parametrii funcției Destructuring
function whois({displayName: displayName, fullName: {firstName: name}}){
  consolă. og(`${displayName} is ${name}`)
}

let user = {
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      lastName: "Doe"
  }
}
whois(user) // "jdoe is John"

// Destructurarea unui obiect
let {name, avatar} = getUser()
```

## API Electron Nou

Câteva dintre noile API-uri Electron sunt mai jos, puteți vedea fiecare API nou în notele de lansare pentru [Electron releases](https://github.com/electron/electron/releases).

#### `arată` și `ascunde` evenimente pe `Fereastra Browser`

Aceste evenimente sunt emise atunci când fereastra este fie afișată, fie ascunsă.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
. n('show', function () { console.log('Fereastra a fost afişată') })
window.on('hide', function () { console.log('Fereastra a fost ascunsă') })
```

#### `Temă-temă schimbat` pe `aplicație` pentru `OS X`

Acest eveniment este emis atunci când tema [Modul Întunecat](https://discussions.apple.com/thread/6661740) a sistemului este comutată.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`platforma a fost modificată. În modul întunecat? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` pentru `OS X`

Această metodă returnează `true` în cazul în care sistemul este în modul întunecat, și `false` altfel.

#### `scroll-touch-begin` și `evenimente scroll-touch-end` în BrowserWindow pentru `OS X`

Aceste evenimente sunt emise în momentul în care a început sau s-a încheiat etapa de derulare a roții.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-start', function () { consolă. og('Scroll touch started') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```

