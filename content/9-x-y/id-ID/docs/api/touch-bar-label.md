## Kelas: TouchBarLabel

> Buat label di bilah sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarLabel baru (pilihan)` _Eksperimental_

* `options` Object
  * `label` String (opsional) - Teks untuk ditampilkan.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (opsional) - Hex warna teks, i.e `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarLabel`:

#### `sentuhBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `sentuhBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
