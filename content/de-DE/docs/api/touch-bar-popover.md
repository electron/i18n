## Klasse: TouchBarPopover

> Erstellen eines Popovers in der Touchleiste für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarPopover(Optionen)`

* `options` -Objekt
  * `label` String (optional) - Popover-Schaltflächetext.
  * `icon` [NativeImage](native-image.md) (optional) - Popover-Schaltflächensymbol.
  * `items` [TouchBar](touch-bar.md) - Elemente, die im Popover angezeigt werden sollen.
  * `showCloseButton` Boolean (optional) - `true` , um eine Schließen-Taste auf der linken Seite des Popovers anzuzeigen, `false` , um sie nicht anzuzeigen. Standard ist `true`.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarPopover`verfügbar:

#### `touchBarPopover.label`

Ein `String` , der den aktuellen Schaltflächentext des Popovers darstellt. Wenn Sie diesen Wert ändern, wird das Popover in der Touchleiste sofort aktualisiert.

#### `touchBarPopover.icon`

Ein `NativeImage` , der das aktuelle Schaltflächensymbol des Popovers darstellt. Wenn Sie diesen Wert ändern, wird das Popover in der Touchleiste sofort aktualisiert.
