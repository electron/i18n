# ThumbarButton Nesnesi

* `simgesi` [NativeImage](../native-image.md) - Küçük resimde gösterilen simge araç çubuğu.
* `tıklama`fonksiyonu
* `ipucu` Dize (isteğe bağlı) - Düğmenin araç ipucu metni.
* `bayraklar` String [] (isteğe bağlı) - Belirli durumları ve davranışlarını denetler buton. Varsayılan olarak, `['etkinleştirilmiş']`.

The `flags` is an array that can include following `String`s:

* `enabled` - The button is active and available to the user.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.