## Klasse: TouchBarLabel

> Erstellen einer Beschriftung in der Touchleiste für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarLabel(Optionen)`

* `options` -Objekt
  * `label` String (optional) - Text, der angezeigt werden soll.
  * `accessibilityLabel` String (optional) - Eine kurze Beschreibung der Schaltfläche für die Verwendung durch Screenreader wie VoiceOver.
  * `textColor` String (optional) - Hex-Farbe des Textes, d.h. `#ABCDEF`.

Stellen Sie beim Definieren `accessibilityLabel`sicher, dass Sie macOS [Best Practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc)berücksichtigt haben.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarLabel`verfügbar:

#### `touchBarLabel.label`

Ein `String` , der den aktuellen Text der Beschriftung darstellt. Wenn Sie diesen Wert ändern, wird die Beschriftung sofort der Touchleiste aktualisiert.

#### `touchBarLabel.accessibilityLabel`

Eine `String` , die die Beschreibung der Bezeichnung darstellt, die von einer Bildschirmsprachausgabe gelesen werden soll.

#### `touchBarLabel.textColor`

Ein `String` Hexcode, der die aktuelle Textfarbe der Beschriftung darstellt. Wenn Sie diesen Wert ändern, wird die Beschriftung in der Touchleiste sofort aktualisiert.
