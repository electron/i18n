# ang powerSaveBlocker

> Hahadlangan ang sistema sa pagpasok mula sa moda ng low-power (pagtulog).

Ang proseso: [Main](../glossary.md#main-process)

Halimbawa:

```javascript
const {powerSaveBlocker} = kailangan('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Pamamaraan

Ang modyul ng `powerSaveBlock` ay mayroon ng mga sumusunod na mga pamamaraan:

### `ang powerSaveBlock.start(uri)`

* `ang uri` String - Ang uri ng tagaharang ng power save. 
  * Ang `prevent-app-suspension` - Pinipigilan ang aplikasyon mula sa pagiging suspendido. Panatilihin ang sistema sa pagiging aktibo ngunit pinapayagan ang iskrin na mamatay. Halimbawa ng mga ginamit na pagkakataon: pagda-download ng isang file o pagpapatugtog ng audio.
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