## Klase : TouchBarSlider

> Maglikha ng slider sa touch bar para sa likas na aplikasyong macOs

Proseso: [Pangunahing](../tutorial/quick-start.md#main-process)

### `bagong TouchBarSlider(opsyon)` *Eksperimento*

* `pagpipilian` Bagay 
  * `pangalan` String (opsyonal) - label na teksto.
  * `halaga` Integer (opsyonal) - napiling halaga.
  * `minValue` Integer (opsyonal) - Pinakamaliit na halaga.
  * `maxValue` Integer (opsyonal) - Pinakamalaking halaga.
  * `baguhin` Tungkuli (opsyonal) - tungkuling tawagan kung ang slider ay napalitan. 
    * `newValue` Numero - Ang halaga na pinili ng gumugamit sa Slider.

### Katangian ng pagkakataon

Ang mga sumusunod na propyedad ai pwedeng gamitin sa pagkakataon ng `TouchBarSlider`:

#### `touchBarSlider.label`

Ang <->String</code> na nagrepresenta sa kasalukuyang teksto ng slider. Ang pagpalit ng halagang ito ay kaagad na bumabago ng slider sa pindutang bar.

#### `touchBarSlider.value`

Ang `Numero` na narepresenta ng kasalukuyang teksto ng slider. Ang pagapalit ng halagang ito ay kaagad na bumabago ng slider sa pindutang bar.

#### `touchBarSlider.minValue`

Ang `Numero` na nagrepresenta ng kasalukuyang pinakamaliit na halaga ng slider. Ang papalit ng halaga ay kaagad na bumabago sa slider ng pindutang bar.

#### `touchBarSlider.maxValue`

Ang `Numero` na nagrepresenta ng kasalukuyang pinakamalaking halaga ng slider. Ang papalit ng halaga ay kaagad na bumabago sa slider ng pindutang bar.