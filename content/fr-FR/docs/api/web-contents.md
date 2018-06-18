# webContents

> Contrôle et rendu des pages web.

Processus : [Main](../glossary.md#main-process)

`webContents` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Il est responsable du rendu et du contrôle d'une page web et est une propriété de l'objet [`BrowserWindow`](browser-window.md). Un exemple d'accès à l'objet `webContents` :

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 1500})
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## Méthodes

Ces méthodes sont accessibles depuis le module `webContents` :

```javascript
const {webContents} = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Retourne `WebContents[]` - Un tableau de toutes les instances de `WebContents`. Celui-ci contiendra le contenu web de toutes les fenêtres, webviews, devtools ouverts et pages devtools d'extention en arrière-plan.

### `webContents.getFocusedWebContents()`

Retourne `WebContents` - Le contenu web qui est au premier-plan dans cette application, autrement cela retourne `null`.

### `webContents.fromId(id)`

* `id` Integer

Retourne `WebContents` - Une instance WebContents avec l'ID donné.

## Classe : WebContents

> Affiche et contrôle le contenu d'une instance de BrowserWindow.

Processus : [Main](../glossary.md#main-process)

### Événements d’instance

#### Événement : 'did-finish-load'

Émis lorsque la navigation est fini, par exemple le loader de l'onglet a cessé de tourner, et l'événement `onload` a été émis.

#### Événement : 'did-fail-load'

Retourne :

* `event` Événement
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Cet événement est comme `did-finish-load`, mais il est émis lorsque le chargement a échoué ou a été annulé, par exemple lorsque `window.stop()` est appelé. La liste complète des codes d'erreur et leur signification est disponible [ici](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Événement : 'did-frame-finish-load'

Retourne :

* `event` Événement
* `isMainFrame` Boolean

Émis lorsqu'un frame a fini sa navigation.

#### Événement : 'did-start-loading'

Correspond au moment où le loader de l'onglet commence à tourner.

#### Événement : 'did-stop-loading'

Correspond au moment où le loader de l'onglet arrête de tourner.

#### Événement : 'did-get-response-details'

Retourne :

* `event` Événement
* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String
* `headers` Object
* `resourceType` String

Émis lorsque les détails concernant une ressource demandée sont disponibles. `status` indique la connexion socket pour télécharger la ressource.

#### Événement : 'did-get-redirect-request'

Retourne :

* `event` Événement
* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String
* `headers` Object

Émis lorsqu’une redirection est reçue tout en demandant une ressource.

#### Événement : 'dom-ready'

Retourne :

* `event` Événement

Émis lorsque le document dans le frame donné est chargé.

#### Événement : 'page-favicon-updated'

Retourne :

* `event` Événement
* `favicons` String[] - Tableau d'URLs.

Émis lorsque la page reçoit l’url du favicon.

#### Événement : 'new-window'

Retourne :

* `event` Événement
* `url` String
* `frameName` String
* `disposition` String - Peut être `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` et `other`.
* `options` Object - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - Les fonctionnalités non standards (fonctionnalités non gérés par Chromium ou Electron) donné à `window.open()`.

Émis lorsque la page demande d'ouvrir une nouvelle fenêtre pour une `url`. Cela peut être demandé par `window.open` ou un lien externe avec `<a target='_blank'>`.

Un nouveau `BrowserWindow` sera créé par défaut pour l'`url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. Par exemple :

```javascript
myBrowserWindow.webContents.on('new-window', (event, url) => {
  event.preventDefault()
  const win = new BrowserWindow({show: false})
  win.once('ready-to-show', () => win.show())
  win.loadURL(url)
  event.newGuest = win
})
```

#### Événement : 'will-navigate'

Retourne :

* `event` Événement
* `url` String

Émis quand un utilisateur ou la page veut démarrer la navigation. Cela peut arriver quand l'objet `window.location` est modifié ou un utilisateur clique sur un lien dans la page.

Cet événement ne sera pas émis lorsque la navigation démarre par programmation grâce aux APIs comme `webContents.loadURL` et `webContents.back`.

