## Klasse: TouchBarColorPicker

> Erstellen einer Farbauswahl in der Touchleiste für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarColorPicker(Optionen)`

* `options` -Objekt
  * `availableColors` String[] (optional) - Array von Hex-Farbzeichenfolgen, die als mögliche Farben zur Auswahl angezeigt werden.
  * `selectedColor` String (optional) - Die ausgewählte Hexfarbe in der Auswahl, d.h. `#ABCDEF`.
  * `change` Funktion (optional) - Funktion zum Aufrufen, wenn eine Farbe ausgewählt ist.
    * `color` String - Die Farbe, die der Benutzer aus der Auswahl ausgewählt hat.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarColorPicker`verfügbar:

#### `touchBarColorPicker.availableFarben`

Ein `String[]` Array, das die verfügbaren Farben der Farbauswahl darstellt. Wenn Sie diesen Wert sofort ändern die Farbauswahl in der Touchleiste aktualisiert.

#### `touchBarColorPicker.selectedFarbe`

Ein `String` Hexcode, der die aktuell ausgewählte Farbe der Farbauswahl darstellt. Wenn Sie diesen Wert sofort ändern die Farbauswahl in der Touchleiste aktualisiert.
