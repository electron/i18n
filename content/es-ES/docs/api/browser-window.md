# BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [Main](../glossary.md#main-process)

```javascript
// En el proceso principal.
const {BrowserWindow} = require('electron')

// O usar "remote" desde el proceso de renderizado.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

// Carga un URL remoto
win.loadURL('https://github.com')

// O carga un archivo locar HTML
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Ventana sin marco

Se puede usar la API [Frameless Window](frameless-window.md) para crear una ventana sin cromo, o una ventana transparente de forma arbitraria.

## Mostrar ventana con gracia

Cuando una página cargue la ventana directamente, los usuarios pueden ver la página cargar gradualmente, lo cual no es una buena experiencia para una aplicación nativo. Para hacer que la ventana aparezca sin el visual flash, hay dos soluciones para distintas situaciones.

### Usando el evento `ready-to-show`

Al cargar la ventana, se emitirá el evento `ready-to-show` cuando el proceso de renderizado haya procesado la página por primera vez si aún no se ha muestrado la ventana. Si se muestra la ventana luego de este evento, no tendrá visual flash:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Este evento generalmente se emite después del evento `did-finish-load`, pero para páginas con muchos recursos remotos, puede ser emitido antes del evento `did-finish-load`.

### Configurar `backgroundColor`

Para una aplicación compleja, el evento `ready-to-show` puede emitirse muy tarde, haciendo que la aplicación se sienta lenta. En este caso, se recomienda mostrar la ventana inmediatamente, y usar un cierre `backgroundColor` para el fondo de la aplicación:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Tenga en cuenta que incluso para aplicaciones que utilizan el evento `ready-to-show`, aún se recomienda establecer `backgroundColor` para que la aplicación se sienta más nativa.

## Ventana principal y ventana secundaria

Al usar la opción `parent`, se pueden crean ventanas secundarias:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

La ventana `child` se mostrará encima de la ventana `top`.

### Ventanas modales

Una ventana modal es una ventana secundaria que deshabilita la ventana principal para crear una ventana modal. Hay que establecer ambas opciones `parent` y `modal`:

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

* En todas las plataformas, el estado de visibilidad rastrea si la ventana está oculta o minimizada o si no lo está.
* Además, en macOS, el estado de visibilidad también rastrea el estado de la oclusión de la ventana. Si la ventana esta atascada, es decir, completamente cubierta por otra ventana, el estado de visibilidad será `hidden`. En otras plataformas, el estado de visibilidad será `hidden` solo si la ventana esta minimizada o explícitamente oculta con `win.hide()`.
* Si se crea un `BrowserWindow` con `show: false`, el estado de visibilidad inicial será `visible` a pesar de que la ventana esté oculta realmente.
* Si `backgroundThrottling` está deshabilitada, el estado de visibilidad permanecerá `visible` incluso si la ventana está minimizada, atascada o escondida.

Se recomienda pausar operaciones costosas cuando el estado de visibilidad está `hidden` con el fin de minimizar el consumo de energía.

### Notas según la plataforma

* En macOS las ventanas modales se mostrarán como hojas adjuntas a la ventana principal.
* En macOS las ventanas secundarias mantendrán la posición en relación a la ventana principal cuando se mueve la ventana principal. En Windows y Linux las ventanas secundarias no se mueven.
* En Windows no admite cambiar la ventana principal dinámicamente.
* En Linux el tipo de ventanas modales se cambiará a `dialog`.
* En Linux, muchos entornos de escritorio no admiten ocultar una ventana modal.

## Clase: BrowserWindow

> Crea y controla las ventanas del navegador.

Proceso: [Main](../glossary.md#main-process)

`BrowserWindow` es un [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Crea un nuevo `BrowserWindow` con propiedades nativas como las establecidas por las `options`.

### `new BrowserWindow([options])`

* `options` Object (opcional) 
  * `ancho` Integer (opcional) - ancho de la ventana en píxeles. El valor por defecto es `800`.
  * `altura` Integer (opcional) - altura de la ventana en píxeles. El valor por defecto es `600`.
  * `x` Integer (opcional) (**necesario** si se utiliza y) - el offset izquierdo de la ventana de la pantalla. Por defecto la ventana es centrada.
  * `y` Integer (opcional) (**necesario** si se utiliza x) - el offset de arriba de la ventana de la pantalla. Por defecto la ventana es centrada.
  * `useContentSize` Boolean (opcional) - La `width` y la `height` se utilizan como el tamaño de la página web. Esto significa que el tamaño actual de la ventana incluirá el tamaño del marco de la ventana y será un poco más grande. Por defecto es `false`.
  * `center` Booleano (opcional) - Muestra la ventana en el centro de la pantalla.
  * `minWidth` Entero (opcional) - La anchura mínima de la ventana. Por defecto es ``.
  * `minHeight` Entero (opcional) - La altura mínima de la ventana. Por defecto es ``.
  * `maxWidth` Entero (opcional) - La anchura máxima de la ventana. No tiene límites por defecto.
  * `maxHeight` Entero (opcional) - La altura máxima de la ventana. No tiene límites por defecto.
  * `resizable` Booleano (opcional) - si la ventana es redimensionable. Por defecto es `true`.
  * `movable` Booleano (opcional) - si la ventana es movible. Esto no esta implementado en Linux. Por defecto es `true`.
  * `minimizable` Booleano (opcional) - si la ventana se minimiza. Esto no está implementado en Linux. Por defecto es `true`.
  * `maximizable` Booleano (opcional) - si la ventana se máximiza. Esto no está implementado en Linux. Por defecto es `true`.
  * `closable` Booleano (opcional) - si la ventana se cierra. Esto no esta implementado en Linux. Por defecto es `true`.
  * `focusable` Booleano (opcional) - si la ventana se puede enfocar. Por defecto es `true`. En Windows, la configuración `focusable: false` también quiere decir que `skipTaskbar: true`. En Linux, la configuración `focusable: false` hace que la ventana deje de interactuar con wm, así la ventana siempre se mantendrá en la parte superior en todas las áreas de trabajo.
  * `alwaysOnTop` Booleano (opcional) - si la ventana debería estar siempre por encima de otras ventanas. Por defecto es `false`.
  * `fullscreen` Booleano (opcional) - si la ventana debería mostrarse en pantalla completa. Cuando se establece explícitamente `false` el botón de la pantalla completa estará oculta o deshabilitada en macOS. Por defecto es `false`.
  * `fullscreenable` Booleano (opcional) - si la ventana puede ponerse el modo pantalla completa. En macOS, también si el botón maximizar o acercarse debería alternar el modo pantalla completa o maximizar la ventana. Por defecto es `true`.
  * `skipTaskbar` Booleano (opcional) - si se va a mostrar la ventana en la barra de tareas. Por defecto es `false`.
  * `kiosk` Booleano (opcional) - El modo kiosco. Por defecto es `false`.
  * `title` Cadena (opcional) - Título de la ventana por defecto. Por defecto es `"Electron"`.
  * `icon` ([NativeImage](native-image.md) | String) (opcional) - El icono de la ventana. En Windows, se recomienda usar iconos `ICO` para obtener mejores efectos visuales. También se se puede dejar sin definir, de esta manera se utilizará el icono del ejecutable.
  * `show` Booleano (opcional) - si la ventana debería ser mostrada cuando es creada. Por defecto es `true`.
  * `frame` Booleano (opcional) - Especifica `false` para crear una [Frameless Window](frameless-window.md). Por defecto es `true`.
  * `parent` BrowserWindow (opcional) - Especifica la ventana principal. Por defecto es `null`.
  * `modal` Booleano (opcional) - si esta es una ventana modal. Esto solo funciona si la ventana es una ventana secundaria. Por defecto es `false`.
  * `acceptFirstMouse` Booleano (opcional) - Si la vista web acepta un único evento mouse-down que activa simultáneamente la ventana. Por defecto es `false`.
  * `disableAutoHideCursor` Booleano (opcional) - si se oculta el cursor al escribir. Por defecto es `false`.
  * `autoHideMenuBar` Booleano (opcional) - Oculta automáticamente la barra de menú a menos que se presione la tecla `Alt`. Por defecto es `false`.
  * `enableLargerThanScreen` Booleano (opcional) - Permite que el tamaño de la ventana sea más grande que la pantalla. Por defecto es `false`.
  * `backgroundColor` Cadena (opcional) - El color de fondo de la ventana como valor hexadecimal, como `#66CD00` o `#FFF` o `#80FFFFFF` (alpha es soportado). Por defecto es `#FFF` (blanco).
  * `hasShadow` Booleano (opcional) - Si la ventana debería tener sombra. Esto solo es implementado en macOS. Por defecto es `true`.
  * `darkTheme` Booleano (opcional) - Obliga a utilizar un tema oscuro en la ventana, solamente funciona en algunos GTK+3 desktop environments. Por defecto es `false`.
  * `transparent` Booleano (opcional) - Hace que la ventana sea [transparente](frameless-window.md). Por defecto es `false`.
  * `type` Cadena (opcional) - El tipo de ventana, por defecto es ventana normal. See more about this below. Ver más sobre esto más abajo.
  * `titleBarStyle` Cadena (opcional) - El estilo de la barra de título de la ventana. Por defecto es `default`. Los valores posibles son: 
    * `default` - Es la barra de título gris opaca estándar de Mac.
    * `hidden` -Es una barra de título oculta y una ventana de tamaño completo. Sin embargo, la barra tiene los controles estándares de la ventana ("traffic lights") en la parte superior izquierda.
    * `hidden-inset` - Función obsoleta, en vez de esa utilice `hiddenInset`.
    * `hiddenInset` - Es una barra de título oculta con una apariencia alternativa donde los botones de traffic light están ligeramente mas insertados en el borde de la ventana.
    * `customButtonsOnHover` Booleano (opcional) - Dibuja botones personalizados de cerrar, minimizar y pantalla completa en las ventanas sin marco de macOS. Estos botones no aparecerán a menos que se esté ubicado sobre la parte superior izquierda de la ventana. Estos botones personalizados previenen problemas con los eventos del ratón que suceden con los botones estándar de la barra de herramientas de la ventana. **Nota:** Actualmente esta opción es experimental.
  * `fullscreenWindowTitle` Booleano (opcional) - Muestra el título en la barra de mosaico en modo pantalla completa en macOS para todas las opciones `titleBarStyle`. Por defecto es `false`.
  * `thickFrame` Booleano (opcional) - Utilice el estilo `WS_THICKFRAME` para ventanas sin marco en Windows, la cual agrega un marco de ventana estándar. Configurarlo en `false` eliminará la sombra de la ventana y las animaciones de la ventana. Por defecto es `true`.
  * `vibrancy` Cadena (opcional) - Añade un tipo de efecto de vibración a la ventana. Funciona solamente en macOS. Puede ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`.
  * `zoomToPageWidth` Booleano (opcional) - Controla el comportamiento en macOS al hacer clic en el botón verde de semáforo en la pestaña de opciones de la barra de herramientas o al hacer click en el elemento del menú Ventana>Zoom. Si es `true`, la ventana crecerá al ancho recomendado de la página web cuando se haga zoom. `false` hará que haga zoom hasta el ancho de la pantalla. Esto también afectará el comportamiento cuando se llama directamente `maximize()`. Por defecto es `false`.
  * `tabbingIdentifier` Cadena (opcional) - Crea una pestaña del nombre del grupo. Permite abrir la ventana como una pestaña nativa en macOC 10.12+. Las ventanas con el mismo identificador de pestaña se agruparán juntos. Esto también añade un nuevo botón de pestañas nativo a la barra de pestañas de la ventana y permite que la `app` y la ventana reciban el evento `new-window-for-tab`.
  * `webPreferences` Objeto (opcional) - Configuración de las características de la página web. 
    * `devTools` Booleano (opcional) - Si se habilita el DevTools. Si se configura a `false`, no puede utilizarse `BrowserWindow.webContents.openDevTools()` para abrir DevTools. Por defecto es `true`.
    * `nodeIntegration` Booleano (opcional) - Si la integración de nodos esta habilitada. Por defecto es `true`.
    * `nodeIntegrationInWorker` Booleano (opcional) - Si la integración de nodos está habilitada en los trabajadores de la web. Por defecto es `false`. Se pueden encontrar más detalles en [Multithreading](../tutorial/multithreading.md).
    * `preload` Cadena (opcional) - Especifica un script que será cargado antes del otros scripts en la página. Este script siempre tendrá acceso al nodo APIs sin importar si la integración de nodos esté activada o no. El valor debería ser la ruta del archivo absoluto al script. Cuando la integración de nodos esta desactivada, la precarga del script puede reintroducir de vuelta al ámbito global los símbolos globales del Nodo. Ver ejemplo [aquí](process.md#event-loaded).
    * `sandbox` Booleano (opcional) - Si se configura, protegerá al renderizador asociado a la ventana, haciéndolo compatible con el sandbox de Chromium OS-level, deshabilitando el motor Node.js. Esto no es lo mismo que la opción de `nodeIntegration` y las APIs disponibles para el script de precarga son más limitadas. Leer más sobre la opción [aquí](sandbox-option.md). **Nota:** actualmente esta opción es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.
    * `session` [Session](session.md#class-session) (opcional) - Configura la sesión usada por la página. En lugar de pasar directamente el objeto de la sesión, se puede optar por utilizar la opción de `partition`, la cual acepta una cadena de partición. Cuando se proporcionen `session` y `partition`, se preferirá `session`. Default es la sesión por defecto.
    * `partition` Cadena (opcional) - Configura la sesión utilizada por la página según la cadena de partición de la sesión. Si la `partition` empieza con `persist:`, la página utilizará una sesión persistente disponible para todas las páginas en la partición con la misma `partition`. Si no está el prefijo `persist:`, la página usara una sesión de la memoria interna. Al asignar la misma `partition`, las páginas múltiples pueden compartir la misma sesión. Default es la sesión por defecto.
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
    * `scrollBounce` Booleano (opcional) - Habilita el efecto de rebote de desplazamiento (rubber banding) en macOS. Por defecto es `false`.
    * `blinkFeatures` Cadena (opcional) - Una lista de cadenas distintivas separadas por `,`,como `CSSVariables,KeyboardEventKey` para habilitar. La lista completa de cadenas distintivas soportadas pueden encontrarse en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62).
    * `disableblinkFeatures` Cadena (opcional) - Una lista de cadenas distintivas separadas por `,`,como `CSSVariables,KeyboardEventKey` para deshabilitar. La lista completa de cadenas características soportadas puede ser encontrada en el archivo [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62).
    * `defaultFontFamily` Objeto (opcional) - establece la fuente por defecto para la familia de fuentes. 
      * `standard` Cadena (opcional) - Por defecto es `Times New Roman`.
      * `serif` Cadena (opcional) - Por defecto es `Times New Roman`.
      * `sansSerif` Cadena (opcional) - Por defecto es `Arial`.
      * `monospace` Cadena (opcional) - Por defecto es `Courier New`.
      * `cursive` Cadena (opcional) - Por defecto es `Script`.
      * `fantasy` Cadena (opcional) - Por defecto es `Impact`.
    * `defaultFontSize` Entero (opcional) - Por defecto es `16`.
    * `defaultMonospaceFontSize` Entero (opcional) - Por defecto es `13`.
    * `minimumFontSize` Entero (opcional) - Por defecto es ``.
    * `defaultEncoding` Cadena (opcional) - Por defecto es `ISO-8859-1`.
    * `backgroundThrottling` Booleano (opcional) - Para acelerar animaciones y temporizadores cuando la página esta al fondo. Esto también afecta la \[Page Visibility API\]\[#page-visibility\]. Por defecto es `true`.
    * `offscreen` Booleano (optional) - Para habilitar el renderizado offscreen para el navegador de la ventana. Por defecto es `false`. Para más detalles, ver [offscreen rendering tutorial](../tutorial/offscreen-rendering.md).
    * `contextIsolation` Booleano (opcional) - Para ejecutar las APIs de Electron y el script especificado `preload` en un contexto JavaScript independiente. Por defecto es `false`. El contexto que ejecuta el script `preload` tendrá acceso completo a los globales `document` y a `window` pero utilizará su propia configuración integrada de JavaScript (`Array`, `Object`, `JSON`, etc.) y estará apartada de cualquier cambio que se le haga al contexto global por la página cargada. El API Electron solo estará disponible en el script `preload` y no en la página cargada. Esta opción debe utilizarse cuando se carga contenido remoto potencialmente dañino para asegurar que el contenido cargado no pueda modificar el script `preload` o cualquier API de Electron en uso. Esta opción utiliza la misma técnica utilizada por [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Se puede acceder a este contexto en las herramientas de desarrollo al seleccionar la entrada 'Electron Isolated Context' en el cuadro combo en la parte superior de la pestaña de la Consola. **Nota:** actualmente esta opción es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.
    * `nativeWindowOpen` Booleano (opcional) - Si se utiliza la `window.open()` nativa. Por defecto es `false`. **Nota:** actualmente esta opción es experimental.
    * `webviewTag` Booleano (opcional) - Si se habilita o no el [`<webview>` tag](webview-tag.md). Por defecto tiene el valor de la opción `nodeIntegration`. **Nota:** El script `preload` configurado para el `<webview>`tendrá la integración de nodos habilitada cuando se ejecuta por lo que hay que asegurarse que el contenido remoto o posiblemente dañino no sea capaz de crear una etiqueta de `<webview>`con un script `preload` posiblemente malicioso. Puede utilizarse el evento `will-attach-webview` en [webContents](web-contents.md) para quitar el script `preload` y validar o alterar la configuración inicial de `<webview>`.

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

#### Evento: "page-title-updated"

Devuelve:

* `event` Evento
* `title` Cadena

Aparece cuando el documento cambia el título. Llamar `event.preventDefault()` evitará que el título de la ventana nativa cambie.

#### Evento: 'close'

Devuelve:

* `event` Evento

Aparece cuando la ventana se va a cerrar. Se emite antes de el evento del DOM `beforeunload` y `unload`. Llamar a `event.preventDefault()` cancelará el cierre.

Generalmente se desea utilizar el controlador `beforeunload` para decidir si la ventana debería ser cerrada, el cual también será llamado cuando la ventada se vuelva a cargar. En Electron, devolver cualquier valor que no sea `undefined` cancelará el cierre. Por ejemplo:

```javascript
window.onbeforeunload = (e) => {
  console.log("No quiero cerrarme")

  // A diferencia de los navegadores habituales en donde un cuadro de mensaje le aparecece al usuario,
  // devolviendo un valor non-void que cancelará silenciosamente el cierre.
  // Se recomienda usar el cuadro de diálogo API para dejar que el usuario confirme el cierre de la
  //aplicación.
  e.returnValue = false
}
```

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

#### Evento: "enter-html-full-screen"

Aparece cuando la ventana entra en un estado pantalla completa activado por la API HTML.

#### Evento: "leave-html-full-screen"

Aparece cuando la ventana sale de un estado pantalla completa activado por la API HTML.

#### Evento: "app-command" *Windows*

Devuelve:

* `event` Evento
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

* `event` Evento
* `direction` Cadena

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

Devuelve `BrowserWindow`- La ventana que se enfoca en esta aplicación, de lo contrario devuelve `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Devuelve `BrowserWindow` - La ventana que posee el `webContents` dado.

