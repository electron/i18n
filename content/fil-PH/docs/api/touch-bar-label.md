## Klase: TouchBarLabel

> Gumawa ng label sa touch bar para sa mga applikasyon ng katutubong macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarLabel(options)`*Pangeksperimento *

* `pagpipilian` Bagay 
  * `label` Pisi (opsyonal) - Salitang ipapakita.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Mga Katangian ng Instance

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.