Il n'est également pas émis pour les navigations à l'intérieur de la page, comme cliquer sur les liens d'ancrage ou la mise à jour de `window.location.hash`. Utilisez l'événement `did-navigate-in-page` pour cet usage.

Appeler `event.preventDefault()` permet d'éviter la navigation.

#### Événement : 'did-navigate'

Retourne :

* `event` Événement
* `url` String

Émis lorsqu'une navigation est faite.

Cet événement n'est également pas émis pour les navigations à l'intérieur de la page, comme cliquer sur les liens d'ancrage ou la mise à jour de `window.location.hash`. Utilisez l'événement `did-navigate-in-page` pour cet usage.

#### Événement : 'did-navigate-in-page'

Retourne :

* `event` Événement
* `url` String
* `isMainFrame` Boolean

Émis lorsqu'une navigation dans la page s'est produite.

En cas de navigation dans la page, l'URL de la page change mais ne provoque pas de navigation à l'extérieur de la page. Par exemple, lorsque vous cliquez sur un lien d'ancrage ou lorsque l'événement DOM `hashchange` est déclenché.

#### Événement : 'will-prevent-unload'

Retourne :

* `event` Événement

Émis lorsqu’un écouteur de l'événement `beforeunload` tente d’annuler un déchargement de la page.

Appeler `event.preventDefault()` ignorera l'écouteur de l'événement `beforeunload` et va laisser la page se décharger.

