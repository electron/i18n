---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 è stato rilasciato! Include aggiornamenti a Chromium `83`, V8 `8.3`, e Node.js `12.14`. Abbiamo aggiunto diverse nuove integrazioni API per la nostra funzione di correttore ortografico, visualizzatore PDF abilitato e molto altro!

---

Il team Electron è entusiasta di annunciare il rilascio di Electron 9.0.0! Puoi installarlo con npm via `npm install electron@latest` o scaricarlo dal nostro sito [releases](https://electronjs.org/releases/stable). Il rilascio è ricco di aggiornamenti, correzioni e nuove funzionalità. Non vediamo l'ora di vedere cosa costruisci con loro! Continua a leggere per dettagli su questa release, e per favore condividi qualsiasi feedback che hai!

## Modifiche Importanti

### Modifiche Pila

* Cromo `83.0.4103.64`
    * [Novità in Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 è stato saltato](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Novità in Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Nodo 12.14.1 blog post](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [V8 8.1 blog post](https://v8.dev/blog/v8-release-81)
    * [V8 8.3 post sul blog](https://v8.dev/blog/v8-release-83)

### Evidenzia Caratteristiche

* Miglioramenti multipli alla funzione correttore ortografico. Vedi maggiori dettagli in [#22128](https://github.com/electron/electron/pull/22128) e [#22368](https://github.com/electron/electron/pull/22368).
* Migliorata efficienza del gestore di eventi finestra su Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Abilita visualizzatore PDF. [#22131](https://github.com/electron/electron/pull/22131).

Vedere le [note di rilascio 9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0) per un elenco completo di nuove funzionalità e modifiche.

## Breaking Changes

* Avviso di deprecazione quando si utilizza `remote` senza `enableRemoteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * Questo è il primo passo dei nostri piani per deprecare il modulo `remoto` e spostarlo nell'userland. Puoi leggere e seguire [questo problema](https://github.com/electron/electron/issues/21408) che illustra le nostre ragioni e include una linea temporale proposta per la deprecazione.
* Imposta `app.enableRenderererProcessReuse` a true per impostazione predefinita. [#22336](https://github.com/electron/electron/pull/22336)
    * Questo lavoro è continuato per un futuro requisito che i moduli Node nativi caricati nel processo di renderer siano [N-API](https://nodejs.org/api/n-api.html) o [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Informazioni complete e la timeline proposta è dettagliata in [questo numero](https://github.com/electron/electron/issues/18397).
* L'invio di oggetti non-JavaScript su IPC ora lancia un'eccezione. [#21560](https://github.com/electron/electron/pull/21560)
    * Questo comportamento è stato deprezzato in Electron 8.0. In Electron 9.0, il vecchio algoritmo di serializzazione è stato rimosso, e l'invio di tali oggetti non serializzabili lancerà un errore "object could not be cloned".

Maggiori informazioni su questi e cambiamenti futuri possono essere trovate nella pagina [Cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Modifiche API

* `shell` modifiche API:
   * L'API `shell.openItem` è stata sostituita con un'API asincrona `shell.openPath`. [proposta](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `session`API changes:
   * Aggiunto l'API `session.listWordsFromSpellCheckerDictionary` per elencare le parole personalizzate nel dizionario. [#22128](https://github.com/electron/electron/pull/22128)
   * Aggiunto `session.removeWordFromSpellCheckerDictionary` API per rimuovere parole personalizzate nel dizionario. [#22368](https://github.com/electron/electron/pull/22368)
   * Aggiunto l'API `session.serviceWorkerContext` per accedere alle informazioni di base dei lavoratori del servizio e ricevere i log della console dai lavoratori del servizio. [#22313](https://github.com/electron/electron/pull/22313)
* `app` modifiche API:
   * Aggiunto un nuovo parametro di forza a `app.focus()` su macOS per consentire alle applicazioni di prendere con forza il fuoco. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` API changes:
   * Aggiunto il supporto per l'accesso delle proprietà ad alcune coppie di getter/setter su `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### API Deprecate

Le seguenti API sono ora deprecate o rimosse:

* `shell.openItem` API è ora deprezzato, e sostituito con un asincrono `shell.openPath API`.
* `<webview>.getWebContents`, che è stato deprecato in Electron 8.0, è ora rimosso.
* `webFrame.setLayoutZoomLevelLimits`, che è stato deprecato in Electron 8.0, è ora rimosso.

## Fine del supporto per 6.x.y

Electron 6.x.y ha raggiunto la fine del supporto secondo la politica di supporto [del progetto](https://electronjs.org/docs/tutorial/support#supported-versions). Sviluppatori e applicazioni sono incoraggiati ad aggiornare ad una nuova versione di Electron.

## Cosa È Successivo

A breve termine, ci si può aspettare che il team continui a concentrarsi sul tenere il passo con lo sviluppo dei principali componenti che compongono Electron, inclusi Cromo, Nodo e V8. Anche se siamo attenti a non fare promesse sulle date di rilascio, il nostro piano è il rilascio di nuove principali versioni di Electron con le nuove versioni di quei componenti circa trimestralmente. Il programma [tentativo 10.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mostra le date chiave nel ciclo di vita di sviluppo di Electron 10.0. Inoltre, [consulta il nostro documento di versionamento](https://electronjs.org/docs/tutorial/electron-versioning) per informazioni più dettagliate sul versionamento in Electron.

Per informazioni sui cambiamenti di rottura pianificati nelle prossime versioni di Electron, [consulta il nostro documento sui cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Cambia il valore predefinito di `contextIsolation` da `false` a `true` (A partire da Electron 10)

Senza contestoIsolamento, qualsiasi codice in esecuzione in un processo di renderer può facilmente raggiungere gli interni di Electron o lo script di preload di un'app. Tale codice può quindi eseguire azioni privilegiate che Electron vuole mantenere limitate.

La modifica di questo valore predefinito migliora la sicurezza predefinita delle applicazioni Electron, in modo che le applicazioni dovranno deliberatamente optare per il comportamento insicuro. Electron deprezzerà l'attuale default di `contextIsolation` in Electron 10. , e passare al nuovo default (`true`) in Electron 12.0.

Per ulteriori informazioni su `contextIsolation`, come abilitarlo facilmente e i suoi vantaggi per la sicurezza si prega di vedere il nostro [Context Isolation Document dedicato](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
