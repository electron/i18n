## Klase: TouchBarButton

> Gumawa ng isang pipindutin sa touch bar para sa katutubong aplikasyon para sa macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _Experimental_

* `options` Object
  * `label` String (opsyonal) - Pipinduting teksto.
  * `backgroundColor` String (opsyonal) - Ang kulay ng background ng pipindutin ay naka hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (opsyonal) - Button icon.
  * `iconPosition` String (opsyonal) - Pwedeng `kaliwa`, `kanan` o `naka-overlay`.
  * `click` Function (opsyonal) - Ang function na tatawagin kung ang napindot ang pipindutin.

### Katangian ng pagkakataon

Ang sumusunod na mga katangian ay makikita sa mga sitwasyon ng `TouchBarButton`:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.kulayngbackground`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.
