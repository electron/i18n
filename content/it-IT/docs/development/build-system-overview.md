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

**NB** *questa sezione è obsoleta e contiene informazioni non più rilevanti all'electron costruito con GN.*

Prova le tue modifiche conformi allo stile di codifica del progetto utilizzando:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm test
```

Ogni volta che si apportano modifiche al codice sorgente di Electron, è necessario rieseguire la compilazione prima dei test:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

Per eseguire i test con la versione di rilascio, utilizzare:

```sh
$ npm test -- -R
```