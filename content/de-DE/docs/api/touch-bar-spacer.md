## Klasse: TouchBarSpacer

> Erstellen eines Abstandszwischenstücks zwischen zwei Elementen in der Touchleiste für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBarSpacer(Optionen)`

* `options` -Objekt
  * `size` String (optional) - Größe des Abstands, mögliche Werte sind:
    * `small` - Kleiner Abstand zwischen Elementen. Karten zu `NSTouchBarItemIdentifierFixedSpaceSmall`. Dies ist die Standardeinstellung.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

### Instanz Eigenschaften

The following properties are available on instances of `TouchBarSpacer`:

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Can be `small`, `large` or `flexible`.
