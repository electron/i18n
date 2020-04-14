## Klase: diinang BarSpacer

> Lumikha ng pagitan sa gitna ng dalawang aytem sa pindutang bar para aplikasyon ng katutubong macOs

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong diinangPagitangBar(pamimilian)`*Eksperimento*

* `pagpipilian` Bagay 
  * `sukat` Pisi (opsyonal) - laki ng spacer, posibleng values ay: 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.