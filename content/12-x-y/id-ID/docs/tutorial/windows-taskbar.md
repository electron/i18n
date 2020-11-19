# Windows Taskbar

## Sekilas

Electron has APIs to configure the app's icon in the Windows taskbar. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## jumplist

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN][msdn-jumplist]:

> Aplikasi mendefinisikan tugas berdasarkan kedua fitur program dan kunci hal pengguna diharapkan untuk melakukan dengan mereka. Tugas harus bebas konteks, dalam bahwa aplikasi tidak perlu berjalan bagi mereka untuk bekerja. Mereka juga harus menjadi tindakan statistik yang paling umum bahwa pengguna normal akan tampil di aplikasi, seperti menulis pesan email atau membuka kalender dalam program mail, membuat dokumen baru dalam pengolah kata, meluncurkan aplikasi dalam mode tertentu , atau meluncurkan salah satu subcommands nya. Sebuah aplikasi tidak harus kekacauan menu dengan fitur-fitur canggih yang standar pengguna tidak perlu atau tindakan satu kali seperti pendaftaran. Jangan gunakan tugas untuk barang-barang promosi seperti upgrade atau penawaran khusus.
> 
> Hal ini sangat dianjurkan bahwa daftar tugas statis. Ini harus tetap sama terlepas dari keadaan atau status aplikasi. Meskipun mungkin untuk beragam daftar dinamis, Anda harus mempertimbangkan bahwa ini bisa membingungkan pengguna yang tidak mengharapkan bahwa sebagian dari daftar tujuan untuk mengubah.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API.

#### Contoh

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app } = require('electron')

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### thumbnail Toolbars

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN][msdn-thumbnail]:

> This toolbar is the familiar standard toolbar common control. Ia memiliki maksimal tujuh tombol. Masing-masing tombol ini ID, gambar, tooltip, dan negara didefinisikan dalam struktur, yang kemudian diteruskan ke taskbar. Aplikasi ini dapat menunjukkan, mengaktifkan, menonaktifkan, atau menyembunyikan tombol dari toolbar thumbnail seperti yang dipersyaratkan oleh perusahaan negara saat ini.
> 
> Sebagai contoh, Windows Media Player mungkin menawarkan kontrol media transportasi standar seperti play, pause, mute, dan berhenti.

![pemain](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### Contoh

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Icon Overlays in Taskbar

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN][msdn-icon-overlay]:

> Ikon hamparan berfungsi sebagai pemberitahuan status kontekstual, dan dimaksudkan untuk meniadakan kebutuhan akan ikon status area pemberitahuan terpisah untuk berkomunikasi informasi itu kepada pengguna. Misalnya, status mail baru di Microsoft Pandangan, yang saat ini ditampilkan di area notifikasi, sekarang dapat ditunjukkan melalui overlay pada tombol taskbar. Sekali lagi, Anda harus memutuskan selama Anda siklus pengembangan yang metode yang terbaik untuk aplikasi Anda. Ikon overlay adalah dimaksudkan untuk memasok status, notifikasi atau status lama yang penting status jaringan, status pesan, atau surat baru. Pengguna seharusnya tidak disajikan dengan hamparan atau animasi yang terus berubah.

![Overlay pada tombol taskbar](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### Contoh

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN][msdn-flash-frame]:

> Biasanya, sebuah jendela dilemparkan untuk memberi tahu pengguna bahwa jendela membutuhkan perhatian tapi saat ini tidak memiliki fokus keyboard.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame][flashframe] API.

#### Contoh

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
