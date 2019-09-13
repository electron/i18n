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

## Métodos

### `Preferenciasdesistema.esModoOscuro()` *macOS*

Devuelve `Boolean` - Aunque el sistema esté en modo oscuro.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Devuelve `Boolean` - Aunque el ajuste de cambio entre páginas esté activado.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `evento` Cadena
* `userInfo` Objeto
* `deliverImmediately` Boolean (Opcional) - `true` para publicar inmediatamente incluso cuando la aplicación esta inactiva.

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

Devuelve `Number` - El ID de la suscripción

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

Devuelve `Number` - El ID de la suscripción

Al igual que `subscribeNotification`, pero usa `NSNotificationCenter` para defectos locales. Esto es necesario para eventos como `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Igual que `subscribeNotification`, pero utiliza `NSWorkspace.sharedWorkspace.notificationCenter`. Esto es necesario para eventos como `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Íntegro

Remueve el subscriptor con el `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Íntegro

Al igual que `unsubscribeNotification`, pero remueveal subscritor de `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` Íntegro

Igual que `unsubscribeNotification`, pero remueve el subscriptor desde `NSWorkspace.sharedWorkspace.notificationCenter`.

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
* `type` String - Ver [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
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

Esta API solo esta disponible desde macOS 10.15 Mojave or posteriores.

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
    * `separator` - A separator between different sections of content.
    * `shadow` - The virtual shadow cast by a raised object onscreen.
    * `tertiary-label` - The text of a label of lesser importance than a secondary label such as a label used to represent disabled text.
    * `text-background` - Texto de fondo.
    * `text` - Texto en un documento.
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

### `systemPreferences.canPromptTouchID()` *macOS*

Devuelve `Boolean` - si este dispositivo tiene la habilidad para usar Touch ID.

**NOTE:** Esta API retornará `false` en sistemas macOS mas viejos que Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` *macOS*

* `reason` String - La razón por la que estás pidiendo por la autenticación Touch ID

Devuelve `Promise<void>` - Se resuelve si el usuario se ha autenticado con éxito con Touch ID.

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
  console.log('Te has autenticado exitosamente correctamente con Touch ID!')
}).catch(err => {
  console.log(err)
})
```

Esta API en si misma no va a proteger sus datos de usuario, más bien, es un mecanismo para permitirle hacerlo. Las aplicaciones nativas necesitarán establecer [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) como [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) en la entrada de su llavero para que al leerlo se solicite automáticamente el consentimiento biométrico de Touch ID. Esto se podría hacer con [`node-keytar`](https://github.com/atom/node-keytar), de tal manera que se almacenaría una clave de cifrado con `node-keytar` u sólo se obtendría si `promptTouchID()` se resuelve.

**NOTE:** Esta API retornara una promesa rechazada en sistemas macOS más viejos que Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` *macOS*

* `prompt` Boolean - Si el usuario será informado o no vía prompt si el proceso actual no es confiable.

Devuelve `Boolean` - `true` si el proceso actual es un cliente de accesibilidad de confianza y `false` si no lo es.

### `systemPreferences.getMediaAccessStatus(mediaType)` *macOS*

* `mediaType` String - `microphone` o `camera`.

Devuelve `String` - Puede ser `not-determined`, `granted`, `denied`, `restricted` o `unknown`.

Este consentimiento de usuario no fue requerido hasta macOS 10.14 Mojave, por lo que este método siempre devolverá `granted` si su sistema está ejecutando 10.13 High Sierra o inferior.

### `systemPreferences.askForMediaAccess(mediaType)` *macOS*

* `mediaType` String - el tipo de medio que se solicita; puede ser `microphone`, `camera`.

Devuelve `Promise<Boolean>` - Una promesa que resuelve con `true` se fue concedido el consentimiento y `false` si fue denegado. Si un `mediaType` invalido es pasado, la promesa será rechazada. Si se negó una solicitud de acceso y después se cambia a través del panel de Preferencias del Sistema, se requerirá un reinicio de la aplicación para que los nuevos permisos surtan efecto. Si el acceso ya ha sido solicitado y denegado, *must* ser cambiado a través del panel de preferencias; una alerta no aparecerá y la promesa resolverá con el estado de acceso existente.

**Important:** Para poder aprovechar correctamente esta API, debes [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) las cadenas `NSMicrophoneUsageDescription` y `NSCameraUsageDescription` en el archivo `Info.plist` de tu aplicación. Los valores para estas claves se utilizarán para rellenar los diálogos de permisos para que el usuario sea informado correctamente sobre el propósito de la solicitud de permiso. Mira [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) para más información acerca de como establecer estos en el contexto de Electron.

Este consentimiento de usuario no fue requerido hasta macOS 10.14 Mojave, por lo que este método siempre devolverá `true` si su sistema está ejecutando 10.13 High Sierra o inferior.

### `systemPreferences.getAnimationSettings()`

Devuelve `Objeto`:

* `shouldRenderRichAnimation` Boolean - Devuelve verdadero is animaciones ricas deben ser renderizadas. Se observa en el tipo de sesión (por ejemplo, escritorio remoto) y ajustes de accesibilidad para dar orientación a animaciones pesadas.
* `scrollAnimationsEnabledBySystem` Boolean - Determina sobre una base por plataforma si las animaciones de desplazamiento (por ejemplo, producidas por la clave home/end) deben estar habilitadas.
* `prefiere ReducdMotion` Boolean - Determina si el usuario desea un movimiento reducido basado en APIs de la plataforma.

Devuelve un objeto con las configuraciones del sistema de animación.