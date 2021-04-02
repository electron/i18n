## Klasse: TouchBarSpacer

> Erstellen eines Abstandszwischenstücks zwischen zwei Elementen in der Touchleiste für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarSpacer(Optionen)`

* `options` -Objekt
  * `size` String (optional) - Größe des Abstands, mögliche Werte sind:
    * `small` - Kleiner Abstand zwischen Elementen. Karten zu `NSTouchBarItemIdentifierFixedSpaceSmall`. Dies ist die Standardeinstellung.
    * `large` - Großer Abstand zwischen Elementen. Karten zu `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Nehmen Sie alle verfügbaren Platz. Karten zu `NSTouchBarItemIdentifierFlexibleSpace`.

### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBarSpacer`verfügbar:

#### `touchBarSpacer.size`

Ein `String` , der die Größe des Abstandszeichens darstellt.  Kann `small`, `large` oder `flexible`sein.
