## Kelas: TouchBarPopover

> Membuat sebuah popover pada palang sentuh (touch bar) untuk aplikasi asli macOs

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### ` TouchBarPopover(pilihan) baru` *Eksperimental*

* `pilihan` Obyek 
  * `label` String (tidak wajib diisi) - tombol teks Popover.
  * `ikon` [GambarAsli](native-image.md) (tidak wajib diisi) - tombol ikon Popover.
  * `jenis-jenis` [TouchBar](touch-bar.md) (tidak wajib diisi) - butir-butir untuk ditampilkan didalam popover.
  * `showCloseButton` Boolean (tidak wajib diisi) - `benar` untuk menampilkan tombol penutup pada bagian kiri Popover, `salah` untuk tidak memperlihatkannya. Bawaanya adalah `benar`.

### Properti Instance

Properti berikut ini tersedia dalam kejadian `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.