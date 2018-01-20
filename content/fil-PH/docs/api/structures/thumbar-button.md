# Mga bagay sa ThumbarButton

* `icon` [NativeImage](../native-image.md) - Ang icon na ipinapakita sa thumbnail ng toolbar.
* `click` Function
* `tooltip` String (opsyonal) - Ang teksto ng tooltip sa pindutan.
* `flags` String[] (opsyonal) - Kontrolin ang tiyak na mga estado at katangian ng mga pindutan. Sa pamamagitan ng default, ito ay `['enabled']`.

Ang `flags` ay isang kaayusan na maaaring isama ang mga sumusunod `String`:

* `enabled` - Ang pindutan ay aktibo at magagamit ng mga gumagamit.
* `disabled` - Ang pindutan ay hindi pinagana. Ito ay kasalukuyan, subalit ito ay may nakikitang estado na nagsasabing ito ay hindi tutugon sa aksyon ng gumagamit.
* `dismissonclick` - Kapag ang pindutan ay pinindot, ang thumbnail window ay agad-agad na magsasara.
* `nobackground` - Huwag gumawa ng hangganan ng pindutan, gamitin lamang ang larawan.
* `hidden` - Ang pindutan ay hindi ipinapakita sa mga gumagamit.
* `noninteractive` - Ang pindutan ay gumagana ngunit hindi interaktibo; walang pagpindot sa estado ng pindutan ang ginawa. Ang bilang na ito ay inilaan para sa pagkakataon na kung saan ang pindutan ay ginagamit sa isang paalala.