```javascript
const {BrowserWindow, dialog} = require('electron')
const win = new BrowserWindow({width: 800, height: 600})
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBox(win, {
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Do you want to leave this site?',
    message: 'Changes you made may not be saved.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### Événement : 'crashed'

Retourne :

* `event` Événement
* `killed` Boolean

Émis lorsque le processus renderer crash ou est interrompu.

#### Événement : 'plugin-crashed'

Retourne :

* `event` Événement
* `name` String
* `version` String

Émis lorsqu’un processus de plugin crash.

#### Événement : 'destroyed'

Émis lorsqu'un `webContents` est détruit.

#### Événement : 'before-input-event'

Retourne :

* `event` Événement
* `input` Object - propriétés de l'input. 
  * `type` String - `keyUp` ou `keyDown`.
  * `key` String - Équivalent à [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `code` String - Équivalent à [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `isAutoRepeat` Boolean - Équivalent à [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `shift` Boolean - Équivalent à [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `control` Boolean - Équivalent à [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `alt` Boolean - Équivalent à [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `meta` Boolean - Équivalent à [KeyboardEvent.metakey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Émis avant d'envoyer les événements `keydown` et `keyup` dans la page. Appeler `event.preventDefault` empêchera les événements `keydown`/`keyup` et les raccourcis du menu dans la page.

Pour seulement empêcher les raccourcis du menu, utilisez [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental) :

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})

win.webContents.on('before-input-event', (event, input) => {
  // Par exemple, seulement activer les raccourcis lorsque
  // Ctrl/Cmd sont inexistant.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Événement : 'devtools-opened'

Émis lorsque la DevTools est ouverte.

#### Événement : 'devtools-closed'

Émis lorsque la DevTools est fermée.

#### Événement : 'devtools-focused'

Émis lorsque la DevTools est active / ouverte.

#### Événement 'certificate-error'

Retourne :

* `event` Événement
* `url` String
* `error` String - Le code d'erreur.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - Indique si le certificat peut être considéré comme fiable.

Émis lorsqu'il n'a pas pu vérifier le `certificat` de l'`url`.

L'utilisation est pareil que [l'événement `certificate-error` de `app`](app.md#event-certificate-error).

#### Événement : 'select-client-certificate'

Retourne :

* `event` Événement
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) - Doit être un certificat dans la liste donnée.

Émis lorsqu'un certificat client est demandé.

L'utilisation est pareil que [l'événement `select-client-certificate` de `app`](app.md#event-select-client-certificate).

#### Événement : 'login'

Retourne :

* `event` Événement
* `request` Objet 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Objet 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Émis lorsque `webContents` veut faire une authentification normale.

L'utilisation est pareil que [l'événement `login` de `app`](app.md#event-login).

#### Événement : 'found-in-page'

Retourne :

* `event` Événement
* `result` Objet 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position du résultat actif.
  * `matches` Integer - Nombre de résultats.
  * `selectionArea` Object - Coordonnées de la région du premier résultat.
  * `finalUpdate` Boolean

Émis lorsqu'un résultat est disponible pour la requête [`webContents.findInPage`].

#### Événement : 'media-started-playing'

Émis lorsqu'un média se démarre.

#### Événement : 'media-paused'

Émis lorsque le média est suspendu ou terminé.

#### Événement : 'did-change-theme-color'

Émis lorsque le thème couleur de la page est changé. Il s’agit généralement de l'ajout d'une balise meta :

```html
<meta name='theme-color' content='#ff0000'>
```

Retourne :

* `event` Événement
* `Couleur` (String | null)- La couleur du thème est au format « #rrggbb ». Elle est de valeur`null` lorsque aucune couleur de thème n’est définie.

#### Événement : 'update-target-url'

Retourne :

* `event` Événement
* `url` String

Émis lorsque la souris passe sur un lien ou le clavier déplace le focus vers un lien.

#### Événement : 'cursor-changed'

Retourne :

* `event` Événement
* `type` String
* `image` [NativeImage](native-image.md) (facultatif)
* `scale` Float (facultatif) - Facteur de mise à l'échelle pour le curseur personnalisé.
* `size` [Size](structures/size.md) (facultatif) - La taille de l'`image`.
* `hotspot` [Point](structures/point.md) (facultatif) - Coordonnées du point actif du curseur personnalisé.

Émis lorsque le type du curseur change. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Événement : 'context-menu'

Retourne :

* `event` Événement
* `params` Objet 
  * `x` Integer - coordonnée x.
  * `y` Integer - coordonée y.
  * `linkURL` String - L'URL du lien qui englobe le nœud du menu contextuel.
  * `linkText` String - Texte associé au lien. Peut être une chaîne de caractère vide si le contenu du lien est une image.
  * `pageURL` String - L'URL de la page haut niveau d'où le menu contextuel a été invoqué.
  * `frameURL` String - L'URL de la subframe d'où le menu contextuel a été invoqué.
  * `srcURL` String - URL source de l’élément sur lequel le menu contextuel a été appelé. Les éléments portant des URLs sources peuvent être des images, sons ou vidéos.
  * `mediaType` String - Type du nœud sur lequel le menu contextuel a été appelé. Peut être `none`, `image`, `audio`, `vidéo`, `toile`, `fichier` ou `plugin`.
  * `hasImageContents` Boolean - Si le menu contextuel a été invoqué sur une image au contenu non-vide ou non.
  * `isEditable` Boolean - Si le contexte est modifiable ou non.
  * `selectionText` String - Texte de la sélection sur laquelle le menu contextuel a été invoqué.
  * `titleText` String - Titre ou texte alternatif de la sélection sur lequel le contexte a été appelé.
  * `misspelledWord` String - Mot mal orthographié sous le curseur, si applicable.
  * `frameCharset` String - L'encodage des caractères de la fenêtre sur lequel le menu a été appelé.
  * `inputFieldType` String - Si le menu contextuel a été appelé sur un champ modifiable, donne le type de ce champ. Les valeurs possibles sont `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Object - Les attributs de l'élément multimédia que le menu contextuel a invoqué. 
    * `inError` Boolean - Si l'élément multimédia a crash.
    * `isPaused` Boolean - Si l'élément multimédia est en pause.
    * `isMuted` Boolean - Si l'élément multimédia est mis en sourdine.
    * `hasAudio` Boolean - Si l'élément multimédia émet un son audio.
    * `isLooping` Boolean - Si l'élément multimédia est en boucle.
    * `isControlsVisible` Boolean - Si les contrôles de l'élément multimédia sont visibles.
    * `canToggleControls` Boolean - Si les contrôles de l'élément multimédia sont toggleable.
    * `canRotate` Boolean - Si l'élément multimédia peut être pivoté.
  * `editFlags` Object - Ces attributs indiquent si le moteur de rendu pense être en mesure d'effectuer l'action correspondante. 
    * `canUndo` Boolean - Si le moteur de rendu pense pouvoir aller en arrière.
    * `canRedo` Boolean - Si le moteur de rendu pense pouvoir aller en avant.
    * `canCut` Boolean - Si le moteur de rendu pense pouvoir couper.
    * `canCopy` Boolean - Si le moteur de rendu pense pouvoir copier
    * `canPaste` Boolean - Si le moteur de rendu pense pouvoir coller.
    * `canDelete` Boolean - Si le moteur de rendu pense pouvoir supprimer.
    * `canSelectAll` Boolean - Si le moteur de rendu pense pouvoir tout sélectionner.

