## Clase: MenuItem

> Agregue elementos a los menús y menús de contexto de la aplicación nativa.

Process: [Main](../glossary.md#main-process)

Vea [`Menú`](menu.md) para obtener ejemplos.

### `new MenuItem(options)`

* `opciones` Object 
  * `click` Function (opcional) - Será llamada con `click(menuItem, browserWindow, event)` cuando se hace click en el elemento del menú. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Event
  * `rol` String (opcional) - Define la acción del elemento del menú, cuando se especifica el `click` la propiedad será ignorada. Vea [roles](#roles).
  * `tipo` String (opcional) - Puede ser `normal`, `separador`, `submenu`, `checkbox` o `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (opcional)
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (opcional) - Si es falso, el elemento de menú será gris y no se podrá hacer click en él.
  * `visible` Boolean (opcional) - Si es falso, el elemento del menú será totalmente invisible.
  * `checked` Boolean (opcional) - Solo debe especificarse para elementos del menú tipo `checkbox` o `radio`.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. Si `submenu` es especificado, el `tipo: 'submenu'` puede ser omitido. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (opcional) - Único dentro de un menú concreto. Si se define, entonces puede usarse como referencia a este elemento mediante el atributo de posición.
  * `position` String (opcional) - Este campo permite una definición granular de la posición específica dentro de un menú concreto.

### Roles

Los roles le permiten a los elementos del menú tener comportamientos predeterminados.

Es mejor especificar el `rol` para todos los elementos del menú de tal manera que coincidan con los roles estandar, en vez de tratar de implementar un comportamiento manualmente en una función `click`. El comportamiento incorporador `rol` dará la mejor experiencia nativa.

Los valores de `etiqueta` y `acelerador` son opcionales mientras se usa un `rol` y por defecto se apropiarán valores de cada plataforma.

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
* `quit`- Salir de la aplicación.
* `reload` - Recargar la ventana actual.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen`- Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `editMenu` - Grupo por defecto de un menú "Edit" (Deshacer, Copiar, etc.).
* `windowMenu` - Grupo por defecto de un menú "Window" (Minimizar, Cerrar, etc.).

The following additional roles are available on *macOS*:

* `about` - Enlace a la acción `orderFrontStandardAboutPanel`.
* `hide` - Enlace a la acción `hide`.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Enlace a la acción `unhideAllApplications`.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Enlace a la acción `arrangeInFront`.
* `zoom` - Enlace a la acción `performZoom`.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a "Services" menu.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

### Propiedades de la instancia

Las siguientes propiedades están disponibles en instancias del `menú de elementos`:

#### `menuItem.enabled`

Un `booleano` indicando si el elementos está habilitado, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.visible`

Un `booleano` indicando si el elemento es visible, esta propiedad puede ser cambiada dinámicamente.

#### `menuItem.checked`

Un `Booleano` indicando si el elemento está verificado, esta propiedad puede ser cambiada dinámicamente.

Un elemento del menú `checkbox` que cambiará la propiedad `verificado` en sí y no cuando se selecciona.

Un elemento del menú `radio` que activará su propiedad `verificado` cuando se haga click en él, y que desactivará su propiedad para todos los elementos adyacentes en el mismo menú.

Puede añadir la función `click` para comportamientos adicionales.

#### `menuItem.label`

Una `Cadena` Representando la etiqueta de los elementos visibles en el menú.

#### `menuItem.click`

Una `función` que se desencadena cuando los elementos del menú reciben un evento click.