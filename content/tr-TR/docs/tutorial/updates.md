# Uygulamaları Güncelleştirme

Bir Electron uygulamasını güncelleştirmenin bir kaç yolu vardır. En kolay ve resmi olarak desteklenen yol, bir yerleşik [Sincap](https://github.com/Squirrel) taslağından ve Electron'un [autoUpdater](../api/auto-updater.md) modülünden faydalanmaktır.

## Güncelleştirme sunucusunu düzenleme

Başlangıç olarak, önce [autoUpdater](../api/auto-updater.md) modülünü karşıdan yükleyecek sunucuyu düzenlemek gerekir.

İhtiyaçlarınıza göre, bunlardan birini seçebilirsiniz:

- [ Hazel ](https://github.com/zeit/hazel) - Özel veya açık kaynak uygulamaları için sunucu güncelleştirme. [Now](https://zeit.co/now) (tek bir komut kullanarak) üzerinden ücretsiz olarak düzenlenebilir, [GitHub Releases](https://help.github.com/articles/creating-releases/) dan çeker ve GitHub'un CDN gücünün etkinliğini artırır.
- [Nuts](https://github.com/GitbookIO/nuts) – Ayrıca [GitHub Releases](https://help.github.com/articles/creating-releases/) kullanır, fakat app güncellemelerini önbelleğe alır ve özel arşivleri destekler.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Yayınlananları yönetmek için kontrol paneli sağlar
- [ Nucleus ](https://github.com/atlassian/nucleus) - Atlassian tarafından sürdürülen Electron uygulamaları için eksiksiz bir güncelleştirme sunucusudur. Birden fazla uygulama ve kanalı destekler; sunucu maliyetini ufaltmak için sabit bir dosya deposu kullanır.

Eğer uygulamanız [electron-builder](https://github.com/electron-userland/electron-builder) ile paketlenmişse [electron-updater](https://www.electron.build/auto-update) modülünü kullanabilirsiniz, herhangi bir sunucu gerektirmez ve S3, GitHub yada başka bir sabit dosya barındırıcısı tarafından güncelleştirmelerine izin verir.

## Uygulamanızda güncelleştirmeleri uygulama

Güncelleme sunucunuzu düzenledikten sonra, kodunuza gerekli modülleri içe aktarmaya devam edin. Aşağıdaki kod farklı sunucu yazılımı için değişik olabilir, fakat [Hazel](https://github.com/zeit/hazel) kullanırken açıklandığı gibi çalışır.

**Important:** Lütfen aşağıdaki kodun sadece paketlenmiş uygulamanızda yürütüldüğüne, ve geliştirilmede olmadığına emin olun. [electron-is-dev](https://github.com/sindresorhus/electron-is-dev)'i çevreyi denetlemek için kullanabilirsiniz.

```js
const {app, autoUpdater, dialog} = require('electron')
```

Daha sonra, güncelleştirme sunucusunun URL'sini yapılandırın ve [autoUpdater](../api/auto-updater.md)'a söyleyin:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Son adım olarak, güncelleştirmeleri kontrol edin. Aşağıdaki örnekte her dakika kontrol edilecektir:

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