# systemPreferences

> Récuperer les préférences système.

Processus : [Main](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
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

### Événement : 'inverted-color-scheme-changed' *Windows*

Retourne :

* `event` Event
* `invertedColorScheme` Boolean - `true` si le jeu de couleurs est inversé, comme un thème de contraste élevé en cours d'utilisation, `false` autrement.

## Méthodes

### `systemPreferences.isDarkMode()` *macOS*

Retourne `Boolean` - Si le système est en mode sombre.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Retourne `Boolean` - Si l'option Swipe entre les pages est activé.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

Poste `event` en notifications natives de macOS. L'`userInfo` est un Object qui contient le dictionnaire d'informations utilisateur envoyé avec la notification.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

Poste `event` en notifications natives de macOS. L'`userInfo` est un Object qui contient le dictionnaire d'informations utilisateur envoyé avec la notification.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the corresponding `event` happens. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

The `id` of the subscriber is returned, which can be used to unsubscribe the `event`.

Under the hood this API subscribes to `NSDistributedNotificationCenter`, example values of `event` are:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Integer

Supprime l'abonnement avec `l'id`.

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `callback` Function 
  * `event` String
  * `userInfo` Object

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - a dictionary of (`key: value`) user defaults 

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
* `type` String - Voir [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos].
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
const {BrowserWindow, systemPreferences} = require('electron')
let browserOptions = {width: 1000, height: 800}

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

### `systemPreferences.getAccentColor()` *Windows*

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` String - Une des valeurs suivantes : 
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
  * `menubar` - The background color for the menu bar when menus appear as flat menus.
  * `menu-text` - Text in menus.
  * `scrollbar` - Scroll bar gray area.
  * `window` - Window background.
  * `window-frame` - Window frame.
  * `window-text` - Text in windows.

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) for more details.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Retourne `Boolean` - `true` si le jeu de couleurs est inversé, comme un thème de contraste élevé en cours d'utilisation, `false` autrement.