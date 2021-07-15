## Class: TouchBarButton

> Create a button in the touch bar for native macOS applications

Processo: [Main](../glossary.md#main-process)

### `new TouchBarButton(options)`

* Objeto `options`
  * `label` String (optional) - Button text.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (optional) - Button background color in hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. O padrão é `overlay`.
  * `click` Function (optional) - Function to call when the button is clicked.
  * `enabled` Boolean (optional) - Whether the button is in an enabled state.  Padrão é `true`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriedades da Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.iconPosition`

A `String` - Can be `left`, `right` or `overlay`.  O padrão é `overlay`.

#### `touchBarButton.enabled`

A `Boolean` representing whether the button is in an enabled state.
