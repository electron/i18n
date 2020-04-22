# Panoramica sul sistema di compilazione

Electron usa [GN](https://gn.googlesource.com/gn) per la generazione del progetto e [ninja](https://ninja-build.org/) per costruire. Le configurazioni del progetto possono essere trovate nei file `.gn` e `.gni`.

## File GN

I seguenti file <gn</code> contengono le regole principali per costruire Electron:

* `BUILD.gn` definisce come Electron stesso è costruito ed include le configurazioni predefinite per il collegamento con Chromium.
* `build/args/{debug,release,all}.gn` contiene gli argomenti di costruzione predefiniti per costruire Electron.

## Build Componente

Poiché Chromium è un progetto abbastanza ampio, la fase finale del collegamento può richiedere alcuni minuti, il che rende difficile lo sviluppo. Per risolvere questo problema, Chromium ha introdotto la "componente build", che crea ogni componente come una libreria condivisa separata, rendendo il collegamento molto veloce ma sacrificando la dimensione e le prestazioni del file.

Electron eredita questa opzione di costruzione da Chromium. Nelle build `Debug`, il binario sarà collegato ad una versione della libreria condivisa dei componenti di Chromium per raggiungere un tempo di collegamento veloce; per le build `Release`, il binario sarà collegato alle versioni di libreria statica, così che possiamo avere la dimensione e la performance migliore possibile del binario.

## Test

**NB** _this section is out of date and contains information that is no longer relevant to the GN-built electron._

Prova le tue modifiche conformi allo stile di codifica del progetto utilizzando:

```sh
$ npm run lint
```

Test funzionalità usando:

```sh
$ npm test
```

Ogni volta che si apportano modifiche al codice sorgente di Electron, è necessario rieseguire la compilazione prima dei test:

```sh
$ npm run build && npm test
```

Puoi far si che la suit di prova sia eseguita più velocemente isolando il test specifico o il blocco su cui stai attualmente lavorando usando la funzionalità di [test esclusivo](https://mochajs.org/#exclusive-tests) di Mocha. Aggiungi `.only` ad ogni `describe` o la funzione di chiamata `it`:

```js
describe.only('some feature', () => {
  // ... only tests in this block will be run
})
```

Alternativamente, puoi usare l'opzione di `grep` di mocha per eseguire solo test corrispondenti il formato di espressione regolare dato:

```sh
$ npm test -- --grep child_process
```

Test che includono moduli nativi (es. `runas`) non possono essere eseguiti con la build di debug (vedi [#2558](https://github.com/electron/electron/issues/2558) per dettagli), ma funzioneranno con la build di rilascio.

Per eseguire i test con la versione di rilascio, utilizzare:

```sh
$ npm test -- -R
```
