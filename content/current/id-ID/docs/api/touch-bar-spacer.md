## Kelas: TouchBarSpacer

> Membuat spacer antara dua item di bar sentuhan untuk aplikasi asli macOS

Proses: [utama](../tutorial/application-architecture.md#main-and-renderer-processes)

### `baru TouchBarSpacer(options)` *Experimental*

* `pilihan` Benda 
  * `ukuran` String (opsional) - Ukuran spacer, nilai yang mungkin adalah: 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.