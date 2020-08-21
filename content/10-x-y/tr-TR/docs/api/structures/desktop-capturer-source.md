# MasaüstüYakalayiciKaynagi Nesnesi

* `id` String - Pencere ya da ekran tanımlayıcı verisi, aynı zamanda [`navigator.webkitGetUserMedia`] metodu çağırırken `chromeMediaSourceId` kısıtlanmış verisi olarak kullanılabilir. Tanımlayıcının formatı `window:XX` ya da `screen:XX` olmalıdır, nerede `XX` rastgele olarak üretildi ise.
* `name` String - Ekran kaynağının ismi ya `Entire Screen` olmalı yada `Screen <index>`, çünkü ekran kaynağının ismi ile pencerenin ismi eşleşmiş olmalı.
* `thumbnail` [NativeImage](../native-image.md) -Ön izleme resimi. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. Gerçek boyut ekranın ya da pencerenin ölçeğine bağlıdır.
* `display_id` String - [Screen API](../screen.md) tarafından [Display](display.md) ile eşleşmesinden gelen, `id` değerine karşılık benzersiz tanımlayıcı. Bazı platformlarda bu, yukarıdaki `id` kimliği alanı `XX` kısmının eşdeğeridir ama diğerlerinde farklı olacaktır. Eğer kullanabilir değilse boş bir string olmalıdır.
* `appIcon` [NativeImage](../native-image.md) - An icon image of the application that owns the window or null if the source has a type screen. The size of the icon is not known in advance and depends on what the the application provides.
