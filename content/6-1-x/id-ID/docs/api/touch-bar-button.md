## Kelas: TouchBarButton

> Buat tombol di panel sentuh untuk aplikasi macOS asli

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `TouchBarButtonbaru(pilihan)`_Eksperimental_

* `options` Object
  * `label` String (opsional) - Teks tombol.
  * `backgroundColor` String (opsional) - Tombol warna latar dalam format hex, i.e `#ABCDEF`.
  * `ikon `[ NativeImage ](native-image.md) (opsional) - Ikon tombol.
  * `iconPosition`String (opsional) - Bisa jadi `left`,` right`atau`overlay`.
  * `klik`Fungsi (opsional) - Fungsi untuk memanggil saat tombol diklik.

### Contoh properti

Properti berikut tersedia pada contoh `TouchBarButton`:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.
