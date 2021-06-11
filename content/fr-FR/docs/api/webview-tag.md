# `<webview>` Tag

## Avertissement

La balise `webview` d'Electron est basée sur la webview [de `Chromium`][chrome-webview], qui subit des changements architecturaux spectaculaires. Cela affecte la stabilité des `webviews`, y compris le rendu, la navigation et le routage des événements. Nous recommandons actuellement de ne pas utiliser le tag `webview` et d’envisager des alternatives, comme `iframe`, [Electron’s `BrowserView`](browser-view.md), ou une architecture qui évite complètement le contenu intégré.

## Enabling

Par défaut, la balise `webview` est désactivée dans Electron >= 5.  Vous devez activer la balise en définissant l'option `webviewTag ` des webPréferenceslors de l'instanciation de votre `BrowserWindow`. Pour plus d'information voir la doc pour : [BrowserWindow constructor ](browser-window.md).

## Vue d'ensemble

> Affiche un contenu web externe dans une frame et un processus isolés.

Processus : [Rendu](../glossary.md#renderer-process)

Utilisez la balise `webview` pour intégrer du contenu 'hébergé' (comme des pages web) dans votre application Electron. Le contenu hébergé est inclus dans le conteneur `webview`. Une page intégrée dans votre application gère la façon dont le contenu est mis en page et affiché.

Contrairement à une`iframe`, la `webview` s'exécute dans un processus séparé de votre application . Il n'a pas les mêmes permissions que votre page web et toutes les interactions entre votre application et le contenu intégré seront asynchrones. Cela protège votre application du contenu incorporé. **Remarque :** La plupart des méthodes appelées sur la webview à partir de la page hôte nécessitent un appel synchrone au processus principal.

## Exemple

Pour intégrer une page web dans votre application, ajoutez la balise `webview` à la page de votre application qui va l'intégrer (c'est la page de l'application qui affichera le contenu de cette page). Dans sa forme la plus simple la balise `webview` inclut la `src` de la page web et les styles css qui contrôlent l'apparence du conteneur `webview`:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Si vous voulez contrôler de quelque manière que ce soit le contenu hébergé , vous pouvez écrire du JavaScript qui écoute les événements `webview` et répond à ces événements en utilisant les méthodes de la `webview`. Voici un exemple de code avec deux écouteurs d'événements : un qui écoute quand la page web commence à télécharger, l'autre quand la page web arrête le chargement, et affiche un message "loading..." pendant le temps de chargement :

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## Implémentation interne

Dans les détails `webview` est implémentée avec des [iframes hors processus (OOPIF)](https://www.chromium.org/developers/design-documents/oop-iframes). La balise `webview` est essentiellement un élément personnalisé utilisant un DOM fantôme pour encapsuler un élément `iframe`.

Donc, le comportement d'une `webview` est très similaire à une `iframe ` cross-domain, comme dans ces exemples :

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard, mouse, and scroll event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## Note de style CSS

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Attribut de balise

La balise `webview` possède les attributs suivants :

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Un `String` représentant l'URL visible. Writing to this attribute initiates top-level navigation.

En affectant sa propre valeur l'attribut `src` on rechargera la page actuelle.

L'attribut `src` peut également accepter des URL de données, telles que `data:text/plain,Hello, world !`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Un `Boolean`. Lorsque cet attribut est présent, la page hébergée dans la `webview ` pourra utiliser les API de node de nœud telles que `require` ou `process` pour accéder à des ressources système de bas niveau. Node integration est désactivée par défaut dans la page hébergée .

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. Cette option est désactivée par défaut dans la page invité.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Un `Boolean`. When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is unavailable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Un `Boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins. Les plugins sont désactivés par défaut.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

`String ` (facultatif) Spécifie un script qui sera chargé avant les autres scripts exécutés dans la page hébergée. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

**Note :** Cette option apparaîtra comme `preloadURL` (et non `preload`) dans `webPréferences` spécifiées à l’événement `will-attach-webview `.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

Un `Boolean`. When this attribute is present the guest page will have web security disabled. La sécurité Web est activée par défaut.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. s'il n'y a pas de préfixe `persistant:`, la page utilisera une session en mémoire . En assignant la même `partition`, plusieurs pages peuvent partager la même session. If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Un `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Les popups sont désactivés par défaut.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

## Méthodes

La balise `webview` possède les méthodes suivantes :

**Note:** The webview element must be loaded before using the methods.

**Exemple**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n"
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isLoadingMainFrame()`

Retourne `Boolean` - Si la frame principale (et pas seulement un iframe ou frames qu'il contient) sont toujours en chargement.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

Arrête toute navigation en attente.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Efface l'historique de navigation.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

* `index` Integer

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

### `<webview>.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` String

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injecte du CSS dans la page Web actuelle et renvoie une clé unique pour la feuille de style insérée .

### `<webview>.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

Retourne `Promise<any>` - Une promesse qui se résout avec le résultat du code exécuté ou se rejette si le résultat du code est une promesse rejetée.

Évalue le `code` dans la page. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### `<webview>.openDevTools()`

Opens a DevTools window for guest page.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.unselect()`

Executes editing command `unselect` in page.

### `<webview>.replace(text)`

* `text` String

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `text` String

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `text` String

Retourne `Promise<void>`

Insère le `text` à l'élément ciblé.

### `<webview>.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` Object (optional)
  * `forward` Boolean (facultatif) - Rechercher soit en avant soit en arrière, la valeur par défaut est `true`.
  * `findNext` Boolean (optional) - Whether to begin a new text finding session with this request. Doit être `true` pour les requêtes initiales et `false` pour les requêtes de suivi. Par défaut, `faux`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. Le résultat de la requête peut être obtenu en s'abonnant à l'événement [`found-in-page`](webview-tag.md#event-found-in-page).

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

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
  * `pageRanges` Object[] (facultatif) - La plage de page à imprimer.
    * `from` Number - Index de la première page à imprimer (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.

Retourne `Promise<void>`

Prints `webview`'s web page. Identique à `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* Objet `options`
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. and `width` in microns.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print. On macOS, only the first range is honored.
    * `from` Number - Index de la première page à imprimer (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optionnel) - La zone de la page dont on doit réaliser la capture.

Retourne `Promise<NativeImage>` - résout avec une [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

### `<webview>.send(channel, ...args)`

* `channel` String
* `...args` any[]

Retourne `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Retourne `Promise<void>`

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Facteur de zoom.

Modifie le facteur de zoom en utilisant le facteur spécifié. Le Zoom factor est égal à la valeur du zoom exprimée en pourcent divisée par 100, donc 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement. La formule pour cela est `'scale:= 1,2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Retourne `Promise<void>`

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

### `<webview>.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

The following DOM events are available to the `webview` tag:

### Événement : 'load-commit'

Retourne :

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Événement : 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Événement : 'did-fail-load'

Retourne :

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Événement : 'did-frame-finish-load'

Retourne :

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Événement : 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Événement : 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Événement : 'dom-ready'

Fired when document in the given frame is loaded.

### Événement : 'page-title-updated'

Retourne :

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Événement : 'page-favicon-updated'

Retourne :

* `favicons` String[] - Tableau d'URLs.

Fired when page receives favicon urls.

### Événement : 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Événement : 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Événement : 'console-message'

Retourne :

* `level` Integer - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`.
* `message` String - The actual console message
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('La page invité a envoyé un message :', e.message)
})
```

### Événement : 'found-in-page'

Retourne :

* Objet `result`
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position du résultat actif.
  * `matches` Integer - Nombre de résultats.
  * `sélectionArea` Rectangle - Coordonnées de la région de la première correspondance.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Événement : 'new-window'

Retourne :

* `url` String
* `frameName` String
* `disposition` String - Peut être `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` et `other`.
* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = (new URL(e.url)).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### Événement : 'will-navigate'

Retourne :

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Cet événement ne sera pas émis lorsque la navigation démarre par programmation grâce aux APIs comme `<webview>.loadURL` et `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does __NOT__ have any effect.

### Événement : 'did-navigate'

Retourne :

* `url` String

Émis lorsqu'une navigation est faite.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### Événement : 'did-navigate-in-page'

Retourne :

* `isMainFrame` Boolean
* `url` String

Émis lorsqu'une navigation dans la page s'est produite.

En cas de navigation dans la page, l'URL de la page change mais ne provoque pas de navigation à l'extérieur de la page. Par exemple, lorsque vous cliquez sur un lien d'ancrage ou lorsque l'événement DOM `hashchange` est déclenché.

### Événement : 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Événement : 'ipc-message'

Retourne :

* `channel` String
* `args` any[]

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```javascript
// In guest page.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Événement : 'crashed'

Fired when the renderer process is crashed.

### Événement : 'plugin-crashed'

Retourne :

* `name` String
* `version` String

Déclenché lorsqu’un processus de plugin crash.

### Événement : 'destroyed'

Déclenché lorsque le WebContents est détruit.

### Événement : 'media-started-playing'

Émis lorsqu'un média se démarre.

### Événement : 'media-paused'

Émis lorsque le média est suspendu ou terminé.

### Événement : 'did-change-theme-color'

Retourne :

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Événement : 'update-target-url'

Retourne :

* `url` String

Émis lorsque la souris passe sur un lien ou le clavier déplace le focus vers un lien.

### Événement : 'devtools-opened'

Émis lorsque la DevTools est ouverte.

### Événement : 'devtools-closed'

Émis lorsque la DevTools est fermée.

### Événement : 'devtools-focused'

Émis lorsque la DevTools est active / ouverte.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[chrome-webview]: https://developer.chrome.com/docs/extensions/reference/webviewTag/
