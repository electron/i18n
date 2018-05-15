# Uygulamaları Güncelleştirme

Bir Electron uygulamasını güncelleştirmenin bir kaç yolu vardır. En kolay ve resmi olarak desteklenen yol, bir yerleşik [Sincap](https://github.com/Squirrel) taslağından ve Electron'un [autoUpdater](../api/auto-updater.md) modülünden faydalanmaktır.

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

## Deploying an Update Server

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

İhtiyaçlarınıza göre, bunlardan birini seçebilirsiniz:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## Implementing Updates in Your App

Güncelleme sunucunuzu düzenledikten sonra, kodunuza gerekli modülleri içe aktarmaya devam edin. Aşağıdaki kod farklı sunucu yazılımı için değişik olabilir, fakat [Hazel](https://github.com/zeit/hazel) kullanırken açıklandığı gibi çalışır.

**Important:** Lütfen aşağıdaki kodun sadece paketlenmiş uygulamanızda yürütüldüğüne, ve geliştirilmede olmadığına emin olun. [electron-is-dev](https://github.com/sindresorhus/electron-is-dev)'i çevreyi denetlemek için kullanabilirsiniz.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Daha sonra, güncelleştirme sunucusunun URL'sini yapılandırın ve [autoUpdater](../api/auto-updater.md)'a söyleyin:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Son adım olarak, güncelleştirmeleri kontrol edin. Aşağıdaki örnekte her dakika kontrol edilecektir:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying Updates

Artık uygulamanız için temel güncelleştirme mekanizmasını yapılandırdınız, kullanıcının bir güncelleştirme olduğunda bilgilendirildiğinden emin olmanız gerekiyor. Bu autoUpdater API [events](../api/auto-updater.md#events) kullanarak elde edilebilir:

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Yeni versiyon karşıdan yüklenmiştir. Güncelleştirmeleri uygulamak için uygulamayı yeniden başlatınız.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Aynı zamanda hataların [kontrol altında](../api/auto-updater.md#event-error) olduğundan emin olun. İşte onları `stderr`'e kayıt etmek için bir örnek:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```