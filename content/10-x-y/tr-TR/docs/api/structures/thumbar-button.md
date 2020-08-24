# ThumbarButton Nesnesi

* `simgesi` [NativeImage](../native-image.md) - Küçük resimde gösterilen simge araç çubuğu.
* `tıklama`fonksiyonu
* `ipucu` Dize (isteğe bağlı) - Düğmenin araç ipucu metni.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`bayrakları` aşağıdaki Dizelerini takip eden bir `dizidir`:

* `etkinleştirilmiş` - Düğme etkin ve kullanıcı tarafından kullanılabilir.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `kapatmaya tıkla` - Düğmeye tıklandığında küçük resim penceresi kapanır hemen.
* `arka plan yok` - Bir düğme kenarlığı çizmeyin, yalnızca resmi kullanın.
* `gizli` - Düğme kullanıcıya gösterilmez.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
