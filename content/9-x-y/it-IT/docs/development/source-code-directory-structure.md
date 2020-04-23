# Struttura della cartella del codice sorgente

Il codice sorgente di Electron è suddiviso in più blocchi, per lo più adottando le medesime convenzioni di Chromium sulla struttura del repository del sorgente.

Ti potrebbe essere richiesta una maggiore conoscenza dell'architettura multi-processo di Chromium per una migliore comprensione del codice sorgente.

## Struttura del codice sorgente

```diff
Electron
├── build/ - Build configuration files needed to build with GN.
├── buildflags/ - Determines the set of features that can be conditionally built.
├── chromium_src/ - Source code copied from Chromium that isn't part of the content layer.
├── default_app/ - A default app run when Electron is started without
|                  providing a consumer app.
├── docs/ - Electron's documentation.
|   ├── api/ - Documentation for Electron's externally-facing modules and APIs.
|   ├── development/ - Documentation to aid in developing for and with Electron.
|   ├── fiddles/ - A set of code snippets one can run in Electron Fiddle.
|   ├── images/ - Images used in documentation.
|   └── tutorial/ - Tutorial documents for various aspects of Electron.
├── lib/ - JavaScript/TypeScript source code.
|   ├── browser/ - Main process initialization code.
|   |   ├── api/ - API implementation for main process modules.
|   |   └── remote/ - Code related to the remote module as it is
|   |                 used in the main process.
|   ├── common/ - Relating to logic needed by both main and renderer processes.
|   |   └── api/ - API implementation for modules that can be used in
|   |              both the main and renderer processes
|   ├── isolated_renderer/ - Handles creation of isolated renderer processes when
|   |                        contextIsolation is enabled.
|   ├── renderer/ - Renderer process initialization code.
|   |   ├── api/ - API implementation for renderer process modules.
|   |   ├── extension/ - Code related to use of Chrome Extensions
|   |   |                in Electron's renderer process.
|   |   ├── remote/ - Logic that handes use of the remote module in
|   |   |             the main process.
|   |   └── web-view/ - Logic that handles the use of webviews in the
|   |                   renderer process.
|   ├── sandboxed_renderer/ - Logic that handles creation of sandboxed renderer
|   |   |                     processes.
|   |   └── api/ - API implementation for sandboxed renderer processes.
|   └── worker/ - Logic that handles proper functionality of Node.js
|                 environments in Web Workers.
├── patches/ - Patches applied on top of Electron's core dependencies
|   |          in order to handle differences between our use cases and
|   |          default functionality.
|   ├── boringssl/ - Patches applied to Google's fork of OpenSSL, BoringSSL.
|   ├── chromium/ - Patches applied to Chromium.
|   ├── node/ - Patches applied on top of Node.js.
|   └── v8/ - Patches applied on top of Google's V8 engine.
├── shell/ - C++ source code.
|   ├── app/ - Codice di immissione del sistema.
|   ├── browser/ - Il frontend, che include la finestra principale, l'interfaccia utente,  e tutto ciò 
|   |   |         che riguarda il processo principale. Questo parla con il renderer per gestire le pagine web.
|   |   ├── ui/ - Implementazione dell'inrefaccia utente (UI) per le varie piattaforme.
|   |   |   ├── cocoa/ - Codice sorgente specifico di Cocoa.
|   |   |   ├── win/ - Sorgente specifico della GUI di Windows.
|   |   |   └── cocoa/ - Codice sorgente specifico di Cocoa.
|   |   ├── api/ - L'implementazione delle principali API di processo.
|   |   ├── net/ - Codice relativo alla gestione delle funzionalità di rete.
|   |   ├── mac/ - Codice sorgente Objective-C specifico per Mac.
|   |   └── resources/ - Icone, file dipendenti dalla piattaforma, ecc.
|   ├── renderer/ - Codice eseguito dal renderer.
|   |   └── api/ - L'implementazione delle principali API del processo renderer.
└── common/ - Codice usato sia dal processo principale che dal processo renderer,
|       |         incluse alcune funzioni di utilità e parti di codice impiegate per integrare il loop 
|       |         dei messaggi dei nodi nel loop dei messaggi di Chromium.
|       └── api/ - L'implementazione delle API comuni e le foundation dei
|                  moduli base di Electron.
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Regole di compilazione di Electron.
```

## Struttura delle altre cartelle

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - Cartella temporanea creata dallo script `script/create-dist.py` all'atto della creazione di una distribuzione.
* **external_binaries** - Codice binario di framework di terze parti che non è possibile compilare con `gn`.
* **node_modules** - Moduli di terze parti usati per la compilazione.
* **npm** - Logic for installation of Electron via npm.
* **out** - Directory temporanea di output di `ninja`.
* **script** - Script usati per finalità di sviluppo come compilazione, assemblaggio dei pacchetti, testing, ecc.
```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```
* **tools** - Helper scripts used by GN files.
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

## Mantenere aggiornate le dipendenze dei moduli in Git

Il repository di Electron dipende anche da software di terze parti, che è possibile trovare nella cartella [/vendor](https://github.com/electron/electron/tree/master/vendor). In alcuni casi potreste vedere un messaggio come questo in risposta all'esecuzione di `git status`:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

Per aggiornare queste dipendenze eseguite il seguente comando:

```sh
git submodule update --init --recursive
```

Se vi accorgete di eseguire il comando molto spesso, potete creare un alias nel vostro file `~/.gitconfig`:

```sh
[alias]
    su = submodule update --init --recursive
```
