# Barra de tareas de Windows

## Descripción general

Electron tiene APIs para configurar el icono de la aplicación en la barra de tareas de Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Ese menú contextual se llama `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Las aplicaciones definen tareas basadas tanto en las características del programa como en las cosas claves que se espera que haga un usuario con ellas. Las tareas deben estar libres de contexto, en que la aplicación no necesita ejecutarse para que funcione. También deberían ser las acciones estadísticamente más comunes que un usuario normal llevaría a cabo en una aplicación, como redactar un mensaje de correo electrónico o abrir el calendario en un programa de correo, crear un nuevo documento en un procesador de texto, iniciar una aplicación en un determinado modo, o ejecuta uno de sus subcomandos. Una aplicación no debe saturar el menú con características avanzadas que los usuarios estándar no necesitarán o acciones únicas como el registro. No utilice tareas para artículos promocionales como actualizaciones u ofertas especiales.
> 
> Se recomienda encarecidamente que la lista de tareas sea estática. Debería permanecer igual independientemente del estatus o estado de la aplicación. Si bien es posible variar la lista de forma dinámicamente, debe considerar que esto podría confundir al usuario que no espera que esa parte de la lista de destinos cambie.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

Para usar tareas para su aplicación, puede usar la API [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows).

#### Ejemplos

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### Barra de tareas de Thumbnail

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> Esta barra de herramientas es la barra de tareas estándar de control común. Tiene un máximo de siete botones. Cada botón de identificación, imagen, descripción y estado está definido en una estructura, la cual es pasada a la barra de tareas. La aplicación puede mostrar, habilitar, deshabilitar u ocultar botones de la barra de herramientas si es requerido por su estado actual.
> 
> Por ejemplo, el reproductor de Windows ofrece regularmente controles de transporte como play, pausa, silenciar y detener.

![intérprete](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Ejemplos

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clickeado') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clickeado.') }
  }
])
```

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Encubrimiento de íconos en la barra de tareas

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> El encubrimiento de íconos sirve como una notificación contextual del estatus, y tiene la intención de negar la necesidad de separar el ícono de la notificación del estatus del ícono para comunicar la información al usuario. Por ejemplo, el nuevo estatus de correos en Microsoft Outlook, actualmente se muestra en el área de notificaciones, ahora puede ser indicado a través de un encubrimiento en el botón de la barra de tareas. De nuevo, debes decidir durante su ciclo de desarrollo cual método es el mejor para su aplicación. El encubrimiento de íconos tiene la intención de dar información importante, estatus de larga duración o notificaciones así como estado de la red o de mensajería, o nuevos correos. El usuario no debe ser presentado con cambios constantes en el encubrimiento o animaciones.

![Encubrimiento en botones de la barra de tareas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Ejemplo

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Por lo general, una ventana está iluminada para informar al usuario que la ventana requiere atención pero este no está concentrado en el teclado en el momento.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Ejemplo

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.
