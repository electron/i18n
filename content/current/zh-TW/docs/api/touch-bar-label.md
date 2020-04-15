## Class: TouchBarLabel

> 讓 macOS 原生應用程式在 Touch Bar 中建立標籤。

處理序: [主處理序](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` _試驗中_

* `options` Object
  * `label` String (optional) - Text to display.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### 物件屬性

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
