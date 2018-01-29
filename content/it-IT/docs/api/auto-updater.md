# autoAggiornatore

> Abilita le app ad aggiornarsi automaticamente.

Processo: [Principale](../glossary.md#main-process)

Il modulo `autoAggiornatore` fornisce un'un'interfaccia per il framework [Squirrel](https://github.com/Squirrel).

Puoi brevemente lanciare un rilascio su più piattaforme del server per distribuire la tua app usando uno dei seguenti progetti:

* [nut](https://github.com/GitbookIO/nuts): *Un software release intelligente per le tue app, usando GitHub come sfondo. Auto-aggiornamenti con Squirrel (Mac & Windows)*
* [electron-rilascio-server](https://github.com/ArekSredzki/electron-release-server): *Un totalmente accessoriato auto-ospitato rilascio server per le app electron, compatibile con l'auto-aggiornatore*
* [squirrel-aggiornamenti-server](https://github.com/Aluxian/squirrel-updates-server): *Un semplice server node.js per Squirrel.Mac e Squirrel.Windows che usa i rilasci GitHub*
* [squirrel-rilascio-server](https://github.com/Arcath/squirrel-release-server): *Una semplice applicazione PHP per Squirrel.Windows che legge gli aggiornamenti da una cartella. Supporta aggiornamenti delta.*

## Avvisi di piattaforma

`autoAggiornatore` fornisce una API uniforme per varie piattaforme, ci sono alcune differenze sottili su ogni piattaforma.

### macOS

Su macOS, il modulo `autoAggiornatore` costruito su [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), non è necessario nessun avvio speciale per farlo lavorare. Per requisiti lato-server puoi leggere il [Supporto Server](https://github.com/Squirrel/Squirrel.Mac#server-support). Nota che l'[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) acconsente a tutti i requisiti fatti come parte del processo di aggiornamento. App che necessitano di disabilitare ATS possono aggiungere la chiave `NSPermettiCaricamentiArbitrari` alla loro plist dell'app.

**Nota:** La tua app deve essere firmata per gli aggiornamenti automatici su MacOS. Questo è un requisiti di `Squirrel.Mac`.

### Windows

Su Windows si deve installare la propria app in una macchina utente prima di poter usare l'`autoAggiornatore</o>, quindi si raccomanda di usare <a href="https://github.com/electron/windows-installer">electron-winstaller</a>, <a href="https://github.com/electron-userland/electron-forge">electron-forge</a> o <a href="https://github.com/electron/grunt-electron-installer">grunt-electron-installatore</a> pacchetti per generare un installatore Windows.</p>

<p>Quando si usa <a href="https://github.com/electron/windows-installer">electron-winstaller</a> o <a href="https://github.com/electron-userland/electron-forge">electron-forge</a> assicurarsi di non provare ad aggiornare la propria app <a href="https://github.com/electron/windows-installer#handling-squirrel-events">alla prima esecuzione</a> (Vedi anche <a href="https://github.com/electron/electron/issues/7155">questo problema per altre informazioni</a>). È anche raccomandato usare <a href="https://github.com/mongodb-js/electron-squirrel-startup">electron-squirrel-avvio</a> per ottenere scorciatoie del desktop per la tua app.</p>

<p>The installer generated with Squirrel will create a shortcut icon with an
<a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx">Application User Model ID</a> in the format of
<code>com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

### Linux

There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

## Events

The `autoUpdater` object emits the following events:

### Event: 'error'

Restituiti:

* `errore` Errore

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

Restituiti:

* `evento` Evento
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Methods

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` Stringa
* `requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.