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

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Subscriptores a notificaciones nativas de macOS, `callback` serán llamados con `callback(evento, userinfo)` cuando el `evento` correspondiente suceda. El `userInfo` es un Objeto que contiene el diccionario de la información de usuario enviado junto a las notificaciones.

El `id` del subscriptor es devuelto, el cual puede ser usado para desuscribir el `evento`.

Bajo de la capucha este API subscribe a `NSDistributedNotificationCenter`, valores de ejemplo de `evento` son:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` Íntegro

Remueve el subscriptor con el `id`.

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `evento` Cadena
* `callback` Function 
  * `evento` Cadena
  * `userInfo` Objeto

Al igual que `subscribeNotification`, pero usa `NSNotificationCenter` para defectos locales. Esto es necesario para eventos como `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` Integer

Al igual que `unsubscribeNotification`, pero remueveal subscritor de `NSNotificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - a dictionary of (`key: value`) user defaults 

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `llave` Cadena
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

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
* `type` Cadena - Ver [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos].
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

Devuelve `Cadena` - El sistema actual de usuarios amplía el acento del color de preferencia en la forma hexadecimal de RGBA.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const rojo = color.substr(0, 2) // "aa"
const verde = color.substr(2, 2) // "bb"
const azul = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` Cadena - Uno de los siguientes valores: 
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

Devuelve `String` - El color del sistema ajustando en la forma hexadecimal de RGB (`#ABCDEF`). Ver el [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) para más detalles.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Devuelve `Boolean` - `true` si un esquema de color invertido, como un tema de alto contraste, es activo, `false` de lo contrario.