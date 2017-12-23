# Integrasi Lingkungan Desktop

sistem operasi yang berbeda menyediakan fitur yang berbeda untuk mengintegrasikan aplikasi desktop ke dalam lingkungan desktop mereka. Sebagai contoh, pada Windows , aplikasi dapat menempatkan shortcut di jumplist dari task bar, dan di Mac, aplikasi dapat menempatkan sebuah menu kustom di dermaga menu.

Panduan ini menjelaskan cara untuk mengintegrasikan aplikasi Anda ke orang-orang lingkungan desktop dengan Electron API.

## pemberitahuan

Lihat  Pemberitahuan </ 0></p> 

## Dokumen terbaru (Windows & macOS)

Jendela dan MacOS menyediakan akses mudah untuk daftar dokumen baru-baru ini dibuka oleh aplikasi melalui jumplist atau dermaga menu, masing-masing.

**jumplist:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menu dermaga aplikasi:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

Untuk menambahkan file ke dokumen baru-baru ini, Anda dapat menggunakan  app.addRecentDocument </ 0> API :</p> 

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Dan Anda dapat menggunakan [app.clearRecentDocuments ](../api/app.md#appclearrecentdocuments-os-x-windows) API untuk mengosongkan daftar dokumen baru-baru:

```javascript
onst {app} = require('electron')
app.clearRecentDocuments()
```

### catatan Windows

Agar dapat menggunakan fitur ini pada Windows , aplikasi Anda harus terdaftar sebagai handler dari jenis file dokumen, jika file tersebut tidak akan muncul di jumplist bahkan setelah Anda telah menambahkan. Anda dapat menemukan semuanya di mendaftarkan aplikasi Anda di  Aplikasi Pendaftaran </ 0> .</p> 

Ketika pengguna mengklik file dari jumplist, contoh baru dari aplikasi Anda akan mulai dengan path dari file ditambahkan sebagai argumen baris perintah.

### Catatan macOS

Ketika sebuah file yang diminta dari menu dokumen terakhir, `open-file` acara dari `aplikasi` modul akan dipancarkan untuk itu.

## Dock Menu kustom (macOS)

MacOS memungkinkan pengembang untuk menentukan menu kustom untuk dock , yang biasanya berisi beberapa cara pintas untuk fitur yang umum digunakan dari aplikasi Anda:

**Menu dermaga Terminal.app:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

Untuk mengatur kustom Anda dock menu, Anda dapat menggunakan ` aplikasi. dermaga .setMenu </ 0>  API , yang hanya tersedia di MacOS :</p>

<pre><code class="javascript">const {app, Menu} = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {label: 'New Window', click () { console.log('New Window') }},
  {label: 'New Window with Settings',
    submenu: [
      {label: 'Basic'},
      {label: 'Pro'}
    ]
  },
  {label: 'New Command...'}
])
app.dock.setMenu(dockMenu)         
        
`</pre> 

## Pengguna Tugas ( Windows )

Pada Windows Anda dapat menentukan tindakan kustom dalam ` Tugas </ 0> kategori jumplist, seperti dikutip dari MSDN:</p>

<blockquote>
  <p>Aplikasi mendefinisikan tugas berdasarkan kedua fitur program dan kunci
   hal pengguna diharapkan untuk melakukan dengan mereka. Tugas harus bebas konteks, dalam
   bahwa aplikasi tidak perlu berjalan bagi mereka untuk bekerja. Mereka
   juga harus menjadi tindakan statistik yang paling umum bahwa pengguna normal akan
   tampil di aplikasi, seperti menulis pesan email atau membuka
   kalender dalam program mail, membuat dokumen baru dalam pengolah kata, meluncurkan
   aplikasi dalam mode tertentu , atau meluncurkan salah satu subcommands nya. Sebuah
   aplikasi tidak harus kekacauan menu dengan fitur-fitur canggih yang standar
   pengguna tidak perlu atau tindakan satu kali seperti pendaftaran. Jangan gunakan tugas
   untuk barang-barang promosi seperti upgrade atau penawaran khusus.</p>
  
  <p>Hal ini sangat dianjurkan bahwa daftar tugas statis. Ini harus tetap
   sama terlepas dari keadaan atau status aplikasi. Meskipun
   mungkin untuk beragam daftar dinamis, Anda harus mempertimbangkan bahwa ini bisa
   membingungkan pengguna yang tidak mengharapkan bahwa sebagian dari daftar tujuan untuk
   mengubah.</p>
</blockquote>

<p><strong>Tugas dari Internet Explorer:</strong></p>

<p><img src="https://msdn.microsoft.com/dynimg/IC420539.png" alt="IE" /></p>

<p>Berbeda dengan menu dock di MacOS yang merupakan menu yang nyata, tugas-tugas pengguna di Windows bekerja seperti shortcut aplikasi tersebut bahwa ketika pengguna mengklik tugas, program akan dieksekusi dengan argumen tertentu.</p>

<p>Untuk mengatur tugas-tugas pengguna untuk aplikasi Anda, Anda dapat menggunakan
 <a href="../api/app.md#appsetusertaskstasks-windows"> app.setUserTasks </ 0>  API :</p>

<pre><code class="javascript">const {app} = require('electron')
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
`</pre> 

Untuk membersihkan daftar tugas Anda, silahkan hubungi `app.setUserTasks` dengan array kosong:

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

Tugas pengguna masih akan menunjukkan bahkan setelah aplikasi Anda menutup, sehingga ikon dan program jalan yang ditentukan untuk suatu tugas harus ada sampai aplikasi Anda dihapus.

## thumbnail Toolbars

Pada Windows Anda dapat menambahkan toolbar thumbnail dengan tombol yang ditetapkan dalam tata letak taskbar dari jendela aplikasi. Ini memberikan pengguna cara untuk mengakses perintah jendela tertentu tanpa memulihkan atau mengaktifkan jendela.

Dari MSDN, itu bergambar:

> toolbar ini adalah cukup akrab toolbar standar kontrol umum. Ia memiliki maksimal tujuh tombol. Masing-masing tombol ini ID, gambar, tooltip, dan negara didefinisikan dalam struktur, yang kemudian diteruskan ke taskbar. Aplikasi ini dapat menunjukkan, mengaktifkan, menonaktifkan, atau menyembunyikan tombol dari toolbar thumbnail seperti yang dipersyaratkan oleh perusahaan negara saat ini.
> 
> Sebagai contoh, Windows Media Player mungkin menawarkan kontrol media transportasi standar seperti play, pause, mute, dan berhenti.

**Toolbar thumbnail Windows Media Player:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Anda dapat menggunakan [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows-7) untuk mengatur toolbar thumbnail dalam aplikasi Anda:

```javascript
const {BrowserWindow} = require('electron')
const path = require('path')

let win = new BrowserWindow({
  width: 800,
  height: 600
})

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  },
  {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Untuk membersihkan tombol thumbnail toolbar, hanya memanggil `BrowserWindow.setThumbarButtons` dengan array kosong:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Kesatuan Launcher pintas (Linux)

Dalam Unity, Anda dapat menambahkan entri kustom untuk peluncur nya melalui memodifikasi `.desktop` file, lihat [Menambahkan Shortcut ke Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher) .

**pintas peluncur dari Audacious:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Progress Bar di Taskbar ( Windows , MacOS , Unity)

Pada Windows tombol taskbar bisa digunakan untuk menampilkan progress bar. Hal ini memungkinkan sebuah jendela untuk memberikan informasi kemajuan kepada pengguna tanpa pengguna harus beralih ke jendela itu sendiri.

Pada MacOS progress bar akan ditampilkan sebagai bagian dari dermaga ikon.

Kesatuan DE juga memiliki fitur serupa yang memungkinkan Anda untuk menentukan progress bar di peluncur.

**Kemajuan bar di taskbar tombol:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Untuk mengatur progress bar untuk Window, Anda dapat menggunakan [BrowserWindow.setProgressBar ](../api/browser-window.md#winsetprogressbarprogress) API :

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Icon Overlays in Taskbar (Windows)

On Windows a taskbar button can use a small overlay to display application status, as quoted from MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows-7) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame (Windows)

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

## Represented File of Window (macOS)

On macOS a window can set its represented file, so the file's icon can show in the title bar and when users Command-Click or Control-Click on the title a path popup will show.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

**Represented file popup menu:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-os-x) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-os-x) APIs:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Dragging files out of the window

For certain kinds of apps that manipulate on files, it is important to be able to drag files from Electron to other apps. To implement this feature in your app, you need to call `webContents.startDrag(item)` API on `ondragstart` event.

In web page:

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Dalam proses utamanya:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```