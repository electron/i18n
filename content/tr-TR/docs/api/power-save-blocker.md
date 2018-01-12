# powerSaveBlocker

> Sistemin düşük güç (uyku) moduna girmesini engelleyin.

Süreç: [Ana](../glossary.md#main-process)

Örneğin:

```javascript
const {powerSaveBlocker} = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Metodlar

`powerSaveBlocker` modülü aşağıdaki yöntemleri içerir:

### `powerSaveBlocker.start(type)`

* `tip` String - Güç tasarruf engelleyici tür. 
  * `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

`Integer` Döndürür - Güç engelleyiciye atanan engelleyici kimliği

Sistemin daha düşük güç moduna girmesini önler. Güç tasarrufu bloklarını tanımlayan bir tam sayı döndürür.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. Bundan sonra `prevent-app-suspension` kullanılır.

### `powerSaveBlocker.stop(id)`

* `id` Integer - Güç tasarrufu engelleyici kimliği `powerSaveBlocker.start` tarafından döndürüldü.

Belirtilen güç tasarrufu bloke ediciyi durdurur.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - Güç tasarrufu engelleyici kimliği `powerSaveBlocker.start` tarafından döndürüldü.

`Boolean` döndürür - İlgili `powerSaveBlocker` başlatılıp başlatılmadığı.