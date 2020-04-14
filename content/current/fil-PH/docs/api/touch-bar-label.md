## Klase: TouchBarLabel

> Gumawa ng label sa touch bar para sa mga applikasyon ng katutubong macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarLabel(options)`*Pangeksperimento *

* `pagpipilian` Bagay 
  * `label` Pisi (opsyonal) - Salitang ipapakita.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` Pisi (opsyonal) - Hex na kulay ng teksto, ie `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Mga Katangian ng Instance

Ang mga sumusunod na mga katangian ay makukuha sa mga kaganapan ng `TouchBarLabel`:

#### `touchBarLabel.label`

Isang `String` kumakatawan sa label ng kasalukuyang salita. Kung babaguhin ang halaga nito ay agad mauupdate ang label na nasa touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.kulayngteksto`

Isang `String` hex code na kumakatawan sa label ng kasalukuyang kulay ng salita. Kung babaguhin ang halaga nito ay agad mauupdate ang label na nasa touch bar.