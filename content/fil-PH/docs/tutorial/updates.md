# Pag-update sa mga Aplikasyon

May maraming mga paraan sa pag-update ng isang Electron na aplikasyon. Ang pinakamadali at opisyal na sinusuportahang paraan ay paggamit sa benepisyo ng built-in na [Squirrel](https://github.com/Squirrel) na balangkas at [autoUpdater](../api/auto-updater.md) na modyul ng Electron.

## Pagde-deploy na isang update server

Upang makapagsimula, kailangan mo munang mag-deploy ng server na pagkukuhaan ng bagong update ng [autoUpdater](../api/auto-updater.md).

Depende sa iyong mga pangangailangan, makakapili ka ng isa mula dito:

- [Hazel](https://github.com/zeit/hazel) – nag-a-update ng server mula sa pribado o open-source na mga app. Nakade-deploy nang libre sa [Now](https://zeit.co/now) (gamit ang isang utos), mga pull mula sa [Mga Lathala ng GitHub](https://help.github.com/articles/creating-releases/) at isinasataas ang kapangyarihan ng CDN ng Github.
- [Nuts](https://github.com/GitbookIO/nuts) - Gumagamit din ng [Mga Lathala ng Github](https://help.github.com/articles/creating-releases/), pero nagka-cache sa mga update ng app sa disk at sumusuporta sa mga pribadong repositori.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – nagbibigay ng dashboard sa paghahawak ng mga lathala
- [Nucleus](https://github.com/atlassian/nucleus) - Isang kompletong update server para sa nga apps ng Electron na pinapanatili ng Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

If your app is packaged with [electron-builder](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host.

## Implementing updates in your app

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