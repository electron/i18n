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

## À l'aide de l'événement `ready-to-show`

Pendant le chargement de la page, l'événement `ready-to-show` sera émis lorsque le process de rendu aura rendu la page pour la première fois si la fenêtre n'a pas encore été rendue. Afficher la page une fois que l'event a été trigger rendra la page sans ce processus de chargement au fur et à mesure:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Cet événement est généralement émis après l’événement `did-finish-load`, mais pour les pages avec beaucoup de ressources distantes, il peut être émis avant l’événement `did-finish-load`.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

## Régler `backgroundColor`

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

## Fenêtres modales

Une fenêtre modale est une fenêtre enfant qui désactive la fenêtre parent. Pour créer une fenêtre modale, il faut définir les options `parent` et `modal` :

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Visibilité de la page

L'[API de visibilité de la page](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) fonctionne comme ci-dessous :

* Sur toutes les plateformes, l'état de visibilité détécte si la fenêtre est cachée/minimisée ou pas.
* De plus, sur macOS, l'état de visibilité détécte également l'état d'occlusion de la fenêtre. Si la fenêtre est occluée (c'est-à-dire entièrement recouverte) par une autre fenêtre, l'état de visibilité sera `hidden`. Sur les autres plateformes, l'état de visibilité sera `hidden` seulement lorsque la fenêtre est minimisée ou cachée explicitement avec `win.hide()`.
* Si une `BrowserWindow` est crée avec `show:false`, l'état de visibilité initial sera `visible` même si la fenêtre est cachée.
* Si `backgroundThrottling` est désactivé, l'état de visibilité restera `visible` même si la fenêtre est minimisée, obstruée ou cachée.

Il est recommandé de mettre en pause les opérations coûteuse lorsque l'état de visibilité est `hidden` afin de minimiser la consommation d'énergie.

## Avertissement sur les plateformes

* Sur macOS, les fenêtres modales seront affichés comme des feuilles attachées à la fenêtre parent.
* Sur macOS, la fenêtre enfant va garder la position relative à la fenêtre parent lorsque la fenêtre parent bouge. Sur Windows et Linux, la fenêtre enfant ne bougera pas.
* Sur Linux, le type des fenêtre modales sera changé par `dialog`.
* Sur Linux, beaucoup d'environnements bureau ne peuvent pas cacher une fenêtre modale.

## Classe : BrowserWindow

> Créer et contrôle des fenêtres navigateur.

