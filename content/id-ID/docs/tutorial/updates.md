# Memperbarui Aplikasi

Ada beberapa cara untuk mengupdate aplikasi Elektron . The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Menyebarkan server pembaruan

To get started, you first need to deploy a server that the [autoUpdater](../api/auto-updater.md) module will download new updates from.

Bergantung pada kebutuhan Anda, Anda dapat memilih salah satu dari ini:

- [ Hazel ](https://github.com/zeit/hazel) - Perbarui server untuk aplikasi pribadi atau sumber terbuka. Dapat digunakan secara gratis di [ Sekarang ](https://zeit.co/now) (menggunakan satu perintah), menarik dari [ GitHub Releases ](https://help.github.com/articles/creating-releases/) dan memanfaatkan kekuatan CDN GitHub.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [ elektron-release-server ](https://github.com/ArekSredzki/electron-release-server) - Menyediakan dashboard untuk menangani pelepasan
- [ Nucleus ](https://github.com/atlassian/nucleus) - Server pembaruan lengkap untuk aplikasi Elektron yang dikelola oleh Atlassian. Mendukung beberapa aplikasi dan saluran; menggunakan toko file statis untuk meminimalkan biaya server.

If your app is packaged with [electron-builder](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host.

## Menerapkan pembaruan di aplikasi Anda

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```js
const {app, autoUpdater, dialog} = membutuhkan ('elektron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Sebagai langkah terakhir, periksa update. Contoh di bawah ini akan memeriksa setiap menit:

```js
setInterval (() = & gt; {
   autoUpdater.checkForUpdates ()}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Menerapkan pembaruan

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
autoUpdater.on ('error', message = & gt; {
   console.error ('Ada masalah saat memperbarui aplikasi')
   console.error (message)})
```