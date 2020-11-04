# Anwendungen aktualisieren

Electron-Apps können auf verschiedenste Weise aktualisiert werden. Die einfachste und offiziell unterstützte ist, die Vorteile des eingebauten [Squirrel](https://github.com/Squirrel)-Frameworks und Electrons [autoUpdater](../api/auto-updater.md)-Modul zu nutzen.

## Benutzt `update.electronjs.org`

GitHub's Electron Team verwaltet [update.electronjs.org][], Ein kostenloser open-source Web Dienst, welchen Electron Apps für automatische updates benutzen können. Der Service ist für Electron-Apps, die die folgenden Kriterien erfüllen ausgelegt:

- App läuft unter Mac OS oder Windows
- App hat ein öffentliches GitHub Repository
- Builds werden in GitHub-Releases veröffentlicht
- Builds sind Code-signiert

Am einfachsten können Sie diesen Service nutzen, indem Sie [update-electron-app][] installieren, ein Node.js-Modul, das für die Verwendung mit update.electronjs.org vorkonfiguriert ist.

Installiere das Modul:

```sh
npm install update-electron-app
```

Rufen Sie den Updater über die Hauptprozessdatei Ihrer App auf:

```js
require('update-electron-app')()
```

Standardmäßig wird dieses Modul beim Start der App nach Updates suchen, dann alle zehn Minuten. Wenn ein Update gefunden wird, wird es automatisch im Hintergrund heruntergeladen. Wenn der Download abgeschlossen ist, wird ein Dialog angezeigt, der dem Benutzer erlaubt, die App neu zu starten.

If you need to customize your configuration, you can [pass options to `update-electron-app`][update-electron-app] or [use the update service directly][update.electronjs.org].

## Using `electron-builder`

If your app is packaged with [`electron-builder`][electron-builder-lib] you can use the [electron-updater][] module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Bereitstellung eines Update-Servers

Wenn Sie eine private Electron-Anwendung entwickeln oder wenn Sie keine Veröffentlichungen auf GitHub Releases veröffentlichen, es könnte notwendig sein, Ihren eigenen Update-Server auszuführen.

Abhängig von Ihren Ansprüchen können Sie einen der folgenden Server nutzen:

- [Hazel][hazel] – Update server for private or open-source apps which can be deployed for free on [Now][now]. It pulls from [GitHub Releases][gh-releases] and leverages the power of GitHub's CDN.
- [Nuts][nuts] – Also uses [GitHub Releases][gh-releases], but caches app updates on disk and supports private repositories.
- [electron-release-server][electron-release-server] – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus][nucleus] – A complete update server for Electron apps maintained by Atlassian. Unterstützt mehrere Anwendungen und Kanäle; verwendet einen statischen Dateispeicher , um die Serverkosten zu senken.

## Implementieren von Updates in deiner App

Wenn Sie Ihren Update-Server aufgesetzt haben, fahren Sie mit dem Importieren der erforderlichen Module in Ihrem Code fort. Der folgende Code kann etwas abweichen für die verschiedenen Server, aber er funktioniert wie beschrieben bei der Verwendung von [Hazel](https://github.com/zeit/hazel).

**Wichtig:** Bitte stellen Sie sicher, das der Code nur in Ihrer gepackten App ausgeführt wird und nicht in der Entwicklungsumgebung. Sie können [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) nutzen, um Ihre Entwicklungsumgebung zu überprüfen.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Als nächstes, stellen Sie die URL des Update-Servers bereit und stellen Sie diese dem [autoUpdater](../api/auto-updater.md) zur Verfügung:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
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
   detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
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

[electron-builder-lib]: https://github.com/electron-userland/electron-builder
[electron-updater]: https://www.electron.build/auto-update
[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
