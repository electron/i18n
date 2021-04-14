## Klasse: TouchBarButton

> Erstellen einer Schaltfläche in der Touchleiste für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarButton(Optionen)`

* `options` -Objekt
  * `label` String (optional) - Button-Text.
  * `accessibilityLabel` String (optional) - Eine kurze Beschreibung der Schaltfläche für die Verwendung durch Screenreader wie VoiceOver.
  * `backgroundColor` String (optional) - Button Hintergrundfarbe im Hex-Format, d.h. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button-Symbol.
  * `iconPosition` String (optional) - Kann `left`, `right` oder `overlay`sein. Standardmäßig `overlay`.
  * `click` Funktion (optional) - Funktion zum Aufrufen, wenn auf die Schaltfläche geklickt wird.
  * `enabled` Boolean (optional) - Gibt an, ob sich die Schaltfläche in einem aktivierten Zustand befindet.  Standard ist `true`.

Stellen Sie beim Definieren `accessibilityLabel`sicher, dass Sie macOS [Best Practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc)berücksichtigt haben.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarButton`verfügbar:

#### `touchBarButton.accessibilityLabel`

Ein `String` , der die Beschreibung der Schaltfläche darstellt, die von einer Sprachausgabe gelesen werden soll. Wird nur von Bildschirmlesern gelesen, wenn kein Etikett gesetzt ist.

#### `touchBarButton.label`

Ein `String` , der den aktuellen Text der Schaltfläche darstellt. Wenn Sie diesen Wert ändern, wird die Schaltfläche in der Touchleiste sofort aktualisiert.

#### `touchBarButton.backgroundColor`

Ein `String` Hexcode, der die aktuelle Hintergrundfarbe der Schaltfläche darstellt. Wenn Sie diesen Wert ändern, wird die Taste der Touchleiste sofort aktualisiert.

#### `touchBarButton.icon`

Eine `NativeImage` , die das aktuelle Symbol der Schaltfläche darstellt. Wenn Sie diesen Wert ändern, wird die Schaltfläche in der Touchleiste sofort aktualisiert.

#### `touchBarButton.iconPosition`

Ein `String` - Kann `left`, `right` oder `overlay`sein.  Standardmäßig `overlay`.

#### `touchBarButton.enabled`

Ein `Boolean` , der angibt, ob sich die Schaltfläche in einem aktivierten Zustand befindet.
