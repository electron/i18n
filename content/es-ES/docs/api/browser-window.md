# BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [Main](../glossary.md#main-process)

```javascript
// In the main process.
const { BrowserWindow } = require (' Electron ')

const Win = New BrowserWindow ({ width: 800, height: 600 })

//cargar una URL remota
Win. loadURL (' https://github.com ')

//o cargar un archivo HTML local
Win. loadURL (' File://${__dirname}/app/index.html ')
```

## Ventana sin borde

Para crear una ventana sin usar chrome, o una vertana transparente de cualquier forma, puede usar la API [Frameless Window](frameless-window.md).

## Mostrar ventana con elegancia

Cuando se carga una pagina en la ventana directamente, los usuarios pueden ver la carga de la pagina de forma incremental, lo que no es una buena experiencia para una aplicación nativa. To make the window display without visual flash, there are two solutions for different situations.

## Usando el evento `ready-to-show`

Mientras se carga la página, se emitirá el evento `ready-to-show` cuando el proceso de renderizado haya procesado la página por primera vez si aún no se ha mostrado la ventana. Si se muestra la ventana despues de este evento, no tendrá fogonazos:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => {
  win.show()
})
```

Este evento generalmente se emite después del evento `did-finish-load`, pero para páginas con muchos recursos remotos, puede ser emitido antes del evento `did-finish-load`.

Por favor tenga en cuanta que usando este evento implica que el renderer será considerado "visible" y se pintara incluso si `show` es falso.  Este evento nunca se disparará si usa `paintWhenInitiallyHidden: false`

## Configurar `backgroundColor`

Para una aplicación compleja, el evento `ready-to-show` puede emitirse muy tarde, haciendo que la aplicación parezca lenta. En este caso, se recomienda mostrar la ventana inmediatamente, y usar un color de fondo `backgroundColor` parecido al color de fondo de la aplicación:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Tenga en cuenta que incluso para aplicaciones que utilizan el evento `ready-to-show`, aún se recomienda establecer `backgroundColor` para que la aplicación parezca más nativa.

## Ventana principal y ventana secundaria

Al usar la opción `parent`, se pueden crean ventanas secundarias:

```javascript
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

La ventana `child` se mostrará siempre por encima de la ventana `top`.

## Ventanas modales

Una ventana modal es una ventana secundaria que deshabilita la ventana principal, para crear una ventana modal, hay que establecer ambas opciones `parent` y `modal`:

