## Class: TouchBarLabel

> Create a label in the touch bar for native macOS applications

Processo: [Main](../glossary.md#main-process)

### `new TouchBarLabel(options)`

* objeto `options`
  * `label` String (optional) - Text to display.
  * `accessibilityLabel` String (opcional) - Uma breve descrição do botão para uso por leitores de tela como VoiceOver.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

Ao definir `accessibilityLabel`, certifique-se de considerar o macOS [as melhores práticas](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriedades de Instância

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
