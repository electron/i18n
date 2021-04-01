---
title: Was ist neu in Electron 0.37
author: zeke
date: '2016-03-25'
---

Elektron `0. 7` wurde vor kurzem [veröffentlicht](https://github.com/electron/electron/releases) und enthielt ein größeres Upgrade von Chrome 47 auf Chrome 49 sowie mehrere neue Core APIs. Diese neueste Version bringt alle neuen Funktionen ein, die in [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) und [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html) ausgeliefert werden. Dies beinhaltet CSS-benutzerdefinierte Eigenschaften, erweiterte [ES6](http://www.ecma-international.org/ecma-262/6.0/) Unterstützung, `KeyboardEvent` Verbesserungen, `Versprechen,` Verbesserungen, und viele andere neue Funktionen sind jetzt in Ihrer Electron App verfügbar.

---

## Was ist neu

### CSS Custom Properties

Wenn Sie vorgefertigte Sprachen wie Sass und Weniger verwendet haben, sind Sie wahrscheinlich mit *Variablen vertraut*, mit der Sie wiederverwendbare Werte für Dinge wie Farbschemata und Layouts definieren können. Variablen helfen dabei, Ihre Stylesheets DRY und wartbarer zu halten.

CSS-benutzerdefinierte Eigenschaften ähneln vorverarbeiteten Variablen, da sie wiederverwendbar sind aber sie haben auch eine einzigartige Qualität, die sie noch mächtiger und flexibler macht: **sie können mit JavaScript** manipuliert werden. Dieses subtile aber leistungsstarke Feature ermöglicht dynamische Änderungen an visuellen Schnittstellen und profitiert dennoch von der Hardwarebeschleunigung von [CSS,](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), und reduzierte Code-Duplikation zwischen Frontend-Code und Stylesheets.

Weitere Informationen zu CSS-eigenen Eigenschaften finden Sie im [MDN Artikel](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) und in der [Google Chrome Demo](https://googlechrome.github.io/samples/css-custom-properties/).

#### CSS-Variablen in Aktion

Gehen wir durch ein einfaches variables Beispiel, das live in deiner App angepasst werden kann.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

Der Variablenwert kann direkt in JavaScript abgerufen und geändert werden:

```js
// Den Variablenwert ' #A5ECFA'
lassen Sie die Farbe = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Legen Sie den Variablenwert auf 'orange'
document.body.style.setProperty('--awesome-color', 'orange')
```

Die Variablenwerte können auch über den **Styles** Abschnitt der Entwicklungstools bearbeitet werden, um schnelle Rückmeldungen und Optimierungen zu erhalten:

![CSS-Eigenschaften in Styles Tab](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `TastaturEvent.code` Eigenschaft

Chrome 48 hat die neue `Code` Eigenschaft hinzugefügt die auf `KeyboardEvent` Ereignisse die unabhängig vom Betriebssystem-Tastaturlayout gedrückt werden.

Dies sollte die Implementierung benutzerdefinierter Tastaturkürzel in Ihrer Electron-App über Maschinen und Konfigurationen hinweg genauer und konsistenter machen.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} was pressed.`)
})
```

Schauen Sie sich [dieses Beispiel](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) an, um es in Aktion zu sehen.

### Promise Ablehnungsereignisse

Chrome 49 hat zwei neue `-Fenster` Ereignisse hinzugefügt, die es Ihnen erlauben, benachrichtigt zu werden, wenn ein abgelehntes [Versprechen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) nicht verarbeitet wird.

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('Ein abgelehntes Versprechen wurde nicht behandelt', event.promise, event.reason)
})

Fenster. ddEventListener('rejectionhandled', function (event) {
  console.log('A rejected promise was handled', event.promise, event.reason)
})
```

Schauen Sie sich [dieses Beispiel](https://googlechrome.github.io/samples/promise-rejection-events/index.html) an, um es in Aktion zu sehen.

### ES2015 Updates in V8

Die Version von V8 jetzt in Electron beinhaltet [91% von ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Hier sind ein paar interessante Ergänzungen, die Sie aus dem Feld verwenden können – ohne Flaggen oder Vorkompilieren:

#### Standardparameter

```js
multiply(x, y = 1) {
  return x * y


multiply(5) // 5
```

#### Destructuring assignment

Chrome 49 added [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make assigning variables and function parameters much easier.

Dies macht Electron benötigt sauberer und kompakter, um es jetzt zuzuweisen:

##### Browserprozess benötigt

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Renderer-Prozess erfordert

```js
const {dialog, Tray} = require('electron').remote
```

##### Andere Beispiele

```js
// Zerstöre ein Array und überspringe das zweite Element
const [first , last] = findAll()

// Destructuring function parameters
function whois({displayName: displayName, fullName: {firstName: name}}){
  console. og(`${displayName} ist ${name}`)
}

let user = {
  displayName: "jdoe",
  fullName: {
      Vorname: "John",
      lastName: "Doe"
  }
}
whois(user) // "jdoe is John"

// Destructuring an object
let {name, avatar} = getUser()
```

## Neue Electron-APIs

Einige der neuen Electron-APIs sind unten, Sie können jede neue API in den Versionshinweisen für [Electron-Releases](https://github.com/electron/electron/releases) sehen.

#### `Zeige` und `Verstecke` Ereignisse im `BrowserFenster`

Diese Ereignisse werden emittiert, wenn das Fenster entweder angezeigt oder ausgeblendet wird.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window. n('show', function () { console.log('Window was shown') })
window.on('hide', function () { console.log('Window was hidden') })
```

#### `platform-theme-geändert` auf `app` für `OS X`

Dieses Ereignis wird emittiert, wenn das [Dunkler Modus](https://discussions.apple.com/thread/6661740) des Systems ausgeschaltet ist.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform Theme verändert. Im dunklen Modus? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` für `OS X`

Diese Methode gibt `true` zurück, wenn sich das System im Dunklen Modus befindet, und `false` anders.

#### `scroll-touch-start` und `scroll-touch-end` Ereignisse in BrowserWindow für `OS X`

Diese Ereignisse werden emittiert, wenn das Scrollrad Ereignis-Phase begonnen hat oder beendet ist.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Scroll touch started') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```

