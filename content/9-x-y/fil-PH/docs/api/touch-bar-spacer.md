## Klase: diinang BarSpacer

> Lumikha ng pagitan sa gitna ng dalawang aytem sa pindutang bar para aplikasyon ng katutubong macOs

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong diinangPagitangBar(pamimilian)`_Eksperimento_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `maliit` - Maliit na pagitan sa gitna ng mga aytem. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `malaki` - Malaking pagitan sa gitna ng mga aytem. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - kunin ang lahat ng espasyo na magagamit. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
