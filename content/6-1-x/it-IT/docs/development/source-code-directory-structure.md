# Struttura della cartella del codice sorgente

Il codice sorgente di Electron è suddiviso in più blocchi, per lo più adottando le medesime convenzioni di Chromium sulla struttura del repository del sorgente.

Ti potrebbe essere richiesta una maggiore conoscenza dell'architettura multi-processo di Chromium per una migliore comprensione del codice sorgente.

## Struttura del codice sorgente

```diff
Electron
├── atom/ - Codice sorgente C++.
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
├── chromium_src/ - Codice sorgente preso da Chromium. Vedi sotto.
├── default_app/ - La pagina predefinita da visualizzare quando Electron viene avviato senza
|                  indicare un'applicazione.
├── docs/ - Documentazione.
├── lib/ - Codice sorgente JavaScript.
|   ├── browser/ - Codice Javascript per l'inizializzazione del processo principale.
|   |   └── api/ - Implementazione API Javascript.
|   ├── common/ - JavaScript utilizzato sia dai processi principali che dal renderer
|   |   └── api/ - implementazione API Javascript.
|   └── renderer/ - Codice Javascript per l'inizializzazione del processo del renderer.
|       └── api/ - Implementazione API Javascript.
├── native_mate/ - Una fork della libreria gin di Chromium per facilitare il marshaling dei tipi 
|                  tra C++ e JavaScript.
├── spec/ - Test automatizzati.
└── BUILD.gn - Regole di compilazione di Electron.
```

## `/chromium_src`

I file in `/chromium_src` sono di solito parti di Chromium che non appartengono al livello dei contenuti. Per esempio, nell'implementazione delle Pepper API abbiamo bisogno di connessioni implementate in maniera del tutto simile a quella adottata dalla distribuzione ufficiale di Chrome. Avremmo potuto compilare le parti più importanti dei sorgenti includendole in [libcc](../glossary.md#libchromiumcontent) ma molto spesso non abbiamo bisogno di tutte le funzionalità (alcune in effetti sembrano codice proprietario, con funzioni di analisi statistica), così abbiamo preso solo alcune parti del codice. Queste avrebbero potuto essere implementate come patch di libcc, ma quando furono scritte uno degli obiettivi principali di libcc era di avere patch di dimensioni molto ridotte, mentre i cambiamenti apportati a chromium_src sono di solito importanti. Inoltre le patch non sarebbero mai entrate a far parte della distribuzione principale, a differenza delle altre patch di libcc che manteniamo abitualmente.

## Struttura delle altre cartelle

* **script** - Script usati per finalità di sviluppo come compilazione, assemblaggio dei pacchetti, testing, ecc.
* **strumenti** - Script di Helper utilizzati dai file GN, a differenza di `script`, gli script inseriti qui non dovrebbero mai essere invocati direttamente dagli utenti.
* **vendor** - Codice sorgente di dipendenze di terze parti, non abbiamo utilizzato `third_party` come nome perché confonderebbe la stessa directory nell'albero di codice sorgente di Chromium.
* **node_modules** - Moduli di terze parti usati per la compilazione.
* **out** - Directory temporanea di output di `ninja`.
* **dist** - Cartella temporanea creata dallo script `script/create-dist.py` all'atto della creazione di una distribuzione.
* **external_binaries** - Codice binario di framework di terze parti che non è possibile compilare con `gn`.

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