#### `BrowserWindow.fromId(id)`

* `id` Entero

Devuelve `BrowserWindow` - La ventana que posee el `id`dado.

#### `BrowserWindow.addExtension(path)`

* `path` Cadena

Añade una extensión de Chrome ubicada en `path`, y devuelve el nombre de la extensión.

El método no devolverá nada si el manifiesto de la extensión falta o está incompleta.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.removeExtension(name)`

* `name` Cadena

Elimina una extensión de Chrome por su nombre.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.getExtensions()`

Devuelve `Object` - Las llaves son los nombres de la extensión y cada valor es un objeto que contiene las propiedades `name` y `version`.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` Cadena

Añade una extensión de DevTools ubicada en `path`, y devuelve el nombre de la extensión.

La extensión será recordada, por lo tanto sólo se necesitará llamar a la API una vez. Esta API no es para uso de la programación. Si se intenta añadir una extensión que ya ha sido cargada, este método no devolverá nada y en su lugar aparecerá una advertencia en la consola.

El método no devolverá nada si el manifiesto de la extensión falta o está incompleta.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` Cadena

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

* `flag` Booleano

Establece si la ventana debe estar o no en modo pantalla completa.

#### `win.isFullScreen()`

Devuelve `Boolean` - Si la ventana está o no en pantalla completa.

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
* `animate` Booleano (opcional) *macOS*

