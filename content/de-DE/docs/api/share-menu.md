## Klasse: ShareMenu

> Erstellen Sie das Freigabemenü unter macOS.

Prozess: [Main](../glossary.md#main-process)

Die `ShareMenu` -Klasse erstellt [Share Menu][share-menu] unter macOS, die verwendet werden können, um Informationen aus dem aktuellen Kontext für Apps, Social Media Konten und andere Dienste freizugeben.

Um das Freigabemenü als Untermenü anderer Menüs einzuschließen, verwenden Sie bitte die `shareMenu` Rolle von [`MenuItem`](menu-item.md).

### `neues ShareMenu(sharingItem)`

* `sharingItem` SharingItem - Das element, das geteilt werden soll.

Erstellt ein neues Freigabemenü.

### Instanz Methoden

Das `shareMenu` -Objekt verfügt über die folgenden Instanzmethoden:

#### `shareMenu.popup([options])`

* `options` PopupOptionen (optional)
  * `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default ist das fokussierte Fenster.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Funktion (optional) - Wird aufgerufen wenn das Menü geschlossen wird.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `shareMenu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default ist das fokussierte Fenster.

Schließt das Kontext-Menü im `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
