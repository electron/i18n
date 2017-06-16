# Integración del entorno de escritorio

Sistemas operativos ofrecen diferentes funciones para integración de aplicaciones de escritorio en sus entornos de escritorio. Por ejemplo, en Windows, aplicaciones pueden poner accesos directos en la JumpList de barra de tareas, y en Mac, aplicaciones pueden poner un menú personalizado en el menú dock.

Esta guía explica cómo integrar su aplicación en los entornos de escritorio con las APIs de Electron.

## Notificaciones

Ver [Notifications](notifications.md)

## Documentos recientes (Windows & macOS)

Windows y macOS facilita el acceso a una lista de documentos recientes abiertos por la aplicación a través de JumpList o dock menu, respectivamente.

**JumpList:**

![Archivos recientes JumpList](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menú dock de aplicaciones:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

Para agregar un archivo a documentos recientes, puede utilizar[app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-os-x-windows) API:

```javascript
const {app} = require('electron') app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Y se puede utilizar [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-os-x-windows) API para vaciar la lista de documentos recientes:

```javascript
const {app} = require('electron') app.clearRecentDocuments()
```

### Notas de Windows

Para poder utilizar esta función en Windows, la aplicación debe registrarse como un controlador del tipo de archivo del documento, caso contrario que el archivo no aparece en la JumpList incluso después de que usted haya agregado. Usted puede encontrar todo en registrar su solicitud en Registration</a> de Application.</p> 

Cuando un usuario hace clic en un archivo de la JumpList, una nueva instancia de la aplicación se iniciará con la ruta del archivo agregado como un argumento de línea de comandos.

### Notas de macOS

Cuando se solicita un archivo desde el menú documentos recientes, se emitirá el evento `open file` módulo `app` para él.

## Menú Dock personalizado (macOS)

macOS permite a los desarrolladores especificar un menú personalizado para el muelle, que generalmente contiene algunos atajos para las funciones más utilizadas de la aplicación:

**Menú Dock de Terminal.app:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

Para configurar tu menú dock personalizado, puede utilizar `app.dock.setMenu` API, que sólo está disponible para macOS:

```javascript
const {app, Menu} = dockMenu const require('electron') = Menu.buildFromTemplate ([{etiqueta: 'Nueva ventana', haga clic en () {console.log ('nueva ventana')}}, {etiqueta: 'Nueva ventana con la configuración', submenú: [{label: 'Basic'} {label: 'Pro'}]}, {label: 'New Command...'}]) app.dock.setMenu(dockMenu)
```

## Tareas de usuario (Windows)

En Windows puede especificar acciones personalizadas en la categoría de `Tasks` de JumpList, citado de MSDN:

> Aplicaciones definen basadas en características del programa y de las cosas claves que un usuario se pretende hacer con ellos. Tareas deben estar libre de contexto, en que la aplicación no necesita estar en ejecución para que trabajen. También deben ser las acciones estadísticamente más común que un usuario normal sería realizar en una aplicación, tales como componer un mensaje de correo Electronico o abrir el calendario en un programa de correo, crean un nuevo documento en un procesador de textos, inicie una aplicación en cierto modo o uno de sus subcomandos. Una aplicación debe desorden el menú con características avanzadas que no necesitan los usuarios estándar o acciones de una sola vez como registro. No utilice tareas para artículos promocionales tales como actualizaciones u ofertas especiales.
> 
> Se recomienda que la lista de tareas ser estático. Debe seguir siendo la misma independientemente del estado o el estado de la aplicación. Mientras que es posible variar la lista dinámicamente, debe considerar que esto podría confundir al usuario que no espera que la parte de la lista para cambiar de destino.

**Tareas de Internet Explorer:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

A diferencia del menú dock de macOS que es una carta real, tareas de usuario en Windows funcionan como accesos directos a aplicaciones tales que cuando el usuario hace clic en una tarea, un programa se ejecutará con los argumentos especificados.

Para definir las tareas de usuario para su aplicación, puede utilizar[app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API:

```javascript
const {app} = require('electron') app.setUserTasks ([{programa: process.execPath, argumentos: '--nueva ventana ', iconPath: process.execPath, INDICE: 0, title: 'Nueva ventana' Descripción: 'Crear una nueva ventana'}])
```

Para limpiar tu lista de tareas, solo llame al `app.setUserTasks` con una matriz vacía:

```javascript
const {app} = require('electron') app.setUserTasks([])
```

Las tareas de usuario todavía mostrará incluso después de la aplicación se cierra, por lo que debe existir el icono y el programa ruta de acceso especificada para una tarea hasta que se desinstala la aplicación.

## Barras de herramientas miniatura

En Windows puede Agregar una barra de herramientas de miniatura con los botones especificados en un diseño de barra de tareas de una ventana de aplicación. Proporciona a los usuarios una manera de acceder a comando de una determinada ventana sin restaurar o activando la ventana.

De MSDN, se ilustra:

> Esta barra de herramientas es simplemente el control de barra de herramientas estándar familiar común. Tiene un máximo de siete botones. Identificación, imagen, Descripción y estado de cada botón están definidos en una estructura, que luego se pasa a la barra de tareas. La aplicación puede mostrar, activar, desactivar u ocultar los botones de la barra de herramientas miniatura según se requiera por su estado actual.
> 
> Por ejemplo, Windows Media Player puede ofrecer medios estándar controles como play, pause, mute y parada de transporte.

**Barra de herramientas de miniatura de Windows Media Player:**

![jugador](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Puede utilizar [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows-7) para establecer la barra de herramientas de miniatura en su aplicación:

```javascript
const {BrowserWindow} = ruta const require('electron') = require('path') que ganar = new BrowserWindow({
  width: 800,
  height: 600
}) win.setThumbarButtons ([{Descripción: 'button1', icono: path.join (__dirname, 'button1.png'), haga clic en () {console.log ('haga clic en button1')}}, {Descripción: 'button2', icono: path.join (__dirname, 'button2.png'), banderas: ['enabled', 'dismissonclick'], haga clic en () {console.log ('button2 clic.')}
  }
])
```

Para limpiar los botones de miniaturas de la barra de herramientas, solo llame al `BrowserWindow.setThumbarButtons` con una matriz vacía:

```javascript
const {BrowserWindow} = require('electron') que ganar = nuevo BrowserWindow() win.setThumbarButtons([])
```

## Accesos directos unidad Launcher (Linux)

En unidad, puede añadir entradas personalizadas a su lanzador a través de modificar el archivo`.desktop`, consulte métodos abreviados de [Adding a un Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Métodos abreviados de lanzador de audaz:**

![audaz](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Barra de progreso en barra de tareas (Windows, macOS, unidad)

En Windows, un botón de barra de tareas puede utilizarse para mostrar una barra de progreso. Esto permite una ventana proporcionar información de progreso al usuario sin que el usuario tener que cambiar a la ventana sí mismo.

En macOS se mostrará la barra de progreso como parte del icono del dock.

El DE la unidad también tiene una función similar que permite especificar la barra de progreso en el lanzador.

**Barra de progreso en barra de tareas botón:**

![Barra de progreso de la barra de tareas](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Para configurar la barra de progreso para una ventana, puede utilizar[BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron') que ganar = nuevo BrowserWindow() win.setProgressBar(0.5)
```

## Superposiciones de icono en la barra de tareas (Windows)

En Windows un botón de barra de tareas puede utilizar una pequeña superposición para mostrar el estado de la aplicación, según lo cotizado de MSDN:

> Superposiciones de icono sirven como un aviso contextual del estado y pretenden negar la necesidad de un icono de estado del área de notificación separada comunicar esa información al usuario. Por ejemplo, ahora se puede indicar el nuevo estado de correo en Microsoft Outlook, se muestra actualmente en el área de notificación, a través de una superposición en el botón de la barra de tareas. Otra vez, debe decidir durante su ciclo de desarrollo que método es mejor para su aplicación. Los iconos de superposición se pretenden suministrar estado importante, larga o notificaciones como estado de la red, estado de messenger o correo nuevo. El usuario no debe presentarse con cambiantes superposiciones o animaciones.

**Superposición en el botón de la barra de tareas:**

![Superposición en el botón de la barra de tareas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Para configurar el icono de la superposición de una ventana, puede utilizar[BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows-7) API:

```javascript
const {BrowserWindow} = require('electron') que ganar = new BrowserWindow() win.setOverlayIcon (' ruta/a/overlay.png', 'Descripción de superposición')
```

## Marco Flash (Windows)

En Windows podemos destacar el botón de la barra de tareas para conseguir la atención del usuario. Esto es similar a la que despide el icono del dock de macOS. De la documentación de la referencia MSDN:

> Por lo general, una ventana es flasheada para informar al usuario que la ventana requiere atención pero que no tiene actualmente el foco de teclado.

Flash el botón de la barra de tareas de BrowserWindow, puede utilizar[BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron') que ganar = new BrowserWindow() win.once ('enfoque', () => win.flashFrame(false)) win.flashFrame(true)
```

No olvide llamar al método `flashFrame` con el `false` para desactivar el flash. En el ejemplo anterior, se llama cuando la ventana entra en foco, pero podría utilizar un tiempo de espera o algún otro evento para desactivarlo.

## Mentionada aquí archivo de ventana (macOS)

MacOS una ventana puede establecer en su archivo mentionada aquí, así que el icono del archivo puede mostrar en la barra de título y cuando usuarios clic de comando o Control y haga clic en el título mostrará una ventana emergente de la ruta.

También puede establecer el estado editado de una ventana para que el icono del archivo puede indicar si se ha modificado el documento en esta ventana.

**Menú Archivo mentionada aquí:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

Para configurar el archivo mentionado de ventana, puede utilizar el[BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-os-x) y[BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-os-x) API:

```javascript
const {BrowserWindow} = require('electron') que ganar = nueva BrowserWindow() win.setRepresentedFilename('/etc/passwd') win.setDocumentEdited(true)
```

## Arrastrar archivos a la ventana

Para ciertos tipos de aplicaciones que manipulan archivos, es importante poder arrastrar archivos de electrones a otras aplicaciones. Para implementar esta función en su aplicación, es necesario llamar a `webContents.startDrag (punto)` API de `ondragstart` evento.

En la página web:

```html
<a href="#" id="drag">item</a><script type="text/javascript" charset="utf-8"> document.getElementById('drag').ondragstart = (evento) = > {event.preventDefault() ipcRenderer.send ('ondragstart', '/ ruta/a/item')}</script>
```

En el proceso principal:

```javascript
const {ipcMain} = require('electron') ipcMain.on ('ondragstart', (evento, filePath) => {event.sender.startDrag ({archivo: filePath, icono: ' / path/to/icon.png'})})
```