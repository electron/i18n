# Anwendungen aktualisieren

Electron-Apps können auf verschiedenste Weise aktualisiert werden. Die einfachste und offiziell unterstützte ist, die Vorteile des eingebauten [Squirrel](https://github.com/Squirrel)-Frameworks und Electrons [autoUpdater](../api/auto-updater.md)-Modul zu nutzen.

## Using `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. The service is designed for Electron apps that meet the following criteria:

- App runs on macOS or Windows
- App has a public GitHub repository
- Builds are published to GitHub Releases
- Builds are code-signed

The easiest way to use this service is by installing [update-electron-app](https://github.com/electron/update-electron-app), a Node.js module preconfigured for use with update.electronjs.org.

Install the module:

```sh
npm install update-electron-app
```

Invoke the updater from your app's main process file:

```js
require('update-electron-app')()
```

By default, this module will check for updates at app startup, then every ten minutes. When an update is found, it will automatically be downloaded in the background. When the download completes, a dialog is displayed allowing the user to restart the app.

If you need to customize your configuration, you can [pass options to `update-electron-app`](https://github.com/electron/update-electron-app) or [use the update service directly](https://github.com/electron/update.electronjs.org).

## Using `electron-builder`

If your app is packaged with [`electron-builder`](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

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
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Als letzten Schritt, prüfen Sie, ob es Updates gibt. Das folgende Beispiel überprüft alle 60 Sekunden, ob es Updates gibt:

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

 dialog.showMessageBox(dialogOpts, (response) => {
   if (response === 0) autoUpdater.quitAndInstall()
 })
})
```

Stellen Sie außerdem sicher, dass mit Fehlern [umgegangen wird](../api/auto-updater.md#event-error). Hier ist ein Beispiel, zur Protokollierung nach `stderr`:

```javascript
autoUpdater.on('error', message => {
 console.error('There was a problem updating the application')
 console.error(message)
})
```