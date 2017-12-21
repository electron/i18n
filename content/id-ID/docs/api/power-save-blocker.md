# powerSaveBlocker

> Memblokir sistem agar tidak masuk modus daya-rendah (tidur).

Proses:  Utama </ 0></p> 

Sebagai contoh:

```javascript
const {powerSaveBlocker} = require('electron') 

const id = powerSaveBlocker.start('mencegah-tampilan-tidur') 
console.log(powerSaveBlocker.isStarted(id)) 

powerSaveBlocker.stop(id)
```

## Methods

Modul `powerSaveBlocker` mempunyai metods sebagai berikut:

### `powerSaveBlocker.start(type)`

* `type` String - jenis Power save blocker. 
  * `prevent-app-suspension` Mencegah aplikasi agar tidak ditangguhkan/dibekukan. Menjaga sistem tetap aktif tetapi mengizinkan layar untuk dimatikan. Contoh kasus penggunaannya: mengunduh sebuah file atau memainkan audio.
  * `prevent-display-sleep` - Mencegah tampilan agar tidak tidur (gelap). Menjaga sitem dan layar tetap aktif. Contoh kasus penggunaannya: memainkan video.

Returns `Integer` - ID bloker yang ditetapkan untuk pemblokir daya ini

Mulai mencegah sistem agar tidak memasuki mode daya-rendah. Mengembalikan sebuah integer yang mengidentifikasi pemblokir hemat daya.

**Catatan:** `prevent-display-sleep` mempunyai prioritas lebih tinggi dari `prevent-app-suspension`. Hanya jenis prioritas tertinggi yang akan berpengaruh. Dengan kata lain, `prevent-display-sleep` selalu mengambil prioritas lebih tinggi dari `prevent-app-suspension`.

Sebagai contoh, sebuah API memanggil A meminta untuk `prevent-app-suspension`, dan yang lainnya memanggil B meminta untuk `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.