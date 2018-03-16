## Classe: EtichettaBarraTocco

> Crea un'etichetta nella barra di tocco per applicazioni native macOS

Processo: [Principale](../tutorial/quick-start.md#main-process)

### `nuovo EtichettaBarraTocco(opzioni)` *Sperimentale*

* `opzioni` Oggetto 
  * `etichetta` Stringa(opzionale) - Testo da mostrare.
  * `ColoreTesto` Stringa (opzionale) - Colore del testo Hex, come `#ABCDEF`.

### Proprietà Istanza

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.