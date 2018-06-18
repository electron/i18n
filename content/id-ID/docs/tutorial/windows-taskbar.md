# Windows Taskbar

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## jumplist

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> Aplikasi mendefinisikan tugas berdasarkan kedua fitur program dan kunci hal pengguna diharapkan untuk melakukan dengan mereka. Tugas harus bebas konteks, dalam bahwa aplikasi tidak perlu berjalan bagi mereka untuk bekerja. Mereka juga harus menjadi tindakan statistik yang paling umum bahwa pengguna normal akan tampil di aplikasi, seperti menulis pesan email atau membuka kalender dalam program mail, membuat dokumen baru dalam pengolah kata, meluncurkan aplikasi dalam mode tertentu , atau meluncurkan salah satu subcommands nya. Sebuah aplikasi tidak harus kekacauan menu dengan fitur-fitur canggih yang standar pengguna tidak perlu atau tindakan satu kali seperti pendaftaran. Jangan gunakan tugas untuk barang-barang promosi seperti upgrade atau penawaran khusus.
> 
> Hal ini sangat dianjurkan bahwa daftar tugas statis. Ini harus tetap sama terlepas dari keadaan atau status aplikasi. Meskipun mungkin untuk beragam daftar dinamis, Anda harus mempertimbangkan bahwa ini bisa membingungkan pengguna yang tidak mengharapkan bahwa sebagian dari daftar tujuan untuk mengubah.

**Tugas dari Internet Explorer:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

Berbeda dengan menu dock di MacOS yang merupakan menu yang nyata, tugas-tugas pengguna di Windows bekerja seperti shortcut aplikasi tersebut bahwa ketika pengguna mengklik tugas, program akan dieksekusi dengan argumen tertentu.

Untuk mengatur tugas-tugas pengguna untuk aplikasi Anda, Anda dapat menggunakan  app.setUserTasks </ 0> API :</p> 

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

To clean your tasks list, call `app.setUserTasks` with an empty array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Tugas pengguna masih akan menunjukkan bahkan setelah aplikasi Anda menutup, sehingga ikon dan program jalan yang ditentukan untuk suatu tugas harus ada sampai aplikasi Anda dihapus.

## thumbnail Toolbars

Pada Windows Anda dapat menambahkan toolbar thumbnail dengan tombol yang ditetapkan dalam tata letak taskbar dari jendela aplikasi. Ini memberikan pengguna cara untuk mengakses perintah jendela tertentu tanpa memulihkan atau mengaktifkan jendela.

Dari MSDN, itu bergambar:

> This toolbar is the familiar standard toolbar common control. Ia memiliki maksimal tujuh tombol. Masing-masing tombol ini ID, gambar, tooltip, dan negara didefinisikan dalam struktur, yang kemudian diteruskan ke taskbar. Aplikasi ini dapat menunjukkan, mengaktifkan, menonaktifkan, atau menyembunyikan tombol dari toolbar thumbnail seperti yang dipersyaratkan oleh perusahaan negara saat ini.
> 
> Sebagai contoh, Windows Media Player mungkin menawarkan kontrol media transportasi standar seperti play, pause, mute, dan berhenti.

**Toolbar thumbnail Windows Media Player:**

![pemain](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Anda dapat menggunakan [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) untuk mengatur toolbar thumbnail dalam aplikasi Anda:

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

Untuk membersihkan tombol thumbnail toolbar, hanya memanggil `BrowserWindow.setThumbarButtons` dengan array kosong:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

Pada Windows tombol taskbar bisa menggunakan hamparan kecil untuk menampilkan aplikasi status, seperti dikutip dari MSDN:

> Ikon hamparan berfungsi sebagai pemberitahuan status kontekstual, dan dimaksudkan untuk meniadakan kebutuhan akan ikon status area pemberitahuan terpisah untuk berkomunikasi informasi itu kepada pengguna. Misalnya, status mail baru di Microsoft Pandangan, yang saat ini ditampilkan di area notifikasi, sekarang dapat ditunjukkan melalui overlay pada tombol taskbar. Sekali lagi, Anda harus memutuskan selama Anda siklus pengembangan yang metode yang terbaik untuk aplikasi Anda. Ikon overlay adalah dimaksudkan untuk memasok status, notifikasi atau status lama yang penting status jaringan, status pesan, atau surat baru. Pengguna seharusnya tidak disajikan dengan hamparan atau animasi yang terus berubah.

**Tampilan tombol taskbar:**

![Overlay pada tombol taskbar](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Mengatur ikon overlay untuk jendela, Anda dapat menggunakan [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

```javascript
const {BrowserWindow} = membutuhkan ('elektron')
biarkan menang = new BrowserWindow ()
win.setOverlayIcon ('path / to / overlay.png', 'Deskripsi untuk overlay')
```

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Biasanya, sebuah jendela dilemparkan untuk memberi tahu pengguna bahwa jendela membutuhkan perhatian tapi saat ini tidak memiliki fokus keyboard.

Untuk flash tombol taskbar BrowserWindow, Anda bisa menggunakan [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Jangan lupa untuk memanggil metode `flashFrame`dengan`false` untuk mematikan lampu kilat. Di Contoh di atas, itu disebut saat jendela masuk ke fokus, tapi mungkin saja gunakan batas waktu atau acara lain untuk menonaktifkannya.