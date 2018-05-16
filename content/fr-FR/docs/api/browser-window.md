# BrowserWindow

> Créer et contrôle des fenêtres navigateur.

Processus : [Main](../glossary.md#main-process)

```javascript
// Dans le processus main.
const {BrowserWindow} = require('electron')

// Ou utilisez `remote` depuis le renderer process.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
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
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Cet événement est généralement émis après l’événement `did-finish-load`, mais pour les pages avec beaucoup de ressources distantes, il peut être émis avant l’événement `did-finish-load`.

### Régler `backgroundColor`

Pour une application complexe, l’événement `ready-to-show` pourrait être émis trop tard, donnant une impression de lenteur. Dans ce cas, il est recommandé d'afficher la fenêtre immédiatement et d'utiliser un `backgroundColor` proche de la couleur de fond de votre application :

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Notez que même pour les applications qui utilisent l'évènement `ready-to-show`, il est toujours recommandé de définir `backgroundColor` pour avoir un rendu plus naturel.

## Fenêtres parent et enfant

En utilisant l'option `parent`, vous pouvez créer une fenêtre enfant:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

La fenêtre `child` sera toujours au dessus de la fenêtre `top`.

### Fenêtres modales

Une fenêtre modale est une fenêtre enfant qui désactive la fenêtre parent. Pour créer une fenêtre modale, il faut définir les options `parent` et `modal` :

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
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
* Sur Windows, il n'est pas possible de changer la fenêtre parent dynamiquement.
* Sur Linux, le type des fenêtre modales sera changé par `dialog`.
* Sur Linux, beaucoup d'environnements bureau ne peuvent pas cacher une fenêtre modale.

## Classe : BrowserWindow

> Créer et contrôle des fenêtres navigateur.

Processus : [Main](../glossary.md#main-process)

`BrowserWindow` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Cela crée une nouvelle `BrowserWindow` avec les propriétés natives définies par les `options`.

### `new BrowserWindow([options])`

* `options` Object (facultatif) 
  * `width` Integer (optionel) - Largeur de la fenêtre en pixels. La valeur par défaut est `800`.
  * `height` Integer (optionel) - La hauteur de la fenêtre en pixels. La valeur par défaut est `600`.
  * `x` Integer (optionel) (**requis** si y est utilisé) - Décalage à gauche de la fenêtre jusqu'a l'écran. Par défaut, la fenêtre est centrée.
  * `y` Integer (optionel) (**requis** si x est utilisé) - Décalage en haut de la fenêtre jusqu'a l'écran. Par défaut la fenêtre est centrée.
  * `useContentSize` Boolean (optionel) - La largeur et la hauteur (`width` et `height`) seront utilisées pour définir la taille de la page Web, ce qui signifie que la taille de la fenêtre réelle inclura la taille du cadre de celle-ci. La fenêtre complète sera donc légèrement plus grande que la taille de son contenu. Par défaut la valeur est `false`.
  * `center` Boolean (facultatif) - afficher la fenêtre dans le centre de l’écran.
  * `minWidth` Integer (facultatif) - Largeur minimum de la fenêtre en pixels. La valeur par défaut est ``.
  * `minHeight` Integer (facultatif) - Hauteur minimale de la fenêtre en pixels. La valeur par défaut est ``.
  * `maxWidth` Integer (facultatif) - Largeur maximum de la fenêtre en pixels. La valeur par défaut est sans limite.
  * `maxHeight` Integer (facultatif) - Hauteur maximale de la fenêtre en pixels. La valeur par défaut est sans limite.
  * `resizable` Boolean (facultatif) - Si la fenêtre est redimensionnable. La valeur par défaut est `true`.
  * `movable` Boolean (facultatif) - Si la fenêtre est déplaçable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `minimizable` Boolean (facultatif) - Si la fenêtre est minimisable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `maximizable` Boolean (facultatif) - Si la fenêtre est maximisable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `closable` Boolean (facultatif) - Si la fenêtre est fermable. Non-implémenté sur Linux. La valeur par défaut est `true`.
  * `focusable` Boolean (facultatif) - Si la fenêtre peut avoir le focus. La valeur par défaut est `true`. Sur Windows, mettre `focusable: false` implique également le réglage `skipTaskbar: true`. Sur Linux, mettre `focusable: false` fait que la fenêtre arrête d'interragir avec wm, par conséquent la fenêtre restera toujours au dessus dans tous les espaces de travail.
  * `alwaysOnTop` Boolean (facultatif) - Si la fenêtre devrait toujours rester au dessus des autres fenêtres. La valeur par défaut est `false`.
  * `fullscreen` Boolean (facultatif) - Est-ce que la fenêtre doit s'afficher en plein écran. When explicitly set to `false` the fullscreen button will be hidden or disabled on macOS. Par défaut la valeur est `false`.
  * `fullscreenable` Boolean (optional) - Whether the window can be put into fullscreen mode. On macOS, also whether the maximize/zoom button should toggle full screen mode or maximize window. Default is `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Default is `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Default is `false`.
  * `title` String (optional) - Default window title. Default is `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (optional) - The window icon. On Windows it is recommended to use `ICO` icons to get best visual effects, you can also leave it undefined so the executable's icon will be used.
  * `show` Boolean (optional) - Whether window should be shown when created. Default is `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Default is `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Default is `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Default is `false`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Default is `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are: 
    * `default` - Results in the standard gray opaque Mac title bar.
    * `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
    * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, minimize, and full screen buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. Default is `true`.
  * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. Par défaut la valeur est `false`.
  * `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Default is `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. Par défaut la valeur est `false`. More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Default is the default session.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Default is `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
      * `standard` String (optional) - Defaults to `Times New Roman`.
      * `serif` String (optional) - Defaults to `Times New Roman`.
      * `sansSerif` String (optional) - Defaults to `Arial`.
      * `monospace` String (optional) - Defaults to `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to ``.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
    * `additionArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.

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

Émis lorsque le document a changé son titre, appeller `event.preventDefault()` empêchera le titre de la fenêtre native de changer.

#### Événement : 'close'

Retourne :

* `event` Événement

Emis lorsque la fenêtre va être fermée. Émis avant les événements `beforeunload` et `unload` du DOM. Appeller `event.preventDefault()` annulera la fermeture.

Normalement, vous voudriez utiliser le gestionaire `beforeunload` pour décider si une fenêtre doit être fermée, ce qui sera aussi appelé lorsque la fenêtre est rechargée. Dans Electron, n'importe quelle valeur retournée autre que `undefined` annulera la fermeture. Par exemple :

```javascript
window.onbeforeunload = (e) => {   console.log('I do not want to be closed')  

// A la différence des navigateurs web, un message sera affiché aux utilisateurs, retourner
// une valeur non-nulle annulera la fermeture.
  // Il est recommandé d'utilisaer l'API de dialogue afin de laisser l'utilisateur confirmer la fermeture de
// l'application.
  e.returnValue = false // Equivaut à un `return false` mais ce n'est pas recommandé
}
```

***Note**: Il y a une subtile différence entre le comportement de `window.onbeforeunload = handler` et `window.addEventListener('beforeunload', handler)`. Il est recommendé de toujours spécifier l' `event.returnValue` explicitement, plutôt que de seulement retourner une valeur, cette méthode fonctionne mieux avec Electron.*

#### Événement : 'closed'

Émis lorsque la fenêtre est fermée. Après avoir reçu cet évenement, vous devriez enlever la référence à la fenêtre et éviter de l'utiliser à nouveau.

#### Événement : 'session-end' *Windows*

Émis lorsque la session va se terminer à cause d'une redémarage, un éteignage forcé ou une déconnexion.

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

Émis lorsque la page web à été chargée (tout en n'était pas affichée) et la fenêtre peut être affichée sans flash visuel.

#### Événement : 'maximize'

Émis lorsque la fenêtre est agrandie.

#### Événement : 'unmaximize'

Émis lorsque la fenêtre quitte un état maximisé.

#### Événement : 'minimize'

Émis lorsque la fenêtre est réduite.

#### Événement : 'restore'

Émis lorsque la fenêtre est restaurée à partir d’un état réduit.

#### Événement : 'resize'

Émis lorsque la fenêtre est redimensionnée.

#### Événement : 'move'

Émis lorsque la fenêtre est déplacée vers une nouvelle position.

**Note** : Sous macOS, cet événement est simplement un alias de `moved`.

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

#### Événement : 'app-command' *Windows*

Retourne :

* `event` Événement
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

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

#### Événement : 'sheet-begin' *macOS*

Émis lorsque la fenêtre ouvre une feuille.

#### Événement : 'sheet-end' *macOS*

Émis lorsque la fenêtre a fermé une feuille.

#### Événement : 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Méthodes statiques

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Remove a Chrome extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Remove a DevTools extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### Propriétés d'instance

Objects created with `new BrowserWindow` have the following properties:

```javascript
const {BrowserWindow} = require('electron')
// In this example `win` is our instance
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id`

A `Integer` representing the unique ID of the window.

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

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Réduit la fenêtre à sa taille initiale.

#### `win.isMaximized()`

Returns `Boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restaure la fenêtre depuis l'état réduit à son état précédent.

#### `win.isMinimized()`

Returns `Boolean` - Whether the window is minimized.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Définit si la fenêtre doit être en mode plein écran.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Just sum any extra width and height areas you have within the overall content view.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (facultatif) *macOS*

Redimensionne et déplace la fenêtre vers les limites fournies

#### `win.getBounds()`

Retourne [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (facultatif) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Retourne [`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

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

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Définit si la fenêtre peut être déplacée par l’utilisateur. Sous Linux, cela ne fait rien.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Définit si la fenêtre peut être fermée manuellement par l’utilisateur. Sous Linux, cela ne fait rien.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Déplace la fenêtre vers le centre de l’écran.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (facultatif) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (facultatif)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect() win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Entre ou quitte le mode kiosk.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

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

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (facultatif) 
  * `httpReferrer` String (optionnel) - Une URL de référent HTTP.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Same as `webContents.loadURL(url[, options])`.

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

#### `win.loadFile(filePath)`

* `filePath` String

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (facultatif) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

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

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Objet 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Changes window icon.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (facultatif) 
  * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Contrôle s'il faut masquer le curseur lors de la saisie.

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

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

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Remarque :** L’API BrowserView est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.