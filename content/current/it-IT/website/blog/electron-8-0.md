---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 è stato rilasciato! Include aggiornamenti a Chromium `80`, V8 `8.0`, e Node.js `12.13.0`. Abbiamo aggiunto il correttore integrato di Chrome e molto altro ancora!

---

Il team Electron è entusiasta di annunciare il rilascio di Electron 8.0.0! Puoi installarlo con npm via `npm install electron@latest` o scaricarlo dal nostro sito [releases](https://electronjs.org/releases/stable). Il rilascio è ricco di aggiornamenti, correzioni e nuove funzionalità. Non vediamo l'ora di vedere cosa costruisci con loro! Continua a leggere per dettagli su questa release, e per favore condividi qualsiasi feedback che hai!

## Modifiche Importanti

### Modifiche Pila
* Cromo `80.0.3987.86`
    * [Nuovo in Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Nuovo in Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Nodo 12.13.0 blog post](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 post sul blog](https://v8.dev/blog/v8-release-79)
    * [V8 8.0 blog post](https://v8.dev/blog/v8-release-80)

### Evidenzia Caratteristiche
* Uso implementato della funzione correttore ortografico integrata di Chrome. Vedi maggiori dettagli in [#20692](https://github.com/electron/electron/pull/20692) e [#21266](https://github.com/electron/electron/pull/21266).
* La comunicazione IPC ora utilizza l'algoritmo di clone strutturato di v8. Questo è più veloce, più funzionale, e meno sorprendente della logica esistente, e porta a una spinta di prestazioni 2x per grandi respingenti e oggetti complessi. La latenza per piccoli messaggi non è influenzata in modo significativo. Vedi maggiori dettagli in [#20214](https://github.com/electron/electron/pull/20214).

Vedere le [note di rilascio 8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) per un elenco completo di nuove funzionalità e modifiche.

## Breaking Changes

* Mostra il nome del modulo nell'avviso di deprecazione per i moduli consapevoli del contesto. [#21952](https://github.com/electron/electron/pull/21952)
    * Questo lavoro è continuato per un futuro requisito che i moduli Node nativi caricati nel processo di renderer siano [N-API](https://nodejs.org/api/n-api.html) o [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Informazioni complete e la timeline proposta è dettagliata in [questo numero](https://github.com/electron/electron/issues/18397).
* I valori inviati tramite IPC sono ora serializzati con l'algoritmo di clone strutturato.  [#20214](https://github.com/electron/electron/pull/20214)
* Il rendering fuori schermo è attualmente disabilitato a causa della mancanza di un manutentore per lavorare su questa funzione.  Si è rotto durante l'aggiornamento Chromium e successivamente è stato disabilitato. [#20772](https://github.com/electron/electron/issues/20772)

Maggiori informazioni su questi e cambiamenti futuri possono essere trovate nella pagina [Cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Modifiche API
* `app` modifiche API:
    * Aggiunto `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Aggiunto il supporto `app.showAboutPanel()` e `app.setAboutPanelOptions(options)` su Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` API changes:
    * Documenti aggiornati per notare che le opzioni BrowserWindow `hasShadow` sono disponibili su tutte le piattaforme [#20038](https://github.com/electron/electron/pull/20038)
    * Aggiunta l'opzione `trafficLightPosition` alle opzioni BrowserWindow per consentire il posizionamento personalizzato per i pulsanti semafori. [#21781](https://github.com/electron/electron/pull/21781)
    * Aggiunta l'opzione `accessibileTitle` a BrowserWindow per impostare il titolo della finestra accessibile [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` ora può restituire null [#19983](https://github.com/electron/electron/pull/19983)
    * Aggiunto `BrowserWindow.getMediaSourceId()` e `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Aggiunto il supporto per l'evento `will move` su macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Documentato precedentemente non documentato `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `dialog` API changes:
    * Aggiunta la proprietà `dontAddToRecent` a `dialog.showOpenDialog` e `dialogo. howOpenDialogSync` per evitare che i documenti vengano aggiunti ai documenti recenti su Windows nelle finestre di dialogo aperte. [#19669](https://github.com/electron/electron/pull/19669)
    * Aggiunta la personalizzazione delle proprietà a `dialog.showSaveDialog` e `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Notifica` modifiche API:
    * Aggiunta l'opzione `timeoutType` per consentire agli utenti Linux/Windows di impostare il tipo di timeout di notifica. [#20153](https://github.com/electron/electron/pull/20153)
    * Aggiunta l'opzione `urgenza`  per impostare l'urgenza sulle notifiche Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `session` API changes:
    * Documentazione aggiornata su `session.setProxy(config)` e `session.setCertificateVerifyProc(proc)` per notare le opzioni opzionali. [#19604](https://github.com/electron/electron/pull/19604)
    * Aggiunto `session.downloadURL(url)` per consentire l'attivazione di download senza BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Aggiunto il supporto per i suggerimenti delle risorse HTTP preconnect tramite `session.preconnect(options)` e l'evento `preconnect`. [#18671](http://github.com/electron/electron/pull/18671)
    * Aggiunto `session.addWordToSpellCheckerDictionary` per consentire parole personalizzate nel dizionario [#21297](http://github.com/electron/electron/pull/21297)
* Aggiunta l'opzione a `shell.moveItemToTrash(fullPath[, deleteOnFail])` su macOS per specificare cosa succede quando spostaItemToTrash fallisce. [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` API changes:
    * Aggiornamento `systemPreferences.getColor(color)` documentazione per macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * Aggiunto `screen` media type a `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Aggiunto `nativeTheme.themeSource` per consentire alle applicazioni di sovrascrivere Chromium e la scelta del tema del sistema operativo. [#19960](https://github.com/electron/electron/pull/19960)
* Modifiche API TouchBar:
    * Aggiunta la proprietà `accessibilityLabel` a `TouchBarButton` e `TouchBarLabel` per migliorare l'accessibilità TouchBarButton/TouchBarLabel. [#20454](https://github.com/electron/electron/pull/20454)
    * Documentazione aggiornata di TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `vassoio` modifiche API:
    * Aggiunte nuove opzioni a `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` e `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Aggiunto tray.removeBalloon(), che rimuove una notifica di palloncino già visualizzato. [#19547](https://github.com/electron/electron/pull/19547)
    * Aggiunto tray.focus(), che restituisce il focus nell'area di notifica della barra delle applicazioni. feat: add tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContents` API changes:
    * Aggiunto `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` per esporre executeJavaScriptInIsolatedWorld sull'API dei contenuti web. [#21190](https://github.com/electron/electron/pull/21190)
    * Metodi aggiunti per catturare un contenuto web nascosto. [#21679](https://github.com/electron/electron/pull/21679)
    * Aggiunte opzioni a `webContents.print([options], [callback])` per abilitare la personalizzazione delle intestazioni e dei piè di pagina di stampa. [#19688](https://github.com/electron/electron/pull/19688)
    * Aggiunta la possibilità di ispezionare specifici lavoratori condivisi tramite `webContents.getAllSharedWorkers()` e `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Aggiunto il supporto delle opzioni `fitToPageEnabled` e `scaleFactor` in WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* La documentazione aggiornata `webview.printToPDF` per indicare il tipo di ritorno è ora Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### API Deprecate
Le seguenti API sono ora deprecate:
* Deprecato l'opzione non funzionale `visibleOnFullScreen` all'interno di `BrowserWindow.setVisibleOnAllWorkspace` prima della sua rimozione nella prossima versione principale di rilascio. [#21732](https://github.com/electron/electron/pull/21732)
* Deprecato `alternate-selected-control-text` su `systemPreferences.getColor(color)` per macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Deprecato `setLayoutZoomLevelLimits` on `webContents`, `webFrame`, and `<webview> Tag` perché Chromium ha rimosso questa capacità. [#21296](https://github.com/electron/electron/pull/21296)
* Il valore predefinito di `false` per `app.allowRendererProcessReuse` è ora deprecato. [#21287](https://github.com/electron/electron/pull/21287)
* Deprecato `<webview>.getWebContents()` in quanto dipende dal modulo remoto. [#20726](https://github.com/electron/electron/pull/20726)

## Fine del supporto per 5.x.y

Electron 5.x.y ha raggiunto la fine del supporto secondo la politica di supporto [del progetto](https://electronjs.org/docs/tutorial/support#supported-versions). Sviluppatori e applicazioni sono incoraggiati ad aggiornare ad una nuova versione di Electron.

## Programma Feedback App

Continuiamo a utilizzare il nostro [App Feedback Program](https://electronjs.org/blog/app-feedback-program) per il test. I progetti che partecipano a questo programma testano le betas di Electron sulle loro app; e in cambio, i nuovi bug che trovano sono prioritari per il rilascio stabile. Se vuoi partecipare o saperne di più, [dai un'occhiata al nostro post sul nostro blog sul programma](https://electronjs.org/blog/app-feedback-program).

## Cosa È Successivo

A breve termine, ci si può aspettare che il team continui a concentrarsi sul tenere il passo con lo sviluppo dei principali componenti che compongono Electron, inclusi Cromo, Nodo e V8. Anche se siamo attenti a non fare promesse sulle date di rilascio, il nostro piano è il rilascio di nuove principali versioni di Electron con le nuove versioni di quei componenti circa trimestralmente. Il programma [tentativo 9.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mostra le date chiave nel ciclo di vita di sviluppo di Electron 9. Inoltre, [consulta il nostro documento di versionamento](https://electronjs.org/docs/tutorial/electron-versioning) per informazioni più dettagliate sul versionamento in Electron.

Per informazioni sui cambiamenti di rottura pianificati nelle prossime versioni di Electron, [consulta il nostro documento sui cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Deprecation of `remote` Module (starting in Electron 9)
A causa di gravi responsabilità in materia di sicurezza, stiamo iniziando a deprecare il modulo [`remoto`](https://www.electronjs.org/docs/api/remote) che inizia in Electron 9. Puoi leggere e seguire [questo problema](https://github.com/electron/electron/issues/21408) che illustra le nostre ragioni e include una linea temporale proposta per la deprecazione.
