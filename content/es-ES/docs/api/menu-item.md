## Clase: MenuItem

> Agregue elementos a los menús y menús de contexto de la aplicación nativa.

Proceso: [Main](../glossary.md#main-process)

Vea [`Menú`](menu.md) para obtener ejemplos.

### `new MenuItem(options)`

* `options` Object
  * `click` Función (opcional) - Sera llamada con `click(menuItem, browserWindow, event)` cuando el elemento del menú sea clickeado.
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md) | undefined - Esto no se definirá si no hay alguna ventana abierta.
    * `event` [KeyboardEvent](structures/keyboard-event.md)
  * `role` String (opcional) - Puede ser `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define la acción del elemento del menú, cuando se especifica la propiedad `click` se ignorara esta propiedad. Ver [roles](#roles).
  * `type` String (opcional) - Puede ser `normal`, `separador`, `submenu`, `checkbox` o `radio`.
  * `label` String (opcional)
  * `sublabel` String (opcional)
  * `toolTip` String (opcional) _macOS_ - Texto flotante para es elemento del menú.
  * `accelerator` [Accelerator](accelerator.md) (opcional)
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (opcional) - Si es falso, el elemento de menú será gris y no se podrá hacer click en él.
  * `acceleratorWorksWhenHidden` Boolean (opcional) _macOS_ - por defecto es `true`, y cuando es `false` evitará que el acelerador active el elemento si el elemento no está visible.
  * `visible` Boolean (opcional) - Si es falso, el elemento del menú será totalmente invisible.
  * `checked` Boolean (opcional) - Solo debe especificarse para elementos del menú tipo `checkbox` o `radio`.
  * `registerAccelerator` Boolean (opcional) _Linux_ _Windows_ - Si es false, el acelerador no se registrará en el sistema, pero seguirá siendo visible. Por defecto es true.
  * `sharingItem` SharingItem (opcional) _macOS_ - el elemento que se compartirá cuando el `role` es `shareMenu`.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (opcional) - Debería especificarse para los items del tipo `submenu`. Si `submenu` es especificado, el `type: 'submenu'` puede ser omitido. Si el valor no es un [`Menu`](menu.md) entonces automáticamente será convertido a uno usando `Menu.buildFromTemplate`.
  * `id` String (opcional) - único dentro de un solo menú. Si se define, puede ser usado como referencia a este elemento por el atributo posición.
  * `before` String[] (opcional) - Inserta este ítem antes que el ítem con la etiqueta especificada. Si el ítem referenciado no existe el ítem sera insertado al final del menu. También implica que el ítem del menu en cuestión debería colocarse in el mismo “group” como el ítem.
  * `after` String[] (opcional) - inserta este elemento después de el elemento con la etiqueta especificada. Si el ítem referenciado no existe se insertara al final del menú.
  * `beforeGroupContaining` String[] (opcional) - Proporciona una manera para que un único menú contextual declare la ubicación de su grupo contenedor antes del grupo contenedor del artículo con la etiqueta especificada.
  * `afterGroupContaining` String[] (opcional) - Proporciona una manera para que un único menú contextual declare la ubicación de su grupo contenedor después del grupo contenedor del artículo con la etiqueta especificada.

**Note:** `acceleratorWorksWhenHidden` es especificado como siendo macOS-solo porque los aceleradores siempre trabajan cuando los items son ocultados en Windows y Linux. La opción esta expuesta a los usuarios para darles a ellos la opción de apagarla, ya que esto es posible el el desarrollo nativo de macOS. Esta propiedad solo es usable en macOS High Sierra 10.13 o más recientes.

### Roles

Los roles le permiten a los elementos del menú tener comportamientos predeterminados.

Es mejor especificar el `rol` para todos los elementos del menú de tal manera que coincidan con los roles estándar, en vez de tratar de implementar un comportamiento manualmente en una función `click`. El comportamiento incorporador `rol` dará la mejor experiencia nativa.

Los valores de `etiqueta` y `acelerador` son opcionales mientras se usa un `rol` y por defecto se apropiarán valores de cada plataforma.

Cada elemento del menu deve tener un `role`, `label`, o en el caso de un separador un `type`.

La propiedad `role` puede tener los siguientes valores:

* `undo`
* `about` - Lanza un panel de "acerca de" nativo (Cuadro de diálogo personalizado en ventana, cuando no se proporciona uno).
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
* `toggleSpellChecker` - Activar/desactivar el corrector ortográfico incorporado.
* `fileMenu` - Todo el menú "Archivo" por defecto (Cerrar / Salir)
* `editMenu` - Grupo por defecto de un menú "Edit" (Deshacer, Copiar, etc.).
* `viewMenu` - Todo el menú "Vista" por defecto (Recargar, Activar Herramientas del Desarrollador, etc.)
* `windowMenu` - Todo el menú "Ventana" por defecto (Minimizar, Zoom, etc.).

Los siguientes roles adicionales están disponibles en _macOS_:

* `appMenu` - Todo el menú "App" por defecto (Acerca de, Servicios, etc.)
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
* `shareMenu` - El submenú es [share menu][ShareMenu]. La propiedad `sharingItem` debe establecerse para indicar el elemento a compartir.

Al especificar un `role` en macOS, `label` y `accelerator` son las únicas opciones que afectarán el elemento del menú. Todas las demás opciones serán ignoradas. Los `role` en minúscula, por ejemplo, `toggledevtools`, todavía son soportados.

**Nota Bene:** Las propiedades `enabled` y `visibility` no están disponibles para los elementos de nivel superior del menú de la bandeja en macOS.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias del `menú de elementos`:

#### `menuItem.id`

Un `String` indicando la etiqueta visible del elemento, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.label`

