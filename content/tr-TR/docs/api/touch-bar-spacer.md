## Class: TouchBarSpacer

> Yerel Mac OS uygulamaları için dokunmatik çubuktaki iki öğe arasında bir aralayıcı oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(seçenekler)` *Deneysel*

* `seçenekler` Nesnesi 
  * `boyut` Dizge (isteğe bağlı) - Aralayıcı boyutu, olası değerler şunlardır: 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.