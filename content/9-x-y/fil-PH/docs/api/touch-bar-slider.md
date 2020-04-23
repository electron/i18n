## Klase : TouchBarSlider

> Maglikha ng slider sa touch bar para sa likas na aplikasyong macOs

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarSlider(opsyon)` _Eksperimento_

* `options` Object
  * `pangalan` String (opsyonal) - label na teksto.
  * `halaga` Integer (opsyonal) - napiling halaga.
  * `minValue` Integer (opsyonal) - Pinakamaliit na halaga.
  * `maxValue` Integer (opsyonal) - Pinakamalaking halaga.
  * `change` Function (optional) - Function to call when the slider is changed.
    * `newValue` Numero - Ang halaga na pinili ng gumugamit sa Slider.

### Katangian ng pagkakataon

Ang mga sumusunod na propyedad ai pwedeng gamitin sa pagkakataon ng `TouchBarSlider`:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.
