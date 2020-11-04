---
title: Electron 7.0.0
author:
  - sofianguy
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 è stato rilasciato! Include aggiornamenti a Cromo 78, V8 7.8, e Node.js 12.8.1. Abbiamo aggiunto una finestra sul rilascio di Arm 64, metodi IPC più veloci, una nuova API `nativeTheme` e molto altro ancora!

---

Il team Electron è entusiasta di annunciare il rilascio di Electron 7.0.0! Puoi installarlo con npm via `npm install electron@latest` o scaricarlo dal nostro sito [releases](https://electronjs.org/releases/stable). Il rilascio è ricco di aggiornamenti, correzioni e nuove funzionalità. Non vediamo l'ora di vedere cosa costruisci con loro! Continua a leggere per dettagli su questa release, e per favore condividi qualsiasi feedback che hai!

## Modifiche Importanti
 * Potenziamenti Pila

   | Pila    | Versione in Electron 6 | Versione in Electron 7 | Novità                                                                                                                                                                                                                                                                    |
   |:------- |:---------------------- |:---------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Cromo   | 76.0.3809.146          | **78.0.3905.1**        | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                    | **7.8**                | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0                 | **12.8.1**             | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Aggiunto Windows su Arm (64 bit) rilascio. [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Aggiunto `ipcRenderer.invoke()` e `ipcMain.handle()` per la richiesta asincrona / response-style IPC. Questi sono fortemente raccomandati sul modulo `remoto`. See this "[Electron’s ‘remote’ module considered harmful](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)" blog post for more information. [#18449](https://github.com/electron/electron/pull/18449)
 * Aggiunto l'API `nativeTheme` per leggere e rispondere ai cambiamenti nel tema e nello schema di colori del sistema operativo. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Passato a un nuovo generatore TypeScript Definitions [](https://github.com/electron/docs-parser). Le definizioni risultanti sono più precise; quindi se la tua build TypeScript fallisce, questa è la causa probabile. [#18103](https://github.com/electron/electron/pull/18103)

Vedere le [note di rilascio 7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0) per un elenco più lungo di modifiche.

## Breaking Changes

Maggiori informazioni su questi e cambiamenti futuri possono essere trovate nella pagina [Cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).

 * API deprecate rimosse:
     * Versioni basate su callback di funzioni che ora utilizzano Promesse. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` non permette più di filtrare le voci della cache cancellate. [#17970](https://github.com/electron/electron/pull/17970)
 * Le interfacce native su macOS (menu, dialoghi, ecc.) ora corrispondono automaticamente all'impostazione della modalità scura sulla macchina dell'utente. [#19226](https://github.com/electron/electron/pull/19226)
 * Aggiornato il modulo `electron` per utilizzare `@electron/get`.  La versione minima del nodo supportato è ora Nodo 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Il file `electron.asar` non esiste più. Tutti gli script di imballaggio che dipendono dalla sua esistenza dovrebbero essere aggiornati. [#18577](https://github.com/electron/electron/pull/18577)

## Fine del supporto per 4.x.y

Electron 4.x.y ha raggiunto la fine del supporto secondo la politica di supporto [del progetto](https://electronjs.org/docs/tutorial/support#supported-versions). Sviluppatori e applicazioni sono incoraggiati ad aggiornare ad una nuova versione di Electron.

## Programma Feedback App

Continuiamo a utilizzare il nostro [App Feedback Program](https://electronjs.org/blog/app-feedback-program) per il test. I progetti che partecipano a questo programma testano le betas di Electron sulle loro applicazioni; e in cambio, i nuovi bug che trovano sono prioritari per il rilascio stabile. Se desideri partecipare o saperne di più, [dai un'occhiata al nostro post sul nostro blog sul programma](https://electronjs.org/blog/app-feedback-program).

## Cosa È Successivo

A breve termine, ci si può aspettare che il team continui a concentrarsi sul tenere il passo con lo sviluppo dei principali componenti che compongono Electron, inclusi Cromo, Nodo e V8. Anche se siamo attenti a non fare promesse sulle date di rilascio, il nostro piano è il rilascio di nuove principali versioni di Electron con le nuove versioni di quei componenti circa trimestralmente. Il programma [tentativo 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mostra le date chiave nel ciclo di vita di sviluppo di Electron 8. Inoltre, [consulta il nostro documento di versionamento](https://electronjs.org/docs/tutorial/electron-versioning) per informazioni più dettagliate sul versionamento in Electron.

Per informazioni sui cambiamenti di rottura pianificati nelle prossime versioni di Electron, [consulta il nostro documento sui cambiamenti di rottura pianificati](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
