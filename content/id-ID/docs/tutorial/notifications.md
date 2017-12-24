# Pemberitahuan (Windows, Linux, macOS)

Ketiga sistem operasi tersebut menyediakan sarana bagi aplikasi untuk mengirim pemberitahuan ke pengguna. Elektron memudahkan pengembang untuk mengirim notifikasi dengan [HTML5 Notification API](https://notifications.spec.whatwg.org/), menggunakan API pemberitahuan asli sistem operasi yang sedang berjalan untuk menampilkannya.

**Catatan:** Karena ini adalah API HTML5, ini hanya tersedia dalam proses renderer. Jika Anda ingin menampilkan Notifikasi dalam proses utama, periksa modul [Notification](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Sementara kode dan pengalaman pengguna di seluruh sistem operasi serupa, ada perbedaan halus.

## Windows

* Pada Windows 10, notifikasi "just work".
* Pada Windows 8.1 dan Windows 8, jalan pintas ke aplikasi Anda, dengan [User ID Model Aplikasi](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx), harus diinstal ke layar Start. Namun perlu dicatat bahwa itu tidak perlu disematkan ke layar Start.
* Pada Windows 7, notifikasi bekerja melalui penerapan khusus yang secara visual menyerupai yang asli pada sistem yang lebih baru.

Selanjutnya, pada Windows 8, panjang maksimum untuk badan notifikasi adalah 250 karakter, dengan tim Windows merekomendasikan agar pemberitahuan harus disimpan hingga 200 karakter. Yang mengatakan, pembatasan itu telah dihapus di Windows 10, dengan tim Windows meminta pengembang untuk masuk akal. Mencoba mengirim sejumlah besar teks ke API (ribuan karakter) dapat menyebabkan ketidakstabilan.

### Pemberitahuan Lanjutan

Versi Windows selanjutnya memungkinkan pemberitahuan lanjutan, dengan template khusus, gambar, dan elemen fleksibel lainnya. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Jam Tenang / Mode Presentasi

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Hal ini memungkinkan Anda untuk menentukan sebelumnya apakah Windows diam-diam akan membuang notifikasi atau tidak.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Pemberitahuan Lanjutan

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.