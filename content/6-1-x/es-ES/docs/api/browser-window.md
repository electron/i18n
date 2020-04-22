# BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [principal](../glossary.md#main-process)</0>

```javascript
// En el proceso principal.
const { BrowserWindow } = require('electron')

// O usa "remote" desde el proceso de renderizado.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// Carga una URL remota
win.loadURL('https://github.com')

// O carga un archivo HTML local
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Ventana sin borde

Para crear una ventana sin usar chrome, o una vertana transparente de cualquier forma, puede usar la API [Frameless Window](frameless-window.md).

## Mostrar ventana con elegancia

Cuando los usuarios cargan una página directamente en la ventana, pueden ver como se carga gradualmente la página, lo cual no es una buena experiencia para una aplicación nativa. Para hacer que la ventana aparezca sin fogonazos, hay dos soluciones para distintas situaciones.

### Usando el evento `ready-to-show`

Mientras se carga la página, se emitirá el evento `ready-to-show` cuando el proceso de renderizado haya procesado la página por primera vez si aún no se ha mostrado la ventana. Si se muestra la ventana despues de este evento, no tendrá fogonazos:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Este evento generalmente se emite después del evento `did-finish-load`, pero para páginas con muchos recursos remotos, puede ser emitido antes del evento `did-finish-load`.

### Configurar `backgroundColor`

Para una aplicación compleja, el evento `ready-to-show` puede emitirse muy tarde, haciendo que la aplicación parezca lenta. En este caso, se recomienda mostrar la ventana inmediatamente, y usar un color de fondo `backgroundColor` parecido al color de fondo de la aplicación:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Tenga en cuenta que incluso para aplicaciones que utilizan el evento `ready-to-show`, aún se recomienda establecer `backgroundColor` para que la aplicación parezca más nativa.

## Ventana principal y ventana secundaria

Al usar la opción `parent`, se pueden crean ventanas secundarias:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

La ventana `child` se mostrará siempre por encima de la ventana `top`.

### Ventanas modales

Una ventana modal es una ventana secundaria que deshabilita la ventana principal, para crear una ventana modal, hay que establecer ambas opciones `parent` y `modal`:

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### La visibilidad de la página

La [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) funciona de la siguiente manera:

* En todas las plataformas, el estado de visibilidad identifica si la ventana está oculta/minimizada o si no lo está.
* Además, en macOS, el estado de visibilidad también indica el estado de oclusión de la ventana. Si la ventana esta tapada, es decir, completamente cubierta por otra ventana, el estado de visibilidad será `hidden`. En otras plataformas, el estado de visibilidad será `hidden` solo si la ventana esta minimizada o explícitamente oculta con `win.hide()`.
* Si se crea un `BrowserWindow` con `show: false`, el estado de visibilidad inicial será `visible` a pesar de que la ventana esté oculta realmente.
* Si `backgroundThrottling` está deshabilitado, el estado de visibilidad permanecerá `visible` incluso si la ventana está minimizada, tapada o oculta.

Se recomienda detener operaciones costosas cuando el estado de visibilidad está `hidden` con el fin de minimizar el consumo de energía.

### Notas según la plataforma

* En macOS las ventanas modales se mostrarán como hojas adjuntas a la ventana principal.
* En macOS las ventanas secundarias mantendrán la posición relativa a la ventana principal cuando ésta se mueve, mientras que en Windows y Linux las ventanas secundarias no se moverán.
* En Linux el tipo de ventanas modales se cambiará a `dialog`.
* En Linux, muchos entornos de escritorio no admiten ocultar una ventana modal.

## Clase: BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [Main](../glossary.md#main-process)

`BrowserWindow` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Crea una nueva `BrowserWindow` con propiedades nativas como las establecidas por las `options`.

### `new BrowserWindow([options])`

* `options` Object (opcional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (opcional) - `width` y `height` se utilizan como el tamaño de la página web. Esto significa que el tamaño actual de la ventana incluirá el tamaño del marco de la ventana y será un poco más grande. Por defecto es `false`.
  * `center` Boolean (opcional) - Muestra la ventana en el centro de la pantalla.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. Por defecto es `true`.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. Por defecto es `true`.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. Por defecto es `true`.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. Por defecto es `true`.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. Por defecto es `true`.
  * `focusable` Boolean (opcional) - si la ventana se puede enfocar. Por defecto es `true`. En Windows, la configuración `focusable: false` también quiere decir que `skipTaskbar: true`. En Linux, la configuración `focusable: false` hace que la ventana deje de interactuar con wm, así la ventana siempre se mantendrá en la parte superior en todas las áreas de trabajo.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Por defecto es `false`.
  * `fullscreen` Boolean(opcional) - si la ventana debería mostrarse en pantalla completa. Cuando se establece explícitamente `false` el botón de la pantalla completa estará oculta o deshabilitada en macOS. Por defecto es `false`.
  * `fullscreenable` Boolean (opcional) - si la ventana puede ponerse el modo pantalla completa. En macOS, también si el botón maximizar o acercarse debería alternar el modo pantalla completa o maximizar la ventana. Por defecto es `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Por defecto es `false`.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Por defecto es `false`.
  * `title` String (opcional) - Titulo de la ventana por defecto. Por defecto es `"Electron"`. Si la etiqueta HTML `<title>` es definida en el archivo HTML cargado por `loadURL()`, esta propiedad será ignorada.
  * `icon` ([NativeImage](native-image.md) | String) (opcional) - El icono de la ventana. En Windows, se recomienda usar iconos `ICO` para obtener mejores efectos visuales. También se se puede dejar sin definir, de esta manera se utilizará el icono del ejecutable.
  * `show` Boolean (optional) - Whether window should be shown when created. Por defecto es `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Por defecto es `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Por defecto es `false`.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Por defecto es `false`.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Por defecto es `false`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Por defecto es `false`.
  * `backgroundColor` String (opcional) - El color de fondo de la Ventana como un valor hexadecimal, como `#66CD00` o `#FFF` o `#80FFFFFF` (alfa en formato #AARRGGBB es soportado si `transparent` es establecido a `true`). Por defecto es `#FFF` (blanco).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Por defecto es `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Por defecto es `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Por defecto es `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Los valores posibles son:
    * `default` - Es la barra de título gris opaca estándar de Mac.
    * `hidden` -Es una barra de título oculta y una ventana de tamaño completo. Sin embargo, la barra tiene los controles estándares de la ventana ("traffic lights") en la parte superior izquierda.
    * `hiddenInset` - Es una barra de título oculta con una apariencia alternativa donde los botones de traffic light están ligeramente mas insertados en el borde de la ventana.
    * `customButtonsOnHover` Boolean (opcional) - Dibuja un botón cierre y minimizar personalizado en macOS en ventanas sin marcos. Estos botones no se mostrarán a menos que se encuentren en la esquina superior izquierda de la ventana. Estos botones personalizados evitaran problemas con los eventos de ratón que ocurren con los botones de la barra de herramientas estándar. **Nota:** Actualmente esta opción es experimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Por defecto es `false`.
  * `thickFrame` Boolean (opcional) - Utilice el estilo `WS_THICKFRAME` para ventanas sin marco en Windows, la cual agrega un marco de ventana estándar. Configurarlo en `false` eliminará la sombra de la ventana y las animaciones de la ventana. Por defecto es `true`.
  * `vibrancy` Cadena (opcional) - Añade un tipo de efecto de vibración a la ventana. Funciona solamente en macOS. Puede ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`.  Tenga en cuenta que usar `frame: false` en combinación con un valor de vibrancy requiere que use también un `titleBarStyle` no-predeterminado.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Si es `true`, la ventana crecerá al ancho recomendado de la página web cuando se haga zoom. `false` hará que haga zoom hasta el ancho de la pantalla. Esto también afectará el comportamiento cuando se llama directamente `maximize()`. Por defecto es `false`.
  * `tabbingIdentifier` String (opcional) - Crea una pestaña del nombre del grupo. Permite abrir la ventana como una pestaña nativa en macOC 10.12+. Las ventanas con el mismo identificador de pestaña se agruparán juntos. Esto también añade un nuevo botón de pestañas nativo a la barra de pestañas de la ventana y permite que la `app` y la ventana reciban el evento `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (opcional) - Si se habilita el DevTools. Si se configura a `false`, no puede utilizarse `BrowserWindow.webContents.openDevTools()` para abrir DevTools. Por defecto es `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Por defecto es `false`.
    * `nodeIntegrationInWorker` Boolean (opcional) - Si la integración de nodos está habilitada en los trabajadores de la web. Por defecto es `false`. Se pueden encontrar más detalles en [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (opcional) - Opcion experimental para habilitar soporte Node.js en sub-frames como iframes y ventas hijos. Todos tus preloads cargarán por cada iframe, puedes usar `process.isMainFrame` para determinar si estás en el marco principal o no.
    * `preload` String (opcional) - Especifica un script que será cargado antes del otros scripts en la página. Este script siempre tendrá acceso al nodo APIs sin importar si la integración de nodos esté activada o no. El valor debería ser la ruta del archivo absoluto al script. Cuando la integración de nodos esta desactivada, la precarga del script puede reintroducir de vuelta al ámbito global los símbolos globales del Nodo. Ver ejemplo [aquí](process.md#event-loaded).
    * `sandbox` Boolean (opcional) - Si se configura, protegerá al renderizador asociado a la ventana, haciéndolo compatible con el sandbox de Chromium OS-level, deshabilitando el motor Node.js. Esto no es lo mismo que la opción de `nodeIntegration` y las APIs disponibles para el script de precarga son más limitadas. Leer más sobre la opción [aquí](sandbox-option.md). **Nota:** actualmente esta opción es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Por defecto es `true`.
    * `session` [Session](session.md#class-session) (opcional) - Configura la sesión usada por la página. En lugar de pasar directamente el objeto de la sesión, se puede optar por utilizar la opción de `partition`, la cual acepta una cadena de partición. Cuando se proporcionen `session` y `partition`, se preferirá `session`. Default es la sesión por defecto.
    * `partition` Cadena (opcional) - Configura la sesión utilizada por la página según la cadena de partición de la sesión. Si la `partition` empieza con `persist:`, la página utilizará una sesión persistente disponible para todas las páginas en la partición con la misma `partition`. Si no está el prefijo `persist:`, la página usara una sesión de la memoria interna. Por asignar el mismo `partition`, múltiples páginas podrán compartir la misma sesión. Default es la sesión por defecto.
    * `affinity` Cadena de caracteres (opcional): Cuando se especifica, las páginas web con la misma `affinity` se ejecutarán en el mismo proceso de renderizado. Nótese que debido a que se reutiliza el proceso de renderizado, ciertas opciones `webPreferences` también se compartirán entre las páginas web incluso si se especificaron valores diferentes para cada una de ellas, incluyendo pero no limitándose a `preload`, `sandbox` y`nodeIntegration`. Por lo tanto, se sugiere utilizar las mismas `webPreferences` para páginas web con la misma `affinity`. _This property is experimental_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Por defecto es `true`.
    * `webSecurity` Booleano (opcional) - Cuando es `false`, deshabilitará la política de un mismo origen (por lo general se utiliza cuando la gente testea los sitios web), y configurará `allowRunningInsecureContent`a `true` en caso de que estas opciones no hayan sido configuradas por el usuario. Por defecto es `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Por defecto es `false`.
    * `images` Boolean (optional) - Enables image support. Por defecto es `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Por defecto es `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Por defecto es `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Por defecto es `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Por defecto es `false`.
    * `enableBlinkFeatures` String (opcional) - Una lista de cadenas de características separadas por `,`, para habilitar como `CSSVariables,KeyboardEventKey`. La lista completa de cadenas distintivas soportadas pueden encontrarse en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `disableblinkFeatures` String (opcional) - Una lista de cadenas distintivas separadas por `,`,como `CSSVariables,KeyboardEventKey` para deshabilitar. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      * `standard` String (opcional) - Por defecto es `Times New Roman`.
      * `serif` String (opcional) - Por defecto es `Times New Roman`.
      * `sansSerif` String (opcional) - Por defecto es `Arial`.
      * `monospace` String (opcional) - Por defecto es `Courier New`.
      * `cursive` String (opcional) - Por defecto es `Script`.
      * `fantasy` String (opcional) - Por defecto es `Impact`.
    * `defaultFontSize` Integer (opcional) - Por defecto es `16`.
    * `defaultMonospaceFontSize` Integer (opcional) - Por defecto es `13`.
    * `minimumFontSize` Integer (opcional) - Por defecto es `0`.
    * `defaultEncoding` String (opcional) - Por defecto es `ISO-8859-1`.
    * `backgroundThrottling` Boolean (opcional) - Para acelerar animaciones y temporizadores cuando la página esta al fondo. Esto también afecta a [Page Visibility API](#page-visibility). Por defecto es `true`.
    * `offscreen` Boolean(optional) - Para habilitar el renderizado offscreen para el navegador de la ventana. Por defecto es `false`. Para más detalles, ver [offscreen rendering tutorial](../tutorial/offscreen-rendering.md).
    * `contextIsolation` Boolean(opcional) - Para ejecutar las APIs de Electron y el script especificado `preload` en un contexto JavaScript independiente. Por defecto es `false`. El contexto que ejecuta el script `preload` tendrá acceso completo a los globales `document` y a `window` pero utilizará su propia configuración integrada de JavaScript (`Array`, `Object`, `JSON`, etc.) y estará apartada de cualquier cambio que se le haga al contexto global por la página cargada. El API Electron solo estará disponible en el script `preload` y no en la página cargada. Esta opción debe utilizarse cuando se carga contenido remoto potencialmente dañino para asegurar que el contenido cargado no pueda modificar el script `preload` o cualquier API de Electron en uso. Esta opción utiliza la misma técnica utilizada por [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Se puede acceder a este contexto en las herramientas de desarrollo al seleccionar la entrada 'Electron Isolated Context' en el cuadro combo en la parte superior de la pestaña de la Consola.
    * `nativeWindowOpen` Boolean (opcional) - Si se usa el nativo `window.open()`. Por defecto es `false`. Las ventanas hijas siempre tienen la integración con node desabilidata a menos que `nodeIntegrationInSubFrames` es true. **Note:** Esta opción es experimental actualmente.
    * `webviewTag` Boolean (opcional) - Si se habilita o no el [`<webview>` tag](webview-tag.md). Por defecto es `false`. **Nota:** El script `preload` configurado para el `<webview>`tendrá la integración de nodos habilitada cuando se ejecuta por lo que hay que asegurarse que el contenido remoto o posiblemente dañino no sea capaz de crear una etiqueta de `<webview>`con un script `preload` posiblemente malicioso. Puede utilizarse el evento `will-attach-webview` en [webContents](web-contents.md) para quitar el script `preload` y validar o alterar la configuración inicial de `<webview>`.
    * `additionalArguments` String[] (opcional) - Una lista de string que se agregarán a `process.argv` en el proceso de renderización de esta aplicación. Útil para pasar pequeños bits de datos hasta los scripts de precarga del proceso del renderizador.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Por defecto es `false`.
    * `safeDialogsMessage` String (opcional) - El mensaje a mostrar cuando la protección de diálogo consecutivo es lanzada. So no se define el mensaje por defecto sería utilizado, note que actualmente el mensaje por defecto esta en Inglés y no localizado.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Por defecto es `false`.
    * `autoplayPolicy` String (opcional) - Política de autoplay para aplicar al contenido en la ventana, puede ser `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Por defecto a `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

Cuando se configura el tamaño máximo o mínimo de la ventana con `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, solo limita a los usuarios. No impide pasar de un tamaño que no sigue las restricciones de tamaño a`setBounds`/`setSize` o al constructor de `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Los valores posibles son:

* En linux, los tipos posibles son `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`.
  * El tipo `textured` añade una aspecto de tono metálico (`NSTexturedBackgroundWindowMask`).
  * El tipo `desktop` coloca la ventana en el nivel de la ventana de fondo de escritorio (`kCGDesktopWindowLevel - 1`). Tenga en cuenta que la ventana de escritorio no recibirá enfoque alguno, ni eventos del ratón o del teclado, pero se puede utilizar `globalShortcut` para recibir input con moderación.
* En Windows, el tipo posible es `toolbar`.

### Eventos de Instancia

Los objetos creados con `new BrowserWindow` emiten los siguientes eventos:

**Nota:** Algunos eventos sólo están disponibles en sistemas operativos específicos y se etiquetan como tal.

#### Evento: "page-title-updated"

Devuelve:

* `evento` Evento
* `title` Cadena
* `explicitSet` Boolen

Aparece cuando el documento cambia el título. Llamar `event.preventDefault()` evitará que el título de la ventana nativa cambie. `explicitSet` es falso cuando el título es sincronizado desde el archivo url.

#### Evento: 'close'

Devuelve:

* `event` Event

Aparece cuando la ventana se va a cerrar. Se emite antes de el evento del DOM `beforeunload` y `unload`. Llamar a `event.preventDefault()` cancelará el cierre.

Generalmente se desea utilizar el controlador `beforeunload` para decidir si la ventana debería ser cerrada, el cual también será llamado cuando la ventada se vuelva a cargar. En Electron, devolver cualquier valor que no sea `undefined` cancelará el cierre. Por ejemplo:

```javascript
window.onbeforeunload = (e) => {
  console.log("No quiero cerrarme")

  // A diferencia de los navegadores habituales en donde un cuadro de mensaje le aparecece al usuario,
  // devolviendo un valor non-void que cancelará silenciosamente el cierre.
  // Se recomienda usar el cuadro de diálogo API para dejar que el usuario confirme el cierre de la
  //aplicación.
  e.returnValue = false // equivalente a `return false` pero no es recomendado
}
```
_**Nota**: Hay una diferencia sutil entre el comportamiento de `window.onbeforeunload = handler` y `window.addEventListener('beforeunload', handler)`. Se recomienda siempre establecer el `event.returnValue` explícitamente, en lugar de devolver sólo un valor, ya que el primero funciona más consistentemente dentro de Electron._

#### Evento: "closed"

Emitido cuando la ventana es cerrada. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Evento: "session-end" _Windows_

Aparece cuando la sesión de la ventana va a terminarse debido a un cierre forzoso o el reinicio de la máquina o el cierre de la sesión.

#### Evento: "unresponsive"

Aparece cuando la página web deja de responder.

#### Evento: "responsive"

Aparece cuando la página web que no responde vuelve a responder.

#### Evento: "blur"

Aparece cuando la ventana pierde el enfoque.

#### Evento: "focus"

Aparece cuando la ventana recupera el enfoque.

#### Evento: "show"

Aparece cuando se muestra la ventana.

#### Evento: "hide"

Aparece cuando se oculta la ventana.

#### Evento: "ready-to-show"

Aparece cuando la página web ha sido renderizada (mientras no está siendo mostrada) y la ventana puede mostrarse sin un visual flash.

#### Evento: "maximize"

Aparece cuando se maximiza la ventana.

#### Evento: "unmaximize"

Aparece cuando la ventana sale de un estado maximizado.

#### Evento: "minimize"

Aparece cuando se minimiza la ventana.

#### Evento: "restore"

Aparece cuando se restaura la ventana de un estado minimizado.

#### Event: 'will-resize' _macOS_ _Windows_

Devuelve:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - Tamaño a la que se esta se esta re dimensionando la ventana.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Evento: "resize"

Emitido después que la ventana se haya redimensionada.

#### Event: 'will-move' _Windows_

Devuelve:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - Ubicación a la que la ventana se esta moviendo.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Evento: "move"

Aparece cuando la ventana se mueve a una nueva posición.

__Note__: En macOS este evento es un alias de `moved`.

#### Evento: "moved" _macOS_

Aparece solo una vez cuando la ventana se mueve a una nueva posición.

#### Evento: "enter-full-screen"

Aparece cuando la ventana entra en un estado pantalla completa.

#### Evento: "leave-full-screen"

Aparece cuando la ventana sale del estado pantalla completa.

#### Evento: "enter-html-full-screen"

Aparece cuando la ventana entra en un estado pantalla completa activado por la API HTML.

#### Evento: "leave-html-full-screen"

Aparece cuando la ventana sale de un estado pantalla completa activado por la API HTML.

#### Evento: 'always-on-top-changed'

Devuelve:

* `event` Event
* `isAlwaysOnTop` Boolean

Emitido cuando la ventana es configurada o no configurada para mostrarse siempre en la parte superior de las otras ventanas.

#### Evento: 'app-command' _Windows_ _Linux_

Devuelve:

* `event` Event
* `command` Cadena

Aparece cuando se invoca un [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx). Estos están generalmente relacionados a las teclas del teclado o a los comandos del navegador, así como el botón "Back" está en algunos ratones en Windows.

Los comandos están en minuscula, los guiones bajos son remplazados por guiones, y el prefijo `APPCOMMAND_` se elimina. por ejemplo, `APPCOMMAND_BROWSER_BACKWARD` aparece como `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // La ventana retrocede cuando el usuario hace clic sobre el botón de atrás
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

Los siguientes comandos de aplicación son explícitamente soportados en Linux:

* `browser-backward`
* `browser-forward`

#### Evento: "scroll-touch-begin"_macOS_

Aparece cuando la fase del evento de la rueda de desplazamiento ha empezado.

#### Evento: "scroll-touch-end"_macOS_

Aparece cuando la fase del evento de la rueda de desplazamiento ha concluido.

#### Evento: "scroll-touch-edge"_macOS_

Aparece cuando la fase del evento de la rueda desplazamiento ha alcanzado el borde del elemento.

#### Evento: "swipe" _macOS_

Devuelve:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Evento: "sheet-begin" _macOS_

Aparece cuando la ventana abre una hoja.

#### Evento: "sheet-end" _macOS_

Aparece cuando la ventana cierra una hoja.

#### Evento: 'new-window-for-tab' _macOS_

Aparece cuando se hace clic al botón de nueva pestaña nativa.

### Métodos Estáticos

La clase `BrowserWindow` tiene los siguientes métodos estáticos:

#### `BrowserWindow.getAllWindows()`

Devuelve `BrowserWindow[]`- Un arreglo de todas las ventanas abiertas del navegador.

#### `BrowserWindow.getFocusedWindow()`

Devuelve `BrowserWindow | null` - La ventana que es enfocada en esta aplicación, de lo contrario devuelve `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `Contenidosweb` [Contenidosweb](web-contents.md)

Devuelve `BrowserWindow` - La ventana que posee el `webContents` dado.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Íntegro

Devuelve `BrowserWindow` - La ventana que posee el `id`dado.

#### `BrowserWindow.addExtension(path)`

* `path` String

Añade una extensión de Chrome ubicada en `path`, y devuelve el nombre de la extensión.

El método no devolverá nada si el manifiesto de la extensión falta o está incompleta.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Elimina una extensión de Chrome por su nombre.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.getExtensions()`

Devuelve `Object` - Las llaves son los nombres de la extensión y cada valor es un objeto que contiene las propiedades `name` y `version`.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Añade una extensión de DevTools ubicada en `path`, y devuelve el nombre de la extensión.

La extensión será recordada, por lo tanto sólo se necesitará llamar a la API una vez. Esta API no es para uso de la programación. Si se intenta añadir una extensión que ya ha sido cargada, este método no devolverá nada y en su lugar aparecerá una advertencia en la consola.

El método no devolverá nada si el manifiesto de la extensión falta o está incompleta.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Elimina una extensión de Devtools mediante su nombre.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.getDevToolsExtensions()`

Devuelve `Object` - Las llaves son los nombres de la extensión y cada valor es un objeto que contiene las propiedades `name` y `version`.

Para verificar si una extensión de DevTools está instalada se puede ejecutar lo siguiente:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

### Propiedades de Instancia

Los objetos creados con `new BrowserWindow` tienen las siguientes propiedades:

```javascript
const { BrowserWindow } = require('electron')
// En este ejemplo "win" es nuestra instancia
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Consulte la [documentation `webContents`](web-contents.md) de sus métodos y eventos.

#### `win.id`

Un `Integer` que representa el ID único de la ventana.

### Métodos de Instancia

Los objetos creados con `new BrowserWindow` tienen los siguientes métodos de instancia:

**Note:** Algunos métodos solo están disponibles es sistemas operativos específicos y son etiquetados como tal.

#### `win.destroy()`

Al forzar el cierre de una ventana, el evento `unload` y `beforeunload` no se emitirá en la página web. El evento `close` tampoco se emitirá en la ventana, pero es seguro que el evento `closed` sí será emitido.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Enfoca la ventana.

#### `win.blur()`

Elimina el enfoque de la ventana.

#### `win.isFocused()`

Devuelve `Boolean` - Si la ventana está centrada o no.

#### `win.isDestroyed()`

Devuelve `Boolean` - Si la ventana fue destruida o no.

#### `win.show()`

Muestra la ventana y la enfoca.

#### `win.showInactive()`

Muestra la ventana pero no la enfoca.

#### `win.hide()`

Oculta la ventana.

#### `win.isVisible()`

Devuelve `Boolean` - Si la ventana es visible o no al usuario.

#### `win.isModal()`

Devuelve `Boolean` - Si la ventana actual es una ventana modal o no.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Sale del estado maximizado de la ventana.

#### `win.isMaximized()`

Devuelve `Boolean` - Si la ventana está maximizada.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restaura la ventana desde un estado minimizado a su estado previo.

#### `win.isMinimized()`

Devuelve `Boolean` - Si la ventana está minimizada o no.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Establece si la ventana debe estar o no en modo pantalla completa.

#### `win.isFullScreen()`

Devuelve `Boolean` - Si la ventana está o no en pantalla completa.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Entra o sale del modo simple de pantalla completa.

El modo simple de pantalla completa emula el comportamiento de la pantalla completa nativa que se encuentra en versiones de Mac OS X anteriores a Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Devuelve `Boolean` - Si la ventana está en modo simple de pantalla completa (pre-Lion).

#### `win.isNormal()`

Devuelve `Boolean` - Si la ventana esta en estado normal (no maximizada, no minimizada, no en el modo de pantalla completa).

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* `aspectRatio` Flotador - La relación de aspecto para mantener parte de la vista de contenido.
* `extraSize` [Size](structures/size.md) - El tamaño extra no se incluye mientras se mantiene la relación de aspecto.

Esto hará que la ventana mantenga una relación de aspecto. El tamaño extra permite al desarrollador tener espacio especificado en píxeles, el cual no está incluido dentro de los cálculos de la relación de aspecto. Esta API ya toma en cuenta la diferencia entre el tamaño de la ventana y el tamaño del contenido.

Considere una ventana normal con un reproductor de video HD y los controles asociados. Quizá hay 15 pixeles de controles en el borde izquierdo, 25 pixeles de control en el borde derecho y 50 pixeles de control bajo el reproductor. Para mantener una relación de aspecto de 16:9 (la relación de aspecto estándar para HD@1920x1080) dentro del reproductor, tendríamos que llamar esta función con argumentos de 16/9 y [ 40, 50 ]. En el segundo argumento no importa donde están la anchura extra ni altura extra dentro de la vista del contenido, solo importa que existan. Suma cualquier áreas de ancho y alto adicionales que tengas dentro de la vista de contenido general.

Llamar esta función con un valor de `0` eliminara cualquier configuración de aspecto de ratios establecida anteriormente.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Color de fondo de la ventana como un valor hexadecimal, como `#66CD00` o `#FFF` o `#80FFFFFF` (alpha es soportada si `transparent` es `true`). Por defecto es `#FFF` (blanco).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` Cadena - La ruta de acceso absoluta al archivo para vista previa con QuickLook. Esto es importante a medida que Quick Look utiliza el nombre del archivo y la extensión del archivo en la ruta para determinar el tipo de contenido del archivo que se va a abrir.
* `displayName` Cadena (opcional) - El nombre del archivo a mostrar en la vista modal de Quick Look. Esto es puramente visual y no afecta el tipo de contenido del archivo. Por defecto es `path`.

Utiliza [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) para previsualizar un archivo de una ruta determinada.

#### `win.closeFilePreview()` _macOS_

Cierra el panel actual de [Quick Look](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opcional) _macOS_

Redimensiona y mueve la ventana a los límites proporcionados. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Retorna [`Rectangle`](structures/rectangle.md) - El `bounds` de la ventana como `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opcional) _macOS_

Redimensiona y mueve el área del cliente de la ventana (por ejemplo, la página web) hasta los límites proporcionados.

#### `win.getContentBounds()`

Retorna [`Rectangle`](structures/rectangle.md) - El `bounds` del área del cliente de la ventana como `Object`.

#### `win.getNormalBounds()`

Devuelve [`Rectangle`](structures/rectangle.md) - Contiene los limites del estado normal de la ventana

**Note:** si el estado actual de la ventana: maximizado, minimizado en el pantalla completa, esta función siempre devuelve la posición y tamaño de la ventana en estado normal. En estado normal, getBounds y getNormalBounds el mismo [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Habilita o deshabilita la ventana.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `alto` Integer
* `animate` Boolean (opcional) _macOS_

Cambia el tamaño de la ventana a `width` y `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Devuelve `Integer[]` - Contiene la anchura y altura de la ventana.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `alto` Integer
* `animate` Boolean (opcional) _macOS_

Cambia el área del cliente de la ventana (por ejemplo, la página web) a la `width` y `height`.

#### `win.getContentSize()`

Devuelve `Integer[]` - Contiene la anchura y altura del área del cliente de la ventana.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `alto` Integer

Establece el tamaño mínimo de la ventana a `width`y `height`.

#### `win.getMinimumSize()`

Devuelve `Integer[]` - Contiene la anchura y altura mínima de la ventana.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `alto` Integer

Establece el tamaño máximo de la ventana a `width`y `height`.

#### `win.getMaximumSize()`

Devuelve `Integer[]` - Contiene la anchura y altura máxima de la ventana.

#### `win.setResizable(resizable)`

* `resizable` Booleano

Establece si la ventana puede ser redimensionada manualmente por el usuario.

#### `win.isResizable()`

Devuelve `Boolean` - Si la ventana puede ser redimensionada manualmente por el usuario.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` _macOS_ _Windows_

Devuelve `Boolean` - Si la ventana puede ser movida por el usuario.

En Linux siempre devuelve `true`.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` _macOS_ _Windows_

Devuelve `Boolean` - Si la ventana puede ser minimizada manualmente por el usuario

En Linux siempre devuelve `true`.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` _macOS_ _Windows_

Devuelve `Boolean` - Si la ventana puede ser maximizada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Establece si el botón de la ventana de maximizar/acercar activa el modo pantalla completa o maximiza la ventana.

#### `win.isFullScreenable()`

Devuelve `Boolean` - Si el botón de la ventana de maximizar/acercar activa o no el modo pantalla completa o maximiza la ventana.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` _macOS_ _Windows_

Devuelve `Boolean` - Si la ventana puede ser o no cerrada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (opcional) _macOS_ - Los valores incluyen `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Obsoleto). Por defecto es `floating`. Para más detalles, ver [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level).
* `relativeLevel` Integer (opcional) _macOS_ - El número de capas más alto para configurar esta ventana con respecto al `level` determinado. Por defecto es `0`. Tenga en cuenta que Apple desalienta establecer niveles superiores a 1 sobre `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Devuelve `Boolean` - Si la ventana está siempre sobre las otras ventanas.

#### `win.moveTop()`

Mover ventana a la parte superior(z-order) independientemente del enfoque

#### `win.center()`

Mueve la ventana al centro de la pantalla.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opcional) _macOS_

Mueve la ventana a `x` y `y`.

#### `win.getPosition()`

Devuelve `Integer[]` - Contiene la posición actual de la ventana.

#### `win.setTitle(title)`

* `title` Cadena

Cambia el título de la ventana nativa a `title`.

#### `win.getTitle()`

Devuelve `String` - El título de la ventana nativa.

**Note:** El título de la página web puede ser diferente del título de la ventana nativa.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (opcional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Por ejemplo:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Empieza y deja de hacer parpadear la ventana para atraer la atención del usuario.

#### `win.setSkipTaskbar(skip)`

* `skip` Booleano

Hace que la ventana no se muestre en la barra de tareas.

#### `win.setKiosk(flag)`

* `flag` Boolean

Entra o sale del modo kiosko.

#### `win.isKiosk()`

Devuelve `Boolean` - Si la ventana está o no en modo kiosco.

#### `win.getNativeWindowHandle()`

Devuelve `Buffer` - El controlador específico de la plataforma de la ventana.

El tipo nativo del controlador en Windows es `HWND`, en macOS `NSView*` y en Linux `Window` (`unsigned long`).

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Función

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Devuelve `Boolean` - `true` o `false` dependiendo de si el mensaje esta anclado o no.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Desancla el mensaje de la ventana.

#### `win.unhookAllWindowMessages()` _Windows_

Desancla todos los mensajes de la ventana.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` Cadena

Establece el nombre de la ruta del archivo que la ventana representa, y el icono del archivo se mostrará en la barra de título de la ventana.

#### `win.getRepresentedFilename()` _macOS_

Devuelve `String` - El nombre de la ruta del archivo que la ventana representa.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Especifica si se ha editado el documento de la ventana y el icono en la barra de título se volverá gris cuando se establece en `true`.

#### `win.isDocumentEdited()` _macOS_

Devuelve `Boolean` - Si se ha editado el documento de la ventana.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - Los límites para capturar
* `callback` Función
  * `image` [NativeImage](native-image.md)

Captura una foto instantánea de la página dentro de `rect`. Al finalizar se llamará `callback` con `callback(image)`. La imagen `` es una instancia de [NativeImage](native-image.md) que almacena datos de la instantánea. Omitiendo `rect` capturará toda la página visible.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - Los límites para capturar

Devuelve `Promise<NativeImage>` - Resuelve con el un [NativeImage](native-image.md)

Captura una foto instantánea de la página dentro de `rect`. Omitiendo `rect` capturará toda la página visible.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (opcional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (opcional) - Una url HTTP Referencia.
  * `userAgent` String (opcional) - Un agente de usuario originando la solicitud.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (opcional)
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Devuelve `Promise<void>` - la promesa sera resolvida cuando la página haya finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y será rechazada si la pagina falla al cargar (mira [`did-fail-load`](web-contents.md#event-did-fail-load)).

Igual que [`webContents.loadURL(url[, opciones])`](web-contents.md#contentsloadurlurl-options).

El `url` puede ser una dirección remota (por ejemplo `http://`) o una de un archivo locar HTML utilizando el protocolo `file://`.

Para garantizar que los URLs del archivo estén adecuadamente formateados, se recomienda utilizar el método [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) del Nodo:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

Se puede cargar un URL utilizando la solicitud `POST` con los datos codificados de URL haciendo lo siguiente:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (opcional)
  * `query` Object (opcional) - Pasado a `url.format()`.
  * `search` String (opcional) - Pasado a `url.format()`.
  * `hash` String (opcional) - Pasado a `url.format()`.

Devuelve `Promise<void>` - la promesa sera resolvida cuando la página haya finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y será rechazada si la pagina falla al cargar (mira [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Es igual a `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Establece el `menu` como el menu bar de la ventana.

#### `win.removeMenu()` _Linux_ _Windows_

Eliminar la barra de menú de la ventana.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (opcional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Elimina la barra de progreso cuando el progreso es < 0; cambia a modo indeterminado cuando el progreso es >1.

En la plataforma Linux, solo es compatible con el environment de escritorio Unity. Se necesita especificar el nombre del archivo `*.desktop` en el campo `desktopName` dentro de `package.json`. Por defecto, se asumirá `app.getName().desktop`.

En Windows, se puede pasar de modo. Los valores aceptados son `none`, `normal`, `indeterminate`, `error`, y `paused`. Si se llama a`setProgressBar` sin establecer un modo (pero con un valor dentro del rango válido), se asumirá el modo `normal`.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - el icono a mostrar en la parte inferior derecha del icono de la barra de tareas. Si este parámetro es `null`, se borra la superposición
* `description` Cadena- una descripción que se facilitará a los lectores de la pantalla Accessibility

Establece una superposición de 16 x 16 píxeles sobre el icono actual de la barra de tareas. Generalmente se utiliza para transmitir algún tipo de estatus de la aplicación o para notificar pasivamente al usuario.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Establece si la ventana debe tener una sombra.

#### `win.hasShadow()`

Devuelve `Boolean` - Si la ventana tiene o no una sombra.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number- entre 0.0 (completamente transparente) y 1.0 (completamente opaco)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` _Windows_ _macOS_

Devuelve `number` - entre 0.0 (completamente transparente) y 1.0 (totalmente opaco)

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Establecer una forma de ventana determina el área dentro de la ventana donde el sistema permite dibujar y interactuar con el usuario. Fuera de la región dada, no se dibujarán píxeles y no se registrarán eventos del ratón. Los eventos del ratón fuera de la región no será recibida por esa ventana, pero pasará a lo que esté detrás de la misma.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Devuelve `Boolean` - Si los botones se añadieron o no exitosamente

Añade la barra de herramientas de la vista previa con una configuración específica de los botones para la imagen previsualizada de una ventana en el plano del botón en la barra de tareas. Devuelve un objeto `Boolean` e indica si la previsualización se ha agregado con éxito.

El número de botones en la barra de herramientas de la vista previa no debe ser mayor que 7 debido al limitado espacio. Una vez que se configura la barra de herramientas de la vista previa, la barra de tareas no puede ser eliminada debido a las limitaciones de la plataforma. Sin embargo, se puede llamar a la API con un arreglo vacío para limpiar los botones.

Los `buttons` es un arreglo de objetos `Button`:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - El icono que muestra la barra de herramientas de la vista previa.
  * `click` Función
  * `tooltip` String (opcional): el texto de la información sobre el botón.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

Los `flags` es una matriz que puede incluir siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Cuando se hace clic en el botón, la ventana de miniatura se cierra de inmediato.
* `nobackground` - No dibuja un borde del botón, usa solo la imagen.
* `hidden` - El botón no es mostrado al usuario.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - la región de la ventana

Establece la región de la ventana para mostrar como la vista previa de la imagen es mostrada cuando se pasa sobre la ventana en la barra de tareas. Puede restablecer la miniatura de la la ventana completa simplemente especificando una región vacía: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` Cadena

Configura la descripción emergente que se muestra cuando se pasa sobre la vista previa de la ventana en la barra de tareas.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (opcional) - El [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx) de Windows. Tiene que estar configurado, de lo contrario las otras opciones no tendrán efecto.
  * `appIconPath` String (opcional) - El [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx) de Windows.
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (opcional) - El [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx) de Windows.
  * `relaunchDisplayName` String (opcional) - El [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx) de Windows.

Establece las propiedades para el botón de la barra de herramientas de la ventana.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Es igual a `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `ícono` [NativeImage](native-image.md)

Cambia el icono de la ventana.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Establece si los botones de luz del tráfico de ventana deben estar visibles.

Esto no puede llamarse cuando `titleBarStyle` está configurado para ser `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Si la barra de menú ya es visible, llamar `setAutoHideMenuBar(true)` no la ocultará inmediatamente.

#### `win.isMenuBarAutoHide()`

Devuelve `Boolean` - Si la barra de menú se oculta o no automáticamente.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Devuelve `Boolean` - Si la barra de menú es visible o no.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (opcional)
  * `visibleOnFullScreen` Boolean (opcional) _macOS_ - Establece si la ventana debe ser visible encima de la ventanas de pantalla completas

Establece si la ventana debe ser visible o no en todos los espacios de trabajo.

**Nota:** Esta API no hace nada en Windows.

#### `win.isVisibleOnAllWorkspaces()`

Devuelve `Boolean` - Si la ventana es visible en todos los espacios de trabajo.

**Nota:** Esta API siempre devuelve false en Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (opcional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Solo se usa cuando `ignore` es verdadero. Si `ignore` es falso, el reenvío está simpre desactivado independientemente de este valor.

Hace que la ventana ignore todos los eventos del ratón.

Todos los eventos del ratón ocurridos en esta ventana se pasarán a la ventana debajo de esta ventana, pero si esta ventana esta enfocada, todavía recibirá los eventos del teclado.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Evita que los contenidos de la ventana sean capturados por otras aplicaciones.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _Windows_

* `focusable` Boolean

Cambia si se puede enfocar o no la ventana.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow

Establece `parent` como la ventana de la ventana principal actual. Al pasar `null` cambiará la ventana actual a una ventana de nivel superior.

#### `win.getParentWindow()`

Devuelve `BrowserWindow` - La ventana principal.

#### `win.getChildWindows()`

Devuelve `BrowserWindow[]` - Todas las ventanas secundarias.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Controla si se debe ocultar el cursor al escribir.

#### `win.selectPreviousTab()` _macOS_

Selecciona la pestaña previa cuando las pestañas nativas están activas y hay otras pestañas en la ventana.

#### `win.selectNextTab()` _macOS_

Selecciona la siguiente pestaña cuando las pestañas nativas están activas y hay otras pestañas en la ventana.

#### `win.mergeAllWindows()` _macOS_

Unifica todas las ventanas en una sola con múltiples pestañas cuando las pestañas nativas están activas y hay más de una ventana abierta.

#### `win.moveTabToNewWindow()` _macOS_

Mueve la pestaña actual a una nueva ventana si las pestañas nativas están activas y hay más de una pestaña en la ventana actual.

#### `win.toggleTabBar()` _macOS_

Conmuta la visibilidad de la barra de pestañas si las pestañas nativas están activas y hay solo una pestaña en la ventana actual.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Añade una ventana como pestaña de la ventana actual, después de la pestaña para la instancia de la ventana actual.

#### `win.setVibrancy(type)` _macOS_

* `type` String - Puede ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` o `ultra-dark`. Para más detalles, ver [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc).

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` _macOS_ _Experimental_

* `touchBar` TouchBar

Configura el plano de la touchBar para la ventana actual. Espeficando `null` o `undefined` elimina la barra táctil. Este método solo es efectivo si la máquina tiene una barra táctil y si se está ejecutando en macOS 10.12.1+.

**Nota:** Actualmente la API TouchBar es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md). Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

API de reemplazo para setBrowserView soporta el trabajo con múltiples vistas de navegador.

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Experimental_

Retorna un array de `BrowserView` que estuvo adjunto con addBrowserView o setBrowserView.

**Nota:** actualmente la API BrowserView es experimental y puede cambiar o ser eliminada en versiones futuras de Electron.

### Propiedades

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```
