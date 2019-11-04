# Struttura della cartella del codice sorgente

Il codice sorgente di Electron è suddiviso in più blocchi, per lo più adottando le medesime convenzioni di Chromium.

Ti potrebbe essere richiesta una maggiore conoscenza dell'architettura multi-processo di Chromium per una migliore comprensione del codice sorgente.

## Struttura del codice sorgente

```diff
Electron
├── atom/ - Codice sorgente C++.
|   ├── app/ - Codice di immissione del sistema.
|   ├── browser/ - Il frontend che include la finestra principale e tutte le 
|   |   |         cose del processo principale. This talks to the renderer to manage web
|   |   |          pages.
|   |   ├── ui/ - Implementazione dell'inrefaccia utente (UI) per le varie piattaforme.
|   |   |   ├── cocoa/ - Codice sorgente specifico di Cocoa.
| | | Oomen-Ruijten win/ - Codice sorgente specifico per Windows GUI.
|   |   |   └── cocoa/ - Codice sorgente specifico di Cocoa.
L'implementazione delle principali API di processo.
|   |   ├── net/ - Network related code.
|   |   ├── mac/ - Mac specific Objective-C source code.
|   |   └── resources/ - Icons, platform-dependent files, etc.
|   ├── renderer/ - Code that runs in renderer process.
|   |   └── api/ - The implementation of renderer process APIs.
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── chromium_src/ - Codice sorgente preso da Chromium. Vedi sotto.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - Documentations.
├── lib/ - JavaScript source code.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ❤ common/ - JavaScript utilizzato sia dai processi principali che dal renderer
|   |   ❤ api/ - implementazione API Javascript.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - Automatic tests.
└── BUILD.gn - Building rules of Electron.
```

## `/chromium_src`

I file in `/chromium_src` sono di solito parti di Chromium che non appartengono al livello dei contenuti. Per esempio, nell'implementazione delle Pepper API abbiamo bisogno di connessioni implementate in maniera del tutto simile a quella adottata dalla distribuzione ufficiale di Chrome. Avremmo potuto compilare le parti più importanti dei sorgenti includendole in [libcc](../glossary.md#libchromiumcontent) ma molto spesso non abbiamo bisogno di tutte le funzionalità (alcune in effetti sembrano codice proprietario, con funzioni di analisi statistica), così abbiamo preso solo alcune parti del codice. Queste avrebbero potuto essere implementate come patch di libcc, ma quando furono scritte uno degli obiettivi principali di libcc era di avere patch di dimensioni molto ridotte, mentre i cambiamenti apportati a chromium_src sono di solito importanti. Inoltre le patch non sarebbero mai entrate a far parte della distribuzione principale, a differenza delle altre patch di libcc che manteniamo abitualmente.

## Struttura delle altre cartelle

* **script** - Script usati per finalità di sviluppo come compilazione, assemblaggio dei pacchetti, testing, ecc.
* **strumenti** - Script di Helper utilizzati dai file GN, a differenza di `script`, gli script inseriti qui non dovrebbero mai essere invocati direttamente dagli utenti.
* **vendor** - Codice sorgente di dipendenze di terze parti, non abbiamo utilizzato `terzo_party` come nome perché confonderebbe la stessa directory nell'albero di codice sorgente di di Chromium.
* **node_modules** - Third party node modules used for building.
* **out** - Temporary output directory of `ninja`.
* **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

## Keeping Git Submodules Up to Date

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

To update these vendored dependencies, run the following command:

```sh
git submodule update --init --recursive
```

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

```sh
[alias]
    su = submodule update --init --recursive
```