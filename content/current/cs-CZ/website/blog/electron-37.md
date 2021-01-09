---
title: Co je nového v Electronu 0.37
author: zeke
date: '2016-03-25'
---

Elektron `0. 7` byl nedávno [vydán](https://github.com/electron/electron/releases) a zahrnoval významnou aktualizaci z prohlížeče Chrome 47 na Chrome 49 a také několik nových základních API. Tato nejnovější verze přináší všechny nové funkce dodané v [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) a [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). To zahrnuje vlastní vlastnosti CSS, zvýšenou podporu [ES6](http://www.ecma-international.org/ecma-262/6.0/) , `vylepšení klávesnice` , `Promise` vylepšení a mnoho dalších funkcí, které jsou nyní k dispozici ve vaší Electronové aplikaci.

---

## Co je nového

### CSS Custom Properties

Pokud jste použili předem zpracované jazyky jako Sass and Less, pravděpodobně znáte *proměnné*, které umožňují definovat opakovaně použitelné hodnoty pro věci jako barevná schémata a rozložení. Proměnné pomáhají udržovat vaše styly DRY a více udržovatelné.

Vlastní vlastnosti CSS jsou podobné předzpracovaným proměnným v tom, že jsou znovu použitelné, ale mají také jedinečnou kvalitu, díky níž jsou ještě výkonnější a pružnější: **je lze manipulovat s JavaScriptem**. Tato jemná, ale výkonná funkce umožňuje dynamické změny vizuálních rozhraní při současném využití hardwarového zrychlení [CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), a snížené zdvojování kódu mezi vaším kódem webu a stylem.

Další informace o vlastních vlastnostech CSS naleznete v [MDN článku](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) a [Google Chrome demo](https://googlechrome.github.io/samples/css-custom-properties/).

#### CSS proměnné v akci

Procházejme jednoduchý příklad proměnné, který může být upraven v aplikaci živý.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

Hodnotu proměnné lze získat a změnit přímo v JavaScriptu:

```js
// Získejte hodnotu proměnné ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Nastavte hodnotu proměnné na 'orange'
document.body.style.setProperty('--awesome-color', 'orange')
```

Hodnoty proměnných lze také upravit z **Styles** ve vývojových nástrojích pro rychlou zpětnou vazbu a vylepšení:

![CSS vlastnosti v záložce Styles](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `Klávesnice Event.code` Vlastnost

Chrome 48 přidal novou vlastnost `kódu` k dispozici na `událostech klávesnice` , které budou fyzické stisknuty nezávisle na rozložení klávesnice operačního systému.

To by mělo zvýšit přesnost a konzistentnost implementace vlastních klávesových zkratek ve vaší aplikaci Electron.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} byl stisknut.`)
})
```

Podívejte se na [tento příklad](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) a uvidíte ho v akci.

### Události odmítnutí

Chrome 49 přidal dvě nové `okna` události, které vám umožní být upozorněny, když odmítnuté [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) zůstane bez manipulace.

```js
window.addEventListener('unhandledrejection', funkce (event) {
  console.log('Odmítnutý slib byl neovládaný', event.promise, event.reason)
})

window. ddEventListener('rejectionhandled', funkce (event) {
  console.log('A rejected promise was handled', event.promise, event.reason)
})
```

Podívejte se na [tento příklad](https://googlechrome.github.io/samples/promise-rejection-events/index.html) a uvidíte ho v akci.

### Nařízení Evropského parlamentu a Rady (EU) č. 1306/2013 ze dne 17. prosince 2013 o financování, řízení a sledování společné zemědělské politiky a o zrušení nařízení Rady (EHS) č. 352/78, (ES) č. 165/94, (ES) č. 2799/98, (ES) č. 1290/2005 a (ES) č. 485/2008 (Úř. věst.

Verze V8 nyní v Electronu zahrnuje [91% z ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Zde je několik zajímavých doplňků, které můžete použít mimo krabici — bez příznaků nebo předkompilátorů:

#### Výchozí parametry

```js
funkce multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Destructuring assignment

Chrome 49 přidal [destruktivní zadání](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) , aby bylo mnohem snazší přiřazení proměnných a funkčních parametrů.

To činí Electron vyžaduje čistší a kompaktnější přiřadit:

##### Vyžaduje proces prohlížeče

```js
const {app, BrowserWindow, Menu} = vyžadováno ('electron')
```

##### Vyžaduje proces vykreslování

```js
const {dialog, Tray} = vyžadováno ('electron').remote
```

##### Jiné příklady

```js
// zničení pole a přeskočení druhého prvku
soust [první, , posled] = findAll()

// zničení funkčních parametrů
funkce whois({displayName: displayName, fullname: {firstName: name}}){
  konzola. og(`${displayName} je ${name}`)
}

uživatel = {
  displayName: "jdoe",
  celé jméno: {
      křestní jméno: "John",
      poslední jméno: "Doe"
  }
}
whois(user) // "jdoe je John"

// zničení objektu
let {name, avatar} = getUser()
```

## Nová Electron API

Několik nových API Electron je níže, můžete vidět každé nové API v poznámkách k vydání [Electron releasases](https://github.com/electron/electron/releases).

#### `zobrazit` a `skrýt` události v `okně prohlížeče`

Tyto události jsou emitovány, když je okno zobrazeno nebo skryté.

```js
const {BrowserWindow} = require('electron')

let okno = nové okno BrowserWindow({width: 500, height: 500})
. n('show', funkce () { console.log('Window was shown') })
window.on('hide', funkce () { console.log('Window was hidden') })
```

#### `změněna platforma` na `aplikaci` pro `OS X`

Tato událost je aktivována, když je přepínán [Tmavý režim](https://discussions.apple.com/thread/6661740) systému.

```js
const {app} = require('electron')

app.on('platform-theme-changed', funkce () {
  console.log(`Šablona platformy změněna. V tmavém režimu? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` pro `OS X`

Tato metoda vrátí `true` , pokud je systém v tmavém režimu a `nepravý` v opačném smyslu.

#### `posouvat události při startu` a `posouvat dotyk` do BrowserWindow pro `OS X`

Tyto události jsou emitovány, když fáze události posuvného kola začala nebo skončila.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', funkce () { console. og('Scroll touch started') })
window.on('scroll-touch-end', funkce () { console.log('Scroll touch ended') })
```

