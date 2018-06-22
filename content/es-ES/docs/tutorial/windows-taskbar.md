# Barra de tareas de Windows

Electron tiene APIs para configurar el icono de la aplicación en la barra de tareas de Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> Las aplicaciones definen tareas basadas tanto en las características del programa como en las cosas claves que se espera que haga un usuario con ellas. Las tareas deben estar libres de contexto, en que la aplicación no necesita ejecutarse para que funcione. También deberían ser las acciones estadísticamente más comunes que un usuario normal llevaría a cabo en una aplicación, como redactar un mensaje de correo electrónico o abrir el calendario en un programa de correo, crear un nuevo documento en un procesador de texto, iniciar una aplicación en un determinado modo, o ejecuta uno de sus subcomandos. Una aplicación no debe saturar el menú con características avanzadas que los usuarios estándar no necesitarán o acciones únicas como el registro. No utilice tareas para artículos promocionales como actualizaciones u ofertas especiales.
> 
> Se recomienda encarecidamente que la lista de tareas sea estática. Debería permanecer igual independientemente del estatus o estado de la aplicación. Si bien es posible variar la lista de forma dinámicamente, debe considerar que esto podría confundir al usuario que no espera que esa parte de la lista de destinos cambie.

**Tareas de Internet Explorer:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

A diferencia del menú Dock en macOS, que es un menú real, las tareas de usuario en Windows funcionan como accesos directos a aplicaciones, de modo que cuando el usuario hace clic en una tarea, se ejecuta un programa con argumentos especificados.

Para usar tareas para su aplicación, puede usar la API [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows):

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

To clean your tasks list, call `app.setUserTasks` with an empty array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Las tareas del usuario aún se mostrará después de que la aplicación se cierre, de esta manera el ícono y ruta del programa especificado para su tarea exista aún así la aplicación haya sido desinstalada.

## Barra de tareas de Thumbnail

En Windoes usted puede añadir una barra de tareas thumbnail con botones específicos en un diseñador de barras de tareas de una ventana de un aplicación. Le da a los usuarios una manera de acceder a una comando de ventana en particular sin tener que restaurar o activar la ventana.

Para MSDN, está ilustrado:

> This toolbar is the familiar standard toolbar common control. Tiene un máximo de siete botones. Cada botón de identificación, imagen, descripción y estado está definido en una estructura, la cual es pasada a la barra de tareas. La aplicación puede mostrar, habilitar, deshabilitar u ocultar botones de la barra de herramientas si es requerido por su estado actual.
> 
> Por ejemplo, el reproductor de Windows ofrece regularmente controles de transporte como play, pausa, silenciar y detener.

**Barra de herramientas del reproductor de media de Windows:**

![intérprete](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Usted puede usar [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) para configurar la barra de herramientas en miniatura en su aplicación:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Para limpiar los botones de su barra de herramientas en miniatura, llame `BrowserWindow.setThumbarButtons` con un arreglo vacío:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

En Windows un botón de la barra de tareas puede usar un pequeño encubrimiento para mostrar el estatus de la aplicación, como es mencionado por la MSDN:

> El encubrimiento de íconos sirve como una notificación contextual del estatus, y tiene la intención de negar la necesidad de separar el ícono de la notificación del estatus del ícono para comunicar la información al usuario. Por ejemplo, el nuevo estatus de correos en Microsoft Outlook, actualmente se muestra en el área de notificaciones, ahora puede ser indicado a través de un encubrimiento en el botón de la barra de tareas. De nuevo, debes decidir durante su ciclo de desarrollo cual método es el mejor para su aplicación. El encubrimiento de íconos tiene la intención de dar información importante, estatus de larga duración o notificaciones así como estado de la red o de mensajería, o nuevos correos. El usuario no debe ser presentado con cambios constantes en el encubrimiento o animaciones.

**Encubrimiento en botones de la barra de tareas:**

![Encubrimiento en botones de la barra de tareas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Para configurar el encubrimiento de un ícono para una ventana tiene que usar el API [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows):

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Por lo general, una ventana está iluminada para informar al usuario que la ventana requiere atención pero este no está concentrado en el teclado en el momento.

Para iluminar el botón de la barra de tareas del buscador windows, usted puede usar el API [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag):

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

No olvide llamar el método `flashFrame` con `false` a apagar la iluminación. En el ejemplo anterior, se llama cuando la ventana entra en foco, pero es posible que use un tiempo de espera u otro evento para deshabilitarlo.