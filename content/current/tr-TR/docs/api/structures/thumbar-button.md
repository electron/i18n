# ThumbarButton Nesnesi

* `simgesi` [NativeImage](../native-image.md) - Küçük resimde gösterilen simge araç çubuğu.
* `tıklama`fonksiyonu
* `ipucu` Dize (isteğe bağlı) - Düğmenin araç ipucu metni.
* `bayraklar` String [] (isteğe bağlı) - Belirli durumları ve davranışlarını denetler buton. Varsayılan olarak, `['etkinleştirilmiş']`.

`bayrakları` aşağıdaki Dizelerini takip eden bir `dizidir`:

* `etkinleştirilmiş` - Düğme etkin ve kullanıcı tarafından kullanılabilir.
* `devre dışı` - Düğme devre dışı. Var, ancak görsel bir durumu var ise kullanıcının eylemine yanıt vermeyeceğini belirtir.
* `kapatmaya tıkla` - Düğmeye tıklandığında küçük resim penceresi kapanır hemen.
* `arka plan yok` - Bir düğme kenarlığı çizmeyin, yalnızca resmi kullanın.
* `gizli` - Düğme kullanıcıya gösterilmez.
* `etkileşimli olmayan` - Düğme etkin ancak etkileşimli değil; basılan yok düğme durumu çizilir. Bu değer, düğmenin bir bildirimde kullanılır.