Processus : [Main](../glossary.md#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Cela crée une nouvelle `BrowserWindow` avec les propriétés natives définies par les `options`.

### `new BrowserWindow([options])`

* `options` Object (facultatif) 
  * `width` Integer (facultatif) - Largeur de la fenêtre en pixels. La valeur par défaut est `800`.
  * `height` Integer (facultatif) - La hauteur de la fenêtre en pixels. La valeur par défaut est `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (facultatif) - La largeur et la hauteur (`width` et `height`) seront utilisées pour définir la taille de la page Web, ce qui signifie que la taille de la fenêtre réelle inclura la taille du cadre de celle-ci. La fenêtre complète sera donc légèrement plus grande que la taille de son contenu. Par défaut la valeur est `false`.
  * `center` Boolean (facultatif) - afficher la fenêtre dans le centre de l’écran.
  * `minWidth` Integer (facultatif) - Largeur minimum de la fenêtre en pixels. La valeur par défaut est `0`.
  * `minHeight` Integer (facultatif) - Hauteur minimale de la fenêtre en pixels. La valeur par défaut est `0`.
  * `maxWidth` Integer (facultatif) - Largeur maximum de la fenêtre en pixels. La valeur par défaut est sans limite.
  * `maxHeight` Integer (facultatif) - Hauteur maximale de la fenêtre en pixels. La valeur par défaut est sans limite.
  * `resizable` Boolean (facultatif) - Si la fenêtre est redimensionnable. La valeur par défaut est `true`.
  * `movable` Boolean (facultatif) - Si la fenêtre est déplaçable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `minimizable` Boolean (facultatif) - Si la fenêtre est minimisable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `maximizable` Boolean (facultatif) - Si la fenêtre est maximisable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `closable` Boolean (facultatif) - Si la fenêtre est fermable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `focusable` Boolean (facultatif) - Si la fenêtre peut avoir le focus. La valeur par défaut est `true`. Sur Windows, mettre `focusable: false` implique également le réglage `skipTaskbar: true`. Sur Linux, mettre `focusable: false` fait que la fenêtre arrête d'interragir avec wm, par conséquent la fenêtre restera toujours au dessus dans tous les espaces de travail.
  * `alwaysOnTop` Boolean (facultatif) - Si la fenêtre devrait toujours rester au dessus des autres fenêtres. La valeur par défaut est `false`.
  * `fullscreen` Boolean (facultatif) - Est-ce que la fenêtre doit s'afficher en plein écran. Quand explicitement mit a `faux`, le bouton plein écran sera caché ou désactivé sur macOS. Par défaut la valeur est `false`.
  * `fullscreen` Boolean (facultatif) - Est-ce que la fenêtre peut s'afficher en plein écran. Sur macOS, indiquez également si le bouton de maximizer/zoom doit basculer en mode plein écran ou agrandir la fenêtre. La valeur par défaut est `true`.
  * `simpleFullscreen` Boolean (facultatif) - Utiliser le mode pre-Lion fullscreen sur macOS. La valeur par défaut est `false`.
  * `skipTaskbar` Boolean (facultatif) - Afficher ou masquer la fenêtre dans la barre des tâches. La valeur par défaut est `vrai`.
  * `kiosk` Boolean (facultatif) - Le mode kiosk. La valeur par défaut est `faux`.
  * `title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `icon` ([NativeImage](native-image.md) | String) (facultatif) - L'icône de la fenêtre. Sur Windows, il est recommandé d'utiliser le format `ICO` pour un rendu optimal. Si non défini, l'icone de l’exécutable sera utilisé.
  * `show` Boolean (facultatif) -Détermine si la fenêtre doit s'afficher ou non à la création. La valeur par défaut est `true`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created. In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`. Setting this to `false` will cause the `ready-to-show` event to not fire. La valeur par défaut est `true`.
  * `frame` Boolean (facultatif) - Spécifier `false` pour créer une [fenêtre sans bordure](frameless-window.md). La valeur par défaut est `true`.
  * `parent` BrowserWindow (facultatif) - Spécifier la fenêtre parent. La valeur par défaut est `null`.
  * `modal` Boolean (optionnel) - Si c'est une fenêtre modale ou non. Fonctionne uniquement lorsque la fenêtre est une fenêtre enfant. La valeur par défaut est `false`.
  * `acceptFirstMouse` Boolean (facultatif) - Si la vue accepte un seul événement de souris qui active simultanément la fenêtre. La valeur par défaut est `false`.
  * `disableAutoHideCursor` Boolean (facultatif) - Si vous voulez cacher le curiseur lors de la saisie. La valeur par défaut est `false`.
  * `autoHideMenuBar` Boolean (facultatif) - Masquer automatiquement la barre de menu ) moins que la touche `Alt` soit enfoncée. La valeur par défaut est `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. Par défaut la valeur est `false`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). La valeur par défaut est `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). Par défaut la valeur est `false`. On Windows, does not work unless the window is frameless.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are: 
    * `default` - Results in the standard gray opaque Mac title bar.
    * `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
    * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
  * `fullscreenWindowTitle` Boolean (facultatif) - Affiche le titre dans la barre de titre en mode plein écran sur macOS pour toutes les options `titleBarStyle`. La valeur par défaut est `faux`.
  * `thickFrame` Boolean (facultatif) - Utilisez le style `WS_THICKFRAME` pour les fenêtres sans cadre sur Windows, qui ajoute une image standard de fenêtre. Le définir à `false` supprimera les animations de fenêtre et de fenêtre. La valeur par défaut est `true`.
  * `vibrancy` String (facultatif) - Ajoute un type d'effet de vibrance à la fenêtre, uniquement sur macOS. Peut être `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `, <code>sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `outil>, <code>content<code>, <0>sous-window`. Veuillez noter que l'utilisation de `frame: false` en combinaison avec une valeur de vibrance nécessite que vous utilisiez également un `titleBarStyle` non par défaut. Notez également que `appearance-based`, `light`, `dark`, `medium-light`, et `ultra-dark` ont été dépréciés et seront supprimés dans une prochaine version de macOS.
  * `zoomToPageWidth` Boolean (facultatif) - Contrôle le comportement sur macOS lorsque option-click sur le bouton vert d'arrêt de la barre d'outils ou en cliquant sur le lien Fenêtre > Menu Zoom . Si `true`, la fenêtre grandira à la largeur préférée de la page web lors du zoom, `false` le fera zoomer sur la largeur de l'écran. Cela affectera également le comportement lorsque vous appelez `maximize()` directement. Par défaut la valeur est `false`.
  * `tabbingIdentifier` String (facultatif) - Nom du groupe d'onglets, permet d'ouvrir la fenêtre sous la forme d'un onglet natif sur macOS 10.12+. Les fenêtres avec le même identifiant de tabulation seront regroupées. Cela ajoute également un nouveau bouton d'onglet natif à la barre d'onglets de votre fenêtre et permet à votre `app` et fenêtre de recevoir l'événement `new-window-for-tab`.
  * `préférences web` Object (facultatif) - Paramètres des fonctionnalités de la page web. 
    * `devTools` Boolean (facultatif) - Activer ou non DevTools. Si elle est définie à `false`, ne peut pas utiliser `BrowserWindow.webContents.openDevTools()` pour ouvrir DevTools. La valeur par défaut est `true`.
    * `nodeIntegration` Boolean (facultatif) - Si l'intégration des nœuds est activée. La valeur par défaut est `false`.
    * `nodeIntegrationInWorker` Boolean (facultatif) - Si l'intégration de nœuds est activée dans les workflows web. Par défaut la valeur est `false`. Plus d'informations peuvent être trouvée dans [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (facultatif) - Option expérimentale pour activer le support de Node.js dans les sous-cadres tels que les iframes et les fenêtres enfants. Tous vos préchargements seront chargés pour chaque iframe, vous pouvez utiliser `process.isMainFrame` pour déterminer si vous êtes dans le cadre principal ou non.
    * `preload` String (facultatif) - Spécifie un script qui sera chargé avant les autres scripts exécutés dans la page. Ce script aura toujours accès aux API de noeuds peu importe que l'intégration de noeuds soit activée ou désactivée. La valeur doit être le chemin absolu vers le script. Lorsque l'intégration des nœuds est désactivée, le script de préchargement peut réintroduire les symboles globaux de nœud dans la portée globale. Voir l'exemple [ici](process.md#event-loaded).
    * `sandbox` Booléen (facultatif) - Si défini, le moteur de rendu associé à la fenêtre, la rendre compatible avec le bac à sable Chromium au niveau du système d'exploitation et la désactivation du nœud. s moteur. Ce n'est pas la même chose que l'option `nodeIntegration` et les API disponibles pour le script de préchargement sont plus limitées. En savoir plus sur l'option [ici](sandbox-option.md). **Note :** Cette option est actuellement expérimentale et peut être supprimée dans les prochaines versions d'Electron.
    * `enableRemoteModule` Boolean (facultatif) - Activer le module [`remote`](remote.md) . La valeur par défaut est `true`.
    * `session` [Session](session.md#class-session) (facultatif) - Définit la session utilisée par la page . Au lieu de passer l'objet Session directement, vous pouvez également choisir d'utiliser l'option `partition` à la place, qui accepte une chaîne de partition. Lorsque `session` et `partition` sont fournies, `session` sera préférée. La session par défaut est celle par défaut.
    * `partition` String (facultatif) - Définit la session utilisée par la page en fonction de la chaîne de partition de la session . Si `partition` commence par `persist:`, la page utilisera une session persistante disponible pour toutes les pages de l'application avec le même `partition`. S'il n'y a pas de préfixe `persistant:`, la page utilisera une session en mémoire . En assignant la même `partition`, plusieurs pages peuvent partager la même session. La session par défaut est celle par défaut.
    * `affinity` String (facultatif) - Lorsque spécifié, les pages web avec le même `affinity` s'exécuteront dans le même processus de rendu . Notez que en raison de la réutilisation du processus du moteur de rendu certaines options `webPreferences` seront également partagées entre les pages web, même lorsque vous avez spécifié des valeurs différentes pour elles, incluant mais non limité à `preload`, `sandbox` et `nodeIntegration`. Il est donc suggéré d'utiliser exactement la même `webPreferences` pour les pages web avec la même `affinité`. *Cette propriété est expérimentale*
    * `zoomFactor` Number (facultatif) - Le facteur de zoom par défaut de la page, `3.0` représente `300%`. La valeur par défaut est `1.0`.
    * `javascript` Boolean (facultatif) - Active la prise en charge de JavaScript. La valeur par défaut est `true`.
    * `webSecurity` Boolean (facultatif) - Lorsque `false`, il désactivera la politique de même origine (généralement en utilisant des sites de test par des personnes), et définissez `allowRunningInsecureContent` à `true` si cette option n'a pas été définie par l'utilisateur. La valeur par défaut est `true`.
    * `allowRunningInsecureContent` Boolean (facultatif) - Permet à une page https d'exécuter JavaScript, CSS ou plugins à partir d'URL http. La valeur par défaut est `false`.
    * `images` Boolean (facultatif) - Active le support des images. La valeur par défaut est `true`.
    * `textAreasAreResizable` Boolean (facultatif) - Rendre les éléments TextArea redimensionnables. par défaut est `true`.
    * `webgl` Boolean (facultatif) - Active le support WebGL. La valeur par défaut est `true`.
    * `plugins` Boolean (facultatif) - Si les plugins doivent être activés. La valeur par défaut est `false`.
    * `experimentalFeatures` Boolean (facultatif) - Active les fonctionnalités expérimentales de Chromium. La valeur par défaut est `false`.
    * `scrollBounce` Boolean (facultatif) - Active l'effet scroll bounce (rubber banding) sur macOS. La valeur par défaut est `false`.
    * `enableBlinkFeatures` String (facultatif) - Une liste de chaînes de caractères séparées par `,`, comme `CSSVariables,KeyEventKey` pour activer. La liste complète des chaînes de caractères supportées peut être trouvée dans le fichier [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) .
    * `disableBlinkFeatures` String (facultatif) - Une liste de chaînes de caractères séparées par `,`, comme `CSSVariables,KeyEventKey` pour désactiver. La liste complète des chaînes de fonctionnalités supportées peut être trouvée dans le fichier [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) .
    * `format@@0 defaultFontFamily` Object (facultatif) - Définit la police par défaut pour la famille de polices. 
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
    * `Offscreen` Boolean (facultatif) - Activer le rendu hors écran pour la fenêtre du navigateur. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to `false`. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

Lorsque l'on définie une taille minimum ou maximum pour la fenêtre avec `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, cela contraint les utilisateurs uniquement. Cela ne vous empêche pas de passer une taille qui ne suit pas les contraintes de tailles à `setBounds`/`setSize` ou au constructeur de `BrowserWindow`.

