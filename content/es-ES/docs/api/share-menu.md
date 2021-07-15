# ShareMenu

La clase `ShareMenu` crea [Share Menu][share-menu] en macOS, que puede usarse para compartir información desde el contexto actual a las apps, cuentas de redes sociales y otros servicios.

Para incluir el menú compartido como submenú de otros, por favor usa el rol `shareMenu` de [`MenuItem`](menu-item.md).

## Clase: ShareMenu

> Create share menu on macOS.

Proceso: [principal](../glossary.md#main-process)</0>

### `new ShareMenu(sharingItem)`

* `sharingItem` SharingItem - The item to share.

Creates a new share menu.

### Métodos de Instancia

El objeto `shareMenu` tiene los siguientes métodos de instancia:

#### `shareMenu.popup([options])`

* `options` PopupOptions (optional)
  * `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.
  * `x` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `y` es declarado.
  * `y` Número (opcional) - Default es la posición actual del cursor. Debe ser declarado si `x` es declarado.
  * `positioningItem` Número (opcional) _macOS_ - El índice del elemento del menú que debe ser posicionado debajo del cursor en las coordenadas específicas. El valor predeterminado es -1.
  * `callback` Function (opcional) - Llamada cuando se cierra el menu.

Este menú aparece como un menú contextual en el [`BrowserWindow`](browser-window.md).

#### `shareMenu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (opcional) - Por defecto es la ventana seleccionada.

Cierra el menú de contexto en la `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