Redimensiona y mueve la ventana a los límites proporcionados

#### `win.getBounds()`

Devuelve [`Rectangle`](structures/rectangle.md)

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Booleano (opcional) *macOS*

Redimensiona y mueve el área del cliente de la ventana (por ejemplo, la página web) hasta los límites proporcionados.

#### `win.getContentBounds()`

Devuelve [`Rectangle`](structures/rectangle.md)

#### `win.setSize(width, height[, animate])`

* `ancho` Entero
* `alto` Entero
* `animate` Booleano (opcional) *macOS*

Cambia el tamaño de la ventana a `width` y `height`.

#### `win.getSize()`

Devuelve `Integer[]` - Contiene la anchura y altura de la ventana.

#### `win.setContentSize(width, height[, animate])`

* `ancho` Entero
* `alto` Entero
* `animate` Booleano (opcional) *macOS*

Cambia el área del cliente de la ventana (por ejemplo, la página web) a la `width` y `height`.

#### `win.getContentSize()`

Devuelve `Integer[]` - Contiene la anchura y altura del área del cliente de la ventana.

#### `win.setMinimumSize(width, height)`

* `width` Entero
* `height` Entero

Establece el tamaño mínimo de la ventana a `width`y `height`.

#### `win.getMinimumSize()`

Devuelve `Integer[]` - Contiene la anchura y altura mínima de la ventana.

