---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Il team di Electron è entusiasta di annunciare che la prima versione stabile di Electron 3 è ora disponibile da [electronjs. rg](https://electronjs.org/) e via `npm install electron@latest`! È ricco di aggiornamenti, correzioni e nuove funzionalità, e non vediamo l'ora di vedere cosa si costruisce con loro. Di seguito sono riportati i dettagli di questa release, e accogliamo con favore il tuo feedback come esplori.

---

## Processo Di Rilascio

Come abbiamo intrapreso lo sviluppo di `v3.0.`, abbiamo cercato di definire più empiricamente i criteri per un rilascio stabile formalizzando i progressi di feedback per i rilasci beta progressivi. `v3.0.` non sarebbe stato possibile senza il nostro [Programma di Feedback App](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) partner, che hanno fornito test e feedback precoci durante il ciclo beta. Grazie a Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code e altri membri del programma per il loro lavoro. Se desideri partecipare a future betas, scrivici a [info@electronjs.org](mailto:info@electronjs.org).

## Modifiche / Nuove Funzionalità

Principali dossi per diverse parti importanti della toolchain di Electron, tra cui Chrome `v66.0.3359.181`, Nodo `v10.2.0`, e V8 `v6.6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] funziona: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] funziona: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] caratteristica: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] caratteristica: `win.moveTop()` per spostare la finestra z-order verso l'alto
* [[#13110](https://github.com/electron/electron/pull/13110)] funziona: TextField e Pulsanti API
* [[#13068](https://github.com/electron/electron/pull/13068)] caratteristica: netLog API per il controllo della registrazione dinamica
* funzione [[#13539](https://github.com/electron/electron/pull/13539)]: abilita `webview` nel renderer sandbox
* [[#14118](https://github.com/electron/electron/pull/14118)] caratteristica: `fs.readSync` ora funziona con file massicci
* [[#14031](https://github.com/electron/electron/pull/14031)] caratteristica: node `fs` wrappers to make `fs.realpathSync.native` and `fs.realpath.native` available

## Interruzione delle modifiche API

* [[#12362](https://github.com/electron/electron/pull/12362)] caratteristica: aggiorna il controllo dell'ordine delle voci di menu
* [[#13050](https://github.com/electron/electron/pull/13050)] refactor: rimossa API documentate deprecate
  * Vedi [documenti](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) per maggiori dettagli
* [[#12477](https://github.com/electron/electron/pull/12477)] refactor: removed `did-get-response-details` and `did-get-redirect-request` events
* [[#12655](https://github.com/electron/electron/pull/12655)] caratteristica: impostazione predefinita per disabilitare la navigazione sul drag/drop
* [[#12993](https://github.com/electron/electron/pull/12993)] caratteristica: Nodo `v4.x` o superiore è necessario utilizzare il modulo `electron` npm
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refactor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] caratteristica: non utilizzare più JSON per inviare il risultato di `ipcRenderer.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] caratteristica: predefinito ignorare gli argomenti della riga di comando seguendo un URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refactor: rename `api::Window` to `api::BrowserWindow`
* funzione [[#12679](https://github.com/electron/electron/pull/12679)]: zoom visivo ora disattivato per impostazione predefinita
* [[#12408](https://github.com/electron/electron/pull/12408)] refactor: rename app-command `media-play_pause` to `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] caratteristica: supporto notifiche workspace
* [[#12496](https://github.com/electron/electron/pull/12496)] caratteristica: `tray.setIgnoreDoubleClickEvents(ignorare)` per ignorare gli eventi del doppio clic nel vassoio.
* [[#12281](https://github.com/electron/electron/pull/12281)] caratteristica: funzionalità di inoltro del mouse su macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] caratteristica: blocco schermo / sblocco eventi

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] funziona: aggiunto DIP a/da conversioni coordinate schermo

**Nota Bene:** Passare a una versione precedente di Electron dopo aver eseguito questa versione richiederà di cancellare la directory dei dati utente per evitare il crash delle versioni precedenti. È possibile ottenere la directory dei dati utente eseguendo `console.log(app.getPath("userData"))` o vedere [docs](https://electronjs.org/docs/api/app#appgetpathname) per maggiori dettagli.

## Correzioni Bug

* [[#13397](https://github.com/electron/electron/pull/13397)] risolvere: problema con `fs.statSyncNoException` che lancia eccezioni
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] correzione: crash durante il caricamento del sito con jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] correzione: crash in `net::ClientSocketHandle` destructor
* [[#14453](https://github.com/electron/electron/pull/14453)] fix: notifica subito il cambiamento del focus piuttosto che il prossimo tick

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] risolvere: problema che consente di selezionare i pacchetti nella finestra di dialogo `<input file="type">` apri file
* [[#12404](https://github.com/electron/electron/pull/12404)] risolvere: problema di blocco del processo principale quando si utilizza la finestra di dialogo async
* [[#12043](https://github.com/electron/electron/pull/12043)] correzione: menu contestuale clicca callback
* [[#12527](https://github.com/electron/electron/pull/12527)] correzione: perdite evento sul riutilizzo dell'elemento touchbar
* [[#12352](https://github.com/electron/electron/pull/12352)] correzione: crash del titolo del vassoio
* [[#12327](https://github.com/electron/electron/pull/12327)] riparazione: regioni non trascinabili
* [[#12809](https://github.com/electron/electron/pull/12809)] correzione: per evitare l'aggiornamento del menu mentre è aperto
* [[#13162](https://github.com/electron/electron/pull/13162)] fix: limiti dell'icona del vassoio che non consentono valori negativi
* [[#13085](https://github.com/electron/electron/pull/13085)] correzione: il titolo del vassoio non si inverte quando evidenziato
* [[#12196](https://github.com/electron/electron/pull/12196)] correzione: Mac build when `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] risolvere: problemi aggiuntivi su finestre senza cornice con vibranza
* [[#13326](https://github.com/electron/electron/pull/13326)] fix: impostare il protocollo mac a nessuno dopo aver richiamato `app.removeAsDefaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] corretto: utilizzo non corretto delle API private nella build MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] correzione: `tray.setContextMenu` crash
* [[#14205](https://github.com/electron/electron/pull/14205)] correzione: la pressione di escape su una finestra di dialogo ora la chiude anche se `defaultId` è impostato

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] correzione: `BrowserWindow.focus()` per le finestre fuori schermo

## Altre Note

* PDF Viewer attualmente non funziona, ma è in fase di lavoro e sarà funzionante ancora una volta presto
* Le API `TextField` e `Button` sono sperimentali e sono quindi disattivate per impostazione predefinita
  * Possono essere abilitati con il `enable_view_api` build flag

# Cosa È Successivo

Il team di Electron continua a lavorare per definire i nostri processi per aggiornamenti più rapidi e fluidi mentre cerchiamo di mantenere la parità con le cadenze di sviluppo di Chromium, Nodo e V8.
