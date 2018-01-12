# Integrasi Lingkungan Desktop

sistem operasi yang berbeda menyediakan fitur yang berbeda untuk mengintegrasikan aplikasi desktop ke dalam lingkungan desktop mereka. Sebagai contoh, pada Windows , aplikasi dapat menempatkan shortcut di jumplist dari task bar, dan di Mac, aplikasi dapat menempatkan sebuah menu kustom di dermaga menu.

Panduan ini menjelaskan cara untuk mengintegrasikan aplikasi Anda ke orang-orang lingkungan desktop dengan Electron API.

## pemberitahuan

Lihat  Pemberitahuan </ 0></p> 

## Dokumen terbaru (Windows & macOS)

Jendela dan MacOS menyediakan akses mudah untuk daftar dokumen baru-baru ini dibuka oleh aplikasi melalui jumplist atau dermaga menu, masing-masing.

**jumplist:**

![Daftar Langsung Berkas Terbaru](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menu dermaga aplikasi:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

To add a file to recent documents, you can use the [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API to empty the recent documents list:

```javascript
onst {app} = require('electron')
app.clearRecentDocuments()
```

### catatan Windows

Agar dapat menggunakan fitur ini pada Windows , aplikasi Anda harus terdaftar sebagai handler dari jenis file dokumen, jika file tersebut tidak akan muncul di jumplist bahkan setelah Anda telah menambahkan. You can find everything on registering your application in [Application Registration](https://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx).

Ketika pengguna mengklik file dari jumplist, contoh baru dari aplikasi Anda akan mulai dengan path dari file ditambahkan sebagai argumen baris perintah.

### Catatan macOS

Ketika sebuah file yang diminta dari menu dokumen terakhir, `open-file` acara dari `app` modul akan dipancarkan untuk itu.

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

<p><img src="http://i.msdn.microsoft.com/dynimg/IC420539.png" alt="IE" /></p>

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

![pemain](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) to set thumbnail toolbar in your application:

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

![berani](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Progress Bar di Bar Tugas ( Windows, MacOS, Unity)

Pada Windows tombol taskbar bisa digunakan untuk menampilkan progress bar. Ini memungkinkan sebuah jendela untuk memberikan informasi kemajuan kepada pengguna tanpa pengguna harus melakukannya beralih ke jendela itu sendiri.

Pada MacOS progress bar akan ditampilkan sebagai bagian dari dermaga ikon.

Pada Unity DE juga memiliki fitur serupa yang memungkinkan Anda untuk menentukan kemajuan bar di peluncur.

**Progres bar di tombol taskbar:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Untuk mengatur progress bar untuk Window, Anda bisa menggunakan [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Ikon Hamparan di Taskbar (Windows)

Pada Windows tombol taskbar bisa menggunakan hamparan kecil untuk menampilkan aplikasi status, seperti dikutip dari MSDN:

> Ikon hamparan berfungsi sebagai pemberitahuan status kontekstual, dan dimaksudkan untuk meniadakan kebutuhan akan ikon status area pemberitahuan terpisah untuk berkomunikasi informasi itu kepada pengguna. Misalnya, status mail baru di Microsoft Pandangan, yang saat ini ditampilkan di area notifikasi, sekarang dapat ditunjukkan melalui overlay pada tombol taskbar. Sekali lagi, Anda harus memutuskan selama Anda siklus pengembangan yang metode yang terbaik untuk aplikasi Anda. Ikon overlay adalah dimaksudkan untuk memasok status, notifikasi atau status lama yang penting status jaringan, status pesan, atau surat baru. Pengguna seharusnya tidak disajikan dengan hamparan atau animasi yang terus berubah.

**Overlay pada tombol taskbar:**

![Tampilan tombol taskbar](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

```javascript
const {BrowserWindow} = membutuhkan ('elektron')
biarkan menang = new BrowserWindow ()
win.setOverlayIcon ('path / to / overlay.png', 'Deskripsi untuk overlay')
```

## Flash Frame (Windows)

Pada Windows Anda dapat menyorot tombol taskbar untuk menarik perhatian pengguna. Ini mirip dengan memantulkan ikon dok pada macos. Dari dokumentasi referensi MSDN:

> Biasanya, sebuah jendela dilemparkan untuk memberi tahu pengguna bahwa jendela membutuhkan perhatian tapi saat ini tidak memiliki fokus keyboard.

Untuk flash tombol taskbar BrowserWindow, Anda bisa menggunakan [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Jangan lupa untuk memanggil metode `flashFrame`dengan`false` untuk mematikan lampu kilat. Di Contoh di atas, itu disebut saat jendela masuk ke fokus, tapi mungkin saja gunakan batas waktu atau acara lain untuk menonaktifkannya.

## Mewakili File of Window (macos)

Pada macOS, sebuah jendela dapat mengatur file yang diwakilinya, sehingga ikon file dapat ditampilkan judul bar dan saat pengguna Command-Click atau Control-Click pada judul path popup akan muncul.

Anda juga dapat mengatur keadaan diedit dari jendela sehingga ikon file dapat menunjukkan apakah dokumen di jendela ini telah dimodifikasi.

**Mewakili menu data popup:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

```javascript
const {BrowserWindow} = membutuhkan ('elektron')
biarkan menang = new BrowserWindow ()
win.setRepresentedFilename ('/ etc / passwd')
win.setDocumentEdited (benar)
```

## Menyeret data dari jendela

Untuk jenis aplikasi tertentu yang memanipulasi data, penting untuk dapat melakukannya untuk menyeret data dari Electron ke aplikasi lain. Untuk menerapkan fitur ini di aplikasi, Anda perlu memanggil `webContents.startDrag(item)`API pada`ondragstart`event.

Di halaman web:

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