#### `win.setMaximumSize(width, height)`

* `ancho` Entero
* `alto` Entero

Establece el tamaño máximo de la ventana a `width`y `height`.

#### `win.getMaximumSize()`

Devuelve `Integer[]` - Contiene la anchura y altura máxima de la ventana.

#### `win.setResizable(resizable)`

* `resizable` Booleano

Establece si la ventana puede ser redimensionada manualmente por el usuario.

#### `win.isResizable()`

Devuelve `Boolean` - Si la ventana puede ser redimensionada manualmente por el usuario.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Booleano

Establece si la ventana puede ser movida por el usuario. En Linux no hace nada.

#### `win.isMovable()` *macOS* *Windows*

Devuelve `Booleano` - Si la ventana puede ser movida por el usuario.

En Linux siempre devuelve `verdadero`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Booleano

Establece si la ventana puede ser minimizada manualmente por el usuario. En Linux no hace nada.

#### `win.isMinimizable()` *macOS* *Windows*

Devuelve `Boolean` - Si la ventana puede ser minimizada manualmente por el usuario

En Linux siempre devuelve `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Booleano

Establece si la ventana puede ser maximizada manualmente por el usuario. En Linux no hace nada.

#### `win.isMaximizable()` *macOS* *Windows*

Devuelve `Boolean` - Si la ventana puede ser maximizada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Booleano

Establece si el botón de la ventana de maximizar/acercar activa el modo pantalla completa o maximiza la ventana.

#### `win.isFullScreenable()`

Devuelve `Boolean` - Si el botón de la ventana de maximizar/acercar activa o no el modo pantalla completa o maximiza la ventana.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Booleano

Establece si la ventana puede ser cerrada manualmente por el usuario. En Linux no hace nada.

#### `win.isClosable()` *macOS* *Windows*

Devuelve `Boolean` - Si la ventana puede ser o no cerrada manualmente por el usuario.

En Linux siempre devuelve `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Booleano
* `level` Cadena (opcional) *macOS* - Los valores incluyen `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Obsoleto). Por defecto es `floating`. Para más detalles, ver [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels).
* `relativeLevel` Entero (opcional) *macOS* - El número de capas más alto para configurar esta ventana con respecto al `level` determinado. Por defecto es ``. Tenga en cuenta que Apple desalienta establecer niveles superiores a 1 sobre `screen-saver`.

Establece si la ventana debe mostrarse siempre encima de otras ventanas. Después de establecer esta opción, la ventana sigue siendo una ventana normal, no una ventana de herramientas sobre la cual no puede ser enfocada.

#### `win.isAlwaysOnTop()`

Devuelve `Booleano` - Si la ventana está siempre sobre las otras ventanas.

#### `win.center()`

Mueve la ventana al centro de la pantalla.

#### `win.setPosition(x, y[, animate])`

* `x` Entero
* `y` Entero
* `animate` Booleano (opcional) *macOS*

Mueve la ventana a `x` y `y`.

#### `win.getPosition()`

Devuelve `Integer[]` - Contiene la posición actual de la ventana.

#### `win.setTitle(title)`

* `title` Cadena

Cambia el título de la ventana nativa a `title`.

#### `win.getTitle()`

Devuelve `String` - El título de la ventana nativa.

**Nota:** El título de la página web puede ser diferente del título de la ventana nativa.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (opcional)

Cambia el punto de adjunto para hojas en macOS. Por defecto, las hojas son adjuntas en la parte de abajo del marco de la ventana, pero puede que se quiera mostrarlas debajo de una barra de herramientas renderizada HTML. Por ejemplo:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Booleano

Empieza y deja de hacer parpadear la ventana para atraer la atención del usuario.

#### `win.setSkipTaskbar(skip)`

* `skip` Booleano

Hace que la ventana no se muestre en la barra de tareas.

#### `win.setKiosk(flag)`

* `flag` Booleano

Entra o sale del modo kiosko.

#### `win.isKiosk()`

Devuelve `Boolean` - Si la ventana está o no en modo kiosco.

#### `win.getNativeWindowHandle()`

Devuelve `Buffer` - El controlador específico de la plataforma de la ventana.

El tipo nativo del controlador en Windows es `HWND`, en macOS `NSView*` y en Linux `Window` (`unsigned long`).

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Entero
* `callback` Función

Ancla un mensaje en la ventana. El `callback` es llamado cuando el mensaje se recibe en el WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Entero

Devuelve `Boolean` - `true` o `false` dependiendo de si el mensaje esta anclado o no.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Entero

Desancla el mensaje de la ventana.

#### `win.unhookAllWindowMessages()` *Windows*

Desancla todos los mensajes de la ventana.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Establece el nombre de la ruta del archivo que la ventana representa, y el icono del archivo se mostrará en la barra de título de la ventana.

#### `win.getRepresentedFilename()` *macOS*

Devuelve `String` - El nombre de la ruta del archivo que la ventana representa.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Booleano

Especifica si se ha editado el documento de la ventana y el icono en la barra de título se volverá gris cuando se establece en `true`.

#### `win.isDocumentEdited()` *macOS*

Devuelve `Boolean` - Si se ha editado el documento de la ventana.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (opcional) - Los límites para capturar
* `callback` Función 
  * `image` [NativeImage](native-image.md)

Es igual a `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` Cadena
* `options` Objeto (opcional) 
  * `httpReferrer` Cadena (opcional) - Un url de HTTP referencial.
  * `userAgent` Cadena (opcional) - Un agente de usuario originando el pedido.
  * `extraHeaders` Cadena (opcional) - Cabeceras extras separadas por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (opcional)
  * `baseURLForDataURL` Cadena (opcional) - Url base (con separadores de ruta arrastrables) para archivos que se cargan por el url de datos. Esto es necesario únicamente si el `url` especificado es un url de datos y necesita cargar otros archivos.

Es igual a `webContents.loadURL(url[, options])`.

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

#### `win.reload()`

Es igual a `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Establece el `menú` como la barra del menú de la ventana, estableciéndolo a `null` eliminará la barra de menú.

