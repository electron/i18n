# Memperbarui Aplikasi

Ada beberapa cara untuk mengupdate aplikasi Elektron . The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## Menyebarkan server pembaruan

Untuk memulai, Anda perlu menyebarkan server agar modul  autoUpdater </ 0> akan mengunduh pembaruan baru. </p> 

Bergantung pada kebutuhan Anda, Anda dapat memilih salah satu dari ini:

-  Hazel </ 0> - Perbarui server untuk aplikasi pribadi atau sumber terbuka. Dapat digunakan secara gratis di  Sekarang </ 0> (menggunakan satu perintah), menarik dari  GitHub Releases </ 1> dan memanfaatkan kekuatan CDN GitHub.</li> 
    
    -  Nuts </ 0> - Juga menggunakan  GitHub Releases </ 1> , namun mengupload pembaruan aplikasi pada disk dan mendukung penyimpanan pribadi. </li> 
        
        -  elektron-release-server </ 0> - Menyediakan dashboard untuk menangani pelepasan</li> 
            
            - [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.</ul> 
            
            If your app is packaged with [electron-builder](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host.
            
            ## Implementing updates in your app
            
            Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).
            
            **Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.
            
            ```js
const {app, autoUpdater, dialog} = require('electron')
```
        
        Selanjutnya, buatlah URL server update dan beri tahu  autoUpdater </ 0> tentangnya: </p> 
        
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