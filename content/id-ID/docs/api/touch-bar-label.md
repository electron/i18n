## Kelas: TouchBarLabel

> Buat label di bilah sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarLabel baru (pilihan)` *Eksperimental*

* `pilihan` Benda 
  * `label` String (opsional) - Teks untuk ditampilkan.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (opsional) - Hex warna teks, i.e `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarLabel`:

#### `sentuhBarLabel.label`

A `String` yang mewakili teks label saat ini. Mengubah nilai ini segera memperbarui label panel sentuh.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `sentuhBarLabel.textColor`

Kode `String` hex yang mewakili warna teks label saat ini. Mengubah nilai ini segera update label di bilah sentuh.