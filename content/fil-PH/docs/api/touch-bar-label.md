## Klase: TouchBarLabel

> Gumawa ng label sa touch bar para sa mga applikasyon ng katutubong macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarLabel(options)`*Pangeksperimento *

* `pagpipilian` Bagay 
  * `label` Pisi (opsyonal) - Salitang ipapakita.
  * `textColor` Pisi (opsyonal) - Hex na kulay ng teksto, ie `#ABCDEF`.

### Mga Katangian ng Instance

Ang mga sumusunod na mga katangian ay makukuha sa mga kaganapan ng `TouchBarLabel`:

#### `touchBarLabel.label`

Isang `String` kumakatawan sa label ng kasalukuyang salita. Kung babaguhin ang halaga nito ay agad mauupdate ang label na nasa touch bar.

#### `touchBarLabel.kulayngteksto`

Isang `String` hex code na kumakatawan sa label ng kasalukuyang kulay ng salita. Kung babaguhin ang halaga nito ay agad mauupdate ang label na nasa touch bar.