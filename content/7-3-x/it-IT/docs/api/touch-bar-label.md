## Classe: EtichettaBarraTocco

> Crea un'etichetta nella barra di tocco per applicazioni native macOS

Processo: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuovo EtichettaBarraTocco(opzioni)` _Sperimentale_

* `options` Object
  * `etichetta` Stringa(opzionale) - Testo da mostrare.
  * `ColoreTesto` Stringa (opzionale) - Colore del testo Hex, come `#ABCDEF`.

### Proprietà Istanza

Le proprietà seguenti sono disponibili su istanza di `BarraEtichettaTouch`:

#### `etichettaBarratouch.etichetta`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `EtichettaBarratouch.testoColore`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
