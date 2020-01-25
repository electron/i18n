# systemPreferences

> Récuperer les préférences système.

Processus : [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Événements

L'objet `systemPreferences` émet les événements suivants :

### Événement : 'accent-color-changed' *Windows*

Retourne :

* `event` Événement
* `newColor` String - La nouvelle couleur RGBA que l'utilisateur à assigné à son système.

### Événement : 'color-changed' *Windows*

Retourne :

* `event` Événement

### Événement : 'inverted-color-scheme-changed' *Windows* *Deprecated*

Retourne :

* `event` Événement
* `invertedColorScheme` Boolean - `true` si un schéma de couleur inversé (un schéma de couleur à contraste élevé avec le texte clair et les fonds sombres) est utilisé, `faux` sinon.

**Déprécié :** Doit utiliser le nouvel événement [`mis à jour`](native-theme.md#event-updated) sur le module `nativeTheme`.

### Événement : 'high-contrast-color-scheme-changed' *Windows* *Deprecated*

Retourne :

* `event` Event
* `highContrastColorScheme` Boolean - `true` si un thème à contraste élevé est utilisé, `false` sinon.

**Déprécié :** Doit utiliser le nouvel événement [`mis à jour`](native-theme.md#event-updated) sur le module `nativeTheme`.

## Méthodes

### `systemPreferences.isDarkMode()` *macOS* *Windows* *obsolète*

Retourne `Boolean` - Si le système est en mode sombre.

**Note:** Sur macOS 10. 5 Catalina pour que cette API renvoie la valeur correcte lorsque dans le paramètre de mode sombre "automatique" vous devez avoir `NSRequiresAquaSystemAppearance=false` dans votre `Info. liste` ou être sur Electron `>=7.0.0`. Voir le [guide du mode sombre](../tutorial/mojave-dark-mode-guide.md) pour plus d'informations.

**Déprécié :** Doit utiliser le nouveau [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Retourne `Boolean` - Si l'option Swipe entre les pages est activé.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` *macOS*

* `event` String
* Enregistrement `userInfo`<String, any>
* `deliverImmédiately` Booléen (facultatif) - `true` pour publier des notifications immédiatement même lorsque l'application d'abonnement est inactive.

Poste `event` en notifications natives de macOS. L'`userInfo` est un Object qui contient le dictionnaire d'informations utilisateur envoyé avec la notification.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* Enregistrement `userInfo`<String, any>

Poste `event` en notifications natives de macOS. L'`userInfo` est un Object qui contient le dictionnaire d'informations utilisateur envoyé avec la notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `event` String
* Enregistrement `userInfo`<String, any>

Poste `event` en notifications natives de macOS. L'`userInfo` est un Object qui contient le dictionnaire d'informations utilisateur envoyé avec la notification.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * Enregistrement `userInfo`<String, unknown>
  * Chaîne `objet`

Retourne `Nombre` - L'ID de cet abonnement

S'abonne aux notifications natives de macOS, `callback` sera appelé avec `callback(event, userInfo)` lorsque le `event` correspondant se produit. The `userInfo` is an Object that contains the user information dictionary sent along with the notification. The `object` is the sender of the notification, and only supports `NSString` values for now.

The `id` of the subscriber is returned, which can be used to unsubscribe the `event`.

Under the hood this API subscribes to `NSDistributedNotificationCenter`, example values of `event` are:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * Enregistrement `userInfo`<String, unknown>
  * Chaîne `objet`

Retourne `Nombre` - L'ID de cet abonnement

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * Enregistrement `userInfo`<String, unknown>
  * Chaîne `objet`

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

Supprime l'abonnement avec `l'id`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Record<String, String | Boolean | Number> - a dictionary of (`key: value`) user defaults

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

Returns `any` - The value of `key` in `NSUserDefaults`.

Some popular `key` and `type`s are:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `key` String
* `type` String - See [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
* `value` String

Set the value of `key` in `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Some popular `key` and `type`s are:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Returns `Boolean` - `true` if [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

```javascript
const { BrowserWindow, systemPreferences } = require('electron')
let browserOptions = { width: 1000, height: 800 }

// Make the window transparent only if the platform supports it.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Créer la fenêtre.
let win = new BrowserWindow(browserOptions)

// Navigation.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // No transparency, so we load a fallback that uses basic styles.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` *Windows* *macOS*

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` *Windows* *macOS*

* `color` String - Une des valeurs suivantes : 
  * On **Windows**: 
    * `3d-dark-shadow` - Ombre noir pour les éléments affichés en trois dimensions.
    * `3d-face` - Couleur de la face pour les éléments affichés en trois dimensions et le fond des boîtes de dialogue.
    * `3d-hihlight` - Couleur de surlignage pour les éléments affichés en trois dimensions.
    * `3d-light` - Couleur de la lumière pour les éléments affichés en trois dimensions.
    * `3d-shadow` - Couleur d'ombre pour les éléments affichés en trois dimensions.
    * `active-border` - Bordure de la fenêtre active.
    * `active-caption` - Barre de titre de la fenêtre active. Retourne la couleur du côté gauche du dégradé de couleur si la barre de titre de la fenêtre a l'effet de dégradé actif.
    * `active-caption-gradient` - Couleur du côté droit du dégradé de couleur de la barre de titre de la fenêtre active.
    * `app-workspace` - Couleur de fond d'une interface d'application de document multiple (MDI).
    * `button-text` - Texte sur les boutons d'envoi.
    * `caption-text` - Texte dans une légende, boîte de dimensions, boîte avec la flèche pour la barre de défilement.
    * `desktop` - Couleur de fond du bureau.
    * `disabled-text` - Texte grisé (désactivé).
    * `highlight` - Élément(s) sélectionné(s) dans un groupe.
    * `highlight-text` - Text of item(s) selected in a control.
    * `hotlight` - Color for a hyperlink or hot-tracked item.
    * `inactive-border` - Inactive window border.
    * `inactive-caption` - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
    * `inactive-caption-gradient` - Right side color in the color gradient of an inactive window's title bar.
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
  * Marche **macOS** 
    * `alternate-selected-control-text` - Le texte sur une surface sélectionnée dans une liste ou un tableau.
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
    * `selected-menu-item` - Le texte d'un menu sélectionné.
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

Retourne `String` - Le paramètre de couleur système sous forme hexadécimale RVB (`#ABCDEF`). Voir la [documentation Windows](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) et la [documentation MacOS](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors) pour plus de détails.

### `systemPreferences.getSystemColor(color)` *macOS*

* `color` String - Une des valeurs suivantes : 
  * `bleu`
  * `marron`
  * `gris`
  * `vert`
  * `orange`
  * `rose`
  * `violet`
  * `red`
  * `yellow`

Returns `String` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for more details.

### `systemPreferences.isInvertedColorScheme()` *Windows* *Deprecated*

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` *macOS* *Windows* *Deprecated*

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Depreacted:** Should use the new [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` *macOS*

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.

**[Déprécié ](modernization/property-updates.md)**

### `systemPreferences.getAppLevelAppearance()` *macOS* *Deprecated*

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

**[Déprécié ](modernization/property-updates.md)**

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS* *Deprecated*

* `appearance` String | null - Can be `dark` or `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

**[Déprécié ](modernization/property-updates.md)**

### `systemPreferences.canPromptTouchID()` *macOS*

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

**[Déprécié ](modernization/property-updates.md)**

### `systemPreferences.promptTouchID(reason)` *macOS*

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

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on the their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with [`node-keytar`](https://github.com/atom/node-keytar), such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

**NOTE:** This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` *macOS*

* `prompt` Boolean - whether or not the user will be informed via prompt if the current process is untrusted.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` *macOS*

* `mediaType` String - `microphone` or `camera`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `granted` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.askForMediaAccess(mediaType)` *macOS*

* `mediaType` String - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it *must* be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. Les valeurs de ces clés seront utilisées pour remplir les boîtes de dialogue des permissions afin que l'utilisateur soit correctement informé du but de la demande de permission. Voir [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) pour plus d'informations sur la façon de les définir dans le contexte d'Electron.

Ce consentement de l'utilisateur n'était pas requis avant macOS 10. 4 Mojave, donc cette méthode retournera toujours `true` si votre système fonctionne 10.13 Haute Sierra ou moins.

### `systemPreferences.getAnimationSettings()`

Retourne `Object`:

* `shouldRenderRichAnimation` Boolean - Renvoie vrai si les animations riches doivent être rendues. Regarde le type de session (par exemple, bureau distant) et les paramètres d'accessibilité pour donner des conseils pour les animations lourdes.
* `scrollAnimationsEnabledBySystem` Boolean - Détermine par plate-forme si les animations de défilement (par exemple produites par la touche maison/fin) doivent être activées.
* `prefersReducedMotion` Booléen - Détermine si l'utilisateur souhaite des mouvements réduits basés sur des API de plate-forme.

Retourne un objet avec les paramètres d'animation du système.

## Propriétés

### `systemPreferences.appLevelApparence` *macOS*

Une propriété `String` qui peut être `dark`, `light` ou `unknown`. Il détermine le paramètre d'apparence macOS pour votre application. Cette correspondance aux valeurs dans: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Définir ceci remplacera la valeur par défaut du système ainsi que la valeur de `getEffectiveAppearance`.

Les valeurs possibles qui peuvent être définies sont `dark` et `light`, et les valeurs de retour possibles sont `dark`, `light`, et `unknown`.

Cette propriété n'est disponible que sur macOS 10.14 Mojave ou plus récent.

### `systemPreferences.effectiveAppearance` *macOS* *Readonly*

Une propriété `String` qui peut être `dark`, `light` ou `unknown`.

Retourne le paramètre d'apparence macOS qui est actuellement appliqué à votre application, correspond à [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Veuillez noter que jusqu'à ce qu'Electron soit compilé en ciblant le SDK 10.14, votre application `effectiveAppearance` sera par défaut à 'light' et n'héritera pas de la préférence de l'OS. Dans l'intervalle pour que votre application hérite de la préférence de l'OS, vous devez définir la touche `NSRequiresAquaSystemAppearance` dans vos applications `Info. liste` à `faux`. Si vous utilisez `electron-packager` ou `electron-forge` il vous suffit de définir l'option `enableDarwinDarkMode` à `true`. Voir l'API [Electron Packager](https://github.com/electron/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) pour plus de détails.