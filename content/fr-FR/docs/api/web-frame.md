# webFrame

> Personnaliser le rendu de la page web actuelle.

Processus : [Renderer](../glossary.md#renderer-process)

Un exemple d'un zoom de 200% de la page actuelle.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Méthodes

Le module `webFrame` dispose des méthodes suivantes :

### `webFrame.setZoomFactor(factor)`

* `factor` Number - Facteur de zoom.

Change le facteur de zoom par le facteur spécifié. Le facteur de zoom est le pourcentage divisé par 100, donc 300% = 3.0.

### `webFrame.getZoomFactor()`

Retourne `Number` - Le facteur de zoom actuel.

### `webFrame.setZoomLevel(level)`

* `level` Number - Niveau de zoom

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement.

### `webFrame.getZoomLevel()`

Retourne `Number` - Le niveau de zoom actuel.

### `webFrame.setZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

**Déprécié :** Utilisez `setVisualZoomLevelLimits` à la placepour définir les limites de niveau du zoom visuel. Cette méthode sera supprimée dans Electron 2.0.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Définit le maximum et minimum du niveau de zoom axée sur la mise en page (c'est-à-dire non visuels).

### `webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)`

* `language` String
* `autoCorrectWord` Boolean
* `provider` Object 
  * `spellCheck` Function - Retourne `Boolean` 
    * `text` String

Définit un fournisseur pour la correction orthographique dans les champs de saisie et les zones de texte.

Le `provider` doit être un objet contenant la méthode `spellCheck` qui indiquera si le mot donné est correctement orthographié.

Un exemple d'utilisation de [node-spellchecker](https://github.com/atom/node-spellchecker) comme fournisseur :

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('fr-FR', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsSecure(scheme)`

* `scheme` String

Enregistre le `scheme` comme schéma sécurisé.

Les schémas sécurisés ne déclenchent pas d'avertissements de contenu mixtes. Par exemple, `https` et `data` sont des schémas sécurisés car il ne peuvent pas être altérées par des attaquants de réseau actif.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` String

Des ressources seront chargées de ce `scheme` quelle que soit la politique de sécurité de la page courante.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` String
* `options` Object (facultatif) 
  * `secure` Boolean - (facultatif) true par défaut.
  * `bypassCSP` Boolean - (facultatif) true par défaut.
  * `allowServiceWorkers` Boolean - (facultatif) true par défaut.
  * `supportFetchAPI` Boolean - (facultatif) true par défaut.
  * `corsEnabled` Boolean - (facultatif) true par défaut.

Registers the `scheme` as secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify an option with the value of `false` to omit it from the registration. An example of registering a privileged scheme, without bypassing Content Security Policy:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

Inserts `text` to the focused element.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.
* `callback` Function (optional) - Called after script has been executed. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

### `webFrame.getResourceUsage()`

Retourne `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const {webFrame} = require('electron')
console.log(webFrame.getResourceUsage())
```

Cela va générer :

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* pareil qu'avec "images" */ },
  xslStyleSheets: { /* pareil qu'avec "images" */ },
  fonts: { /* pareil qu'avec "images" */ },
  other: { /* pareil qu'avec "images" */ }
}
```

### `webFrame.clearCache()`

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).