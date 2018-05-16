# automatischerUpdater

> Aktivieren Sie Apps, um sich automatisch zu aktualisieren.

Prozess: [Haupt](../glossary.md#main-process)

The `autoUpdater` module provides an interface for the [Squirrel](https://github.com/Squirrel) framework.

You can quickly launch a multi-platform release server for distributing your application by using one of these projects:

* [nuts](https://github.com/GitbookIO/nuts): *A smart release server for your applications, using GitHub as a backend. Auto-updates with Squirrel (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *A fully featured, self-hosted release server for electron applications, compatible with auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *A simple node.js server for Squirrel.Mac and Squirrel.Windows which uses GitHub releases*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *A simple PHP application for Squirrel.Windows which reads updates from a folder. Supports delta updates.*

## Plattformhinweise

Though `autoUpdater` provides a uniform API for different platforms, there are still some subtle differences on each platform.

### macOS

macOS , die ` AutoUpdater </ 0> Modul wird auf gebaut <a href="https://github.com/Squirrel/Squirrel.Mac"> Squirrel.Mac </ 1> , Sie keine spezifische Softwareinstallation erforderlich bedeutet es funktioniert. Für serverseitige Anforderungen können Sie <a href="https://github.com/Squirrel/Squirrel.Mac#server-support"> Serverunterstützung </ 0> lesen . Beachten Sie, dass <a href="https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35"> App-Transportsicherheit </ 0> (ATS) für alle Anforderungen gilt, die im Rahmen des Aktualisierungsprozesses vorgenommen werden. Apps, die ATS deaktivieren müssen, können den Schlüssel <code> NSAllowsArbitraryLoads </ 0> zu ihrer App hinzufügen
 .</p>

<p><strong> Hinweis: </ 0> Ihre Anwendung muss für automatische Updates auf macOS signiert sein . Dies ist eine Voraussetzung von <code> Squirrel.Mac </ 1> .</p>

<h3>Windows</h3>

<p>Unter Windows müssen Sie Ihre App auf dem Computer eines Benutzers installieren, bevor Sie den <code> autoUpdater </ 0> verwenden können. Daher wird empfohlen, das
 <a href="https://github.com/electron/windows-installer"> Elektron-winstaller </ 1> , <a href="https://github.com/electron-userland/electron-forge"> Elektron zu verwenden -forge </ 2> oder das <a href="https://github.com/electron/grunt-electron-installer"> grunt-electron-installer </ 3> -Paket, um ein Windows- Installationsprogramm zu generieren .</p>

<p>Wenn Sie <a href="https://github.com/electron/windows-installer"> electron-winstaller </ 0> oder <a href="https://github.com/electron-userland/electron-forge"> electron-forge </ 1> verwenden , versuchen Sie nicht, Ihre App <a href="https://github.com/electron/windows-installer#handling-squirrel-events"> beim ersten Mal zu aktualisieren </ 2> (Siehe auch <3 > dieses Problem für weitere Informationen </ 3> ).
 Es wird auch empfohlen, <a href="https://github.com/mongodb-js/electron-squirrel-startup"> electron-squirrel-startup </ 0> zu verwenden, um Desktop-Verknüpfungen für Ihre App zu erhalten.</p>

<p>Das mit Squirrel erstellte Installationsprogramm erstellt ein Verknüpfungssymbol mit einer
 <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx"> Anwendungsbenutzermodell-ID </ 0> im Format
 <code> com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE </ 1> , Beispiele sind
 <code> com.squirrel .slack.Schwarz </ 1> und <code> com.squirrel.code.Code </ 1> . Sie müssen dieselbe ID für Ihre App mit der <code> app.setAppUserModelId </ 0>  API verwenden , da Windows sonst Ihre App nicht ordnungsgemäß in der Taskleiste anheften kann .</p>

<p>Im Gegensatz zu Squirrel.Mac kann Windows Updates auf S3 oder einem anderen statischen Dateihost hosten.
Sie können die Dokumente von <a href="https://github.com/Squirrel/Squirrel.Windows"> Squirrel.Windows </ 0> lesen , um mehr über die Funktionsweise von Squirrel.Windows zu erfahren.</p>

<h3>Linux</h3>

<p>There is no built-in support for auto-updater on Linux, so it is recommended to
use the distribution's package manager to update your app.</p>

<h2>Veranstaltungen</h2>

<p>The <code>autoUpdater` object emits the following events:

### Ereignis : "Fehler

Rückgabewert:

* ` Fehler </ 0> Fehler</li>
</ul>

<p>Emitted when there is an error while updating.</p>

<h3>Event: 'checking-for-update'</h3>

<p>Emitted when checking if an update has started.</p>

<h3>Event: 'update-available'</h3>

<p>Emitted when there is an available update. The update is downloaded
automatically.</p>

<h3>Event: 'update-not-available'</h3>

<p>Emitted when there is no available update.</p>

<h3>Event: 'update-downloaded'</h3>

<p>Rückgabewert:</p>

<ul>
<li><code> Ereignis </ 0>  Ereignis</li>
<li><code>releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Methoden

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* ` URL </ 0>  Zeichenfolge</li>
<li><code>requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.