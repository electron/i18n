## Classe: ProxyFinestraBrowser

> Manipola la finestra browser figlia

Processo: [Renderer](../glossary.md#renderer-process)

L'oggetto `ProxyFinestraBrowser` è tornato da `apri.finestra` e fornisce una limitata funzionalità con la finestra figlia.

### Metodi Istanza

L'oggetto `ProxyFinestraBrowser` prevede i seguenti metodi d'istanza:

#### `win.blur()`

Rimuove la focalizzazione dalla finestra figlia.

#### `win.chiudi()`

Chiude forzatamente la finestra figlia senza chiamare il suo evento scaricato.

#### `win.eval(codice)`

* `code` Stringa

Valuta il codice nella finestra figlia.

#### `win.focalizza()`

Focalizza la finestra figlia (porta la finestra in primo piano).

#### `win.stampa()`

Invoca il dialogo di stampa sulla finestra figlia.

#### `win.postaMessaggio(messaggio, bersaglioOrigine)`

* `messaggio` Stringa
* `Originebersaglio` Stringa

Invia un messaggio alla finestra figlia con l'origine specificata o `*` per nessuna preferenza d'origine.

In aggiunta a questi metodi, la finestra figlia implementa l'oggetto `apri.finestra` senza proprietà ed un metodo singolo.

### Proprietà Istanza

L'oggetto `ProxyFinestraBrowser` ha le seguenti proprietà d'istanza:

#### `win.chiuso`

Un `Booleano` impostato a true dopo che la finestra figlia viene chiusa.