Émis lorsqu'un nouveau menu contextuel a besoin d'être pris en charge.

#### Événement : 'select-bluetooth-device'

Retourne :

* `event` Événement
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function 
  * `deviceId` String

Émis lorsque le périphérique bluetooth a besoin d'être selectionné lors de l'appel de `navigator.bluetooth.requestDevice`. Pour utiliser l'api `navigator.bluetooth`, `webBluethooth` doit être activé. Si `event.preventDefault` n'est pas appelé, le premier périphérique disponible sera sélectionné. `callback` doit être appelé avec `deviceId` à sélectionner, en passant une chaîne de caractère vide au `callback` annulera la requête.

```javascript
const {app, webContents} = require('electron')
app.commandLine.appendSwitch('enable-web-bluetooth')

app.on('ready', () => {
  webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    let result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Événement : 'paint'

Retourne :

* `event` Événement
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - Les données de l'image du frame entier.

Émis quand une nouvelle fenêtre est générée. Seule la zone salie est passée dans le buffer.

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({webPreferences: {offscreen: true}})
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Événement : 'devtools-reload-page'

Émis quand la fenêtre des outils développeur demande aux webContents de se recharger

#### Événement : 'will-attach-webview'

Retourne :

* `event` Événement
* `webPreferences` Object - Les préférences web qui seront utilisées par la page invitée. Cet objet peut être modifié pour ajuster les préférences pour la page invitée.
* `params` Object - Les autres `<webview>` paramètres tels que l'URL `src`. Cet objet peut être modifiée pour s'ajuster aux paramètres de la page invitée.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will be appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Événement : 'will-attach-webview'

Retourne :

* `event` Événement
* `webContents` WebContents - Les contenus web invités qui sont utilisés par `<webview>`.

Émis quand un `<webview>` a été rattaché à ce contenu web.

#### Événement : 'console-message'

Retourne :

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Emis quand la fenêtre associée enregistre un message dans la console. Ne sera pas émis pour les fenêtres avec l'*offscreen rendering* activé.

### Méthodes d’instance

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (facultatif) 
  * `httpReferrer` String (optionnel) - Une URL de référent HTTP.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const {webContents} = require('electron')
const options = {extraHeaders: 'pragma: no-cache\n'}
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath)`

* `filePath` String

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

Would require code like this

```js
win.loadFile('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `contents.getURL()`

Retourne `String` - l'URL de la page web courante.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

Retourne `String` - le titre de la page web courante.

#### `contents.isDestroyed()`

Retourne `Boolean` - si la page web est détruite.

#### `contents.focus()`

Met au premier plan la page web.

#### `contents.isFocused()`

Retourne `Boolean` - si la page web est au premier plan.

#### `contents.isLoading()`

Retourne `Boolean` - Si la page web est toujours en train de charger des ressources.

#### `contents.isLoadingMainFrame()`

Retourne `Boolean` - Si la frame principale (et pas seulement un iframe ou frames qu'il contient) sont toujours en chargement.

#### `contents.isWaitingForResponse()`

Retourne `Boolean` - Si la page web est en attente d'une première réponse de la principale ressource de la page.

#### `contents.stop()`

Arrête toute navigation en attente.

#### `contents.reload()`

Recharge la page web courante.

#### `contents.reloadIgnoringCache()`

Recharge la page courante et ignore le cache.

#### `contents.canGoBack()`

Returns `Boolean` - Whether the browser can go back to previous web page.

#### `contents.canGoForward()`

Returns `Boolean` - Whether the browser can go forward to next web page.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### `contents.clearHistory()`

Clears the navigation history.

#### `contents.goBack()`

Makes the browser go back a web page.

#### `contents.goForward()`

Makes the browser go forward a web page.

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

#### `contents.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for this web page.

