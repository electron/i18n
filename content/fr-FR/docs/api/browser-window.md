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

Veuillez noter que l'utilisation de cet événement implique que le moteur de rendu sera considéré comme "visible" et peinture, même si `show` est faux. Cet événement ne se déclenchera jamais si vous utilisez `paintWhenInitiallyHidden: false`

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

`BrowserWindow` est un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Cela crée une nouvelle `BrowserWindow` avec les propriétés natives définies par les `options`.

### `new BrowserWindow([options])`

* `options` Object (facultatif) 
  * `width` Integer (facultatif) - Largeur de la fenêtre en pixels. La valeur par défaut est `800`.
  * `height` Integer (facultatif) - La hauteur de la fenêtre en pixels. La valeur par défaut est `600`.
  * `x` Integer (facultatif) - (**requis** si y est utilisé) le décalage gauche de la fenêtre à partir de l'écran. La valeur par défaut est de centrer la fenêtre.
  * `y` Integer (facultatif) - (**requis** si x est utilisé) Décalage du haut de la fenêtre à partir de l'écran. Par défaut, il faut centrer la fenêtre.
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
  * `titre` String (facultatif) - Titre par défaut de la fenêtre. La valeur par défaut est `"Electron"`. Si la balise HTML `<title>` est définie dans le fichier HTML chargé par `loadURL()`, cette propriété sera ignorée.
  * `icon` ([NativeImage](native-image.md) | String) (facultatif) - L'icône de la fenêtre. Sur Windows, il est recommandé d'utiliser le format `ICO` pour un rendu optimal. Si non défini, l'icone de l’exécutable sera utilisé.
  * `show` Boolean (facultatif) -Détermine si la fenêtre doit s'afficher ou non à la création. La valeur par défaut est `true`.
  * `paintWhenInitiallyHidden` Boolean (facultatif) - Si le moteur de rendu doit être actif lorsque `show` est `false` et qu'il vient d'être créé. Afin que `document.visibilityState` fonctionne correctement lors du premier chargement avec `show: false` vous devez définir ceci à `false`. Mettre ceci à `false` fera que l'événement `prêt-à-montrer` ne sera pas déclenché. La valeur par défaut est `true`.
  * `frame` Boolean (facultatif) - Spécifier `false` pour créer une [fenêtre sans bordure](frameless-window.md). La valeur par défaut est `true`.
  * `parent` BrowserWindow (facultatif) - Spécifier la fenêtre parent. La valeur par défaut est `null`.
  * `modal` Boolean (optionnel) - Si c'est une fenêtre modale ou non. Fonctionne uniquement lorsque la fenêtre est une fenêtre enfant. La valeur par défaut est `false`.
  * `acceptFirstMouse` Boolean (facultatif) - Si la vue accepte un seul événement de souris qui active simultanément la fenêtre. La valeur par défaut est `false`.
  * `disableAutoHideCursor` Boolean (facultatif) - Si vous voulez cacher le curiseur lors de la saisie. La valeur par défaut est `false`.
  * `autoHideMenuBar` Boolean (facultatif) - Masquer automatiquement la barre de menu ) moins que la touche `Alt` soit enfoncée. La valeur par défaut est `false`.
  * `enableLargerThanScreen` Booléen (facultatif) - Permet à la fenêtre d'être redimensionnée plus grande que l'écran. Seulement pertinent pour macOS, car les autres systèmes d'exploitation autorisent par défaut des fenêtres plus grandes qu'écran par défaut. Par défaut la valeur est `false`.
  * `BackgroundColor` String (facultatif) - Couleur d'arrière-plan de la fenêtre en valeur hexadécimale, comme `#66CD00` ou `#FFF` ou `#80FFFFFF` (alpha au format #AARRGGBB est supporté si `transparent` est défini à `true`). La valeur par défaut est `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. Default is `true`.
  * `opacité` Number (optionnel) - Définit l'opacité initiale de la fenêtre, entre 0. (entièrement transparente) et 1.0 (entièrement opaque). Ceci n'est implémenté que sur Windows et macOS.
  * `darkTheme` Boolean (facultatif) - Force l'utilisation du thème sombre pour la fenêtre, ne fonctionne que sur certains environnements de bureau GTK+3. La valeur par défaut est `false`.
  * `transparent` Boolean (facultatif) - Rend la fenêtre [transparente](frameless-window.md#transparent-window). Par défaut la valeur est `false`. Sous Windows, ne fonctionne pas à moins que la fenêtre ne soit sans cadres.
  * `type` String (facultatif) - Le type de fenêtre, par défaut, est la fenêtre normale. En savoir plus sur ci-dessous.
  * `format@@0 titleBarStyle` String (facultatif) - Le style de la barre de titre de la fenêtre. La valeur par défaut est `par défaut`. Les valeurs possibles sont : 
    * `default` - Résultats dans la barre de titre standard de Mac opaque gris.
    * `Caché` - Résultats dans une barre de titre cachée et une fenêtre de contenu en pleine taille, encore la barre de titre a toujours les contrôles standards de la fenêtre ("feux de circulation") dans en haut à gauche.
    * `hiddenInset` - Résultats dans une barre de titre cachée avec un look alternatif où les boutons du feu de circulation sont légèrement plus insérables à partir du bord de la fenêtre.
    * `customButtonsOnHover` Boolean (facultatif) - Dessine une fermeture personnalisée, et minimise les boutons sur les fenêtres sans cadre macOS. Ces boutons n'afficheront pas à moins d'être survolés en haut à gauche de la fenêtre. Ces boutons personnalisés empêchent les problèmes liés aux événements de la souris qui se produisent avec les boutons standard de la barre d'outils de la fenêtre. **Note:** Cette option est actuellement expérimentale.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`
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
    * `sandbox` Booléen (facultatif) - Si défini, le moteur de rendu associé à la fenêtre, la rendre compatible avec le bac à sable Chromium au niveau du système d'exploitation et la désactivation du nœud. s moteur. Ce n'est pas la même chose que l'option `nodeIntegration` et les API disponibles pour le script de préchargement sont plus limitées. En savoir plus sur l'option [ici](sandbox-option.md).
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
    * `Offscreen` Boolean (facultatif) - Activer le rendu hors écran pour la fenêtre du navigateur. Par défaut, `faux`. Voir le [tutoriel de rendu hors écran](../tutorial/offscreen-rendering.md) pour plus de détails.
    * `contextIsolation` Boolean (facultatif) - Exécuter les API Electron et le script `preload` spécifié dans un contexte JavaScript séparé. Par défaut, est `faux`. Le contexte dans lequel le script `preload` s'exécute va toujours avoir un accès complet aux `document` et `window` globales mais il utilisera son propre jeu de builtins JavaScript (`Tableau`, `Objet`, `JSON`, etc. et sera isolé de toute modification apportée à l'environnement global par la page chargée. L'API Electron ne sera disponible que dans le script `preload` et non dans la page chargée. Cette option devrait être utilisée lorsque chargeant du contenu distant potentiellement non fiable pour s'assurer que le contenu chargé ne peut pas altérer avec le script `preload` et toutes les API Electron en cours d'utilisation. Cette option utilise la même technique utilisée par [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Vous pouvez accéder à ce contexte dans les outils de développement en sélectionnant l'entrée « Contexte isolé d'Electron » dans la liste déroulante en haut de l'onglet Console.
    * `nativeWindowOpen` Boolean (facultatif) - Utiliser natif `window.open()`. Par défaut, `faux`. Les fenêtres enfants auront toujours l'intégration du nœud désactivée sauf si `nodeIntegrationInSubFrames` est vrai. **Note:** Cette option est actuellement expérimentale.
    * `webviewTag` Boolean (facultatif) - Activer la balise [`< webview>`](webview-tag.md). Par défaut, `faux`. **Remarque :** Le script `preload` configuré pour le `< webview>` aura une intégration de nœuds activée lorsqu'il est exécuté, donc vous devez vous assurer que le contenu distant/non fiable n'est pas en mesure de créer une balise `<webview>` avec un préchargement de `potentiellement malveillant` script. Vous pouvez utiliser l'événement `will-attach-webview` sur [webContents](web-contents.md) pour supprimer le script `preload` et valider ou modifier les paramètres initiaux de `< webview>`.
    * `additionalArguments` String[] (facultatif) - Une liste de chaînes qui seront ajoutées au processus `. rgv` dans le processus renderer de cette application. Utile pour passer de petites bits de données vers le bas pour le processus de rendu des scripts de préchargement.
    * `safeDialogs` Booléen (facultatif) - Activer ou non la protection consécutive des dialogues du style du navigateur . La valeur par défaut est `false`.
    * `safeDialogsMessage` String (facultatif) - Le message à afficher lorsque la protection consécutive des dialogues est déclenchée. Si non défini, le message par défaut serait utilisé, notez que le message par défaut est actuellement en anglais et non localisé.
    * `navigateOnDragDrop` Booléen (facultatif) - Si glisser-déposer un fichier ou un lien sur la page provoque une navigation. La valeur par défaut est `false`.
    * `autoplayPolicy` String (facultatif) - La politique de lecture automatique à appliquer au contenu dans la fenêtre, peut être `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Par défaut, `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (facultatif) - S'il faut empêcher la fenêtre de redimensionner lorsque vous entrez dans le Fullscreen HTML. Par défaut est `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Default is `false`.

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

Veuillez noter que l'utilisation de cet événement implique que le moteur de rendu sera considéré comme "visible" et peinture, même si `show` est faux. Cet événement ne se déclenchera jamais si vous utilisez `paintWhenInitiallyHidden: false`

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
* `newBounds` [Rectangle](structures/rectangle.md) - Taille de la fenêtre en cours de redimensionnage.

Émis avant que la fenêtre ne soit redimensionnée. Appeler `event.preventDefault()` empêchera la fenêtre d'être redimensionnée.

Notez que ceci n'est émis que lorsque la fenêtre est redimensionnée manuellement. Redimensionner la fenêtre avec `setBounds`/`setSize` n'émettra pas cet événement.

#### Événement : 'resize'

Émis après que la fenêtre soit redimensionnée.

#### Event: 'will-move' *macOS* *Windows*

Retourne :

* `event` Événement
* `newBounds` [Rectangle](structures/rectangle.md) - Emplacement où la fenêtre est en cours de déplacement.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Notez que ceci n'est émis que lorsque la fenêtre est redimensionnée manuellement. Redimensionner la fenêtre avec `setBounds`/`setSize` n'émettra pas cet événement.

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

#### Événement : 'always-on-top-changed'

Retourne :

* `event` Événement
* `isAlwaysOnTop` Boolean

Émis lorsque la fenêtre est définie ou non définie pour toujours afficher au dessus des autres fenêtres.

#### Événement : 'app-command' *Windows* *Linux*

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

Les commandes d'application suivantes sont explicitement prises en charge sur Linux :

* `retour en arrière du navigateur`
* `navigateur-transfert`

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

Émis sur un balayage à 3 doigts. Les directions possibles sont `up`, `droite`, `down`, `left`.

#### Événement : 'rotate-gesture' *macOS*

Retourne :

* `event` Événement
* `rotation` Float

Émis lors du mouvement de rotation du trackpad. Émission continue jusqu'à la fin du geste de rotation. La valeur `rotation` sur chaque émission est l'angle en degrés tourné depuis la dernière émission. Le dernier événement émis lors d'un geste de rotation sera toujours de la valeur `0`. Les valeurs de rotation dans le sens inverse des aiguilles d'une montre sont positives, tandis que les valeurs dans le sens horaire sont négatives.

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

Returns `BrowserWindow | null` - The window that owns the given `webContents` or `null` if the contents are not owned by a window.

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

Une propriété `Boolean` qui détermine si la fenêtre est exclue du menu Windows de l’application. `false` par défaut.

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

#### `win.accessibleTitle`

A `String` property that defines an alternative title provided only to accessibility tools such as screen readers. This string is not directly visible to users.

### Méthodes d’instance

Les objets créés avec `nouveau BrowserWindow` ont les méthodes d'instance suivantes :

**Remarque :** Certaines méthodes sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### `win.destroy()`

Forcer la fermeture de la fenêtre, les `unload` et `beforeunload` événement ne seront pas émises pour la page web, et l'évènement `close` ne sera pas non plus émise pour cette fenêtre, mais il garantit que l'événement `closed` sera émis.

#### `win.close()`

Essayez de fermer la fenêtre. Cela a le même effet qu'un utilisateur en cliquant manuellement sur le bouton de fermeture de la fenêtre. La page web peut cependant annuler la fermeture. Voir l'événement [fermer](#event-close).

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

* `aspectRatio` Float - L'aspect ratio à maintenir pour une partie de la vue de contenu .
* `extraSize` [Size](structures/size.md) (facultatif) - La taille supplémentaire à ne pas inclure tout en maintenant le rapport d'aspect.

Cela fera que la fenêtre maintient un ratio d'aspect. La taille supplémentaire permet à un développeur d'avoir de l'espace, spécifié en pixels, non inclus dans les calculs de ratio de l'aspect. Cette API prend déjà en compte la différence entre la taille d'une fenêtre et sa taille de contenu.

Considérez une fenêtre normale avec un lecteur vidéo HD et des commandes associées. Il y a peut-être 15 pixels de contrôles sur le bord gauche, 25 pixels de contrôles sur le bord droit et 50 pixels de contrôles sous le joueur. Afin de maintenir un ratio d'aspect 16:9 (ratio d'aspect standard pour HD @1920x1080) dans le joueur lui-même, nous appellerions cette fonction avec des arguments de 16/9 et [ 40, 50 ]. Le deuxième argument ne se soucie pas du fait que la largeur et la hauteur supplémentaires sont dans la vue de contenu --seulement qu'elles existent. Sommez toute la largeur supplémentaire et les zones de hauteur que vous avez dans la vue de contenu globale.

Appeler cette fonction avec une valeur de `0` supprimera tous les ratios d'aspect précédemment définis.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Couleur d'arrière-plan de la fenêtre sous la forme d'une valeur hexadécimale, comme `#66CD00` ou `#FFF` ou `#80FFFFFF` (l'alpha est supporté si `transparent` est `true`). La valeur par défaut est `#FFF` (white).

