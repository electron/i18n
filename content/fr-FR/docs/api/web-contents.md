# webContents

> Gère les pages web et leur rendu.

Processus : [Main](../glossary.md#main-process)

`webContents` est un [EventEmitter][event-emitter]. Il est responsable du rendu et du contrôle d'une page web et est une propriété de l'objet [`BrowserWindow`](browser-window.md). Exemple d'accès à l'objet `webContents` :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

const contents = win.webContents
console.log(contents)
```

## Méthodes

Ces méthodes sont accessibles depuis le module `webContents` :

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Retourne `WebContents[]` - Un tableau de toutes les instances de `WebContents`. Celui-ci contiendra le contenu web de toutes les fenêtres, webviews, devtools ouvertes et pages d'extention d'arrière-plan des devtools .

### `webContents.getFocusedWebContents()`

Retourne `WebContents` - Le contenu web qui a le focus dans cette application, sinon retourne `null`.

### `webContents.fromId(id)`

* `id` Integer

Returns `WebContents` | undefined - A WebContents instance with the given ID, or `undefined` if there is no WebContents associated with the given ID.

## Classe : WebContents

> Affiche et contrôle le contenu d'une instance de BrowserWindow.

Processus : [Main](../glossary.md#main-process)

### Événements d’instance

#### Événement : 'did-finish-load'

Émis lorsque la navigation a abouti, c'est à dire que le loader de l'onglet a cessé de tourner, et l'événement `onload` a été émis.

#### Événement : 'did-fail-load'

Retourne :

* `event` Événement
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Cet événement est comme `did-finish-load` mais émis lorsque le chargement a échoué. La liste complète des codes d'erreur et leur signification est disponible [ici](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

#### Événement : 'did-fail-provisional-load'

Retourne :

* `event` Événement
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Cet événement est comme `did-fail-load` mais émis lorsque la chargement a été annulé (par exemple lorsque `window.stop()` a été invoqué).

#### Événement : 'did-frame-finish-load'

Retourne :

* `event` Événement
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Émis lorsqu'un frame a fini sa navigation.

#### Événement : 'did-start-loading'

Correspond au moment où le loader de l'onglet commence à tourner.

#### Événement : 'did-stop-loading'

Correspond au moment où le loader de l'onglet arrête de tourner.

#### Événement : 'dom-ready'

Retourne :

* `event` Événement

Émis lorsque le document dans le frame donné est chargé.

#### Événement : 'page-title-updated'

Retourne :

* `event` Événement
* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

#### Événement : 'page-favicon-updated'

Retourne :

* `event` Événement
* `favicons` String[] - Tableau d'URLs.

Émis lorsque la page reçoit l’url du favicon.

#### Événement : 'new-window' _Déprécié_

Retourne :

* `event` NewWindowWebContentsEvent
* `url` String
* `frameName` String
* `disposition` String - Peut être `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` et `other`.
* `options` BrowserWindowConstructorOptions - Les options qui seront utilisées pour créer le nouveau [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - Les fonctionnalités non standards (fonctionnalités non gérés par Chromium ou Electron) donné à `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - Le référant transmis à la nouvelle fenêtre. Peut ou ne peut pas entraîner l'envoi de l'en-tête `Référent` en fonction de la politique du référent.
* `postBody` [PostBody](structures/post-body.md) (optional) - The post data that will be sent to the new window, along with the appropriate headers that will be set. If no post data is to be sent, the value will be `null`. Only defined when the window is being created by a form that set `target=_blank`.

Obsolète, utiliser [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler) à la place.

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

Un nouveau `BrowserWindow` sera créé par défaut pour l'`url`.

L'appel à `event.preventDefault()` empêchera Electron de créer automatiquement une nouvelle [`BrowserWindow`](browser-window.md). Si vous appelez `event.preventDefault()` et créez manuellement un nouveau [`BrowserWindow`](browser-window.md) alors vous devez définir `événement. ewGuest` pour référencer la nouvelle instance [`BrowserWindow`](browser-window.md) . Si vous ne le faites pas, cela peut entraîner un comportement inattendu. Par exemple :

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    const loadOptions = {
      httpReferrer: referrer
    }
    if (postBody != null) {
      const { data, contentType, boundary } = postBody
      loadOptions.postData = postBody.data
      loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`
    }

    win.loadURL(url, loadOptions) // existing webContents will be navigated automatically
  }
  event.newGuest = win
})
```

#### Event: 'did-create-window'

Retourne :

* `window` BrowserWindow
* Objet `details`
  * `url` String - URL for the created window.
  * `frameName` String - Name given to the created window in the `window.open()` call.
  * `options` BrowserWindowConstructorOptions - The options used to create the BrowserWindow. They are merged in increasing precedence: options inherited from the parent, parsed options from the `features` string from `window.open()`, and options given by [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Unrecognized options are not filtered out.
  * `additionalFeatures` String[] - The non-standard features (features not handled Chromium or Electron) _Deprecated_
  * `referrer` [Referrer](structures/referrer.md) - Le référant transmis à la nouvelle fenêtre. May or may not result in the `Referer` header being sent, depending on the referrer policy.
  * `postBody` [PostBody](structures/post-body.md) (optional) - The post data that will be sent to the new window, along with the appropriate headers that will be set. If no post data is to be sent, the value will be `null`. Only defined when the window is being created by a form that set `target=_blank`.
  * `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.

Emitted _after_ successful creation of a window via `window.open` in the renderer. Not emitted if the creation of the window is canceled from [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

See [`window.open()`](window-open.md) for more details and how to use this in conjunction with `webContents.setWindowOpenHandler`.

#### Événement : 'will-navigate'

Retourne :

* `event` Événement
* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Cet événement ne sera pas émis lorsque la navigation démarre par programmation grâce aux APIs comme `webContents.loadURL` et `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Appeler `event.preventDefault()` permet d'éviter la navigation.

#### Événement : 'did-start-navigation'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInPlace` will be `true` for in-page navigations.

#### Événement : 'will-redirect'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation.  For example a 302 redirect.

Cet événement sera émis après `did-start-navigation` et pour la même navigation toujours avant l'événement `did-redirect-navigation` .

L'appel à `event.preventDefault()` empêchera la navigation (pas seulement la redirection).

#### Event: 'did-redirect-navigation'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation.  For example a 302 redirect.

This event cannot be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### Événement : 'did-navigate'

Retourne :

* `event` Événement
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - vide pour les navigations non HTTP

Émis lorsque la navigation d'une fenêtre principale est terminée.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-frame-navigate'

Retourne :

* `event` Événement
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - vide pour les navigations non HTTP,
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Émis lorsqu'une navigation est terminée.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Événement : 'did-navigate-in-page'

Retourne :

* `event` Événement
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

En cas de navigation dans la page, l'URL de la page change mais ne provoque pas de navigation à l'extérieur de la page. Par exemple, lorsque vous cliquez sur un lien d'ancrage ou lorsque l'événement DOM `hashchange` est déclenché.

#### Événement : 'will-prevent-unload'

Retourne :

* `event` Événement

Émis lorsqu’un écouteur de l'événement `beforeunload` tente d’annuler un déchargement de la page.

Appeler `event.preventDefault()` ignorera l'écouteur de l'événement `beforeunload` et va laisser la page se décharger.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBoxSync(win, {
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

#### Événement : 'crash' _Déprécié_

Retourne :

* `event` Événement
* `killed` Boolean

Émis lorsque le processus renderer crash ou est interrompu.

**Deprecated:** Cet événement est remplacé par l'événement `render-process-gone` qui contient plus d'informations à propos de la raison du plantage du processus enfant. Ceci n'est pas toujours causé par un plantage.  Le booléen `killed` peut être remplacé par la vérification de `reason === 'killed'` lorsque vous passez à l'utilisation de cet événement.

#### Événement : 'render-process-gone'

Retourne :

* `event` Événement
* Objet `details`
  * `reason` String - La raison pour laquelle le processus de rendu a disparu.  Valeurs possibles :
    * `` de sortie propre - Processus s'est terminé avec le code de sortie zéro
    * `anormal-exit` - Le Processus s'est terminé avec un code de sortie différent de zéro
    * `killed` - Le processus a reçu un SIGTERM ou a été tué autrement de l'extérieur
    * `crashed` - Processus s'est planté
    * `oom` - Le processus est tombé à cours de mémoire
    * `launch-failed` - Le processus ne s'est pas lancé avec succès
    * `integrity-failure` - Les vérifications d'intégrité du code Windows ont échouées
  * `Codedesortie`Numero integre-Le code de sortie du proces, sauf `si <code>la raison est <code>lancer a echoue,`ou <0>le codeSortie </code>sera une plateforme specifique, de code envoye errone.

Émis lorsque le processus de rendu plante de manière inattendue.  C'est normalement dans les cas où il s'est planté ou qu'il a été tué.

#### Événement : 'unresponsive'

Émis lorsque la page web cesse de répondre.

#### Événement : 'responsive'

Émis lorsque la page web répond à nouveau.

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
* `input` Object - Input properties.
  * `type` String - `keyUp` ou `keyDown`.
  * `key` String - Équivalent à [KeyboardEvent.key][keyboardevent].
  * `code` String - Équivalent à [KeyboardEvent.code][keyboardevent].
  * `isAutoRepeat` Boolean - Équivalent à [KeyboardEvent.repeat][keyboardevent].
  * `isComposing` Boolean - Equivalent to [KeyboardEvent.isComposing][keyboardevent].
  * `shift` Boolean - Équivalent à [KeyboardEvent.shiftKey][keyboardevent].
  * `control` Boolean - Équivalent à [KeyboardEvent.controlKey][keyboardevent].
  * `alt` Boolean - Équivalent à [KeyboardEvent.altKey][keyboardevent].
  * `meta` Boolean - Équivalent à [KeyboardEvent.metakey][keyboardevent].

Émis avant d'envoyer les événements `keydown` et `keyup` dans la page. Appeler `event.preventDefault` empêchera les événements `keydown`/`keyup` et les raccourcis du menu dans la page.

Pour seulement empêcher les raccourcis du menu, utilisez [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore) :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Événement : 'enter-html-full-screen'

Émis lorsque la fenêtre entre dans un état de plein écran déclenchée par l’API HTML.

#### Événement : 'leave-html-full-screen'

Émis lorsque la fenêtre revient d'un état de plein écran déclenchée par l’API HTML.

#### Événement : 'zoom-changed'

Retourne :

* `event` Événement
* `zoomDirection` String - Peut être `in` ou `out`.

Émis lorsque l'utilisateur demande à changer le niveau de zoom en utilisant la molette de la souris.

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
* Objet `authenticationResponseDetails`
  * `url` URL
* Objet `authInfo`
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `nom d'utilisateur` String (facultatif)
  * `mot de passe` String (facultatif)

Émis lorsque `webContents` veut faire une authentification normale.

L'utilisation est pareil que [l'événement `login` de `app`](app.md#event-login).

#### Événement : 'found-in-page'

Retourne :

* `event` Événement
* Objet `result`
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position du résultat actif.
  * `matches` Integer - Nombre de résultats.
  * `sélectionArea` Rectangle - Coordonnées de la région de la première correspondance.
  * `finalUpdate` Boolean

Émis lorsqu'un résultat est disponible pour la requête [`webContents.findInPage`].

#### Événement : 'media-started-playing'

Émis lorsqu'un média se démarre.

#### Événement : 'media-paused'

Émis lorsque le média est suspendu ou terminé.

#### Événement : 'did-change-theme-color'

Retourne :

* `event` Événement
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

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

Si le paramètre `type` est `custom`, le paramètre `image` contiendra l'image du curseur personnalisé dans un [`NativeImage`](native-image.md), et `scale`, `size` et `hotspot` contiendront les informations complémentaires à propos du curseur personnalisé.

#### Événement : 'context-menu'

Retourne :

* `event` Événement
* `params` Object
  * `x` Integer - coordonnée x.
  * `y` Integer - coordonée y.
  * `linkURL` String - L'URL du lien qui englobe le nœud du menu contextuel.
  * `linkText` String - Text associated with the link. May be an empty string if the contents of the link are an image.
  * `pageURL` String - L'URL de la page haut niveau d'où le menu contextuel a été invoqué.
  * `frameURL` String - L'URL de la subframe d'où le menu contextuel a été invoqué.
  * `srcURL` String - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
  * `mediaType` String - Type du nœud sur lequel le menu contextuel a été appelé. Peut être `none`, `image`, `audio`, `vidéo`, `toile`, `fichier` ou `plugin`.
  * `hasImageContents` Boolean - Si le menu contextuel a été invoqué sur une image au contenu non-vide ou non.
  * `isEditable` Boolean - Si le contexte est modifiable ou non.
  * `selectionText` String - Texte de la sélection sur laquelle le menu contextuel a été invoqué.
  * `titleText` String - Title text of the selection that the context menu was invoked on.
  * `altText` String - Alt text of the selection that the context menu was invoked on.
  * `suggestedFilename` String - Suggested filename to be used when saving file through 'Save Link As' option of context menu.
  * `selectionRect` [Rectangle](structures/rectangle.md) - Rect representing the coordinates in the document space of the selection.
  * `selectionStartOffset` Number - Start position of the selection text.
  * `referrerPolicy` [Referrer](structures/referrer.md) - The referrer policy of the frame on which the menu is invoked.
  * `misspelledWord` String - Mot mal orthographié sous le curseur, si applicable.
  * `dictionarySuggestions` String[] - Un tableau de mots suggérés à montrer à l'utilisateur pour remplacer le `misspelledWord`.  Uniquement disponible si un mot est mal orthographié et que le correcteur orthographique est activé.
  * `frameCharset` String - L'encodage des caractères de la fenêtre sur lequel le menu a été appelé.
  * `inputFieldType` String - Si le menu contextuel a été appelé sur un champ modifiable, donne le type de ce champ. Les valeurs possibles sont `none`, `plainText`, `password`, `other`.
  * `spellcheckEnabled` Boolean - If the context is editable, whether or not spellchecking is enabled.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch`, `touchMenu`, `longPress`, `longTap`, `touchHandle`, `stylus`, `adjustSelection`, or `adjustSelectionReset`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on.
    * `inError` Boolean - Si l'élément multimédia a crash.
    * `isPaused` Boolean - Si l'élément multimédia est en pause.
    * `isMuted` Boolean - Si l'élément multimédia est mis en sourdine.
    * `hasAudio` Boolean - Si l'élément multimédia émet un son audio.
    * `isLooping` Boolean - Si l'élément multimédia est en boucle.
    * `isControlsVisible` Boolean - Si les contrôles de l'élément multimédia sont visibles.
    * `canToggleControls` Boolean - Si les contrôles de l'élément multimédia sont toggleable.
    * `canPrint` Boolean - Whether the media element can be printed.
    * `canSave` Boolean - Whether or not the media element can be downloaded.
    * `canShowPictureInPicture` Boolean - Whether the media element can show picture-in-picture.
    * `isShowingPictureInPicture` Boolean - Whether the media element is currently showing picture-in-picture.
    * `canRotate` Boolean - Si l'élément multimédia peut être pivoté.
    * `canLoop` Boolean - Whether the media element can be looped.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
    * `canUndo` Boolean - Si le moteur de rendu pense pouvoir aller en arrière.
    * `canRedo` Boolean - Si le moteur de rendu pense pouvoir aller en avant.
    * `canCut` Boolean - Si le moteur de rendu pense pouvoir couper.
    * `canCopy` Boolean - Si le moteur de rendu pense pouvoir copier.
    * `canPaste` Boolean - Si le moteur de rendu pense pouvoir coller.
    * `canDelete` Boolean - Si le moteur de rendu pense pouvoir supprimer.
    * `canSelectAll` Boolean - Si le moteur de rendu pense pouvoir tout sélectionner.
    * `canEditRichly` Boolean - Whether the renderer believes it can edit text richly.

Émis lorsqu'un nouveau menu contextuel a besoin d'être pris en charge.

#### Événement : 'select-bluetooth-device'

Retourne :

* `event` Événement
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String

Émis lorsque le périphérique bluetooth a besoin d'être selectionné lors de l'appel de `navigator.bluetooth.requestDevice`. Pour utiliser l'api `navigator.bluetooth`, `webBluethooth` doit être activé. Si `event.preventDefault` n'est pas appelé, le premier périphérique disponible sera sélectionné. `callback` doit être appelé avec `deviceId` à sélectionner, en passant une chaîne de caractère vide au `callback` annulera la requête.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    const result = deviceList.find((device) => {
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

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
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
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Événement : 'will-attach-webview'

Retourne :

* `event` Événement
* `webContents` WebContents - Les contenus web invités qui sont utilisés par `<webview>`.

Émis quand un `<webview>` a été rattaché à ce contenu web.

#### Événement : 'console-message'

Retourne :

* `event` Événement
* `level` Integer - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`.
* `message` String - The actual console message
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Emitted when the associated window logs a console message.

#### Event: 'preload-error'

Retourne :

* `event` Événement
* `preloadPath` String
* `error` Error

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### Événement : 'ipc-message'

Retourne :

* `event` Événement
* `channel` String
* `...args` any[]

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`.

#### Event: 'ipc-message-sync'

Retourne :

* `event` Événement
* `channel` String
* `...args` any[]

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`.

#### Événement : 'desktop-capturer-get-sources'

Retourne :

* `event` Événement

Emitted when `desktopCapturer.getSources()` is called in the renderer process. L' Appel à `event.preventDefault()` lui fera retourner des sources vides.

#### Événement: 'remote-require' _Deprecated_

Retourne :

* `événement` IpcMainEvent
* `module` String

Emitted when `remote.require()` is called in the renderer process. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement: 'remote-get-global' _Deprecated_

Retourne :

* `événement` IpcMainEvent
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement: 'remote-get-builtin' _Deprecated_

Retourne :

* `événement` IpcMainEvent
* `module` String

Emitted when `remote.getBuiltin()` is called in the renderer process. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement: 'remote-get-current-window' _Deprecated_

Retourne :

* `événement` IpcMainEvent

Emitted when `remote.getCurrentWindow()` is called in the renderer process. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Événement: 'remote-get-current-web-contents' _Deprecated_

Retourne :

* `événement` IpcMainEvent

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Event: 'preferred-size-changed'

Retourne :

* `event` Événement
* `preferredSize` [Size](structures/size.md) - The minimum size needed to contain the layout of the document—without requiring scrolling.

Emitted when the `WebContents` preferred size has changed.

This event will only be emitted when `enablePreferredSizeMode` is set to `true` in `webPreferences`.

### Méthodes d’instance

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n".
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (optional)
  * `query` Enregistrement<String, String> (facultatif) - Passé à `url.format()`.
  * `search` String (facultatif) - Passé à `url.format()`.
  * `hash` String (facultatif) - Passé à `url.format()`.

Retourne `Promise<void>` - la promesse se résoudra lorsque la page aura terminé le chargement (voir [`did-finish-load`](web-contents.md#event-did-finish-load)), et rejette si la page ne parvient pas à se charger (voir [`did-fail-load`](web-contents.md#event-did-fail-load)).

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application.  For instance an app structure like this:

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
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com').then(() => {
  const currentURL = win.webContents.getURL()
  console.log(currentURL)
})
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

Efface l'historique de navigation.

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

#### `contents.forcefullyCrashRenderer()`

Forcefully terminates the renderer process that is currently hosting this `webContents`. Cela provoquera l'émission de l'événement `render-process-gone` indiquant la cause avec `reason=killed || reason=crashed`. Please note that some webContents share renderer processes and therefore calling this method may also crash the host process for other webContents as well.

Calling `reload()` immediately after calling this method will force the reload to occur in a new process. This should be used when this process is unstable or unusable, for instance in order to recover from the `unresponsive` event.

```js
contents.on('unresponsive', async () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    title: 'Do you want to try forcefully reloading the app?',
    buttons: ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    contents.forcefullyCrashRenderer()
    contents.reload()
  }
})
```

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for this web page.

#### `contents.getUserAgent()`

Returns `String` - The user agent for this web page.

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (optional)
  * `cssOrigin` String (optional) - Can be either 'user' or 'author'; Specifying 'user' enables you to prevent websites from overriding the CSS you insert. Default is 'author'.

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injecte du CSS dans la page Web actuelle et renvoie une clé unique pour la feuille de style insérée .

```js
contents.on('did-finish-load', () => {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async () => {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (facultatif) - `false` par défaut.

Retourne `Promise<any>` - Une promesse qui se résout avec le résultat du code exécuté ou se rejette si le résultat du code est une promesse rejetée.

Évalue le `code` dans la page.

Dans la fenêtre du navigateur, certaines APIs HTML comme `requestFullScreen` peut être invoqué seulement par un geste de l'utilisateur. Définir `userGesture` à `true` supprimera cette limitation.

L'exécution du code sera suspendue jusqu'à la fin du chargement de la page web.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (facultatif) - `false` par défaut.

Retourne `Promise<any>` - Une promesse qui se résout avec le résultat du code exécuté ou se rejette si le résultat du code est une promesse rejetée.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setWindowOpenHandler(handler)`

* `handler` Function<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * Objet `details`
    * `url`Fiche-La _version_resolue du URL envoyee a`fenetre.ouverte{}`. par ex. ouvrir une fenetre avec`fenetre.ouverte ('foo')`va generer une chose comme`https://the-origin/the/current/path/foo`.
    * `Nommarge`Fiche-Nom de fenetre fourni a `window.open=fenetre.ouverte()`
    * `traits`Fiche-Une liste de traits de fenetre separee par comas, a ete fournie a`window.open()`.
    * `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` or `other`.
    * `referrer` [Referrer](structures/referrer.md) - Le référant transmis à la nouvelle fenêtre. Peut ou ne peut pas entraîner l'envoi de l'en-tête `Référent` en fonction de la politique du référent.
    * `postBody` [PostBody](structures/post-body.md) (optional) - The post data that will be sent to the new window, along with the appropriate headers that will be set. If no post data is to be sent, the value will be `null`. Only defined when the window is being created by a form that set `target=_blank`.

  Va donner `{action: 'deny'} | {action: 'permettre', surpasserOptionsduNavigateurFenetreBrowser?: OptionsConstructeurNavigateursFenetre}`- - `refuser` va supprimer la creation dans la fenetre nouvelle. `permettre`va permettre la creation d'une fenetre nouvelle. Specifying `overrideBrowserWindowOptions` allows customization of the created window. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

Called before creating a window when `window.open()` is called from the renderer. See [`window.open()`](window-open.md) for more details and how to use this in conjunction with `did-create-window`.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `contents.setZoomFactor(factor)`

* `factor` Double - Zoom factor; default is 1.0.

Modifie le facteur de zoom en utilisant le facteur spécifié. Le Zoom factor est égal à la valeur du zoom exprimée en pourcent divisée par 100, donc 300% = 3.0.

Le rapport doit être supérieur à 0.0.

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

#### `contents.setZoomLevel(level)`

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement. La formule pour cela est `'scale:= 1,2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Retourne `Promise<void>`

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

> **NOTE**: Le zoom visuel est désactivé par défaut dans Electron. To re-enable it, call:
> 
> ```js
> contents.setVisualZoomLevelLimits(1, 3)
> ```

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

Retourne `Promise<void>`

Insère le `text` à l'élément ciblé.

#### `contents.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` Object (optional)
  * `forward` Boolean (facultatif) - Rechercher soit en avant soit en arrière, la valeur par défaut est `true`.
  * `findNext` Boolean (optional) - Whether to begin a new text finding session with this request. Doit être `true` pour les requêtes initiales et `false` pour les requêtes de suivi. Par défaut, `faux`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. Le résultat de la requête peut être obtenu en s'abonnant à l'événement [`found-in-page`](web-contents.md#event-found-in-page).

#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request.
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optionnel) - La zone de la page dont on doit réaliser la capture.

Retourne `Promise<NativeImage>` - résout avec une [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `contents.isBeingCaptured()`

Returns `Boolean` - Whether this page is being captured. It returns true when the capturer count is large then 0.

#### `contents.incrementCapturerCount([size, stayHidden, stayAwake])`

* `size` [Size](structures/size.md) (optional) - The preferred size for the capturer.
* `stayHidden` Boolean (optional) -  Keep the page hidden instead of visible.
* `stayAwake` Boolean (optional) -  Keep the system awake instead of allowing it to sleep.

Increase the capturer count by one. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

This also affects the Page Visibility API.

#### `contents.decrementCapturerCount([stayHidden, stayAwake])`

* `stayHidden` Boolean (optional) -  Keep the page in hidden state instead of visible.
* `stayAwake` Boolean (optional) -  Keep the system awake instead of allowing it to sleep.

Decrease the capturer count by one. The page will be set to hidden or occluded state when its browser window is hidden or occluded and the capturer count reaches zero. If you want to decrease the hidden capturer count instead you should set `stayHidden` to true.

#### `contents.getPrinters()`

Récupère la liste des imprimantes système.

Returns [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Object (optional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Par défaut la valeur est `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Par défaut la valeur est `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. La valeur par défaut est `true`.
  * `margins` Object (facultatif)
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Par défaut la valeur est `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Object[]  (optional) - The page range to print. Sur macOS, une seule plage est respectée.
    * `from` Number - Index de la première page à imprimer (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.
* `callback` Function (facultatif)
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Error description called back if the print fails.

When a custom `pageSize` is passed, Chromium attempts to validate platform specific minimum values for `width_microns` and `height_microns`. Width and height must both be minimum 353 microns but may be higher on some operating systems.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Use `page-break-before: always;` CSS style to force to print to a new page.

Exemple d'utilisation :

```js
const options = {
  silent: true,
  deviceName: 'My-Printer',
  pageRanges: [{
    from: 0,
    to: 1
  }]
}
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* Objet `options`
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print.
    * `from` Number - Index de la première page à imprimer (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false,
  pageSize: 'A4',
  scaleFactor: 100
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  }).catch(error => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Ajoute le chemin spécifié à l'espace de travail des DevTools. Doit être utilisé après la création des DevTools :

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
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
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } = require('electron')
    const emittedOnce = (element, eventName) => new Promise(resolve => {
      element.addEventListener(eventName, event => resolve(event), { once: true })
    })
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    const browserReady = emittedOnce(browserView, 'dom-ready')
    const devtoolsReady = emittedOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).then(() => {
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.send('open-devtools', targetId, devtoolsId)
    })
  </script>
</body>
</html>
```

```js
// Main process
const { ipcMain, webContents } = require('electron')
ipcMain.on('open-devtools', (event, targetContentsId, devtoolsContentsId) => {
  const target = webContents.fromId(targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  target.setDevToolsWebContents(devtools)
  target.openDevTools()
})
```

An example of showing devtools in a `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.whenReady().then(() => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `options` Object (optional)
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. Par défaut, `true`.

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

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel, ...args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// Dans le processus main.
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
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

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer | [number, number] - the ID of the frame to send to, or a pair of `[processId, frameId]` if the frame is in a different process to the main frame.
* `channel` String
* `...args` any[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE:** Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value.  Exemple :

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.postMessage(channel, message, [transfer])`

* `channel` String
* `message` tous
* `transfer` MessagePortMain[] (optional)

Envoie un message au processus de rendu en effectuant éventuellement un transfert de propriété de zéro ou plus objets de type [`MessagePortMain`][].

Les objets `MessagePortMain` transférés seront disponibles dans le processus de rendu en accédant à la propriété `ports` de l'événement émis. Ils seront des objets DOM `MessagePort` natifs en arrivant dans le moteur de rendu.

Par exemple :

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
webContents.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

#### `contents.enableDeviceEmulation(parameters)`

* Objet `parameters`
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optionnel) - `false` par défaut.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` par défaut à `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* Objet `item`
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type.
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

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

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 240 are accepted.

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

#### `contents.invalidate()`

Planifie une repeindre complète de la fenêtre dans qui se trouve ce contenu Web.

If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy.
  * `default` - Exposes user's public and local IPs. C’est le comportement par défaut. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### `contents.getOSProcessId()`

Returns `Integer` - The operating system `pid` of the associated renderer process.

#### `contents.getProcessId()`

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Chemin vers le fichier de sortie.

Retourne `Promise<void>` - Indique si l'instantané a été créé avec succès.

Prend un instantané de tas V8 et l'enregistre dans `filePath`.

#### `contents.getBackgroundThrottling()`

Returns `Boolean` - whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.getType()`

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

### Propriétés d'instance

#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.

#### `contents.userAgent`

A `String` property that determines the user agent for this web page.

#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 240 are accepted.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` _Readonly_

A `Integer` representing the unique ID of this WebContents. Chaque ID est unique parmi ceux des instances de `WebContents` de l'application Electron.

#### `contents.session` _Readonly_

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents` _Readonly_

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

A `WebContents | null` property that represents the of DevTools `WebContents` associated with a given `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger` _Readonly_

A [`Debugger`](debugger.md) instance for this webContents.

#### `contents.backgroundThrottling`

A `Boolean` property that determines whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.mainFrame` _Readonly_

A [`WebFrameMain`](web-frame-main.md) property that represents the top frame of the page's frame hierarchy.

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
