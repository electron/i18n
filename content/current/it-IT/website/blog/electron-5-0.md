---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Il team Electron è entusiasta di annunciare il rilascio di Electron 5.0.0! Puoi installarlo con npm via `npm install electron@latest` or download the tarballs from [our releases page](https://github.com/electron/electron/releases/tag/v5.0.0). Il rilascio è ricco di aggiornamenti, correzioni e nuove funzionalità. Non vediamo l'ora di vedere cosa costruisci con loro! Continua a leggere per dettagli su questa release, e per favore condividi qualsiasi feedback che hai!

---

## Che Cosa È Nuovo?

Gran parte della funzionalità di Electron's è fornita dai componenti principali di Chromium, Node.js, e V8. Electron è aggiornato con questi progetti per fornire ai nostri utenti nuove funzionalità JavaScript, miglioramenti delle prestazioni e correzioni di sicurezza. Ognuno di questi pacchetti ha un importante urto di versione in Electron 5:

- Cromo `73.0.3683.119`
  - [Nuovo in 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Nuovo in 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Nuovo in 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Nuovo in 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Post Blog Nodo 12](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Nuove Funzionalità JS](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 include anche miglioramenti alle API specifiche per elettroni. Di seguito è riportato un riepilogo delle principali modifiche; per l'elenco completo delle modifiche, controlla le [note di rilascio Electron v5.0.0](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 continua l'iniziativa [Promisification initiative](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) per convertire le API callback di Electron's per utilizzare Promesse. Queste API sono state convertite per Electron 5:
* `app.getFileIcon`
* `contentTracing.getCategories`
* `contentTracing.startRecording`
* `contentTracing.stopRecording`
* `debugger.sendCommand`
* API Cookie
* `shell.openEsterno`
* `webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### Accesso colori di sistema per macOS

Queste funzioni sono state modificate o aggiunte a `systemPreferences` per accedere ai colori dei sistemi macOS:
* `systemPreferences.getAccentColor`
* `systemPreferences.getColor`
* `systemPreferences.getSystemColor`

### Informazioni sul processo di memoria

La funzione `process.getProcessMemoryInfo` è stata aggiunta per ottenere statistiche sull'utilizzo della memoria sul processo corrente.

### Filtro aggiuntivo per API remote

Per migliorare la sicurezza nell'API `remote` , sono stati aggiunti nuovi eventi remoti in modo che `remoto. etBuiltin`, `remoto. etCurrentWindow`, `remote.getCurrentWebContents` and `<webview>.getWebContents` can be [filtered](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Visualizzazioni multiple sul BrowserWindow

Finestra di navigazione ora supporta la gestione di più Visualizzazioni di navigazione all'interno della stessa Finestra di navigazione.

## Breaking Changes

### Predefiniti per le app in pacchetto

Le applicazioni confezionate si comporteranno come l'app predefinita: verrà creato un menu di applicazione predefinito a meno che l'app non ne abbia uno e l'evento `window-all-closed` verrà gestito automaticamente, a meno che l'applicazione non gestisca l'evento.

### Sabbiatura mista

La modalità sandbox mista è ora abilitata per impostazione predefinita. Renderers lanciati con `sandbox: true` ora sarà in realtà sandboxed, dove prima sarebbero solo sandbox se la modalità mixed-sandbox fosse abilitata.

### Miglioramenti della sicurezza
I valori predefiniti di `nodeIntegration` e `webviewTag` sono ora `false` per migliorare la sicurezza.

### Spellchecker ora asincrono

L'API SpellCheck è stata modificata per fornire [risultati asincroni](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Deprecazioni

Le seguenti API sono recentemente deprecate in Electron 5.0.0 e previste per la rimozione in 6.0.0:

### Binari Mksnapshot per braccio e braccio64
I binari nativi di mksnapshot per braccio e braccio64 sono deprecati e saranno rimossi in 6. .0. Le istantanee possono essere create per braccio e braccio64 utilizzando i binari x64.

### ServiceWorker API su Web Contents
Depreated ServiceWorker API su WebContents in preparazione per la loro rimozione.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Moduli automatici con webContent sandbox
Per migliorare la sicurezza, i seguenti moduli sono deprecati per l'uso direttamente tramite `richiedono` e dovranno invece essere inclusi via `remoto. equire` in un contenuto web sandboxed:
* `electron.screen`
* `child_process`
* `fs`
* `os`
* `percorso`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` sono stati deprecati a favore di `webFrame.setIsolatedWorldInfo`.

### Sabbiatura mista
`enableMixedSandbox` e il `--enable-mixed-sandbox` switch da riga di comando esistono ancora per la compatibilità, ma sono deprecati e non hanno effetto.

## Fine del supporto per 2.0.x

Per la nostra politica di versioni [supportate](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x ha raggiunto la fine della vita.

## Programma Feedback App

Continuiamo a utilizzare il nostro [App Feedback Program](https://electronjs.org/blog/app-feedback-program) per il test. I progetti che partecipano a questo programma testano le betas di Electron sulle loro app; e in cambio, i nuovi bug che trovano sono prioritari per il rilascio stabile. Se vuoi partecipare o saperne di più, [dai un'occhiata al nostro post sul nostro blog sul programma](https://electronjs.org/blog/app-feedback-program).

## Cosa È Successivo

A breve termine, ci si può aspettare che il team continui a concentrarsi sul tenere il passo con lo sviluppo dei principali componenti che compongono Electron, inclusi Cromo, Nodo e V8. Anche se siamo attenti a non fare promesse sulle date di rilascio, il nostro piano è il rilascio di nuove principali versioni di Electron con le nuove versioni di quei componenti circa trimestralmente. Il programma [tentativo 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) mostra le date chiave nel ciclo di vita di sviluppo di Electron 6. Inoltre, [consulta il nostro documento di versionamento](https://electronjs.org/docs/tutorial/electron-versioning) per informazioni più dettagliate sul versionamento in Electron.

Per informazioni sui cambiamenti di rottura pianificati nelle prossime versioni di Electron, [consulta il nostro documento sui cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
