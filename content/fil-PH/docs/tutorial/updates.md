# Pag-update sa mga Aplikasyon

May maraming mga paraan sa pag-update ng isang Electron na aplikasyon. Ang pinakamadali at opisyal na sinusuportahang paraan ay paggamit sa benepisyo ng built-in na [Squirrel](https://github.com/Squirrel) na balangkas at [autoUpdater](../api/auto-updater.md) na modyul ng Electron.

## Pagde-deploy na isang update server

Upang makapagsimula, kailangan mo munang mag-deploy ng server na pagkukuhaan ng bagong update ng [autoUpdater](../api/auto-updater.md).

Depende sa iyong mga pangangailangan, makakapili ka ng isa mula dito:

- [Hazel](https://github.com/zeit/hazel) – nag-a-update ng server mula sa pribado o open-source na mga app. Nakade-deploy nang libre sa [Now](https://zeit.co/now) (gamit ang isang utos), mga pull mula sa [Mga Lathala ng GitHub](https://help.github.com/articles/creating-releases/) at isinasataas ang kapangyarihan ng CDN ng Github.
- [Nuts](https://github.com/GitbookIO/nuts) - Gumagamit din ng [Mga Lathala ng Github](https://help.github.com/articles/creating-releases/), pero nagka-cache sa mga update ng app sa disk at sumusuporta sa mga pribadong repositori.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – nagbibigay ng dashboard sa paghahawak ng mga lathala
- [Nucleus](https://github.com/atlassian/nucleus) - Isang kompletong update server para sa nga apps ng Electron na pinapanatili ng Atlassian. Sumusuporta sa maraming mga aplikasyon at tsanel; gumagamit ng istatik na imbakan ng mga file upang paliitin ang gastos ng server.

Kung ang iyong app ay ginugrupo kasama ang [electron-builder](https://github.com/electron-userland/electron-builder) pwede kang gumamit ng module na [electron-updater](https://www.electron.build/auto-update), na hindi na nangangailangan ng server at pinapahintulutan ang mga update mula S3, GitHub o kahit anong host ng istatik na file.

## Pagtatag ng mga update sa iyong app

Kapag na-deploy mo na ang iyong update server, ipagpapatuloy ang pag-import ng mga kinakailangang mga modyul sa iyong code. Ang sumusunod na code ay possibleng naiiba sa mga iba't - ibang server software, pero gumagana ito katulad ng inilalarawan kapag gumagamit ng [Hazel](https://github.com/zeit/hazel).

**Important:** Siguraduhing ang code sa baba ay pinapagana lang sa iyong naka-package na app, at hindi sa paglilinang. Pwede mong gamitin ang [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) upang tingnan ang environment.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Sunod, gawin ang URL ng update server at sabihin ito sa [autoUpdater](../api/auto-updater.md):

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Bilang huling hakbang, magtsek ng mga update. Ang halimbawa sa baba ay magtse-tsek ng mga ito bawat minuto:

```js
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Kapag [naka-package](../tutorial/application-distribution.md) na ang iyong aplikasyon, makakatanggap ito ng update sa bawat bagong [Lathala ng Github](https://help.github.com/articles/creating-releases/) na iyong ipina-publish.

## Pag-aaplay sa mga update

Ngayong na-configure mo na ang basikong mekanismo para sa pag-update ng iyong aplikasyon, kailangang siguraduhin mo na ang gumagamit ay mapapaalahanan kapag mayroong update. Nakakamit ito gamit ang autoUpdater na API [events](../api/auto-updater.md#events):

```js
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

```js
autoUpdater.on('error', message => {
  console.error('May problema sa pag-update ng aplikasyon')
  console.error(message)
})
```