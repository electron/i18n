# Memperbarui Aplikasi

Ada beberapa cara untuk mengupdate aplikasi Elektron . Yang sangat mudah dan Secara resmi didukung salah satunya adalah keuntungan dari built-in  Squirrel </ 0> kerangka dan Modul  autoUpdater </ 1> elektron.</p> 

## Deploying an Update Server

Untuk memulai, pertama Anda perlu menyebarkan server  AutoUpdater </ 0> modul akan mendownload update baru darinya.</p> 

Bergantung pada kebutuhan Anda, Anda dapat memilih salah satu dari ini:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

If your app is packaged with [`electron-builder`](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Implementing Updates in Your App

Setelah mengeposkan server pembaruan Anda, lanjutkan dengan mengimpor yang diperlukan dalam modul kode Anda. Kode berikut mungkin berbeda untuk server yang berbeda perangkat lunak, tapi bekerja seperti dijelaskan saat menggunakan [Hazel](https://github.com/zeit/hazel).

**Penting:** Pastikan kode di bawah ini hanya akan dijalankan dalam aplikasi kemasan Anda, dan tidak dalam pengembangan. Kamu dapat memakai [elektron-is-dev](https://github.com/sindresorhus/electron-is-dev) untuk memeriksa lingkungan.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Selanjutnya, buatlah URL server update dan beri tahu [autoUpdater](../api/auto-updater.md) tentangnya:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Sebagai langkah terakhir, periksa update. Contoh di bawah ini akan memeriksa setiap menit:

```javascript
setInterval (() = & gt; {
   autoUpdater.checkForUpdates ()}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying Updates

Sekarang setelah Anda mengonfigurasi mekanisme pembaruan dasar untuk aplikasi Anda, Anda perlu memastikan bahwa pengguna akan diberitahu bila ada update. Ini dapat dicapai dengan menggunakan API AutoUpdater [acara](../api/auto-updater.md#events):

```javascript
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

Pastikan juga kesalahannya [ditangani](../api/auto-updater.md#event-error). Inilah contohnya untuk menempuh mereka ke `stderr`:

```javascript
autoUpdater.on ('error', message = & gt; {
   console.error ('Ada masalah saat memperbarui aplikasi')
   console.error (message)})
```