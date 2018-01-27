## Clase: Menu

> Crea menús de aplicaciones nativas y menús contextuales.

Proceso: [Main](../glossary.md#main-process)

### `new Menu()`

Crea un nuevo menú.

### Métodos estáticos

La clase `menú` tiene los siguientes métodos estáticos:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu

Configura el `menu` como el menú de la aplicación en macOS. En Windows y Linux, el `menu` se configurará como menú superior de cada ventana.

Pasar `null` eliminará la barra de menús en Windows y Linux pero no tiene efecto alguno en macOS.

**Nota:** Esta API no puede ser llamada antes de que el evento `ready` del módulo de `app` sea emitido.

#### `Menu.getApplicationMenu()`

Devuelve `Menu` - El menú de la aplicación si se configura, o `null`, si no se configura.

**Nota:** La instancia devuelta `Menu` no soporta adiciones dinámicas o la eliminación de elementos del menú. [Instance properties](#instance-properties) todavía puede ser modificada dinámicamente.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` Cadena

Envía la `action` al primer respondedor de la aplicación. Esto es usado para emular los comportamientos del menú macOS por defecto. Normalmente se usa la propiedad [`role`](menu-item.md#roles) de un [`MenuItem`](menu-item.md).

Consulte la [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) para más información sobre las acciones nativas de macOS.

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

Devuelve `Menu`

Generalmente, la `template` es sólo un arreglo de `options` para la construcción de un [MenuItem](menu-item.md). El uso hace referencia a lo anteriormente mencionado.

Se pueden anexar otros campos al elemento de la `template` y pueden convertirse en propiedades de los elementos del menú creado.

### Métodos de Instancia

El objeto`menu` tiene los siguientes métodos de instancia:

#### `menu.popup([browserWindow, options])`

* `browserWindow` BrowserWindow (opcional) - Por defecto es la ventana enfocada.
* `options` Objeto (opcional) 
  * `x` Número (opcional) - Por defecto es la posición actual del cursor del ratón. Debe declararse si `y` se declara primero.
  * `y` Número (opcional) - Por defecto es la posición actual del cursor del ratón. Debe declararse si `y` se declara primero.
  * `async` Boolean (opcional) - Se establece a `true` para devolver este método llamado inmediatamente. `false` para devolver luego de que el menú ha sido seleccionado o cerrado. Por defecto es `false`.
  * `positioningItem` Número (opcional) *macOS* - El índice del elemento de menú está colocado por debajo del cursor del ratón en las coordenadas específicas. Por defecto es -1.

Este menú aparece como un menú de contexto en la `browserWindow`.

#### `menu.closePopup([browserWindow])`

* `browserWindow` BrowserWindow (opcional) - Por defecto es la ventana enfocada.

Cierra el menú de contexto en la `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` Elemento del menú

Anexa el `menuItem` al menú.

#### `menu.insert(pos, menuItem)`

* `pos` Entero
* `menuItem` Elemento del menú

Inserta el `menuItem` en la posición `pos` del menú.

### Propiedades de Instancia

Los objetos `menu` también tienen las siguientes propiedades:

#### `menu.items`

Un arreglo `MenuItem[]` contiene los elementos del menú.

Cada `Menu` se compone de múltiples [`MenuItem`](menu-item.md) y cada `MenuItem` tiene un submenú.

## Ejemplos

La clase `Menu` solo está disponible en el proceso principal, pero también se puede usar en el proceso de renderizado a través del módulo [`remote`](remote.md).

### Proceso principal

Ejemplo de la creación del menú de la aplicación en el proceso principal con la API de plantilla:

```javascript
const {app, Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Editar menú
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Menú de ventana
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Proceso de renderizado

A continuación, un ejemplo de cómo crear un menú dinámicamente en una página web (proceso de renderizado) utilizando el módulo [`remote`](remote.md), y mostrarlo cuando el usuario le dé clic derecho a la ventana:

```html
<!-- index.html -->
<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)
</script>
```

## Notas sobre el menú de la aplicación en macOS

macOS tiene un estilo de menú de aplicaciones completamente diferente de Windows y Linux. Aquí hay algunas notas sobre cómo hacer que el menú de su aplicación sea más parecido a un nativo.

### Menús Estándar

En macOS hay muchos menús estándares definidos por el sistema, como los menus `Services` y `Windows`. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `ventana`
* `ayuda`
* `servicios`

### Acciones de Elementos del Menú Estándar

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. Para establecer la acción de un elemento de menú en una acción estándar, debe establecer el atributo `función` del elemento del menú.

### Nombre del menú principal

En macOS, la etiqueta del primer elemento del menú de la aplicación siempre es su nombre de aplicación, sin importar la etiqueta que establezca. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## Setting Menu for Specific Browser Window (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Menu Item Position

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

Cuando se coloca un elemento, todos los elementos desubicados se insertan después hasta que se coloca un nuevo elemento. Entonces, si quieres posicionar un grupo de elementos de menú en la misma ubicación solo necesitas especificar una posición para el primer artículo.

### Ejemplos

Plantilla:

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', position: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
```

Menu:

    <br />- 1
    - 2
    - 3
    - 4
    - 5
    

Plantilla:

```javascript
[
  {label: 'a', position: 'endof=letters'},
  {label: '1', position: 'endof=numbers'},
  {label: 'b', position: 'endof=letters'},
  {label: '2', position: 'endof=numbers'},
  {label: 'c', position: 'endof=letters'},
  {label: '3', position: 'endof=numbers'}
]
```

Menu:

    <br />- ---
    - a
    - b
    - c
    - ---
    - 1
    - 2
    - 3