# systemPreferences

> Obtener las preferencias del sistema.

Process: [Main](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Eventos

El objeto de los`sistemasdePreferencias`emiten los siguietes eventos:

### Evento: 'acento-color-cambio' *Windows*

Devuelve:

* `event` Event
* `nuevoColor` String - El nuevo color RGBA que el usuario asignó para ser su color de acento del sistema.

### Event: 'color-changed' *Windows*

Devuelve:

* `event` Event

### Evento: 'color-invertido-esquema-cambiado' *Windows*

Devuelve:

* `event` Event
* `EsquemaColorinvertido` Boolean ' `verdad` si un color de esquema invertido, como un tema de alto contraste, está siendo usando, o de lo contrario `falso`.

## Métodos

### `systemPreferences.isDarkMode()` *macOS*

Devuelve `Boolean` - Aunque el sistema esté en modo oscuro.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Devuelve `Boolean` - Aunque el ajuste de cambio entre páginas esté activado.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `evento` Cadena
* `userInfo` Objeto

Publicaciones `eventos` como notificaciones nativas de macOS. El `userInfo` es un Objeto que contiene el diccionario de la información de usuario enviada junto a la notificación.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `evento` Cadena
* `userInfo` Objeto

Publicaciones `eventos` como notificaciones nativas de macOS. El `userInfo` es un Objeto que contiene el diccionario de la información de usuario enviada junto a la notificación.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `evento` Cadena
* `userInfo` Objeto

Publicaciones `eventos` como notificaciones nativas de macOS. El `userInfo` es un Objeto que contiene el diccionario de la información de usuario enviada junto a la notificación.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the corresponding `event` happens. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

The `id` of the subscriber is returned, which can be used to unsubscribe the `event`.

Under the hood this API subscribes to `NSDistributedNotificationCenter`, example values of `event` are:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Al igual que `subscribeNotification`, pero usa `NSNotificationCenter` para defectos locales. Esto es necesario para eventos como `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Íntegro

Removes the subscriber with `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Íntegro

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Íntegro

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - a dictionary of (`key: value`) user defaults 

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

Returns `any` - The value of `key` in `NSUserDefaults`.

Algún `key` y `type`s populares:

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

Algún `key` y `type`s populares:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Returns `Boolean` - `true` if [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

```javascript
onst {BrowserWindow, systemPreferences} = requiere('electron')
let browserOptions = {width: 1000, height: 800}

// Haz la ventana transparente solo si la plataforma los soporta.
si (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = verdad
  browserOptions.frame = falso
}

// Crea la  ventana.
dejar ganar = VentanadeBuscador(Opcionesdebuscador)

// Navegar.
si (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
 // No hay transparencia, así que cargamos un retroceso que usa estilos básicos.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` *Windows*

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const rojo = color.substr(0, 2) // "aa"
const verde = color.substr(2, 2) // "bb"
const azul = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` String - One of the following values: 
  * `3d-dark-shadow` - Dark shadow for three-dimensional display elements.
  * `3d-face` - Face color for three-dimensional display elements and for dialog box backgrounds.
  * `3d-highlight` - Highlight color for three-dimensional display elements.
  * `3d-light` - Light color for three-dimensional display elements.
  * `3d-shadow` - Shadow color for three-dimensional display elements.
  * `active-border` - Active window border.
  * `active-caption` - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
  * `active-caption-gradient` - Right side color in the color gradient of an active window's title bar.
  * `app-workspace` - Background color of multiple document interface (MDI) applications.
  * `button-text` - Text on push buttons.
  * `caption-text` - Text in caption, size box, and scroll bar arrow box.
  * `desktop` - Desktop background color.
  * `disabled-text` - Grayed (disabled) text.
  * `highlight` - Item(s) selected in a control.
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

Returns `Boolean` - `true` if an inverted color scheme, such as a high contrast theme, is active, `false` otherwise.