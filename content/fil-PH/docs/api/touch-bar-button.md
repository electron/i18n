## Klase: TouchBarButton

> Gumawa ng isang pipindutin sa touch bar para sa katutubong aplikasyon para sa macOS

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` *Experimental*

* `pagpipilian` Bagay 
  * `label` String (opsyonal) - Pipinduting teksto.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (opsyonal) - Ang kulay ng background ng pipindutin ay naka hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. Defaults to `overlay`.
  * `click` Function (opsyonal) - Ang function na tatawagin kung ang napindot ang pipindutin.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Katangian ng pagkakataon

Ang sumusunod na mga katangian ay makikita sa mga sitwasyon ng `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

Isang `String` kumakatawan sa pindutan ng kasalukuyang teksto. Kung babaguhin ang halaga nito agad na mauupdate ang button sa touch bar.

#### `touchBarButton.kulayngbackground`

Isang `String` hex code na kumakatawan sa kasalukuyang kulay ng likuran ng button. Kung babaguhin ang halaga nito ay agad na mauupdate ang button sa touch bar.

#### `touchBarButton.icon`

Isang `NativeImage` kumakatawan sa pindutan ng kasalukuyang icon. Kung babaguhin ang halaga nito ay agad na mauupdate ang button sa touch bar.