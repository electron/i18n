## Clase: notificación de la barra táctil

> Crea una notificación en la barra táctil para aplicaciones nativas macOS

Proceso: [Main](../tutorial/quick-start.md#main-process)

### `nueva notificación en la barra táctil(opciones)` *Experimental*

* `opciones` Object 
  * `Etiqueta` Cadena (opcional) - tecto del botón en la notificación.
  * `ícono` [imagen nativa](native-image.md) (opcional) - ícono del botón de la notificación.
  * `Elemento` [barra táctil](touch-bar.md) (opcional) - elementos a mostrar en la notificación.
  * `mostrar botón de cerrado` Booleano (opcional) - `verdad` para mostrar un botón de cerrado a la izquierda de la notificación, `falso` para no mostrarlo. Por defecto es `verdad`.

### Propiedades de Instancia

Las siguiente propiedades están disponibles en instancias de `notificaciones de la barra táctil`:

#### `touchBarPopover.label`

Una `Cadena` representando el botón de texto actual de la notificación. Cambiar este valor actualizará inmediatamente la notificación en la barra táctil.

#### `touchBarPopover.icon`

Una `Imagen nativa` representando el botón de icono actual de la notificación. Cambiar esto actualizará inmediatamente la notificación en la barra táctil.