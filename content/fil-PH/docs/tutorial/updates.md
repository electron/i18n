# Pag-update sa mga Aplikasyon

May maraming mga paraan sa pag-update ng isang Electron na aplikasyon. Ang pinakamadali at opisyal na sinusuportahang paraan ay paggamit sa benepisyo ng built-in na [Squirrel](https://github.com/Squirrel) na balangkas at [autoUpdater](../api/auto-updater.md) na modyul ng Electron.

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

Kapag ang iyong app ay nakapakete kasama ang [`electron-builder`](https://github.com/electron-userland/electron-builder), magagamit mo ang [electron-updater](https://www.electron.build/auto-update) na modyul, na hindi nangangailangan ng isang server at pinapayagan ang mga update mula sa S3, Github o kahit anong istatikong host ng file. Pinapalikwas nito ang ang built-in na mekanismong pang-update ng Electron, ang ibig sabihin na ang natitira sa dokumentasyong ito ay hindi maaaplay sa updater ng `electron-builder`.

## Pagde-deploy ng isang Update na Server

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

Depende sa iyong mga pangangailangan, makakapili ka ng isa mula dito:

- [Hazel](https://github.com/zeit/hazel) – Update na server para sa pribado o open-source na mga app na madedeploy nang libre sa [Now](https://zeit.co/now). Nahihila ito mula sa [Mga Lathala sa Github](https://help.github.com/articles/creating-releases/) at pinapataas ang kapangyarihan ng CDN ng Github.
- [Nuts](https://github.com/GitbookIO/nuts) – Gumagamit din ng [Mga Lathala sa Github](https://help.github.com/articles/creating-releases/), pero kina-cache ang mga app na update sa disk at sumusuporta sa mga pribadong repositori.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Nagbibgay ng isang dashboard para sa paghahawak ng mga lathala at hindi nangangailangang ang mga lathala ay nagmula sa Github.
- [Nucleus](https://github.com/atlassian/nucleus) – Isang kompletong update na server para sa Electron na mga app na pinapanatili ng Atlassian. Sumusuporta sa maraming mga aplikasyon at tsanel; gumagamit ng isang istatikkong file na imbakan para paliitin ang gastos ng server.

## Pagimplementa ng update sa iyong applikasyon

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

Kapag [napakete](../tutorial/application-distribution.md) na ang iyong aplikasyon, makakatanggap ito ng isang update para sa bawat bagong [Lathala ng Github](https://help.github.com/articles/creating-releases/) na ilalathala mo.

## Pag-aaplay sa mga Update

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