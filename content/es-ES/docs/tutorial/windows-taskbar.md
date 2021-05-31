# Barra de tareas de Windows

## Descripción general

Electron tiene APIs para configurar el icono de la aplicación en la barra de tareas de Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpList

Windows permite a las aplicaciones definir un menú contextual personalizado que aparece cuando los usuarios hacen clic con el botón derecho en el ícono de las aplicaciones en la barra de tareas. Ese menú contextual se llama `JumpList`. Especificas acciones personalizadas en la categoría `Tasks` de JumpList, como se menciona en [MSDN][msdn-jumplist]:

> Las aplicaciones definen tareas basadas tanto en las características del programa como en las cosas claves que se espera que haga un usuario con ellas. Las tareas deben estar libres de contexto, en que la aplicación no necesita ejecutarse para que funcione. También deberían ser las acciones estadísticamente más comunes que un usuario normal llevaría a cabo en una aplicación, como redactar un mensaje de correo electrónico o abrir el calendario en un programa de correo, crear un nuevo documento en un procesador de texto, iniciar una aplicación en un determinado modo, o ejecuta uno de sus subcomandos. Una aplicación no debe saturar el menú con características avanzadas que los usuarios estándar no necesitarán o acciones únicas como el registro. No utilice tareas para artículos promocionales como actualizaciones u ofertas especiales.
> 
> Se recomienda encarecidamente que la lista de tareas sea estática. Debería permanecer igual independientemente del estatus o estado de la aplicación. Si bien es posible variar la lista de forma dinámicamente, debe considerar que esto podría confundir al usuario que no espera que esa parte de la lista de destinos cambie.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTA: La captura anterior es un ejemplo de tareas generales de Internet Explorer

A diferencia del dock menú en macOS el cual es un menú real, user tasks en Windows funcionan como atajos de aplicación. Por ejemplo, cuando un usuario pulsa en un task, el programa será ejecutado con argumentos especificados.

Para establecer las tareas de usuario en tu aplicación, puedes usar la API [app.setUserTasks][setusertaskstasks].

#### Ejemplos

##### Establecer tareas de usuario

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

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

##### Limpiar la lista de tareas

Para limpiar tu lista de tareas, necesitas llamar a `app.setUserTasks` con un array vacío en el archivo `main.js`.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### Barra de tareas de Thumbnail

En Windows puedes añadir una miniatura a la barra de tareas con botones específicos a un layout de barra de tareas de una ventana de aplicacion. Provee a los usuarios con una manera de acceder a un comando de ventana en particular sin restaurar o activar la ventana.

Como se cita desde [MSDN][msdn-thumbnail]:

> Esta barra de herramientas es la barra de tareas estándar de control común. Tiene un máximo de siete botones. Cada botón de identificación, imagen, descripción y estado está definido en una estructura, la cual es pasada a la barra de tareas. La aplicación puede mostrar, habilitar, deshabilitar u ocultar botones de la barra de herramientas si es requerido por su estado actual.
> 
> Por ejemplo, el reproductor de Windows ofrece regularmente controles de transporte como play, pausa, silenciar y detener.

![intérprete](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTA: La captura de pantalla anterior es un ejemplo de thumbnail toolbar del Media Player de  Windows

Para establecer la miniatura de la barra de tareas en tu aplicación, tienes que usar [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### Ejemplos

##### Establecer thumbnail toolbar

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

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

##### Limpiar thumbnail toolbar

Para borrar los botones de thumbnail toolbar, necesitas llamar `BrowserWindow.setThumbarButtons` con un array vacío en el archivo `main.js`.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Encubrimiento de íconos en la barra de tareas

En Windows, un botón de la barra de tareas puede usar una pequeña superposición para mostrar el estado de la aplicación.

Como se cita desde [MSDN][msdn-icon-overlay]:

> El encubrimiento de íconos sirve como una notificación contextual del estatus, y tiene la intención de negar la necesidad de separar el ícono de la notificación del estatus del ícono para comunicar la información al usuario. Por ejemplo, el nuevo estatus de correos en Microsoft Outlook, actualmente se muestra en el área de notificaciones, ahora puede ser indicado a través de un encubrimiento en el botón de la barra de tareas. De nuevo, debes decidir durante su ciclo de desarrollo cual método es el mejor para su aplicación. El encubrimiento de íconos tiene la intención de dar información importante, estatus de larga duración o notificaciones así como estado de la red o de mensajería, o nuevos correos. El usuario no debe ser presentado con cambios constantes en el encubrimiento o animaciones.

![Encubrimiento en botones de la barra de tareas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTA: La captura de pantalla anterior es un ejemplo de superposición en un botón de la barra de tareas

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### Ejemplo

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

En Windows, puedes resaltar el botón de la barra de tareas para obtener la atención del usuario. Esto es similar al rebote del ícono en el dock de macOS.

Como se cita desde [MSDN][msdn-flash-frame]:

> Por lo general, una ventana está iluminada para informar al usuario que la ventana requiere atención pero este no está concentrado en el teclado en el momento.

Para destellar el botón de la barra de tareas del BrowserWindow, debes usar el [BrowserWindow. flashFrame][flashframe] API.

#### Ejemplo

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTA: No olvides llamar a `win.flashFrame(false)` para desactivar el destello. En el ejemplo anterior,  es llamado cuando la ventana entra en foco, pero puede que uses un temporizador o algún otro evento para desactivarlo.

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
