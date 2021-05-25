# Menu

## Clase: Menú

> Crea menús de aplicaciones nativas y menús contextuales.

Proceso: [Main](../glossary.md#main-process)

### `new Menu()`

Crea un nuevo menú.

### Métodos Estáticos

La clase `Menu` tiene los siguientes métodos estáticos:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Establece `menu` como el menú de la aplicación en macOS. En Windows y Linux el `menu` será establecido como el menú superior de la ventana.

Además en Windows y Linux, puedes usar un `&` en el nombre del ítem de nivel superior para indicar que letra debe obtener un acelerador generado. Por ejemplo, usando `&File` para el menú resultaría en un acelerador generado `Alt-F` que abre el menú asociado. El carácter indicado en la etiqueta del botón entonces aparecerá subrayado, y el carácter `&` no se mostrará en la etiqueta del botón.

Para poder saltar el carácter `&` en el nombre de un objeto, usa un `&` procedural. Por ejemplo, `&&Archivo` abrirá `&Archivo` en la etiqueta del botón.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** El menú por defecto será creado automáticamente si la aplicación no establece uno. Esto contiene los ítems estándares como `File`, `Edit`, `View`, `Window` y `Help`.

#### `Menu.getApplicationMenu()`

Devuelve `Menu | null` - El menú de aplicación, si se creó, o `null` en caso contrario.

**Nota:** La instancia devuelta `Menu` no soporta adiciones dinámicas o la eliminación de elementos del menú. [Instance properties](#instance-properties) todavía puede ser modificada dinámicamente.

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

Envía la `action` al primer respondedor de la aplicación. Esto es usado para emular los comportamientos del menú macOS por defecto. Normalmente usarías el [`rol`](menu-item.md#roles) propiedad de un [`MenuItem`](menu-item.md).

Consulte la [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) para más información sobre las acciones nativas de macOS.

#### `Menu.buildFromTemplate(template)`

* `plantilla` (MenuItemConstructorOptions | MenuItem)[]

Devuelve `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

Usted puede además adjuntar otros campos al elemento del `template` y se convierten en propiedades de los items del menú construido.

### Métodos de Instancia

El objeto`menu` tiene los siguientes métodos de instancia:

#### `menu.popup([options])`

* `options` Object (opcional)
  * `window` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.
  * `x` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `y` es declarado.
  * `y` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `x` es declarado.
  * `positioningItem` Número (opcional) _macOS_ - El índice del elemento del menú que debe ser posicionado debajo del cursor en las coordenadas específicas. El valor predeterminado es -1.
  * `callback` Function (opcional) - Llamada cuando se cierra el menu.

Este menú aparece como un menú contextual en el [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.

Cierra el menú de contexto en la `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Anexa el `menuItem` al menú.

#### `menu.getMenuItemById(id)`

* `id` Cadena

Devuelve `MenuItem | null` el item con el `id` especificado

#### `menu.insert(pos, menuItem)`

* `pos` Entero
* `menuItem` [MenuItem](menu-item.md)

Inserta el `menuItem` en la posición `pos` del menú.

### Eventos de Instancia

Objetos creados con `new Menu` o retornados por `Menu.buildFromTemplate` emiten los siguientes eventos:

**Nota:** Algunos eventos sólo están disponibles en sistemas operativos específicos y se etiquetan como tal.

#### Evento: 'menu-will-show'

Devuelve:

* `event` Event

Emitido cuando se llama a `menu.popup()`.

#### Evento: 'menu-will-close'

Devuelve:

* `event` Event

Se emite cuando una ventana emergente se cierra manualmente o con `menu.closePopup()`.

### Propiedades de Instancia

Los objetos `menu` también tienen las siguientes propiedades:

#### `menu.items`

Un arreglo `MenuItem[]` contiene los elementos del menú.

Cada `Menu` se compone de múltiples [`MenuItem`](menu-item.md) y cada `MenuItem` tiene un submenú.

## Ejemplos

Un ejemplo de creación de una menú de la aplicación con el API simple template:

```javascript
const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Proceso de renderizado

Para crear menús iniciados por el renderer process, envía la información requerida al main process usando IPC y haz que main process muestre el menú en nombre del renderer.

A continuación un ejemplo de mostrar un menú cuando el usuario pulsa el botón derecho en la página:

```js
// renderer
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) => {
  // ...
})

// main
ipcMain.on('show-context-menu', (event) => {
  const template = [
    {
      label: 'Menu Item 1',
      click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
    },
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})
```

## Notas sobre el menú de la aplicación en macOS

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Menús Estándar

En macOS hay muchos menúes estándares definidos por el sistema, como los menúes [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) y`Windows`. Para hacer que el menú sea un menú estándar, se debe configurar el `role` del menú a uno de los siguientes y Electron los reconocerá y convertirá en menús estándares:

* `window`
* `help`
* `services`

### Acciones estándares de los elementos del menú

macOS ha proporcionado acciones estándares para algunos elementos del menú, como `About xxx`, `Hide xxx`, y `Hide Others`. Para establecer la acción de un elemento de menú en una acción estándar, debe establecer el atributo `función` del elemento del menú.

### Nombre del menú principal

En macOS, la etiqueta del primer elemento del menú de la aplicación siempre es su nombre de aplicación, sin importar la etiqueta que establezca. Para cambiarlo, modifique el archivo `Info.plist` file del conjunto de la app. Para mayor información, ver[About Information Property List Files][AboutInformationPropertyListFiles].

## Menú de configuración para la ventana del navegador específico (*Linux* *Windows*)

El [`setMenu` method][setMenu] de las ventanas del navegador pueden configurar el menú de ciertas ventanas del navegador.

## La posición del elemento del menú

Tú puedes hacer uso de `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` y `id` para controlar como el elemento sera colocado cuando un menu sea construido con `Menu.buildFromTemplate`.

* `before` - Inserta este ítem antes que el ítem con la etiqueta especificada. Si el ítem referenciado no existe se insertara al final del menú. Ademas implica que el ítem del menú en cuestión debe ser colocado en el mismo "grupo" como el ítem.
* `after` - Inserta este ítem después del ítem con la etiqueta especificada. Si el ítem referenciado no existe se insertara al final del menú. Ademas implica que el ítem del menú en cuestión debe ser colocado en el mismo "grupo" como el ítem.
* `beforeGroupContaining` - Proporciona una manera que un único menú contextual declare la ubicación de su grupo contenedor antes del grupo contenedor del ítem con la etiqueta especificada.
* `beforeGroupContaining` - Proporciona una manera que un único menú contextual declare la ubicación de su grupo contenedor antes del grupo contenedor del ítem con la etiqueta especificada.

Por defecto, los elementos se insertarán en el orden en que existen en la plantilla, a menos que se utilice una de las palabras clave de posicionamiento especificadas.

### Ejemplos

Plantilla:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Menú:

```sh
- 1
- 2
- 3
- 4
```

Plantilla:

```javascript
[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', label: 'three', beforeGroupContaining: ['1'] },
  { id: '4', label: 'four', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
```

Menú:

```sh
- 3
- 4
- ---
- 1
- ---
- 2
```

Plantilla:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Menú:

```sh
- ---
- 3
- 2
- 1
```

[AboutInformationPropertyListFiles]: https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html
[setMenu]: https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows
