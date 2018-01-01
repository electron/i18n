# MasaüstüYakalayıcısıKaynağı Nesnesi

* `id` Dizesi - [`navigator.webkitGetUserMedia`] çağırırken bir `chromeMediaSourceId` sınırlayıcısı olarak kullanılabilen bir pencere ya da ekranın tanımlayıcısı. `XX` rastgele üretilmiş bir sayı olduğunda, tanımlayıcının formatı `window:XX` ya da `screen:XX` olacak.
* `name` Dizesi - Bir pencere kaynağının ismi pencere başlığı ile uyuşurken, ekran kaynağı ya `Entire Screen` ya da `Screen <index>` olarak isimlendirilecek.
* `thumbnail` [NativeImage](../native-image.md) - Bir küçük resim. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.