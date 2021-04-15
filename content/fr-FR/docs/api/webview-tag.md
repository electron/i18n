# `<webview>` Tag

## Avertissement

La balise `webview` d'Electron est basée sur la webview [de `Chromium`][chrome-webview], qui subit des changements architecturaux spectaculaires. Cela a une incidence sur la stabilité des `webviews`, y compris rendu, la navigation et le routage des événements. Nous recommandons actuellement de ne pas utiliser l’étiquette `webview` et d’envisager des alternatives, comme `iframe`, Electron’s `BrowserView`, ou une architecture qui évite complètement le contenu intégré.

## Permettant

Par défaut, la balise `webview` est désactivée dans Electron >= 5.  Vous devez activer la balise en l’option `webviewTag` webPreferences lors de la construction de votre `BrowserWindow`. Pour plus d’informations, [les documents constructeurs de BrowserWindow](browser-window.md).

## Vue d'ensemble

> Affichez du contenu Web externe dans un cadre et un processus isolés.

Processus : [Rendu](../glossary.md#renderer-process)

Utilisez la `webview` pour intégrer du contenu « invité » (comme des pages Web) dans votre application Electron. Le contenu de l’invité est contenu dans `webview` conteneur. Une page intégrée de votre application contrôle la façon dont le contenu invité est disposé et rendu.

Contrairement à une `iframe`, le `webview` s’exécute dans un processus distinct de votre application 'application. Il n’a pas les mêmes autorisations que votre page Web et toutes les interactions entre votre application et le contenu intégré seront asynchrones. Cela permet à votre application à l’abri du contenu intégré. **Remarque :** La plupart des méthodes appelées sur la webview à partir de la page hôte nécessitent un appel synchrone au processus principal.

## Exemple

Pour intégrer une page Web dans votre application, ajoutez la balise `webview` à la page d’intégration de votre application (c’est la page de l’application qui affichera le contenu invité). Dans sa forme la plus simple , l’étiquette `webview` inclut la `src` de la page Web et les styles css qui contrôlent l’apparence du conteneur `webview` :

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Si vous souhaitez contrôler le contenu invité de quelque manière que ce soit, vous pouvez écrire des JavaScript qui écoutent les événements `webview` et répondent à ces événements en utilisant les méthodes `webview` recherche. Voici le code de l’échantillon avec deux auditeurs de l’événement: l’un qui écoute pour la page Web pour commencer à charger, l’autre pour la page Web d’arrêter le chargement, et affiche un « chargement ... » message pendant le temps de chargement :

```html
<script>
  onload = () => {
    const webview = document.querySelector ('webview')
    const indicator = document.querySelector ('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener ('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## Mise en œuvre interne

Sous le capot, `webview` est mis en œuvre avec [iframes hors processus (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). La balise `webview` est essentiellement un élément personnalisé utilisant dom ombre pour envelopper un élément `iframe` à l’intérieur.

Ainsi, le comportement `webview` est très similaire à un `iframe`inter-domaine , comme exemples:

* Lorsque vous cliquez sur un `webview`, l’accent de la page se déplacera de l' cadre à `webview`.
* Vous ne pouvez pas ajouter des auditeurs d’événements clavier, souris et défilement `webview`.
* Toutes les réactions entre le cadre de l' `webview` sont asynchrones.

## Note de style CSS

Veuillez noter que le style de l’étiquette `webview` utilise des `display:flex;` à l’interne pour s’assurer que l’élément `iframe` enfant remplit toute la hauteur et la largeur de son conteneur `webview` lorsqu’il est utilisé avec des dispositions traditionnelles et flexbox. S’il vous plaît pas surécrire la `display:flex;` par défaut de la propriété CSS, sauf `display:inline-flex;` pour la mise en page en ligne.

## Attribut de balise

La balise `webview` possède les attributs suivants :

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Un `String` représentant l'URL visible. Écrire à cet attribut initie la navigation de de haut niveau.

L' `src` de sa propre valeur rechargera la page actuelle.

L `src` attribut peut également accepter les URL de données, telles que les `data:text/plain,Hello, world!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Un `Boolean`. Lorsque cet attribut est présent, la page d’invité en `webview` aura une intégration de nœud et peut utiliser des API de nœuds comme les `require` et les `process` pour accéder aux ressources système de faible niveau. L’intégration des nœuds est désactivée par défaut dans la page 'invité.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

Un `Boolean` l’option expérimentale pour activer le support NodeJS dans des sous-cadres tels que les iframes l’intérieur `webview`. Tous vos préchargements se chargeront pour chaque iframe, vous pouvez utiliser `process.isMainFrame` pour déterminer si vous êtes dans le cadre principal ou non. Cette option est désactivée par défaut dans la page invité.

### `enableremotemodule (enableremotemodule)`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Un `Boolean`. Lorsque cet attribut est `false` page d’invité dans `webview` vous n’aurez pas accès au module [`remote`](remote.md) 'hôte. Le module distant n’est pas disponible par défaut.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Un `Boolean`. Lorsque cet attribut est présent, la page d' `webview` sera en mesure d’utiliser plugins de navigateur. Les plugins sont désactivés par défaut.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Une `String` spécifie un script qui sera chargé avant que d’autres scripts ne s’exécutent dans la page invité. Le protocole de l’URL du script doit être soit `file:` ou `asar:`, car il sera chargé par `require` page d’invité sous le capot.

Lorsque la page d’invité n' pas d’intégration de nœuds, ce script aura toujours un accès à toutes les API de nœud, mais les objets mondiaux injectés par Node seront supprimés une fois que ce script aura terminé l’exécution.

**Note :** Cette option apparaîtra comme `preloadURL` (et non `preload`) dans `webPréferences` spécifiées à l’événement `will-attach-webview `.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Une `String` définit l’URL du référent pour la page d’invité.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Une `String` définit l’agent utilisateur pour la page d’invité avant que la page ne soit naviguée vers. Une fois page est chargée, utilisez la méthode `setUserAgent` pour modifier l’agent utilisateur.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

Un `Boolean`. Lorsque cet attribut est présent, la page d’invité aura une sécurité Web désactivée. La sécurité Web est activée par défaut.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

Un `String` qui définit la session utilisée par la page. Si `partition` commence par `persist:`, la page utilisera une session persistante disponible pour toutes les pages de l’application avec même `partition`. s'il n'y a pas de préfixe `persistant:`, la page utilisera une session en mémoire . En assignant la même `partition`, plusieurs pages peuvent partager la même session. Si le `partition` n’est passet, la session par défaut de l' sera utilisée.

Cette valeur ne peut être modifiée qu’avant la première navigation, puisque la session d’un processus de rendu actif ne peut pas changer. Les tentatives subséquentes de modifier valeur nominale échoueront à l’exception des DOM.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Un `Boolean`. Lorsque cet attribut est présent, la page d’invité sera autorisée à ouvrir de nouvelles fenêtres. Les fenêtres contextups sont désactivées par défaut.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

Un `String` qui est une liste séparée de virgule de chaînes qui spécifie les préférences web à définir sur la webview. La liste complète des chaînes de préférences prises en charge peut être trouvée dans [BrowserWindow](browser-window.md#new-browserwindowoptions).

La chaîne suit le même format que la chaîne de fonctionnalités dans `window.open`. Un nom en soi est donné une valeur `true` boolean. Une préférence peut être définie sur une autre valeur en incluant un `=`, suivi de la valeur. Les valeurs `yes` et `1` sont interprétées comme `true`, tandis que `no` et `0` sont interprétées comme `false`.

### `enableblinkfeatures (en)`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Un `String` qui est une liste de chaînes qui spécifie les caractéristiques de clignotement à permettre séparés par `,`. La liste complète des chaînes de fonctionnalités prises en charge se trouve dans le fichier [RuntimeEnabledFeatures.json5][runtime-enabled-features] .

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Un `String` qui est une liste de chaînes qui spécifie les caractéristiques de clignotement à désactivé séparé par `,`. La liste complète des chaînes de fonctionnalités prises en charge se trouve dans le fichier [RuntimeEnabledFeatures.json5][runtime-enabled-features] .

## Méthodes

La balise `webview` possède les méthodes suivantes :

**Remarque :** l’élément webview doit être chargé avant d’utiliser les méthodes.

**Exemple**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` objet (facultatif)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (facultatif)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Retours `Promise<void>` - La promesse se résorbera lorsque la page aura terminé le chargement (voir [`did-finish-load`](webview-tag.md#event-did-finish-load)), et rejette les si la page ne se charge pas (voir [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Charge le `url` dans la webview, le `url` doit contenir le préfixe du protocole, par exemple le `http://` ou `file://`.

### `<webview>.downloadURL (url)`

* `url` String

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

Retours `String` - L’URL de la page d’invité.

### `<webview>.getTitle()`

Retours `String` - Le titre de la page d’invité.

### `<webview>.isLoading()`

Retours `Boolean` - Si la page d’invité est toujours le chargement des ressources.

### `<webview>.isLoadingMainFrame()`

Retourne `Boolean` - Si la frame principale (et pas seulement un iframe ou frames qu'il contient) sont toujours en chargement.

### `<webview>.isWaitingForResponse()`

Retours `Boolean` - Que la page invité attend une première réponse pour la principale de la page.

### `<webview>.stop()`

Arrête toute navigation en attente.

### `<webview>.reload()`

Recharge la page d’invité.

### `<webview>.reloadIgnoringCache()`

Recharge la page d’invité et ignore le cache.

### `<webview>.canGoBack()`

Retours `Boolean` - Si la page d’invité peut revenir en arrière.

### `<webview>.canGoForward()`

Retours `Boolean` - Si la page d’invité peut aller de l’avant.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Retours `Boolean` - Si la page d’invité peut aller à `offset`.

### `<webview>.clearHistory()`

Clears the navigation history.

### `<webview>.goBack()`

Rend la page d’invité revenir en arrière.

### `<webview>.goForward()`

Fait avancer la page invité.

### `<webview>.goToIndex(index)`

* `index` Integer

Navigue vers l’index absolu spécifié.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

### `<webview>.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Remplace l’agent utilisateur pour la page d’invité.

### `<webview>.getUserAgent()`

Retours `String` - L’agent utilisateur pour la page d’invité.

### `<webview>.insertCSS(css)`

* `css` String

Retours `Promise<String>` - Une promesse qui se résout avec une clé pour le CSS inséré qui peut plus tard être utilisé pour supprimer le CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.removeInsertedCSS (clé)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. La feuille de style est par sa clé, qui est retournée de `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (facultatif) - Par défaut `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Évalue le `code` dans la page. Si `userGesture` est défini, il créera l’utilisateur contexte gestent dans la page. Les API HTML comme `requestFullScreen`, qui nécessitent une action l’utilisateur, peuvent profiter de cette option pour l’automatisation.

### `<webview>.openDevTools()`

Ouvre une fenêtre DevTools pour la page d’invité.

### `<webview>.closeDevTools()`

Ferme la fenêtre DevTools de la page d’invité.

### `<webview>.isDevToolsOpened()`

Retours `Boolean` - Si la page d’invité a une fenêtre DevTools ci-joint.

### `<webview>.isDevToolsFocused()`

Retours `Boolean` - Que la fenêtre DevTools de la page d’invité soit ciblée.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Commence à inspecter l’élément en position (`x`, `y`) de la page d’invité.

### `<webview>.inspectSharedWorker()`

Ouvre les DevTools pour le contexte de travail partagé présent dans la page invité.

### `<webview>.inspectServiceWorker()`

Ouvre les DevTools pour le contexte des travailleurs de service présents dans la page invité.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Réglez la page d’invité en sourdine.

### `<webview>.isAudioMuted()`

Retours `Boolean` - Si la page d’invité a été mise en sourdine.

### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

### `<webview>.undo()`

Exécute la commande d' `undo` dans la page.

### `<webview>.redo()`

Exécute la commande d' `redo` dans la page.

### `<webview>.cut()`

Exécute la commande d' `cut` dans la page.

### `<webview>.copy()`

Exécute la commande d' `copy` dans la page.

### `<webview>.paste()`

Exécute la commande d' `paste` dans la page.

### `<webview>.pasteAndMatchStyle()`

Exécute la commande d' `pasteAndMatchStyle` dans la page.

### `<webview>.delete()`

Exécute la commande d' `delete` dans la page.

### `<webview>.selectAll()`

Exécute la commande d' `selectAll` dans la page.

### `<webview>.unselect()`

Exécute la commande d' `unselect` dans la page.

### `<webview>.replace(text)`

* `text` String

Exécute la commande d' `replace` dans la page.

### `<webview>.replaceMisspelling(text)`

* `text` String

Exécute la commande d' `replaceMisspelling` dans la page.

### `<webview>.insertText(text)`

* `text` String

Retourne `Promise<void>`

Insère le `text` à l'élément ciblé.

### `<webview>.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` objet (facultatif)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. Le résultat de la demande peut être obtenu en s’abonnant à [`found-in-page`](webview-tag.md#event-found-in-page) événement.

### `<webview>.stopFindInPage(action)`

* `action` String - Spécifie l’action à prendre lors de la fin [`<webview>.findInPage`](#webviewfindinpagetext-options) demande.
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Arrête toute `findInPage` demande de `webview` avec le `action`.

### `<webview>.print([options])`

* `options` objet (facultatif)
  * `silent` Boolean (optional) - Don't ask user for print settings. Par défaut la valeur est `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Par défaut la valeur est `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. La valeur par défaut est `true`.
  * `margins` Object (optional)
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

Imprime `webview`page Web de l’équipe. Même que `webContents.print([options])`.

### `<webview>.printToPDF (options)`

* `options` objet
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. et `width` dans des microns.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print. Sur macOS, seule la première gamme est à l’honneur.
    * `from` Number - Index de la première page à imprimer (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Peut être `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ou un objet contenant `height`
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Retours `Promise<Uint8Array>` - Se résout avec les données PDF générées.

Imprime `webview`page Web de l’équipe en pdf, identique à `webContents.printToPDF(options)`.

### `<webview>.capturePage ([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optionnel) - La zone de la page dont on doit réaliser la capture.

Retourne `Promise<NativeImage>` - résout avec une [NativeImage](native-image.md)

Capture un instantané de la page dans `rect`. En omettant `rect` vous capturerez toute la page visible.

### `<webview>.send(canal, ... args)`

* `channel` String
* `...args` any[]

Retourne `Promise<void>`

Envoyez un message asynchrone au processus de rendu via `channel`, vous pouvez également envoyer arguments arbitraires. Le processus de rendu peut gérer le message en l' `channel` avec le module [`ipcRenderer`](ipc-renderer.md) .

Voir [webContents.send](web-contents.md#contentssendchannel-args) pour exemples.

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Retourne `Promise<void>`

Envoie une entrée `event` à la page.

Voir [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) pour une description détaillée de `event` objet.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Facteur de zoom.

Modifie le facteur de zoom en utilisant le facteur spécifié. Le Zoom factor est égal à la valeur du zoom exprimée en pourcent divisée par 100, donc 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Niveau de zoom.

Modifie le niveau de zoom jusqu'au niveau spécifié. La taille originale est de 0 et chaque incrément au-dessus ou en dessous représente un zoom de 20% supérieur ou inférieure jusqu'au limites de 300% et 50% de la taille originale, respectivement. The formula for this is `scale := 1.2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.

### `<webview>.getZoomLevel()`

Returns `Number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits (minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Retourne `Promise<void>`

Définit le niveau maximum et minimum le niveau pinch-to-zoom.

### `<webview>.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContentsId ()`

Retours `Number` - L’ID WebContents de cette `webview`.

## Événements DOM

Les événements DOM suivants sont à la disposition du `webview` étiquette :

### Événement : 'load-commit'

Retourne :

* `url` String
* `isMainFrame` Boolean

Tiré lorsqu’une charge s’est engagée. Cela inclut la navigation dans le document de actuel ainsi que les charges au niveau des documents sous-encadrés, mais n’inclut pas charges de ressources asynchrones.

### Événement : 'did-finish-load'

Tiré lorsque la navigation est effectuée, c’est-à-dire que le spinner de l’onglet de tourner, et `onload` 'événement est expédié.

### Événement : 'did-fail-load'

Retourne :

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Cet événement est comme `did-finish-load`, mais tiré lorsque la charge a échoué ou a été annulé, par exemple. `window.stop()` est invoqué.

### Événement : 'did-frame-finish-load'

Retourne :

* `isMainFrame` Boolean

Tiré lorsqu’un cadre a effectué la navigation.

### Événement : 'did-start-loading'

Correspond aux points dans le temps où le spinner de l’onglet commence à tourner.

### Événement : 'did-stop-loading'

Correspond aux points dans le temps où le spinner de l’onglet cesse de tourner.

### Événement : 'dom-ready'

Tiré lorsque le document dans le cadre donné est chargé.

### Événement : 'page-title-updated'

Retourne :

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Événement : 'page-favicon-updated'

Retourne :

* `favicons` String[] - Tableau d'URLs.

Tiré lorsque la page reçoit des urls favicon.

### Événement : 'enter-html-full-screen'

Déclenché lorsque la page entre en plein écran déclenchée par l’API HTML.

### Événement : 'leave-html-full-screen'

Déclenché lorsque la page quitte plein écran déclenché par l’API HTML.

### Événement : 'console-message'

Retourne :

* `level` Integer - The log level, from 0 to 3. Dans l’ordre, il correspond `verbose`, `info`, `warning` et `error`.
* `message` String - Le message de la console réelle
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Tiré lorsque la fenêtre d’invité enregistre un message de console.

L’exemple suivant code en avant tous les messages journaux vers la console de l' sans tenir compte du niveau de journal ou d’autres propriétés.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('La page invité a envoyé un message :', e.message)
})
```

### Événement : 'found-in-page'

Retourne :

* `result` Object
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position du résultat actif.
  * `matches` Integer - Nombre de résultats.
  * `sélectionArea` Rectangle - Coordonnées de la région de la première correspondance.
  * `finalUpdate` Boolean

Tiré lorsqu’un résultat est disponible pour [`webview.findInPage`](#webviewfindinpagetext-options) demande.

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
* `options` BrowserWindowConstructorOptions - Les options qui devraient être utilisées pour créer la nouvelle [`BrowserWindow`](browser-window.md).

Déclenché lorsque la page d’invité tente d’ouvrir une nouvelle fenêtre de navigateur.

Le code d’exemple suivant ouvre la nouvelle url dans le navigateur par défaut du système.

```javascript
const { shell } = require ('electron')
const webview = document.querySelector ('webview')

webview.addEventListener ('new-window', async (e) => { protocole const
  = (nouvelle URL(e.url)).protocole
  si (protocole === 'http:' protocole || === 'https:') {
    attendre shell.openExternal(e.url)
  }
})
```

### Événement : 'will-navigate'

Retourne :

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Cet événement n’émettra pas lorsque la navigation est commencée programmatiquement avec API comme `<webview>.loadURL` et `<webview>.back`.

Il n’est pas non plus émis lors de la navigation dans la page, comme cliquer sur les liens d’ancrage ou mettre à jour le `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Appeler `event.preventDefault()` n __a pas__ 'avoir d’effet.

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

Tiré lorsque la page d’invité tente de se fermer.

Le code d’exemple suivant navigue `webview` `about:blank` lorsque le invité tente de se fermer.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Événement : 'ipc-message'

Retourne :

* `channel` String
* `args` n’importe quel []

Déclenché lorsque la page d’invité a envoyé un message asynchrone à la page d’intégration.

Avec `sendToHost` méthode et `ipc-message` événement, vous pouvez communiquer page d’invité et la page d’intégration :

```javascript
Dans la page d’intégration.
const webview = document.querySelector ('webview')
webview.addEventListener ('ipc-message', (event) => {
  console.log (event.channel)
  // Prints « pong »
})
webview.send ('ping')
```

```javascript
Dans la page d’invité.
const { ipcRenderer } = require ('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost ('pong')
})
```

### Événement : 'crashed'

Tiré lorsque le processus de rendu est écrasé.

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

Emitted when a page's theme color changes. Cela est généralement dû à la rencontre d’une balise meta:

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
