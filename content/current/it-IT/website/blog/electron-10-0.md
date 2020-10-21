---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 è stato rilasciato! Include aggiornamenti a Chromium `85`, V8 `8.5`, e Node.js `12.16`. Abbiamo aggiunto diverse nuove integrazioni e miglioramenti delle API. Leggi di seguito per maggiori dettagli!

---

Il team Electron è entusiasta di annunciare il rilascio di Electron 10.0.0! Puoi installarlo con npm via `npm install electron@latest` o scaricarlo dal nostro sito [releases](https://electronjs.org/releases/stable). Il rilascio è ricco di aggiornamenti, correzioni e nuove funzionalità.

Nella release di Electron 10 abbiamo anche apportato una modifica alle nostre note di rilascio. Per rendere più facile raccontare cosa c'è di nuovo in Electron 10 e cosa potrebbe essere cambiato tra Electron 10 e le versioni passate, ora includiamo anche i cambiamenti che sono stati introdotti a Electron 10, ma backportati a versioni precedenti. Speriamo che questo renda più facile alle app trovare nuove funzionalità e correzioni di bug durante l'aggiornamento di Electron.

Non vediamo l'ora di vedere cosa costruisci con loro! Continua a leggere per dettagli su questa release, e per favore condividi qualsiasi feedback che hai!

## Modifiche Importanti

### Modifiche Pila

* Cromo `85,0.4183,84`
    * [Novità in Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Novità in Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Nodo 12.16.3 blog post](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 8.4 post sul blog](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 post sul blog](https://v8.dev/blog/v8-release-85)

### Evidenzia Caratteristiche

* Aggiunta la proprietà `contents.getBackgroundThrottling()` e `contents.backgroundThrottling`. [#21036]
* Esposta il modulo `desktopCapturer` nel processo principale. [#23548](https://github.com/electron/electron/pull/23548)
* Ora puoi controllare se una data `sessione` è persistente chiamando l'API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Risolvere i problemi di rete che hanno impedito la connessione delle chiamate RTC a causa di cambiamenti di indirizzo IP di rete e ICE. (Questione del cromo 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Vedere le [note di rilascio 10.0.0](https://github.com/electron/electron/releases/tag/v10.0.0) per un elenco completo di nuove funzionalità e modifiche.

## Breaking Changes

* Cambiato il valore predefinito di `enableRemoteModule` in `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Questo fa parte dei nostri piani per deprecare il modulo `remoto` e spostarlo nel userland. Puoi leggere e seguire [questo problema](https://github.com/electron/electron/issues/21408) che illustra le nostre ragioni e include una linea temporale proposta per la deprecazione.
* Cambiato il valore predefinito di `app.allowRendererProcessReuse` a `true`. [#22336](https://github.com/electron/electron/pull/22336) (anche in [Electron 9](https://github.com/electron/electron/pull/22401))
   * Questo impedirà il caricamento di moduli nativi non consapevoli del contesto nei processi di renderer.
   * Puoi leggere e seguire [questo problema](https://github.com/electron/electron/issues/18397) che illustra le nostre ragioni e include una linea temporale proposta per la deprecazione.
* Corretto il posizionamento dei pulsanti finestra su macOS quando il locale OS è impostato su una lingua RTL (come arabo o o ebraico). Le applicazioni di finestre senza frame potrebbero dover tenere conto di questa modifica durante lo stile delle loro finestre. [#22016](https://github.com/electron/electron/pull/22016)

Maggiori informazioni su questi e cambiamenti futuri possono essere trovate nella pagina [Cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Modifiche API

* Sessione: Ora può controllare se una data `sessione` è persistente chiamando l'API `ses.isPersistent()`. [#22622](https://github.com/electron/electron/pull/22622)
* Contenuto: Aggiunto `contents.getBackgroundThrottling()` method and `contents.backgroundThrottling` property. [#21036](https://github.com/electron/electron/pull/21036)

### API Deprecate

Le seguenti API sono ora deprecate o rimosse:

* Rimosso la proprietà deprecata `currentlyLoggingPath` di `netLog`. Inoltre, `netLog.stopLogging` non restituisce più il percorso al registro registrato. [#22732](https://github.com/electron/electron/pull/22732)
* Upload non compresso deprecato in `crashReporter`. [#23598](https://github.com/electron/electron/pull/23598)

## Fine del supporto per 7.x.y

Electron 7.x.y ha raggiunto la fine del supporto secondo la politica di supporto [del progetto](https://electronjs.org/docs/tutorial/support#supported-versions). Sviluppatori e applicazioni sono incoraggiati ad aggiornare ad una nuova versione di Electron.

## Cosa È Successivo

A breve termine, ci si può aspettare che il team continui a concentrarsi sul tenere il passo con lo sviluppo dei principali componenti che compongono Electron, inclusi Cromo, Nodo e V8. Anche se siamo attenti a non fare promesse sulle date di rilascio, il nostro piano è il rilascio di nuove principali versioni di Electron con le nuove versioni di quei componenti circa trimestralmente. Il programma [tentativo 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mostra le date chiave nel ciclo di vita di sviluppo di Electron 11.0. Inoltre, [consulta il nostro documento di versionamento](https://electronjs.org/docs/tutorial/electron-versioning) per informazioni più dettagliate sul versionamento in Electron.

Per informazioni sui cambiamenti di rottura pianificati nelle prossime versioni di Electron, [consulta il nostro documento sui cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Continuazione del lavoro per la deprecazione del `remoto` Modulo (in Electron 11)
Abbiamo iniziato a lavorare per rimuovere il modulo remoto in [Electron 9](https://www.electronjs.org/blog/electron-9-0) e continuiamo i piani per rimuovere il modulo `remoto`. In Electron 11, abbiamo in programma di continuare a rifare il lavoro per implementare [WeakRef](https://v8.dev/features/weak-references) come abbiamo fatto in Electron 10. Si prega di leggere e seguire [questo problema](https://github.com/electron/electron/issues/21408) per piani e dettagli completi per deprecation.

### Fase finale per la necessità di moduli di nodi nativi per essere Aware Contesto o N-API (in Electron 11)
Da Electron 6 in poi, abbiamo messo a punto i lavori preliminari per richiedere che i moduli nativi [del Nodo](https://nodejs.org/api/addons.html) caricati nel processo di renderer siano [N-API](https://nodejs.org/api/n-api.html) o [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). L'applicazione di questo cambiamento consente una maggiore sicurezza, prestazioni più rapide e un carico di lavoro di manutenzione ridotto. La fase finale di questo piano è quella di rimuovere la possibilità di disabilitare il riutilizzo del processo di rendering in Electron 11. Leggi [questo numero](https://github.com/electron/electron/issues/18397) per tutti i dettagli tra cui la tempistica proposta.
