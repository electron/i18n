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
  * `prevent-display-sleep` - Pipigilan ang displey mula sa pagtulog, pinapanatiling aktibo ang sistema at ang iskrin. Halimbawa ng ginamit na pagkakataon: naglalaro ng video.

Nagbabalik sa `Integer` - Ang ID ng tagaharang na itinalaga para sa tagaharang ng lakas na ito

Sinisimulang pigilan ang sistema mula sa pagpasok sa moda ng mababang power. Nagbabalik ang isang integer na kinikilala ang tagaharang sa power save.

**Note:** Ang `prevent-display-sleep` ay may mas mataas na kahalagahan kaysa `prevent-app-suspension`. Ang mga uri ng mas nakakahigit ang kahalagahan lamang ang mayroong epekto. Sa ibang salita, ang `prevent-display-sleep` ay laging higit ang kahalagahan kaysa sa `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.