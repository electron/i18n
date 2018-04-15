## Clase: MenuItem

> Agregue elementos a los menús y menús de contexto de la aplicación nativa.

Process: [Main](../glossary.md#main-process)

Vea [`Menú`](menu.md) para obtener ejemplos.

### `new MenuItem(options)`

* `opciones` Object 
  * `click` Function (opcional) - Será llamada con `click(menuItem, browserWindow, event)` cuando se hace click en el elemento del menú. 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * `event` Event
  * `rol` String (opcional) - Define la acción del elemento del menú, cuando se especifica el `click` la propiedad será ignorada. Vea [roles](#roles).
  * `tipo` String (opcional) - Puede ser `normal`, `separador`, `submenu`, `checkbox` o `radio`.
  * `etiqueta` String - (opcional)
  * `subetiqueta` String - (opcional)
  * `accelerator` [Accelerator](accelerator.md) (opcional)
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `enabled` Boolean (opcional) - Si es falso, el elemento de menú será gris y no se podrá hacer click en él.
  * `visible` Boolean (opcional) - Si es falso, el elemento del menú será totalmente invisible.
  * `checked` Boolean (opcional) - Solo debe especificarse para elementos del menú tipo `checkbox` o `radio`.
  * `submenu` (MenuItemConstructorOptions[] | Menu) (opcional) - Debe ser especificado para elementos del menú tipo `submenu`. Si `submenu` es especificado, el `tipo: 'submenu'` puede ser omitido. Si el valor no es un `Menú` entonces será convertido automáticamente utilizando `Menu.buildFromTemplate`.
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
* `pasteandmatchstyle`
* `selectall`
* `delete`
* `minimize` - Minimizar la venta actual
* `close` - Cerrar la ventana actual
* `quit`- Salir de la aplicación
* `reload` - Recargar la ventana actual
* `forcereload` - Forzar la recarga de la ventana actual ignorando el caché.
* `toggledevtools` - Conmuta las herramientas de desarrollador en la ventana actual
* `togglefullscreen`- Conmuta el modo de pantalla completa en la ventana actual
* `resetzoom` - Reinicia el nivel de zoom de la página activa a su valor original
* `zoomin` - Aumenta el nivel de zoom en 10% en la página activa
* `zoomout` - Reduce el nivel de zoom en 10% en la página activa
* `editar menú` - "editar" todo el menú por defecto (deshacer, copiar, etc.)
* `Menú de ventana` - Menú completo de "ventana" por defecto (minimizar, cerrar. etc.)

Los siguientes roles adicionales están disponibles para macOS:

* `about` - Enlace a la acción `orderFrontStandardAboutPanel`
* `hide` - Enlace a la acción `hide`
* `hideothers` - Enlace a la acción `hideOtherApplications`
* `unhide` - Enlace a la acción `unhideAllApplications`
* `startspeaking` - Enlace a la acción `startSpeaking`
* `stopspeaking` - Enlace a la acción `stopSpeaking`
* `front` - Enlace a la acción `arrangeInFront`
* `zoom` - Enlace a la acción `performZoom`
* `toggletabbar` - Enlace a la acción `toggleTabBar`
* `selectnexttab` - Enlace a la acción `selectNextTab`
* `selectprevioustab` - Enlace a la acción `selectPreviousTab`
* `mergeallwindows` - Enlace a la acción `mergeAllWindows`
* `movetabtonewwindow` - Enlace a la acción `moveTabToNewWindow`
* `window` - El submenú es un menú "Window"
* `help` - El submenú es un menú "Help"
* `services` - El submenú es un menú "Services"

Cuando se especifica un `rol` en macOS, la `etiqueta` y el `acelerador` son solo opciones que afectarán a los elementos del menú. Todas las demás opciones serán ignoradas.

### Propiedades de Instancia

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

Una `Cadena` Representando la etiqueta de los elementos visibles en el menú

#### `menuItem.click`

Una `función` que se desencadena cuando los elementos del menú reciben un evento click