## Clase: ShareMenu

> Menú crear compartir en macOS.

Proceso: [Main](../glossary.md#main-process)

La clase `ShareMenu` crea [menú para compartir][share-menu] en macOS, que se puede usar para compartir información desde el contexto actual a apps, redes sociales cuentas y otros servicios.

Para incluir el menú compartir como un submenú de otros menús, usa el `shareMenu` rol de [`MenuItem`](menu-item.md).

### `nuevo ShareMenu (sharingItem)`

* `sharingItem` SharingItem: el elemento que se compartirá.

Crea un nuevo menú para compartir.

### Métodos de Instancia

El objeto `shareMenu` tiene los siguientes métodos de instancia:

#### `shareMenu. Popup ([options])`

* `options` PopupOptions (opcional)
  * `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.
  * `x` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `y` es declarado.
  * `y` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `x` es declarado.
  * `positioningItem` Número (opcional) _macOS_ - El índice del elemento del menú que debe ser posicionado debajo del cursor en las coordenadas específicas. El valor predeterminado es -1.
  * `callback` Function (opcional) - Llamada cuando se cierra el menu.

Este menú aparece como un menú contextual en el [`BrowserWindow`](browser-window.md).

#### `shareMenu. closePopup ([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.

Cierra el menú de contexto en la `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
