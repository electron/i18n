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

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` String
* Enregistrement `userInfo`<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` String
* Enregistrement `userInfo`<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

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

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. Ceci est nécessaire pour des événements tels que `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * Enregistrement `userInfo`<String, unknown>
  * Chaîne `objet`

Retourne `Nombre` - L'ID de cet abonnement

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
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.
* `value` String

Définit la valeur de `clé` dans `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Certaines `clé` populaires et `type`s sont:

* `ApplePressAndHoldEnabled` : `booléen`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

Retourne `Boolean` - `true` si la [composition DWM ][dwm-composition] (Aero Glass) est activée, et `false` sinon.

Un exemple d'utilisation pour déterminer si vous devez créer une fenêtre transparente ou non (les fenêtres transparentes ne fonctionneront pas correctement lorsque la composition DWM est désactivée) :

```javascript
const { BrowserWindow, systemPreferences } = require('electron')
const browserOptions = { width: 1000, height: 800 }

// Make the window transparent only if the platform supports it.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Create the window.
const win = new BrowserWindow(browserOptions)

// Navigate.
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

* `color` String - One of the following values:
  * On **Windows**:
    * `3d-dark-shadow` - Ombre noir pour les éléments affichés en trois dimensions.
    * `3d-face` - Couleur de la face pour les éléments affichés en trois dimensions et le fond des boîtes de dialogue.
    * `3d-hihlight` - Couleur de surlignage pour les éléments affichés en trois dimensions.
    * `3d-light` - Couleur de la lumière pour les éléments affichés en trois dimensions.
    * `3d-shadow` - Couleur d'ombre pour les éléments affichés en trois dimensions.
    * `active-border` - Bordure de la fenêtre active.
    * `active-caption` - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
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
    * `inactive-caption` - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
    * `inactive-caption-gradient` - Couleur du côté droit dans le gradient de couleur d'une barre de titre de la fenêtre inactive.
    * `inactive-caption-text` - Color of text in an inactive caption.
    * `info-background` - Background color for tooltip controls.
    * `info-text` - Text color for tooltip controls.
    * `menu` - Menu background.
    * `menu-highlight` - The color used to highlight menu items when the menu appears as a flat menu.
    * `menubar` - La couleur de fond de la barre de menu lorsque les menus apparaissent sous la forme de menus plats.
    * `menu-text` - Texte dans les menus.
    * `scrollbar` - Zone grise de la barre de défilement.
    * `window` - Fond de la fenêtre.
    * `window-frame` - Cadre de fenêtres.
    * `window-text` - Texte dans windows.
  * On **macOS**
    * `alternate-selected-control-text` - Le texte sur une surface sélectionnée dans une liste ou un tableau. _déprécié_
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
    * `selected-menu-item-text` - Le texte d'un menu sélectionné.
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

Retourne `String` - Le paramètre de couleur système sous forme hexadécimale RVB (`#ABCDEF`). See the [Windows docs][windows-colors] and the [macOS docs][macos-colors] for more details.

The following colors are only available on macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, and `unemphasized-selected-text`.

### `systemPreferences.getSystemColor(color)` _macOS_

* `color` String - One of the following values:
  * `bleu`
  * `marron`
  * `gris`
  * `vert`
  * `orange`
  * `rose`
  * `violet`
  * `rouge`
  * `jaune`

Returns `String` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for  more details.

### `systemPreferences.isInvertedColorScheme()` _Windows_ _Déprécié_

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Déprécié :** Doit utiliser le nouveau [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _Déprécié_

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Déprécié :** Doit utiliser le nouveau [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` _macOS_

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` _macOS_ _Déprécié_

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _Deprecated_

* `appearance` String | null - Can be `dark` or `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` _macOS_

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` String - The reason you are asking for Touch ID authentication

Returns `Promise<void>` - resolves if the user has successfully authenticated with Touch ID.

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
  console.log('You have successfully authenticated with Touch ID!')
}).catch(err => {
  console.log(err)
})
```

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with [`node-keytar`](https://github.com/atom/node-keytar), such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

**NOTE:** This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - whether or not the user will be informed via prompt if the current process is untrusted.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` String -Peut être `microphone`, `camera` ou `screen`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required on macOS 10.13 High Sierra or lower so this method will always return `granted`. macOS 10.14 Mojave or higher requires consent for `microphone` and `camera` access. macOS 10.15 Catalina or higher requires consent for `screen` access.

Windows 10 has a global setting controlling `microphone` and `camera` access for all win32 applications. It will always return `granted` for `screen` and for all media types on older versions of Windows.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. Les valeurs de ces clés seront utilisées pour remplir les boîtes de dialogue des permissions afin que l'utilisateur soit correctement informé du but de la demande de permission. Voir [Electron Application Distribution](../tutorial/application-distribution.md#macos) pour plus d'informations sur la façon de les définir dans le contexte d'Electron.

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
