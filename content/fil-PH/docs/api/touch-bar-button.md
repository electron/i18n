## Klase: TouchBarButton

> Gumawa ng isang pipindutin sa touch bar para sa katutubong aplikasyon para sa macOS

Proseso: [Pangunahing](../tutorial/quick-start.md#main-process)

### `new TouchBarButton(options)` *Experimental*

* `pagpipilian` Bagay 
  * `label` String (opsyonal) - Pipinduting teksto.
  * `backgroundColor` String (opsyonal) - Ang kulay ng background ng pipindutin ay naka hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (opsyonal) - Button icon.
  * `iconPosition` String (opsyonal) - Pwedeng `kaliwa`, `kanan` o `naka-overlay`.
  * `click` Function (opsyonal) - Ang function na tatawagin kung ang napindot ang pipindutin.

### Katangian ng pagkakataon

Ang sumusunod na mga katangian ay makikita sa mga sitwasyon ng `TouchBarButton`:

#### `touchBarButton.label`

Isang `String` kumakatawan sa pindutan ng kasalukuyang teksto. Kung babaguhin ang halaga nito agad na mauupdate ang button sa touch bar.

#### `touchBarButton.kulayngbackground`

Isang `String` hex code na kumakatawan sa kasalukuyang kulay ng likuran ng button. Kung babaguhin ang halaga nito ay agad na mauupdate ang button sa touch bar.

#### `touchBarButton.icon`

Isang `NativeImage` kumakatawan sa pindutan ng kasalukuyang icon. Kung babaguhin ang halaga nito ay agad na mauupdate ang button sa touch bar.