#### `contents.getUserAgent()`

Returns `String` - The user agent for this web page.

#### `contents.insertCSS(css)`

* `css` String

Injecte du CSS dans la page web actuelle.

#### `contents.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (facultatif) - `false` par défaut.
* `callback` Function (facultatif) - Appelé après l'exécution du script. 
  * `result` Any

Retourne `Promise` - Une promesse qui se résout avec le résultat du code exécuté ou se rejette si le résultat du code est une promesse rejetée.

Évalue le `code` dans la page.

Dans la fenêtre du navigateur, certaines APIs HTML comme `requestFullScreen` peut être invoqué seulement par un geste de l'utilisateur. Définir `userGesture` à `true` supprimera cette limitation.

If the result of the executed code is a promise the callback result will be the resolved value of the promise. We recommend that you use the returned Promise to handle code that results in a Promise.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

#### `contents.setZoomFactor(factor)`

* `factor` Number - Facteur de zoom.

Change le facteur de zoom par le facteur spécifié. Le facteur de zoom est le pourcentage divisé par 100, donc 300% = 3.0.

#### `contents.getZoomFactor(callback)`

* `callback` Function 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

#### `contents.setZoomLevel(level)`

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement. The formula for this is `scale := 1.2 ^ level`.

#### `contents.getZoomLevel(callback)`

* `callback` Function 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Définit le maximum et minimum du niveau de zoom axée sur la mise en page (c'est-à-dire non visuels).

#### `contents.undo()`

Executes the editing command `undo` in web page.

#### `contents.redo()`

Executes the editing command `redo` in web page.

#### `contents.cut()`

Executes the editing command `cut` in web page.

#### `contents.copy()`

Executes the editing command `copy` in web page.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.

#### `contents.paste()`

Executes the editing command `paste` in web page.

#### `contents.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.

#### `contents.delete()`

Executes the editing command `delete` in web page.

#### `contents.selectAll()`

Executes the editing command `selectAll` in web page.

#### `contents.unselect()`

Executes the editing command `unselect` in web page.

#### `contents.replace(text)`

* `text` String

Executes the editing command `replace` in web page.

#### `contents.replaceMisspelling(text)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.

#### `contents.insertText(text)`

* `text` String

Insère le `text` à l'élément ciblé.

#### `contents.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` Object (facultatif) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request. 
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const {webContents} = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optionnel) - La zone de la page dont on doit réaliser la capture.
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

#### `contents.hasServiceWorker(callback)`

* `callback` Function 
  * `hasWorker` Boolean

Checks if any ServiceWorker is registered and returns a boolean as response to `callback`.

#### `contents.unregisterServiceWorker(callback)`

* `callback` Function 
  * `success` Boolean

Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected.

#### `contents.getPrinters()`

Récupère la liste des imprimantes système.

Returns [`PrinterInfo[]`](structures/printer-info.md).

#### `contents.print([options], [callback])`

* `options` Object (facultatif) 
  * `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.
* `callback` Function (facultatif) 
  * `success` Boolean - Indicates success of the print call.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Calling `window.print()` in web page is equivalent to calling `webContents.print({silent: false, printBackground: false, deviceName: ''})`.

Use `page-break-before: always;` CSS style to force to print to a new page.

#### `contents.printToPDF(options, callback)`

* `options` Objet 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` Function 
  * `error` Error
  * `data` Buffer

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `callback` will be called with `callback(error, data)` on completion. The `data` is a `Buffer` that contains the generated PDF data.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

```javascript
const {BrowserWindow} = require('electron')
const fs = require('fs')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Removes the specified path from DevTools workspace.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:

```html
<html>
<head>
  <style type="text/css">

    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools"></webview>
  <script>
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    browserView.addEventListener('dom-ready', () => {
      const browser = browserView.getWebContents()
      browser.setDevToolsWebContents(devtoolsView.getWebContents())
      browser.openDevTools()
    })
  </script>
