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
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Returns `Integer` - The blocker ID that is assigned to this power blocker

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.