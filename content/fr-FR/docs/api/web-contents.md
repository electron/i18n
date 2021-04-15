# webContents

> Gère les pages web et leur rendu.

Processus : [Main](../glossary.md#main-process)

`webContents` est un [EventEmitter][event-emitter]. Il est responsable du rendu et du contrôle d'une page web et est une propriété de l'objet [`BrowserWindow`](browser-window.md). Exemple d'accès à l'objet `webContents` :

```javascript
const { BrowserWindow } = require ('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL ('http://github.com')

const content = win.webContents
console.log(contenu)
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

Retours `WebContents` | non défini - Une instance WebContents avec l’iD donné, ou `undefined` s’il n’y a pas de WebContents associés à l’ID donné.

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

Tiré lorsque le titre de la page est défini pendant la navigation. `explicitSet` est faux lorsque le titre synthétisé à partir de l’url du fichier.

#### Événement : 'page-favicon-updated'

Retourne :

* `event` Événement
* `favicons` String[] - Tableau d'URLs.

Émis lorsque la page reçoit l’url du favicon.

#### Evénement: 'new-window' _Deprecated_

Retourne :

* `event` NewWindowWebContentsEvent
* `url` String
* `frameName` String
* `disposition` String - Peut être `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` et `other`.
* `options` BrowserWindowConstructorOptions - Les options qui seront utilisées pour créer le nouveau [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - Les fonctionnalités non standards (fonctionnalités non gérés par Chromium ou Electron) donné à `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - Le référant transmis à la nouvelle fenêtre. Peut ou ne peut pas entraîner l'envoi de l'en-tête `Référent` en fonction de la politique du référent.
* `postBody` [PostBody](structures/post-body.md) (facultatif) - Les données de poste que seront envoyées à la nouvelle fenêtre, ainsi que les en-têtes appropriés qui seront définis. Si aucune donnée postale ne doit être envoyée, la valeur sera `null`. Seulement défini lorsque la fenêtre est créée par un formulaire qui définit `target=_blank`.

Obsolète, utiliser [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler) à la place.

Émis lorsque la page demande d’ouvrir une nouvelle fenêtre pour une `url`. Il pourrait être demandé par `window.open` ou un lien externe comme `<a target='_blank'>`.

Un nouveau `BrowserWindow` sera créé par défaut pour l'`url`.

L'appel à `event.preventDefault()` empêchera Electron de créer automatiquement une nouvelle [`BrowserWindow`](browser-window.md). Si vous appelez `event.preventDefault()` et créez manuellement un nouveau [`BrowserWindow`](browser-window.md) alors vous devez définir `événement. ewGuest` pour référencer la nouvelle instance [`BrowserWindow`](browser-window.md) . Si vous ne le faites pas, cela peut entraîner un comportement inattendu. Par exemple :

```javascript
myBrowserWindow.webContents.on('new-window', (événement, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once ('ready-ready-to-show', () => win.show())
  if (!options.webContents) {
    const loadOptions = {
      httpReferrer: referrer
    }
    if (postBody != null) {
      const { data, contentType, boundary } = postBody
      loadOptions.postData = postBody.data
      loadOptions.extraHeaders = 'content-type: ${contentType}; boundary=${boundary}'
    }

    win.loadURL(url, loadOptions) // webContents existants seront navigués automatiquement
  }
  event.newGuest = win
})
```

#### Evénement: 'did-create-window'

Retourne :
* `window` BrowserWindow
* `details` objet
    * `url` String - URL pour la fenêtre créée.
    * `frameName` String - Nom donné à la fenêtre créée dans l' `window.open()` téléphonique.
    * `options` BrowserWindowConstructorOptions - Les options utilisées pour créer le BrowserWindow. Ils sont fusionnés en priorité croissante : options héritées du parent, options parées de la chaîne `features` de `window.open()`, et options données par [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Les options non reconnues ne sont pas filtrées.
    * `additionalFeatures` String[] - Les fonctionnalités non standard (fonctionnalités pas manipulé chrome ou électron) _de_
    * `referrer` [Referrer](structures/referrer.md) - Le référant transmis à la nouvelle fenêtre. Peut ou non entraîner l’envoi de `Referer` 'en-tête , selon la politique de référencement.
    * `postBody` [PostBody](structures/post-body.md) (facultatif) - Les de données post qui seront envoyées à la nouvelle fenêtre, ainsi que les en-têtes appropriés qui seront définis. Si aucune donnée postale ne doit être envoyée, la valeur sera `null`. Seulement défini lorsque la fenêtre est créée par un formulaire qui définit `target=_blank`.
    * `disposition` String - Peut être `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` et `other`.

Émis _après_ création réussie d’une fenêtre via `window.open` dans le renderer. Non émis si la création de la fenêtre est annulée à partir de [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Voir [`window.open()`](window-open.md) plus de détails et comment l’utiliser en conjonction avec `webContents.setWindowOpenHandler`.

#### Événement : 'will-navigate'

Retourne :

* `event` Événement
* `url` String

Émis lorsqu’un utilisateur ou la page veut commencer la navigation. Cela peut se produire lorsque ' `window.location` 'objet est modifié ou qu’un utilisateur clique sur un lien dans la page.

Cet événement ne sera pas émis lorsque la navigation démarre par programmation grâce aux APIs comme `webContents.loadURL` et `webContents.back`.

Il n’est pas non plus émis pour les navigations en page, telles que cliquer sur les liens d’ancrage ou mettre à jour `window.location.hash`. Utilisez `did-navigate-in-page` événement pour à cette fin.

Appeler `event.preventDefault()` permet d'éviter la navigation.

#### Événement : 'did-start-navigation'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Émis lorsque n’importe quel cadre (y compris le principal) commence à naviguer. `isInPlace` sera `true` pour les navigations en page.

#### Événement : 'will-redirect'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Émis comme redirection côté serveur se produit pendant la navigation.  Par exemple, un 302 rediriger.

Cet événement sera émis après `did-start-navigation` et pour la même navigation toujours avant l'événement `did-redirect-navigation` .

L'appel à `event.preventDefault()` empêchera la navigation (pas seulement la redirection).

#### Evénement: 'did-redirect-navigation'

Retourne :

* `event` Événement
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Émis après une redirection côté serveur se produit pendant la navigation.  Par exemple, un 302 rediriger.

Cet événement ne peut pas être empêché, si vous voulez empêcher les redirections, vous devez la caisse de l’événement `will-redirect` -dessus.

#### Événement : 'did-navigate'

Retourne :

* `event` Événement
* `url` String
* `httpResponseCode` Integer - -1 pour les navigations non HTTP
* `httpStatusText` String - vide pour les navigations non HTTP

Émis lorsque la navigation d'une fenêtre principale est terminée.

Cet événement n’est pas émis pour les navigations en page, telles que cliquer sur les liens d’ancrage ou mettre à jour le `window.location.hash`. Utilisez `did-navigate-in-page` événement pour à cette fin.

#### Evénement: 'did-frame-navigate'

Retourne :

* `event` Événement
* `url` String
* `httpResponseCode` Integer - -1 pour les navigations non HTTP
* `httpStatusText` String - vide pour les navigations non HTTP,
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Émis lorsqu'une navigation est terminée.

Cet événement n’est pas émis pour les navigations en page, telles que cliquer sur les liens d’ancrage ou mettre à jour le `window.location.hash`. Utilisez `did-navigate-in-page` événement pour à cette fin.

#### Événement : 'did-navigate-in-page'

Retourne :

* `event` Événement
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Émis lorsqu’une navigation dans la page s’est produite dans n’importe quel cadre.

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

#### Evénement: 'crash' _Deprecated_

Retourne :

* `event` Événement
* `killed` Boolean

Émis lorsque le processus renderer crash ou est interrompu.

**:** cet événement est remplacé par l’événement `render-process-gone` qui contient plus d’informations sur les raisons pour lesquelles le processus de rendu a disparu. Ceci n'est pas toujours causé par un plantage.  Le booléen `killed` peut être remplacé par la vérification de `reason === 'killed'` lorsque vous passez à l'utilisation de cet événement.

#### Evénement: 'render-process-gone'

Retourne :

* `event` Événement
* `details` objet
  * `reason` String - La raison pour laquelle le processus de rendu a disparu.  Valeurs possibles :
    * `` de sortie propre - Processus s'est terminé avec le code de sortie zéro
    * `anormal-exit` - Le Processus s'est terminé avec un code de sortie différent de zéro
    * `killed` - Le processus a reçu un SIGTERM ou a été tué autrement de l'extérieur
    * `crashed` - Processus s'est planté
    * `oom` - Le processus est tombé à cours de mémoire
    * `launch-failed` - Processus jamais lancé avec succès
    * `integrity-failure` - Les vérifications d'intégrité du code Windows ont échouées
  * `Codedesortie`Numero integre-Le code de sortie du proces, sauf `si <code>la raison est <code>lancer a echoue,`ou <0>le codeSortie </code>sera une plateforme specifique, de code envoye errone.

Émis lorsque le processus de rendu disparaît de façon inattendue.  C'est normalement dans les cas où il s'est planté ou qu'il a été tué.

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
* `input` - Propriétés d’entrée.
  * `type` String - `keyUp` ou `keyDown`.
  * `key` String - Équivalent à [KeyboardEvent.key][keyboardevent].
  * `code` String - Équivalent à [KeyboardEvent.code][keyboardevent].
  * `isAutoRepeat` Boolean - Équivalent à [KeyboardEvent.repeat][keyboardevent].
  * `isComposing` Boolean - Équivalent à [KeyboardEvent.isComposing][keyboardevent].
  * `shift` Boolean - Équivalent à [KeyboardEvent.shiftKey][keyboardevent].
  * `control` Boolean - Équivalent à [KeyboardEvent.controlKey][keyboardevent].
  * `alt` Boolean - Équivalent à [KeyboardEvent.altKey][keyboardevent].
  * `meta` Boolean - Équivalent à [KeyboardEvent.metakey][keyboardevent].

Émis avant d'envoyer les événements `keydown` et `keyup` dans la page. Appeler `event.preventDefault` empêchera les événements `keydown`/`keyup` et les raccourcis du menu dans la page.

Pour seulement empêcher les raccourcis du menu, utilisez [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore) :

```javascript
const { BrowserWindow } = require ('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // Par exemple, activer uniquement les raccourcis clavier du menu d’application lorsque
  // Ctrl/Cmd sont en baisse.
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
* `authenticationResponseDetails` objet
  * `url` URL
* `authInfo` objet
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
* `result` objet
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
* `color` (String | null) - La couleur du thème est en format de « #rrggbb ». Il est `null` 'aucune couleur de thème n’est définie.

Émis lorsque la couleur du thème d’une page change. Cela est généralement dû à la rencontre une balise meta:

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

Émis lorsque le type du curseur change. Le paramètre `type` peut être `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` ou `custom`.

Si le paramètre `type` est `custom`, le paramètre `image` contiendra l'image du curseur personnalisé dans un [`NativeImage`](native-image.md), et `scale`, `size` et `hotspot` contiendront les informations complémentaires à propos du curseur personnalisé.

#### Événement : 'context-menu'

Retourne :

* `event` Événement
* `params` objet
  * `x` Integer - coordonnée x.
  * `y` Integer - coordonée y.
  * `linkURL` String - L'URL du lien qui englobe le nœud du menu contextuel.
  * `linkText` String - Texte associé au lien. Peut être une chaîne vide si le contenu du lien est une image.
  * `pageURL` String - L'URL de la page haut niveau d'où le menu contextuel a été invoqué.
  * `frameURL` String - L'URL de la subframe d'où le menu contextuel a été invoqué.
  * `srcURL` String - URL source pour l’élément sur lequel le menu context a été invoqué. Les éléments avec urls source sont des images, audio et vidéo.
  * `mediaType` String - Type du nœud sur lequel le menu contextuel a été appelé. Peut être `none`, `image`, `audio`, `vidéo`, `toile`, `fichier` ou `plugin`.
  * `hasImageContents` Boolean - Si le menu contextuel a été invoqué sur une image au contenu non-vide ou non.
  * `isEditable` Boolean - Si le contexte est modifiable ou non.
  * `selectionText` String - Texte de la sélection sur laquelle le menu contextuel a été invoqué.
  * `titleText` String - Titre ou texte alternatif de la sélection sur lequel le contexte a été appelé.
  * `misspelledWord` String - Mot mal orthographié sous le curseur, si applicable.
  * `dictionarySuggestions` String[] - Un tableau de mots suggérés à montrer à l'utilisateur pour remplacer le `misspelledWord`.  Uniquement disponible si un mot est mal orthographié et que le correcteur orthographique est activé.
  * `frameCharset` String - L'encodage des caractères de la fenêtre sur lequel le menu a été appelé.
  * `inputFieldType` String - Si le menu contextuel a été appelé sur un champ modifiable, donne le type de ce champ. Les valeurs possibles sont `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Source d’entrée qui invoquait le menu contexte. Peut être `none`, `mouse`, `keyboard`, `touch` ou `touchMenu`.
  * `mediaFlags` - Les drapeaux de l’élément média sur lequel le menu context été invoqué.
    * `inError` Boolean - Si l'élément multimédia a crash.
    * `isPaused` Boolean - Si l'élément multimédia est en pause.
    * `isMuted` Boolean - Si l'élément multimédia est mis en sourdine.
    * `hasAudio` Boolean - Si l'élément multimédia émet un son audio.
    * `isLooping` Boolean - Si l'élément multimédia est en boucle.
    * `isControlsVisible` Boolean - Si les contrôles de l'élément multimédia sont visibles.
    * `canToggleControls` Boolean - Si les contrôles de l'élément multimédia sont toggleable.
    * `canRotate` Boolean - Si l'élément multimédia peut être pivoté.
  * `editFlags` objet - Ces indicateurs indiquent si le renderer croit qu’il est capable d’effectuer l’action correspondante.
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
const { app, BrowserWindow } = require ('electron')

let win = null
app.commandLine.appendSwitch ('enable-experimental-web-platform-features')

app.whenReady().then()=> {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, rappel) => {
    event.preventDefault()
    résultat const = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    si (!result) {
      callback(')
    } d’autre {
      rappel (result.deviceId)
    }
  })
})
```

#### Événement : 'paint'

Retourne :

* `event` Événement
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - Les données de l'image du frame entier.

Émis lorsqu’un nouveau cadre est généré. Seule la zone sale est passée dans le tampon zone tampon.

```javascript
const { BrowserWindow } = require ('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (événement, sale, image) => {
  // updateBitmap(sale, image.getBitmap())
})
win.loadURL ('http://github.com')
```

#### Événement : 'devtools-reload-page'

Émis quand la fenêtre des outils développeur demande aux webContents de se recharger

#### Événement : 'will-attach-webview'

Retourne :

* `event` Événement
* `webPreferences` WebPréférences - Les préférences web qui seront utilisées par l’invité page. Cet objet peut être modifié pour ajuster les préférences de l’invité page.
* `params` Enregistrement<string, string> - Les autres paramètres `<webview>` tels que l’URL `src` . Cet objet peut être modifié pour ajuster les paramètres de la page d’invité.

Émis lorsque le contenu web d' `<webview>`est attaché à ce contenu web web. Appeler `event.preventDefault()` détruire la page d’invité.

Cet événement peut être utilisé pour configurer des `webPreferences` pour l' `webContents` d’un `<webview>` avant qu’il ne soit chargé, et fournit la possibilité de définir des de paramètres qui ne peuvent pas être définis via des attributs `<webview>` .

**Note :** 'option de script `preload` spécifiée apparaîtra sous forme de `preloadURL` (et non `preload`) dans l’objet `webPreferences` émis avec cet événement.

#### Événement : 'will-attach-webview'

Retourne :

* `event` Événement
* `webContents` WebContents - Les contenus web invités qui sont utilisés par `<webview>`.

Émis quand un `<webview>` a été rattaché à ce contenu web.

#### Événement : 'console-message'

Retourne :

* `event` Événement
* `level` Integer - Le niveau de journal, de 0 à 3. Dans l’ordre, il correspond `verbose`, `info`, `warning` et `error`.
* `message` String - Le message de la console réelle
* `line` Integer - Le numéro de ligne de la source qui a déclenché ce message console
* `sourceId` String

Émis lorsque la fenêtre associée enregistre un message de console.

#### Evénement: 'préchargement-erreur'

Retourne :

* `event` Événement
* `preloadPath` String
* `error` Error

Émis lorsque le script de préchargement `preloadPath` lance une exception non manipulée `error`.

#### Événement : 'ipc-message'

Retourne :

* `event` Événement
* `channel` String
* `...args` any[]

Émis lorsque le processus de rendu envoie un message asynchrone via `ipcRenderer.send()`.

#### Evénement: 'ipc-message-sync'

Retourne :

* `event` Événement
* `channel` String
* `...args` any[]

Émis lorsque le processus de rendu envoie un message synchrone via `ipcRenderer.sendSync()`.

#### Événement : 'desktop-capturer-get-sources'

Retourne :

* `event` Événement

Émis lorsque `desktopCapturer.getSources()` est appelé dans le processus de rendu. L' Appel à `event.preventDefault()` lui fera retourner des sources vides.

#### Evénement : « besoin à distance » _de_

Retourne :

* `événement` IpcMainEvent
* `module` String

Émis lorsque `remote.require()` est appelé dans le processus de rendu. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Evénement: 'remote-get-global' _Deprecated_

Retourne :

* `événement` IpcMainEvent
* `globalName` String

Émis lorsque `remote.getGlobal()` est appelé dans le processus de rendu. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Evénement: 'remote-get-builtin' _Deprecated_

Retourne :

* `événement` IpcMainEvent
* `module` String

Émis lorsque `remote.getBuiltin()` est appelé dans le processus de rendu. Appeler `event.preventDefault()` empêchera le module d'être retourné. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Evénement: 'remote-get-current-window' _Deprecated_

Retourne :

* `événement` IpcMainEvent

Émis lorsque `remote.getCurrentWindow()` est appelé dans le processus de rendu. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Evénement: 'remote-get-current-web-content' _Deprecated_

Retourne :

* `événement` IpcMainEvent

Émis lorsque `remote.getCurrentWebContents()` est appelé dans le processus de rendu. Appeler `event.preventDefault()` empêchera l'objet d'être renvoyé. Des valeurs personnalisées peuvent être retournées en définissant `event.returnValue`.

#### Evénement : « taille préférée modifiée »

Retourne :

* `event` Événement
* `preferredSize` [taille](structures/size.md) - La taille minimale nécessaire pour contenir la mise en page du document, sans nécessiter de défilement.

Émis lorsque le `WebContents` taille préférée a changé.

Cet événement ne sera émis que lorsque `enablePreferredSizeMode` est défini pour `true` dans `webPreferences`.

### Méthodes d’instance

#### `contents.loadURL(url[, options])`

* `url` String
* `options` objet (facultatif)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (facultatif) - Une url HTTP Referrer.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (facultatif)
  * `baseURLForDataURL` String (facultatif) - Url de base (avec séparateur de chemin de suivi) pour les fichiers à charger par l’url de données. Cela n’est nécessaire que si le `url` est une url de données et doit charger d’autres fichiers.

Retours `Promise<void>` - la promesse se résorbera lorsque la page aura terminé le chargement (voir [`did-finish-load`](web-contents.md#event-did-finish-load)), et rejette les si la page ne se charge pas (voir [`did-fail-load`](web-contents.md#event-did-fail-load)). Un gestionnaire de rejet noop est déjà attaché, ce qui évite les erreurs de rejet non manipulées.

Charge le `url` dans la fenêtre. Le `url` doit contenir le préfixe du protocole, par exemple le `http://` ou `file://`. Si la charge doit contourner le cache http, utiliser l' `pragma` 'en-tête pour l’atteindre.

