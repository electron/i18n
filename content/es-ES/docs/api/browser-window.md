# BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [Main](../glossary.md#main-process)

```javascript
// En el proceso principal.
const {BrowserWindow} = require('electron')

// O usa "remote" desde el proceso de renderizado.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
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
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Este evento generalmente se emite después del evento `did-finish-load`, pero para páginas con muchos recursos remotos, puede ser emitido antes del evento `did-finish-load`.

### Configurar `backgroundColor`

Para una aplicación compleja, el evento `ready-to-show` puede emitirse muy tarde, haciendo que la aplicación parezca lenta. En este caso, se recomienda mostrar la ventana inmediatamente, y usar un color de fondo `backgroundColor` parecido al color de fondo de la aplicación:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Tenga en cuenta que incluso para aplicaciones que utilizan el evento `ready-to-show`, aún se recomienda establecer `backgroundColor` para que la aplicación parezca más nativa.

## Ventana principal y ventana secundaria

Al usar la opción `parent`, se pueden crean ventanas secundarias:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

La ventana `child` se mostrará siempre por encima de la ventana `top`.

### Ventanas modales

Una ventana modal es una ventana secundaria que deshabilita la ventana principal, para crear una ventana modal, hay que establecer ambas opciones `parent` y `modal`:

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
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
* En Windows no se admite cambiar la ventana principal dinámicamente.
* En Linux el tipo de ventanas modales se cambiará a `dialog`.
* En Linux, muchos entornos de escritorio no admiten ocultar una ventana modal.

## Clase: BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [Main](../glossary.md#main-process)

`BrowserWindow` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Crea una nueva `BrowserWindow` con propiedades nativas como las establecidas por las `options`.

### `new BrowserWindow([options])`

* `options` Object (opcional) 
  * `width` Integer (opcional) - ancho de la ventana en píxeles. El valor por defecto es `800`.
  * `height` Integer (opcional) - altura de la ventana en píxeles. El valor por defecto es `600`.
  * `x` Integer (opcional) (**requerido** si se utiliza y) - distancia a la izquierda respecto la pantalla. Valor por defecto centrará la ventana.
  * `y` Integer (opcional) (**necesario** si se utiliza x) - el offset de arriba de la ventana respecto la pantalla. Por defecto la ventana es centrada.
  * `useContentSize` Boolean (opcional) - `width` y `height` se utilizan como el tamaño de la página web. Esto significa que el tamaño actual de la ventana incluirá el tamaño del marco de la ventana y será un poco más grande. Por defecto es `false`.
  * `center` Boolean (opcional) - Muestra la ventana en el centro de la pantalla.
  * `minWidth` Integer (opcional) - La anchura mínima de la ventana. Por defecto es ``.
  * `minHeight` Integer (opcional) - La altura mínima de la ventana. Por defecto es ``.
  * `maxWidth` Integer (opcional) - La anchura máxima de la ventana. No tiene límites por defecto.
  * `maxHeight` Integer (opcional) - La altura máxima de la ventana. No tiene límites por defecto.
  * `resizable` Boolean (opcional) - si la ventana es redimensionable. Por defecto es `true`.
  * `movable` Boolean (opcional) - si la ventana es movible. Esto no esta implementado en Linux. Por defecto es `true`.
  * `minimizable` Boolean (opcional) - si la ventana se minimiza. Esto no está implementado en Linux. Por defecto es `true`.
  * `maximizable` Boolean (opcional) - si la ventana se máximiza. Esto no está implementado en Linux. Por defecto es `true`.
  * `closable` Boolean (opcional) - si la ventana se cierra. Esto no esta implementado en Linux. Por defecto es `true`.
  * `focusable` Boolean (opcional) - si la ventana se puede enfocar. Por defecto es `true`. En Windows, la configuración `focusable: false` también quiere decir que `skipTaskbar: true`. En Linux, la configuración `focusable: false` hace que la ventana deje de interactuar con wm, así la ventana siempre se mantendrá en la parte superior en todas las áreas de trabajo.
  * `alwaysOnTop` Boolean (opcional) - si la ventana debería estar siempre por encima de otras ventanas. Por defecto es `false`.
  * `fullscreen` Boolean(opcional) - si la ventana debería mostrarse en pantalla completa. Cuando se establece explícitamente `false` el botón de la pantalla completa estará oculta o deshabilitada en macOS. Por defecto es `false`.
  * `fullscreenable` Boolean (opcional) - si la ventana puede ponerse el modo pantalla completa. En macOS, también si el botón maximizar o acercarse debería alternar el modo pantalla completa o maximizar la ventana. Por defecto es `true`.
  * `simpleFullscreen` Boolean (opcional) - Usa el modo pantalla completa pre-Lion en macOS. Por defecto es `false`.
  * `skipTaskbar` Boolean (opcional) - si se va a mostrar la ventana en la barra de tareas. Por defecto es `false`.
  * `kiosk` Boolean (opcional) - El modo kiosco. Por defecto es `false`.
  * `title` String (opcional) - Título de la ventana por defecto. Por defecto es `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (opcional) - El icono de la ventana. En Windows, se recomienda usar iconos `ICO` para obtener mejores efectos visuales. También se se puede dejar sin definir, de esta manera se utilizará el icono del ejecutable.
  * `show` Boolean (opcional) - si la ventana debería ser mostrada cuando es creada. Por defecto es `true`.
  * `frame` Boolean (opcional) - Especifica `false` para crear una [Frameless Window](frameless-window.md). Por defecto es `true`.
  * `parent` BrowserWindow (opcional) - Especifica la ventana principal. Por defecto es `null`.
  * `modal` Boolean (opcional) - si esta es una ventana modal. Esto solo funciona si la ventana es una ventana secundaria. Por defecto es `false`.
  * `acceptFirstMouse` Boolean (opcional) - Si la vista web acepta un único evento mouse-down que activa simultáneamente la ventana. Por defecto es `false`.
  * `disableAutoHideCursor` Boolean (opcional) - si se oculta el cursor al escribir. Por defecto es `false`.
  * `autoHideMenuBar` Boolean (opcional) - Oculta automáticamente la barra de menú a menos que se presione la tecla `Alt`. Por defecto es `false`.
  * `enableLargerThanScreen` Boolean (opcional) - Permite que el tamaño de la ventana sea más grande que la pantalla. Por defecto es `false`.
  * `backgroundColor` String (opcional) - Color de fondo de la ventana en hexadecimal, como `#66CD00` o `#FFF` o `#80FFFFFF` (se soporta el canal alpha). Por defecto es `#FFF` (blanco).
  * `hasShadow` Boolean (opcional) - Si la ventana debería tener sombra. Esto solo es implementado en macOS. Por defecto es `true`.
  * `opacity` Number (opcional) - Establece la opacidad inicial de la ventana, entre 0.0 (completamente transparente) y 1.0 (completamente opaca). Solo está implementado en Windows y macOS.
  * `darkTheme` Boolean (opcional) - Obliga a utilizar un tema oscuro en la ventana, solamente funciona en algunos GTK+3 desktop environments. Por defecto es `false`.
  * `transparent` Boolean (opcional) - Hace que la ventana sea [transparente](frameless-window.md). Por defecto es `false`.
  * `type` String (opcional) - El tipo de ventana, por defecto es ventana normal. Ver más sobre esto más abajo.
  * `titleBarStyle` String (opcional) - El estilo de la barra de título de la ventana. Por defecto es `default`. Los valores posibles son: 
    * `default` - Es la barra de título gris opaca estándar de Mac.
    * `hidden` -Es una barra de título oculta y una ventana de tamaño completo. Sin embargo, la barra tiene los controles estándares de la ventana ("traffic lights") en la parte superior izquierda.
    * `hiddenInset` - Es una barra de título oculta con una apariencia alternativa donde los botones de traffic light están ligeramente mas insertados en el borde de la ventana.
    * `customButtonsOnHover` Boolean (opcional) - Dibuja botones personalizados de cerrar, minimizar y pantalla completa en las ventanas sin marco de macOS. Estos botones no aparecerán a menos que se esté ubicado sobre la parte superior izquierda de la ventana. Estos botones personalizados previenen problemas con los eventos del ratón que suceden con los botones estándar de la barra de herramientas de la ventana. **Nota:** Actualmente esta opción es experimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (opcional) - Utilice el estilo `WS_THICKFRAME` para ventanas sin marco en Windows, la cual agrega un marco de ventana estándar. Configurarlo en `false` eliminará la sombra de la ventana y las animaciones de la ventana. Por defecto es `true`.
  * `vibrancy` Cadena (opcional) - Añade un tipo de efecto de vibración a la ventana. Funciona solamente en macOS. Puede ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
  * `zoomToPageWidth` Boolean (opcional) - Controla el comportamiento en macOS al hacer clic en el botón verde de semáforo en la pestaña de opciones de la barra de herramientas o al hacer click en el elemento del menú Ventana>Zoom. Si es `true`, la ventana crecerá al ancho recomendado de la página web cuando se haga zoom. `false` hará que haga zoom hasta el ancho de la pantalla. Esto también afectará el comportamiento cuando se llama directamente `maximize()`. Por defecto es `false`.
  * `tabbingIdentifier` String (opcional) - Crea una pestaña del nombre del grupo. Permite abrir la ventana como una pestaña nativa en macOC 10.12+. Las ventanas con el mismo identificador de pestaña se agruparán juntos. Esto también añade un nuevo botón de pestañas nativo a la barra de pestañas de la ventana y permite que la `app` y la ventana reciban el evento `new-window-for-tab`.
  * `webPreferences` Object (opcional) - Configuración de las características de la página web. 
    * `devTools` Boolean (opcional) - Si se habilita el DevTools. Si se configura a `false`, no puede utilizarse `BrowserWindow.webContents.openDevTools()` para abrir DevTools. Por defecto es `true`.
    * `nodeIntegration` Boolean (opcional) - Si la integración de nodos esta habilitada. Por defecto es `true`.
    * `nodeIntegrationInWorker` Boolean (opcional) - Si la integración de nodos está habilitada en los trabajadores de la web. Por defecto es `false`. Se pueden encontrar más detalles en [Multithreading](../tutorial/multithreading.md).
    * `preload` String (opcional) - Especifica un script que será cargado antes del otros scripts en la página. Este script siempre tendrá acceso al nodo APIs sin importar si la integración de nodos esté activada o no. El valor debería ser la ruta del archivo absoluto al script. Cuando la integración de nodos esta desactivada, la precarga del script puede reintroducir de vuelta al ámbito global los símbolos globales del Nodo. Ver ejemplo [aquí](process.md#event-loaded).
    * `sandbox` Boolean (opcional) - Si se configura, protegerá al renderizador asociado a la ventana, haciéndolo compatible con el sandbox de Chromium OS-level, deshabilitando el motor Node.js. Esto no es lo mismo que la opción de `nodeIntegration` y las APIs disponibles para el script de precarga son más limitadas. Leer más sobre la opción [aquí](sandbox-option.md). **Nota:** actualmente esta opción es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.
    * `session` [Session](session.md#class-session) (opcional) - Configura la sesión usada por la página. En lugar de pasar directamente el objeto de la sesión, se puede optar por utilizar la opción de `partition`, la cual acepta una cadena de partición. Cuando se proporcionen `session` y `partition`, se preferirá `session`. Default es la sesión por defecto.
    * `partition` Cadena (opcional) - Configura la sesión utilizada por la página según la cadena de partición de la sesión. Si la `partition` empieza con `persist:`, la página utilizará una sesión persistente disponible para todas las páginas en la partición con la misma `partition`. Si no está el prefijo `persist:`, la página usara una sesión de la memoria interna. Al asignar la misma `partition`, las páginas múltiples pueden compartir la misma sesión. Default es la sesión por defecto.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
    * `zoomFactor` Numero (opcional) - El factor zoom de la página por defecto `3.0` representa el `300%`. Por defecto es `1.0`.
    * `javascript` Booleano (opcional) - Habilita el soporte a JavaScript. Por defecto es `true`.
    * `webSecurity` Booleano (opcional) - Cuando es `false`, deshabilitará la política de un mismo origen (por lo general se utiliza cuando la gente testea los sitios web), y configurará `allowRunningInsecureContent`a `true` en caso de que estas opciones no hayan sido configuradas por el usuario. Por defecto es `true`.
    * `allowRunningInsecureContent` Booleano (opcional) - Permite que una página https ejecute JavaScript, CSS o plugins de URLS http. Por defecto es `false`.
    * `images` Booleano (opcional) - Habilita el soporte a imagen. Por defecto es `true`.
    * `textAreasAreResizable` Booleano (opcional) - Hace que los elementos de TextArea sean redimensionables. Por defecto es `true`.
    * `webgl` Booleano (opcional) - Habilita el soporte a WebGL. Por defecto es `true`.
    * `webaudio` Booleano (opcional) - Habilita el soporte a WebAudio. Por defecto es `true`.
    * `plugins` Booleano (opcional) - Si los plugins se habilitan o no. Por defecto es `false`.
    * `experimentalFeatures` Booleano (opcional) - Habilita las características experimentales de Chromium. Por defecto es `false`.
    * `experimentalCanvasFeatures` Booleano (opcional) - Habilita las características experimentales de canvas de Chromium. Por defecto es `false`.
    * `scrollBounce` Boolean (opcional) - Habilita el efecto de rebote de desplazamiento (rubber banding) en macOS. Por defecto es `false`.
    * `blinkFeatures` String (opcional) - Una lista de cadenas distintivas separadas por `,`,como `CSSVariables,KeyboardEventKey` para habilitar. La lista completa de cadenas distintivas soportadas pueden encontrarse en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70).
    * `disableblinkFeatures` String (opcional) - Una lista de cadenas distintivas separadas por `,`,como `CSSVariables,KeyboardEventKey` para deshabilitar. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70).
    * `defaultFontFamily` Object (opcional) - establece la fuente por defecto para la familia de fuentes. 
      * `standard` String (opcional) - Por defecto es `Times New Roman`.
      * `serif` String (opcional) - Por defecto es `Times New Roman`.
      * `sansSerif` String (opcional) - Por defecto es `Arial`.
      * `monospace` String (opcional) - Por defecto es `Courier New`.
      * `cursive` String (opcional) - Por defecto es `Script`.
      * `fantasy` String (opcional) - Por defecto es `Impact`.
    * `defaultFontSize` Integer (opcional) - Por defecto es `16`.
    * `defaultMonospaceFontSize` Integer (opcional) - Por defecto es `13`.
    * `minimumFontSize` Integer (opcional) - Por defecto es ``.
    * `defaultEncoding` String (opcional) - Por defecto es `ISO-8859-1`.
    * `backgroundThrottling` Boolean (opcional) - Para acelerar animaciones y temporizadores cuando la página esta al fondo. Esto también afecta a [Page Visibility API](#page-visibility). Por defecto es `true`.
    * `offscreen` Boolean(optional) - Para habilitar el renderizado offscreen para el navegador de la ventana. Por defecto es `false`. Para más detalles, ver [offscreen rendering tutorial](../tutorial/offscreen-rendering.md).
    * `contextIsolation` Boolean(opcional) - Para ejecutar las APIs de Electron y el script especificado `preload` en un contexto JavaScript independiente. Por defecto es `false`. El contexto que ejecuta el script `preload` tendrá acceso completo a los globales `document` y a `window` pero utilizará su propia configuración integrada de JavaScript (`Array`, `Object`, `JSON`, etc.) y estará apartada de cualquier cambio que se le haga al contexto global por la página cargada. El API Electron solo estará disponible en el script `preload` y no en la página cargada. Esta opción debe utilizarse cuando se carga contenido remoto potencialmente dañino para asegurar que el contenido cargado no pueda modificar el script `preload` o cualquier API de Electron en uso. Esta opción utiliza la misma técnica utilizada por [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Se puede acceder a este contexto en las herramientas de desarrollo al seleccionar la entrada 'Electron Isolated Context' en el cuadro combo en la parte superior de la pestaña de la Consola. **Nota:** actualmente esta opción es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (opcional) - Si se habilita o no el [`<webview>` tag](webview-tag.md). Por defecto tiene el valor de la opción `nodeIntegration`. **Nota:** El script `preload` configurado para el `<webview>`tendrá la integración de nodos habilitada cuando se ejecuta por lo que hay que asegurarse que el contenido remoto o posiblemente dañino no sea capaz de crear una etiqueta de `<webview>`con un script `preload` posiblemente malicioso. Puede utilizarse el evento `will-attach-webview` en [webContents](web-contents.md) para quitar el script `preload` y validar o alterar la configuración inicial de `<webview>`.
    * `additionArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.

Cuando se configura el tamaño máximo o mínimo de la ventana con `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, solo limita a los usuarios. No impide pasar de un tamaño que no sigue las restricciones de tamaño a`setBounds`/`setSize` o al constructor de `BrowserWindow`.

Los valores posibles y el comportamiento de la opción `type` son dependientes de la plataforma. Los valores posibles son:

* En linux, los tipos posibles son `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* En macOS, los tipos posibles son `desktop`, `textured`. 
  * El tipo `textured` añade una aspecto de tono metálico (`NSTexturedBackgroundWindowMask`).
  * El tipo `desktop` coloca la ventana en el nivel de la ventana de fondo de escritorio (`kCGDesktopWindowLevel - 1`). Tenga en cuenta que la ventana de escritorio no recibirá enfoque alguno, ni eventos del ratón o del teclado, pero se puede utilizar `globalShortcut` para recibir input con moderación.
* En Windows, el tipo posible es `toolbar`.

### Eventos de Instancia

Los objetos creados con `new BrowserWindow` emiten los siguientes eventos:

**Nota:** Algunos eventos sólo están disponibles en sistemas operativos específicos y se etiquetan como tal.

#### Evento: 'page-title-updated'

Devuelve:

* `evento` Evento
* `title` String

Aparece cuando el documento cambia el título. Llamar `event.preventDefault()` evitará que el título de la ventana nativa cambie.

#### Evento: "close"

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

***Nota**: Hay una diferencia sutil entre el comportamiento de `window.onbeforeunload = handler` y `window.addEventListener('beforeunload', handler)`. Es recomendable establecer siempre de forma explícita el valor de `event.returnValue`, en vez de simplemente devolver un valor, ya que así funcionará más consistentemente dentro de Electron.*

#### Evento: "closed"

Aparece cuando se cierra la ventana. Después de recibir este evento se debería eliminar la referencia a la ventana y evitar su uso.

#### Evento: "session-end" *Windows*

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

#### Evento: "resize"

Aparece cuando se redimensiona la ventana.

#### Evento: "move"

Aparece cuando la ventana se mueve a una nueva posición.

**Nota**: en macOS este evento es solamente un alias de `move`.

#### Evento: "moved" *macOS*

Aparece solo una vez cuando la ventana se mueve a una nueva posición.

#### Evento: "enter-full-screen"

Aparece cuando la ventana entra en un estado pantalla completa.

#### Evento: "leave-full-screen"

Aparece cuando la ventana sale del estado pantalla completa.

#### Evento: 'enter-html-full-screen'

Aparece cuando la ventana entra en un estado pantalla completa activado por la API HTML.

#### Evento: 'leave-html-full-screen'

Aparece cuando la ventana sale de un estado pantalla completa activado por la API HTML.

#### Evento: "app-command" *Windows*

Devuelve:

* `event` Event
* `command` Cadena

Aparece cuando se invoca un [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx). Estos están generalmente relacionados a las teclas del teclado o a los comandos del navegador, así como el botón "Back" está en algunos ratones en Windows.

Los comandos están en minuscula, los guiones bajos son remplazados por guiones, y el prefijo `APPCOMMAND_` se elimina. por ejemplo, `APPCOMMAND_BROWSER_BACKWARD` aparece como `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // La ventana retrocede cuando el usuario hace clic sobre el botón de atrás
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Evento: "scroll-touch-begin"*macOS*

Aparece cuando la fase del evento de la rueda de desplazamiento ha empezado.

#### Evento: "scroll-touch-end"*macOS*

Aparece cuando la fase del evento de la rueda de desplazamiento ha concluido.

#### Evento: "scroll-touch-edge"*macOS*

Aparece cuando la fase del evento de la rueda desplazamiento ha alcanzado el borde del elemento.

#### Evento: "swipe" *macOS*

Devuelve:

* `evento` Evento
* `direction` String

Aparece al pasar 3 dedos. Las direcciones posibles son `up`, `right`, `down`, `left`.

#### Evento: "sheet-begin" *macOS*

Aparece cuando la ventana abre una hoja.

#### Evento: "sheet-end" *macOS*

Aparece cuando la ventana cierra una hoja.

#### Evento: "new-window-for-tab" *macOS*

Aparece cuando se hace clic al botón de nueva pestaña nativa.

### Métodos Estáticos

La clase `BrowserWindow` tiene los siguientes métodos estáticos:

#### `BrowserWindow.getAllWindows()`

Devuelve `BrowserWindow[]`- Un arreglo de todas las ventanas abiertas del navegador.

#### `BrowserWindow.getFocusedWindow()`

Devuelve `BrowserWindow`- La venta de la aplicación que obtiene el foco, de lo contrario devuelve `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Devuelve `BrowserWindow` - La ventana que posee el `webContents` dado.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Devuelve `BrowserWindow | null` - La ventana propietaria del `browserView` especificado. Si la vista especificada no está emparejada con alguna ventana, devuelve `null`.

#### `BrowserWindow.fromId(id)`

* `id` Íntegro

Devuelve `BrowserWindow` - La ventana que posee el `id` especificado.

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
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

### Propiedades de Instancia

Los objetos creados con `new BrowserWindow` tienen las siguientes propiedades:

```javascript
const {BrowserWindow} = require('electron')
// En este ejemplo "win" es nuestra instancia
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

Un objeto `WebContents` que posee la ventana. Todas eventos y operaciones relacionados a las páginas web ocurrirán por medio del objeto.

Consulte la [documentation `webContents`](web-contents.md) de sus métodos y eventos.

#### `win.id`

Un `Integer` que representa el ID único de la ventana.

### Métodos de Instancia

Los objetos creados con `new BrowserWindow` tienen los siguientes métodos de instancia:

**Note:** Algunos métodos solo están disponibles es sistemas operativos específicos y son etiquetados como tal.

#### `win.destroy()`

Al forzar el cierre de una ventana, el evento `unload` y `beforeunload` no se emitirá en la página web. El evento `close` tampoco se emitirá en la ventana, pero es seguro que el evento `closed` sí será emitido.

#### `win.close()`

Intenta cerrar la ventana. Este tiene el mismo efecto que hacer clic manualmente al botón de cerrar la ventana. Sin embargo la página web podría cancelar el cierre. Ver [close event](#event-close).

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

Maximiza la ventana. Esta también muestra la ventana (pero no la enfoca) si todavía no ha sido mostrada.

#### `win.unmaximize()`

Sale del estado maximizado de la ventana.

#### `win.isMaximized()`

Devuelve `Boolean` - Si la ventana está maximizada.

#### `win.minimize()`

Minimiza la ventana. En algunas plataformas se mostrará la ventana minimizada en el Dock.

#### `win.restore()`

Restaura la ventana desde un estado minimizado a su estado previo.

#### `win.isMinimized()`

Devuelve `Boolean` - Si la ventana está minimizada o no.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Establece si la ventana debe estar o no en modo pantalla completa.

#### `win.isFullScreen()`

Devuelve `Boolean` - Si la ventana está o no en pantalla completa.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Entra o sale del modo simple de pantalla completa.

El modo simple de pantalla completa emula el comportamiento de la pantalla completa nativa que se encuentra en versiones de Mac OS X anteriores a Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Devuelve `Boolean` - Si la ventana está en modo simple de pantalla completa (pre-Lion).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Flotador - La relación de aspecto para mantener parte de la vista de contenido.
* `extraSize` [Size](structures/size.md) - El tamaño extra no se incluye mientras se mantiene la relación de aspecto.

Esto hará que la ventana mantenga una relación de aspecto. El tamaño extra permite al desarrollador tener espacio especificado en píxeles, el cual no está incluido dentro de los cálculos de la relación de aspecto. Esta API ya toma en cuenta la diferencia entre el tamaño de la ventana y el tamaño del contenido.

Considere una ventana normal con un reproductor de video HD y los controles asociados. Quizá hay 15 pixeles de controles en el borde izquierdo, 25 pixeles de control en el borde derecho y 50 pixeles de control bajo el reproductor. Para mantener una relación de aspecto de 16:9 (la relación de aspecto estándar para HD@1920x1080) dentro del reproductor, tendríamos que llamar esta función con argumentos de 16/9 y [ 40, 50 ]. En el segundo argumento no importa donde están la anchura extra ni altura extra dentro de la vista del contenido, solo importa que existan. Simplemente se suma el área de la anchura extra y la altura extra dentro de la vista del contenido total.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` Cadena - La ruta de acceso absoluta al archivo para vista previa con QuickLook. Esto es importante a medida que Quick Look utiliza el nombre del archivo y la extensión del archivo en la ruta para determinar el tipo de contenido del archivo que se va a abrir.
* `displayName` Cadena (opcional) - El nombre del archivo a mostrar en la vista modal de Quick Look. Esto es puramente visual y no afecta el tipo de contenido del archivo. Por defecto es `path`.

Utiliza [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) para previsualizar un archivo de una ruta determinada.

#### `win.closeFilePreview()` *macOS*

Cierra el panel actual de [Quick Look](https://en.wikipedia.org/wiki/Quick_Look).

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opcional) *macOS*

Redimensiona y mueve la ventana a los límites proporcionados

#### `win.getBounds()`

Devuelve [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opcional) *macOS*

Redimensiona y mueve el área del cliente de la ventana (por ejemplo, la página web) hasta los límites proporcionados.

#### `win.getContentBounds()`

Devuelve [`Rectangle`](structures/rectangle.md)

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (opcional) *macOS*

Cambia el tamaño de la ventana a `width` y `height`.

#### `win.getSize()`

Devuelve `Integer[]` - Contiene la anchura y altura de la ventana.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `alto` Integer
* `animate` Boolean (opcional) *macOS*

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

* `ancho` Entero
* `alto` Integer

Establece el tamaño máximo de la ventana a `width`y `height`.

#### `win.getMaximumSize()`

Devuelve `Integer[]` - Contiene la anchura y altura máxima de la ventana.

#### `win.setResizable(resizable)`

* `resizable` Booleano

Establece si la ventana puede ser redimensionada manualmente por el usuario.

#### `win.isResizable()`

Devuelve `Boolean` - Si la ventana puede ser redimensionada manualmente por el usuario.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Establece si la ventana puede ser movida por el usuario. En Linux no hace nada.

#### `win.isMovable()` *macOS* *Windows*

Devuelve `Boolean` - Si la ventana puede ser movida por el usuario.

En Linux siempre devuelve `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Establece si la ventana puede ser minimizada manualmente por el usuario. En Linux no hace nada.

#### `win.isMinimizable()` *macOS* *Windows*

Devuelve `Boolean` - Si la ventana puede ser minimizada manualmente por el usuario

En Linux siempre devuelve `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Establece si la ventana puede ser maximizada manualmente por el usuario. En Linux no hace nada.

#### `win.isMaximizable()` *macOS* *Windows*

Devuelve `Boolean` - Si la ventana puede ser maximizada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Establece si el botón de la ventana de maximizar/acercar activa el modo pantalla completa o maximiza la ventana.

#### `win.isFullScreenable()`

Devuelve `Boolean` - Si el botón de la ventana de maximizar/acercar activa o no el modo pantalla completa o maximiza la ventana.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Establece si la ventana puede ser cerrada manualmente por el usuario. En Linux no hace nada.

#### `win.isClosable()` *macOS* *Windows*

Devuelve `Boolean` - Si la ventana puede ser o no cerrada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (opcional) *macOS* - Los valores incluyen `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Obsoleto). Por defecto es `floating`. Para más detalles, ver [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels).
* `relativeLevel` Integer (opcional) *macOS* - El número de capas más alto para configurar esta ventana con respecto al `level` determinado. Por defecto es ``. Tenga en cuenta que Apple desalienta establecer niveles superiores a 1 sobre `screen-saver`.

Establece si la ventana debe mostrarse siempre encima de otras ventanas. Después de establecer esta opción, la ventana sigue siendo una ventana normal, no una ventana de herramientas sobre la cual no puede ser enfocada.

#### `win.isAlwaysOnTop()`

Devuelve `Boolean` - Si la ventana está siempre sobre las otras ventanas.

#### `win.center()`

Mueve la ventana al centro de la pantalla.

#### `win.setPosition(x, y[, animate])`

* `x` Íntegro
* `y` Integer
* `animate` Boolean (opcional) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
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

Enters or leaves the kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Función

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` String
* `opciones` Object (opcional) 
  * `httpReferrer` String (opcional) - Un url de HTTP referencial.
  * `userAgent` String (opcional) - Un agente de usuario originando el pedido.
  * `extraHeaders` String (opcional) - Encabezados extras separadas por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Same as `webContents.loadURL(url[, options])`.

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
let url = require('url').format({
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

#### `win.loadFile(filePath)`

* `filePath` String

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `opciones` Object (opcional) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Objeto 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Función
  * `tooltip` String (opcional): el texto de la información sobre el botón.
  * `flags` String[] (opcional) - Controle estados específicos y comportamientos del botón. Por defecto, es `['enabled']`.

Los `flags` es una matriz que puede incluir siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - El botón está deshabilitado. Está presente, pero tiene un estado visual que indica que no responderá a la acción del usuario.
* `dismissonclick` - Cuando se hace clic en el botón, la ventana de miniatura se cierra de inmediato.
* `nobackground` - No dibuja un borde del botón, usa solo la imagen.
* `hidden` - El botón no es mostrado al usuario.
* `noninteractive` - El botón está habilitado pero no es interactivo; no se dibuja un estado de botón presionado. Este valor está destinado a instancias donde el botón se usa en una notificación.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` Cadena

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `opciones` Objeto 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `ícono` [NativeImage](native-image.md)

Changes window icon.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `opciones` Object (opcional) 
  * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Nota:** actualmente la API TouchBar es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Nota:** actualmente la API BrowserView es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.