Un `String` indicando la etiqueta visible del elemento.

#### `menuItem.click`

Una `función` que se desencadena cuando los elementos del menú reciben un evento click. Puede ser llamado con `menuItem.click(event, focusedWindow, focusedWebContents)`.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)

#### `menuItem.submenu`

Un `Menú` (opcional) que contiene el submenú del menú elemento, si está presente.

#### `menuItem.type`

Un `String` indicando el tipo del elemento. Puede ser `normal`, `separator`, `submenu`, `checkbox` o `radio`.

#### `menuItem.role`

Una `String` (opcional) indicando el rol del elemento, si está establecido. Puede ser `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` o `windowMenu`

#### `menuItem.accelerator`

Un `Accelerator` (opcional) indicando el acelerador del elemento, si está establecido.

#### `menuItem.icon`

Una `NativeImage | String` (opcional) indicando el icono del elemento, si estuviera establecido.

#### `menuItem.sublabel`

Un `String` indicando la sub-etiqueta del elemento.

#### `menuItem.toolTip` _macOS_

Un `String` indicando el texto flotante del elemento.

#### `menuItem.enabled`

Un `booleano` indicando si el elementos está habilitado, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.visible`

Un `booleano` indicando si el elemento es visible, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.checked`

Un `Booleano` indicando si el elemento está verificado, esta propiedad puede ser cambiada dinámicamente.

Un elemento del menú `checkbox` que cambiará la propiedad `verificado` en sí y no cuando se selecciona.

Un elemento del menú `radio` que activará su propiedad `verificado` cuando se haga click en él, y que desactivará su propiedad para todos los elementos adyacentes en el mismo menú.

Puede añadir la función `click` para comportamientos adicionales.

#### `menuItem.registerAccelerator`

Un `Boolean` que indica si el acelerador debe ser registrado con el sistema o solo mostrado.

Esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.sharingItem` _macOS_

Un `SharingItem` indicando el elemento a compartir cuando el `role` es `shareMenu`.

Esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.commandId`

Un `Number` indicando el id único secuencial de un elemento.

#### `menuItem.menu`

Un `Menu` del cual el elemento es parte.

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
