## Classe: VistaBrowser

> Crea e controlla visite.

**Nota:** La VistaBrowser API è attualmente sperimentale e potrebbe cambiare o essere rimossa nei rilasci futuri di Electron.

Processo: [Principale](../glossary.md#main-process)

Una `VistaBrowser` può essere usato per incorporare contenuti web aggiuntivi nella `FinestraBrowsee`. È come una finestra piccola, eccetto per il fatto che è posta in parentela alla finestra propria. È considerato essere un alternativa al tag `vistaweb`.

## Esempio

```javascript
// Nel processo principale.
const {VistaBrowser, FinestraBrowser} = richiedi('electron')

vinci = nuova FinestraBrowser({larghezza: 800, altezza: 600})
vinci.su('chiuso', () => {
  vinci = nullo
})

visualizza = nuova VistaBrowswr({
  Preferenzeweb: {
    Integrazionenodo: false
  }
})
vinci.impostaVistaBrowser(vista)
vista.impostaRimbalzi({ x: 0, y: 0, larghezza: 300, altezza: 300 })
vista.Contenutiweb.caricaURL('https://electron.atom.io')
```

### `nuova VistaBrowser([options])` *Sperimentale*

* `opzioni` Oggetto (opzionale) 
  * `Preferenzeweb` Oggetto (opzionale) - Vedi [FinestraBrowser](browser-window.md).

### Metodi Statici

#### `VistaBrowser.daId(id)`

* `id` Numero Intero

Restituisce `VistaBrowser` - La vista con l'`id` dato.

### Proprietà Istanze

Oggetti creato con `nuova VistaBrowser` hanno le seguenti proprietà:

#### `vista.Contenutiweb` *Sperimentale*

Un oggetto [`ContenutiWeb`](web-contents.md) da questa vista.

#### `vista.id` *Sperimentale*

Un numero `Intero` rappresentante l'unico ID di visualizzazione.

### Metodi Istanza

Oggetti creati con `nuova VistaBrowser` hanno i seguenti metodi d'istanza:

#### `vedi.impostaRidimensionaAutomaticamente(opzioni` *Sperimentale*

* `opzioni` Oggetto 
  * `larghezza` Booleano - Se `true` la larghezza della vista crescerà e si contrarrà insieme alla finestra. `false` di default.
  * `altezza` Booleano - Se `true`, la vista dell'altezza crescerà e si contrarrà con la finestra. `false` di default.

#### `vista.impostaLimiti(limiti)` *Sperimentale*

* `limiti` [Rettangolo](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.