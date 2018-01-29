## Klase : TouchBarSlider

> Maglikha ng slider sa touch bar para sa likas na aplikasyong macOs

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `bagong TouchBarSlider(opsyon)` *Eksperimento*

* `mga pagpipilian` Bagay 
  * `pangalan` String (opsyonal) - label na teksto.
  * `halaga` Integer (opsyonal) - napiling halaga.
  * `minValue` Integer (opsyonal) - Pinakamaliit na halaga.
  * `maxValue` Integer (opsyonal) - Pinakamalaking halaga.
  * `pagbabago` Tungkuli (opsyonal) - tungkuling tawagan kung ang slider ay napalitan. 
    * `newValue` Numero - Ang halaga na pinili ng gumugamit sa Slider

### Instance Properties

Ang mga sumusunod na propyedad ai pwedeng gamitin sa pagkakataon ng `TouchBarSlider`:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.