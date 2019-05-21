# systemPreferences

> Obtener las preferencias del sistema.

Process: [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = requiere('electron')
console.log(systemPreferences.isDarkMode())
```

## Eventos

El objeto de los`sistemasdePreferencias`emiten los siguietes eventos:

### Evento: 'acento-color-cambio' *Windows*

Devuelve:

* `event`
* `nuevoColor` String - El nuevo color RGBA que el usuario asignó para ser su color de acento del sistema.

### Event: 'color-changed' *Windows*

Devuelve:

* `event` Event

### Evento: 'color-invertido-esquema-cambiado' *Windows*

Devuelve:

* `event` Event
* `invertedColorScheme` Boolean - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is being used, `false` otherwise.

### Event: 'high-contrast-color-scheme-changed' *Windows*

Devuelve:

* `event` Evento
* `highContrastColorScheme` Boolean - `true` if a high contrast theme is being used, `false` otherwise.

### Event: 'appearance-changed' *macOS*

Devuelve:

* `newAppearance` String - Can be `dark` or `light`

**NOTE:** This event is only emitted after you have called `startAppLevelAppearanceTrackingOS`

## Métodos

### `Preferenciasdesistema.esModoOscuro()` *macOS*

Devuelve `Boolean` - Aunque el sistema esté en modo oscuro.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Devuelve `Boolean` - Aunque el ajuste de cambio entre páginas esté activado.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` *macOS*

* `evento` Cadena
* `userInfo` Objeto
* `deliverImmediately` Boolean (optional) - `true` to post notifications immediately even when the subscribing app is inactive.

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

Returns `Number` - The ID of this subscription

Subscriptores a notificaciones nativas de macOS, `callback` serán llamados con `callback(evento, userinfo)` cuando el `evento` correspondiente suceda. El `userInfo` es un Objeto que contiene el diccionario de la información de usuario enviado junto a las notificaciones.

El `id` del subscriptor es devuelto, el cual puede ser usado para desuscribir el `evento`.

Bajo de la capucha este API subscribe a `NSDistributedNotificationCenter`, valores de ejemplo de `evento` son:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Returns `Number` - The ID of this subscription

Al igual que `subscribeNotification`, pero usa `NSNotificationCenter` para defectos locales. Esto es necesario para eventos como `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Íntegro

Remueve el subscriptor con el `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Íntegro

Al igual que `unsubscribeNotification`, pero remueveal subscritor de `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Íntegro

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object -un diccionario de valores predeterminados de usuario (`key: value`) 

Agregue los valores predeterminados especificados a `NSUserDefaults` de su aplicación.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `llave` Cadena
* `type` String - Puede ser `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` o `dictionary`.

Devuelve `any` - El valor de `Key` en `NSUserDefaults`.

Algún `key` y `type`s populares:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `llave` Cadena
* `type` String - See [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
* `value` Cadena

Establece el valor de `key` en `NSUserDefaults`.

Nota que `type` debería coincidir el tipo actual de `value`. Una excepción es arrojada si no es así.

Algún `key` y `type`s populares:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `llave` Cadena

Elimina el `key` en `NSUserDefaults`. Puede usarse para reestablecer el valor por defecto o el valor global de un `key` establecido previamente con `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Devuelve `Boolean` - `true` si [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) está habilitada, y `false` de lo contrario.

Un ejemplo de usarlo para determinar si deberías crear una ventana transparente o no (las ventanas transparentes no funcionarán correctamente cuando la composición de DWM está deshabilitada):

```javascript
onst { BrowserWindow, systemPreferences } = requiere('electron')
let browserOptions = { width: 1000, height: 800 }

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

### `systemPreferences.getAccentColor()` *Windows* *macOS*

Devuelve `Cadena` - El sistema actual de usuarios amplía el acento del color de preferencia en la forma hexadecimal de RGBA.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const rojo = color.substr(0, 2) // "aa"
const verde = color.substr(2, 2) // "bb"
const azul = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` *Windows* *macOS*

* `color` Cadena - Uno de los siguientes valores: 
  * Activado **Windows**: 
    * `3d-dark-shadow` - Sombra oscura para elementos de tres dimensiones mostrados.
    * `3d-face` - Color facial para elementos de tres dimensiones mostrados y para cuadro de fondos de las caja de diálogo.
    * `3d-highlight` - Resalta color para elementos de tres dimensiones mostrados.
    * `3d-light` - Color claro para elementos de tres dimensiones mostrados.
    * `3d-shadow` - Color oscuro para elementos de tres dimensiones mostrados.
    * `active-border` - Borde de ventana activo.
    * `active-caption` - Título de barra de la ventana activo. Especifica el color del lado izquierdo en el tono del color de un título de barra de ventana activa si el efecto de tono está habilitado.
    * `active-caption-gradient` - El color del lado derecho en el tono del color de un título de barra de una ventana activa.
    * `app-workspace` - Color de fondo de múltiples documentos de aplicaciones de interfase.
    * `button-text` - Texto en los botones de presión.
    * `caption-text` - Textos en subtítulos, tamaño de la caja y la barra de desplazamiento de la caja de flecha.
    * `desktop` - Color de fondo del escritorio.
    * `disabled-text` - Gris (desactivado) texto.
    * 0>highlight</code> - objeto(s) seleccionados en un control.
    * `highlight-text` - Texto de objeto(s) seleccionados en un control.
    * `hotlight` - Color para un hiperlink o un muy rastreado objeto.
    * `inactive-border` - Borde de ventana inactivo.
    * `inactive-caption` - Subtítulo de ventana inactivo. Especifica el color del lado izquierdo en el tono de color de una barra de título de una ventana inactiva si el efecto de tono está habilitado.
    * `inactive-caption-gradient` - Color del lado derecho en el tono de color de un título de barra de una ventana inactiva.
    * `inactive-caption-text` - Color del texto en un subtítulo inactivo.
    * `info-background` - Color de fondo para control de información de herramientas.
    * `info-text` - Color de texto para controles de información de herramientas.
    * `menu` - Fondo del menú.
    * `menu-highlight` - El color usado para resaltar los objetos del menú cuando el menú aparece como un menú plano.
    * `menubar` - El color de fondo para la barra del menú cuando los menús aparecen como menús planos.
    * `menu-text` - Textos en menús.
    * `scrollbar` - Desplazar la barra en el área gris.
    * `window` - Fondo de la ventana.
    * `window-frame` - Cuadro de ventana.
    * `window-text` - Texto en ventanas.
  * Activado **macOS** 
    * `alternate-selected-control-text` - The text on a selected surface in a list or table.
    * `control-background` - The background of a large interface element, such as a browser or table.
    * `control` - The surface of a control.
    * `control-text` -The text of a control that isn’t disabled.
    * `disabled-control-text` - The text of a control that’s disabled.
    * `find-highlight` - The color of a find indicator.
    * `grid` - The gridlines of an interface element such as a table.
    * `header-text` - The text of a header cell in a table.
    * `highlight` - The virtual light source onscreen.
    * `keyboard-focus-indicator` - The ring that appears around the currently focused control when using the keyboard for interface navigation.
    * `label` - The text of a label containing primary content.
    * `link` - A link to other content.
    * `placeholder-text` - A placeholder string in a control or text view.
    * `quaternary-label` - The text of a label of lesser importance than a tertiary label such as watermark text.
    * `scrubber-textured-background` - The background of a scrubber in the Touch Bar.
    * `secondary-label` - The text of a label of lesser importance than a normal label such as a label used to represent a subheading or additional information.
    * `selected-content-background` - The background for selected content in a key window or view.
    * `selected-control` - The surface of a selected control.
    * `selected-control-text` - The text of a selected control.
    * `selected-menu-item` - The text of a selected menu.
    * `selected-text-background` - The background of selected text.
    * `selected-text` - Selected text.
    * `separator` - A separator between different sections of content.
    * `shadow` - The virtual shadow cast by a raised object onscreen.
    * `tertiary-label` - The text of a label of lesser importance than a secondary label such as a label used to represent disabled text.
    * `text-background` - Text background.
    * `text` - The text in a document.
    * `under-page-background` - The background behind a document's content.
    * `unemphasized-selected-content-background` - The selected content in a non-key window or view.
    * `unemphasized-selected-text-background` - A background for selected text in a non-key window or view.
    * `unemphasized-selected-text` - Selected text in a non-key window or view.
    * `window-background` - The background of a window.
    * `window-frame-text` - The text in the window's titlebar area. 

Devuelve `String` - El color del sistema ajustando en la forma hexadecimal de RGB (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) and the [MacOS docs](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors) for more details.

### `systemPreferences.getSystemColor(color)` *macOS*

* `color` Cadena - Uno de los siguientes valores: 
  * `azul`
  * `marrón`
  * `gris`
  * `verde`
  * `naranja`
  * `rosa`
  * `púrpura`
  * `rojo`
  * `amarillo`

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for more details.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

### `systemPreferences.isHighContrastColorScheme()` *Windows*

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

### `systemPreferences.getEffectiveAppearance()` *macOS*

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. Consulte la [Electron Packager API](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) para más detalles.

### `systemPreferences.getAppLevelAppearance()` *macOS*

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS*

* `appearance` String | null - Can be `dark` or `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

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

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.