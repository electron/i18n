# Pag-update sa mga Aplikasyon

May maraming mga paraan sa pag-update ng isang Electron na aplikasyon. Ang pinakamadali at opisyal na sinusuportahang paraan ay paggamit sa benepisyo ng built-in na [Squirrel](https://github.com/Squirrel) na balangkas at [autoUpdater](../api/auto-updater.md) na modyul ng Electron.

## Deploying an Update Server

Upang makapagsimula, kailangan mo munang mag-deploy ng server na pagkukuhaan ng bagong update ng [autoUpdater](../api/auto-updater.md).

Depende sa iyong mga pangangailangan, makakapili ka ng isa mula dito:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

If your app is packaged with [`electron-builder`](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Implementing Updates in Your App

Kapag na-deploy mo na ang iyong update server, ipagpapatuloy ang pag-import ng mga kinakailangang mga modyul sa iyong code. Ang sumusunod na code ay possibleng naiiba sa mga iba't - ibang server software, pero gumagana ito katulad ng inilalarawan kapag gumagamit ng [Hazel](https://github.com/zeit/hazel).

**Important:** Siguraduhing ang code sa baba ay pinapagana lang sa iyong naka-package na app, at hindi sa paglilinang. Pwede mong gamitin ang [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) upang tingnan ang environment.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Sunod, gawin ang URL ng update server at sabihin ito sa [autoUpdater](../api/auto-updater.md):

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Bilang huling hakbang, magtsek ng mga update. Ang halimbawa sa baba ay magtse-tsek ng mga ito bawat minuto:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying Updates

Ngayong na-configure mo na ang basikong mekanismo para sa pag-update ng iyong aplikasyon, kailangang siguraduhin mo na ang gumagamit ay mapapaalahanan kapag mayroong update. Nakakamit ito gamit ang autoUpdater na API [events](../api/auto-updater.md#events):

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Ang bagong bersyon ay nai-download na. I-restart ang aplikasyon upang maaplay ang mga update.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Siguraduhin din na ang mga mali ay [nahahawakan](../api/auto-updater.md#event-error). Narito ang isang halimbawa sa paglagay sa kanila sa `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('May problema sa pag-update ng aplikasyon')
  console.error(message)
})
```