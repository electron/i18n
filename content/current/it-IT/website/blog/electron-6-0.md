---
title: Electron 6.0.0
author:
  - sofianguy
  - ckerr
  - codebytere
date: '2019-07-30'
---

Il team Electron è entusiasta di annunciare il rilascio di Electron 6.0.0! Puoi installarlo con npm via `npm install electron@latest` o scaricarlo dal nostro sito [releases](https://electronjs.org/releases/stable). Il rilascio è ricco di aggiornamenti, correzioni e nuove funzionalità. Non vediamo l'ora di vedere cosa costruisci con loro! Continua a leggere per dettagli su questa release, e per favore condividi qualsiasi feedback che hai!

---

## Novità

Oggi segna un primo per il progetto Electron: questa è la prima volta che abbiamo realizzato una versione stabile di Electron **lo stesso giorno** come la corrispondente [versione stabile di Chrome](https://www.chromestatus.com/features/schedule)! 🎉

Gran parte della funzionalità di Electron's è fornita dai componenti principali di Chromium, Node.js, e V8. Electron è aggiornato con questi progetti per fornire ai nostri utenti nuove funzionalità JavaScript, miglioramenti delle prestazioni e correzioni di sicurezza. Ognuno di questi pacchetti ha un importante urto di versione in Electron 6:

- Cromo `76.0.3809.88`
  - [Nuovo in 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Nuovo in 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Nuovo in 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Nodo 12.4.0 blog post](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 post sul blog](https://v8.dev/blog/v8-release-76)

Questa versione include anche miglioramenti alle API di Electron. [Le note di rilascio](https://github.com/electron/electron/releases/tag/v6.0.0) hanno una lista più completa, ma ecco le evidenziazioni:

### Promisification

Electron 6.0 continua l'iniziativa [di modernizzazione](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) avviata in 5.0 per migliorare il supporto [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Queste funzioni ora restituiscono Promesse e supportano ancora vecchie invocazioni basate su callback:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Queste funzioni ora hanno due forme, sincrone e promessa asincrona:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Queste funzioni ora restituiscono Promesse:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Rendererer).app`, `Electron Helper (GPU).app` e `Electron Helper (Plugin).app`

Al fine di abilitare il [runtime indurito](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), che limita cose come memoria scrivibile eseguibile e codice di caricamento firmato da un altro Team ID, i diritti alla firma di un codice speciale devono essere concessi all’aiutante.

Per mantenere questi diritti campo di applicazione ai tipi di processo che li richiedono, Cromo [ha aggiunto](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) tre nuove varianti dell'app Helper: una per i renderer (`Electron Helper (Rendererer). pp`), uno per il processo GPU (`Electron Helper (GPU). pp`) e uno per i plugin (`Electron Helper (Plugin).app`).

Le persone che usano `electron-osx-sign` per coprogettare la loro app Electron non dovrebbero dover apportare modifiche alla loro logica di costruzione. Se stai coprogettando la tua app con script personalizzati, dovresti assicurarti che le tre nuove applicazioni Helper siano correttamente codificate.

Per imballare correttamente la tua applicazione con questi nuovi aiutanti devi usare `electron-packager@14.0.4` o superiore.  Se stai usando `electron-builder` dovresti seguire [questo problema](https://github.com/electron-userland/electron-builder/issues/4104) per tracciare il supporto per questi nuovi aiutanti.

## Breaking Changes

 * Questa release inizia a creare le premesse per un futuro requisito che i moduli nativi Nodo caricati nel processo di renderer siano [N-API](https://nodejs.org/api/n-api.html) o [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Le ragioni di questo cambiamento sono prestazioni più veloci, maggiore sicurezza e ridotto carico di lavoro di manutenzione. Leggi tutti i dettagli includendo la timeline proposta in [questo numero](https://github.com/electron/electron/issues/18397). Questa modifica dovrebbe essere completata in Electron v11.

 * `net.IncomingMessage` le intestazioni sono [cambiate leggermente](https://github.com/electron/electron/pull/17517#issue-263752903) per corrispondere più strettamente [Node. s behavior](https://nodejs.org/api/http.html#http_message_headers), in particolare con il valore di `set-cookie` e come vengono gestite le intestazioni duplicate. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` ora restituisce vuoto ed è una chiamata asincrona. [#17121](https://github.com/electron/electron/pull/17121)

 * Le app devono ora impostare esplicitamente un percorso di log chiamando la nuova funzione `app.setAppLogPath()` prima di usare `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Fine del supporto per 3.x.y

Per la nostra politica di supporto [](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y ha raggiunto la fine della vita. Sviluppatori e applicazioni sono incoraggiati ad aggiornare ad una nuova versione di Electron.

## Programma Feedback App

Continuiamo a utilizzare il nostro [App Feedback Program](https://electronjs.org/blog/app-feedback-program) per il test. I progetti che partecipano a questo programma testano le betas di Electron sulle loro app; e in cambio, i nuovi bug che trovano sono prioritari per il rilascio stabile. Se vuoi partecipare o saperne di più, [dai un'occhiata al nostro post sul nostro blog sul programma](https://electronjs.org/blog/app-feedback-program).

## Cosa È Successivo

A breve termine, ci si può aspettare che il team continui a concentrarsi sul tenere il passo con lo sviluppo dei principali componenti che compongono Electron, inclusi Cromo, Nodo e V8. Anche se siamo attenti a non fare promesse sulle date di rilascio, il nostro piano è il rilascio di nuove principali versioni di Electron con le nuove versioni di quei componenti circa trimestralmente. Il programma [tentativo 7.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mostra le date chiave nel ciclo di vita di sviluppo di Electron 7. Inoltre, [consulta il nostro documento di versionamento](https://electronjs.org/docs/tutorial/electron-versioning) per informazioni più dettagliate sul versionamento in Electron.

Per informazioni sui cambiamenti di rottura pianificati nelle prossime versioni di Electron, [consulta il nostro documento sui cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
