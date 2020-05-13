# Uygulamaları Güncelleştirme

Bir Electron uygulamasını güncelleştirmenin bir kaç yolu vardır. En kolay ve resmi olarak desteklenen yol, bir yerleşik [Sincap](https://github.com/Squirrel) taslağından ve Electron'un [autoUpdater](../api/auto-updater.md) modülünden faydalanmaktır.

## Using `update.electronjs.org`

The Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. The service is designed for Electron apps that meet the following criteria:

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

## Güncelleme Sunucusunu Dağıtma

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

İhtiyaçlarınıza göre, bunlardan birini seçebilirsiniz:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## Uygulama içerisinde güncellemeleri yapmak

Güncelleme sunucunuzu düzenledikten sonra, kodunuza gerekli modülleri içe aktarmaya devam edin. Aşağıdaki kod farklı sunucu yazılımı için değişik olabilir, fakat [Hazel](https://github.com/zeit/hazel) kullanırken açıklandığı gibi çalışır.

**Important:** Lütfen aşağıdaki kodun sadece paketlenmiş uygulamanızda yürütüldüğüne, ve geliştirilmede olmadığına emin olun. [electron-is-dev](https://github.com/sindresorhus/electron-is-dev)'i çevreyi denetlemek için kullanabilirsiniz.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Daha sonra, güncelleştirme sunucusunun URL'sini yapılandırın ve [autoUpdater](../api/auto-updater.md)'a söyleyin:

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

## Güncellemeleri Uygulama

Artık uygulamanız için temel güncelleştirme mekanizmasını yapılandırdınız, kullanıcının bir güncelleştirme olduğunda bilgilendirildiğinden emin olmanız gerekiyor. Bu autoUpdater API [events](../api/auto-updater.md#events) kullanarak elde edilebilir:

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Yeni versiyon karşıdan yüklenmiştir. Restart the application to apply the updates.'
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
