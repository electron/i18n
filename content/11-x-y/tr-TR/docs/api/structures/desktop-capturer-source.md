# MasaüstüYakalayiciKaynagi Nesnesi

* `id` String - Pencere ya da ekran tanımlayıcı verisi, aynı zamanda [`navigator.webkitGetUserMedia`] metodu çağırırken `chromeMediaSourceId` kısıtlanmış verisi olarak kullanılabilir. Tanımlayıcının formatı `window:XX` ya da `screen:XX` olmalıdır, nerede `XX` rastgele olarak üretildi ise.
* `name` String - Ekran kaynağının ismi ya `Entire Screen` olmalı yada `Screen <index>`, çünkü ekran kaynağının ismi ile pencerenin ismi eşleşmiş olmalı.
* `thumbnail` [NativeImage](../native-image.md) -Ön izleme resimi. **Not:** `desktopCapturer.getSources` 'e `options` içerisinde `thumbnailSize` olarak belirtilen boyut ile, küçük resmin boyutunun aynı olacağınin garantisi yoktur. Gerçek boyut ekranın ya da pencerenin ölçeğine bağlıdır.
* `display_id` String - [Screen API](../screen.md) tarafından [Display](display.md) ile eşleşmesinden gelen, `id` değerine karşılık benzersiz tanımlayıcı. Bazı platformlarda bu, yukarıdaki `id` kimliği alanı `XX` kısmının eşdeğeridir ama diğerlerinde farklı olacaktır. Eğer kullanabilir değilse boş bir string olmalıdır.
* `appIcon` [NativeImage](../native-image.md) - Penceredeki uygulamanın ikon görseli. Eğer kaynak type screen'e sahipse null olur. Simgenin boyutu önceden bilinmemektedir ve uygulamanın ne sağladığına bağlıdır.
