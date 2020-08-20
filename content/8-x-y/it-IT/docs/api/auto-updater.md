# autoUpdater

> Abilita le app ad aggiornarsi automaticamente.

Processo: [Main](../glossary.md#main-process)

**Vedi anche: [Una guida dettagliata su come implementare aggiornamenti nella tua applicazione](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter][event-emitter].

## Avvisi Piattaforma

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

In aggiunta, ci sono alcune sottili differenze su ogni piattaforma:

### macOS

Su macOS, il modulo `autoAggiornatore` costruito su [Squirrel.Mac][squirrel-mac], non è necessario nessun avvio speciale per farlo lavorare. Per requisiti lato-server puoi leggere il [Supporto Server][server-support]. Nota che l'[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) acconsente a tutti i requisiti fatti come parte del processo di aggiornamento. App che necessitano di disabilitare ATS possono aggiungere la chiave `NSPermettiCaricamentiArbitrari` alla loro plist dell'app.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). È anche raccomandato usare [electron-squirrel-avvio](https://github.com/mongodb-js/electron-squirrel-startup) per ottenere scorciatoie del desktop per la tua app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. Devi usare lo stesso ID per la tua app con la API `app.impostaModelloIdAppUtente`, altrimenti Windows non potrà pinnare la tua app propriamente nella task bar.

Diversamente da Squirrel.Mac, Windows può ospitare aggiornamenti si S3 o alcuni altri file ospiti statici. You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

## Eventi

L'oggetto `autoAggiornatore` emette i seguenti eventi:

### Evento: 'errore'

Restituisce:

* `errore` Errore

Emesso quando avviene un errore in aggiornamento.

### Evento: 'controllando_per_aggiornamenti'

Emesso quando controlla se si è avviato un aggiornamento.

### Evemto: 'aggiornamento-disponibile'

Emitted when there is an available update. The update is downloaded automatically.

### Evento: 'aggiornamento-non-disponibile'

Emesso quando non ci sono aggiornamenti disponibili.

### Evento: 'aggiornamento-scaricato'

Restituisce:

* `event` Event
* `NoteRilascio` Stringa
* `Nomerilascio` Stringa
* `Datarilascio` Data
* `aggiornaURL` Stringa

Emesso quando un aggiornamento è stato scaricato.

Solo su Windows `rilascioNome` è disponibile.

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Evento: 'before-quit-for-update'

Questo evento è emesso dopo una chiamata utente `quitAndInstall()`.

Quando questa API è chiamata, l'evento `before-quit` non è emesso finché tutte le finestre non sono state chiuse. Come risultato dovresti restare in ascolto di questo evento se desideri eseguire delle azioni prima che le finestre siano chiuse mentre un processo si sta chiudendo, così come restare in ascolto di `before-quit`.

## Metodi

L'oggetto `autoAggiornatore` ha i seguenti metodi:

### `autoUpdater.setFeedURL(opzioni)`

* `options` Object
  * `url` Stringa
  * `headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

Imposta l'`url` e inizializza l'auto aggiornatore.

### `autoAggiornatore.ottieniFeedURL()`

Restituisci `Stringa` 'L'attuale feed URL di aggiornamento.

### `autoAggiornatore.controllaPerAggiornamenti()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoaAggiornatore.esciEInstalla()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Sotto la chiamata `autoUpdater.quitAndInstall()` saranno prima chiuse tutte le finestre dell'applicazione, e automaticamente chiamata `app.quit()` dopo che tutte le finestre sono state chiuse.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
