# ang powerSaveBlocker

> Hahadlangan ang sistema sa pagpasok mula sa moda ng low-power (pagtulog).

Proseso:[Pangunahi](../glossary.md#main-process)

For example:

```javascript
const {powerSaveBlocker} = kailangan('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Mga Paraan

Ang modyul ng `powerSaveBlock` ay mayroon ng mga sumusunod na mga pamamaraan:

### `ang powerSaveBlock.start(uri)`

* `ang uri` String - Ang uri ng tagaharang ng power save. 
  * Ang `prevent-app-suspension` - Pinipigilan ang aplikasyon mula sa pagiging suspendido. Panatilihin ang sistema sa pagiging aktibo ngunit pinapayagan ang iskrin na mamatay. Halimbawa ng mga ginamit na pagkakataon: pagda-download ng isang file o pagpapatugtog ng audio.
  * `prevent-display-sleep` - Pipigilan ang displey mula sa pagtulog, pinapanatiling aktibo ang sistema at ang iskrin. Halimbawa ng ginamit na pagkakataon: naglalaro ng video.

Nagbabalik sa `Integer` - Ang ID ng tagaharang na itinalaga para sa tagaharang ng lakas na ito

Sinisimulang pigilan ang sistema mula sa pagpasok sa moda ng mababang power. Nagbabalik ang isang integer na kinikilala ang tagaharang sa power save.

**Note:** Ang `prevent-display-sleep` ay may mas mataas na kahalagahan kaysa `prevent-app-suspension`. Ang mga uri ng mas nakakahigit ang kahalagahan lamang ang mayroong epekto. Sa ibang salita, ang `prevent-display-sleep` ay laging higit ang kahalagahan kaysa sa `prevent-app-suspension`.

Halimbawa, ang isang API ay tumatawag ng A na mga kahilingan para sa `prevent-app-suspension`, at ang isa pa ay tumatawag ng B na mga kahilingan para sa `prevent-display-sleep`. Ang `prevent-display-sleep` ang gagamitin hanggang ang B ay huminto sa kanyang kahilingan. Pagkatapos noon, ang `prevent-app-suspension` ay gagamitin.

### `ang powerSaveBlocker.stop(id)`

* `id` Integer - Ang id ng tagaharang ng power save ay magbabalik sa pamamagitan ng `powerSaveBlocker.start`.

Itinitigil ang tinukoy na tagaharang ng power save.

### `ang powerSaveBlocker.isStarted(id)`

* `id` Integer - Ang id ng tagaharang ng power save ay magbabalik sa pamamagitan ng `powerSaveBlocker.start`.

Nagbabalik ang `Boolean` - Kung ang nararapat na `powerSaveBlocker` ay nagsimula na.