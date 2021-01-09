## Classe: EtichettaBarraTocco

> Crea un'etichetta nella barra di tocco per applicazioni native macOS

Processo: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuovo EtichettaBarraTocco(opzioni)` _Sperimentale_

* `options` Object
  * `etichetta` Stringa(opzionale) - Testo da mostrare.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `ColoreTesto` Stringa (opzionale) - Colore del testo Hex, come `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Proprietà Istanza

Le proprietà seguenti sono disponibili su istanza di `BarraEtichettaTouch`:

#### `etichettaBarratouch.etichetta`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `EtichettaBarratouch.testoColore`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
