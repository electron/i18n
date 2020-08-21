# REPL

Read Eval Print Loop (REPL) è un semplice ambiente interattivo di programmazione per computer che prende input utente singoli (come espressioni singole), le valuta e restituisce il risultato all'utente.

Il modulo `repl` fornisce un'implementazione REPL accessibile usando:

* Supponendo che tu abbia `electron` o `electron-prebuilt` installato come una dipendenza del progetto locale:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Supponendo che tu abbia `electron` o `electron-prebuilt` installati globalmente:

  ```sh
  electron --interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Nota:** `electron --interactive` non è disponibile su Windows.

Può informazioni nei [documenti REPL Node.js](https://nodejs.org/dist/latest/docs/api/repl.html).
