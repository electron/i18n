## Kelas: TouchBarButton

> Buat tombol di panel sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarButtonbaru(pilihan)`*Eksperimental*

* `pilihan` Benda 
  * `label` String (opsional) - Teks tombol.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (opsional) - Tombol warna latar dalam format hex, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. Defaults to `overlay`.
  * `klik`Fungsi (opsional) - Fungsi untuk memanggil saat tombol diklik.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` mewakili teks tombol saat ini. Mengubah nilai ini segera memperbarui tombolnya di bilah sentuh.

#### `touchBarButton.backgroundColor`

Kode `String` hex mewakili warna latar belakang tombol saat ini. Mengubah nilai ini segera diperbarui tombol di panel sentuh.

#### `touchBarButton.icon`

A `NativeImage` mewakili ikon tombol saat ini. Mengubah nilai ini segera memperbarui tombolnya di bilah sentuh.