#### `win.setProgressBar(progress[, options])`

* `progress` Doble
* `options` Objeto (opcional) 
  * `mode` String *Windows* - Modo para la barra de progreso. Puede ser `none`, `normal`, `indeterminate`, `error`, o `paused`.

Establece el valor del progreso en la barra de progreso. El rango válido es [0, 1.0].

Elimina la barra de progreso cuando el progreso es < 0; cambia a modo indeterminado cuando el progreso es >1.

En la plataforma Linux, solo es compatible con el environment de escritorio Unity. Se necesita especificar el nombre del archivo `*.desktop` en el campo `desktopName` dentro de `package.json`. Por defecto, se asumirá `app.getName().desktop`.

En Windows, se puede pasar de modo. Los valores aceptados son `none`, `normal`, `indeterminate`, `error`, y `paused`. Si se llama a`setProgressBar` sin establecer un modo (pero con un valor dentro del rango válido), se asumirá el modo `normal`.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - el icono que se muestra en la esquina inferior izquierda del icono de la barra de tareas. Si este parámetro es `null`, se quita la superposición
* `description` Cadena- una descripción que se facilitará a los lectores de la pantalla Accessibility

Establece una superposición de 16 x 16 píxeles sobre el icono actual de la barra de tareas. Generalmente se utiliza para transmitir algún tipo de estatus de la aplicación o para notificar pasivamente al usuario.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Booleano

