## Class: TouchBarButton

> Maglikha ng isang pipindutin sa touch para sa native na macOS na mga aplikasyon

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `new TouchBarButton(options)` *Experimental*

* `options` Bagay 
  * `label` Lubid (opsyonal) - Buton na texsto.
  * `backgroundColor` String (optional) - Button background color in hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (optional) - Button icon.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`.
  * `click` Function (optional) - Function to call when the button is clicked.

### Halimbawa ng Ari-arian

The following properties are available on instances of `TouchBarButton`:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.