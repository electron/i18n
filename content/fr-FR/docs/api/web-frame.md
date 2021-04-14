# webFrame

> Personnaliser le rendu de la page web actuelle.

Processus : [Rendu](../glossary.md#renderer-process)

`webFrame` 'exportation du module Electron est une instance de la classe `WebFrame` représentant le cadre supérieur de l’environnement `BrowserWindow`. Les sous-cadres peuvent être récupérés par certaines propriétés et méthodes (p. ex. `webFrame.firstChild`).

Un exemple d'un zoom de 200% de la page actuelle.

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```

## Méthodes

La `WebFrame` a les méthodes d’instance suivantes :

### `webFrame.setZoomFactor(factor)`

* `factor` Double - Facteur zoom; par défaut est de 1,0.

Modifie le facteur de zoom en utilisant le facteur spécifié. Le Zoom factor est égal à la valeur du zoom exprimée en pourcent divisée par 100, donc 300% = 3.0.

Le facteur doit être supérieur à 0,0.

### `webFrame.getZoomFactor()`

Retourne `Number` - Le facteur de zoom actuel.

### `webFrame.setZoomLevel(level)`

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement.

> **NOTE**: La stratégie de zoom au niveau Chrome est de même origine, ce qui signifie que le niveau de zoom pour un domaine spécifique se propage dans toutes les instances de fenêtres avec le même domaine. La différenciation des URL de fenêtre fera fonctionner le zoom par fenêtre.

### `webFrame.getZoomLevel()`

Retourne `Number` - Le niveau de zoom actuel.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

> **NOTE**: Le zoom visuel est désactivé par défaut dans Electron. Pour le ré-activer, appelez :
> 
> ```js
webFrame.setVisualZoomLevelLimits (1, 3)
```

### `webFrame.setSpellCheckProvider (langue, fournisseur)`

* `language` String
* `provider` objet
  * `spellCheck` fonction
    * `words` String
    * `callback` Function
      * `misspeltWords` String

Définit un fournisseur pour la correction orthographique dans les champs de saisie et les zones de texte.

Si vous souhaitez utiliser cette méthode, vous devez désactiver le contrôle orthographié intégré lorsque vous construire la fenêtre.

```js
const mainWindow = nouveau BrowserWindow ({
  webPreferences: {
    spellcheck: false
  }
})
```

Le `provider` doit être un objet qui a une méthode `spellCheck` qui accepte tableau de mots individuels pour la vérification orthographique. La `spellCheck` fonctionne de façon asynchrone et appelle la fonction `callback` avec un tableau de mots d’orthographe lorsqu’il est terminé.

Un exemple d'utilisation de [node-spellchecker][spellchecker] comme fournisseur :

```javascript
const { webFrame } = require ('electron')
const spellChecker = require ('spellchecker')
webFrame.setSpellCheckProvider ('en-US', {
  spellCheck (mots, rappel) {
    setTimeout (() => {
      const spellchecker = require ('spellchecker')
      const mal orthographié = words.filter(x => spellchecker.isMisspelled(x))
      callback (mal orthographié)
    }, 0)
  }
})
```

### `webFrame.insertCSS (css)`

* `css` String - Code source CSS.

Retours `String` - Une clé pour le CSS inséré qui peut plus tard être utilisé pour supprimer CSS via `webFrame.removeInsertedCSS(key)`.

Injecte CSS dans la page Web actuelle et renvoie une clé unique pour la feuille de style insérée.

### `webFrame.removeInsertedCSS (clé)`

* `key` String

Supprime le CSS inséré de la page Web actuelle. La feuille de style est par sa clé, qui est retournée de `webFrame.insertCSS(css)`.

### `webFrame.insertText(text)`

* `text` String

Insère le `text` à l'élément ciblé.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (facultatif) - `false` par défaut.
* `callback` (facultatif) - Appelé après l’exécution du script. Sauf le cadre est suspendu (par exemple en montrant une alerte modale), l’exécution sera synchrone et le rappel sera invoqué avant le retour de la méthode. Par compatibilité avec une ancienne version de cette méthode, le paramètre d’erreur seconde.
  * `result` Any
  * `error` Error

Retours `Promise<any>` - Une promesse qui se résout avec le résultat du code exécuté ou qui est rejetée si l’exécution lance ou entraîne une promesse rejetée.

Évalue le `code` dans la page.

Dans la fenêtre du navigateur, certaines APIs HTML comme `requestFullScreen` peut être invoqué seulement par un geste de l'utilisateur. Définir `userGesture` à `true` supprimera cette limitation.

### `webFrame.executeJavaScriptInIsolatedWorld (worldId, scripts[, userGesture, rappel])`

* `worldId` Integer - L’ID du monde pour exécuter le javascript dans, `0` est le monde principal par défaut (où le contenu s’exécute), `999` est le monde utilisé par la fonction `contextIsolation` d’Electron. Accepte les valeurs dans la fourchette 1.536870911.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (facultatif) - `false` par défaut.
* `callback` (facultatif) - Appelé après l’exécution du script. Sauf le cadre est suspendu (par exemple en montrant une alerte modale), l’exécution sera synchrone et le rappel sera invoqué avant le retour de la méthode.  Par compatibilité avec une ancienne version de cette méthode, le paramètre d’erreur seconde.
  * `result` Any
  * `error` Error

Retours `Promise<any>` - Une promesse qui se résout avec le résultat du code exécuté ou est rejetée si l’exécution ne pouvait pas commencer.

Fonctionne comme `executeJavaScript` mais évalue `scripts` dans un contexte isolé.

Notez que lorsque l’exécution du script échoue, la promesse retournée ne sera rejeter et le `result` serait `undefined`. C’est parce que le chrome n' les erreurs d’expédition de mondes isolés vers des mondes étrangers.

### `webFrame.setIsolatedWorldInfo (worldId, info)`

* `worldId` Integer - L’ID du monde pour exécuter le javascript dans, `0` est le monde par défaut, `999` est le monde utilisé par les électrons `contextIsolation` fonctionnalité. Les extensions Chrome réservent la gamme d’ID en `[1 << 20, 1 << 29)`. Vous pouvez fournir n’importe quel entier ici.
* `info` objet
  * `securityOrigin` String (facultatif) - Origine de sécurité pour le monde isolé.
  * `csp` String (facultatif) - Politique de sécurité du contenu pour le monde isolé.
  * `name` String (facultatif) - Nom pour le monde isolé. Utile dans les devtools.

Définissez l’origine de sécurité, la politique de sécurité du contenu et le nom du monde isolé. Remarque : Si le `csp` est spécifié, le `securityOrigin` doit également être spécifié.

### `webFrame.getResourceUsage()`

Retourne `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Retourne un objet décrivant les informations d'utilisation de caches de mémoire interne de Blink.

```javascript
const { webFrame } = require('electron')
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

### `webFrame.getFrameForSelector (sélecteur)`

* `selector` String - Sélecteur CSS pour un élément cadre.

Renvois `WebFrame` - L’élément cadre dans `webFrame's` un document sélectionné par `selector`, `null` serait retourné si `selector` ne sélectionne pas un cadre ou un si le cadre n’est pas dans le processus de rendu actuel.

### `webFrame.findFrameByName (nom)`

* `name` String

Retours `WebFrame` - Un enfant de `webFrame` avec le `name`fourni, `null` serait retourné s’il n’y a pas un tel cadre ou si le cadre n’est pas dans le processus de rendu actuel.

### `webFrame.findFrameByRoutingId (routingId)`

* `routingId` Integer - Une `Integer` l’id cadre unique dans le processus rendu actuel. Les ID de routage peuvent être récupérés à partir de `WebFrame` instances (`webFrame.routingId`) et sont également transmis par image événements de navigation `WebContents` spécifiques (par exemple. `did-frame-navigate`)

Retours `WebFrame` - qui a la nourriture fournie, `routingId`, `null` si elle n’est pas trouvée.

### `webFrame.isWordMisspelled(word)`

* `word` String - Le mot à orthographié.

Retourne `Boolean` - Vrai si le mot est mal orthographié selon le envoûteur, faux autrement. Si aucun dictionnaire n’est chargé, toujours revenir faux.

### `webFrame.getWordSuggestions (mot)`

* `word` String - Le mot mal orthographié.

Retours `String[]` - Une liste de mots suggérés pour un mot donné. Si le mot est orthographié correctement, le résultat sera vide.

## Propriétés

### `webFrame.top` _Readonly_

Un `WebFrame | null` représentant le cadre supérieur dans la hiérarchie de trame à laquelle `webFrame` appartient, la propriété serait `null` si l’image supérieure n’est pas dans le processus actuel de rendu 'environnement.

### `webFrame.opener` _Readonly_

Un `WebFrame | null` représentant le cadre qui a ouvert `webFrame`, la propriété serait `null` s’il n’y a pas d’ouvreur ou d’ouvreur n’est pas dans le processus de rendu actuel.

### `webFrame.parent` _Readonly_

Un `WebFrame | null` représentant le cadre parent de `webFrame`, la propriété serait `null` si `webFrame` est supérieur ou parent n’est pas dans le processus de rendu actuel.

### `webFrame.firstChild` _Readonly_

Un `WebFrame | null` représentant le premier cadre enfant de `webFrame`, la de propriété serait `null` si `webFrame` n' pas d’enfants ou si le premier enfant n’est pas dans le processus de rendu actuel .

### `webFrame.nextSibling` _Readonly_

Une `WebFrame | null` représentant le cadre frère suivant, la propriété serait `null` si `webFrame` est le dernier cadre de son parent ou si le frère suivant n’est pas dans le processus de rendu actuel .

### `webFrame.routingId` _Readonly_

Un `Integer` l’id cadre unique dans le processus de rendu actuel. Les instances WebFrame distinctes qui se réfèrent au même cadre sous-jacent dans le même `routingId`.

[spellchecker]: https://github.com/atom/node-spellchecker
