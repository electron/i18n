# BrowserWindow

> Créer et gérer des fenêtres navigateur.

Processus : [Main](../glossary.md#main-process)

```javascript
// Dans le processus main.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Fenêtre sans bords (Frameless window)

Pour créer une fenêtre sans chrome, ou une fenêtre transparente de forme arbitraire, vous pouvez utiliser l'API [Frameless Window](frameless-window.md).

## Afficher des fenêtres avec élégance

Lors du chargement direct d'une page dans la fenêtre, les utilisateurs peuvent voir la page se charger progressivement, ce qui n'est pas une bonne expérience pour une application native. Pour rendre l'affichage de la fenêtre exempt de flash visuel, il y a deux solutions selon la situation.

## À l'aide de l'événement `ready-to-show`

Pendant le chargement de la page, l'événement `ready-to-show` sera émis lorsque le process de rendu aura rendu la page pour la première fois si la fenêtre n'a pas encore été rendue. Afficher la page une fois que l'event a été trigger rendra la page sans ce processus de chargement au fur et à mesure:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Cet événement est généralement émis après l’événement `did-finish-load`, mais pour les pages avec beaucoup de ressources distantes, il peut être émis avant l’événement `did-finish-load`.

Veuillez noter que l'utilisation de cet événement implique que le moteur de rendu sera considéré comme "visible" et peinture, même si `show` est faux.  Cet événement ne se déclenchera jamais si vous utilisez `paintWhenInitiallyHidden: false`

## Régler `backgroundColor`

Pour une application complexe, l’événement `ready-to-show` pourrait être émis trop tard, donnant une impression de lenteur. Dans ce cas, il est recommandé d'afficher la fenêtre immédiatement et d'utiliser un `backgroundColor` proche de la couleur de fond de votre application :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Notez que même pour les applications qui utilisent l'évènement `ready-to-show`, il est toujours recommandé de définir `backgroundColor` pour avoir un rendu plus naturel.

## Fenêtres parent et enfant

En utilisant l'option `parent`, vous pouvez créer une fenêtre enfant:

```javascript
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

La fenêtre `child` sera toujours au dessus de la fenêtre `top`.

## Fenêtres modales

Une fenêtre modale est une fenêtre enfant qui désactive la fenêtre parent. Pour créer une fenêtre modale, il faut définir les options `parent` et `modal` :

```javascript
const { BrowserWindow } = require('electron')

const child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Visibilité de la page

L'[API de visibilité de la page][page-visibility-api] fonctionne comme ci-dessous :

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

> Créer et gérer des fenêtres navigateur.

Processus : [Main](../glossary.md#main-process)

`BrowserWindow` est un [EventEmitter][event-emitter].

Cela crée une nouvelle `BrowserWindow` avec les propriétés natives définies par les `options`.

### `new BrowserWindow([options])`

* `options` Object (optional)
  * `width` Entier (facultatif) - Largeur de la fenêtre en pixels. Le Defaut est`800`.
  * `height` Entier (facultatif) - Hauteur de la fenêtre en pixels. Defaut es `600`.
  * `x` Entier (optionel) - (**obligatoire** si y n'est pas utilise) Le décalage de la fenêtre a été effacé de l'écran. Le defaut est de centrer la fenetre.
  * `y` Entier (optionel) - (**obligatoire** si x est utilisé) Le décalage de la partie supérieure de la fenêtre a été efface de l'écran. Le defaut est de centrer la fenetre.
  * `useContentSize` Boolean (facultatif) - La largeur et la hauteur (`width` et `height`) seront utilisées pour définir la taille de la page Web, ce qui signifie que la taille de la fenêtre réelle inclura la taille du cadre de celle-ci. La fenêtre complète sera donc légèrement plus grande que la taille de son contenu. Par défaut la valeur est `false`.
  * `center` Boolean (facultatif) - afficher la fenêtre dans le centre de l’écran.
  * `Largeurmin`Integre (optionel)-La largeur minimum de la Fenetre. La valeur par defaut en est ``.
  * `minHeight` Integer (facultatif) - Hauteur minimale de la fenêtre en pixels. La valeur par defaut en est ``.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. La valeur par défaut est `true`.
  * `movable` Boolean (optional) - Whether window is movable. Ceci n'est pas implémenté sur Linux. La valeur par défaut est `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. Ceci n'est pas implémenté sous Linux. La valeur par défaut est `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. Ceci n'est pas implémenté sous Linux. La valeur par défaut est `true`.
  * `closable` Boolean (optional) - Whether window is closable. Ceci n'est pas implémenté sur Linux. La valeur par défaut est `true`.
  * `focusable` Boolean (facultatif) - Si la fenêtre peut avoir le focus. La valeur par défaut est `true`. Sur Windows, mettre `focusable: false` implique également le réglage `skipTaskbar: true`. Sur Linux, mettre `focusable: false` fait que la fenêtre arrête d'interragir avec wm, par conséquent la fenêtre restera toujours au dessus dans tous les espaces de travail.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Par défaut la valeur est `false`.
  * `fullscreen` Boolean (facultatif) - Est-ce que la fenêtre doit s'afficher en plein écran. Quand explicitement mit a `false`, le bouton plein écran sera caché ou désactivé sur macOS. Par défaut la valeur est `false`.
  * `fullscreenable` Boolean (facultatif) - Est-ce que la fenêtre peut s'afficher en plein écran. Sur macOS, indiquez également si le bouton de maximizer/zoom doit basculer en mode plein écran ou agrandir la fenêtre. La valeur par défaut est `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Par défaut la valeur est `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. La valeur par défaut est `false`.
  * `kiosk` Boolean (optional) - Whether the window is in kiosk mode. Par défaut la valeur est `false`.
  * `titre` String (facultatif) - Titre par défaut de la fenêtre. La valeur par défaut est `"Electron"`. Si la balise HTML `<title>` est définie dans le fichier HTML chargé par `loadURL()`, cette propriété sera ignorée.
  * `icon` ([NativeImage](native-image.md) | String) (facultatif) - L'icône de la fenêtre. Sur Windows, il est recommandé d'utiliser le format `ICO` pour un rendu optimal. Si non défini, l'icone de l’exécutable sera utilisé.
  * `show` Boolean (optional) - Whether window should be shown when created. La valeur par défaut est `true`.
  * `paintWhenInitiallyHidden` Boolean (facultatif) - Si le moteur de rendu doit être actif lorsque `show` est `false` et qu'il vient d'être créé.  Afin que `document.visibilityState` fonctionne correctement lors du premier chargement avec `show: false` vous devez définir ceci à `false`.  Mettre ceci à `false` fera que l'événement `prêt-à-montrer` ne sera pas déclenché.  La valeur par défaut est `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). La valeur par défaut est `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Par défaut la valeur est `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Par défaut la valeur est `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. La valeur par défaut est `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Par défaut la valeur est `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Par défaut la valeur est `false`.
  * `enableLargerThanScreen` Booléen (facultatif) - Permet à la fenêtre d'être redimensionnée plus grande que l'écran. Seulement pertinent pour macOS, car les autres systèmes d'exploitation autorisent par défaut des fenêtres plus grandes qu'écran par défaut. Par défaut la valeur est `false`.
  * `BackgroundColor` String (facultatif) - Couleur d'arrière-plan de la fenêtre en valeur hexadécimale, comme `#66CD00` ou `#FFF` ou `#80FFFFFF` (alpha au format #AARRGGBB est supporté si `transparent` est défini à `true`). La valeur par défaut est `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. La valeur par défaut est `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). Ceci n'est implémenté que sur Windows et macOS.
  * `darkTheme` Boolean (optionnel) - Force l'utilisation du thème sombre pour la fenêtre, fonctionne uniquement sur certains environnements de bureau GTK+3. Par défaut la valeur est `false`.
  * `transparent` Boolean (facultatif) - Rend la fenêtre [transparente](frameless-window.md#transparent-window). Par défaut la valeur est `false`. Sous Windows, ne fonctionne pas à moins que la fenêtre ne soit sans cadres.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `visualEffectState` String (optional) - Specify how the material appearance should reflect window activity state on macOS. Must be used with the `vibrancy` property. Les valeurs possibles sont :
    * `followWindow` - The backdrop should automatically appear active when the window is active, and inactive when it is not. This is the default.
    * `active` - The backdrop should always appear active.
    * `inactive` - The backdrop should always appear inactive.
  * `titleBarStyle` String (optional) - The style of window title bar. Par défaut la valeur est `default`. Les valeurs possibles sont :
    * `default` - Résultats dans la barre de titre standard de Mac opaque gris.
    * `Caché` - Résultats dans une barre de titre cachée et une fenêtre de contenu en pleine taille, encore la barre de titre a toujours les contrôles standards de la fenêtre ("feux de circulation") dans en haut à gauche.
    * `hiddenInset` - Résultats dans une barre de titre cachée avec un look alternatif où les boutons du feu de circulation sont légèrement plus insérables à partir du bord de la fenêtre.
    * `customButtonsOnHover` - Results in a hidden title bar and a full size content window, the traffic light buttons will display when being hovered over in the top left of the window.  **Note:** Cette option est actuellement expérimentale.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons in frameless windows.
  * `roundedCorners` Boolean (optional) - Whether frameless window should have rounded corners on macOS. La valeur par défaut est `true`.
  * `fullscreenWindowTitle` Boolean (optional) _Deprecated_ - Shows the title in the title bar in full screen mode on macOS for `hiddenInset` titleBarStyle. Par défaut la valeur est `false`.
  * `thickFrame` Boolean (facultatif) - Utilisez le style `WS_THICKFRAME` pour les fenêtres sans cadre sur Windows, qui ajoute une image standard de fenêtre. Le définir à `false` supprimera les animations de fenêtre et de fenêtre. La valeur par défaut est `true`.
  * `vibrancy` String (facultatif) - Ajoute un type d'effet de vibrance à la fenêtre, uniquement sur macOS. Peut être `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `, <code>sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `outil>, <code>content<code>, <0>sous-window`. Please note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` are deprecated and have been removed in macOS Catalina (10.15).
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Si `true`, la fenêtre grandira à la largeur préférée de la page web lors du zoom, `false` le fera zoomer sur la largeur de l'écran. Cela affectera également le comportement lorsque vous appelez `maximize()` directement. Par défaut la valeur est `false`.
  * `tabbingIdentifier` String (facultatif) - Nom du groupe d'onglets, permet d'ouvrir la fenêtre sous la forme d'un onglet natif sur macOS 10.12+. Les fenêtres avec le même identifiant de tabulation seront regroupées. Cela ajoute également un nouveau bouton d'onglet natif à la barre d'onglets de votre fenêtre et permet à votre `app` et fenêtre de recevoir l'événement `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (facultatif) - Activer ou non DevTools. Si elle est définie à `false`, ne peut pas utiliser `BrowserWindow.webContents.openDevTools()` pour ouvrir DevTools. La valeur par défaut est `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Par défaut la valeur est `false`.
    * `nodeIntegrationInWorker` Boolean (facultatif) - Si l'intégration de nœuds est activée dans les workflows web. Par défaut la valeur est `false`. Plus d'informations peuvent être trouvée dans [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (facultatif) - Option expérimentale pour activer le support de Node.js dans les sous-cadres tels que les iframes et les fenêtres enfants. Tous vos préchargements seront chargés pour chaque iframe, vous pouvez utiliser `process.isMainFrame` pour déterminer si vous êtes dans le cadre principal ou non.
    * `preload` String (facultatif) - Spécifie un script qui sera chargé avant les autres scripts exécutés dans la page. Ce script aura toujours accès aux API de noeuds peu importe que l'intégration de noeuds soit activée ou désactivée. La valeur doit être le chemin absolu vers le script. Lorsque l'intégration des nœuds est désactivée, le script de préchargement peut réintroduire les symboles globaux de nœud dans la portée globale. Voir l'exemple [ici](context-bridge.md#exposing-node-global-symbols).
    * `sandbox` Booléen (facultatif) - Si défini, le moteur de rendu associé à la fenêtre, la rendre compatible avec le bac à sable Chromium au niveau du système d'exploitation et la désactivation du nœud. s moteur. Ce n'est pas la même chose que l'option `nodeIntegration` et les API disponibles pour le script de préchargement sont plus limitées. En savoir plus sur l'option [ici](../tutorial/sandbox.md).
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Par défaut la valeur est `false`.
    * `session` [Session](session.md#class-session) (facultatif) - Définit la session utilisée par la page . Au lieu de passer l'objet Session directement, vous pouvez également choisir d'utiliser l'option `partition` à la place, qui accepte une chaîne de partition. Lorsque `session` et `partition` sont fournies, `session` sera préférée. La session par défaut est celle par défaut.
    * `partition` String (facultatif) - Définit la session utilisée par la page en fonction de la chaîne de partition de la session . Si `partition` commence par `persist:`, la page utilisera une session persistante disponible pour toutes les pages de l'application avec le même `partition`. S'il n'y a pas de préfixe `persistant:`, la page utilisera une session en mémoire . En assignant la même `partition`, plusieurs pages peuvent partager la même session. La session par défaut est celle par défaut.
    * `affinity` String (facultatif) - Lorsque spécifié, les pages web avec le même `affinity` s'exécuteront dans le même processus de rendu . Notez que en raison de la réutilisation du processus du moteur de rendu certaines options `webPreferences` seront également partagées entre les pages web, même lorsque vous avez spécifié des valeurs différentes pour elles, incluant mais non limité à `preload`, `sandbox` et `nodeIntegration`. Il est donc suggéré d'utiliser exactement la même `webPreferences` pour les pages web avec la même `affinité`. _Déprécié_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Par défaut la valeur est `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. La valeur par défaut est `true`.
    * `webSecurity` Boolean (facultatif) - Lorsque `false`, il désactivera la politique de même origine (généralement en utilisant des sites de test par des personnes), et définissez `allowRunningInsecureContent` à `true` si cette option n'a pas été définie par l'utilisateur. La valeur par défaut est `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Par défaut la valeur est `false`.
    * `images` Boolean (optional) - Enables image support. La valeur par défaut est `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. La valeur par défaut est `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Par défaut la valeur est `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Par défaut la valeur est `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Par défaut la valeur est `false`.
    * `enableBlinkFeatures` String (facultatif) - Une liste de chaînes de caractères séparées par `,`, comme `CSSVariables,KeyEventKey` pour activer. La liste complète des chaînes de caractères supportées peut être trouvée dans le fichier [RuntimeEnabledFeatures.json5][runtime-enabled-features] .
    * `disableBlinkFeatures` String (facultatif) - Une liste de chaînes de caractères séparées par `,`, comme `CSSVariables,KeyEventKey` pour désactiver. La liste complète des chaînes de fonctionnalités supportées peut être trouvée dans le fichier [RuntimeEnabledFeatures.json5][runtime-enabled-features] .
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
    * `contextIsolation` Boolean (facultatif) - Exécuter les API Electron et le script `preload` spécifié dans un contexte JavaScript séparé. Est à `true` par défaut. Le contexte dans lequel le script `preload` s’exécute n’aura accès qu'à ses propres `document` , globales de `window` et ensemble de types JavaScript intégrés (`Array`, `Object`, `JSON`, etc.), qui seront tous invisibles pour le contenu chargé. L'API Electron ne sera disponible que dans le script de préchargement de `` et pas dans la page chargée. Cette option doit être utilisée lors du chargement de contenu distant potentiellement non fiable afin de se prémunit de toute utilisation frauduleuse du script `preload` ou des APIs Electron.  Cette option utilise la même technique que celle utilisée par les [Chrome Content Scripts][chrome-content-scripts].  Vous pouvez accéder à ce contexte dans les outils de développement en sélectionnant l'entrée 'Electron Isolated Context' de la liste déroulante en haut de l'onglet Console.
    * `worldSafeExecuteJavaScript` Boolean (facultatif) - Si vrai, les valeurs retournées par `webFrame. xecuteJavaScript` seront nettoyées pour empêcher que les valeurs JavaScript puissent changer de monde lors de l'utilisation de `contextIsolation`. Par défaut, `true`. _Déprécié_
    * `nativeWindowOpen` Boolean (facultatif) - Utiliser natif `window.open()`. Par défaut, `faux`. Les fenêtres enfants auront toujours l'intégration du nœud désactivée sauf si `nodeIntegrationInSubFrames` est vrai. **Note:** Cette option est actuellement expérimentale.
    * `webviewTag` Boolean (facultatif) - Activer la balise [`< webview>`](webview-tag.md). Par défaut, `faux`. **Remarque :** Le script `preload` configuré pour le `< webview>` aura une intégration de nœuds activée lorsqu'il est exécuté, donc vous devez vous assurer que le contenu distant/non fiable n'est pas en mesure de créer une balise `<webview>` avec un préchargement de `potentiellement malveillant` script. Vous pouvez utiliser l'événement `will-attach-webview` sur [webContents](web-contents.md) pour supprimer le script `preload` et valider ou modifier les paramètres initiaux de `< webview>`.
    * `additionalArguments` String[] (facultatif) - Liste de chaînes qui seront ajoutées au `process.argv` dans le processus de rendu de cette application.  Utile afin de transmettre de petites informations aux scripts de préchargement du processus de rendu.
    * `safeDialogs` Boolean (facultatif) - Indique s’il faut activer la protection pour les boîtes de dialogue consécutives à la mode "navigateur". Par défaut la valeur est `false`.
    * `safeDialogsMessage` String (facultatif) - Le message à afficher lorsque la protection consécutive des dialogues est déclenchée. Si non défini, le message par défaut serait utilisé, notez que le message par défaut est actuellement en anglais et non localisé.
    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. Par défaut la valeur est `false`.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Par défaut la valeur est `false`.
    * `autoplayPolicy` String (facultatif) - La politique de lecture automatique à appliquer au contenu dans la fenêtre, peut être `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Par défaut, `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. La valeur par défaut est `true`.
    * `enableWebSQL` Boolean (optional) - Whether to enable the [WebSQL api](https://www.w3.org/TR/webdatabase/). La valeur par défaut est `true`.
    * `v8CacheOptions` String (optional) - Enforces the v8 code caching policy used by blink. Les valeurs acceptées sont
      * `none` - Disables code caching
      * `code` - Heuristic based code caching
      * `bypassHeatCheck` - Bypass code caching heuristics but with lazy compilation
      * `bypassHeatCheckAndEagerCompile` - Same as above except compilation is eager. Default policy is `code`.
    * `enablePreferredSizeMode` Boolean (optional) - Whether to enable preferred size mode. The preferred size is the minimum size needed to contain the layout of the document—without requiring scrolling. Enabling this will cause the `preferred-size-changed` event to be emitted on the `WebContents` when the preferred size changes. Par défaut la valeur est `false`.

Lorsque l'on définie une taille minimum ou maximum pour la fenêtre avec `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, cela contraint les utilisateurs uniquement. Cela ne vous empêche pas de passer une taille qui ne suit pas les contraintes de tailles à `setBounds`/`setSize` ou au constructeur de `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Les valeurs possibles sont :

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

Émis lorsque le document a changé son titre, appeler `event.preventDefault()` empêchera le titre de la fenêtre native de changer. `explicitSet` est faux lorsque le titre est synthétisé à partir de l'URL du fichier.

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

Veuillez noter que l'utilisation de cet événement implique que le moteur de rendu sera considéré comme "visible" et peinture, même si `show` est faux.  Cet événement ne se déclenchera jamais si vous utilisez `paintWhenInitiallyHidden: false`

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
* `newBounds` [Rectangle](structures/rectangle.md) - Taille de la fenêtre en cours de redimensionnage.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Événement : 'resize'

Émis après que la fenêtre soit redimensionnée.

#### Événement : 'resized' _macOS_ _Windows_

Emitted once when the window has finished being resized.

This is usually emitted when the window has been resized manually. On macOS, resizing the window with `setBounds`/`setSize` and setting the `animate` parameter to `true` will also emit this event once resizing has finished.

#### Événement : 'will-move' _macOS_ _Windows_

Retourne :

* `event` Événement
* `newBounds` [Rectangle](structures/rectangle.md) - Emplacement où la fenêtre est en cours de déplacement.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Événement : 'move'

Émis lorsque la fenêtre est déplacée vers une nouvelle position.

#### Événement : 'moved' _macOS_ _Windows_

Émis une fois lorsque la fenêtre est déplacée vers une nouvelle position.

__Note__ : Sous macOS, cet événement est un alias de `move`.

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
const win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

Les commandes d'application suivantes sont explicitement prises en charge sur Linux :

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

The method underlying this event is built to handle older macOS-style trackpad swiping, where the content on the screen doesn't move with the swipe. Most macOS trackpads are not configured to allow this kind of swiping anymore, so in order for it to emit properly the 'Swipe between pages' preference in `System Preferences > Trackpad > More Gestures` must be set to 'Swipe with two or three fingers'.

#### Événement : 'rotate-gesture' _macOS_

Retourne :

* `event` Événement
* `rotation` Float

Émis lors du mouvement de rotation du trackpad. Émission continue jusqu'à la fin du geste de rotation. La valeur `rotation` sur chaque émission est l'angle en degrés tourné depuis la dernière émission. Le dernier événement émis lors d'un geste de rotation sera toujours de la valeur `0`. Les valeurs de rotation dans le sens inverse des aiguilles d'une montre sont positives, tandis que les valeurs dans le sens horaire sont négatives.

#### Événement : 'sheet-begin' _macOS_

Émis lorsque la fenêtre ouvre une feuille.

#### Événement : 'sheet-end' _macOS_

Émis lorsque la fenêtre a fermé une feuille.

#### Événement : 'new-window-for-tab' _macOS_

Émis lorsque le bouton natif du nouvel onglet est cliqué.

#### Événement : 'system-context-menu' _Windows_

Retourne :

* `event` Événement
* `point` [Point](structures/point.md) - The screen coordinates the context menu was triggered at

Emitted when the system context menu is triggered on the window, this is normally only triggered when the user right clicks on the non-client area of your window.  This is the window titlebar or any area you have declared as `-webkit-app-region: drag` in a frameless window.

Calling `event.preventDefault()` will prevent the menu from being displayed.

### Méthodes statiques

La classe `BrowserWindow` a les méthodes statiques suivantes :

#### `BrowserWindow.getAllWindows()`

Retourne `BrowserWindow[]` - Un tableau de toutes les fenêtres ouvertes.

#### `BrowserWindow.getFocusedWindow()`

Retourne `BrowserWindow | null` - La fenêtre qui est concentrée dans cette application, sinon retourne `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow | null` - The window that owns the given `webContents` or `null` if the contents are not owned by a window.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Retourne `BrowserWindow | null` - La fenêtre qui possède le `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Retourne `BrowserWindow | null` - La fenêtre avec l'`id` donné.

### Propriétés d'instance

Les objets créés avec `nouveau BrowserWindow` ont les propriétés suivantes :

```javascript
const { BrowserWindow } = require('electron')
// In this example `win` is our instance
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Voir la [`webContents` documentation](web-contents.md) pour ses méthodes et ses événements.

#### `win.id` _Readonly_

Une propriété `Integer` représentant l'ID unique de la fenêtre. Chaque ID est unique parmi ceux des instances de `BrowserWindow` de l'application Electron.

#### `format@@0 win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

Si la barre de menu est déjà visible, le réglage de cette propriété sur `true` ne le fera pas le cacher immédiatement.

#### `win.simpleFullScreen`

A `Boolean` property that determines whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.fullScreen`

A `Boolean` property that determines whether the window is in fullscreen mode.

#### `win.visibleOnAllWorkspaces`

A `Boolean` property that determines whether the window is visible on all workspaces.

**Note:** Always returns false on Windows.

#### `win.shadow`

A `Boolean` property that determines whether the window has a shadow.

#### `win.menuBarVisible` _Windows_ _Linux_

A `Boolean` property that determines whether the menu bar should be visible.

**Note:** If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.kiosk`

A `Boolean` property that determines whether the window is in kiosk mode.

#### `win.documentEdited` _macOS_

A `Boolean` property that specifies whether the window’s document has been edited.

The icon in title bar will become gray when set to `true`.

#### `win.representedFilename` _macOS_

A `String` property that determines the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.title`

A `String` property that determines the title of the native window.

**Note:** The title of the web page can be different from the title of the native window.

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

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` par défaut.

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

#### `win.accessibleTitle`

A `String` property that defines an alternative title provided only to accessibility tools such as screen readers. This string is not directly visible to users.

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

Simple fullscreen mode emulates the native fullscreen behavior found in versions of macOS prior to Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Retourne `Boolean` - Si la fenêtre est en mode plein-écran simple (pré-Lion) ou non.

#### `win.isNormal()`

Retourne `Boolean` - Si la fenêtre est dans son état normal (ni maximisée, ni minimisée, ni en plein écran).

#### `win.setAspectRatio(aspectRatio[, extraSize])`

* `aspectRatio` Float - L'aspect ratio à maintenir pour une partie de la vue de contenu .
* `extraSize` [Size](structures/size.md) (optional) _macOS_ - The extra size not to be included while maintaining the aspect ratio.

Cela fera que la fenêtre maintient un ratio d'aspect. La taille supplémentaire permet à un développeur d'avoir de l'espace, spécifié en pixels, non inclus dans les calculs de ratio de l'aspect. Cette API prend déjà en compte la différence entre la taille d'une fenêtre et sa taille de contenu.

Considérez une fenêtre normale avec un lecteur vidéo HD et des commandes associées. Il y a peut-être 15 pixels de contrôles sur le bord gauche, 25 pixels de contrôles sur le bord droit et 50 pixels de contrôles sous le joueur. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and
{ width: 40, height: 50 }. Le deuxième argument ne se soucie pas du fait que la largeur et la hauteur supplémentaires sont dans la vue de contenu --seulement qu'elles existent. Sommez toute la largeur supplémentaire et les zones de hauteur que vous avez dans la vue de contenu globale.

The aspect ratio is not respected when window is resized programmingly with APIs like `win.setSize`.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Couleur d'arrière-plan de la fenêtre sous la forme d'une valeur hexadécimale, comme `#66CD00` ou `#FFF` ou `#80FFFFFF` (l'alpha est supporté si `transparent` est `true`). La valeur par défaut est `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - Le chemin absolu vers le fichier à prévisualiser avec QuickLook. Ceci est important car Quick Look utilise le nom de fichier et l'extension de fichier sur le chemin pour déterminer le type de contenu du fichier à ouvrir.
* `displayName` String (facultatif) - Le nom du fichier à afficher dans la vue modale de Quick Look . Ceci est purement visuel et n'affecte pas le type de contenu du fichier. Par défaut, `chemin`.

Utilise [Aperçu rapide][quick-look] pour prévisualiser un fichier à un chemin donné.

#### `win.closeFilePreview()` _macOS_

Ferme le panneau [Aperçu rapide][quick-look] actuellement ouvert.

#### `win.setBounds(bounds[, animate])`

* `limites` Partiel<unk> Rectangle</a>>
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

#### `win.getBackgroundColor()`

Returns `String` - Gets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

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

#### `win.isEnabled()`

Retourne `Boolean` - Si la fenêtre est activée.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) _macOS_

Redimensionne la fenêtre à `width` x `height`. Si la largeur `width` ou la hauteur `height` sont inférieures aux minima définis, la fenêtre se limitera à sa taille minimale.

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

Définit si la fenêtre peut être redimensionnée ou pas par l’utilisateur.

#### `win.isResizable()`

Retourne `Boolean` - Si la fenêtre peut être redimensionnée manuellement par l'utilisateur.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Définit si la fenêtre peut être déplacée par l’utilisateur. N'a aucun effet sous Linux.

#### `win.isMovable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être déplacée par l'utilisateur.

Sous Linux, retourne toujours `true`.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Définit si la fenêtre peut être minimisée par l’utilisateur. N'a aucun effet sous Linux.

#### `win.isMinimizable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être minimisée par l'utilisateur.

Sous Linux, retourne toujours `true`.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Définit si la fenêtre peut être maximalisée par l’utilisateur. N'a aucun effet sous Linux.

#### `win.isMaximizable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être agrandie manuellement par l'utilisateur.

Sous Linux, retourne toujours `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Définit si le bouton agrandir/zoom de la fenêtre active/désactive le mode plein écran ou agrandit la fenêtre.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. N'a aucun effet sous Linux.

#### `win.isClosable()` _macOS_ _Windows_

Retourne `Boolean` - Si la fenêtre peut être fermée manuellement par l'utilisateur.

Sous Linux, retourne toujours `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (facultatif) _macOS_ _Windows_ - Les valeurs incluent `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `statuus`, `pop-up-menu`, `screen-saver`, et ~`dock`~~ (obsolète). La valeur par défaut est `floating` lorsque `flag` est vrai. Le `niveau` est réinitialisé à `normal` lorsque le drapeau est faux. Notez que de `flottant` à `statut` inclus, la fenêtre est placée sous le Dock sur macOS et sous la barre des tâches sous Windows. De `pop-up-menu` à une valeur supérieure, il est affiché au-dessus du Dock sur macOS et au-dessus de la barre des tâches sur Windows. Voir la documentation [macOS][window-levels] pour plus de détails.
* `relativeLevel` Integer (facultatif) _macOS_ - Le nombre de calques supérieur à définir cette fenêtre par rapport au `level`. Par défaut, `0`. Notez que Apple décourage le réglage de niveaux supérieurs à 1 au-dessus de `économiseur d'écran`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Retourne `Boolean` - Si la fenêtre est toujours au-dessus des autres fenêtres ou non.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. Par exemple "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

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
const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Démarre ou arrête de flasher la fenêtre pour attirer l'attention de l'utilisateur.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Fait que la fenêtre ne soit pas affichée dans la barre des tâches.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves kiosk mode.

#### `win.isKiosk()`

Retourne `Boolean` - Si la fenêtre est en mode kiosque.

#### `win.isTabletMode()` _Windows_

Returns `Boolean` - Whether the window is in Windows 10 tablet mode.

Since Windows 10 users can [use their PC as tablet](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet), under this mode apps can choose to optimize their UI for tablets, such as enlarging the titlebar and hiding titlebar buttons.

This API returns whether the window is in tablet mode, and the `resize` event can be be used to listen to changes to tablet mode.

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. Par exemple "window:1324:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Retourne `Buffer` - Le gestionnaire spécifique à la plate-forme de la fenêtre.

Le type natif du handle est `HWND` sous Windows, `NSView*` sur macOS, et `Window` (`long`non signé</0>) sous Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function
  * `wParam` any - The `wParam` provided to the WndProc
  * `lParam` any - The `lParam` provided to the WndProc

Hooks a windows message. La `callback` est appelée lorsque le message est reçu dans le WndProc.

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

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (facultatif) - Les limites à capturer

Retourne `Promise<NativeImage>` - résout avec une [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page. Si la page n'est pas visible, `rect` peut être vide.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (facultatif) - Une URL de référence HTTP.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n"
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (facultatif) - URL de base (avec séparateur de chemin de pointe) pour que les fichiers soient chargés par l'URL de données. Ceci n'est nécessaire que si l'`url` spécifiée est une URL de données et a besoin de charger d'autres fichiers.

Retourne `Promise<void>` - la promesse se résoudra lorsque la page aura terminé le chargement (voir [`did-finish-load`](web-contents.md#event-did-finish-load)), et rejette si la page ne parvient pas à se charger (voir [`did-fail-load`](web-contents.md#event-did-fail-load)).

Même que [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

L'`url` peut être une adresse distante (par exemple `http://`) ou un chemin vers un fichier HTML local en utilisant le `file://` protocole.

Pour s'assurer que les URL de fichier sont correctement formatées, il est recommandé d'utiliser la méthode Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) :

```javascript
const url = require('url').format({
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
  * `query` Enregistrement<String, String> (facultatif) - Passé à `url.format()`.
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

Définit la valeur de progression dans la barre de progression. La plage valide est [0, 1.0].

Supprimer la barre de progression lorsque la progression < 0 ; Passer en mode indéterminé lorsque la progression > 1.

Sur la plate-forme Linux, ne prend en charge que l'environnement de bureau Unity, vous devez spécifier le nom du fichier `*.desktop` au champ `desktopName` dans `package.json`. Par défaut, il assumera `{app.name}.desktop`.

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

Définit l'opacité de la fenêtre. Sur Linux, n'a aucun effet. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). Sur Linux, renvoie toujours 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Définir une forme de fenêtre détermine la zone dans la fenêtre où le système permet de dessiner et d'interagir avec l'utilisateur. En dehors de la région donnée, aucun pixel ne sera dessiné et aucun événement de souris ne sera enregistré. Les événements de souris en dehors de la région ne seront pas reçus par cette fenêtre, mais passeront à tout ce qui se trouve derrière la fenêtre.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Retourne `Boolean` - Si les boutons ont été ajoutés avec succès

Ajouter une barre d'outils miniature avec un ensemble de boutons spécifié à l'image de miniature d'une fenêtre dans la disposition d'un bouton de la barre des tâches. Renvoie un objet `Booléen` indique si la vignette a été ajoutée avec succès.

Le nombre de boutons dans la barre d'outils miniature ne doit pas dépasser 7 en raison de la salle limitée. Une fois que vous avez configuré la barre d'outils miniature, la barre d'outils ne peut pas être retirée en raison de la limitation de la plateforme. Mais vous pouvez appeler l'API avec un tableau vide pour nettoyer les boutons.

Le `boutons` est un tableau d'objets `Bouton` :

* Objet `Button`
  * `icon` [NativeImage](native-image.md) - L'icône s'affichant dans la miniature dans la barre d'outils.
  * `click` Function
  * `tooltip` String (facultatif) - Le texte dans l'info-bulle du bouton.
  * `flags` String[] (facultatif) - Contrôle les états et comportements spécifiques du bouton. Par défaut, il est `['activé']`.

Le `flags` est un tableau pouvant inclure ces `String`s suivant :

* `enabled` - Le bouton est actif et disponible à l'utilisateur.
* `désactivé` - Le bouton est désactivé. Il est présent, mais a un état visuel indiquant qu'il ne répondra pas à l'action de l'utilisateur.
* `dismissonclick` - Lorsque le bouton est cliqué, la fenêtre de miniature se ferme immédiatement.
* `nobackground` - Utilise uniquement l'image et ne dessine pas de bordure sur le bouton.
* `hidden` - Le bouton n'est pas affiché à l'utilisateur.
* `non interactif` - Le bouton est activé mais non interactif ; aucun état de bouton n'est dessiné. Cette valeur est destinée aux cas où le bouton est utilisé dans une notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - La région de la fenêtre

Définit la région de la fenêtre à afficher comme image de miniature affichée lorsque survole la fenêtre dans la barre des tâches. Vous pouvez réinitialiser la miniature en toute la fenêtre en spécifiant une région vide : `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Définit l'infobulle qui s'affiche en survolant la vignette de la fenêtre dans la barre des tâches.

#### `win.setAppDetails(options)` _Windows_

* Objet `options`
  * `appId` String (facultatif) - Fenêtre [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Elle doit être définie, sinon les autres options n'auront aucun effet.
  * `appIconPath` String (facultatif) - Fenêtre [Icône de relance](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. La valeur par defaut en est ``.
  * `relaunchCommand` String (facultatif) - La [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx)de Windows.
  * `relaunchDisplayName` String (facultatif) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Définit les propriétés du bouton de la barre des tâches de la fenêtre.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. Si l'une de ces propriétés n'est pas définie, aucune ne sera utilisée.

#### `win.showDefinitionForSelection()` _macOS_

Identique à `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | Chaîne

Change l'icône de la fenêtre.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Définit si les boutons du feu de la fenêtre doivent être visibles.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Définit si la barre de menus de la fenêtre doit se cacher automatiquement. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

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
  * `visibleOnFullScreen` Booléen (facultatif) _macOS_ - Définit si la fenêtre doit être visible au-dessus des fenêtres plein écran.
  * `skipTransformProcessType` Boolean (optional) _macOS_ - Calling setVisibleOnAllWorkspaces will by default transform the process type between UIElementApplication and ForegroundApplication to ensure the correct behavior. However, this will hide the window and dock for a short time every time it is called. If your window is already of type UIElementApplication, you can bypass this transformation by passing true to skipTransformProcessType.

Définit si la fenêtre doit être visible sur tous les espaces de travail.

**Remarque :** Cette API ne fonctionne pas sous Windows.

#### `win.isVisibleOnAllWorkspaces()`

Retourne `Boolean` - Si la fenêtre est visible sur tous les espaces de travail.

**Remarque **: Cette API retourne toujours false sur Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `Avancer` Boolean (facultatif) _macOS_ _Windows_ - Si vrai, transférez la souris messages vers Chromium, en activant les événements liés à la souris tels que `souris`. Utilisé uniquement lorsque `ignore` est vrai. Si `ignore` est faux, le transfert est toujours désactivé quelle que soit cette valeur.

Fait que la fenêtre ignore tous les événements de la souris.

Tous les événements survenus dans cette fenêtre seront passés à la fenêtre ci-dessous cette fenêtre, mais si cette fenêtre a le focus, elle recevra toujours les événements du clavier .

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Empêche le contenu de la fenêtre d'être capturé par d'autres applications.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_EXCLUDEFROMCAPTURE`. For Windows 10 version 2004 and up the window will be removed from capture entirely, older Windows versions behave as if `WDA_MONITOR` is applied capturing a black window.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Modifie si la fenêtre peut être mise au point.

Sur macOS, il ne supprime pas le focus de la fenêtre.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

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

* `type` String | null - Peut être `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `sous-window`, ou `sous-page`. Voir la documentation [macOS][vibrancy-docs] pour plus de détails.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Notez que `appearance-based`, `light`, `dark`, `medium-light`, et `ultra-dark` ont été obsolètes et seront supprimées dans une prochaine version de macOS.

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons in frameless window.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The custom position for the traffic light buttons in frameless window.

#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | null

Définit la disposition de la barre tactile pour la fenêtre actuelle. La spécification `null` ou `undefined` efface la barre de contact. Cette méthode n'a d'effet que si la machine a une barre tactile et est en cours d'exécution sur macOS 10.12.1+.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - Attache une `browserView` à `win`. Si d'autres `BrowserView`sont déjà attachées, elles seront supprimés de cette fenêtre.

#### `win.getBrowserView()` _Expérimental_

Retourne `BrowserView | null` - La `BrowserView` attachée à `win`. Retourne `null` si aucune n'est attachée. Lance une erreur si plusieurs `BrowserView` sont attachées.

#### `win.addBrowserView(browserView)` _Expérimental_

* `browserView` [BrowserView](browser-view.md)

Remplacement de l'API pour setBrowserView prenant en charge le travail avec des vues multi navigateurs.

#### `win.removeBrowserView(browserView)` _Expérimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.setTopBrowserView(browserView)` _Expérimental_

* `browserView` [BrowserView](browser-view.md)

Raises `browserView` above other `BrowserView`s attached to `win`. Lance une erreur si `browserView` n'est pas attaché à `win`.

#### `win.getBrowserViews()` _Expérimental_

Retourne `BrowserView[]` - un tableau de toutes les BrowserViews qui ont été attachées avec `addBrowserView` ou `setBrowserView`.

**Remarque :** L’API BrowserView est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