Les valeurs et comportements possibles de l'option `type` dépendent de la plateforme. Les valeurs possibles sont :

* Sur Linux, les types possible sont `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* Sur macOS, les types possibles sont `desktop`, `textured`. 
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

Émis lorsque le document a changé son titre, appeler `event.preventDefault()` empêchera le titre de la fenêtre native de changer. `explicitSet` is false when title is synthesized from file URL.

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

***Note**: Il y a une subtile différence entre le comportement de `window.onbeforeunload = handler` et `window.addEventListener('beforeunload', handler)`. Il est recommendé de toujours spécifier l' `event.returnValue` explicitement, plutôt que de seulement retourner une valeur, cette méthode fonctionne mieux avec Electron.*

#### Événement : 'closed'

Émis lorsque la fenêtre est fermée. Après avoir reçu cet évènement, vous devriez enlever la référence à la fenêtre et éviter de l'utiliser à nouveau.

#### Événement : 'session-end' *Windows*

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

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

#### Événement : 'maximize'

Émis lorsque la fenêtre est agrandie.

#### Événement : 'unmaximize'

Émis lorsque la fenêtre quitte un état maximisé.

#### Événement : 'minimize'

Émis lorsque la fenêtre est réduite.

#### Événement : 'restore'

Émis lorsque la fenêtre est restaurée à partir d’un état réduit.

#### Événement : 'will-resize' *macOS* *Windows*

Retourne :

* `event` Événement
* `newBounds` [Rectangle](structures/rectangle.md) - Size the window is being resized to.

Émis avant que la fenêtre ne soit redimensionnée. Appeler `event.preventDefault()` empêchera la fenêtre d'être redimensionnée.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Événement : 'resize'

Émis après que la fenêtre soit redimensionnée.

#### Event: 'will-move' *Windows*

Retourne :

* `event` Événement
* `newBounds` [Rectangle](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Événement : 'move'

Émis lorsque la fenêtre est déplacée vers une nouvelle position.

**Note** : Sous macOS, cet événement est un alias de `moved`.

#### Événement : 'moved' *macOS*

Émis une fois lorsque la fenêtre est déplacée vers une nouvelle position.

#### Événement : 'enter-full-screen'

Émis lorsque la fenêtre passe à un état de plein écran.

#### Événement : 'leave-full-screen'

Émis lorsque la fenêtre revient d'un état de plein écran.

#### Événement : 'enter-html-full-screen'

Émis lorsque la fenêtre entre dans un état de plein écran déclenchée par l’API HTML.

#### Événement : 'leave-html-full-screen'

Émis lorsque la fenêtre revient d'un état de plein écran déclenchée par l’API HTML.

#### Event: 'always-on-top-changed'

Retourne :

* `event` Événement
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' *Windows* *Linux*

Retourne :

* `event` Événement
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### Événement : 'scroll-touch-begin' *macOS*

Émis lorsque l’événement scroll de la souris a commencé.

#### Événement : 'scroll-touch-end' *macOS*

Émis lorsque l’événement scroll de la souris est terminée.

#### Événement : 'scroll-touch-edge' *macOS*

Émis lorsque l’événement scroll de la souris arrive au bord d'un élément.

#### Événement : 'swipe' *macOS*

Retourne :

* `event` Événement
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'rotate-gesture' *macOS*

Retourne :

* `event` Événement
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. La valeur `rotation` sur chaque émission est l'angle en degrés tourné depuis la dernière émission. Le dernier événement émis lors d'un geste de rotation sera toujours de la valeur `0`. Les valeurs de rotation dans le sens inverse des aiguilles d'une montre sont positives, tandis que les valeurs dans le sens horaire sont négatives.

#### Événement : 'sheet-begin' *macOS*

Émis lorsque la fenêtre ouvre une feuille.

#### Événement : 'sheet-end' *macOS*

Émis lorsque la fenêtre a fermé une feuille.

#### Événement : 'new-window-for-tab' *macOS*

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

Retourne `BrowserWindow | null` - La fenêtre qui possède la `browserView`donnée. Si la vue donnée n'est attachée à aucune fenêtre, retourne `null`.

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

Retourne `Enregistrement<String, ExtensionInfo>` - Les clés sont les noms des extensions et chaque valeur est un Objet contenant les propriétés `name` et `version` .

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

Retourne `Enregistrement<string, ExtensionInfo>` - Les clés sont les noms des extensions et chaque valeur est un Objet contenant les propriétés `name` et `version` .

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

#### `win.webContents` *Readonly*

Un objet `WebContents` que cette fenêtre possède. Tous les événements liés à la page web et les opérations seront effectués via elle.

Voir la [`webContents` documentation](web-contents.md) pour ses méthodes et ses événements.

#### `win.id` *Readonly*

Une propriété `Integer` représentant l'ID unique de la fenêtre.

#### `format@@0 win.autoHideMenuBar`

Une propriété `Boolean` qui détermine si la barre de menu de la fenêtre doit se cacher automatiquement. Une fois définie, la barre de menu ne s'affichera que lorsque les utilisateurs appuient sur la seule touche `Alt`.

Si la barre de menu est déjà visible, le réglage de cette propriété sur `true` ne le fera pas le cacher immédiatement.

#### `win.minimizable`

Une propriété `Boolean` qui détermine si la fenêtre peut être minimisée manuellement par l'utilisateur.

Sur Linux, le setter est un no-op, bien que le getter retourne `true`.

#### `win.maximizable`

Une propriété `Boolean` qui détermine si la fenêtre peut être agrandie manuellement par l'utilisateur.

Sur Linux, le setter est un no-op, bien que le getter retourne `true`.

#### `win.fullScreenable`

Une propriété `Boolean` qui détermine si le bouton maximiser/zoom de la fenêtre active le mode plein écran ou maximise la fenêtre.

#### `win.resizable`

Une propriété `Boolean` qui détermine si la fenêtre peut être redimensionnée manuellement par l'utilisateur.

#### `win.closable`

Une propriété `Boolean` qui détermine si la fenêtre peut être fermée manuellement par l'utilisateur.

Sur Linux, le setter est un no-op, bien que le getter retourne `true`.

#### `win.movable`

Une propriété `Boolean` qui détermine si la fenêtre peut être déplacée par l'utilisateur.

Sur Linux, le setter est un no-op, bien que le getter retourne `true`.

#### `win.excludedFromShownWindowsMenu` *macOS*

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Méthodes d’instance

Objects created with `new BrowserWindow` have the following instance methods:

**Remarque :** Certaines méthodes sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Ramène la fenêtre au premier plan.

#### `win.blur()`

Supprime le focus de la fenêtre.

#### `win.isFocused()`

Returns `Boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `Boolean` - Whether the window is destroyed.

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

