# BrowserWindow

> Créer et contrôle des fenêtres navigateur.

Processus : [Main](../glossary.md#main-process)

```javascript
// Dans le processus main.
const { BrowserWindow } = require('electron')

// Ou utilisez `remote` depuis le renderer process.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// Charge une URL distante
win.loadURL('https://github.com')

// Ou charge un fichier HTML local
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Fenêtre sans bords (Frameless window)

Pour créer une fenêtre sans chrome, ou une fenêtre transparente en forme arbitraire, vous pouvez utiliser l'API [Frameless Window](frameless-window.md).

## Afficher des fenêtres avec élégance

Lors du chargement d'une page dans la fenêtre, les utilisateurs peuvent voir une page se charger au fur et à mesure, ce qui n'est pas bon pour une app native. Pour charger la page en évitant ce problème, il y a deux solutions en fonction de la situation.

### À l'aide de l'événement `ready-to-show`

Pendant le chargement de la page, l'événement `ready-to-show` sera émis lorsque le process de rendu aura rendu la page pour la première fois si la fenêtre n'a pas encore été rendue. Afficher la page une fois que l'event a été trigger rendra la page sans ce processus de chargement au fur et à mesure:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Cet événement est généralement émis après l’événement `did-finish-load`, mais pour les pages avec beaucoup de ressources distantes, il peut être émis avant l’événement `did-finish-load`.

### Régler `backgroundColor`

Pour une application complexe, l’événement `ready-to-show` pourrait être émis trop tard, donnant une impression de lenteur. Dans ce cas, il est recommandé d'afficher la fenêtre immédiatement et d'utiliser un `backgroundColor` proche de la couleur de fond de votre application :

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Notez que même pour les applications qui utilisent l'évènement `ready-to-show`, il est toujours recommandé de définir `backgroundColor` pour avoir un rendu plus naturel.

## Fenêtres parent et enfant

En utilisant l'option `parent`, vous pouvez créer une fenêtre enfant:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

La fenêtre `child` sera toujours au dessus de la fenêtre `top`.

### Fenêtres modales

Une fenêtre modale est une fenêtre enfant qui désactive la fenêtre parent. Pour créer une fenêtre modale, il faut définir les options `parent` et `modal` :

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### Visibilité de la page

L'[API de visibilité de la page](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) fonctionne comme ci-dessous :

* Sur toutes les plateformes, l'état de visibilité détécte si la fenêtre est cachée/minimisée ou pas.
* De plus, sur macOS, l'état de visibilité détécte également l'état d'occlusion de la fenêtre. Si la fenêtre est occluée (c'est-à-dire entièrement recouverte) par une autre fenêtre, l'état de visibilité sera `hidden`. Sur les autres plateformes, l'état de visibilité sera `hidden` seulement lorsque la fenêtre est minimisée ou cachée explicitement avec `win.hide()`.
* Si une `BrowserWindow` est crée avec `show:false`, l'état de visibilité initial sera `visible` même si la fenêtre est cachée.
* Si `backgroundThrottling` est désactivé, l'état de visibilité restera `visible` même si la fenêtre est minimisée, obstruée ou cachée.

Il est recommandé de mettre en pause les opérations coûteuse lorsque l'état de visibilité est `hidden` afin de minimiser la consommation d'énergie.

### Avertissement sur les plateformes

* Sur macOS, les fenêtres modales seront affichés comme des feuilles attachées à la fenêtre parent.
* Sur macOS, la fenêtre enfant va garder la position relative à la fenêtre parent lorsque la fenêtre parent bouge. Sur Windows et Linux, la fenêtre enfant ne bougera pas.
* Sur Linux, le type des fenêtre modales sera changé par `dialog`.
* Sur Linux, beaucoup d'environnements bureau ne peuvent pas cacher une fenêtre modale.

## Classe : BrowserWindow

> Créer et contrôle des fenêtres navigateur.

Processus : [Main](../glossary.md#main-process)

`BrowserWindow` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Cela crée une nouvelle `BrowserWindow` avec les propriétés natives définies par les `options`.

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (facultatif) - La largeur et la hauteur (`width` et `height`) seront utilisées pour définir la taille de la page Web, ce qui signifie que la taille de la fenêtre réelle inclura la taille du cadre de celle-ci. La fenêtre complète sera donc légèrement plus grande que la taille de son contenu. Par défaut la valeur est `false`.
  * `center` Boolean (facultatif) - afficher la fenêtre dans le centre de l’écran.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. La valeur par défaut est `true`.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. La valeur par défaut est `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. La valeur par défaut est `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. La valeur par défaut est `true`.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. La valeur par défaut est `true`.
  * `focusable` Boolean (facultatif) - Si la fenêtre peut avoir le focus. La valeur par défaut est `true`. Sur Windows, mettre `focusable: false` implique également le réglage `skipTaskbar: true`. Sur Linux, mettre `focusable: false` fait que la fenêtre arrête d'interragir avec wm, par conséquent la fenêtre restera toujours au dessus dans tous les espaces de travail.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Par défaut la valeur est `false`.
  * `fullscreen` Boolean (facultatif) - Est-ce que la fenêtre doit s'afficher en plein écran. Quand explicitement mit a `faux`, le bouton plein écran sera caché ou désactivé sur macOS. Par défaut la valeur est `false`.
  * `fullscreen` Boolean (facultatif) - Est-ce que la fenêtre peut s'afficher en plein écran. Sur macOS, indiquez également si le bouton de maximizer/zoom doit basculer en mode plein écran ou agrandir la fenêtre. La valeur par défaut est `vraie`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Par défaut la valeur est `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Par défaut la valeur est `false`.
  * `titre` String (facultatif) - Titre par défaut de la fenêtre. La valeur par défaut est `"Electron"`. Si la balise HTML `<title>` est définie dans le fichier HTML chargé par `loadURL()`, cette propriété sera ignorée.
  * `icon` ([NativeImage](native-image.md) | String) (facultatif) - L'icône de la fenêtre. Sur Windows, il est recommandé d'utiliser le format `ICO` pour un rendu optimal. Si non défini, l'icone de l’exécutable sera utilisé.
  * `show` Boolean (optional) - Whether window should be shown when created. La valeur par défaut est `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). La valeur par défaut est `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Par défaut la valeur est `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Par défaut la valeur est `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Par défaut la valeur est `false`.
  * `enableLargerThanScreen` Booléen (facultatif) - Permet à la fenêtre d'être redimensionnée plus grande que l'écran. Par défaut la valeur est `false`.
  * `BackgroundColor` String (facultatif) - Couleur d'arrière-plan de la fenêtre en valeur hexadécimale, comme `#66CD00` ou `#FFF` ou `#80FFFFFF` (alpha au format #AARRGGBB est supporté si `transparent` est défini à `true`). La valeur par défaut est `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. La valeur par défaut est `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Par défaut la valeur est `false`.
  * `transparent` Boolean (facultatif) - Rend la fenêtre [transparente](frameless-window.md). Par défaut la valeur est `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are:
    * `default` - Résultats dans la barre de titre standard de Mac opaque gris.
    * `Caché` - Résultats dans une barre de titre cachée et une fenêtre de contenu en pleine taille, encore la barre de titre a toujours les contrôles standards de la fenêtre ("feux de circulation") dans en haut à gauche.
    * `hiddenInset` - Résultats dans une barre de titre cachée avec un look alternatif où les boutons du feu de circulation sont légèrement plus insérables à partir du bord de la fenêtre.
    * `customButtonsOnHover` Boolean (facultatif) - Dessine une fermeture personnalisée, et minimise les boutons sur les fenêtres sans cadre macOS. Ces boutons n'afficheront pas à moins d'être survolés en haut à gauche de la fenêtre. Ces boutons personnalisés empêchent les problèmes liés aux événements de la souris qui se produisent avec les boutons standard de la barre d'outils de la fenêtre. **Note:** Cette option est actuellement expérimentale.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Par défaut la valeur est `false`.
  * `thickFrame` Boolean (facultatif) - Utilisez le style `WS_THICKFRAME` pour les fenêtres sans cadre sur Windows, qui ajoute une image standard de fenêtre. Le définir à `false` supprimera les animations de fenêtre et de fenêtre. La valeur par défaut est `true`.
  * `vibrancy` String (facultatif) - Ajoute un type d'effet de vibrance à la fenêtre, uniquement sur macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`.  Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Si `true`, la fenêtre grandira à la largeur préférée de la page web lors du zoom, `false` le fera zoomer sur la largeur de l'écran. Cela affectera également le comportement lorsque vous appelez `maximize()` directement. Par défaut la valeur est `false`.
  * `tabbingIdentifier` String (facultatif) - Nom du groupe d'onglets, permet d'ouvrir la fenêtre sous la forme d'un onglet natif sur macOS 10.12+. Les fenêtres avec le même identifiant de tabulation seront regroupées. Cela ajoute également un nouveau bouton d'onglet natif à la barre d'onglets de votre fenêtre et permet à votre `app` et fenêtre de recevoir l'événement `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (facultatif) - Activer ou non DevTools. Si elle est définie à `false`, ne peut pas utiliser `BrowserWindow.webContents.openDevTools()` pour ouvrir DevTools. La valeur par défaut est `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Par défaut la valeur est `false`.
    * `nodeIntegrationInWorker` Boolean (facultatif) - Si l'intégration de nœuds est activée dans les workflows web. Par défaut la valeur est `false`. Plus d'informations peuvent être trouvée dans [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (facultatif) - Option expérimentale pour activer le support de Node.js dans les sous-cadres tels que les iframes et les fenêtres enfants. Tous vos préchargements seront chargés pour chaque iframe, vous pouvez utiliser `process.isMainFrame` pour déterminer si vous êtes dans le cadre principal ou non.
    * `preload` String (facultatif) - Spécifie un script qui sera chargé avant les autres scripts exécutés dans la page. Ce script aura toujours accès aux API de noeuds peu importe que l'intégration de noeuds soit activée ou désactivée. La valeur doit être le chemin absolu vers le script. Lorsque l'intégration des nœuds est désactivée, le script de préchargement peut réintroduire les symboles globaux de nœud dans la portée globale. Voir l'exemple [ici](process.md#event-loaded).
    * `sandbox` Booléen (facultatif) - Si défini, le moteur de rendu associé à la fenêtre, la rendre compatible avec le bac à sable Chromium au niveau du système d'exploitation et la désactivation du nœud. s moteur. Ce n'est pas la même chose que l'option `nodeIntegration` et les API disponibles pour le script de préchargement sont plus limitées. En savoir plus sur l'option [ici](sandbox-option.md). **Note :** Cette option est actuellement expérimentale et peut être supprimée dans les prochaines versions d'Electron.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. La valeur par défaut est `true`.
    * `session` [Session](session.md#class-session) (facultatif) - Définit la session utilisée par la page . Au lieu de passer l'objet Session directement, vous pouvez également choisir d'utiliser l'option `partition` à la place, qui accepte une chaîne de partition. Lorsque `session` et `partition` sont fournies, `session` sera préférée. La session par défaut est celle par défaut.
    * `partition` String (facultatif) - Définit la session utilisée par la page en fonction de la chaîne de partition de la session . Si `partition` commence par `persist:`, la page utilisera une session persistante disponible pour toutes les pages de l'application avec le même `partition`. S'il n'y a pas de préfixe `persistant:`, la page utilisera une session en mémoire . En assignant la même `partition`, plusieurs pages peuvent partager la même session. La session par défaut est celle par défaut.
    * `affinity` String (facultatif) - Lorsque spécifié, les pages web avec le même `affinity` s'exécuteront dans le même processus de rendu . Notez que en raison de la réutilisation du processus du moteur de rendu certaines options `webPreferences` seront également partagées entre les pages web, même lorsque vous avez spécifié des valeurs différentes pour elles, incluant mais non limité à `preload`, `sandbox` et `nodeIntegration`. Il est donc suggéré d'utiliser exactement la même `webPreferences` pour les pages web avec la même `affinité`. _Cette propriété est expérimentale_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. La valeur par défaut est `true`.
    * `webSecurity` Boolean (facultatif) - Lorsque `false`, il désactivera la politique de même origine (généralement en utilisant des sites de test par des personnes), et définissez `allowRunningInsecureContent` à `true` si cette option n'a pas été définie par l'utilisateur. La valeur par défaut est `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Par défaut la valeur est `false`.
    * `images` Boolean (optional) - Enables image support. La valeur par défaut est `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. La valeur par défaut est `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Par défaut la valeur est `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Par défaut la valeur est `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Par défaut la valeur est `false`.
    * `enableBlinkFeatures` String (facultatif) - Une liste de chaînes de caractères séparées par `,`, comme `CSSVariables,KeyEventKey` pour activer. La liste complète des chaînes de caractères supportées peut être trouvée dans le fichier [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) .
    * `disableBlinkFeatures` String (facultatif) - Une liste de chaînes de caractères séparées par `,`, comme `CSSVariables,KeyEventKey` pour désactiver. La liste complète des chaînes de fonctionnalités supportées peut être trouvée dans le fichier [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) .
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      * `standard` String (facultatif) - Par défaut `Times New Roman`.
      * `serif` String (facultatif) - Par défaut `Times New Roman`.
      * `sansSerif` String (facultatif) - `Arial`.
      * `monospace` String (facultatif) - `Courrier New`.
      * `cursive` String (facultatif) - `Script`.
      * `fantasy` String (facultatif) - `Impact`.
    * `defaultFontSize` Integer (facultatif) - `16`.
    * `defaultMonospaceFontSize` Integer (facultatif) - `13`.
    * `minimumFontSize` Integer (facultatif) - `0`.
    * `defaultEncoding` String (facultatif) - `ISO-8859-1`.
    * `backgroundThrottling` Boolean (facultatif) - Si vous voulez maîtriser les animations et les minuteurs lorsque la page devient en arrière-plan. Cela affecte également l'API [Visibilité de la page](#page-visibility). Par défaut, `true`.
    * `Offscreen` Boolean (facultatif) - Activer le rendu hors écran pour la fenêtre du navigateur. Par défaut, `faux`. Voir le [tutoriel de rendu hors écran](../tutorial/offscreen-rendering.md) pour plus de détails.
    * `contextIsolation` Boolean (facultatif) - Exécuter les API Electron et le script `preload` spécifié dans un contexte JavaScript séparé. Par défaut, est `faux`. Le contexte dans lequel le script `preload` s'exécute va toujours avoir un accès complet aux `document` et `window` globales mais il utilisera son propre jeu de builtins JavaScript (`Tableau`, `Objet`, `JSON`, etc. et sera isolé de toute modification apportée à l'environnement global par la page chargée. L'API Electron ne sera disponible que dans le script `preload` et non dans la page chargée. Cette option devrait être utilisée lorsque chargeant du contenu distant potentiellement non fiable pour s'assurer que le contenu chargé ne peut pas altérer avec le script `preload` et toutes les API Electron en cours d'utilisation. Cette option utilise la même technique utilisée par [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Vous pouvez accéder à ce contexte dans les outils de développement en sélectionnant l'entrée « Contexte isolé d'Electron » dans la liste déroulante en haut de l'onglet Console.
    * `nativeWindowOpen` Boolean (facultatif) - Utiliser natif `window.open()`. Par défaut, `faux`. Les fenêtres enfants auront toujours l'intégration du nœud désactivée sauf si `nodeIntegrationInSubFrames` est vrai. **Note:** Cette option est actuellement expérimentale.
    * `webviewTag` Boolean (facultatif) - Activer la balise [`< webview>`](webview-tag.md). Par défaut, `faux`. **Remarque :** Le script `preload` configuré pour le `< webview>` aura une intégration de nœuds activée lorsqu'il est exécuté, donc vous devez vous assurer que le contenu distant/non fiable n'est pas en mesure de créer une balise `<webview>` avec un préchargement de `potentiellement malveillant` script. Vous pouvez utiliser l'événement `will-attach-webview` sur [webContents](web-contents.md) pour supprimer le script `preload` et valider ou modifier les paramètres initiaux de `< webview>`.
    * `additionalArguments` String[] (facultatif) - Une liste de chaînes qui seront ajoutées au processus `. rgv` dans le processus renderer de cette application. Utile pour passer de petites bits de données vers le bas pour le processus de rendu des scripts de préchargement.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Par défaut la valeur est `false`.
    * `safeDialogsMessage` String (facultatif) - Le message à afficher lorsque la protection consécutive des dialogues est déclenchée. Si non défini, le message par défaut serait utilisé, notez que le message par défaut est actuellement en anglais et non localisé.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Par défaut la valeur est `false`.
    * `autoplayPolicy` String (facultatif) - La politique de lecture automatique à appliquer au contenu dans la fenêtre, peut être `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Par défaut, `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

Lorsque l'on définie une taille minimum ou maximum pour la fenêtre avec `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, cela contraint les utilisateurs uniquement. Cela ne vous empêche pas de passer une taille qui ne suit pas les contraintes de tailles à `setBounds`/`setSize` ou au constructeur de `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* Sur Linux, les types possible sont `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`.
  * Le type `textured` ajoute un aspect métal dégradé (`NSTexturedBackgroundWindowMask`).
  * Le type `desktop` place les fenêtre au niveau de l'arière plan. (`kCGDesktopWindowLevel - 1`). Remarque, la fenêtre du Bureau ne recevra pas le focus ni les évennements souris ou clavier, mais il est possible d'utiliser `globalShortcut` pour recevoir des entrées avec modération.
* Sur Windows, le type possible est `toolbar`.

### Événements d’instance

Les objets crées avec `new BrowserWindow` émettent les évennements suivants :

**Remarque :** Certains événements sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### Événement : 'page-title-updated'

Retourne :

* `event` Événement
* `title` String
* `explicitSet` Boolean

Émis lorsque le document a changé son titre, appeler `event.preventDefault()` empêchera le titre de la fenêtre native de changer. `explicitSet` is false when title is synthesized from file url.

#### Événement : 'close'

Retourne :

* `event` Événement

Emis lorsque la fenêtre va être fermée. Émis avant les événements `beforeunload` et `unload` du DOM. Appeler `event.preventDefault()` annulera la fermeture.

Normalement, vous voudriez utiliser le gestionnaire `beforeunload` pour décider si une fenêtre doit être fermée, ce qui sera aussi appelé lorsque la fenêtre est rechargée. Dans Electron, n'importe quelle valeur retournée autre que `undefined` annulera la fermeture. Par exemple :

```javascript
window.onbeforeunload = (e) => {   console.log('I do not want to be closed')  

// A la différence des navigateurs web, un message sera affiché aux utilisateurs, retourner
// une valeur non-nulle annulera la fermeture.
  // Il est recommandé d'utiliser l'API de dialogue afin de laisser l'utilisateur confirmer la fermeture de
// l'application.
  e.returnValue = false // Equivaut à un `return false` mais ce n'est pas recommandé
}
```
_**Note**: Il y a une subtile différence entre le comportement de `window.onbeforeunload = handler` et `window.addEventListener('beforeunload', handler)`. Il est recommendé de toujours spécifier l' `event.returnValue` explicitement, plutôt que de seulement retourner une valeur, cette méthode fonctionne mieux avec Electron._

#### Événement : 'closed'

Émit lorsque la fenêtre est fermée. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Événement : 'session-end' _Windows_

Émis lorsque la session va se terminer à cause d'un redémarrage, une extinction forcée ou une déconnexion.

#### Événement : 'unresponsive'

Émis lorsque la page web cesse de répondre.

#### Événement : 'responsive'

Émis lorsque la page web répond à nouveau.

#### Événement : 'blur'

Émis lorsque la fenêtre perd le focus.

#### Événement : 'focus'

Émis lorsque la fenêtre obtient le focus.

#### Événement : 'show'

Émis lorsque la fenêtre est affichée.

#### Événement : 'hide'

Émis lorsque la fenêtre est masquée.

#### Événement : 'ready-to-show'

Émis lorsque la page web à été chargée (tout en n'étant pas affichée) et la fenêtre peut être affichée sans flash visuel.

#### Événement : 'maximize'

Émis lorsque la fenêtre est agrandie.

#### Événement : 'unmaximize'

Émis lorsque la fenêtre quitte un état maximisé.

#### Événement : 'minimize'

Émis lorsque la fenêtre est réduite.

#### Événement : 'restore'

Émis lorsque la fenêtre est restaurée à partir d’un état réduit.

#### Événement : 'will-resize' _macOS_ _Windows_

Retourne :

* `event` Événement
* `newBounds` [`Rectangle`](structures/rectangle.md) - La taille donnée à la fenêtre ciblée.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Événement : 'resize'

Émis après que la fenêtre soit redimensionnée.

#### Événement : 'will-move' _Windows_

Retourne :

* `event` Événement
* `newBounds` [`Rectangle`](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Événement : 'move'

Émis lorsque la fenêtre est déplacée vers une nouvelle position.

__Note__ : Sous macOS, cet événement est un alias de `moved`.

#### Événement : 'moved' _macOS_

Émis une fois lorsque la fenêtre est déplacée vers une nouvelle position.

#### Événement : 'enter-full-screen'

Émis lorsque la fenêtre passe à un état de plein écran.

#### Événement : 'leave-full-screen'

Émis lorsque la fenêtre revient d'un état de plein écran.

#### Événement : 'enter-html-full-screen'

Émis lorsque la fenêtre entre dans un état de plein écran déclenchée par l’API HTML.

#### Événement : 'leave-html-full-screen'

Émis lorsque la fenêtre revient d'un état de plein écran déclenchée par l’API HTML.

#### Événement : 'always-on-top-changed'

Retourne :

* `event` Événement
* `isAlwaysOnTop` Boolean

Émis lorsque la fenêtre est définie ou non définie pour toujours afficher au dessus des autres fenêtres.

#### Événement : 'app-command' _Windows_ _Linux_

Retourne :

* `event` Événement
* `command` String

Émis lorsqu'une [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) est appelée. Elles sont généralement liées aux touches multimédia du clavier ou aux commandes du navigateur, ainsi que le bouton "Retour" intégré à certaines souris sous Windows.

Les commandes sont en minuscules, les traits de soulignement sont remplacés par des traits d'union, et le préfixe `APPCOMMAND_` est supprimé. par exemple `APPCOMMAND_BROWSER_BACKWARD` est émise en tant que `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
gagne. n('commande app', (e, cmd) => {
  // Naviguez dans la fenêtre lorsque l'utilisateur clique sur le bouton retour de la souris
  if (cmd === 'browser-backward' && gagne. ebContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explictly supported on Linux:

* `retour en arrière du navigateur`
* `navigateur-transfert`

#### Événement : 'scroll-touch-begin' _macOS_

Émis lorsque l’événement scroll de la souris a commencé.

#### Événement : 'scroll-touch-end' _macOS_

Émis lorsque l’événement scroll de la souris est terminée.

#### Événement : 'scroll-touch-edge' _macOS_

Émis lorsque l’événement scroll de la souris arrive au bord d'un élément.

#### Événement : 'swipe' _macOS_

Retourne :

* `event` Événement
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Événement : 'sheet-begin' _macOS_

Émis lorsque la fenêtre ouvre une feuille.

#### Événement : 'sheet-end' _macOS_

Émis lorsque la fenêtre a fermé une feuille.

#### Événement : 'new-window-for-tab' _macOS_

Émis lorsque le bouton natif du nouvel onglet est cliqué.

### Méthodes statiques

La classe `BrowserWindow` a les méthodes statiques suivantes :

#### `BrowserWindow.getAllWindows()`

Retourne `BrowserWindow[]` - Un tableau de toutes les fenêtres ouvertes.

#### `BrowserWindow.getFocusedWindow()`

Retourne `BrowserWindow | null` - La fenêtre qui est concentrée dans cette application, sinon retourne `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Retourne `BrowserWindow` - La fenêtre qui possède le `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Retourne `BrowserWindow` - La fenêtre avec l'`id` donné.

#### `BrowserWindow.addExtension(path)`

* `path` String

Ajoute l'extension Chrome située à `path`, et retourne le nom de l'extension.

La méthode ne retourne pas non plus si le manifeste de l'extension est manquant ou incomplet.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Supprime une extension Chrome avec le nom donné.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Ajoute l'extension DevTools située à `path`, et retourne le nom de l'extension.

L'extension sera mémorisée donc vous n'avez besoin d'appeler cette API qu'une seule fois, cette API n'est pas destinée à la programmation. Si vous essayez d'ajouter une extension qui a déjà été chargée, cette méthode ne retournera pas et enregistrera à la place une alerte sur la console .

La méthode ne retourne pas non plus si le manifeste de l'extension est manquant ou incomplet.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Supprimer une extension DevTools par nom.

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

Pour vérifier si une extension DevTools est installée, vous pouvez exécuter ce qui suit :

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Remarque :** Cette API ne peut pas être appelée avant que l'événement `prêt` du module `app` ne soit émis.

### Propriétés d'instance

Les objets créés avec `nouveau BrowserWindow` ont les propriétés suivantes :

```javascript
const { BrowserWindow } = require('electron')
// Dans cet exemple `win` est notre instance
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Voir la [`webContents` documentation](web-contents.md) pour ses méthodes et ses événements.

#### `win.id`

A `Integer` representing the unique ID of the window.

### Méthodes d’instance

Les objets créés avec `nouveau BrowserWindow` ont les méthodes d'instance suivantes :

**Remarque :** Certaines méthodes sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### `win.destroy()`

Forcer la fermeture de la fenêtre, les `unload` et `beforeunload` événement ne seront pas émises pour la page web, et l'évènement `close` ne sera pas non plus émise pour cette fenêtre, mais il garantit que l'événement `closed` sera émis.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Ramène la fenêtre au premier plan.

#### `win.blur()`

Supprime le focus de la fenêtre.

#### `win.isFocused()`

Retourne `Boolean` - Si la fenêtre est mise au point.

#### `win.isDestroyed()`

Retourne `Boolean` - Si la fenêtre est détruite.

#### `win.show()`

Affiche la fenêtre et la ramène au premier plan.

#### `win.showInactive()`

Affiche la fenêtre, mais ne la ramène pas au premier plan.

#### `win.hide()`

Masque la fenêtre.

#### `win.isVisible()`

Retourne `Boolean` - Si la fenêtre est visible pour l'utilisateur ou non.

#### `win.isModal()`

Retourne `Boolean` - Si la fenêtre actuelle est une fenêtre modale ou non.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Réduit la fenêtre à sa taille initiale.

#### `win.isMaximized()`

Retourne `Boolean` - Si la taille de la fenêtre est maximisée ou non.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restaure la fenêtre depuis l'état réduit à son état précédent.

#### `win.isMinimized()`

Retourne `Boolean` - Si la taille de la fenêtre est minimisée ou non.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Définit si la fenêtre doit être en mode plein écran.

#### `win.isFullScreen()`

Retourne `Boolean` - Si la fenêtre est en plein écran ou non.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Entre ou sort du mode plein-écran simple.

Le mode plein-écran simple émule le comportement en plein-écran natif trouvé sur les versions de Mac OS X antérieures à Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Retourne `Boolean` - Si la fenêtre est en mode plein-écran simple (pré-Lion) ou non.

#### `win.isNormal()`

Retourne `Boolean` - Si la fenêtre est dans son état normal (ni maximisée, ni minimisée, ni en plein écran).

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* `aspectRatio` Float - L'aspect ratio à maintenir pour une partie de la vue de contenu .
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

Cela fera que la fenêtre maintient un ratio d'aspect. La taille supplémentaire permet à un développeur d'avoir de l'espace, spécifié en pixels, non inclus dans les calculs de ratio de l'aspect. Cette API prend déjà en compte la différence entre la taille d'une fenêtre et sa taille de contenu.

Considérez une fenêtre normale avec un lecteur vidéo HD et des commandes associées. Il y a peut-être 15 pixels de contrôles sur le bord gauche, 25 pixels de contrôles sur le bord droit et 50 pixels de contrôles sous le joueur. Afin de maintenir un ratio d'aspect 16:9 (ratio d'aspect standard pour HD @1920x1080) dans le joueur lui-même, nous appellerions cette fonction avec des arguments de 16/9 et [ 40, 50 ]. Le deuxième argument ne se soucie pas du fait que la largeur et la hauteur supplémentaires sont dans la vue de contenu --seulement qu'elles existent. Sommez toute la largeur supplémentaire et les zones de hauteur que vous avez dans la vue de contenu globale.

Appeler cette fonction avec une valeur de `0` supprimera tous les ratios d'aspect précédemment définis.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Couleur d'arrière-plan de la fenêtre sous la forme d'une valeur hexadécimale, comme `#66CD00` ou `#FFF` ou `#80FFFFFF` (l'alpha est supporté si `transparent` est `true`). La valeur par défaut est `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - Le chemin absolu vers le fichier à prévisualiser avec QuickLook. Ceci est important car Quick Look utilise le nom de fichier et l'extension de fichier sur le chemin pour déterminer le type de contenu du fichier à ouvrir.
* `displayName` String (facultatif) - Le nom du fichier à afficher dans la vue modale de Quick Look . Ceci est purement visuel et n'affecte pas le type de contenu du fichier. Par défaut, `chemin`.

Utilise [Aperçu rapide](https://en.wikipedia.org/wiki/Quick_Look) pour prévisualiser un fichier à un chemin donné.

#### `win.closeFilePreview()` _macOS_

Ferme le panneau [Aperçu rapide](https://en.wikipedia.org/wiki/Quick_Look) actuellement ouvert.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (facultatif) _macOS_

Redimensionne et déplace la fenêtre vers les limites fournies. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// définit toutes les propriétés limites
gagner. etBounds({ x: 440, y: 225, width: 800, height: 600 })

// a fixé une propriété de simples limites
gagner. etBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Retourne [`Rectangle`](structures/rectangle.md) - Les `limites` de la fenêtre comme `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (facultatif) _macOS_

Redimensionne et déplace la zone client de la fenêtre (par exemple la page web) vers les limites fournies.

#### `win.getContentBounds()`

Retourne [`Rectangle`](structures/rectangle.md) - Les `limites` de la zone client de la fenêtre comme `Object`.

#### `win.getNormalBounds()`

Retourne [`Rectangle`](structures/rectangle.md) - Contient les limites de la fenêtre de l'état normal

**Remarque :** quel que soit l'état actuel de la fenêtre : maximisé, minimisé ou en plein écran, retourne toujours la position et la taille de la fenêtre en état normal. En état normal, getBounds et getNormalBounds renvoient le même [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Active ou désactive la fenêtre.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) _macOS_

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Retourne `Integer[]` - Contient la largeur et la hauteur de la fenêtre.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) _macOS_

Redimensionne la zone client de la fenêtre (par exemple la page web) à `largeur` et `hauteur`.

#### `win.getContentSize()`

Retourne `Integer[]` - Contient la largeur et la hauteur de la zone client de la fenêtre.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Définit la taille minimale de la fenêtre à `width` et `height`.

#### `win.getMinimumSize()`

Retourne `Integer[]` - Contient la largeur et la hauteur minimale de la fenêtre.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Définit la taille maximale de la fenêtre à `width` et `height`.

#### `win.getMaximumSize()`

Retourne `Integer[]` - Contient la largeur et la hauteur maximale de la fenêtre.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Définit si la fenêtre peut être redimensionnée manuellement par l’utilisateur.

#### `win.isResizable()`

Retourne `Boolean` - Si la fenêtre peut être redimensionnée manuellement par l'utilisateur.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être déplacée par l'utilisateur.

Sous Linux, retourne toujours `true`.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être minimisée manuellement par l'utilisateur

Sous Linux, retourne toujours `true`.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être agrandie manuellement par l'utilisateur.

Sous Linux, retourne toujours `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Définit si le bouton agrandir/zoom de la fenêtre active/désactive le mode plein écran ou maximise la fenêtre.

#### `win.isFullScreenable()`

Retourne `Boolean` - Si le bouton agrandir/zoom de la fenêtre active le mode plein écran ou maximise la fenêtre.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être fermée manuellement par l'utilisateur.

Sous Linux, retourne toujours `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) _macOS_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Integer (facultatif) _macOS_ - Le nombre de calques supérieur à définir cette fenêtre par rapport au `level`. Par défaut, `0`. Notez que Apple décourage le réglage de niveaux supérieurs à 1 au-dessus de `économiseur d'écran`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Retourne `Boolean` - Si la fenêtre est toujours au-dessus des autres fenêtres ou non.

#### `win.moveTop()`

Déplace la fenêtre sur le dessus (dans l'ordre z) peu importe qu'elle ait le focus ou non

#### `win.center()`

Déplace la fenêtre vers le centre de l’écran.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (facultatif) _macOS_

Déplace la fenêtre à la position `x` et `y`.

#### `win.getPosition()`

Retourne `Integer[]` - Contient la position actuelle de la fenêtre.

#### `win.setTitle(title)`

* `title` String

Remplace le titre de la fenêtre native par `title`.

#### `win.getTitle()`

Retourne `String` - le titre de la fenêtre native.

**Remarque :** Le titre de la page web peut être différent du titre de la fenêtre native .

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (facultatif)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Par exemple :

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect() win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Démarre ou arrête de flasher la fenêtre pour attirer l'attention de l'utilisateur.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Fait que la fenêtre ne soit pas affichée dans la barre des tâches.

#### `win.setKiosk(flag)`

* `flag` Boolean

Entre ou quitte le mode kiosk.

#### `win.isKiosk()`

Retourne `Boolean` - Si la fenêtre est en mode kiosque.

#### `win.getNativeWindowHandle()`

Retourne `Buffer` - Le gestionnaire spécifique à la plate-forme de la fenêtre.

Le type natif du handle est `HWND` sous Windows, `NSView*` sur macOS, et `Window` (`long`non signé</0>) sous Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Retourne `Boolean` - `true` ou `false` selon que le message est accroché.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Débranchez le message de la fenêtre.

#### `win.unhookAllWindowMessages()` _Windows_

Décroche tous les messages de la fenêtre.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Définit le chemin d'accès du fichier que la fenêtre représente, et l'icône du fichier s'affichera dans la barre de titre de la fenêtre.

#### `win.getRepresentedFilename()` _macOS_

Retourne `String` - Le chemin du fichier que la fenêtre représente.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Spécifie si le document de la fenêtre a été modifié, et l'icône dans la barre de titre deviendra grise lorsque réglé sur `true`.

#### `win.isDocumentEdited()` _macOS_

Retourne `Boolean` - Si le document de la fenêtre a été modifié.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (facultatif) - Les limites à capturer
* `callback` Function
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

**[Deprecated Soon](modernization/promisification.md)**

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (facultatif) - Les limites à capturer

Retourne `Promise<NativeImage>` - résout avec une [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n"
  * `données postales` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (facultatif)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Retourne `Promise<void>` - la promesse se résoudra lorsque la page aura terminé le chargement (voir [`did-finish-load`](web-contents.md#event-did-finish-load)), et rejette si la page ne parvient pas à se charger (voir [`did-fail-load`](web-contents.md#event-did-fail-load)).

Même que [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

L'`url` peut être une adresse distante (par exemple `http://`) ou un chemin vers un fichier HTML local en utilisant le `file://` protocole.

Pour s'assurer que les URL de fichier sont correctement formatées, il est recommandé d'utiliser la méthode Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) :

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

Vous pouvez charger une URL en utilisant une requête `POST` avec des données encodées par URL en faisant ce qui suit :

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (optional)
  * `query` Object (optional) - Passed to `url.format()`.
  * `search` String (facultatif) - Passé à `url.format()`.
  * `hash` String (facultatif) - Passé à `url.format()`.

Retourne `Promise<void>` - la promesse se résoudra lorsque la page aura terminé le chargement (voir [`did-finish-load`](web-contents.md#event-did-finish-load)), et rejette si la page ne parvient pas à se charger (voir [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Identique à `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Définit le `menu` comme barre de menu de la fenêtre.

#### `win.removeMenu()` _Linux_ _Windows_

Retirez la barre de menu de la fenêtre.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Supprimer la barre de progression lorsque la progression < 0 ; Passer en mode indéterminé lorsque la progression > 1.

Sur la plate-forme Linux, ne prend en charge que l'environnement de bureau Unity, vous devez spécifier le nom du fichier `*.desktop` au champ `desktopName` dans `package.json`. By default, it will assume `app.getName().desktop`.

Sous Windows, un mode peut être passé. Les valeurs acceptées sont `none`, `normal`, `indeterminate`, `erreur`, et `paused`. Si vous appelez `setProgressBar` sans mode défini (mais avec une valeur dans la plage valide), `normal` sera utilisé.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - l'icône à afficher en bas à droite de l'icône de la barre des tâches. Si ce paramètre est `null`, l'overlay est effacé
* `description` Chaîne - une description qui sera fournie aux lecteurs d'écran d'accessibilité

Définit une superposition de 16 x 16 pixels sur l'icône actuelle de la barre des tâches, généralement utilisé pour transmettre une sorte de statut d'application ou pour notifier passivement l'utilisateur.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Définit si la fenêtre doit avoir une ombre.

#### `win.hasShadow()`

Retourne `Boolean` - Si la fenêtre a une ombre.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacité` Nombre - entre 0.0 (entièrement transparent) et 1.0 (entièrement opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` _Windows_ _macOS_

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Définir une forme de fenêtre détermine la zone dans la fenêtre où le système permet de dessiner et d'interagir avec l'utilisateur. En dehors de la région donnée, aucun pixel ne sera dessiné et aucun événement de souris ne sera enregistré. Les événements de souris en dehors de la région ne seront pas reçus par cette fenêtre, mais passeront à tout ce qui se trouve derrière la fenêtre.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Retourne `Boolean` - Si les boutons ont été ajoutés avec succès

Ajouter une barre d'outils miniature avec un ensemble de boutons spécifié à l'image de miniature d'une fenêtre dans la disposition d'un bouton de la barre des tâches. Renvoie un objet `Booléen` indique si la vignette a été ajoutée avec succès.

Le nombre de boutons dans la barre d'outils miniature ne doit pas dépasser 7 en raison de la salle limitée. Une fois que vous avez configuré la barre d'outils miniature, la barre d'outils ne peut pas être retirée en raison de la limitation de la plateforme. Mais vous pouvez appeler l'API avec un tableau vide pour nettoyer les boutons.

Le `boutons` est un tableau d'objets `Bouton` :

* `Button` Object
  * `icon` [NativeImage](native-image.md) - L'icône s'affichant dans la miniature dans la barre d'outils.
  * `click` Function
  * `tooltip` String (facultatif) - Le texte dans l'info-bulle du bouton.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

Le `flags` est un tableau pouvant inclure ces `String`s suivant :

* `enabled` - Le bouton est actif et disponible à l'utilisateur.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Lorsque le bouton est cliqué, la fenêtre de miniature se ferme immédiatement.
* `nobackground` - Utilise uniquement l'image et ne dessine pas de bordure sur le bouton.
* `hidden` - Le bouton n'est pas affiché à l'utilisateur.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - La région de la fenêtre

Définit la région de la fenêtre à afficher comme image de miniature affichée lorsque survole la fenêtre dans la barre des tâches. Vous pouvez réinitialiser la miniature en toute la fenêtre en spécifiant une région vide : `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Définit l'infobulle qui s'affiche en survolant la vignette de la fenêtre dans la barre des tâches.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (facultatif) - Fenêtre [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Elle doit être définie, sinon les autres options n'auront aucun effet.
  * `appIconPath` String (facultatif) - Fenêtre [Icône de relance](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (facultatif) - La [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx)de Windows.
  * `relaunchDisplayName` String (facultatif) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Définit les propriétés du bouton de la barre des tâches de la fenêtre.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Identique à `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md)

Change l'icône de la fenêtre.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Définit si les boutons du feu de la fenêtre doivent être visibles.

Cela ne peut pas être appelé lorsque `titleBarStyle` est défini à `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Si la barre de menu est déjà visible, appeler `setAutoHideMenuBar(true)` ne le fera pas le cacher immédiatement.

#### `win.isMenuBarAutoHide()`

Retourne `Boolean` - Si la barre de menu se cache automatiquement.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Retourne `Boolean` - Si la barre de menu est visible.

#### `win.setVisibleOnWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Booléen (facultatif) _macOS_ - Définit si la fenêtre doit être visible au-dessus des fenêtres plein écran

Définit si la fenêtre doit être visible sur tous les espaces de travail.

**Remarque :** Cette API ne fonctionne pas sous Windows.

#### `win.isVisibleOnAllWorkspaces()`

Retourne `Boolean` - Si la fenêtre est visible sur tous les espaces de travail.

**Remarque **: Cette API retourne toujours false sur Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Utilisé uniquement lorsque `ignore` est vrai. Si `ignore` est faux, le transfert est toujours désactivé quelle que soit cette valeur.

Fait que la fenêtre ignore tous les événements de la souris.

Tous les événements survenus dans cette fenêtre seront passés à la fenêtre ci-dessous cette fenêtre, mais si cette fenêtre a le focus, elle recevra toujours les événements du clavier .

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Empêche le contenu de la fenêtre d'être capturé par d'autres applications.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _Windows_

* `focusable` Boolean

Modifie si la fenêtre peut être mise au point.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow

Définit `parent` comme la fenêtre parent de la fenêtre actuelle, en passant `null` transformera la fenêtre actuelle en une fenêtre de niveau supérieur.

#### `win.getParentWindow()`

Retourne `BrowserWindow` - La fenêtre parent.

#### `win.getChildWindows()`

Retourne `BrowserWindow[]` - Toutes les fenêtres enfants.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Contrôle s'il faut masquer le curseur lors de la saisie.

#### `win.selectPreviousTab()` _macOS_

Sélectionne l'onglet précédent lorsque les onglets natifs sont activés et il y a d'autres onglets dans la fenêtre.

#### `win.selectNextTab()` _macOS_

Sélectionne l'onglet suivant lorsque les onglets natifs sont activés et il y a d'autres onglets dans la fenêtre.

#### `win.mergeAllWindows()` _macOS_

Fusionne toutes les fenêtres dans une seule fenêtre avec plusieurs onglets lorsque les onglets natifs sont activés et qu'il y a plus d'une fenêtre ouverte.

#### `win.moveTabToNewWindow()` _macOS_

Déplace l'onglet actuel dans une nouvelle fenêtre si les onglets natifs sont activés et il y a plus d'un onglet dans la fenêtre actuelle.

#### `win.toggleTabBar()` _macOS_

Active/désactive la visibilité de la barre d’onglets si les onglets natifs sont activés et il n’y a qu’un seul onglet dans la fenêtre actuelle.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Ajoute une fenêtre sous la forme d'un onglet sur cette fenêtre, après l'onglet de l'instance de fenêtre.

#### `win.setVibrancy(type)` _macOS_

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Voir la documentation [macOS](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) pour plus de détails.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` _macOS_ _Experimental_

* `touchBar` TouchBar

Définit la disposition de la barre tactile pour la fenêtre actuelle. La spécification `null` ou `undefined` efface la barre de contact. Cette méthode n'a d'effet que si la machine a une barre tactile et est en cours d'exécution sur macOS 10.12.1+.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` _Expérimental_

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Remplacement de l'API pour setBrowserView prenant en charge le travail avec des vues multi navigateurs.

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Expérimental_

Returns array of `BrowserView` what was an attached with addBrowserView or setBrowserView.

**Remarque :** L’API BrowserView est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

### Propriétés

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

gagne. xcludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```
