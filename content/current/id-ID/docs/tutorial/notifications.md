# Pemberitahuan (Windows, Linux, macOS)

## Sekilas

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](../api/notification.md) module.

## Contoh

### Show notifications in the Renderer process

Assuming you have a working Electron application from the [Quick Start Guide](quick-start.md), add the following line to the `index.html` file before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

and add the `renderer.js` file:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

After launching the Electron application, you should see the notification:

![Notification in the Renderer process](../images/notification-renderer.png)

If you open the Console and then click the notification, you will see the message that was generated after triggering the `onclick` event:

![Onclick message for the notification](../images/message-notification-renderer.png)

### Show notifications in the Main process

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```js
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

After launching the Electron application, you should see the notification:

![Notification in the Main process](../images/notification-main.png)

## Additional information

Sementara kode dan pengalaman pengguna di seluruh sistem operasi serupa, ada perbedaan halus.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Namun perlu dicatat bahwa itu tidak perlu disematkan ke layar Start.
* Pada Windows 7, notifikasi bekerja melalui penerapan khusus yang secara visual menyerupai yang asli pada sistem yang lebih baru.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) yourself.

Selanjutnya, pada Windows 8, panjang maksimum untuk badan notifikasi adalah 250 karakter, dengan tim Windows merekomendasikan agar pemberitahuan harus disimpan hingga 200 karakter. Yang mengatakan, pembatasan itu telah dihapus di Windows 10, dengan tim Windows meminta pengembang untuk masuk akal. Mencoba mengirim sejumlah besar teks ke API (ribuan karakter) dapat menyebabkan ketidakstabilan.

#### Pemberitahuan Lanjutan

Versi Windows selanjutnya memungkinkan pemberitahuan lanjutan, dengan template khusus, gambar, dan elemen fleksibel lainnya. Untuk mengirim pemberitahuan tersebut (dari proses utama atau proses renderer), menggunakan userland modul [elektron-windows-pemberitahuan](https://github.com/felixrieseberg/electron-windows-notifications), yang menggunakan asli Node addons untuk mengirim `ToastNotification` dan `TileNotification` objek.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### Jam Tenang / Mode Presentasi

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

Notifikasi adalah lurus ke depan pada macOS, tetapi Anda harus menyadari [Apple Human Interface panduan mengenai pemberitahuan](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Perhatikan bahwa notifikasi dibatasi hingga 256 byte dan akan terpotong jika melebihi batas tersebut.

#### Pemberitahuan Lanjutan

Versi macOS nanti memungkinkan pemberitahuan dengan bidang masukan, yang memungkinkan pengguna membalas dengan cepat ke pemberitahuan. Untuk mengirim notifikasi dengan field masukan, gunakan modul userland [node-mac-notifier ](https://github.com/CharlieHess/node-mac-notifier).

#### Jangan ganggu / Sesi Negara

Untuk mendeteksi apakah Anda diizinkan mengirim pemberitahuan atau tidak, gunakan modul [pemberitahuan modul elektronika](https://github.com/felixrieseberg/electron-notification-state).

Ini akan memungkinkan Anda mendeteksi sebelumnya apakah pemberitahuan akan ditampilkan atau tidak.

### Linux

Notifikasi dikirim menggunakan `libnotify` yang dapat menampilkan pemberitahuan di lingkungan desktop mana pun yang mengikuti [Spesifikasi Pemberitahuan Desktop](https://developer.gnome.org/notification-spec/), termasuk Cinnamon, Enlightenment, Unity, GNOME, KDE.
