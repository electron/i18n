## Klase: diinang BarSpacer

> Lumikha ng pagitan sa gitna ng dalawang aytem sa pindutang bar para aplikasyon ng katutubong macOs

Proseso:[Pangunahi](../glossary.md#main-process)

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `maliit` - Maliit na pagitan sa gitna ng mga aytem. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `malaki` - Malaking pagitan sa gitna ng mga aytem. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - kunin ang lahat ng espasyo na magagamit. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

### Katangian ng pagkakataon

The following properties are available on instances of `TouchBarSpacer`:

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Can be `small`, `large` or `flexible`.
