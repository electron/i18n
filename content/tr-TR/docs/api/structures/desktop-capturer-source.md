# MasaüstüYakalayıcısıKaynağı Nesnesi

* `id` Dizesi - [`navigator.webkitGetUserMedia`] çağırırken bir `chromeMediaSourceId` sınırlayıcısı olarak kullanılabilen bir pencere ya da ekranın tanımlayıcısı. `XX` rastgele üretilmiş bir sayı olduğunda, tanımlayıcının formatı `window:XX` ya da `screen:XX` olacak.
* `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.