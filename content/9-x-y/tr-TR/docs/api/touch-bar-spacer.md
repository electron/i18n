## Class: TouchBarSpacer

> Yerel Mac OS uygulamaları için dokunmatik çubuktaki iki öğe arasında bir aralayıcı oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(seçenekler)` _Deneysel_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` Maddeler arasında küçük aralayıcı. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `büyük` Maddeler arasında geniş aralayıcı. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Bütün aralayıcıları kısalt. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
