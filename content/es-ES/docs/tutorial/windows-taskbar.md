# Barra de tareas de Windows

## Descripción general

Electron tiene APIs para configurar el icono de la aplicación en la barra de tareas de Windows. Esta de API admite características de solo Windows [como la creación de una](#jumplist)de `JumpList`, [miniaturas y barras de herramientas](#thumbnail-toolbars), [icono superposiciones](#icon-overlays-in-taskbar)y el efecto de ["marco de Flash"](#flash-frame), y las características multiplataforma como [documentos recientes][recent-documents] y [progreso de la aplicación][progress-bar].

## JumpList

Windows permite a las aplicaciones definir un menú contextual personalizado que aparece cuando los usuarios hacen clic con el botón derecho en el ícono de las aplicaciones en la barra de tareas. Ese menú contextual se llama `JumpList`. Puedes especificar acciones personalizadas en la categoría de `Tasks` de JumpList, como se cita desde [][msdn-jumplist]MSDN:

> Las aplicaciones definen tareas basadas tanto en las características del programa como en las cosas claves que se espera que haga un usuario con ellas. Las tareas deben estar libres de contexto, en que la aplicación no necesita ejecutarse para que funcione. También deberían ser las acciones estadísticamente más comunes que un usuario normal llevaría a cabo en una aplicación, como redactar un mensaje de correo electrónico o abrir el calendario en un programa de correo, crear un nuevo documento en un procesador de texto, iniciar una aplicación en un determinado modo, o ejecuta uno de sus subcomandos. Una aplicación no debe saturar el menú con características avanzadas que los usuarios estándar no necesitarán o acciones únicas como el registro. No utilice tareas para artículos promocionales como actualizaciones u ofertas especiales.
> 
> Se recomienda encarecidamente que la lista de tareas sea estática. Debería permanecer igual independientemente del estatus o estado de la aplicación. Si bien es posible variar la lista de forma dinámicamente, debe considerar que esto podría confundir al usuario que no espera que esa parte de la lista de destinos cambie.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTA: La captura anterior es un ejemplo de tareas generales de Internet Explorer

A diferencia del dock menú en macOS el cual es un menú real, user tasks en Windows funcionan como atajos de aplicación. Por ejemplo, cuando un usuario pulsa en un task, el programa será ejecutado con argumentos especificados.

Para configurar las tareas del usuario para tu aplicación, puedes usar [app. setUserTasks][setusertaskstasks] API.

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

> Nota: las tareas del usuario seguirán mostrándose incluso después de cerrar tu aplicación de , por lo que debe existir el icono y la ruta del programa especificados para una tarea hasta que se desinstale tu aplicación.

### Barra de tareas de Thumbnail

En Windows, puedes agregar una barra de herramientas en miniatura con botones especificados a una barra de tareas diseño de una ventana de aplicación. Brinda a los usuarios una manera de acceder a un comando de ventana particular sin restaurar o activar la ventana.

Como se cita desde [MSDN][msdn-thumbnail]:

> Esta barra de herramientas es la barra de tareas estándar de control común. Tiene un máximo de siete botones. Cada botón de identificación, imagen, descripción y estado está definido en una estructura, la cual es pasada a la barra de tareas. La aplicación puede mostrar, habilitar, deshabilitar u ocultar botones de la barra de herramientas si es requerido por su estado actual.
> 
> Por ejemplo, el reproductor de Windows ofrece regularmente controles de transporte como play, pausa, silenciar y detener.

![intérprete](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTA: La captura de pantalla anterior es un ejemplo de thumbnail toolbar del Media Player de  Windows

Para configurar una barra de herramientas en miniatura en tu aplicación, debes usar [BrowserWindow. setThumbarButtons][setthumbarbuttons]

#### Ejemplos

##### Establecer thumbnail toolbar

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript
const { BrowserWindow } = require (' Electron ')
const path = require (' path ')

const Win = New BrowserWindow ()

Win. setThumbarButtons ([
  {
    Tooltip: ' button1 ',
    icono: path. join (__dirname, ' Button1. png '),
    click () {Console. log (' button1 clicked ')}
  }, {
    Tooltip: ' BUTTON2 ',
    Icon: path. join (__dirname, ' Button2. png '),
    Flags: [' Enabled ', ' destitusonclick '],
    click () {Console. log (' BUTTON2 Clicked. ') }
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

Para configurar el icono de superposición de una ventana, debes usar el [BrowserWindow. setOverlayIcon][setoverlayicon] API.

#### Ejemplo

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript
const { BrowserWindow } = require (' Electron ')

const Win = New BrowserWindow ()

Win. setOverlayIcon (' Path/to/Overlay. png ', ' Description for overlay ')
```

### Flash Frame

En Windows, puedes resaltar el botón de la barra de tareas para obtener la atención del usuario. Esto es similar al rebote del ícono en el dock de macOS.

Como se cita desde [MSDN][msdn-flash-frame]:

> Por lo general, una ventana está iluminada para informar al usuario que la ventana requiere atención pero este no está concentrado en el teclado en el momento.

Para destellar el botón de la barra de tareas del BrowserWindow, debes usar el [BrowserWindow. flashFrame][flashframe] API.

#### Ejemplo

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript
const { BrowserWindow } = require (' Electron ')

const Win = New BrowserWindow ()

Win. once (' Focus ', () => Win. flashFrame (false))
Win. flashFrame (true)
```

> NOTA: No olvides llamar a `win.flashFrame(false)` para desactivar el destello. En el ejemplo anterior,  es llamado cuando la ventana entra en foco, pero puede que uses un temporizador o algún otro evento para desactivarlo.

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

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
