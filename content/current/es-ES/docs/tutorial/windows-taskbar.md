# Barra de tareas de Windows

Electron tiene APIs para configurar el icono de la aplicación en la barra de tareas de Windows. Se soporta la [creación de `JumpList`](#jumplist), [miniaturas personalizadas y barras de herramientas](#thumbnail-toolbars), [encubrimiento de íconos](#icon-overlays-in-taskbar) y el efecto llamado ["Flash Frame"](#flash-frame), pero Electron también utiliza el icono del dock de la aplicación para implementar funciones multiplataforma como [documentos recientes](./recent-documents.md) y el [progreso de la aplicación](./progress-bar.md).

## JumpList

Windows permite a las aplicaciones definir un menú contextual personalizado que aparece cuando los usuarios hacen clic con el botón derecho en el ícono de las aplicaciones en la barra de tareas. Ese menú contextual se llama `JumpList`. Especifique acciones personalizadas en la categoría `Tasks` de JumpList, como se cita en MSDN:

> Las aplicaciones definen tareas basadas tanto en las características del programa como en las cosas claves que se espera que haga un usuario con ellas. Las tareas deben estar libres de contexto, en que la aplicación no necesita ejecutarse para que funcione. También deberían ser las acciones estadísticamente más comunes que un usuario normal llevaría a cabo en una aplicación, como redactar un mensaje de correo electrónico o abrir el calendario en un programa de correo, crear un nuevo documento en un procesador de texto, iniciar una aplicación en un determinado modo, o ejecuta uno de sus subcomandos. Una aplicación no debe saturar el menú con características avanzadas que los usuarios estándar no necesitarán o acciones únicas como el registro. No utilice tareas para artículos promocionales como actualizaciones u ofertas especiales.
> 
> Se recomienda encarecidamente que la lista de tareas sea estática. Debería permanecer igual independientemente del estatus o estado de la aplicación. Si bien es posible variar la lista de forma dinámicamente, debe considerar que esto podría confundir al usuario que no espera que esa parte de la lista de destinos cambie.

**Tareas de Internet Explorer:**

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

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

Para limpiar su lista de tareas, llame a `app.setUserTasks` con un arreglo vacío:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Las tareas del usuario aún se mostrará después de que la aplicación se cierre, de esta manera el ícono y ruta del programa especificado para su tarea exista aún así la aplicación haya sido desinstalada.

## Barra de tareas de Thumbnail

En Windoes usted puede añadir una barra de tareas thumbnail con botones específicos en un diseñador de barras de tareas de una ventana de un aplicación. Le da a los usuarios una manera de acceder a una comando de ventana en particular sin tener que restaurar o activar la ventana.

Para MSDN, está ilustrado:

> Esta barra de herramientas es la barra de tareas estándar de control común. Tiene un máximo de siete botones. Cada botón de identificación, imagen, descripción y estado está definido en una estructura, la cual es pasada a la barra de tareas. La aplicación puede mostrar, habilitar, deshabilitar u ocultar botones de la barra de herramientas si es requerido por su estado actual.
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
    click () { console.log('button1 clickeado') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clickeado.') }
  }
])
```

Para limpiar los botones de su barra de herramientas en miniatura, llame `BrowserWindow.setThumbarButtons` con un arreglo vacío:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Encubrimiento de íconos en la barra de tareas

En Windows un botón de la barra de tareas puede usar un pequeño encubrimiento para mostrar el estatus de la aplicación, como es mencionado por la MSDN:

> El encubrimiento de íconos sirve como una notificación contextual del estatus, y tiene la intención de negar la necesidad de separar el ícono de la notificación del estatus del ícono para comunicar la información al usuario. Por ejemplo, el nuevo estatus de correos en Microsoft Outlook, actualmente se muestra en el área de notificaciones, ahora puede ser indicado a través de un encubrimiento en el botón de la barra de tareas. De nuevo, debes decidir durante su ciclo de desarrollo cual método es el mejor para su aplicación. El encubrimiento de íconos tiene la intención de dar información importante, estatus de larga duración o notificaciones así como estado de la red o de mensajería, o nuevos correos. El usuario no debe ser presentado con cambios constantes en el encubrimiento o animaciones.

**Encubrimiento en botones de la barra de tareas:**

![Encubrimiento en botones de la barra de tareas](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Para configurar el encubrimiento de un ícono para una ventana tiene que usar el API [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Descripción del overlay')
```

## Flash Frame

En Windows, puede resaltar el botón de la barra de tareas para llamar la atención del usuario. Esto es similar al rebote del ícono en el dock de macOS. De la documentación de referencia de MSDN:

> Por lo general, una ventana está iluminada para informar al usuario que la ventana requiere atención pero este no está concentrado en el teclado en el momento.

Para iluminar el botón de la barra de tareas del buscador windows, usted puede usar el API [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

No olvide llamar el método `flashFrame` con `false` a apagar la iluminación. En el ejemplo anterior, se llama cuando la ventana entra en foco, pero es posible que use un tiempo de espera u otro evento para deshabilitarlo.