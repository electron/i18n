# Aktualizowanie aplikacji

Istnieje kilka sposobów, aby zaktualizować aplikację Electron. Ten najprostszy i oficjalnie wspierany jest korzystając z wbudowanej struktury [Squirrel](https://github.com/Squirrel) oraz modułu [autoUpdater](../api/auto-updater.md) Electron'a.

## Wdrażanie aktualizacji serwera

To get started, you first need to deploy a server that the [autoUpdater](../api/auto-updater.md) module will download new updates from.

Depending on your needs, you can choose from one of these:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

If your app is packaged with [`electron-builder`](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Implementing Updates in Your App

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

As the final step, check for updates. The example below will check every minute:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Stosowanie aktualizacji

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

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

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('Wystąpił problem podczas aktualizowania aplikacji')
  console.error(message)
})
```