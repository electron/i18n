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

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement.

### `webFrame.getZoomLevel()`

Retourne `Number` - Le niveau de zoom actuel.

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
* `provider` Objet 
  * `spellCheck` Function - Retourne `Boolean`. 
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
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

Enregistre le `scheme` comme étant sécurisé, contournant la politique de sécurité du contenu des ressources, permet d'enregistrer ServiceWorker et prend en charge l'API fetch.

Spécifier une option avec la valeur `false` afin de l'omettre de l'enregistrement. Un exemple d'enregistrement d'un schema prioritaire, sans contourner la politique de sécurité du contenu :

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

Insère le `text` à l'élément ciblé.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (facultatif) - `false` par défaut.
* `callback` Function (facultatif) - Appelé après l'exécution du script. 
  * `result` Any

Retourne `Promise` - Une promesse qui se résout avec le résultat du code exécuté ou se rejette si le résultat du code est une promesse rejetée.

Évalue le `code` dans la page.

Dans la fenêtre du navigateur, certaines APIs HTML comme `requestFullScreen` peut être invoqué seulement par un geste de l'utilisateur. Définir `userGesture` à `true` supprimera cette limitation.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (facultatif) - `false` par défaut.
* `callback` Function (facultatif) - Appelé après l'exécution du script. 
  * `result` Any

Work like `executeJavaScript` but evaluates `scripts` in isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`

* `worldId` Integer
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)`

* `worldId` Integer
* `name` String

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`

* `worldId` Integer
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.getResourceUsage()`

Retourne `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Retourne un objet décrivant les informations d'utilisation de caches de mémoire interne de Blink.

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

Tente de libérer de la mémoire qui n'est plus utilisée (comme les images d'une navigation précédente).

Notez que le fait d'appeler aveuglément cette méthode rend probablement Electron plus lent car il devra remplir ces caches vides, vous ne devriez l'appeler que si un événement dans votre application s'est produit vous faisant penser que votre page utilise réellement moins mémoire (c. -à-d. que vous avez navigué d'une page super lourde à une page presque vide, et avez l'intention d'y rester).