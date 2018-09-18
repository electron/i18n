# Panoramica sul sistema di compilazione

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## Component Build

Poiché Chromium è un progetto abbastanza ampio, la fase finale del collegamento può richiedere alcuni minuti, il che rende difficile lo sviluppo. Per risolvere questo problema, Chromium ha introdotto la "componente build", che crea ogni componente come una libreria condivisa separata, rendendo il collegamento molto veloce ma sacrificando la dimensione e le prestazioni del file.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Tests

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

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