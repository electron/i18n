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

### Event: 'inverted-color-scheme-changed' *Windows* *Deprecated*

Devuelve:

* `event` Event
* `invertedColorScheme` Boolean - `true` si un esquema de color invertido (un esquema de color de alto contraste con texto claro y fondos oscuros) se esta usando, de otra manera `false`.

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

### Event: 'high-contrast-color-scheme-changed' *Windows* *Deprecated*

Devuelve:

* `event` Evento
* `highContrastColorScheme` Boolean - `true` si un tema de alto contraste es esta empezando a usar, de otra manera `false`.

**Deprecated:** Should use the new [`updated`](native-theme.md#event-updated) event on the `nativeTheme` module.

## Métodos

### `systemPreferences.isDarkMode()` *macOS* *Windows* *Deprecated*

Returns `Boolean` - Whether the system is in Dark Mode.

**Note:** On macOS 10.15 Catalina in order for this API to return the correct value when in the "automatic" dark mode setting you must either have `NSRequiresAquaSystemAppearance=false` in your `Info.plist` or be on Electron `>=7.0.0`. See the [dark mode guide](../tutorial/mojave-dark-mode-guide.md) for more information.

**Deprecated:** Should use the new [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Returns `Boolean` - Whether the Swipe between pages setting is on.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `evento` Cadena
* `userInfo` Record<String, any>
* `deliverImmediately` Boolean (Opcional) - `true` para publicar inmediatamente incluso cuando la aplicación esta inactiva.

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `evento` Cadena
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `evento` Cadena
* `userInfo` Record<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Record<String, unknown>
  * `object` String

Devuelve `Number` - El ID de la suscripción

Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the corresponding `event` happens. The `userInfo` is an Object that contains the user information dictionary sent along with the notification. The `object` is the sender of the notification, and only supports `NSString` values for now.

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
  * `userInfo` Record<String, unknown>
  * `object` String

Devuelve `Number` - El ID de la suscripción

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Record<String, unknown>
  * `object` String

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

* `defaults` Record<String, String | Boolean | Number> - a dictionary of (`key: value`) user defaults

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `llave` Cadena
* `type` String - Puede ser `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` o `dictionary`.

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

* `llave` Cadena
* `type` String - Ver [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
* `value` Cadena

Set the value of `key` in `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Some popular `key` and `type`s are:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `llave` Cadena

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Returns `Boolean` - `true` if [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

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

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

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
    * `alternate-selected-control-text` - Texto en una superficie selecciona, en una lista o en una tabla.
    * `control-background` - El fondo de un elemento de interfaz grande, tal como un navegador o tablet.
    * `control` - La superficie de un control.
    * `control-text` - El texto de un control que no está deshabilitado.
    * `disabled-control-text` - El texto de un control que esta deshabilitado.
    * `find-highlight` - El color de un indicador de búsqueda.
    * `grid` - Las líneas de cuadrículas de un elemento de interfaz como una tabla.
    * `header-text` - El texto de una celda de cabecera en una tabla.
    * `highlight` - La fuente de luz virtual en la pantalla.
    * `keyboard-focus-indicator` - El anillo que aparece alrededor del control actualmente enfocado cuando se usa el teclado para la nevagación por la interface.
    * `label` - El texto de una etiqueta que contiene el contenido primario.
    * `link` - Un enlace a otro contenido.
    * `placeholder-text` - Una cadena de marcador de posición en una vista de control o texto.
    * `quaternary-label` - El texto de una etiqueta de menor importancia que una etiqueta terciaria como el texto de la marca de agua.
    * `scrubber-textured-background` - El fonfo de un depurado en el Touch Bar.
    * `secondary-label` - El texto de una etiqueta de menor importancia que una etiqueta normal como el usado para representar un subtítulo o información adicional.
    * `selected-content-background` - El fondo para el contenido seleccionado en una ventana clave o en una vista.
    * `selected-control` - La superficie de un control seleccionado.
    * `selected-control-text` - El texto un control seleccionado.
    * `selected-menu-item` - El texto de un menu seleccionado.
    * `selected-text-background` - El fondo de un texto seleccionado.
    * `selected-text` - Texto seleccionado.
    * `separator` - Un separado entre las diferentes secciones del contenido.
    * `shadow` - La sombra virtual proyectada por un objeto en la pantalla.
    * `tertiary-label` - El texto para una etiqueta de menor importancia que una etiqueta secundaria como una etiqueta que se usa para representar texto deshabilidato.
    * `text-background` - Texto de fondo.
    * `text` - Texto en un documento.
    * `under-page-background` - El fondo detrás del contenido de un documento.
    * `unemphasized-selected-content-background` - El contenido seleccionado en una ventana o vista no-clave.
    * `unemphasized-selected-text-background` - Un fondo para el texto seleccionado en una ventana o vista no clave.
    * `unemphasized-selected-text-background` - Texto seleccionado en una ventana o vista no clave.
    * `window-background` - El fondo de una ventana.
    * `window-frame-text` - El texto en la area de la barra de título de la ventana.

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) and the [MacOS docs](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors) for more details.

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

**[Cambiar](modernization/property-updates.md)**

### `systemPreferences.getAppLevelAppearance()` *macOS* *Deprecated*

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

**[Cambiar](modernization/property-updates.md)**

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS* *Deprecated*

* `appearance` String | null - Puede ser `dark` o `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

**[Cambiar](modernization/property-updates.md)**

### `systemPreferences.canPromptTouchID()` *macOS*

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

**[Cambiar](modernization/property-updates.md)**

### `systemPreferences.promptTouchID(reason)` *macOS*

* `reason` String - La razón por la que estás pidiendo por la autenticación Touch ID

Returns `Promise<void>` - resolves if the user has successfully authenticated with Touch ID.

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
  console.log('Te has autenticado exitosamente correctamente con Touch ID!')
}).catch(err => {
  console.log(err)
})
```

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on the their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with [`node-keytar`](https://github.com/atom/node-keytar), such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

**NOTE:** This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` *macOS*

* `prompt` Boolean - Si el usuario será informado o no vía prompt si el proceso actual no es confiable.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` *macOS*

* `mediaType` String - `microphone` o `camera`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `granted` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.askForMediaAccess(mediaType)` *macOS*

* `mediaType` String - el tipo de medio que se solicita; puede ser `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it *must* be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.getAnimationSettings()`

Devuelve `Objecto`:

* `shouldRenderRichAnimation` Boolean - Devuelve verdadero is animaciones ricas deben ser renderizadas. Se observa en el tipo de sesión (por ejemplo, escritorio remoto) y ajustes de accesibilidad para dar orientación a animaciones pesadas.
* `scrollAnimationsEnabledBySystem` Boolean - Determina sobre una base por plataforma si las animaciones de desplazamiento (por ejemplo, producidas por la clave home/end) deben estar habilitadas.
* `prefiere ReducdMotion` Boolean - Determina si el usuario desea un movimiento reducido basado en APIs de la plataforma.

Returns an object with system animation settings.

## Propiedades

### `systemPreferences.appLevelAppearance` *macOS*

A `String` property that can be `dark`, `light` or `unknown`. It determines the macOS appearance setting for your application. This maps to values in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Setting this will override the system default as well as the value of `getEffectiveAppearance`.

Possible values that can be set are `dark` and `light`, and possible return values are `dark`, `light`, and `unknown`.

This property is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.effectiveAppearance` *macOS* *Readonly*

A `String` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.