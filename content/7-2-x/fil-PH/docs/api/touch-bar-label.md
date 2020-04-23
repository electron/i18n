## Klase: TouchBarLabel

> Gumawa ng label sa touch bar para sa mga applikasyon ng katutubong macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarLabel(options)`_Pangeksperimento _

* `options` Object
  * `label` Pisi (opsyonal) - Salitang ipapakita.
  * `textColor` Pisi (opsyonal) - Hex na kulay ng teksto, ie `#ABCDEF`.

### Katangian ng pagkakataon

Ang mga sumusunod na mga katangian ay makukuha sa mga kaganapan ng `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.kulayngteksto`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
