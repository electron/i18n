# BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [principal](../glossary.md#main-process)</0>

```javascript
/// In the main process.
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

## Notas según la plataforma

* En macOS las ventanas modales se mostrarán como hojas adjuntas a la ventana principal.
* En macOS las ventanas secundarias mantendrán la posición relativa a la ventana principal cuando ésta se mueve, mientras que en Windows y Linux las ventanas secundarias no se moverán.
* En Linux el tipo de ventanas modales se cambiará a `dialog`.
* En Linux, muchos entornos de escritorio no admiten ocultar una ventana modal.

## Clase: BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [principal](../glossary.md#main-process)</0>

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
    * `partition` Cadena (opcional) - Configura la sesión utilizada por la página según la cadena de partición de la sesión. Si la `partition` empieza con `persist:`, la página utilizará una sesión persistente disponible para todas las páginas en la partición con la misma `partition`. Si no está el prefijo `persist:`, la página usara una sesión de la memoria interna. Al asignar la misma `partition`, las páginas múltiples pueden compartir la misma sesión. Default es la sesión por defecto.
    * `affinity` Cadena de caracteres (opcional): Cuando se especifica, las páginas web con la misma `affinity` se ejecutarán en el mismo proceso de renderizado. Nótese que debido a que se reutiliza el proceso de renderizado, ciertas opciones `webPreferences` también se compartirán entre las páginas web incluso si se especificaron valores diferentes para cada una de ellas, incluyendo pero no limitándose a `preload`, `sandbox` y`nodeIntegration`. Por lo tanto, se sugiere utilizar las mismas `webPreferences` para páginas web con la misma `affinity`. _Deprecated_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Por defecto es `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Por defecto es `true`.
    * `webSecurity` Boolean (opcional) - Cuando es `false`, desactivará la política de same-origin (por lo general se utiliza cuando la gente prueba los sitios web), y configurará `allowRunningInsecureContent`a `true` en caso de que estas opciones no hayan sido configuradas por el usuario. Por defecto es `true`.
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

* `event`
* `title` String
* `explicitSet` Boolen

Aparece cuando el documento cambia el título. Llamar `event.preventDefault()` evitará que el título de la ventana nativa cambie. `explicitSet` es falso cuando el título se sintetiza a partir de la URL del archivo.

#### Evento: "close"

Devuelve:

* `event`

Aparece cuando la ventana se va a cerrar. Se emite antes de el evento del DOM `beforeunload` y `unload`. Llamar a `event.preventDefault()` cancelará el cierre.

Generalmente se desea utilizar el controlador `beforeunload` para decidir si la ventana debería ser cerrada, el cual también será llamado cuando la ventada se vuelva a cargar. En Electron, devolver cualquier valor que no sea `undefined` cancelará el cierre. Por ejemplo:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false // equivalente a `return false` pero no es recomendado
}
```

_**Nota**: Hay una diferencia sutil entre el comportamiento de `window.onbeforeunload = handler` y `window.addEventListener('beforeunload', handler)`. Se recomienda siempre establecer el `event.returnValue` explícitamente, en lugar de devolver sólo un valor, ya que el primero funciona más consistentemente dentro de Electron._

#### Evento: "closed"

Emitted when the window is closed. Después de haber recibido este evento, debe eliminar la referencia a la ventana y evitar volverla a usar.

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

* `event`
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

* `event`
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

* `event`
* `isAlwaysOnTop` Boolean

Emitido cuando la ventana es configurada o no configurada para mostrarse siempre en la parte superior de las otras ventanas.

#### Evento: 'app-command' _Windows_ _Linux_

Devuelve:

* `event`
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

* `event`
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

El método subyacente a este evento esta construido para manejar el viejo estilo de desplazamiento del trackpad de macOS, donde el contenido de la pantalla no se mueve con el manotazo. La mayoría de los trackpads de macOS ya no están configurados para permitir este tipo de movimiento,  así que para emitir correctamente la preferencia 'Desplazamiento entre paginas' en `System Preferences > Trackpad > More Gestures` debe establecer a 'Desplazar con dos o tres dedos'.

#### Evento: 'rotate-gesture' _macOS_

Devuelve:

* `event`
* `rotation` Float

Emitido en el gesto de rotación del trackpad. Emitido continuamente hasta que el gesto de rotación se termine. El valor de `rotation` en cada emisión es el angulo en grado rotado desde la última emisión. El último evento emitido sobra un gesto de rotación siempre será el valor de `0`. Los valores de rotación en sentido contrario a las agujas del reloj son positivos, mientras que los del sentido de las agujas del reloj son Negativo.

#### Evento: "sheet-begin" _macOS_

Aparece cuando la ventana abre una hoja.

#### Evento: "sheet-end" _macOS_

Aparece cuando la ventana cierra una hoja.

#### Evento: "new-window-for-tab" _macOS_

Aparece cuando se hace clic al botón de nueva pestaña nativa.

#### Evento: 'system-context-menu' _Windows_

Devuelve:

* `event`
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

### Propiedades de la instancia

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

**Note:** Algunos métodos solo están disponibles en sistemas operativos específicos y son etiquetados como tal.

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
* `animate` Boolean (opcional) _macOS_

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

#### `win.isEnabled()`

Devuelce `Boolean` -si la ventana está activada.

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

* `resizable` Boolean

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

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opcional) _macOS_

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Por ejemplo:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.isTabletMode()` _Windows_

Returns `Boolean` - Whether the window is in Windows 10 tablet mode.

Since Windows 10 users can [use their PC as tablet](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet), under this mode apps can choose to optimize their UI for tablets, such as enlarging the titlebar and hiding titlebar buttons.

This API returns whether the window is in tablet mode, and the `resize` event can be be used to listen to changes to tablet mode.

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1324:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Función
  * `wParam` any - The `wParam` provided to the WndProc
  * `lParam` any - The `lParam` provided to the WndProc

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` _Windows_

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` _macOS_

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` _macOS_

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page. If the page is not visible, `rect` may be empty.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Object (opcional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
const url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

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
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Object (opcional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` String (optional) - The text of the button's tooltip.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The `flags` is an array that can include following `String`s:

* `enabled` - The button is active and available to the user.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Por defecto es `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (opcional)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows.
  * `skipTransformProcessType` Boolean (optional) _macOS_ - Calling setVisibleOnAllWorkspaces will by default transform the process type between UIElementApplication and ForegroundApplication to ensure the correct behavior. However, this will hide the window and dock for a short time every time it is called. If your window is already of type UIElementApplication, you can bypass this transformation by passing true to skipTransformProcessType.

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (opcional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_EXCLUDEFROMCAPTURE`. For Windows 10 version 2004 and up the window will be removed from capture entirely, older Windows versions behave as if `WDA_MONITOR` is applied capturing a black window.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Changes whether the window can be focused.

On macOS it does not remove the focus from the window.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` _macOS_

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` _macOS_

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` _macOS_

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` _macOS_

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` _macOS_

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` _macOS_

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the [macOS documentation][vibrancy-docs] for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons in frameless window.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The custom position for the traffic light buttons in frameless window.

#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.setTopBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Raises `browserView` above other `BrowserView`s attached to `win`. Throws an error if `browserView` is not attached to `win`.

#### `win.getBrowserViews()` _Experimental_

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