</body>
</html>
```

An example of showing devtools in a `BrowserWindow`:

```js
const {app, BrowserWindow} = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({mode: 'detach'})
})
```

#### `contents.openDevTools([options])`

* `options` Object (facultatif) 
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.

Ouvre les devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `contents.closeDevTools()`

Ferme les devtools.

#### `contents.isDevToolsOpened()`

Retourne `Boolean` - Si les devtools sont ouvert.

#### `contents.isDevToolsFocused()`

Retourne `Boolean` - Si les devtools ont le focus.

#### `contents.toggleDevTools()`

Active/désactive les outils développeur.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. Les arguments seront sérialisés en JSON en interne et par conséquent aucune fonction ou chaîne de prototype ne sera inclus.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// Dans le processus main.
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Objet 
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`): 
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{x: 0, y: 0}`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(event)`

* `event` Objet 
  * `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp` or `char`.
  * `modifiers` String[] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

* `keyCode` String (**required**) - The character that will be sent as the keyboard event. Should only use the valid key codes in [Accelerator](accelerator.md).

For mouse events, the `event` object also have following properties:

* `x` Integer (**requis**)
* `y` Integer (**requis**)
* `button` String - The button pressed, can be `left`, `middle`, `right`.
* `globalX` Integer
* `globalY` Integer
* `movementX` Integer
* `movementY` Integer
* `clickCount` Integer

For the `mouseWheel` event, the `event` object also have following properties:

* `deltaX` Integer
* `deltaY` Integer
* `wheelTicksX` Integer
* `wheelTicksY` Integer
* `accelerationRatioX` Integer
* `accelerationRatioY` Integer
* `hasPreciseScrollingDeltas` Boolean
* `canScroll` Boolean

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optional) - Defaults to `false`.
* `callback` Function 
  * `frameBuffer` Buffer
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(frameBuffer, dirtyRect)` when there is a presentation event.

The `frameBuffer` is a `Buffer` that contains raw pixel data. On most machines, the pixel data is effectively stored in 32bit BGRA format, but the actual representation depends on the endianness of the processor (most modern processors are little-endian, on machines with big-endian processors the data is in 32bit ARGB format).

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `frameBuffer` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Objet 
  * `file` String or `files` Array - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.
* `callback` Function - `(error) => {}`. 
  * `error` Error

Returns `Boolean` - true if the process of saving page has been initiated successfully.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
    if (!error) console.log('Page sauvegardée correctement')
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

Shows pop-up dictionary that searches the selected word on the page.

#### `contents.setSize(options)`

Set the size of the page. This is only supported for `<webview>` guest contents.

* `options` Objet 
  * `enableAutoSize` Boolean (optional) - true to make the webview container automatically resize within the bounds specified by the attributes normal, min and max.
  * `normal` [Size](structures/size.md) (optional) - Normal size of the page. This can be used in combination with the [`disableguestresize`](webview-tag.md#disableguestresize) attribute to manually resize the webview guest contents.
  * `min` [Size](structures/size.md) (optional) - Minimum size of the page. This can be used in combination with the [`disableguestresize`](webview-tag.md#disableguestresize) attribute to manually resize the webview guest contents.
  * `max` [Size](structures/size.md) (optional) - Maximium size of the page. This can be used in combination with the [`disableguestresize`](webview-tag.md#disableguestresize) attribute to manually resize the webview guest contents.

#### `contents.isOffscreen()`

Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.

#### `contents.startPainting()`

If *offscreen rendering* is enabled and not painting, start painting.

#### `contents.stopPainting()`

If *offscreen rendering* is enabled and painting, stop painting.

#### `contents.isPainting()`

Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.

#### `contents.setFrameRate(fps)`

* `fps` Integer

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

#### `contents.invalidate()`

Schedules a full repaint of the window this web contents is in.

If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy. 
  * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### `contents.getOSProcessId()`

Returns `Integer` - The `pid` of the associated renderer process.

### Propriétés d'instance

#### `contents.id`

A `Integer` representing the unique ID of this WebContents.

#### `contents.session`

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents`

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents`

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger`

A [Debugger](debugger.md) instance for this webContents.