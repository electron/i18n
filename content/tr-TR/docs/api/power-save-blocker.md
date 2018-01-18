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
  * `prevent-app-suspension` - Uygulamanın askıya alınmasını engeller. Sistemin aktif kalmasını sağlar, ancak ekranın kapatılmasına izin verir. Kullanım örnekleri: dosya indirme veya ses çalma.
  * `prevent-display-sleep` - Ekranın uyku moduna geçmesini önler. Sistemi ve ekranı etkin tutar. Örnek kullanım durumu: video oynatma.

`Integer` Döndürür - Güç engelleyiciye atanan engelleyici kimliği

Sistemin daha düşük güç moduna girmesini önler. Güç tasarrufu bloklarını tanımlayan bir tam sayı döndürür.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Yalnızca en baskın öncelik türü etkili olabilir. Başka bir deyişle, `prevent-display-sleep` her zaman `prevent-app-suspension`' dan önceliklidir.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` B isteği durdurulana kadar kullanılır. Bundan sonra `prevent-app-suspension` kullanılır.

### `powerSaveBlocker.stop(id)`

* `id` Integer - Güç tasarrufu engelleyici kimliği `powerSaveBlocker.start` tarafından döndürüldü.

Belirtilen güç tasarrufu bloke ediciyi durdurur.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - Güç tasarrufu engelleyici kimliği `powerSaveBlocker.start` tarafından döndürüldü.

`Boolean` döndürür - İlgili `powerSaveBlocker` başlatılıp başlatılmadığı.