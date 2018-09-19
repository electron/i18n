## Classe: EtichettaBarraTocco

> Crea un'etichetta nella barra di tocco per applicazioni native macOS

Processo: [Main](../tutorial/quick-start.md#main-process)

### `nuovo EtichettaBarraTocco(opzioni)` *Sperimentale*

* `options` Oggetto 
  * `etichetta` Stringa(opzionale) - Testo da mostrare.
  * `ColoreTesto` Stringa (opzionale) - Colore del testo Hex, come `#ABCDEF`.

### Proprietà Istanza

Le proprietà seguenti sono disponibili su istanza di `BarraEtichettaTouch`:

#### `etichettaBarratouch.etichetta`

Una `Stringa` rappresentante il testo corrente dell'etichetta. Modificando questo valore l'etichetta sarà automaticamente aggiornata nella barra touch.

#### `EtichettaBarratouch.testoColore`

Un codice hex della `Stringa` rappresentante il colore corrente del testo dell'etichetta. Cambiando questo valore aggiornerà automatocamente l'etichetta nella barra touch.