```javascript
const { BrowserWindow } = require('electron')

const child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## La visibilidad de la página

La [Page Visibility API][page-visibility-api] funciona de la siguiente manera:

* En todas las plataformas, el estado de visibilidad identifica si la ventana está oculta/minimizada o si no lo está.
* Además, en macOS, el estado de visibilidad también indica el estado de oclusión de la ventana. Si la ventana esta tapada, es decir, completamente cubierta por otra ventana, el estado de visibilidad será `hidden`. En otras plataformas, el estado de visibilidad será `hidden` solo si la ventana esta minimizada o explícitamente oculta con `win.hide()`.
* Si se crea un `BrowserWindow` con `show: false`, el estado de visibilidad inicial será `visible` a pesar de que la ventana esté oculta realmente.
* Si `backgroundThrottling` está deshabilitado, el estado de visibilidad permanecerá `visible` incluso si la ventana está minimizada, tapada o oculta.

Se recomienda detener operaciones costosas cuando el estado de visibilidad está `hidden` con el fin de minimizar el consumo de energía.

## Noticias de plataforma

* En macOS las ventanas modales se mostrarán como hojas adjuntas a la ventana principal.
* En macOS las ventanas secundarias mantendrán la posición relativa a la ventana principal cuando ésta se mueve, mientras que en Windows y Linux las ventanas secundarias no se moverán.
* En Linux el tipo de ventanas modales se cambiará a `dialog`.
* En Linux, muchos entornos de escritorio no admiten ocultar una ventana modal.

## Clase: BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [Main](../glossary.md#main-process)

`BrowserWindow` es un [EventEmitter][event-emitter].

Crea una nueva `BrowserWindow` con propiedades nativas como las establecidas por las `options`.

### `new BrowserWindow([options])`

* `options` Object (opcional)
  * `width` Integer (opcional) - El ancho de la ventana en pixeles. Por defecto es `800`.
  * `height` Integer (opcional) - La altura de la ventana en pixeles. Por defecto es `600`.
  * `x` Integer (opcional) - (**required** si y es usado) Desplazamiento a la izquierda de la ventana de la pantalla. Por defecto es centrar en la ventana.
  * `y` Integer (opcional) - (**required** si x es usado) Desplazamiento superior de la ventana desde la pantalla. Por defecto es centrar en la ventana.
  * `useContentSize` Boolean (opcional) - `width` y `height` se utilizan como el tamaño de la página web. Esto significa que el tamaño actual de la ventana incluirá el tamaño del marco de la ventana y será un poco más grande. Por defecto es `false`.
  * `center` Boolean (opcional) - Muestra la ventana en el centro de la pantalla.
  * `minWidth` Integer (opcional) - Ancho mínimo de a ventana. Por defecto es `0`.
  * `minHeight` Integer (opcional) - Altura mínima de la ventana. Por defecto es `0`.
  * `maxWidth` Integer (opcional) - Ancho máximo de la ventana. Por defecto no hay limite.
  * `maxHeight` Integer (opcional) - Altura máxima de la ventana. Por defecto no hay limite.
  * `resizable` Boolean (opcional) - Si la ventana puede ser redimencionada. Por defecto es `true`.
  * `movable` Boolean (opcional) - Si la ventana puede ser movida. Esto no está implementado en Linux. Por defecto es `true`.
  * `minimizable` Boolean (opcional) - Si la ventana puede ser minimizada. Esto no está implementado en Linux. Por defecto es `true`.
  * `maximizable` Boolean (opcional) - Si la ventana puede ser maximizada. Esto no está implementado en Linux. Por defecto es `true`.
  * `closable` Boolean (opcional) - Si la ventana puede ser cerrada. Esto no está implementado en Linux. Por defecto es `true`.
  * `focusable` Boolean (opcional) - si la ventana se puede enfocar. Por defecto es `true`. En Windows, la configuración `focusable: false` también quiere decir que `skipTaskbar: true`. En Linux, la configuración `focusable: false` hace que la ventana deje de interactuar con wm, así la ventana siempre se mantendrá en la parte superior en todas las áreas de trabajo.
  * `alwaysOnTop` Boolean (opcional) - Si la ventana debería permanecer siempre por ensima de otras ventanas. Por defecto es `false`.
  * `fullscreen` Boolean(opcional) - si la ventana debería mostrarse en pantalla completa. Cuando se establece explícitamente `false` el botón de la pantalla completa estará oculta o deshabilitada en macOS. Por defecto es `false`.
  * `fullscreenable` Boolean (opcional) - si la ventana puede ponerse el modo pantalla completa. En macOS, también si el botón maximizar o acercarse debería alternar el modo pantalla completa o maximizar la ventana. Por defecto es `true`.
  * `simpleFullscreen` Boolean (opcional) - Usa pantalla completa pre-Lion en macOS. Por defecto es `false`.
  * `skipTaskbar` Boolean (opcional) - Si mostrar la ventana en la barra de tarea. Por defecto es `false`.
  * `kiosk` Boolean (opcional) - Si la ventana está en modo kiosk. Por defecto es `false`.
  * `title` String (opcional) - Titulo de la ventana por defecto. Por defecto es `"Electron"`. Si la etiqueta HTML `<title>` es definida en el archivo HTML cargado por `loadURL()`, esta propiedad será ignorada.
  * `icon` ([NativeImage](native-image.md) | String) (opcional) - El icono de la ventana. En Windows, se recomienda usar iconos `ICO` para obtener mejores efectos visuales. También se se puede dejar sin definir, de esta manera se utilizará el icono del ejecutable.
  * `show` Boolean (opcional) - Si la ventana debería ser mostrada cuando se crea. Por defecto es `true`.
  * `paintWhenInitiallyHidden` Boolean (opcional) - Si el renderer debería estar activo cuando `show` es `false` y recién ha sido creado.  Para que `document.visibilityState` funcione correctamente en la primera carga con `show: false` debería establecer esto a `false`.  Estableciendo esto a `false` causará que el evento `ready-to-show` no se dispare.  Por defecto es `true`.
  * `frame` Boolean (opcional) - Especifica `false` para crear un [Frameless Window](frameless-window.md). Por defecto es `true`.
  * `parent` BrowserWindow (opcional) - Especifica la ventana padre. Por defecto es `null`.
  * `modal` Boolean (opcional) - Si es una ventana modal. Esto sólo funciona cuando la ventana es una ventana hija. Por defecto es `false`.
  * `acceptFirstMouse` Boolean (opcional) - Si la vista web acepta un solo evento de mouse hacia abajo que activa simultáneamente la ventana. Por defecto es `false`.
  * `disableAutoHideCursor` Boolean (opcional) - Si ocultar el cursor cuando se está escriniendo. Por defecto es `false`.
  * `autoHideMenuBar` Boolean (opcional) - Auto ocultar la barra de menú a menos que la tecla `Alt` este presionada. Por defecto es `false`.
  * `enableLargerThanScreen` Boolean (opcional) - Permite que la ventana se redimensione mayor que la pantalla. Solo relevante para macOS, ya que los otros sistemas operativos permiten ventanas más grandes que la pantalla por defecto. Por defecto es `false`.
  * `backgroundColor` String (opcional) - El color de fondo de la Ventana como un valor hexadecimal, como `#66CD00` o `#FFF` o `#80FFFFFF` (alfa en formato #AARRGGBB es soportado si `transparent` es establecido a `true`). Por defecto es `#FFF` (blanco).
  * `hasShadow` Boolean (opcional) - Si la ventana debería tener una sombra. Por defecto es `true`.
  * `opacity` Number (opcional) - Establece la opacidad inicial de la ventana, entre 0.0 (totalmente transparente) y 1.0 (totalmente opaco). Esto sólo está implementado en Windows y macOS.
  * `darkTheme` Boolean (opcional) - Fuerza el uso del tema obscuro en la ventana, solo funciona en algunos entornos de escritorio GTK+3. Por defecto es `false`.
  * `transparent` Boolean (opcional) - Hace la ventana [tranparente](frameless-window.md#transparent-window). Por defecto es `false`. En Windows, no funciona a menos que la ventana sea sin marco.
  * `type` String (opcional) - El tipo de ventana, por defecto es una ventana normal. Vea más sobre esto a continuación.
  * `visualEffectState` String (opcional) - Especifica como la apariencia del material debe reflejar el estado de actividad de la ventana en macOS. Must be used with the `vibrancy` property. Los valores posibles son:
    * `followWindow` - The backdrop should automatically appear active when the window is active, and inactive when it is not. Este es el valor predeterminado.
    * `active` - The backdrop should always appear active.
    * `inactive` - The backdrop should always appear inactive.
  * `titleBarStyle` String (optional) - The style of window title bar. Por defecto es `default`. Los valores posibles son:
    * `default` - Es la barra de título gris opaca estándar de Mac.
    * `hidden` -Es una barra de título oculta y una ventana de tamaño completo. Sin embargo, la barra tiene los controles estándares de la ventana ("traffic lights") en la parte superior izquierda.
    * `hiddenInset` - Es una barra de título oculta con una apariencia alternativa donde los botones de traffic light están ligeramente mas insertados en el borde de la ventana.
    * `customButtonsOnHover` - Resulta en una barra de titulo oculta y en una ventana de contenido de tamaño completo, los botones del semáforo se mostrarán al pasar el cursor sobre la parte superior izquierda de la ventana.  **Note:** Esta opción es experimental actualmente.
  * `trafficLightPosition` [Point](structures/point.md) (opcional) - Establece una posición para los botones del semáforo en ventanas sin marco.
  * `roundedCorners` Boolean (opcional) - Si la ventana sin marco debería tener o no esquinas redondeadas macOS. Por defecto es `true`.
  * `fullscreenWindowTitle` Boolean (opcional) _Obsoleto_ - Muestra el título en la barra de título en el modo de pantalla completa en macOS para `hiddenInset` titleBarStyle. Por defecto es `false`.
  * `thickFrame` Boolean (opcional) - Utilice el estilo `WS_THICKFRAME` para ventanas sin marco en Windows, la cual agrega un marco de ventana estándar. Configurarlo en `false` eliminará la sombra de la ventana y las animaciones de la ventana. Por defecto es `true`.
  * `vibrancy` Cadena (opcional) - Añade un tipo de efecto de vibración a la ventana. Funciona solamente en macOS. Puede ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, o `under-page`. Please note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` are deprecated and have been removed in macOS Catalina (10.15).
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. Si es `true`, la ventana crecerá al ancho recomendado de la página web cuando se haga zoom. `false` hará que haga zoom hasta el ancho de la pantalla. Esto también afectará el comportamiento cuando se llama directamente `maximize()`. Por defecto es `false`.
  * `tabbingIdentifier` String (opcional) - Crea una pestaña del nombre del grupo. Permite abrir la ventana como una pestaña nativa en macOC 10.12+. Las ventanas con el mismo identificador de pestaña se agruparán juntos. Esto también añade un nuevo botón de pestañas nativo a la barra de pestañas de la ventana y permite que la `app` y la ventana reciban el evento `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * `devTools` Boolean (opcional) - Si se habilita el DevTools. Si se configura a `false`, no puede utilizarse `BrowserWindow.webContents.openDevTools()` para abrir DevTools. Por defecto es `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Por defecto es `false`.
    * `nodeIntegrationInWorker` Boolean (opcional) - Si la integración de nodos está habilitada en los trabajadores de la web. Por defecto es `false`. Se pueden encontrar más detalles en [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (opcional) - Opcion experimental para habilitar soporte Node.js en sub-frames como iframes y ventas hijos. Todos tus preloads cargarán por cada iframe, puedes usar `process.isMainFrame` para determinar si estás en el marco principal o no.
    * `preload` String (opcional) - Especifica un script que será cargado antes del otros scripts en la página. Este script siempre tendrá acceso al nodo APIs sin importar si la integración de nodos esté activada o no. El valor debería ser la ruta del archivo absoluto al script. Cuando la integración de nodos esta desactivada, la precarga del script puede reintroducir de vuelta al ámbito global los símbolos globales del Nodo. Ver ejemplo [aquí](context-bridge.md#exposing-node-global-symbols).
    * `sandbox` Boolean (opcional) - Si se configura, protegerá al renderizador asociado a la ventana, haciéndolo compatible con el sandbox de Chromium OS-level, deshabilitando el motor Node.js. Esto no es lo mismo que la opción de `nodeIntegration` y las APIs disponibles para el script de precarga son más limitadas. Leer más sobre la opción [aquí](../tutorial/sandbox.md).
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Por defecto es `false`.
    * `session` [Session](session.md#class-session) (opcional) - Configura la sesión usada por la página. En lugar de pasar directamente el objeto de la sesión, se puede optar por utilizar la opción de `partition`, la cual acepta una cadena de partición. Cuando se proporcionen `session` y `partition`, se preferirá `session`. Default es la sesión por defecto.
    * `partition` Cadena (opcional) - Configura la sesión utilizada por la página según la cadena de partición de la sesión. Si la `partition` empieza con `persist:`, la página utilizará una sesión persistente disponible para todas las páginas en la partición con la misma `partition`. Si no está el prefijo `persist:`, la página usara una sesión de la memoria interna. Por asignar el mismo `partition`, múltiples páginas podrán compartir la misma sesión. Default es la sesión por defecto.
    * `affinity` Cadena de caracteres (opcional): Cuando se especifica, las páginas web con la misma `affinity` se ejecutarán en el mismo proceso de renderizado. Nótese que debido a que se reutiliza el proceso de renderizado, ciertas opciones `webPreferences` también se compartirán entre las páginas web incluso si se especificaron valores diferentes para cada una de ellas, incluyendo pero no limitándose a `preload`, `sandbox` y`nodeIntegration`. Por lo tanto, se sugiere utilizar las mismas `webPreferences` para páginas web con la misma `affinity`. _Deprecated_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Por defecto es `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Por defecto es `true`.
    * `webSecurity` Booleano (opcional) - Cuando es `false`, deshabilitará la política de un mismo origen (por lo general se utiliza cuando la gente testea los sitios web), y configurará `allowRunningInsecureContent`a `true` en caso de que estas opciones no hayan sido configuradas por el usuario. Por defecto es `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Por defecto es `false`.
    * `images` Boolean (optional) - Enables image support. Por defecto es `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Por defecto es `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Por defecto es `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Por defecto es `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Por defecto es `false`.
    * `enableBlinkFeatures` String (opcional) - Una lista de cadenas de características separadas por `,`, para habilitar como `CSSVariables,KeyboardEventKey`. La lista completa de cadenas distintivas soportadas pueden encontrarse en el archivo [RuntimeEnabledFeatures.json5][runtime-enabled-features].
    * `disableblinkFeatures` String (opcional) - Una lista de cadenas distintivas separadas por `,`,como `CSSVariables,KeyboardEventKey` para deshabilitar. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5][runtime-enabled-features].
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
    * `contextIsolation` Boolean(opcional) - Para ejecutar las APIs de Electron y el script especificado `preload` en un contexto JavaScript independiente. Por defecto es `true`. The context that the `preload` script runs in will only have access to its own dedicated `document` and `window` globals, as well as its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.), which are all invisible to the loaded content. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used.  Esta opción utiliza la misa técnica usada por [Chrome Content Scripts][chrome-content-scripts].  You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
    * `worldSafeExecuteJavaScript` Boolean (optional) - If true, values returned from `webFrame.executeJavaScript` will be sanitized to ensure JS values can't unsafely cross between worlds when using `contextIsolation`. Por defecto es `true`. _Deprecated_
    * `nativeWindowOpen` Boolean (opcional) - Si se usa el nativo `window.open()`. Por defecto es `false`. Las ventanas hijas siempre tienen la integración con node desabilidata a menos que `nodeIntegrationInSubFrames` es true. **Note:** Esta opción es experimental actualmente.
    * `webviewTag` Boolean (opcional) - Si se habilita o no el [`<webview>` tag](webview-tag.md). Por defecto es `false`. **Nota:** El script `preload` configurado para el `<webview>`tendrá la integración de nodos habilitada cuando se ejecuta por lo que hay que asegurarse que el contenido remoto o posiblemente dañino no sea capaz de crear una etiqueta de `<webview>`con un script `preload` posiblemente malicioso. Puede utilizarse el evento `will-attach-webview` en [webContents](web-contents.md) para quitar el script `preload` y validar o alterar la configuración inicial de `<webview>`.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app.  Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Por defecto es `false`.
    * `safeDialogsMessage` String (opcional) - El mensaje a mostrar cuando la protección de diálogo consecutivo es lanzada. So no se define el mensaje por defecto sería utilizado, note que actualmente el mensaje por defecto esta en Inglés y no localizado.
    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. Por defecto es `false`.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Por defecto es `false`.
    * `autoplayPolicy` String (opcional) - Política de autoplay para aplicar al contenido en la ventana, puede ser `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Por defecto a `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. Esta cadena no es directamente visible para los usuarios.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Por defecto es `true`.
    * `enableWebSQL` Boolean (optional) - Whether to enable the [WebSQL api](https://www.w3.org/TR/webdatabase/). Por defecto es `true`.
    * `v8CacheOptions` String (optional) - Enforces the v8 code caching policy used by blink. Accepted values are
      * `none` - Disables code caching
      * `code` - Heuristic based code caching
      * `bypassHeatCheck` - Bypass code caching heuristics but with lazy compilation
      * `bypassHeatCheckAndEagerCompile` - Same as above except compilation is eager. Default policy is `code`.
    * `enablePreferredSizeMode` Boolean (optional) - Whether to enable preferred size mode. The preferred size is the minimum size needed to contain the layout of the document—without requiring scrolling. Enabling this will cause the `preferred-size-changed` event to be emitted on the `WebContents` when the preferred size changes. Por defecto es `false`.

Cuando se configura el tamaño máximo o mínimo de la ventana con `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, solo limita a los usuarios. No impide pasar de un tamaño que no sigue las restricciones de tamaño a`setBounds`/`setSize` o al constructor de `BrowserWindow`.

Los posibles valores y comportamientos de la opción `type` son dependientes de la plataforma. Los valores posibles son:

* En linux, los tipos posibles son `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* En macOS, los posibles tipos son `desktop`, `textured`.
  * El tipo `textured` añade una aspecto de tono metálico (`NSTexturedBackgroundWindowMask`).
  * El tipo `desktop` coloca la ventana en el nivel de la ventana de fondo de escritorio (`kCGDesktopWindowLevel - 1`). Tenga en cuenta que la ventana de escritorio no recibirá enfoque alguno, ni eventos del ratón o del teclado, pero se puede utilizar `globalShortcut` para recibir input con moderación.
* En Windows, el tipo posible es `toolbar`.

### Eventos de Instancia

Los objetos creados con `new BrowserWindow` emiten los siguientes eventos:

**Nota:** Algunos eventos sólo están disponibles en sistemas operativos específicos y se etiquetan como tal.

#### Evento: 'page-title-updated'

Devuelve:

* `event` Event
* `title` String
* `explicitSet` Boolen

Aparece cuando el documento cambia el título. Llamar `event.preventDefault()` evitará que el título de la ventana nativa cambie. `explicitSet` es falso cuando el título se sintetiza a partir de la URL del archivo.

#### Evento: "close"

Devuelve:

* `event` Event

Aparece cuando la ventana se va a cerrar. Se emite antes de el evento del DOM `beforeunload` y `unload`. Llamar a `event.preventDefault()` cancelará el cierre.

Generalmente se desea utilizar el controlador `beforeunload` para decidir si la ventana debería ser cerrada, el cual también será llamado cuando la ventada se vuelva a cargar. En Electron, devolver cualquier valor que no sea `undefined` cancelará el cierre. Por ejemplo:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false // equivalent to `return false` but not recommended
}
```

_**Nota**: Hay una diferencia sutil entre el comportamiento de `window.onbeforeunload = handler` y `window.addEventListener('beforeunload', handler)`. Se recomienda siempre establecer el `event.returnValue` explícitamente, en lugar de devolver sólo un valor, ya que el primero funciona más consistentemente dentro de Electron._

#### Evento: "closed"

Emitido cuando la ventana es cerrada. Después de haber recibido este evento, debe eliminar la referencia a la ventana y evitar volverla a usar.

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

Por favor tenga en cuanta que usando este evento implica que el renderer será considerado "visible" y se pintara incluso si `show` es falso.  Este evento nunca se disparará si usa `paintWhenInitiallyHidden: false`

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
* `newBounds` [Rectangle](structures/rectangle.md) - Tamaño de la ventana en que esta siendo redimensionada.

Emitido antes de que la ventana sea redimensionada. Llamar a `event.preventDefault()` evitará que la ventana sea redimensionada.

Tenga en cuenta que esto solo es emitido cuando la venta está siendo redimensionada de forma manual. Redimensionar la ventana con `setBounds`/`setSize` no emitirá este evento.

#### Evento: "resize"

Emitido después que la ventana se haya redimensionada.

#### Evento: 'resized' _macOS_ _Windows_

Emitted once when the window has finished being resized.

This is usually emitted when the window has been resized manually. On macOS, resizing the window with `setBounds`/`setSize` and setting the `animate` parameter to `true` will also emit this event once resizing has finished.

#### Evento: 'will-move' _macOS_ _Windows_

Devuelve:

* `event` Event
* `newBounds` [Rectangle](structures/rectangle.md) - Ubicación a la que se está moviendo la ventana.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Tenga en cuenta que esto solo es emitido cuando la venta está siendo redimensionada de forma manual. Redimensionar la ventana con `setBounds`/`setSize` no emitirá este evento.

#### Evento: "move"

Aparece cuando la ventana se mueve a una nueva posición.

#### Evento: 'moved' _macOS_ _Windows_

Aparece solo una vez cuando la ventana se mueve a una nueva posición.

__Note__: En macOS este evento es un alias de `move`.

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
const win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

Los siguientes comandos de aplicación están explícitamente soportados en Linux:

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

El método subyacente a este evento esta construido para manejar el viejo estilo de desplazamiento del trackpad de macOS, donde el contenido de la pantalla no se mueve con el manotazo. La mayoría de los trackpads de macOS ya no están configurados para permitir este tipo de movimiento,  así que para emitir correctamente la preferencia 'Desplazamiento entre paginas' en `System Preferences > Trackpad > More Gestures` debe establecer a 'Desplazar con dos o tres dedos'.

#### Evento: 'rotate-gesture' _macOS_

Devuelve:

* `event` Event
* `rotation` Float

Emitido en el gesto de rotación de trackpad. Continuamente emitido hasta que el gesto de rotación se termine. El valor `rotation` en cada emisión es el angulo rotado en grado desde la última emisión. El último evento emitido sobre un gesto de rotación será siempre de valor `0`. Los valores de rotación en sentido antihorario son positivos, mientras que los valores de rotación en sentido horario son negativos.

#### Evento: "sheet-begin" _macOS_

Aparece cuando la ventana abre una hoja.

#### Evento: "sheet-end" _macOS_

Aparece cuando la ventana cierra una hoja.

#### Evento: 'new-window-for-tab' _macOS_

Aparece cuando se hace clic al botón de nueva pestaña nativa.

#### Evento: 'system-context-menu' _Windows_

Devuelve:

* `event` Event
* `point` [Point](structures/point.md) - Las coordenadas de la pantalla del menú contextual que fue activado en

Emitido cuando el menú contextual del sistema es activado en la ventana, esto normalmente solo es activado cuando el usuario hace click derecho en el área que no es del cliente de la ventana.  Esto es la barra de titulo de la ventana o cualquier área que haya declarado como `-webkit-app-region: drag` en una ventana sin marco.

Llamando a `event.preventDefault()` evitara que el menú sea mostrado.

### Métodos Estáticos

La clase `BrowserWindow` tiene los siguientes métodos estáticos:

#### `BrowserWindow.getAllWindows()`

Devuelve `BrowserWindow[]`- Un arreglo de todas las ventanas abiertas del navegador.

#### `BrowserWindow.getFocusedWindow()`

Devuelve `BrowserWindow | null` - La ventana que es enfocada en esta aplicación, de lo contrario devuelve `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Devuelve `BrowserWindow | null` - La ventana a que pertenece el `webContents` indicado o `null` si los contenidos no son propiedad de una ventana.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Devuelve `BrowserWindow | null` - La ventana que posee el `browserView` dado. Si la vista dada no esta adjunta a ninguna ventana, devuelve `null`.

#### `BrowserWindow.fromId(id)`

* `id` Íntegro

Devuelve `BrowserWindow | null` -La ventana con la `id` especificada.

### Propiedades de Instancia

Los objetos creados con `new BrowserWindow` tienen las siguientes propiedades:

```javascript
const { BrowserWindow } = require('electron')
// In this example `win` is our instance
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _SoloLectura_

Un objeto `WebContents` que esta ventana posse. Toda página web relacionada eventos y operaciones se realizarán a través de ella.

Consulte la [documentation `webContents`](web-contents.md) de sus métodos y eventos.

#### `win.id` _SoloLectura_

Una propiedad `Integer` representando el identificador único de la ventana. Cada ID es único entre todas las instancias `BrowserWindow` de toda la aplicación Electron.

#### `win.autoHideMenuBar`

Una propiedad `Boolean` que determina si la barra de menú de la ventana debe ocultarse automáticamente. Una vez activada, la barra de menú sólo se mostrará cuando los usuarios presionen la tecla `Alt`.

Si el menu bar ya está visible, estableciendo esta propiedad a `true` no lo ocultará inmediatamente.

#### `win.simpleFullScreen`

A `Boolean` property that determines whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.fullScreen`

A `Boolean` property that determines whether the window is in fullscreen mode.

#### `win.visibleOnAllWorkspaces`

A `Boolean` property that determines whether the window is visible on all workspaces.

**Note:** Always returns false on Windows.

#### `win.shadow`

A `Boolean` property that determines whether the window has a shadow.

#### `win.menuBarVisible` _Windows_ _Linux_

A `Boolean` property that determines whether the menu bar should be visible.

**Note:** If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.kiosk`

A `Boolean` property that determines whether the window is in kiosk mode.

#### `win.documentEdited` _macOS_

A `Boolean` property that specifies whether the window’s document has been edited.

The icon in title bar will become gray when set to `true`.

#### `win.representedFilename` _macOS_

A `String` property that determines the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.title`

A `String` property that determines the title of the native window.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.minimizable`

Una propiedad `Boolean` que determina si la ventana puede ser minimizada manualmente por el usuario.

En Linux el setter no es operativo, a pesar de que el getter devuelve `true`.

#### `win.maximizable`

Una propiedad `Boolean` que determina si la ventana puede ser maximizada manualmente por el usuario.

En Linux el setter no es operativo, a pesar de que el getter devuelve `true`.

#### `win.fullScreenable`

Una propiedad `Boolean` que determina si los botones de la ventana maximizar/ampliar alterna el modo de pantalla completa o maximiza la ventana.

#### `win.resizable`

Una propiedad `Boolean` que determina si la ventana puede ser redimencionada manualmente por el usuario.

#### `win.closable`

Una propiedad `Boolean` que determina si la ventana puede ser cerrada manualmente por el usuario.

En Linux el setter no es operativo, a pesar de que el getter devuelve `true`.

#### `win.movable`

Una propiedad `Boolean` que determina si la ventana puede ser movida por el usuario.

En Linux el setter no es operativo, a pesar de que el getter devuelve `true`.

#### `win.excludedFromShownWindowsMenu` _macOS_

Una propiedad `Boolean` que determina si la ventana es excluida o no del menu Windows de la aplicación. `false` por defecto.

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

#### `win.accessibleTitle`

A `String` property that defines an alternative title provided only to accessibility tools such as screen readers. Esta cadena no es directamente visible para los usuarios.

### Métodos de Instancia

Los objetos creados con `new BrowserWindow` tienen los siguientes métodos de instancia:

**Note:** Algunos métodos solo están disponibles es sistemas operativos específicos y son etiquetados como tal.

#### `win.destroy()`

Al forzar el cierre de una ventana, el evento `unload` y `beforeunload` no se emitirá en la página web. El evento `close` tampoco se emitirá en la ventana, pero es seguro que el evento `closed` sí será emitido.

#### `win.close()`

Trate de cerrar la ventana. Esto tiene el mismo efecto que un usuario pulsando manualmente el botón cerrar de la ventana. The web page may cancel the close though. Ver el [close event](#event-close).

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

Maximiza la ventana. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Sale del estado maximizado de la ventana.

#### `win.isMaximized()`

Devuelve `Boolean` - Si la ventana está maximizada.

#### `win.minimize()`

Minimiza la ventana. On some platforms the minimized window will be shown in the Dock.

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

Simple fullscreen mode emulates the native fullscreen behavior found in versions of macOS prior to Lion (10.7).

#### `win.isSimpleFullScreen()` _macOS_

Devuelve `Boolean` - Si la ventana está en modo simple de pantalla completa (pre-Lion).

#### `win.isNormal()`

Devuelve `Boolean` - Si la ventana esta en estado normal (no maximizada, no minimizada, no en el modo de pantalla completa).

#### `win.setAspectRatio(aspectRatio[, extraSize])`

* `aspectRatio` Flotador - La relación de aspecto para mantener parte de la vista de contenido.
* `extraSize` [Size](structures/size.md) (optional) _macOS_ - The extra size not to be included while maintaining the aspect ratio.

Esto hará que la ventana mantenga una relación de aspecto. El tamaño extra permite al desarrollador tener espacio especificado en píxeles, el cual no está incluido dentro de los cálculos de la relación de aspecto. Esta API ya toma en cuenta la diferencia entre el tamaño de la ventana y el tamaño del contenido.

Considere una ventana normal con un reproductor de video HD y los controles asociados. Quizá hay 15 pixeles de controles en el borde izquierdo, 25 pixeles de control en el borde derecho y 50 pixeles de control bajo el reproductor. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and
{ width: 40, height: 50 }. En el segundo argumento no importa donde están la anchura extra ni altura extra dentro de la vista del contenido, solo importa que existan. Suma cualquier áreas de ancho y alto adicionales que tengas dentro de la vista de contenido general.

The aspect ratio is not respected when window is resized programmingly with APIs like `win.setSize`.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Color de fondo de la ventana como un valor hexadecimal, como `#66CD00` o `#FFF` o `#80FFFFFF` (alpha es soportada si `transparent` es `true`). Por defecto es `#FFF` (blanco).

Establece el color de fondo de la ventana. Ver [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` Cadena - La ruta de acceso absoluta al archivo para vista previa con QuickLook. Esto es importante a medida que Quick Look utiliza el nombre del archivo y la extensión del archivo en la ruta para determinar el tipo de contenido del archivo que se va a abrir.
* `displayName` Cadena (opcional) - El nombre del archivo a mostrar en la vista modal de Quick Look. Esto es puramente visual y no afecta el tipo de contenido del archivo. Por defecto es `path`.

Utiliza [Quick Look][quick-look] para previsualizar un archivo de una ruta determinada.

#### `win.closeFilePreview()` _macOS_

Cierra el panel actual de [Quick Look][quick-look].

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Booleano (opcional) _macOS_

Redimensiona y mueve la ventana a los límites proporcionados. Cualquier propiedad que no se proporcione tendrá sus valores actuales por defecto.

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

#### `win.getBackgroundColor()`

Returns `String` - Gets the background color of the window. Ver [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Booleano (opcional) _macOS_

Redimensiona y mueve el área del cliente de la ventana (por ejemplo, la página web) hasta los límites proporcionados.

#### `win.getContentBounds()`

Retorna [`Rectangle`](structures/rectangle.md) - El `bounds` del área del cliente de la ventana como `Object`.

#### `win.getNormalBounds()`

Devuelve [`Rectangle`](structures/rectangle.md) - Contiene los limites del estado normal de la ventana

**Note:** si el estado actual de la ventana: maximizado, minimizado en el pantalla completa, esta función siempre devuelve la posición y tamaño de la ventana en estado normal. En estado normal, getBounds y getNormalBounds el mismo [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Habilita o deshabilita la ventana.

#### `win.isEnabled()`

Devuelce `Boolean` -si la ventana está activada.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `alto` Integer
* `animate` Booleano (opcional) _macOS_

Cambia el tamaño de la ventana a `width` y `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Devuelve `Integer[]` - Contiene la anchura y altura de la ventana.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `alto` Integer
* `animate` Booleano (opcional) _macOS_

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

Sets whether the window can be manually resized by the user.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by the user.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. En Linux no hace nada.

#### `win.isMovable()` _macOS_ _Windows_

Devuelve `Boolean` - Si la ventana puede ser movida por el usuario.

En Linux siempre devuelve `true`.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. En Linux no hace nada.

#### `win.isMinimizable()` _macOS_ _Windows_

Returns `Boolean` - Whether the window can be manually minimized by the user.

En Linux siempre devuelve `true`.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. En Linux no hace nada.

#### `win.isMaximizable()` _macOS_ _Windows_

Devuelve `Boolean` - Si la ventana puede ser maximizada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. En Linux no hace nada.

#### `win.isClosable()` _macOS_ _Windows_

Devuelve `Boolean` - Si la ventana puede ser o no cerrada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (opcional) _macOS_ _Windows_ - Valores incluyen `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, y ~~`dock`~~ (Obsoleto). Por defecto es `floating` cuando `flag` es true. El `level` se restablece a `normal` cuando la bandera es false. Tenga en cuenta que desde `floating` a `status` incluido, la venta está colocada debajo del Dock en macOS y debajo de la barra de tarea en Windows. Desde `pop-up-menu` a un superior se muestra sobre el Dock en macOS y sobre la barra de tareas en Windows. Vea la [macOS docs][window-levels] para más detalles.
* `relativeLevel` Integer (opcional) _macOS_ - El número de capas más alto para configurar esta ventana con respecto al `level` determinado. Por defecto es `0`. Tenga en cuenta que Apple desalienta establecer niveles superiores a 1 sobre `screen-saver`.

Sets whether the window should show always on top of other windows. Después de configurar esto, la ventana seguirá siendo una ventana normal, y no una ventana de herramientas que no puede enfocarse.

#### `win.isAlwaysOnTop()`

Devuelve `Boolean` - Si la ventana está siempre sobre las otras ventanas.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. Por ejemplo "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

#### `win.moveTop()`

Mover ventana a la parte superior(z-order) independientemente del enfoque

#### `win.center()`

Mueve la ventana al centro de la pantalla.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Booleano (opcional) _macOS_

Mueve la ventana a `x` y `y`.

#### `win.getPosition()`

Devuelve `Integer[]` - Contiene la posición actual de la ventana.

#### `win.setTitle(title)`

* `title` String

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
const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
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

Entra / sale del modo Kiosko.

#### `win.isKiosk()`

Devuelve `Boolean` - Si la ventana está o no en modo kiosco.

#### `win.isTabletMode()` _Windows_

Returns `Boolean` - Whether the window is in Windows 10 tablet mode.

Since Windows 10 users can [use their PC as tablet](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet), under this mode apps can choose to optimize their UI for tablets, such as enlarging the titlebar and hiding titlebar buttons.

This API returns whether the window is in tablet mode, and the `resize` event can be be used to listen to changes to tablet mode.

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. Por ejemplo "window:1324:0".

Más específicamente el formato es `window:id:other_id` donde `id` es `HWND` en Windows, `CGWindowID` (`uint64_t`) en macOS y `Window` (`unsigned long`) en Linux. `other_id` es usado para identificar contenidos webs (pestañas) así dentro de la misma ventana de nivel superior.

#### `win.getNativeWindowHandle()`

Devuelve `Buffer` - El controlador específico de la plataforma de la ventana.

El tipo nativo del controlador en Windows es `HWND`, en macOS `NSView*` y en Linux `Window` (`unsigned long`).

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Función
  * `wParam` any - El `wParam` proveído al WndProc
  * `lParam` any - El `lParam` proveído al WndProc

Engancha una ventana de mensaje. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Devuelve `Boolean` - `true` o `false` dependiendo de si el mensaje esta anclado o no.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Desancla el mensaje de la ventana.

#### `win.unhookAllWindowMessages()` _Windows_

Desancla todos los mensajes de la ventana.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

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

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - Los límites para capturar

Devuelve `Promise<NativeImage>` - Resuelve con el un [NativeImage](native-image.md)

Captura una foto instantánea de la página dentro de `rect`. Omitiendo `rect` capturará toda la página visible. Si la página no es visible, `rect` puede estar vacía.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (opcional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (opcional) - Una URL de referencia HTTP.
  * `userAgent` String (opcional) - Un agente de usuario originando la solicitud.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n"
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (opcional) - URL base (con separador de ruta final) para archivos a ser cargados por el data URL. Esto solo es necesario si la `url` especificada es una data URL y necesita cargar otros archivos.

Devuelve `Promise<void>` - la promesa sera resolvida cuando la página haya finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y será rechazada si la pagina falla al cargar (mira [`did-fail-load`](web-contents.md#event-did-fail-load)).

Igual que [`webContents.loadURL(url[, opciones])`](web-contents.md#contentsloadurlurl-options).

El `url` puede ser una dirección remota (por ejemplo `http://`) o una de un archivo locar HTML utilizando el protocolo `file://`.

Para garantizar que los URLs del archivo estén adecuadamente formateados, se recomienda utilizar el método [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) del Nodo:

```javascript
const url = require('url').format({
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
  * `query` Record<String, String> (opcional) - Pasado a `url.format()`.
  * `search` String (opcional) - Pasado a `url.format()`.
  * `hash` String (opcional) - Pasado a `url.format()`.

Devuelve `Promise<void>` - la promesa sera resolvida cuando la página haya finalizado de cargar (mira [`did-finish-load`](web-contents.md#event-did-finish-load)), y será rechazada si la pagina falla al cargar (mira [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  Ver la documentación `webContents` para más información.

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
  * `mode` String _Windows_ - Mode for the progress bar. Puede ser `none`, `normal`, `indeterminate`, `error` o `paused`.

Establece el valor del progreso en el progress bar. Rango valido es [0, 1.0].

Elimina la barra de progreso cuando el progreso es < 0; cambia a modo indeterminado cuando el progreso es >1.

En la plataforma Linux, solo es compatible con el environment de escritorio Unity. Se necesita especificar el nombre del archivo `*.desktop` en el campo `desktopName` dentro de `package.json`. Por defecto, será asumido `{app.name}.desktop`.

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

Establece la opacidad de la ventana. En Linux no hace nada. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Devuelve `number` - entre 0.0 (completamente transparente) y 1.0 (totalmente opaco). En Linux, siempre devuelve 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Establecer una forma de ventana determina el área dentro de la ventana donde el sistema permite dibujar y interactuar con el usuario. Fuera de la región dada, no se dibujarán píxeles y no se registrarán eventos del ratón. Los eventos del ratón fuera de la región no será recibida por esa ventana, pero pasará a lo que esté detrás de la misma.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Devuelve `Boolean` - Si los botones se añadieron o no exitosamente

Añade la barra de herramientas de la vista previa con una configuración específica de los botones para la imagen previsualizada de una ventana en el plano del botón en la barra de tareas. Devuelve un objeto `Boolean` e indica si la previsualización se ha agregado con éxito.

El número de botones en la barra de herramientas de la vista previa no debe ser mayor que 7 debido al limitado espacio. Una vez que se configura la barra de herramientas de la vista previa, la barra de tareas no puede ser eliminada debido a las limitaciones de la plataforma. Sin embargo, se puede llamar a la API con un arreglo vacío para limpiar los botones.

Los `buttons` es un arreglo de objetos `Button`:

* Objeto `Button`
  * `icon` [NativeImage](native-image.md) - El icono que muestra la barra de herramientas de la vista previa.
  * `click` Function
  * `tooltip` String (opcional): el texto de la información sobre el botón.
  * `flags` String[] (opcional) - Controla los estados y comportamientos específicos del botón. Por defecto, es `['enabled']`.

Los `flags` es una matriz que puede incluir siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - El botón está deshabilitado. Está presente, pero tiene un estado visual indicando que no responderá a la acción del usuario.
* `dismissonclick` - Cuando se hace clic en el botón, la ventana de miniatura se cierra de inmediato.
* `nobackground` - No dibuja un borde del botón, usa solo la imagen.
* `hidden` - El botón no es mostrado al usuario.
* `noninteractive` - El botón está habilitado pero no es interactivo; no se dibuja el estado del botón pulsado. Este valor está destinado a instancias donde el botón se utiliza en una notificación.

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
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Por defecto es `0`.
  * `relaunchCommand` String (opcional) - El [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx) de Windows.
  * `relaunchDisplayName` String (opcional) - El [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx) de Windows.

Establece las propiedades para el botón de la barra de herramientas de la ventana.

**Note:** `relaunchCommand` y `relaunchDisplayName` siempre deben ser establecidos juntos. Si una de esas propiedades no está establecida, entonces ninguna será usada.

#### `win.showDefinitionForSelection()` _macOS_

Es igual a `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Cambia el icono de la ventana.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Establece si los botones de luz del tráfico de ventana deben estar visibles.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Establece si el menu bar de la ventana debe ocultarse a si misma automáticamente o no. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Devuelve `Boolean` - Si la barra de menú se oculta o no automáticamente.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Establece si la barra de menú debe estar visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Devuelve `Boolean` - Si la barra de menú es visible o no.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (opcional)
  * `visibleOnFullScreen` Boolean (opcional) _macOS_ - Establece si la ventana debe ser visible encima de la ventanas de pantalla completas.
  * `skipTransformProcessType` Boolean (opcional) _macOS_ - Llamando a setVisibleOnAllWorkspaces por defecto transformará el tipo de proceso entre UIElementApplication y ForegroundApplication para asegurar el comportamiento correcto. Sin embargo, esto ocultará la ventana y el dock por un tiempo corto cada vez que es llamado. Si su ventana ya es de tipo UIElementApplication, puede saltarse esta tranformación pasando true a skipTransformProcessType.

Establece si la ventana debe ser visible o no en todos los espacios de trabajo.

**Nota:** Esta API no hace nada en Windows.

#### `win.isVisibleOnAllWorkspaces()`

Devuelve `Boolean` - Si la ventana es visible en todos los espacios de trabajo.

**Nota:** Esta API siempre devuelve false en Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (opcional)
  * `forward` Boolean (opcional) _macOS_ _Windows_ - Si es true, enviá el mensaje de movimiento de mouse a Chromium, permitiendo eventos relacionados tal como `mouseleave`. Solo se usa cuando `ignore` es verdadero. Si `ignore` es falso, el reenvío está simpre desactivado independientemente de este valor.

Hace que la ventana ignore todos los eventos del ratón.

Todos los eventos del ratón ocurridos en esta ventana se pasarán a la ventana debajo de esta ventana, pero si esta ventana esta enfocada, todavía recibirá los eventos del teclado.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Evita que los contenidos de la ventana sean capturados por otras aplicaciones.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_EXCLUDEFROMCAPTURE`. For Windows 10 version 2004 and up the window will be removed from capture entirely, older Windows versions behave as if `WDA_MONITOR` is applied capturing a black window.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Cambia si se puede enfocar o no la ventana.

En macOS no elimina el foco de la ventana.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

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

* `type` String | null - Puede ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, o `under-page`. Para más detalles, ver [macOS documentation][vibrancy-docs].

Añade un efecto de vibración a la ventana del navegador. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note que `appearance-based`, `light`, `dark`, `medium-light`, y `ultra-dark` han sido marcadas como obsoletas y serán eliminadas un un próxima versión de macOS.

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Punto](structures/point.md)

Establece una posición personalizada para los botones del semáforo en la ventana sin marco.

#### `win.getTrafficLightPosition()` _macOS_

Devuelve `Point` - La posición personalizada para los botones del semáforo en la ventana sin marco.

#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | null

Configura el plano de la touchBar para la ventana actual. Espeficando `null` o `undefined` elimina la barra táctil. Este método solo es efectivo si la máquina tiene una barra táctil y si se está ejecutando en macOS 10.12.1+.

**Nota:** La API TouchBar API actualmente es experimental y puede cambiar o ser eliminada en futuras versiones de Electron.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - Adjunta `browserView` a `win`. Si hay otros `BrowserView`s adjuntos, se eliminarán de esta ventana.

#### `win.getBrowserView()` _Experimental_

Devuelve `BrowserView | null` - El `BrowserView` adjunto a `win`. Devuelve `null` si uno no esta adjunto. Lanza un error si múltiples `BrowserView` son adjuntos.

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

API de reemplazo para setBrowserView soporta el trabajo con múltiples vistas de navegador.

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.setTopBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Levanta un `browserView` sobre otro `BrowserView` adjunto a `win`. Lanza un error si `browserView` no está adjunto a `win`.

#### `win.getBrowserViews()` _Experimental_

Devuelve `BrowserView[]` - Un array de todos los BrowserViews que han sido adjuntados con `addBrowserView` or `setBrowserView`.

**Nota:** actualmente la API BrowserView es experimental y puede cambiar o ser eliminada en versiones futuras de Electron.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
