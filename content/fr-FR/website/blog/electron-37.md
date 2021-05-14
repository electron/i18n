---
title: Les nouveautés d'Electron 0.37
author: zeke
date: '2016-03-25'
---

Electron `0. 7` a été récemment [publié](https://github.com/electron/electron/releases) et a inclus une mise à jour majeure de Chrome 47 à Chrome 49 et également plusieurs nouvelles API de base. Cette dernière version apporte toutes les nouvelles fonctionnalités livrées dans [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) et [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Cela inclut les propriétés CSS personnalisées, la prise en charge de [ES6](http://www.ecma-international.org/ecma-262/6.0/) , les améliorations de `KeyboardEvent` `Proposez` des améliorations, et de nombreuses autres nouvelles fonctionnalités maintenant disponibles dans votre application Electron.

---

## Quoi de neuf

### CSS Custom Properties

Si vous avez utilisé des langages prétraités comme Sass et Less, vous êtes probablement familier avec les variables **, qui vous permettent de définir des valeurs réutilisables pour des choses comme les modèles de couleurs et les mises en page. Les variables aident à garder vos feuilles de style sèches et plus maintenables.

Les propriétés personnalisées CSS sont similaires aux variables prétraitées dans la mesure où elles sont réutilisables, mais ils ont également une qualité unique qui les rend encore plus puissants et flexibles : **ils peuvent être manipulés avec JavaScript**. Cette fonctionnalité subtile mais puissante permet des changements dynamiques aux interfaces visuelles tout en profitant de [l'accélération matérielle du CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), et réduit la duplication de code entre votre code frontend et vos feuilles de style.

Pour plus d'informations sur les propriétés personnalisées CSS, voir l'article [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) et la [démo Google Chrome](https://googlechrome.github.io/samples/css-custom-properties/).

#### Variables CSS en action

Voyons un exemple de variable simple qui peut être ajusté en direct dans votre application.

```css
:root {
  --awesome-color: #A5ECFA;
}

corps {
  background-color: var(--awesome-color);
}
```

La valeur de la variable peut être récupérée et modifiée directement en JavaScript:

```js
// Récupère la valeur de la variable ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Définit la valeur de la variable à 'orange'
document.body.style.setProperty('--awesome-color', 'orange')
```

Les valeurs de la variable peuvent également être modifiées à partir de la section **Styles** des outils de développement pour un feedback rapide et des ajustements :

![Propriétés CSS dans l'onglet Styles](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` Propriété

Chrome 48 a ajouté la nouvelle propriété `code` disponible sur les événements `KeyboardEvent` qui seront la touche physique pressée indépendamment de la disposition du clavier du système d'exploitation.

Cela devrait rendre l'implémentation de raccourcis clavier personnalisés dans votre application Electron plus précise et plus cohérente entre les machines et les configurations.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} a été pressé.`)
})
```

Consultez [cet exemple](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) pour le voir en action.

### Événements de rejet de promesse

Chrome 49 a ajouté deux nouveaux événements `fenêtre` </code> qui vous permettent d'être notifié lorsqu'une [promesse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) rejetée n'est pas gérée.

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('Une promesse rejetée n'a pas été gérée', event.promise, event.reason)
})

window.addEventListener('rejectionhandled', function (événement) {
  console.log('Une promesse rejetée a été gérée', event.promise, event.reason)
})
```

Consultez [cet exemple](https://googlechrome.github.io/samples/promise-rejection-events/index.html) pour le voir en action.

### Mises à jour ES2015 en V8

La version de V8 maintenant dans Electron incorpore [91 % de ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Voici quelques ajouts intéressants que vous pouvez utiliser sans options ni pré-compilateurs :

#### Paramètres par défaut

```js
function multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Affectation par décomposition

Chrome 49 a ajouté [l'affectation destructrice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) pour faciliter l'affectation des variables et des paramètres de fonction.

Cela rend Electron plus propre et plus compact à assigner maintenant :

##### Le processus du navigateur nécessite

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Processus de rendu requis

```js
const {dialog, Tray} = require('electron').distant
```

##### Autres exemples

```js
// Déstructuration d'un tableau et ignore le deuxième élément
const [d'abord, , , last] = findAll()

// Destruction des paramètres de la fonction
function whois({displayName: displayName, fullName: {firstName: name}}){
  console. og(`${displayName} est ${name}`)
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

## Nouvelles API Electron

Quelques unes des nouvelles API d'Electron sont ci-dessous, vous pouvez voir chaque nouvelle API dans les notes de publication pour [Electron releases](https://github.com/electron/electron/releases).

#### `afficher les événements` et `masquer` sur `BrowserWindow`

Ces événements sont émis lorsque la fenêtre est affichée ou masquée.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
. n('show', function () { console.log('Window was shown') })
window.on('hide', function () { console.log('Window was hidden') })
```

#### `platform-theme-changed` sur `app` pour `OS X`

Cet événement est émis lorsque le thème [Mode Sombre](https://discussions.apple.com/thread/6661740) du système est basculé.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Thème de la plate-forme modifiée. En mode sombre ? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` pour `OS X`

Cette méthode retourne `true` si le système est en mode foncé et `false` sinon.

#### `scroll-touch-start` et `scroll-touch-end` événements jusqu'à BrowserWindow pour `OS X`

Ces événements sont émis lorsque la phase de la roue de défilement a commencé ou est terminée.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Scroll touch started') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```