Establece si la ventana debe tener o no una sombra. En Windows y Linux no hace nada.

#### `win.hasShadow()` *macOS*

Devuelve `Boolean` - Si la ventana tiene o no una sombra.

En Windows y Linux siempre devuelve `true`.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Devuelve `Boolean` - Si los botones se añadieron o no exitosamente

Añade la barra de herramientas de la vista previa con una configuración específica de los botones para la imagen previsualizada de una ventana en el plano del botón en la barra de tareas. Devuelve un objeto `Boolean` e indica si la previsualización se ha agregado con éxito.

El número de botones en la barra de herramientas de la vista previa no debe ser mayor que 7 debido al limitado espacio. Una vez que se configura la barra de herramientas de la vista previa, la barra de tareas no puede ser eliminada debido a las limitaciones de la plataforma. Sin embargo, se puede llamar a la API con un arreglo vacío para limpiar los botones.

Los `buttons` es un arreglo de objetos `Button`:

* `Button` Objeto 
  * `icon` [NativeImage](native-image.md) - El icono que muestra la barra de herramientas de la vista previa.
  * `click` Función
  * `tooltip` Cadena (opcional)- el texto de la descripción emergente del botón.
  * `flags` String[] (opcional) - Controla los estados específicos y comportamientos del botón. Por defecto es `['enabled']`.

