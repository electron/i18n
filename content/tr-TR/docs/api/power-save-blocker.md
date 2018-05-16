# güç Tasarrufu Engelleyici

> Sistemin düşük güç (uyku) moduna girmesini engelleyin.

İşlem: [Ana](../glossary.md#main-process)

Örneğin:

```javascript
const {powerSaveBlocker} = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Yöntemler

`powerSaveBlocker` modülü aşağıdaki yöntemleri içerir:

### `powerSaveBlocker.start(type)`

* `türü` String - Güç tasarruf engelleyici tür. 
  * `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

`Integer` Döndürür - Güç engelleyiciye atanan engelleyici kimliği.

Sistemin daha düşük güç moduna girmesini önler. Güç tasarrufu bloklarını tanımlayan bir tam sayı döndürür.

**Not:** `prevent-display-sleep`, `prevent-app-suspension`'dan daha önceliklidir. Yalnızca en baskın öncelik türü etkili olabilir. Başka bir deyişle, `prevent-display-sleep` her zaman `prevent-app-suspension`' dan önceliklidir.

Örnek olarak, `prevent-app-suspension` için A isteklerini çağıran bir API ve `prevent-display-sleep` için B isteklerini çağıran bir başka API. `prevent-display-sleep` B isteği durdurulana kadar kullanılır. Bundan sonra `prevent-app-suspension` kullanılır.

### `powerSaveBlocker.stop(id)`

* `id` Integer - Güç tasarrufu engelleyici kimliği `powerSaveBlocker.start` tarafından döndürüldü.

Belirtilen güç tasarrufu bloke ediciyi durdurur.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - Güç tasarrufu engelleyici kimliği `powerSaveBlocker.start` tarafından döndürüldü.

`Boolean` döndürür - İlgili `powerSaveBlocker` başlatılıp başlatılmadığı.