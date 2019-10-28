## Clase: MenuItem

> Agregue elementos a los menús y menús de contexto de la aplicación nativa.

Process: [Main](../glossary.md#main-process)

Vea [`Menú`](menu.md) para obtener ejemplos.

### `new MenuItem(options)`

* `opciones` Object 
  * `click` Function (opcional) - Será llamada con `click(menuItem, browserWindow, event)` cuando se hace click en el elemento del menú. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (opcional) - Puede ser `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define la acción del menu item, cuando es especificado la propiedad `click` sera ignorada. Ver [roles](#roles).
  * `type` String (opcional) - Puede ser `normal`, `separador`, `submenu`, `checkbox` o `radio`.
  * `label` String (opcional)
  * `sublabel` String (opcional)
  * `toolTip` String (optional) *macOS* - Hover text for this menu item.
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
  * `acceleratorWorksWhenHidden` Boolean (optional) *macOS* - default is `true`, and when `false` will prevent the accelerator from triggering the item if the item is not visible`.
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `registerAccelerator` Boolean (optional) *Linux* *Windows* - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `before` String[] (optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
  * `after` String[] (optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
  * `beforeGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  * `afterGroupContaining` String[] (optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

**Note:** `acceleratorWorksWhenHidden` es especificado como siendo macOS-solo porque los aceleradores siempre trabajan cuando los items son ocultados en Windows y Linux. La opción esta expuesta a los usuarios para darles a ellos la opción de apagarla, ya que esto es posible el el desarrollo nativo de macOS. Esta propiedad solo es usable en macOS High Sierra 10.13 o más recientes.

### Roles

Los roles le permiten a los elementos del menú tener comportamientos predeterminados.

Es mejor especificar el `rol` para todos los elementos del menú de tal manera que coincidan con los roles estandar, en vez de tratar de implementar un comportamiento manualmente en una función `click`. El comportamiento incorporador `rol` dará la mejor experiencia nativa.

Los valores de `etiqueta` y `acelerador` son opcionales mientras se usa un `rol` y por defecto se apropiarán valores de cada plataforma.

Cada elemento del menu deve tener un `role`, `label`, o en el caso de un separador un `type`.

La propiedad `role` puede tener los siguientes valores:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - Minimizar la venta actual.
* `close` - Cerrar la ventana actual.
* `quit` - Salir de la aplicación.
* `reload` - Recargar la ventana actual.
* `forceReload` - Recargar la ventana actual ignorando la caché.
* `toggleDevTools` - Alternar herramientas de desarrollador en la ventana actual.
* `togglefullscreen` - Alterna al modo de pantalla completa en la ventana actual.
* `resetZoom` - Restablece el nivel de zoom de la página enfocada al tamaño original.
* `zoomIn` - Zoom en la página enfocada en un 10%.
* `zoomOut` - Aleja la página enfocada en un 10%.
* `fileMenu` - Todo el menú "Archivo" por defecto (Cerrar / Salir)
* `editMenu` - Grupo por defecto de un menú "Edit" (Deshacer, Copiar, etc.).
* `viewMenu` - Todo el menú "Vista" por defecto (Recargar, Activar Herramientas del Desarrollador, etc.)
* `windowMenu` - Todo el menú "Ventana" por defecto (Minimizar, Zoom, etc.).

Los siguientes roles adicionales están disponibles en *macOS*:

* `appMenu` - Todo el menú "App" por defecto (Acerca de, Servicios, etc.)
* `about` - Enlace a la acción `orderFrontStandardAboutPanel`.
* `hide` - Enlace a la acción `hide`.
* `hideothers` - Enlace a la acción `hideOtherApplications`.
* `unhide` - Enlace a la acción `unhideAllApplications`.
* `startspeaking` - Enlace a la acción `startSpeaking`.
* `stopspeaking` - Enlace a la acción `stopSpeaking`.
* `front` - Enlace a la acción `arrangeInFront`.
* `zoom` - Enlace a la acción `performZoom`.
* `toggletabbar` - Enlace a la acción `toggleTabBar`.
* `selectnexttab` - Enlace a la acción `selectNextTab`.
* `selectprevioustab` - Enlace a la acción `selectPreviousTab`.
* `mergeallwindows` - Enlace a la acción `mergeAllWindows`.
* `movetabtonewwindow` - Enlace a la acción `moveTabToNewWindow`.
* `window` - El submenú es un menú "Ventana".
* `help` - El submenú es un menú "Ayuda".
* `services` - El sub menú es una menú ["Services"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc). Esto sólo está destinado a ser usado en el menú de aplicación y es *not* el mismo que el submenú "Servicios" usado en los menús contextuales en las aplicaciones macOS, el cual no está implementado en Electron.
* `recentDocuments` - El submenú es un menú "Abrir reciente".
* `clearRecentDocuments` - Enlace a la acción `clearRecentDocuments`.

Al especificar un `role` en macOS, `label` y `accelerator` son las únicas opciones que afectarán el elemento del menú. Todas las demás opciones serán ignoradas. Los `role` en minúscula, por ejemplo, `toggledevtools`, todavía son soportados.

**Nota Bene:** Las propiedades `enabled` y `visibility` no estan disponibles para el los elementos de menu de nivel superior en la bandeja en macOS.

### Propiedades de la instancia

Las siguientes propiedades están disponibles en instancias del `menú de elementos`:

#### `menuItem.id`

Un `String` indicando la etiqueta visible del elemento, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.label`

Un `String` indicando la etiqueta visible del elemento, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.click`

Un `Función` que se activa cuando el MenuItem recibe un evento de clic. Puede ser llamado con `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

Un `Menú` (opcional) que contiene el submenú del menú elemento, si está presente.

#### `menuItem.type`

A `String` indicating the type of the item. Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.

#### `menuItem.role`

Una `String` (opcional) indicando el rol del elemento, si está establecido. Puede ser `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `close`, `minimize`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`

#### `menuItem.accelerator`

A `Accelerator` (optional) indicating the item's accelerator, if set.

#### `menuItem.icon`

Una `NativeImage | String` (opcional) indicando el icono del elemento, si estuviera establecido.

#### `menuItem.sublabel`

Una `String` indicando la subetiqueta del artículo, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.toolTip` *macOS*

A `String` indicating the item's hover text.

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.registerAccelerator`

A `Boolean` indicating if the accelerator should be registered with the system or just displayed, this property can be dynamically changed.

#### `menuItem.commandId`

A `Number` indicating an item's sequential unique id.

#### `menuItem.menu`

A `Menu` that the item is a part of.