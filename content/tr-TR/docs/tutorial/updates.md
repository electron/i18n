# Uygulamaları Güncelleme

Bir Electron uygulamasını güncellemenin bir kaç yolu vardır. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Güncelleme sunucusu dağıtma

To get started, you first need to deploy a server that the [autoUpdater](../api/auto-updater.md) module will download new updates from.

İhtiyaçlarınıza bağlı olarak bunlardan birini seçebilirsiniz:

-  Hazel </ 0> - Özel veya açık kaynak uygulamaları için sunucu güncelleme. Can be deployed for free on [Now](https://zeit.co/now) (using a single command), pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.</li> 
    
    - [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
    - [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases
    -  Nucleus </ 0> - Atlassian tarafından tutulan Electron uygulamaları için eksiksiz bir güncelleme sunucusu . Supports multiple applications and channels; uses a static file store to minify server cost.</li> </ul> 
        
        If your app is packaged with [electron-builder](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host.
        
        ## Uygulamanızda güncellemeleri uygulama
        
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

Son adım olarak güncellemeleri kontrol edin. Aşağıdaki örnekte her dakika denetlenecektir:

```js
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Güncellemeler uygulanıyor

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