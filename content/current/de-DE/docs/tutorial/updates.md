# Anwendungen aktualisieren

Electron-Apps können auf verschiedenste Weise aktualisiert werden. Die einfachste und offiziell unterstützte ist, die Vorteile des eingebauten [Squirrel](https://github.com/Squirrel)-Frameworks und Electrons [autoUpdater](../api/auto-updater.md)-Modul zu nutzen.

## Benutzt `update.electronjs.org`

Das Electron-Team unterhält [update.electronjs.org](https://github.com/electron/update.electronjs.org), einen kostenlosen und Open-Source- Webservice, den Electron-Apps zur Selbstaktualisierung nutzen können. Der Service ist für Electron-Apps, die die folgenden Kriterien erfüllen ausgelegt:

- App läuft unter Mac OS oder Windows
- App hat ein öffentliches GitHub Repository
- Builds werden in GitHub-Releases veröffentlicht
- Builds sind Code-signiert

Am einfachsten können Sie diesen Service nutzen, indem Sie [update-electron-app](https://github.com/electron/update-electron-app) installieren, ein Node.js-Modul, das für die Verwendung mit update.electronjs.org vorkonfiguriert ist.

Installiere das Modul:

```sh
npm install update-electron-app
```

Rufen Sie den Updater über die Hauptprozessdatei Ihrer App auf:

```js
require('update-electron-app')()
```

Standardmäßig wird dieses Modul beim Start der App nach Updates suchen, dann alle zehn Minuten. Wenn ein Update gefunden wird, wird es automatisch im Hintergrund heruntergeladen. Wenn der Download abgeschlossen ist, wird ein Dialog angezeigt, der dem Benutzer erlaubt, die App neu zu starten.

Wenn Sie Ihre Konfiguration anpassen müssen, [übergeben Sie Optionen an `update-electron-app`](https://github.com/electron/update-electron-app) oder [nutzen Sie den Update-Dienst direkt](https://github.com/electron/update.electronjs.org).

## Bereitstellung eines Update-Servers

Wenn Sie eine private Electron-Anwendung entwickeln oder wenn Sie sie nicht auf GitHub Releases veröffentlichen, könnte notwendig sein, Ihren eigenen Update-Server bereitzustellen.

Abhängig von Ihren Ansprüchen können Sie einen der folgenden Server nutzen:

- [Hazel](https://github.com/zeit/hazel) – Aktualisiere Server für private oder Open-Source-Apps, die kostenlos auf [Jetzt](https://zeit.co/now) freigegeben werden können. Es zieht von [GitHub Releases](https://help.github.com/articles/creating-releases/) und nutzt die Leistung von GitHub CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Verwendet auch [GitHub Releases](https://help.github.com/articles/creating-releases/), aber speichert die App aktualisiert auf der Festplatte und unterstützt private Repositories.
- [Elektron-Release-Server](https://github.com/ArekSredzki/electron-release-server) – Stellt ein Dashboard zur Bearbeitung von Releases bereit und benötigt keine Releases, um auf GitHub zu starten.
- [Nucleus](https://github.com/atlassian/nucleus) – Ein vollständiger Update-Server für Electron-Apps, betreut von Atlassian. Unterstützt mehrere Anwendungen und Kanäle; verwendet einen statischen Dateispeicher , um die Serverkosten zu senken.

## Implementieren von Updates in deiner App

Wenn Sie Ihren Update-Server aufgesetzt haben, fahren Sie mit dem Importieren der erforderlichen Module in Ihrem Code fort. Der folgende Code kann etwas abweichen für die verschiedenen Server, aber er funktioniert wie beschrieben bei der Verwendung von [Hazel](https://github.com/zeit/hazel).

**Wichtig:** Bitte stellen Sie sicher, das der Code nur in Ihrer gepackten App ausgeführt wird und nicht in der Entwicklungsumgebung. Sie können [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) nutzen, um Ihre Entwicklungsumgebung zu überprüfen.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Als nächstes, stellen Sie die URL des Update-Servers bereit und stellen Sie diese dem [autoUpdater](../api/auto-updater.md) zur Verfügung:

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

Überprüfen Sie als letzten Schritt nach Updates. Das folgende Beispiel wird jede Minute überprüfen:

```javascript
setInterval(() => {
 autoUpdater.checkForUpdates()
}, 60000)
```

Sobald Ihre Anwendung [verpackt ist,](../tutorial/application-distribution.md), Es wird ein Update für jeden neuen [GitHub-Release](https://help.github.com/articles/creating-releases/) erhalten, das Sie veröffentlichen.

## Updates anwenden

Nun, da Sie den grundlegenden Update-Mechanismus konfiguriert haben, müssen Sie sicherstellen, dass die Nutzer benachrichtigt werden, wenn es ein Update gibt. Das kann erreicht werden, indem man die API [events](../api/auto-updater.md#events) des autoUpdater nutzt:

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
 const dialogOpts = {
   type: 'info',
   buttons: ['Restart', 'Later'],
   title: 'Application Update',
   message: process.platform === 'win32' ? releaseNotes : releaseName,
   detail: 'A new version has been downloaded. Starte die Anwendung neu, um die Updates anzuwenden.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Stellen Sie auch sicher, dass Fehler [behandelt werden](../api/auto-updater.md#event-error). Hier ist ein Beispiel zum Loggen an `stderr`:

```javascript
autoUpdater.on('error', message => {
 console.error('There was a problem updating the application')
 console.error(message)
})
```

## Manuelle Bearbeitung von Updates

Weil die Anfragen von Auto Update nicht unter Ihrer direkten Kontrolle stehen finden Sie möglicherweise Situationen, die schwer zu handhaben sind (z. B. wenn der Update-Server hinter der Authentifizierung steht). Das Feld `url` unterstützt Dateien, was bedeutet, dass Sie mit etwas Aufwand den Aspekt der Serverkommunikation umgehen können. [Hier ist ein Beispiel dafür, wie dies funktionieren könnte](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