Maximise la taille de la fenêtre. Cela affichera également (mais pas au premier-plan) la fenêtre si elle n’est pas déjà affichée.

#### `win.unmaximize()`

Réduit la fenêtre à sa taille initiale.

#### `win.isMaximized()`

Retourne `Boolean` - Si la taille de la fenêtre est maximisée ou non.

#### `win.minimize()`

Minimise la fenêtre. Sur certaines plateformes la fenêtre réduite sera affichée dans le Dock.

#### `win.restore()`

Restaure la fenêtre depuis l'état réduit à son état précédent.

#### `win.isMinimized()`

Retourne `Boolean` - Si la taille de la fenêtre est minimisée ou non.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Définit si la fenêtre doit être en mode plein écran.

#### `win.isFullScreen()`

Retourne `Boolean` - Si la fenêtre est en plein écran ou non.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Entre ou sort du mode plein-écran simple.

Le mode plein-écran simple émule le comportement en plein-écran natif trouvé sur les versions de Mac OS X antérieures à Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Retourne `Boolean` - Si la fenêtre est en mode plein-écran simple (pré-Lion) ou non.

#### `win.isNormal()`

Retourne `Boolean` - Si la fenêtre est dans son état normal (ni maximisée, ni minimisée, ni en plein écran).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). La valeur par défaut est `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (facultatif) *macOS*

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window as `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (facultatif) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window's client area as `Object`.

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Active ou désactive la fenêtre.