```javascript
const { webContents } = require ('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL ('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` objet (facultatif)
  * `query` Enregistrement<String, String> (facultatif) - Passé à `url.format()`.
  * `search` String (facultatif) - Passé à `url.format()`.
  * `hash` String (facultatif) - Passé à `url.format()`.

Retourne `Promise<void>` - la promesse se résoudra lorsque la page aura terminé le chargement (voir [`did-finish-load`](web-contents.md#event-did-finish-load)), et rejette si la page ne parvient pas à se charger (voir [`did-fail-load`](web-contents.md#event-did-fail-load)).

Charge le fichier donné dans la fenêtre, `filePath` devrait être un chemin pour un fichier HTML par rapport à la racine de votre application.  Par exemple, structure d’application comme celle-ci :

```sh
| racine
| - package.json
| - src
|   - principal.js
|   - indice.html
```

Exigerait un code comme celui-ci

```js
win.loadFile ('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Lance un téléchargement de la ressource à `url` sans naviguer. Le `will-download` événement de `session` sera déclenché.

#### `contents.getURL()`

Retourne `String` - l'URL de la page web courante.

```javascript
const { BrowserWindow } = require ('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL ('http://github.com').then ()=> {
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

Retours `Boolean` - Si le navigateur peut revenir à la page Web précédente.

#### `contents.canGoForward()`

Retours `Boolean` - Si le navigateur peut aller de l’avant à la page Web suivante.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Retours `Boolean` - Si la page Web peut aller à `offset`.

#### `contents.clearHistory()`

Efface l’historique de navigation.

#### `contents.goBack()`

Permet au navigateur de revenir en arrière une page Web.

#### `contents.goForward()`

Fait avancer le navigateur d’une page Web.

#### `contents.goToIndex(index)`

* `index` Integer

Navigue navigateur vers l’index de page Web absolu spécifié.

#### `contents.goToOffset(offset)`

* `offset` Integer

Navigue vers le décalage spécifié à partir de l’entrée actuelle.

#### `contents.isCrashed()`

Retours `Boolean` - Si le processus de rendu s’est écrasé.

#### `content.forcefullyCrashRenderer()`

Met fin avec force au processus de rendu qui héberge actuellement cette `webContents`. Cela provoquera l'émission de l'événement `render-process-gone` indiquant la cause avec `reason=killed || reason=crashed`. S’il vous plaît noter que certains webContents partager renderer processus et donc appeler cette méthode peut également planter le processus d’hôte pour d’autres webContents ainsi.

Appeler `reload()` immédiatement après avoir appelé méthode de traitement forcera le rechargement à se produire dans un nouveau processus. Cela doit être utilisé lorsque ce processus est instable ou inutilisable, par exemple afin de récupérer les de l' `unresponsive` événement.

```js
content.on ('unresponsive', async () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    titre: 'Voulez-vous essayer de recharger avec force l’application?', boutons
    : ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    contents.forcelyCrashRenderer()
    contents.reload()
  }
})
```

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Remplace l’agent utilisateur pour cette page Web.

#### `contents.getUserAgent()`

Retours `String` - L’agent utilisateur de cette page Web.

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` objet (facultatif)
  * `cssOrigin` String (facultatif) - Peut être soit « utilisateur » ou « auteur »; Spécifier « utilisateur » vous permet d’empêcher les sites Web de passer par le CSS que vous insérez. Par défaut est « auteur ».

Retours `Promise<String>` - Une promesse qui se résout avec une clé pour le CSS inséré qui peut plus tard être utilisé pour supprimer le CSS via `contents.removeInsertedCSS(key)`.

Injecte CSS dans la page Web actuelle et renvoie une clé unique pour la feuille de style insérée.

```js
content.on ('did-finish-load', () => {
  contents.insertCSS('html, corps { couleur de fond: #f00; }')
})
```

#### `content.removeInsertedCSS (clé)`

* `key` String

Retours `Promise<void>` - Se résout si la suppression a été réussie.

Supprime le CSS inséré de la page Web actuelle. La feuille de style est par sa clé, qui est retournée de `contents.insertCSS(css)`.

```js
content.on('did-finish-load', async () => {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `content.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (facultatif) - `false` par défaut.

Retours `Promise<any>` - Une promesse qui se résout avec le résultat de la de code exécutée ou est rejetée si le résultat du code est une promesse rejetée.

Évalue le `code` dans la page.

Dans la fenêtre du navigateur, certaines APIs HTML comme `requestFullScreen` peut être invoqué seulement par un geste de l'utilisateur. Définir `userGesture` à `true` supprimera cette limitation.

L’exécution du code sera suspendue jusqu’à ce que la page Web cesse de charger.

```js
content.executeJavaScript ('fetch(« https://jsonplaceholder.typicode.com/users/1 »).then(resp => resp.json()', true)
  .then ((résultat) => { console
    .log (résultat) // Sera l’objet JSON de l’appel d’extraction
  })
```

#### `content.executeJavaScriptInIsolatedWorld (worldId, scripts[, userGesture])`

* `worldId` Integer - L’ID du monde pour exécuter le javascript dans, `0` est le monde par défaut, `999` est le monde utilisé par la fonction `contextIsolation` Electron.  Vous pouvez fournir n’importe quel entier ici.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (facultatif) - `false` par défaut.

Retours `Promise<any>` - Une promesse qui se résout avec le résultat de la de code exécutée ou est rejetée si le résultat du code est une promesse rejetée.

Fonctionne comme `executeJavaScript` mais évalue `scripts` dans un contexte isolé.

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

Ignorer les raccourcis du menu d’application pendant que ce contenu Web est concentré.

#### `contents.setWindowOpenHandler(handler)`

* `handler` fonction<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * `details` objet
    * `url`Fiche-La _version_resolue du URL envoyee a`fenetre.ouverte{}`. par ex. ouvrir une fenetre avec`fenetre.ouverte ('foo')`va generer une chose comme`https://the-origin/the/current/path/foo`.
    * `Nommarge`Fiche-Nom de fenetre fourni a `window.open=fenetre.ouverte()`
    * `traits`Fiche-Une liste de traits de fenetre separee par comas, a ete fournie a`window.open()`.

  Va donner `{action: 'deny'} | {action: 'permettre', surpasserOptionsduNavigateurFenetreBrowser?: OptionsConstructeurNavigateursFenetre}`- - `refuser` va supprimer la creation dans la fenetre nouvelle. `permettre`va permettre la creation d'une fenetre nouvelle. Specifying `overrideBrowserWindowOptions` allows customization of the created window. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

Appelé avant de créer une fenêtre lorsque `window.open()` est appelé à partir du rendu. Voir [`window.open()`](window-open.md) plus de détails et comment l’utiliser en conjonction avec `did-create-window`.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Coupez l’audio sur la page Web actuelle.

#### `contents.isAudioMuted()`

Retours `Boolean` - Si cette page a été mise en sourdine.

#### `content.isCurrentlyAudible()`

Retours `Boolean` - Que l’audio soit actuellement en cours de lecture.

#### `contents.setZoomFactor(factor)`

* `factor` Double - Facteur zoom; par défaut est de 1,0.

Modifie le facteur de zoom en utilisant le facteur spécifié. Le Zoom factor est égal à la valeur du zoom exprimée en pourcent divisée par 100, donc 300% = 3.0.

Le facteur doit être supérieur à 0,0.

#### `contents.getZoomFactor()`

Retourne `Number` - le facteur de zoom actuel.

#### `contents.setZoomLevel(level)`

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement. La formule pour cela est `scale := 1.2 ^ level`.

> **NOTE**: La stratégie de zoom au niveau Chrome est de même origine, ce qui signifie que le niveau de zoom pour un domaine spécifique se propage dans toutes les instances de fenêtres avec le même domaine. La différenciation des URL de fenêtre fera fonctionner le zoom par fenêtre.

#### `contents.getZoomLevel()`

Retourne `Number` - le niveau de zoom actuel.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Retourne `Promise<void>`

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

> **NOTE**: Le zoom visuel est désactivé par défaut dans Electron. Pour le ré-activer, appelez :
> 
> ```js
contents.setVisualZoomLevelLimits (1, 3)
```

#### `contents.undo()`

Exécute la commande d' `undo` dans la page Web.

#### `contents.redo()`

Exécute la commande d' `redo` dans la page Web.

#### `contents.cut()`

Exécute la commande d' `cut` dans la page Web.

#### `contents.copy()`

Exécute la commande d' `copy` dans la page Web.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copiez l’image à la position donnée au presse-papiers.

#### `contents.paste()`

Exécute la commande d' `paste` dans la page Web.

#### `contents.pasteAndMatchStyle()`

Exécute la commande d' `pasteAndMatchStyle` dans la page Web.

#### `contents.delete()`

Exécute la commande d' `delete` dans la page Web.

#### `contents.selectAll()`

Exécute la commande d' `selectAll` dans la page Web.

#### `contents.unselect()`

Exécute la commande d' `unselect` dans la page Web.

#### `contents.replace(text)`

* `text` String

Exécute la commande d' `replace` dans la page Web.

#### `contents.replaceMisspelling(text)`

* `text` String

Exécute la commande d' `replaceMisspelling` dans la page Web.

#### `contents.insertText(text)`

* `text` String

Retourne `Promise<void>`

Insère le `text` à l'élément ciblé.

#### `contents.findInPage(text[, options])`

* `text` String - Contenu à rechercher, ne doit pas être vide.
* `options` objet (facultatif)
  * `forward` Boolean (facultatif) - Que ce soit pour rechercher vers l’avant ou vers l’arrière, par défaut `true`.
  * `findNext` Boolean (facultatif) - Qu’il s’agisse d’une première demande ou d’un suivi, par défaut `false`.
  * `matchCase` Boolean (facultatif) - Si la recherche doit être sensible aux cas, par défaut à `false`.

Retours `Integer` - L’id de demande utilisé pour la demande.

Commence une demande de trouver toutes les correspondances pour les `text` dans la page Web. Le résultat de la demande peut être obtenu en s’abonnant à [`found-in-page`](web-contents.md#event-found-in-page) événement.

#### `contents.stopFindInPage(action)`

* `action` String - Spécifie l’action à prendre lors de la fin demande [`webContents.findInPage`].
  * `clearSelection` - Effacer la sélection.
  * `keepSelection` - Traduire la sélection en une sélection normale.
  * `activateSelection` - Concentrez-vous et cliquez sur le nœud de sélection.

Arrête toute `findInPage` demande de `webContents` avec le `action`.

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

Capture un instantané de la page dans `rect`. En omettant `rect` vous capturerez toute la page visible.

#### `content.isBeingCaptured()`

Retours `Boolean` - Si cette page est capturée. Il revient vrai quand le nombre de capture est grand puis 0.

#### `content.incrementCapturerCount ([taille, stayHidden])`

* `size` [taille](structures/size.md) (facultatif) - La taille préférée pour le capturer.
* `stayHidden` Boolean (facultatif) - Gardez la page cachée au lieu d’être visible.

Augmentez le nombre de captures d’un. La page est considérée comme visible lorsque la fenêtre de son navigateur cachée et que le nombre de captures n’est pas nul. Si vous souhaitez que la page reste cachée, vous devez vous assurer que `stayHidden` est défini comme vrai.

Cela affecte également l’API visibilité de page.

#### `content.decrementCapturerCount ([stayHidden])`

* `stayHidden` Boolean (facultatif) - Gardez la page en état caché au lieu d’être visible.

Diminuer le nombre de captures d’un. La page sera réglée à l’état caché ou occlus lorsque sa fenêtre navigateur est cachée ou occluse et que le nombre de captures atteint zéro. Si vous voulez réduire compte de capture caché à la place, vous devez définir `stayHidden` à vrai.

#### `contents.getPrinters()`

Récupère la liste des imprimantes système.

Returns [`PrinterInfo[]`](structures/printer-info.md)

#### `content.print ([options], [callback])`

* `options` objet (facultatif)
  * `silent` Boolean (facultatif) - Ne demandez pas à l’utilisateur les paramètres d’impression. Par défaut la valeur est `false`.
  * `printBackground` Boolean (facultatif) - Imprime la couleur d’arrière-plan et l’image sur la page Web. Par défaut la valeur est `false`.
  * `deviceName` String (facultatif) - Réglez le nom de l’appareil d’imprimante à utiliser. Doit être le nom défini par le système et non le nom « amical », par exemple « Brother_QL_820NWB » et non « Frère QL-820NWB ».
  * `color` Boolean (facultatif) - Définissez si la page Web imprimée sera en couleur ou à l’échelle grise. La valeur par défaut est `true`.
  * `margins` objet (facultatif)
    * `marginType` String (facultatif) - Peut être `default`, `none`, `printableArea`, ou `custom`. Si `custom` est choisi, vous devrez également spécifier `top`, `bottom`, `left`, et `right`.
    * `top` numéro (facultatif) - La marge supérieure de la page Web imprimée, en pixels.
    * `bottom` numéro (facultatif) - La marge inférieure de la page Web imprimée, en pixels.
    * `left` numéro (facultatif) - La marge gauche de la page Web imprimée, en pixels.
    * `right` numéro (facultatif) - La marge droite de la page Web imprimée, en pixels.
  * `landscape` Boolean (facultatif) - Si la page Web doit être imprimée en mode paysage. Par défaut la valeur est `false`.
  * `scaleFactor` numéro (facultatif) - Le facteur d’échelle de la page Web.
  * `pagesPerSheet` numéro (facultatif) - Nombre de pages à imprimer par feuille de page.
  * `collate` Boolean (facultatif) - Si la page Web doit être rassemblée.
  * `copies` numéro (facultatif) - Nombre de copies de la page Web à imprimer.
  * `pageRanges` Objet[] (facultatif) - La plage de page à imprimer. Sur macOS, une seule plage est respectée.
    * `from` Number - Index de la première page à imprimer (0-based).
    * `to` numéro - Index de la dernière page à imprimer (inclusivement) (0-based).
  * `duplexMode` String (facultatif) - Réglez le mode duplex de la page Web imprimée. Can be `simplex`, `shortEdge`, or `longEdge`.
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

* `options` objet
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `scaleFactor` numéro (facultatif) - Le facteur d’échelle de la page Web. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print.
    * `from` Number - Index de la première page à imprimer (0-based).
    * `to` numéro - Index de la dernière page à imprimer (inclusivement) (0-based).
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

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

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

* `options` objet (facultatif)
  * `mode` String - Ouvre les devtools avec l’état de dock spécifié, peut être `right`, `bottom`, `undocked`, `detach`. Défauts pour durer l’état de dock utilisé. En mode `undocked` , il est possible de s’amarrer en arrière. En mode `detach` ce n’est pas le cas.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. La valeur par défaut `true`.

Ouvre les devtools.

Lorsque `contents` est une balise `<webview>` , le `mode` serait `detach` par défaut, passant explicitement une `mode` vide peut forcer en utilisant le dernier état de dock utilisé.

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

Commence à inspecter l’élément en position (`x`, `y`).

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

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. L’envoi de fonctions, de promesses, de symboles, de weakmaps ou de weaksets de lancer une exception.

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

> **REMARQUE :** l’envoi de types JavaScript non standard tels que les objets DOM ou objets électroniques spéciaux jettera une exception.

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
* `transfer` MessagePortMain[] (facultatif)

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

* `parameters` Object
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [taille](structures/size.md) - Définir la taille de vue imitée (vide signifie pas de remplacement)
  * `scale` Float - Échelle de vue imitée à l’intérieur de l’espace disponible (pas en forme mode de vue) (par défaut: `1`).

Activer l’émulation de l’appareil avec les paramètres donnés.

#### `contents.disableDeviceEmulation()`

Désactiver l’émulation de l’appareil activée par `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Envoie une entrée `event` à la page. **Note:** Le [`BrowserWindow`](browser-window.md) contenant le contenu doit être concentré pour que `sendInputEvent()` fonctionne.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (facultatif) - Par défaut à `false`.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` par défaut à `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object
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

Retours `Boolean` - Indique si *rendu hors écran* est activé.

#### `contents.startPainting()`

Si *rendu hors écran* activé et non la peinture, commencez à peindre.

#### `contents.stopPainting()`

Si *rendu hors écran* activé et la peinture, arrêtez de peindre.

#### `contents.isPainting()`

Retours `Boolean` - Si *rendu hors écran* activé retourne si elle est actuellement la peinture.

#### `contents.setFrameRate(fps)`

* `fps` Integer

Si *rendu hors écran* activé définit le taux d’image au nombre spécifié. Seules les valeurs comprises entre 1 et 240 sont acceptées.

#### `contents.getFrameRate()`

Retours `Integer` - Si *rendu hors écran* activé renvoie le taux d’image actuel.

#### `contents.invalidate()`

Planifie une repeindre complète de la fenêtre dans qui se trouve ce contenu Web.

Si *rendu hors écran* activé invalide le cadre et génère une nouvelle à travers l' `'paint'` événement.

#### `contents.getWebRTCIPHandlingPolicy()`

Retours `String` - Renvoie la politique de traitement ip webRTC.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Spécifiez la politique de traitement ip webRTC.
  * `default` - Expose les adresses publiques et locales de l’utilisateur. C’est le comportement par défaut. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. Cela n’expose aucune adresse locale.
  * `default_public_and_private_interfaces` - Expose les adresses publiques et locales de l' iPs. Lorsque cette stratégie est utilisée, WebRTC ne doit utiliser l’itinéraire par défaut utilisé par http. Cela expose également l’adresse privée par défaut associée. La par défaut est l’itinéraire choisi par l’OS sur un point d’évaluation multi-accueil.
  * `disable_non_proxied_udp` - N’expose pas les adresses publiques ou locales. Lorsque cette stratégie est utilisée, WebRTC ne doit utiliser TCP que pour contacter des pairs ou des serveurs à moins que serveur proxy ne prend en charge UDP.

L’établissement de la politique de traitement ip webRTC vous permet de contrôler les adresses IP exposées via WebRTC. Voir [BrowserLeaks pour](https://browserleaks.com/webrtc) plus détails.

#### `contents.getOSProcessId()`

Retours `Integer` - Le système d' `pid` du processus de associé.

#### `content.getProcessId ()`

Retours `Integer` - Le système interne `pid` Chrome du rendu associé. Peut il être comparé aux `frameProcessId` passé par des événements de navigation spécifiques au cadre (p. ex. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Chemin vers le fichier de sortie.

Retours `Promise<void>` - Indique si l’instantané a été créé avec succès.

Prend un instantané de tas V8 et l'enregistre dans `filePath`.

#### `contents.getBackgroundThrottling()`

Retourne `Boolean` - si oui ou non ce WebContents va étrangler les animations et les lorsque la page devient en arrière-plan. Cela affecte également l’API visibilité de page.

#### `content.setBackgroundThrottling (autorisé)`

* `allowed` Boolean

Contrôle si oui ou non ce WebContents va étrangler les animations et les lorsque la page devient en arrière-plan. Cela affecte également l’API visibilité de page.

#### `content.getType()`

Retourne `String` - le type de webContent. Peut être `backgroundPage`, `window`, `browserView`, `remote`, `webview` ou `offscreen`.

### Propriétés d'instance

#### `content.audioMuted`

Une `Boolean` propriété qui détermine si cette page est en sourdine.

#### `content.userAgent`

Une `String` propriété qui détermine l’agent utilisateur de cette page Web.

#### `content.zoomLevel`

Une `Number` propriété qui détermine le niveau de zoom pour ce contenu Web.

La taille d’origine est de 0 et chaque incrément au-dessus ou au-dessous représente un zoom de 20% plus grand ou plus petit à des limites par défaut de 300% et 50% de la taille d’origine, respectivement. La formule pour cela est `scale := 1.2 ^ level`.

#### `content.zoomFactor (en)`

Une `Number` propriété qui détermine le facteur de zoom pour ce contenu Web.

Le facteur de zoom est le pourcentage de zoom divisé par 100, donc 300% = 3,0.

#### `content.frameRate`

Une `Integer` propriété qui définit le taux d’image du contenu Web au nombre spécifié. Seules les valeurs comprises entre 1 et 240 sont acceptées.

Seulement applicable si *rendu hors écran* activé.

#### `contents.id` _Readonly_

Un `Integer` représentant l’identité unique de ce WebContents. Chaque ID est unique parmi ceux des instances de `WebContents` de l'application Electron.

#### `contents.session` _Readonly_

Un [`Session`](session.md) utilisé par ce webContents.

#### `contents.hostWebContents` _Readonly_

Une [`WebContents`](web-contents.md) cas qui pourrait posséder cette `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

Une `WebContents | null` propriété qui représente le devTools `WebContents` associé à un `WebContents`.

**note :** utilisateurs ne doivent jamais stocker cet objet parce qu’il peut devenir `null` lorsque les DevTools ont été fermés.

#### `contents.debugger` _Readonly_

Un [`Debugger`](debugger.md) exemple pour ce webContents.

#### `content.backgroundTrottant`

Une `Boolean` qui détermine si oui ou non ce WebContents va étrangler les animations et les lorsque la page devient en arrière-plan. Cela affecte également l’API visibilité de page.

#### `contents.mainFrame` _Readonly_

Une [`WebFrameMain`](web-frame-main.md) qui représente le cadre supérieur de la hiérarchie de trame de la page.

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
