# Memperbarui Aplikasi

Ada beberapa cara untuk mengupdate aplikasi Elektron . Yang sangat mudah dan Secara resmi didukung salah satunya adalah keuntungan dari built-in  Squirrel </ 0> kerangka dan Modul  autoUpdater </ 1> elektron.</p> 

## Menyebarkan server pembaruan

Untuk memulai, pertama Anda perlu menyebarkan server  AutoUpdater </ 0> modul akan mendownload update baru darinya.</p> 

Bergantung pada kebutuhan Anda, Anda dapat memilih salah satu dari ini:

- [ Hazel ](https://github.com/zeit/hazel) - Perbarui server untuk aplikasi pribadi atau sumber terbuka. Dapat digunakan secara gratis di [ Sekarang ](https://zeit.co/now) (menggunakan satu perintah), menarik dari [ GitHub Releases ](https://help.github.com/articles/creating-releases/) dan memanfaatkan kekuatan CDN GitHub.
-  Nuts </ 0> - Juga digunakan  GitHub Rilis </ 1>, namun mengupload pembaruan aplikasi pada disk dan juga mendukung penyimpanan pribadi.</li> 
    
    - [ elektron-release-server ](https://github.com/ArekSredzki/electron-release-server) - Menyediakan dashboard untuk menangani pelepasan
    - [ Nucleus ](https://github.com/atlassian/nucleus) - Server pembaruan lengkap untuk aplikasi Elektron yang dikelola oleh Atlassian. Mendukung beberapa aplikasi dan saluran; menggunakan toko file statis untuk meminimalkan biaya server.</ul> 
    
    Jika aplikasi Anda dikemas dengan  pembangun elektron </ 0> Anda dapat menggunakan elektron-updater </ 1> module, yang tidak memerlukan server dan memungkinkan untuk pembaruan dari S3, GitHub atau host file statis lainnya.</p> 
    
    ## Menerapkan pembaruan di aplikasi Anda
    
    Setelah mengeposkan server pembaruan Anda, lanjutkan dengan mengimpor yang diperlukan dalam modul kode Anda. Kode berikut mungkin berbeda untuk server yang berbeda perangkat lunak, tapi bekerja seperti dijelaskan saat menggunakan [Hazel](https://github.com/zeit/hazel).
    
    **Penting:** Pastikan kode di bawah ini hanya akan dijalankan dalam aplikasi kemasan Anda, dan tidak dalam pengembangan. Kamu dapat memakai [elektron-is-dev](https://github.com/sindresorhus/electron-is-dev) untuk memeriksa lingkungan.
    
    ```js
const {app, autoUpdater, dialog} = membutuhkan ('elektron')
```

Selanjutnya, buatlah URL server update dan beri tahu [autoUpdater](../api/auto-updater.md) tentangnya:

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

Setelah aplikasi Anda [dikemas](../tutorial/application-distribution.md), itu akan menerima update untuk masing-masing baru [GitHub Rilis](https://help.github.com/articles/creating-releases/) bahwa Anda menerbitkannya.

## Menerapkan pembaruan

Sekarang setelah Anda mengonfigurasi mekanisme pembaruan dasar untuk aplikasi Anda, Anda perlu memastikan bahwa pengguna akan diberitahu bila ada update. Ini dapat dicapai dengan menggunakan API AutoUpdater [acara](../api/auto-updater.md#events):

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

Pastikan juga kesalahannya [ditangani](../api/auto-updater.md#event-error). Inilah contohnya untuk menempuh mereka ke `stderr`:

```js
autoUpdater.on ('error', message = & gt; {
   console.error ('Ada masalah saat memperbarui aplikasi')
   console.error (message)})
```