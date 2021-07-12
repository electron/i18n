# systemPreferences

> Obtener las preferencias del sistema.

Proceso: [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Eventos

El objeto de los`sistemasdePreferencias`emiten los siguietes eventos:

### Evento: 'acento-color-cambio' _Windows_

Devuelve:

* `event` Event
* `nuevoColor` String - El nuevo color RGBA que el usuario asignó para ser su color de acento del sistema.

### Event: 'color-changed' _Windows_

Devuelve:

* `event` Event

### Evento: 'inverted-color-scheme-changed' _Windows_ _Obsoleto_

Devuelve:

* `event` Event
* `invertedColorScheme` Boolean - `true` si un esquema de color invertido (un esquema de color de alto contraste con texto claro y fondos oscuros) se esta usando, de otra manera `false`.

**Obsoleto:** Debería usar el nuevo evento [`updated`](native-theme.md#event-updated) en el módulo `nativeTheme`.

### Evento: 'high-contrast-color-scheme-changed' _Windows_ _Obsoleto_

Devuelve:

* `event` Event
* `highContrastColorScheme` Boolean - `true` si un tema de alto contraste es esta empezando a usar, de otra manera `false`.

**Obsoleto:** Debería usar el nuevo evento [`updated`](native-theme.md#event-updated) en el módulo `nativeTheme`.

## Métodos

### `systemPreferences.isDarkMode()` _macOS_ _Windows_ _Deprecated_

Devuelve `Boolean` - Aunque el sistema esté en modo oscuro.

**Obsoleto:** Debería usar la nueva API [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly).

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

Devuelve `Boolean` - Aunque el ajuste de cambio entre páginas esté activado.

### `systemPreferences.postNotification(event, userInfo)` _macOS_

* `evento` Cadena
* Registro `userInfo`<String, any>
* `deliverImmediately` Boolean (Opcional) - `true` para publicar inmediatamente incluso cuando la aplicación esta inactiva.

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `evento` Cadena
* Registro `userInfo`<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `evento` Cadena
* Registro `userInfo`<String, any>

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `evento` Cadena
* `callback` Función
  * `evento` Cadena
  * Registro `userInfo`<String, unknown>
  * String `object`

Devuelve `Number` - El ID de la suscripción

Subscriptores a notificaciones nativas de macOS, `callback` serán llamados con `callback(evento, userinfo)` cuando el `evento` correspondiente suceda. El `userInfo` es un Objeto que contiene el diccionario de la información de usuario enviado junto a las notificaciones. El `object` es el remitente de la notificación y solo soporta valores `NSString` por ahora.

El `id` del subscriptor es devuelto, el cual puede ser usado para desuscribir el `evento`.

Bajo de la capucha este API subscribe a `NSDistributedNotificationCenter`, valores de ejemplo de `evento` son:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * Registro `userInfo`<String, unknown>
  * String `object`

Devuelve `Number` - El ID de la suscripción

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. Esto es necesario para eventos como `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `evento` Cadena
* `callback` Función
  * `evento` Cadena
  * Registro `userInfo`<String, unknown>
  * String `object`

Devuelve `Number` - El ID de la suscripción

Igual que `subscribeNotification`, pero utiliza `NSWorkspace.sharedWorkspace.notificationCenter`. Esto es necesario para eventos como `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

Remueve el subscriptor con el `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

Al igual que `unsubscribeNotification`, pero remueveal subscritor de `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

Igual que `unsubscribeNotification`, pero remueve el subscriptor desde `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` Record<String, String | Boolean | Number> - un diccionario de valores por de defectos del usuario (`key: value`)

Agregue los valores predeterminados especificados a `NSUserDefaults` de su aplicación.

### `systemPreferences.getUserDefault(key, type)` _macOS_

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

### `systemPreferences.setUserDefault(key, type, value)` _macOS_

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.
* `value` Cadena

Establece el valor de `key` en `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Algún `key` y `type`s populares:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Elimina el `key` en `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

Devuelve `Boolean` - `true` si [DWM composition][dwm-composition] (Aero Glass) está habilitada, y `false` de lo contrario.

Un ejemplo de usarlo para determinar si deberías crear una ventana transparente o no (las ventanas transparentes no funcionarán correctamente cuando la composición de DWM está deshabilitada):

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
  // No transparency, so we load a fallback that uses basic styles.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` _Windows_ _macOS_

Devuelve `Cadena` - El sistema actual de usuarios amplía el acento del color de preferencia en la forma hexadecimal de RGBA.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

Esta API solo esta disponible desde macOS 10.15 Mojave or posteriores.

### `systemPreferences.getColor(color)` _Windows_ _macOS_

* `color` String - One of the following values:
  * On **Windows**:
    * `3d-dark-shadow` - Sombra oscura para elementos de tres dimensiones mostrados.
    * `3d-face` - Color facial para elementos de tres dimensiones mostrados y para cuadro de fondos de las caja de diálogo.
    * `3d-highlight` - Resalta color para elementos de tres dimensiones mostrados.
    * `3d-light` - Color claro para elementos de tres dimensiones mostrados.
    * `3d-shadow` - Color oscuro para elementos de tres dimensiones mostrados.
    * `active-border` - Borde de ventana activo.
    * `active-caption` - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
    * `active-caption-gradient` - El color del lado derecho en el tono del color de un título de barra de una ventana activa.
    * `app-workspace` - Color de fondo de múltiples documentos de aplicaciones de interfase.
    * `button-text` - Texto en los botones de presión.
    * `caption-text` - Textos en subtítulos, tamaño de la caja y la barra de desplazamiento de la caja de flecha.
    * `desktop` - Color de fondo del escritorio.
    * `disabled-text` - Gris (desactivado) texto.
    * `highlight` - objeto(s) seleccionados en un control.
    * `highlight-text` - Texto de objeto(s) seleccionados en un control.
    * `hotlight` - Color para un hiperlink o un muy rastreado objeto.
    * `inactive-border` - Borde de ventana inactivo.
    * `inactive-caption` - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
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
  * On **macOS**
    * `alternate-selected-control-text` - Texto en una superficie selecciona, en una lista o en una tabla. _deprecated_
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
    * `placeholder-text` -  Una cadena de marcador de posición en una vista de control o texto.
    * `quaternary-label` - El texto de una etiqueta de menor importancia que una etiqueta terciaria como el texto de la marca de agua.
    * `scrubber-textured-background` - El fonfo de un depurado en el Touch Bar.
    * `secondary-label` - El texto de una etiqueta de menor importancia que una etiqueta normal como el usado para representar un subtítulo o información adicional.
    * `selected-content-background` - El fondo para el contenido seleccionado en una ventana clave o en una vista.
    * `selected-control` - La superficie de un control seleccionado.
    * `selected-control-text` - El texto un control seleccionado.
    * `selected-menu-item-text` - El texto del menú seleccionado.
    * `selected-text-background` - El fondo de un texto seleccionado.
    * `selected-text` - Texto seleccionado.
    * `separator` - Un separado entre las diferentes secciones del contenido.
    * `shadow` - La sombra virtual proyectada por un objeto en la pantalla.
    * `tertiary-label` - El texto para una etiqueta de menor importancia que una etiqueta secundaria como una etiqueta que se usa para representar texto deshabilidato.
    * `text-background` - Texto de fondo.
    * `text` - Texto en un documento.
    * `under-page-background`  - El fondo detrás del contenido de un documento.
    * `unemphasized-selected-content-background` - El contenido seleccionado en una ventana o vista no-clave.
    * `unemphasized-selected-text-background` - Un fondo para el texto seleccionado en una ventana o vista no clave.
    * `unemphasized-selected-text-background` - Texto seleccionado en una ventana o vista no clave.
    * `window-background` - El fondo de una ventana.
    * `window-frame-text` - El texto en la area de la barra de título de la ventana.

Devuelve `String` - El color del sistema ajustando en la forma hexadecimal de RGB (`#ABCDEF`). Vea el [Windows docs][windows-colors] y el [macOS docs][macos-colors] para más detalles.

Los siguientes colores solo están disponibles en macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, y `unemphasized-selected-text`.

### `systemPreferences.getSystemColor(color)` _macOS_

* `color` String - One of the following values:
  * `azul`
  * `marrón`
  * `gris`
  * `verde`
  * `naranja`
  * `rosa`
  * `púrpura`
  * `rojo`
  * `amarillo`

Devuelve `String` - El sistema de color estándar formateado como `#RRGGBBAA`.

Devuelve uno de los varios colores estándar del sistema que se adaptan automáticamente a la vibración y los cambios en los ajustes de accesibilidad como "Aumentar contraste" y "reducir transparencia". Ver [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) para mas detalles.

### `systemPreferences.isInvertedColorScheme()` _Windows_ _Deprecated_

Returns `Boolean` - `true` si un esquema de color invertido (un esquema de color de alto contraste con texto claro y fondo oscuro) está activo. De otra manera `false`.

**Obsoleto:** Debería usar la nueva API [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly).

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _Deprecated_

Devuelve `Boolean` - `true` si un tema de alto contraste está activo, si no `false`.

**Deprecated:** Use la nueva API de [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly).

### `systemPreferences.getEffectiveAppearance()` _macOS_

Devuelve `String` - Puede ser `dark`, `light` o `unknown`.

Obtiene confiración de la apariencia de macOS que está actulemente aplicada, mapea a [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` _macOS_ _Deprecated_

Devuelve`String` | `null` - Puede ser `dark`, `light` o `unknown`.

Obtiene la configuración de apariencia de macOS que has declarado que desea para su aplicación, mapea a [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Puedes usar la API `setAppLevelAppearance` para establecer este valor.

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _Deprecated_

* `appearance` String | null - Puede ser `dark` o `light`

Establece la configuración por defecto para su aplicación, esto debe sobrescribir el valor predeterminado del sistema y sobrescribir el valor de `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` _macOS_

Devuelve `Boolean` - si este dispositivo tiene la habilidad para usar Touch ID.

**NOTE:** Esta API retornará `false` en sistemas macOS mas viejos que Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` String - La razón por la que estás pidiendo por la autenticación Touch ID

Devuelve `Promise<void>` - Se resuelve si el usuario se ha autenticado con éxito con Touch ID.

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
  console.log('You have successfully authenticated with Touch ID!')
}).catch(err => {
  console.log(err)
})
```

Esta API en si misma no va a proteger sus datos de usuario, más bien, es un mecanismo para permitirle hacerlo. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. Esto se podría hacer con [`node-keytar`](https://github.com/atom/node-keytar), de tal manera que se almacenaría una clave de cifrado con `node-keytar` u sólo se obtendría si `promptTouchID()` se resuelve.

**NOTE:** Esta API retornara una promesa rechazada en sistemas macOS más viejos que Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - Si el usuario será informado o no vía prompt si el proceso actual no es confiable.

Devuelve `Boolean` - `true` si el proceso actual es un cliente de accesibilidad de confianza y `false` si no lo es.

### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` String - Puede ser `microphone`, `camera` o `screen`.

Devuelve `String` - Puede ser `not-determined`, `granted`, `denied`, `restricted` o `unknown`.

Este consentimiento de usuario no fue requerido en macOS 10.13 High Sierra o anteriores por lo tanto este método siempre devolverá `granted`. macOS 10.14 Mojave o superior requiere consentimiento para acceso a `microphone` y `camera`. macOS 10.15 Catalina o superior requiere consentimiento para acceso a `screen`.

Windows 10 has a global setting controlling `microphone` and `camera` access for all win32 applications. It will always return `granted` for `screen` and for all media types on older versions of Windows.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - el tipo de medio que se solicita; puede ser `microphone`, `camera`.

Devuelve `Promise<Boolean>` - Una promesa que resuelve con `true` se fue concedido el consentimiento y `false` si fue denegado. Si un `mediaType` invalido es pasado, la promesa será rechazada. Si se negó una solicitud de acceso y después se cambia a través del panel de Preferencias del Sistema, se requerirá un reinicio de la aplicación para que los nuevos permisos surtan efecto. Si el acceso ya ha sido solicitado y denegado, _must_ ser cambiado a través del panel de preferencias; una alerta no aparecerá y la promesa resolverá con el estado de acceso existente.

**Important:** Para poder aprovechar correctamente esta API, debes [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) las cadenas `NSMicrophoneUsageDescription` y `NSCameraUsageDescription` en el archivo `Info.plist` de tu aplicación. Los valores para estas claves se utilizarán para rellenar los diálogos de permisos para que el usuario sea informado correctamente sobre el propósito de la solicitud de permiso. Mira [Electron Application Distribution](../tutorial/application-distribution.md#macos) para más información acerca de como establecer estos en el contexto de Electron.

Este consentimiento de usuario no fue requerido hasta macOS 10.14 Mojave, por lo que este método siempre devolverá `true` si su sistema está ejecutando 10.13 High Sierra o inferior.

### `systemPreferences.getAnimationSettings()`

Devuelve `Objecto`:

* `shouldRenderRichAnimation` Boolean - Devuelve verdadero is animaciones ricas deben ser renderizadas. Se observa en el tipo de sesión (por ejemplo, escritorio remoto) y ajustes de accesibilidad para dar orientación a animaciones pesadas.
* `scrollAnimationsEnabledBySystem` Boolean - Determina sobre una base por plataforma si las animaciones de desplazamiento (por ejemplo, producidas por la clave home/end) deben estar habilitadas.
* `prefiere ReducdMotion` Boolean - Determina si el usuario desea un movimiento reducido basado en APIs de la plataforma.

Devuelve un objeto con las configuraciones del sistema de animación.

## Propiedades

### `systemPreferences.appLevelAppearance` _macOS_

Una propiedad `String` que puede ser `dark`, `light` o `unknown`. Determina la configuración de apariencia de macOS para tu aplicación. Esto mapea a valores en [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Establecer esto sobrescribirá el valor por defecto de sistema así como el valor de `getEffectiveAppearance`.

Posibles valores que se pueden configurar son `dark` y `light` y posibles valores de retorno son `dark`, `light` y `unknown`.

Esta propiedad solo está disponible en macOS 10.14 Mojave o posteriores.

### `systemPreferences.effectiveAppearance` _macOS_ _SoloLectura_

Una propiedad `String` que puede ser `dark`, `light` o `unknown`.

Devuelve la configuración de apariencia de macOS que esta aplicada actualmente a tu aplicación mapea a [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
