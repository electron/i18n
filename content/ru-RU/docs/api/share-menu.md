## Класс: ShareMenu

> Создание меню общих возможностей на macOS.

Процесс: [Основной](../glossary.md#main-process)

Класс `ShareMenu` создает [Share Menu][share-menu] на macOS, которое может быть использовано для обмена информацией из текущего контекста в приложения, социальные сети учетные записи и другие службы.

Для включения меню share в подменю других меню, пожалуйста, используйте `shareMenu` роль [`MenuItem`](menu-item.md).

### `новый ShareMenu (sharingItem)`

* `sharingItem` SharingItem - элемент для обмена.

Создает новое меню акций.

### Методы экземпляра

Объект `shareMenu` имеет следующие методы экземпляра:

#### `shareMenu.popup ([options])`

* `options` PopupOptions (по желанию)
  * `browserWindow` [BrowserWindow](browser-window.md) (опционально) - по умолчанию это сфокусированное окно.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Функция (опционально) - вызывается, когда меню закрыто.

Переключает это меню в контекстное меню в [`BrowserWindow`](browser-window.md).

#### `shareMenu.closePopup ([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (опционально) - по умолчанию это сфокусированное окно.

Закрывает контекстное меню в `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
