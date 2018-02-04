# Anwendungen aktualisieren

Electron-Apps können auf verschiedenste Weise aktualisiert werden. Die einfachste und offiziell unterstützte ist, die Vorteile des eingebauten [Squirrel](https://github.com/Squirrel)-Frameworks und Electrons [autoUpdater](../api/auto-updater.md)-Modul zu nutzen.

## Einen Update-Server aufsetzen

Als erstes müssen Sie einen Server aufsetzen, von dem das [autoUpdater](../api/auto-updater.md)-Modul die Updates beziehen kann.

Abhängig von Ihren Ansprüchen können Sie einen der folgenden Server nutzen:

- [Hazel](https://github.com/zeit/hazel) – Update-Server für private Apps oder Open-Source-Apps. Kann kostenlos aufgesetzt werden mittels [Now](https://zeit.co/now) (mit einem einzigen Kommando), lädt das Update von [GitHub Veröffentlichungen](https://help.github.com/articles/creating-releases/) herunter und nutzt dabei die Vorteile von GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) - Nutzt ebenfalls [GitHub Veröffentlichungen](https://help.github.com/articles/creating-releases/), aber es werden Updates auf der Festplatte zwischengespeichert und es werden private repositories unterstützt.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) - unterstützt ein Dashboard zum verwalten von Veröffentlichungen
- [Nucleus](https://github.com/atlassian/nucleus) – Ein kompletter Update-Server für Electron-Apps verwaltet von Atlassian. Unterstützt mehrere Anwendungen und Kanäle; nutzt ein statischen Dateispeicher um Serverkosten zu minimieren.

Wenn Ihre App mit dem [Electron-Builder](https://github.com/electron-userland/electron-builder) gepackt ist, können Sie das [Electron-Updater](https://www.electron.build/auto-update) - Modul nutzten. Das Modul setzt keinen Server voraus und erlaubt Ihnen Updates von S3, GitHub oder jeden anderen statischen Dateispeicher.

## Einbinden von Updates in Ihre App

Wenn Sie Ihren Update-Server aufgesetzt haben, fahren Sie mit dem Importieren der erforderlichen Module in Ihrem Code fort. Der folgende Code kann etwas abweichen für die verschiedenen Server, aber er funktioniert wie beschrieben bei der Verwendung von [Hazel](https://github.com/zeit/hazel).

**Wichtig:** Bitte stellen Sie sicher, das der Code nur in Ihrer gepackten App ausgeführt wird und nicht in der Entwicklungsumgebung. Sie können [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) nutzen, um Ihre Entwicklungsumgebung zu überprüfen.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Als nächstes, stellen Sie die URL des Update-Servers bereit und stellen Sie diese dem [autoUpdater](../api/auto-updater.md) zur Verfügung:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Als letzten Schritt, prüfen Sie, ob es Updates gibt. Das folgende Beispiel überprüft alle 60 Sekunden, ob es Updates gibt:

```js
setInterval(() => {
 autoUpdater.checkForUpdates()
}, 60000)
```

Wenn Ihre App [veröffentlicht](../tutorial/application-distribution.md) ist, wird es für jede neue [GitHub-Veröffentlichung](https://help.github.com/articles/creating-releases/), die Sie herausgeben, ein Update empfangen.

## Anwenden von Updates

Nun, da Sie den grundlegenden Update-Mechanismus konfiguriert haben, müssen Sie sicherstellen, dass die Nutzer benachrichtigt werden, wenn es ein Update gibt. Das kann erreicht werden, indem man die API [events](../api/auto-updater.md#events) des autoUpdater nutzt:

```js
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

```js
autoUpdater.on('error', message => {
 console.error('There was a problem updating the application')
 console.error(message)
})
```