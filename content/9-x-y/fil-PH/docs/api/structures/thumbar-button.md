# Mga bagay sa ThumbarButton

* `icon` [NativeImage](../native-image.md) - Ang icon na ipinapakita sa thumbnail ng toolbar.
* `click` Function
* `tooltip` String (opsyonal) - Ang teksto ng tooltip sa pindutan.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

Ang `flags` ay isang kaayusan na maaaring isama ang mga sumusunod `String`:

* `enabled` - Ang pindutan ay aktibo at magagamit ng mga gumagamit.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - Kapag ang pindutan ay pinindot, ang thumbnail window ay agad-agad na magsasara.
* `nobackground` - Huwag gumawa ng hangganan ng pindutan, gamitin lamang ang larawan.
* `hidden` - Ang pindutan ay hindi ipinapakita sa mga gumagamit.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
