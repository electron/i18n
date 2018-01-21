## Clase: MenuItem

> Agregue elementos a los menús y menús de contexto de la aplicación nativa.

Proceso: [Principal](../glossary.md#main-process)

Vea [`Menú`](menu.md) para obtener ejemplos.

### `new MenuItem(options)`

* `options` Object 
  * `click` Función (opcional) - Será llamado con `click(menuItem, browserWindow, event)` cuando se hace click en el elemento del menú. 
    * `Elemento del menú` Elemento del menú
    * `Ventana de navegador` Ventana de navegador
    * `evento` Evento
  * `rol` Cadena (opcional) - Define la acción del elemento del menú, cuando se especifica el `click` la propiedad será ignorada. Vea [roles](#roles).
  * `tipo` Cadena (opcional) - Puede ser `normal`, `separador`, `submenu`, `checkbox` o `radio`.
  * `etiqueta` Cadena - (opcional)
  * `subetiqueta` Cadena - (opcional)
  * `Acelerador` [Acelerador](accelerator.md) (opcional)
  * `ícono` ([imagen nativa](native-image.md) | Cadena) (opcional)
  * `Habilitado` Booleano (opcional) - Si falso, el elemento de menú será gris y no se podrá hacer click en él.
  * `visible` Booleano (opcional) - Si falso, el elemento del menú será totalmente invisible.
  * `verificado` Booleano (opcional) - Solo debe especificarse para elementos del menú tipo `checkbox` o `radio`.
  * `submenu` (MenuItemConstructorOptions[] | Menu) (opcional) - Debe ser especificado para elementos del menú tipo `submenu`. Si `submenu` es especificado, el `tipo: 'submenu'` puede ser omitido. Si el valor no es un `Menú` entonces será convertido automáticamente utilizando `Menu.buildFromTemplate`.
  * `identificación` Cadena (opcional) - único para cada menú. Si se define entonces puede ser usado como referencia a sus elementos en la posición de atributo.
  * `posición` Cadena (opcional) - Este campo permite la definición propia de la localización específica en un menú dado.

### Roles

Los roles le permiten a los elementos del menú tener comportamientos predeterminados.

Es mejor especificar el `rol` para todos los elementos del menú de tal manera que coincidan con los roles estandar, en vez de tratar de implementar un comportamiento manualmente en una función `click`. El comportamiento incorporador `rol` dará la mejor experiencia nativa.

Los valores de `etiqueta` y `acelerador` son opcionales mientras se usa un `rol` y por defecto se apropiarán valores de cada plataforma.

La propiedad `role` puede tener los siguientes valores:

* `deshacer`
* `rehacer`
* `cortar`
* `copiar`
* `pegar`
* `pegar y coincidir con el estilo`
* `seleccionar todo`
* `eliminar`
* `minimizar` - Minimiza la ventana actual
* `cerrar` - cierra la ventana actual
* `cerrar`- cierra la aplicación
* `recargar` - Recarga la ventana actual
* `cargar forzadamente` - Recarga la ventana ignorando el caché.
* `herramientas de desarrollador` - herramientas de desarrollador de alterar la ventana actual
* `Conmutador de pantalla completa`- Palanca de modo pantalla completa en la ventana actual
* `Reiniciar zoom` - Resetea el nivel de zoom de la ventana enfocada a su tamaño original
* `acercar zoom` - zoom en la página enfocada del 10%
* `Alejar zoom` - Aleja el zoom de la página enfocada en 10%
* `editar menú` - "editar" todo el menú por defecto (deshacer, copiar, etc.)
* `Menú de ventana` - Menú completo de "ventana" por defecto (minimizar, cerrar. etc.)

Los siguientes roles adicionales están disponibles para macOS:

* `acerca` - mapa de la acción `orderFrontStandardAboutPanel`
* `ocultar` - mapa de la acción de `ocultar`
* `ocultar otros` - Mapa de acción `ocultar otras aplicaciones`
* `mostrar` - Mapa de acción de `mostrar todas las aplicaciones`
* `startspeaking` - Map to the `startSpeaking` action
* `stopspeaking` - Map to the `stopSpeaking` action
* `front` - Map to the `arrangeInFront` action
* `zoom` - Map to the `performZoom` action
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored.

### Propiedades de Instancia

The following properties are available on instances of `MenuItem`:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event