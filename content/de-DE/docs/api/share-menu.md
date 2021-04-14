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
  * `x` Zahl (optional) - Standard ist die aktuelle Mauscursorposition. Muss deklariert werden, wenn `y` deklariert ist.
  * `y` Zahl (optional) - Standard ist die aktuelle Mauscursorposition. Muss deklariert werden, wenn `x` deklariert ist.
  * `positioningItem` Zahl (optional) _macOS_ - Der Index des Menüelements, das unter dem Mauszeiger an den angegebenen Koordinaten positioniert werden soll. Der Standard ist -1.
  * `callback` Funktion (optional) - Wird aufgerufen wenn das Menü geschlossen wird.

Öffnet dieses Menü als Kontextmenü im [`BrowserWindow`](browser-window.md).

#### `shareMenu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default ist das fokussierte Fenster.

Schließt das Kontext-Menü im `browserWindow`.

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
