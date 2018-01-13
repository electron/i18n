# Uygulamaları Güncelleştirme

Bir Electron uygulamasını güncelleştirmenin bir kaç yolu vardır. En kolay ve resmi olarak desteklenen yol, bir yerleşik [Sincap](https://github.com/Squirrel) taslağından ve Electron'un [autoUpdater](../api/auto-updater.md) modülünden faydalanmaktır.

## Güncelleştirme sunucusunu düzenleme

Başlangıç olarak, önce [autoUpdater](../api/auto-updater.md) modülünü karşıdan yükleyecek sunucuyu düzenlemek gerekir.

İhtiyaçlarınıza göre, bunlardan birini seçebilirsiniz:

- [ Hazel ](https://github.com/zeit/hazel) - Özel veya açık kaynak uygulamaları için sunucu güncelleştirme. [Now](https://zeit.co/now) (tek bir komut kullanarak) üzerinden ücretsiz olarak düzenlenebilir, [GitHub Releases](https://help.github.com/articles/creating-releases/) dan çeker ve GitHub'un CDN gücünün etkinliğini artırır.
- [Nuts](https://github.com/GitbookIO/nuts) – Ayrıca [GitHub Releases](https://help.github.com/articles/creating-releases/) kullanır, fakat app güncellemelerini önbelleğe alır ve özel arşivleri destekler.
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