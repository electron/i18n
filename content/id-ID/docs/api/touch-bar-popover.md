## Kelas: TouchBarPopover

> Membuat sebuah popover pada palang sentuh (touch bar) untuk aplikasi asli macOs

Proses: [ Utama](../tutorial/quick-start.md#main-process)

### ` TouchBarPopover(pilihan) baru` *Eksperimental*

* `pilihan` Obyek 
  * `label` String (tidak wajib diisi) - tombol teks Popover.
  * `ikon` [GambarAsli](native-image.md) (tidak wajib diisi) - tombol ikon Popover.
  * `jenis-jenis` [TouchBar](touch-bar.md) (optional) - butir-butir untuk ditampilkan didalam popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Default is `true`.

### Instance Properties

The following properties are available on instances of `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.