---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Dopo più di quattro mesi di sviluppo, otto rilasci beta e test in tutto il mondo da molti rollout in fase di app, il rilascio di Electron 2. .0 è ora disponibile da [electronjs.org](https://electronjs.org/).

---

## Processo Di Rilascio

A partire da 2.0.0, le release di Electrons seguiranno [semantica versioning](https://electronjs.org/blog/electron-2-semantic-boogaloo). Ciò significa che la versione principale sarà urtare più spesso e di solito sarà un importante aggiornamento a Chromium. Le versioni di patch dovrebbero essere più stabili perché contengono solo correzioni di bug ad alta priorità.

Electron 2.0.0 rappresenta anche un miglioramento di come Electron è stabilizzato prima di una release importante. Diverse applicazioni Electron su larga scala hanno incluso 2.0.0 beta in staged rollout, fornendo il miglior loop feedback mai avuto per una serie beta.

## Modifiche / Nuove Funzionalità

 * Grandi dossi per diverse parti importanti della catena di strumenti di Electron, tra cui Chrome 61, Nodo 8.9.3, V8 6.1.534.41, GTK+ 3 su Linux, correttore ortografico aggiornato e Squirrel.
 * [Gli acquisti in-app](https://electronjs.org/blog/in-app-purchases) sono ora supportati su MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Nuova API per il caricamento dei file. [#11565](https://github.com/electron/electron/pull/11565)
 * Nuova API per abilitare/disabilitare una finestra. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Nuovo supporto per la registrazione dei messaggi IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Nuovi eventi di menu. [#11754](https://github.com/electron/electron/pull/11754)
 * Aggiungi un evento `shutdown` a powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Aggiungi l'opzione `affinity` per raccogliere diversi BrowserWindows in un singolo processo. [#11501](https://github.com/electron/electron/pull/11501)
 * Aggiunge la possibilità di saveDialog per elencare le estensioni disponibili. [#11873](https://github.com/electron/electron/pull/11873)
 * Supporto per ulteriori azioni di notifica [#11647](https://github.com/electron/electron/pull/11647)
 * La capacità di impostare il titolo del pulsante di chiusura notifica macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * Aggiungi le condizioni per il menu.popup(finestra, callback)
 * Miglioramenti della memoria negli elementi touchbar. [#12527](https://github.com/electron/electron/pull/12527)
 * Checklist delle raccomandazioni di sicurezza migliorata.
 * Aggiungi segnalibri Scopo di sicurezza App-Scoped. [#11711](https://github.com/electron/electron/pull/11711)
 * Aggiungi la possibilità di impostare argomenti arbitrari in un processo di renderer. [#11850](https://github.com/electron/electron/pull/11850)
 * Aggiungi vista accessoria per il selettore del formato. [#11873](https://github.com/electron/electron/pull/11873)
 * Condizione di gara delegata rete fissa. [#12053](https://github.com/electron/electron/pull/12053)
 * Rilascia il supporto per l'archetto `mips64el` su Linux. Electron richiede la toolchain C++14, che non era disponibile per quell'arco al momento del rilascio. Speriamo di reaggiungere il sostegno in futuro.

## Interruzione delle modifiche API

 * Rimosso [API deprecate](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), tra cui:
   * Cambiato `menu.popup` firma. [#11968](https://github.com/electron/electron/pull/11968)
   * Rimosso deprecato `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Rimosso deprecato `webContents.setZoomLevelLimits` e `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Metodi `appunti` rimossi deprecati. [#11973](https://github.com/electron/electron/pull/11973)
   * Rimosso il supporto per i parametri booleani per `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Correzioni Bug

 * Modificato per assicurarsi che `webContents.isOffscreen()` sia sempre disponibile. [#12531](https://github.com/electron/electron/pull/12531)
 * Corretto `BrowserWindow.getFocusedWindow()` quando DevTools è scollegato e messo a fuoco. [#12554](https://github.com/electron/electron/pull/12554)
 * Precarico fisso non caricato in renderizzazione sandbox se il percorso di precarico contiene caratteri speciali. [#12643](https://github.com/electron/electron/pull/12643)
 * Correggi il default di allowRunningInsecureContent come da docs. [#12629](https://github.com/electron/electron/pull/12629)
 * Trasparenza fissa su nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Risolto il problema con `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Le opzioni di menu confermato.popup sono oggetti. [#12330](https://github.com/electron/electron/pull/12330)
 * Rimosso una condizione di gara tra la creazione di nuovo processo e il rilascio contestuale. [#12361](https://github.com/electron/electron/pull/12361)
 * Aggiorna le regioni trascinabili quando si cambia BrowserView. [#12370](https://github.com/electron/electron/pull/12370)
 * Risolto il rilevamento del tasto Alt della barra dei menu sul fuoco. [#12235](https://github.com/electron/electron/pull/12235)
 * Corretto avvertimenti errati nelle viste web. [#12236](https://github.com/electron/electron/pull/12236)
 * Corretto l'eredità dell'opzione 'show' dalle finestre padre. [#122444](https://github.com/electron/electron/pull/122444)
 * Assicurati che `getLastCrashReport()` sia in realtà l'ultimo crash report. [#12255](https://github.com/electron/electron/pull/12255)
 * Corretto richiede il percorso di condivisione della rete. [#12287](https://github.com/electron/electron/pull/12287)
 * Risolto il clic del menu contestuale richiamata. [#12170](https://github.com/electron/electron/pull/12170)
 * Posizione del menu a comparsa fissa. [#12181](https://github.com/electron/electron/pull/12181)
 * Migliorata pulizia ciclo libuv . [#11465](https://github.com/electron/electron/pull/11465)
 * Corretto `hexColorDWORDToRGBA` per i colori trasparenti. [#11557](https://github.com/electron/electron/pull/11557)
 * Fissata la dereferenza del puntatore null con getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * Corretto un riferimento ciclico nel delegato del menu. [#11967](https://github.com/electron/electron/pull/11967)
 * Filtro di protocollo fisso di net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits ora imposta i vincoli di scala utente [#12510](https://github.com/electron/electron/pull/12510)
 * Imposta le impostazioni predefinite appropriate per le opzioni di visualizzazione web. [#12292](https://github.com/electron/electron/pull/12292)
 * Migliorato il supporto di vibrazione. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Risolto problema di temporizzazione nel supporto singleton.
 * Corretto cache di produzione rotto in NotifierSupportsActions()
 * Made MenuItem ruoli camelCase-compatible. [#11532](https://github.com/electron/electron/pull/11532)
 * Aggiornamenti touch bar migliorati. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Separatori di menu extra rimossi. [#11827](https://github.com/electron/electron/pull/11827)
 * Corretto bug selettore Bluetooth. Chiude [#11399](https://github.com/electron/electron/pull/11399).
 * Corretto macos a schermo intero Attiva/disattiva etichetta della voce del menù. [#11633](https://github.com/electron/electron/pull/11633)
 * Migliorato il nascondiglio del suggerimento quando una finestra è disattivata. [#11644](https://github.com/electron/electron/pull/11644)
 * Metodo di visualizzazione web deprecato migrato. [#11798](https://github.com/electron/electron/pull/11798)
 * Risolto chiudendo una finestra aperta da una vista del browser. [#11799](https://github.com/electron/electron/pull/11799)
 * Corretto bug selettore Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Aggiornato per utilizzare lo scheduler delle attività per app.getFileIcon API. [#11595](https://github.com/electron/electron/pull/11595)
 * Cambiato per sparare l'evento `conse-message` anche durante il rendering offscreen. [#11921](https://github.com/electron/electron/pull/11921)
 * Risolto il download da protocolli personalizzati utilizzando `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Risolto le finestre trasparenti perdendo la trasparenza quando devtools si stacca. [#11956](https://github.com/electron/electron/pull/11956)
 * Corretto il riavvio o l'arresto delle applicazioni Electron [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Perdita di evento fissa sul riutilizzo dell'elemento touchbar. [#12624](https://github.com/electron/electron/pull/12624)
 * Evidenziazione fissa del vassoio in modalità scura. [#12398](https://github.com/electron/electron/pull/12398)
 * Corretto blocco processo principale per la finestra di dialogo asincrono. [#12407](https://github.com/electron/electron/pull/12407)
 * Corretto `setTitle` tray crash. [#12356](https://github.com/electron/electron/pull/12356)
 * Risolto il crash quando si imposta il menu di aggancio. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Migliori notifiche desktop Linux. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Migliore supporto al tema GTK+ per i menu. [#12331](https://github.com/electron/electron/pull/12331)
 * Uscire con grazia su linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Usa il nome dell'app come suggerimento predefinito dell'icona del vassoio. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Aggiunto Visual Studio 2017 supporto. [#11656](https://github.com/electron/electron/pull/11656)
 * Corretto passaggio di eccezione al gestore di sistema. [#12259](https://github.com/electron/electron/pull/12259)
 * Risolto il suggerimento di nascondimento dalla finestra minimizzata. [#11644](https://github.com/electron/electron/pull/11644)
 * Risolto `desktopCapturer` per catturare lo schermo corretto. [#11664](https://github.com/electron/electron/pull/11664)
 * Risolto `disableHardwareAcceleration` con trasparenza. [#11704](https://github.com/electron/electron/pull/11704)

# Cosa È Successivo

Il team Electron è al lavoro per supportare le versioni più recenti di Chromium, Node e V8. Aspettatevi 3.0.0-beta.1 presto!
