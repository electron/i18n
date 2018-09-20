## Kelas: TouchBarPopover

> Membuat sebuah popover pada palang sentuh (touch bar) untuk aplikasi asli macOs

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### ` TouchBarPopover(pilihan) baru` *Eksperimental*

* `pilihan` Benda 
  * `label` String (tidak wajib diisi) - tombol teks Popover.
  * `ikon` [GambarAsli](native-image.md) (tidak wajib diisi) - tombol ikon Popover.
  * `jenis-jenis` [TouchBar](touch-bar.md) (tidak wajib diisi) - butir-butir untuk ditampilkan didalam popover.
  * `showCloseButton` Boolean (tidak wajib diisi) - `benar` untuk menampilkan tombol penutup pada bagian kiri Popover, `salah` untuk tidak memperlihatkannya. Bawaanya adalah `benar`.

### Contoh properti

Properti berikut ini tersedia dalam kejadian `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` mewakili tombol text popover yang berlaku Mengganti nilai ini akan segera memperbaharui popover di dalam palang sentuh (touch bar).

#### `touchBarPopover.icon`

Sebuah `GambarAsli` mewakili ikon tombol popover yang berlaku. Mengganti nilai ini akan segera memperbaharui popover di palang sentuh (touch bar).