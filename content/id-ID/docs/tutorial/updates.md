# Memperbarui Aplikasi

Ada beberapa cara untuk mengupdate aplikasi Elektron . Yang paling mudah dan resmi didukung satu adalah mengambil keuntungan dari built-in [ Squirrel ](https://github.com/Squirrel) framework dan Electron [ AutoUpdater ](../api/auto-updater.md) modul. 

## Menyebarkan server pembaruan

Untuk memulai, Anda perlu menyebarkan server agar modul [ autoUpdater ](../api/auto-updater.md) akan mengunduh pembaruan baru. 

Bergantung pada kebutuhan Anda, Anda dapat memilih salah satu dari ini:

- [ Hazel ](https://github.com/zeit/hazel) - Perbarui server untuk aplikasi pribadi atau sumber terbuka. Dapat digunakan secara gratis di [ Sekarang ](https://zeit.co/now) (menggunakan satu perintah), menarik dari [ GitHub Releases ](https://help.github.com/articles/creating-releases/) dan memanfaatkan kekuatan CDN GitHub.
- [ Nuts ](https://github.com/GitbookIO/nuts) - Juga menggunakan [ GitHub Releases ](https://help.github.com/articles/creating-releases/) , namun mengupload pembaruan aplikasi pada disk dan mendukung penyimpanan pribadi. 
- [ elektron-release-server ](https://github.com/ArekSredzki/electron-release-server) - Menyediakan dashboard untuk menangani pelepasan
- [ Nucleus ](https://github.com/atlassian/nucleus) - Server pembaruan lengkap untuk aplikasi Elektron yang dikelola oleh Atlassian. Mendukung beberapa aplikasi dan saluran; menggunakan toko file statis untuk meminimalkan biaya server.

Jika aplikasi Anda dikemas dengan [ pembangun elektron ](https://github.com/electron-userland/electron-builder) Anda dapat menggunakan modul [ electron-updater ](https://www.electron.build/auto-update) , yang tidak memerlukan server dan memungkinkan pembaruan dari S3, GitHub atau perangkat statis lainnya. file host 

## Menerapkan pembaruan di aplikasi Anda

Setelah Anda menyebarkan server pembaruan Anda, lanjutkan dengan mengimpor modul yang diperlukan dalam kode Anda. Kode berikut mungkin berbeda untuk perangkat lunak server yang berbeda , namun berfungsi seperti dijelaskan saat menggunakan [ Hazel ](https://github.com/zeit/hazel) . 

** Penting: ** Pastikan kode di bawah ini hanya akan dijalankan di aplikasi kemasan Anda, dan bukan dalam pengembangan. Anda bisa menggunakan [ electron-is-dev ](https://github.com/sindresorhus/electron-is-dev) untuk memeriksa lingkungan. 

```js
const {app, autoUpdater, dialog} = membutuhkan ('elektron')
```

Selanjutnya, buatlah URL server update dan beri tahu [ autoUpdater ](../api/auto-updater.md) tentangnya: 

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

Setelah aplikasi Anda  dikemas </ 0> , maka akan menerima update untuk setiap  GitHub Release </ 1> yang baru saja Anda publikasikan. </p> 

## Menerapkan pembaruan

Setelah Anda mengonfigurasikan mekanisme pembaruan dasar untuk aplikasi Anda, Anda harus memastikan bahwa pengguna akan diberitahu bila ada pembaruan. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

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