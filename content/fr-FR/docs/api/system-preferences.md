# systemPreferences

> Récuperer les préférences système.

Processus : [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Événements

L'objet `systemPreferences` émet les événements suivants :

### Événement : 'accent-color-changed' _Windows_

Retourne :

* `event` Événement
* `newColor` String - La nouvelle couleur RGBA que l'utilisateur à assigné à son système.

### Événement : 'color-changed' _Windows_

Retourne :

* `event` Événement

### Événement : 'inverted-color-scheme-changed' _Windows_ _Deprecated_

Retourne :

* `event` Événement
* `invertedColorScheme` Boolean - `true` si un schéma de couleur inversé (un schéma de couleur à contraste élevé avec le texte clair et les fonds sombres) est utilisé, `faux` sinon.

**Déprécié :** Doit utiliser le nouvel événement [`mis à jour`](native-theme.md#event-updated) sur le module `nativeTheme`.

### Événement : 'high-contrast-color-scheme-changed' _Windows_ _Deprecated_

Retourne :

* `event` Événement
* `highContrastColorScheme` Boolean - `true` si un thème à contraste élevé est utilisé, `false` sinon.

**Déprécié :** Doit utiliser le nouvel événement [`mis à jour`](native-theme.md#event-updated) sur le module `nativeTheme`.

## Méthodes

### `systemPreferences.isDarkMode()` _macOS_ _Windows_ _obsolète_

Retourne `Boolean` - Si le système est en mode sombre.

**Déprécié :** Doit utiliser le nouveau [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

Retourne `Boolean` - Si l'option Swipe entre les pages est activé.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _macOS_

* `event` String
* Enregistrement `userInfo`<String, any>
* `deliverImmédiately` Booléen (facultatif) - `true` pour publier des notifications immédiatement même lorsque l'application d'abonnement est inactive.

Messages `event` comme notifications natives de macOS. Le `userInfo` est un objet qui contient le dictionnaire d’informations utilisateur envoyé avec la notification.

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` String
* Enregistrement `userInfo`<String, any>

Messages `event` comme notifications natives de macOS. Le `userInfo` est un objet qui contient le dictionnaire d’informations utilisateur envoyé avec la notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` String
* Enregistrement `userInfo`<String, any>

Messages `event` comme notifications natives de macOS. Le `userInfo` est un objet qui contient le dictionnaire d’informations utilisateur envoyé avec la notification.

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * Enregistrement `userInfo`<String, unknown>
  * Chaîne `objet`

Retourne `Nombre` - L'ID de cet abonnement

S'abonne aux notifications natives de macOS, `callback` sera appelé avec `callback(event, userInfo)` lorsque le `event` correspondant se produit. `userInfo` est un objet qui contient le dictionnaire d'information utilisateur envoyé avec la notification. L'objet `object` est l'expéditeur de la notification, et ne supporte que les valeurs `NSString` pour le moment.

Le `id` de l'abonné est retourné, qui peut être utilisé pour désabonner le `événement`.

Sous le capot, cette API s'abonne à `NSDistributedNotificationCenter`, Les valeurs d'exemple de `event` sont :

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * Enregistrement `userInfo`<String, unknown>
  * Chaîne `objet`

Retourne `Nombre` - L'ID de cet abonnement

Identique à `subscribeNotification`, mais utilise `NSNotificationCenter` pour les défauts locaux. Ceci est nécessaire pour des événements tels que `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * Enregistrement `userInfo`<String, unknown>
  * Chaîne `objet`

Identique à `subscribeNotification`, mais utilise `NSWorkspace.sharedWorkspace.notificationCenter`. Ceci est nécessaire pour des événements tels que `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

Supprime l'abonnement avec `l'id`.

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

Identique à `unsubscribeNotification`, mais supprime l'abonné de `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

Identique à `unsubscribeNotification`, mais supprime l'abonné de `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `Par défaut` Enregistrement<String, String | Boolean | Number> - un dictionnaire de (`clé: valeur`) par défaut de l'utilisateur

Ajoute les valeurs par défaut à `NSUserDefaults`de votre application.

### `systemPreferences.getUserDefault(key, type)` _macOS_

* `key` String
* `type` String - Peut être `chaîne`, `booléen`, `integer`, `float`, `double`, `url`, `array` ou `dictionnaire`.

Retourne `any` - La valeur de `clé` dans `NSUserDefaults`.

Certaines `clé` populaires et `type`s sont:

* `AppleInterfaceStyle`: `chaîne`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `chaîne`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `tableau`
* `NSPreferredWebServices`: `dictionnaire`
* `NSUserDictionaryReplacementItems`: `tableau`

### `systemPreferences.setUserDefault(key, type, value)` _macOS_

* `key` String
* `type` String - Peut être `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` ou `dictionary`.
* `value` String

Définit la valeur de `clé` dans `NSUserDefaults`.

Notez que `type` doit correspondre au type réel de `value`. Une exception est jetée s’ils ne le font pas.

Certaines `clé` populaires et `type`s sont:

* `ApplePressAndHoldEnabled` : `booléen`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Enlève le `key` dans `NSUserDefaults`. Cela peut être utilisé pour restaurer la valeur par défaut d’un `key` précédemment défini avec `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

Retourne `Boolean` - `true` si la [composition DWM ][dwm-composition] (Aero Glass) est activée, et `false` sinon.

Un exemple d'utilisation pour déterminer si vous devez créer une fenêtre transparente ou non (les fenêtres transparentes ne fonctionneront pas correctement lorsque la composition DWM est désactivée) :

```javascript
const { BrowserWindow, systemPreferences } = require ('electron')
const browserOptions = { width: 1000, height: 800 }

// Rendre la fenêtre transparente uniquement si la plate-forme la prend en charge.
si (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Créer la fenêtre.
const win = nouveau BrowserWindow (browserOptions)

// Naviguer.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // Pas de transparence, donc nous chargeons un repli qui utilise des styles de base.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` _Windows_ _macOS_

Retourne `String` - Les utilisateurs du système actuel de préférence de couleur d'accentuation large en RGBA forme hexadécimale.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

Cette API n'est disponible que sur macOS 10.14 Mojave ou plus récent.

### `systemPreferences.getColor(color)` _Windows_ _macOS_

* `color` String - L’une des valeurs suivantes:
  * Sur **Windows**:
    * `3d-dark-shadow` - Ombre noir pour les éléments affichés en trois dimensions.
    * `3d-face` - Couleur de la face pour les éléments affichés en trois dimensions et le fond des boîtes de dialogue.
    * `3d-hihlight` - Couleur de surlignage pour les éléments affichés en trois dimensions.
    * `3d-light` - Couleur de la lumière pour les éléments affichés en trois dimensions.
    * `3d-shadow` - Couleur d'ombre pour les éléments affichés en trois dimensions.
    * `active-border` - Bordure de la fenêtre active.
    * `active-caption` - Barre active de titre de fenêtre. Spécifie la couleur du côté gauche le gradient de couleur de la barre de titre d’une fenêtre active si l’effet de gradient activé.
    * `active-caption-gradient` - Couleur du côté droit du dégradé de couleur de la barre de titre de la fenêtre active.
    * `app-workspace` - Couleur de fond d'une interface d'application de document multiple (MDI).
    * `button-text` - Texte sur les boutons d'envoi.
    * `caption-text` - Texte dans une légende, boîte de dimensions, boîte avec la flèche pour la barre de défilement.
    * `desktop` - Couleur de fond du bureau.
    * `disabled-text` - Texte grisé (désactivé).
    * `highlight` - Élément(s) sélectionné(s) dans un groupe.
    * `highlight-text` - Texte des éléments sélectionnés dans un contrôle.
    * `hotlight` - Couleur pour un lien hypertexte ou un élément à suivre.
    * `inactive-border` - Bordure de fenêtre inactive.
    * `inactive-caption` - Légende de la fenêtre inactive. Spécifie la couleur du côté gauche dans le gradient de couleur de la barre de titre d’une fenêtre inactive si le gradient effet est activé.
    * `inactive-caption-gradient` - Couleur du côté droit dans le gradient de couleur d'une barre de titre de la fenêtre inactive.
    * `inactive-caption-text` - Couleur du texte dans une légende inactive.
    * `info-background` - Couleur d’arrière-plan pour les commandes tooltip.
    * `info-text` - Couleur de texte pour les commandes tooltip.
    * `menu` - Fond de menu.
    * `menu-highlight` - La couleur utilisée pour mettre en évidence les éléments du menu lorsque le menu apparaît comme un menu plat.
    * `menubar` - La couleur de fond de la barre de menu lorsque les menus apparaissent sous la forme de menus plats.
    * `menu-text` - Texte dans les menus.
    * `scrollbar` - Zone grise de la barre de défilement.
    * `window` - Fond de la fenêtre.
    * `window-frame` - Cadre de fenêtres.
    * `window-text` - Texte dans windows.
  * Sur **macOS**
    * `alternate-selected-control-text` - Le texte sur une surface sélectionnée dans une liste ou un tableau. _dépréciés_
    * `control-background` - L'arrière-plan d'un élément de grande interface, tel qu'un navigateur ou un tableau.
    * `control` - La surface d'un contrôle.
    * `control-text` -Le texte d'un contrôle qui n'est pas désactivé.
    * `disabled-control-text` - Le texte d'un contrôle qui est désactivé.
    * `find-highlight` - La couleur d'un indicateur de recherche.
    * `grille` - Les lignes de grilles d'un élément d'interface comme une table.
    * `header-text` - Le texte d'une cellule d'en-tête dans un tableau.
    * `surlignement` - La source de lumière virtuelle à l'écran.
    * `keyboard-focus-indicator` - L'anneau qui apparaît autour du contrôle actuellement focalisé lors de l'utilisation du clavier pour la navigation de l'interface.
    * `label` - Le texte d'une étiquette contenant le contenu principal.
    * `lien` - Un lien vers un autre contenu.
    * `placeholder-text` - Une chaîne de caractères dans une vue de contrôle ou de texte.
    * `quaternary-label` - Le texte d'une étiquette de moindre importance qu'une étiquette tertiaire telle que le texte du filigrane.
    * `scrubber-textured-background` - L'arrière-plan d'un scrubber dans la barre tactile.
    * `étiquette secondaire` - Le texte d'une étiquette de moindre importance qu'une étiquette normale telle qu'une étiquette utilisée pour représenter une sous-rubrique ou des informations complémentaires.
    * `selected-content-background` - L'arrière-plan du contenu sélectionné dans une fenêtre ou une vue clé.
    * `selected-control` - La surface d'une commande sélectionnée.
    * `selected-control-text` - Le texte d'une commande sélectionnée.
    * `selected-menu-item-text` - Le texte d’un menu sélectionné.
    * `selected-text-background` - L'arrière-plan du texte sélectionné.
    * `texte sélectionné` - Texte sélectionné.
    * `Séparateur` - Un séparateur entre différentes sections de contenu.
    * `shadow` - L'ombre virtuelle projetée par un objet levé à l'écran.
    * `étiquette-tertiaire` - Le texte d'une étiquette de moindre importance qu'une étiquette secondaire telle qu'une étiquette utilisée pour représenter le texte désactivé.
    * `text-background` - Fond d'écran du texte.
    * `text` - Le texte dans un document.
    * `sous-page-background` - L'arrière-plan derrière le contenu d'un document.
    * `unemphaszed-selected-content-background` - Le contenu sélectionné dans une fenêtre ou une vue non-clé.
    * `unemphaszed-selected-text-background` - Un fond pour le texte sélectionné dans une fenêtre ou une vue non-clé.
    * `unemphaszed-selected-text` - Texte sélectionné dans une fenêtre ou une vue non-clé.
    * `window-background` - L'arrière-plan d'une fenêtre.
    * `window-frame-text` - Le texte dans la barre de titre de la fenêtre.

Retourne `String` - Le paramètre de couleur système sous forme hexadécimale RVB (`#ABCDEF`). Consultez les [documents Windows et][windows-colors] documents macOS [pour plus][macos-colors] plus de détails.

Les couleurs suivantes ne sont disponibles que sur macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, et `unemphasized-selected-text`.

### `systemPreferences.getSystemColor(color)` _macOS_

* `color` String - L’une des valeurs suivantes:
  * `bleu`
  * `marron`
  * `gris`
  * `vert`
  * `orange`
  * `rose`
  * `violet`
  * `Rouge`
  * `Jaune`

Retourne `String` - La couleur standard du système formaté comme `#RRGGBBAA`.

Renvoie l’une des différentes couleurs standard du système qui s’adaptent automatiquement au dynamisme et aux changements dans les paramètres d’accessibilité comme « Augmenter le contraste » et « Réduire la transparence ». Consultez [documentation Apple pour](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) plus de détails.

### `systemPreferences.isInvertedColorScheme()` _Windows_ _deprecated_

Retourne `Boolean` - `true` si un schéma de couleurs inversées (un schéma de couleurs à contraste élevé avec texte clair et fond sombre) est actif, `false` autrement.

**déprécié :** utiliser la nouvelle [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _deprecated_

Retours `Boolean` - `true` si un thème à fort contraste est actif, `false` autrement.

**déprécié :** utiliser la nouvelle [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` _macOS_

Retours `String` - Peut être `dark`, `light` ou `unknown`.

Obtient le paramètre d’apparence macOS qui est actuellement appliqué à votre application, cartes à [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` _macOS_ _deprecated_

Retours `String` | `null` - Peut être `dark`, `light` ou `unknown`.

Obtient le paramètre d’apparence macOS que vous avez déclaré que vous voulez pour votre application, des cartes pour [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Vous pouvez utiliser l' `setAppLevelAppearance` API pour définir cette valeur.

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _deprecated_

* `appearance` String | nul - Peut être `dark` ou `light`

Définit le paramètre d’apparence de votre application, cela devrait l’emporter sur le par défaut du système et l’emporter sur la valeur `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` _macOS_

Retourne `Boolean` - si oui ou non cet appareil a la possibilité d’utiliser Touch ID.

**NOTE :** cette API retournera sur `false` systèmes macOS plus anciens que Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` String - La raison pour laquelle vous demandez l’authentification Touch ID

Retourne `Promise<void>` - se résout si l’utilisateur a réussi à authentifier avec Touch ID.

```javascript
const { systemPreferences } = require ('electron')

systemPreferences.promptTouchID ('Pour obtenir le consentement pour une chose fermée par la sécurité').alors (succès => { console
  .log ('Vous avez authentifié avec succès avec Touch ID!')
}).catch (erreur => {
  console.log (erreur)
})
```

Cette API elle-même ne protégera pas vos données utilisateur; il s’agit plutôt d’un mécanisme qui vous permet de le faire. Les applications natives devront définir [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) comme [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) sur leur entrée de porte-clés afin qu’elle soit automatiquement prompte au consentement biométrique touch ID. Cela pourrait être fait avec [`node-keytar`](https://github.com/atom/node-keytar), de sorte que l’on stockerait une clé de cryptage avec `node-keytar` et ne l’aller chercher si `promptTouchID()` résout.

**NOTE :** cette API retournera une promesse rejetée sur les systèmes macOS plus anciens que Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - si oui ou non l’utilisateur sera informé par prompt si le processus actuel n’est pas digne de confiance.

Retours `Boolean` - `true` le processus actuel est un client d’accessibilité de confiance et `false` 'il n’est pas.

### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` String - Peut être `microphone`, `camera` ou `screen`.

Retours `String` - Peut être `not-determined`, `granted`, `denied`, `restricted` ou `unknown`.

Ce consentement de l’utilisateur n’était pas requis sur macOS 10.13 High Sierra ou inférieur de sorte que cette méthode sera toujours de retour `granted`. macOS 10.14 Mojave ou plus nécessite le consentement de `microphone` et `camera` accès. macOS 10.15 Catalina ou plus nécessite le consentement de `screen` accès.

Windows 10 dispose d’un paramètre global contrôlant `microphone` et `camera` 'accès pour toutes les applications win32. Il sera toujours de retour `granted` pour `screen` et pour tous les types de médias sur les anciennes versions de Windows.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - le type de médias demandé; peut être `microphone`, `camera`.

Retours `Promise<Boolean>` - Une promesse qui se résout avec `true` si le consentement a été accordé et `false` s’il a été refusé. Si un `mediaType` invalide est adopté, la promesse sera rejetée. Si une demande d’accès a été refusée et est modifiée ultérieurement par le biais du volet Préférences système, un redémarrage de l’application sera nécessaire pour que les nouvelles autorisations prennent effet. Si l’accès a déjà été demandé et refusé, _doit_ être modifié par la vitre de préférence; une alerte n’apparaîtra pas et la promesse se résoudra avec l’état d’accès existant.

**important :** afin de tirer correctement parti de cette API, vous [devez définir](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) les chaînes `NSMicrophoneUsageDescription` et `NSCameraUsageDescription` dans le fichier de `Info.plist` application. Les valeurs de ces clés seront utilisées pour remplir les boîtes de dialogue des permissions afin que l'utilisateur soit correctement informé du but de la demande de permission. Voir [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) pour plus d'informations sur la façon de les définir dans le contexte d'Electron.

Ce consentement de l'utilisateur n'était pas requis avant macOS 10. 4 Mojave, donc cette méthode retournera toujours `true` si votre système fonctionne 10.13 Haute Sierra ou moins.

### `systemPreferences.getAnimationSettings()`

Retourne `Object`:

* `shouldRenderRichAnimation` Boolean - Renvoie vrai si les animations riches doivent être rendues. Regarde le type de session (par exemple, bureau distant) et les paramètres d'accessibilité pour donner des conseils pour les animations lourdes.
* `scrollAnimationsEnabledBySystem` Boolean - Détermine par plate-forme si les animations de défilement (par exemple produites par la touche maison/fin) doivent être activées.
* `prefersReducedMotion` Booléen - Détermine si l'utilisateur souhaite des mouvements réduits basés sur des API de plate-forme.

Retourne un objet avec les paramètres d'animation du système.

## Propriétés

### `systemPreferences.appLevelApparence` _macOS_

Une propriété `String` qui peut être `dark`, `light` ou `unknown`. Il détermine le paramètre d'apparence macOS pour votre application. Cette correspondance aux valeurs dans: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Définir ceci remplacera la valeur par défaut du système ainsi que la valeur de `getEffectiveAppearance`.

Les valeurs possibles qui peuvent être définies sont `dark` et `light`, et les valeurs de retour possibles sont `dark`, `light`, et `unknown`.

Cette propriété n'est disponible que sur macOS 10.14 Mojave ou plus récent.

### `systemPreferences.effectiveAppearance` _macOS_ _Readonly_

Une propriété `String` qui peut être `dark`, `light` ou `unknown`.

Retourne le paramètre d'apparence macOS qui est actuellement appliqué à votre application, correspond à [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
