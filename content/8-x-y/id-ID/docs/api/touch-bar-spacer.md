## Kelas: TouchBarSpacer

> Membuat spacer antara dua item di bar sentuhan untuk aplikasi asli macOS

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `baru TouchBarSpacer(options)` _Experimental_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `kecil` - kecil ruang antara item. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `besar` - besar ruang antara item. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `fleksibel` - mengambil semua ruang yang tersedia. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
