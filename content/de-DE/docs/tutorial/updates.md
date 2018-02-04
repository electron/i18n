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

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

As the final step, check for updates. The example below will check every minute:

```js
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying updates

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

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

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```js
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```