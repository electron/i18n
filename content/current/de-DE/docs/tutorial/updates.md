# Anwendungen aktualisieren

Electron-Apps können auf verschiedenste Weise aktualisiert werden. Die einfachste und offiziell unterstützte ist, die Vorteile des eingebauten [Squirrel](https://github.com/Squirrel)-Frameworks und Electrons [autoUpdater](../api/auto-updater.md)-Modul zu nutzen.

## Benutzt `update.electronjs.org`

The Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. Der Service ist für Electron-Apps, die die folgenden Kriterien erfüllen ausgelegt:

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

By default, this module will check for updates at app startup, then every ten minutes. When an update is found, it will automatically be downloaded in the background. When the download completes, a dialog is displayed allowing the user to restart the app.

If you need to customize your configuration, you can [pass options to `update-electron-app`](https://github.com/electron/update-electron-app) or [use the update service directly](https://github.com/electron/update.electronjs.org).

## Bereitstellung eines Update-Servers

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

Abhängig von Ihren Ansprüchen können Sie einen der folgenden Server nutzen:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

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

As the final step, check for updates. The example below will check every minute:

```javascript
setInterval(() => {
 autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

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

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```javascript
autoUpdater.on('error', message => {
 console.error('There was a problem updating the application')
 console.error(message)
})
```

## Handing Updates Manually

Because the requests made by Auto Update aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The `url` field does support files, which means that with some effort, you can sidestep the server-communication aspect of the process. [Here's an example of how this could work](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
