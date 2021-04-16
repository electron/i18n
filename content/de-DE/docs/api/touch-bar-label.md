## Class: TouchBarLabel

> Create a label in the touch bar for native macOS applications

Prozess: [Main](../glossary.md#main-process)

### `new TouchBarLabel(options)`

* `options` -Objekt
  * `label` String (optional) - Text to display.
  * `accessibilityLabel` String (optional) - Eine kurze Beschreibung der Schaltfläche für die Verwendung durch Screenreader wie VoiceOver.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

Stellen Sie beim Definieren `accessibilityLabel`sicher, dass Sie macOS [Best Practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc)berücksichtigt haben.

### Instanz Eigenschaften

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
