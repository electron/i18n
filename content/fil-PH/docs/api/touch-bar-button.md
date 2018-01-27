## Class: TouchBarButton

> Maglikha ng isang pipindutin sa touch para sa native na macOS na mga aplikasyon

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `new TouchBarButton(options)` *Experimental*

* `options` Object 
  * `label` String (opsyonal) - Pipinduting teksto.
  * `backgroundColor` String (opsyonal) - Ang kulay ng background ng pipindutin ay naka hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (opsyonal) - Button icon.
  * `iconPosition` String (opsyonal) - Pwedeng `kaliwa`, `kanan` o `naka-overlay`.
  * `click` Function (opsyonal) - Ang function na tatawagin kung ang napindot ang pipindutin.

### Halimbawa ng Ari-arian

The following properties are available on instances of `TouchBarButton`:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.