#### `win.isEnabled()`

Returns Boolean - whether the window is enabled.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) *macOS*

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Retourne `Integer[]` - Contient la largeur et la hauteur de la fenêtre.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Définit si la fenêtre peut être redimensionnée manuellement par l’utilisateur.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Définit si la fenêtre peut être déplacée par l’utilisateur. Sous Linux, cela ne fait rien.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

Sous Linux, retourne toujours `true`.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Définit si la fenêtre peut être minimisée manuellement par l'utilisateur. Sous Linux, ne fait rien.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isMinimizable()` *macOS* *Windows*

Retourne `Boolean` - Si la fenêtre peut être minimisée manuellement par l'utilisateur

Sous Linux, retourne toujours `true`.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Définit si la fenêtre peut être agrandie manuellement par l'utilisateur. Sous Linux, ne fait rien.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isMaximizable()` *macOS* *Windows*

Retourne `Boolean` - Si la fenêtre peut être agrandie manuellement par l'utilisateur.

Sous Linux, retourne toujours `true`.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Définit si le bouton agrandir/zoom de la fenêtre active/désactive le mode plein écran ou maximise la fenêtre.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Retourne `Boolean` - Si le bouton agrandir/zoom de la fenêtre active le mode plein écran ou maximise la fenêtre.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Définit si la fenêtre peut être fermée manuellement par l’utilisateur. Sous Linux, cela ne fait rien.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isClosable()` *macOS* *Windows*

Retourne `Boolean` - Si la fenêtre peut être fermée manuellement par l'utilisateur.

Sous Linux, retourne toujours `true`.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (facultatif) *macOS* *Windows* - Les valeurs incluent `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `statuus`, `pop-up-menu`, `screen-saver`, et ~`dock`~~ (obsolète). La valeur par défaut est `floating` lorsque `flag` est vrai. Le `niveau` est réinitialisé à `normal` lorsque le drapeau est faux. Notez que de `flottant` à `statut` inclus, la fenêtre est placée sous le Dock sur macOS et sous la barre des tâches sous Windows. De `pop-up-menu` à une valeur supérieure, il est affiché au-dessus du Dock sur macOS et au-dessus de la barre des tâches sur Windows. Voir la documentation [macOS](https://developer.apple.com/documentation/appkit/nswindow/level) pour plus de détails.
* `relativeLevel` Integer (facultatif) *macOS* - Le nombre de calques supérieur à définir cette fenêtre par rapport au `level`. Par défaut, `0`. Notez que Apple décourage le réglage de niveaux supérieurs à 1 au-dessus de `économiseur d'écran`.

Détermine si la fenêtre doit toujours être placée au-dessus d'autres fenêtres. Après Dans ce cas, la fenêtre reste une fenêtre normale, et non une fenêtre de boîte à outils qui ne peut pas faire l'objet d'une attention particulière.

#### `win.isAlwaysOnTop()`

Retourne `Boolean` - Si la fenêtre est toujours au-dessus des autres fenêtres ou non.

#### `win.moveTop()`

Déplace la fenêtre sur le dessus (dans l'ordre z) peu importe qu'elle ait le focus ou non

#### `win.center()`

Déplace la fenêtre vers le centre de l’écran.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (facultatif) *macOS*

Déplace la fenêtre à la position `x` et `y`.

#### `win.getPosition()`

Retourne `Integer[]` - Contient la position actuelle de la fenêtre.

#### `win.setTitle(title)`

* `title` String

Remplace le titre de la fenêtre native par `title`.

#### `win.getTitle()`

Retourne `String` - le titre de la fenêtre native.

**Remarque :** Le titre de la page web peut être différent du titre de la fenêtre native .

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (facultatif)

Modifie le point d'attachement des feuilles sur macOS. Par défaut, les feuilles sont attachées juste sous le cadre de la fenêtre, mais vous pouvez les afficher sous une barre d'outils affichée. Par exemple :

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

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Un message s'accroche à une fenêtre. Le `callback` est appelé lorsque le message est reçu dans le WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (facultatif) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

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
* `options` Object (facultatif) 
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` *Linux* *Windows*

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (facultatif) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` *Windows* *Linux* *Experimental*

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Objet 
  * `icon` [NativeImage](native-image.md) - L'icône s'affichant dans la miniature dans la barre d'outils.
  * `click` Function
  * `tooltip` String (facultatif) - Le texte dans l'info-bulle du bouton.
  * `flags` String[] (facultatif) - Contrôle les états et comportements spécifiques du bouton. `['enabled']` par défaut.

Le `flags` est un tableau pouvant inclure ces `String`s suivant :

* `enabled` - Le bouton est actif et disponible à l'utilisateur.
* `disabled` - Le bouton est désactivé. Il est présent, mais il a un état visual indiquant qu'il ne répondra pas à l'action de l'utilisateur.
* `dismissonclick` - Lorsque le bouton est cliqué, la fenêtre de miniature se ferme immédiatement.
* `nobackground` - Utilise uniquement l'image et ne dessine pas de bordure sur le bouton.
* `hidden` - Le bouton n'est pas affiché à l'utilisateur.
* `noninteractive` - Le bouton est activé mais pas interactif ; L'état du bouton pressé ne sera pas dessiné. Cette valeur est prévue pour le cas où le bouton est utilisé dans une notification.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - La région de la fenêtre

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Objet 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md) | String

Change l'icône de la fenêtre.

#### `win.setWindowButtonVisibility(visible)` *macOS*

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (facultatif) 
  * `visibleOnFullScreen` Boolean (optional) *macOS* - Sets whether the window should be visible above fullscreen windows

Sets whether the window should be visible on all workspaces.

**Remarque :** Cette API ne fonctionne pas sous Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Remarque **: Cette API retourne toujours false sur Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (facultatif) 
  * `forward` Boolean (optional) *macOS* *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *macOS* *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

On macOS it does not remove the focus from the window.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Retourne `BrowserWindow` - La fenêtre parent.

#### `win.getChildWindows()`

Retourne `BrowserWindow[]` - Toutes les fenêtres enfants.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Contrôle s'il faut masquer le curseur lors de la saisie.

#### `win.selectPreviousTab()` *macOS*

Sélectionne l'onglet précédent lorsque les onglets natifs sont activés et il y a d'autres onglets dans la fenêtre.

#### `win.selectNextTab()` *macOS*

Sélectionne l'onglet suivant lorsque les onglets natifs sont activés et il y a d'autres onglets dans la fenêtre.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md) | null - Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` *Expérimental*

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *Expérimental*

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Remarque :** L’API BrowserView est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.