Las `flags` es un arreglo que puede incluir los siguientes `String`s:

* `enabled` - El botón está activo y disponible para el usuario.
* `disabled` - El botón está deshabilitado. Está presente, pero tiene un estado visual que indica que no responderá a la acción del usuario.
* `dismissonclick` - Cuando se hace clic en el botón, la ventana de vista previa se cierra de inmediato.
* `nobackground` - No dibuja un borde del botón, usa solo la imagen.
* `hidden` - El botón no se muestra usuario.
* `noninteractive` - El botón está habilitado pero no es interactivo; no se dibuja un estado de botón presionado. Este valor está destinado a instancias donde el botón se usa en una notificación.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - la región de la ventana

Establece la región de la ventana para mostrar como la vista previa de la imagen es mostrada cuando se pasa sobre la ventana en la barra de tareas. Se puede restablecer la vista previa de toda la ventana especificando una región vacía: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` Cadena

Configura la descripción emergente que se muestra cuando se pasa sobre la vista previa de la ventana en la barra de tareas.

#### `win.setAppDetails(options)` *Windows*

* `options` Objeto 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Igual como `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `ícono` [NativeImage](native-image.md)

Cambia ícono de la ventana.

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

#### `win.setIgnoreMouseEvents(ignore)`

* `ignore` Boolean

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

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

**Note:**: La API de BrowserView es experimental y puede ser cambiada o elindad enl futuro versiones de Electron.