Définit la couleur de fond de la fenêtre. Voir [Réglage `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - Le chemin absolu vers le fichier à prévisualiser avec QuickLook. Ceci est important car Quick Look utilise le nom de fichier et l'extension de fichier sur le chemin pour déterminer le type de contenu du fichier à ouvrir.
* `displayName` String (facultatif) - Le nom du fichier à afficher dans la vue modale de Quick Look . Ceci est purement visuel et n'affecte pas le type de contenu du fichier. Par défaut, `chemin`.

Utilise [Aperçu rapide](https://en.wikipedia.org/wiki/Quick_Look) pour prévisualiser un fichier à un chemin donné.

#### `win.closeFilePreview()` *macOS*

Ferme le panneau [Aperçu rapide](https://en.wikipedia.org/wiki/Quick_Look) actuellement ouvert.

#### `win.setBounds(bounds[, animate])`

* `limites` Partiel<unk> Rectangle</a>>
* `animate` Boolean (facultatif) *macOS*

Redimensionne et déplace la fenêtre vers les limites fournies. Toutes les propriétés qui ne sont pas fournies seront par défaut à leurs valeurs courantes.

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
* `animate` Boolean (facultatif) *macOS*

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

Retourne Boolean - si la fenêtre est activée.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) *macOS*

Redimensionne la fenêtre à `largeur` et `hauteur`. Si `largeur` ou `hauteur` sont inférieures à toutes les contraintes de taille minimale définies, la fenêtre s'accroche à sa taille minimale.

#### `win.getSize()`

Retourne `Integer[]` - Contient la largeur et la hauteur de la fenêtre.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (facultatif) *macOS*

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

**[Déprécié ](modernization/property-updates.md)**

#### `win.isResizable()`

Retourne `Boolean` - Si la fenêtre peut être redimensionnée manuellement par l'utilisateur.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Définit si la fenêtre peut être déplacée par l’utilisateur. Sous Linux, cela ne fait rien.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isMovable()` *macOS* *Windows*

Retourne `Boolean` - Si la fenêtre peut être déplacée par l'utilisateur.

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

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

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

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Retourne `Buffer` - Le gestionnaire spécifique à la plate-forme de la fenêtre.

Le type natif du handle est `HWND` sous Windows, `NSView*` sur macOS, et `Window` (`long`non signé</0>) sous Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Un message s'accroche à une fenêtre. Le `callback` est appelé lorsque le message est reçu dans le WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Retourne `Boolean` - `true` ou `false` selon que le message est accroché.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Débranchez le message de la fenêtre.

#### `win.unhookAllWindowMessages()` *Windows*

Décroche tous les messages de la fenêtre.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Définit le chemin d'accès du fichier que la fenêtre représente, et l'icône du fichier s'affichera dans la barre de titre de la fenêtre.

#### `win.getRepresentedFilename()` *macOS*

Retourne `String` - Le chemin du fichier que la fenêtre représente.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Spécifie si le document de la fenêtre a été modifié, et l'icône dans la barre de titre deviendra grise lorsque réglé sur `true`.

#### `win.isDocumentEdited()` *macOS*

Retourne `Boolean` - Si le document de la fenêtre a été modifié.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (facultatif) - Les limites à capturer

Retourne `Promise<NativeImage>` - résout avec une [NativeImage](native-image.md)

Capturer une capture instantanée de la page dans `rect`. L'omission de `rect` capturera toute la page visible.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (facultatif) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (facultatif) - Une URL de référence HTTP.
  * `userAgent` String (optionnel) - Un agent utilisateur d'où provient la requête.
  * `extraHeaders` String (optionnel) - Headers supplémentaires séparés par "\n"
  * `données postales` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (facultatif)
  * `baseURLForDataURL` String (facultatif) - URL de base (avec séparateur de chemin de pointe) pour que les fichiers soient chargés par l'URL de données. Ceci n'est nécessaire que si l'`url` spécifiée est une URL de données et a besoin de charger d'autres fichiers.

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
* `options` Object (facultatif) 
  * `query` Enregistrement<String, String> (facultatif) - Passé à `url.format()`.
  * `search` String (facultatif) - Passé à `url.format()`.
  * `hash` String (facultatif) - Passé à `url.format()`.

Retourne `Promise<void>` - la promesse se résoudra lorsque la page aura terminé le chargement (voir [`did-finish-load`](web-contents.md#event-did-finish-load)), et rejette si la page ne parvient pas à se charger (voir [`did-fail-load`](web-contents.md#event-did-fail-load)).

Identique à `webContents.loadFile`, `filePath` devrait être un chemin vers un fichier HTML relatif à la racine de votre application. Voir la documentation `webContents` pour plus d'informations.

#### `win.reload()`

Identique à `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Définit le `menu` comme barre de menu de la fenêtre.

#### `win.removeMenu()` *Linux* *Windows*

Retirez la barre de menu de la fenêtre.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (facultatif) 
  * `mode` Chaîne *Windows* - Mode pour la barre de progression. Peut être `aucun`, `normal`, `indéterminé`, `erreur` ou `paused`.

Définit la valeur de progression dans la barre de progression. La plage valide est [0, 1.0].

Supprimer la barre de progression lorsque la progression < 0 ; Passer en mode indéterminé lorsque la progression > 1.

Sur la plate-forme Linux, ne prend en charge que l'environnement de bureau Unity, vous devez spécifier le nom du fichier `*.desktop` au champ `desktopName` dans `package.json`. Par défaut, il assumera `{app.name}.desktop`.

Sous Windows, un mode peut être passé. Les valeurs acceptées sont `none`, `normal`, `indeterminate`, `erreur`, et `paused`. Si vous appelez `setProgressBar` sans mode défini (mais avec une valeur dans la plage valide), `normal` sera utilisé.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - l'icône à afficher en bas à droite de l'icône de la barre des tâches. Si ce paramètre est `null`, l'overlay est effacé
* `description` Chaîne - une description qui sera fournie aux lecteurs d'écran d'accessibilité

Définit une superposition de 16 x 16 pixels sur l'icône actuelle de la barre des tâches, généralement utilisé pour transmettre une sorte de statut d'application ou pour notifier passivement l'utilisateur.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Définit si la fenêtre doit avoir une ombre.

#### `win.hasShadow()`

Retourne `Boolean` - Si la fenêtre a une ombre.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacité` Nombre - entre 0.0 (entièrement transparent) et 1.0 (entièrement opaque)

Définit l'opacité de la fenêtre. Sous Linux, ne fait rien. Les valeurs du nombre lié sont enserrées dans l'intervalle [0, 1] .

#### `win.getOpacity()`

Retourne `Number` - entre 0.0 (entièrement transparent) et 1.0 (entièrement opaque). Sur Linux, retourne toujours 1.

#### `win.setShape(rects)` *Windows* *Linux* *Experimental*

* `rects` [Rectangle[]](structures/rectangle.md) - Définit une forme sur la fenêtre. Passer une liste vide revient à la fenêtre à être rectangulaire.

Définir une forme de fenêtre détermine la zone dans la fenêtre où le système permet de dessiner et d'interagir avec l'utilisateur. En dehors de la région donnée, aucun pixel ne sera dessiné et aucun événement de souris ne sera enregistré. Les événements de souris en dehors de la région ne seront pas reçus par cette fenêtre, mais passeront à tout ce qui se trouve derrière la fenêtre.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Retourne `Boolean` - Si les boutons ont été ajoutés avec succès

Ajouter une barre d'outils miniature avec un ensemble de boutons spécifié à l'image de miniature d'une fenêtre dans la disposition d'un bouton de la barre des tâches. Renvoie un objet `Booléen` indique si la vignette a été ajoutée avec succès.

Le nombre de boutons dans la barre d'outils miniature ne doit pas dépasser 7 en raison de la salle limitée. Une fois que vous avez configuré la barre d'outils miniature, la barre d'outils ne peut pas être retirée en raison de la limitation de la plateforme. Mais vous pouvez appeler l'API avec un tableau vide pour nettoyer les boutons.

Le `boutons` est un tableau d'objets `Bouton` :

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

Définit la région de la fenêtre à afficher comme image de miniature affichée lorsque survole la fenêtre dans la barre des tâches. Vous pouvez réinitialiser la miniature en toute la fenêtre en spécifiant une région vide : `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Définit l'infobulle qui s'affiche en survolant la vignette de la fenêtre dans la barre des tâches.

#### `win.setAppDetails(options)` *Windows*

* `options` Objet 
  * `appId` String (facultatif) - Fenêtre [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Elle doit être définie, sinon les autres options n'auront aucun effet.
  * `appIconPath` String (facultatif) - Fenêtre [Icône de relance](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (facultatif) - Index de l'icône dans `appIconPath`. Ignoré lorsque `appIconPath` n'est pas défini. La valeur par défaut est `0`.
  * `relaunchCommand` String (facultatif) - La [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx)de Windows.
  * `relaunchDisplayName` String (facultatif) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Définit les propriétés du bouton de la barre des tâches de la fenêtre.

**Remarque :** `relaunchCommand` et `relaunchDisplayName` doivent toujours être définis ensemble. Si l'une de ces propriétés n'est pas définie, alors aucun ne sera utilisé.

#### `win.showDefinitionForSelection()` *macOS*

Identique à `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md) | Chaîne

Change l'icône de la fenêtre.

#### `win.setWindowButtonVisibility(visible)` *macOS*

* `visible` Boolean

Définit si les boutons du feu de la fenêtre doivent être visibles.

Cela ne peut pas être appelé lorsque `titleBarStyle` est défini à `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Définit si la barre de menu de la fenêtre doit se cacher automatiquement. Une fois activée, la barre de menu ne s'affichera que lorsque les utilisateurs appuient sur la seule touche `Alt`.

Si la barre de menu est déjà visible, appeler `setAutoHideMenuBar(true)` ne le fera pas le cacher immédiatement.

**[Déprécié ](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Retourne `Boolean` - Si la barre de menu se cache automatiquement.

**[Déprécié ](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Définit si la barre de menu doit être visible. Si la barre de menu est masquée automatiquement, les utilisateurs peuvent toujours afficher la barre de menu en appuyant sur la seule touche `Alt`.

#### `win.isMenuBarVisible()`

Retourne `Boolean` - Si la barre de menu est visible.

#### `win.setVisibleOnWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (facultatif) 
  * `visibleOnFullScreen` Boolean (optional) *macOS* - Sets whether the window should be visible above fullscreen windows *deprecated*

Définit si la fenêtre doit être visible sur tous les espaces de travail.

**Remarque :** Cette API ne fonctionne pas sous Windows.

#### `win.isVisibleOnAllWorkspaces()`

Retourne `Boolean` - Si la fenêtre est visible sur tous les espaces de travail.

**Remarque **: Cette API retourne toujours false sur Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (facultatif) 
  * `Avancer` Boolean (facultatif) *macOS* *Windows* - Si vrai, transférez la souris messages vers Chromium, en activant les événements liés à la souris tels que `souris`. Utilisé uniquement lorsque `ignore` est vrai. Si `ignore` est faux, le transfert est toujours désactivé quelle que soit cette valeur.

Fait que la fenêtre ignore tous les événements de la souris.

Tous les événements survenus dans cette fenêtre seront passés à la fenêtre ci-dessous cette fenêtre, mais si cette fenêtre a le focus, elle recevra toujours les événements du clavier .

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Empêche le contenu de la fenêtre d'être capturé par d'autres applications.

Sur macOS, il définit le type de partage NSWindows à NSWindowSharingNone. Sur Windows, il appelle SetWindowDisplayAffinity avec `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *macOS* *Windows*

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

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Contrôle s'il faut masquer le curseur lors de la saisie.

#### `win.selectPreviousTab()` *macOS*

Sélectionne l'onglet précédent lorsque les onglets natifs sont activés et il y a d'autres onglets dans la fenêtre.

#### `win.selectNextTab()` *macOS*

Sélectionne l'onglet suivant lorsque les onglets natifs sont activés et il y a d'autres onglets dans la fenêtre.

#### `win.mergeAllWindows()` *macOS*

Fusionne toutes les fenêtres dans une seule fenêtre avec plusieurs onglets lorsque les onglets natifs sont activés et qu'il y a plus d'une fenêtre ouverte.

#### `win.moveTabToNewWindow()` *macOS*

Déplace l'onglet actuel dans une nouvelle fenêtre si les onglets natifs sont activés et il y a plus d'un onglet dans la fenêtre actuelle.

#### `win.toggleTabBar()` *macOS*

Active/désactive la visibilité de la barre d’onglets si les onglets natifs sont activés et il n’y a qu’un seul onglet dans la fenêtre actuelle.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Ajoute une fenêtre sous la forme d'un onglet sur cette fenêtre, après l'onglet de l'instance de fenêtre.

#### `win.setVibrancy(type)` *macOS*

* `type` String | null - Peut être `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `sous-window`, ou `sous-page`. Voir la documentation [macOS](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) pour plus de détails.

Ajoute un effet de vibrance à la fenêtre du navigateur. Passer `null` ou une chaîne vide supprimera l'effet de vibrance sur la fenêtre.

Notez que `appearance-based`, `light`, `dark`, `medium-light`, et `ultra-dark` ont été obsolètes et seront supprimées dans une prochaine version de macOS.

#### `win.setTrafficLightPosition(position)` *macOS*

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.getTrafficLightPosition()` *macOS*

Returns `Point` - The current position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar | null

Définit la disposition de la barre tactile pour la fenêtre actuelle. La spécification `null` ou `undefined` efface la barre de contact. Cette méthode n'a d'effet que si la machine a une barre tactile et est en cours d'exécution sur macOS 10.12.1+.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

#### `win.getBrowserView()` *Expérimental*

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

#### `win.addBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

Remplacement de l'API pour setBrowserView prenant en charge le travail avec des vues multi navigateurs.

#### `win.removeBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *Expérimental*

Retourne `BrowserView[]` - un tableau de toutes les BrowserViews qui ont été attachées avec `addBrowserView` ou `setBrowserView`.

**Remarque :** L’API BrowserView est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.