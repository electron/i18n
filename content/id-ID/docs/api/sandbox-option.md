# Pilihan `sandbox`

> Membuat sebuah peramban dengan perender yang dapat beroperasi di dalam OS sandbox Chromium. Dengan opsi ini diaktifkan, perender harus berkomunikasi melalui IPC ke proses utama untuk mengakses simpul API. Namun, untuk mengaktifkan OS sandbox Chromium, elektron harus dijalankan dengan argumen baris perintah ` - enable-sandbox `.

Salah satu fitur keamanan Chromium adalah bahwa semua kode rendering / JavaScript yang berkedip dijalankan di dalam sandbox. Sanbox (Kotak pasir) ini menggunakan fitur khusus OS untuk memastikan bahwa eksploitasi di dalam proses perender tidak dapat membahayakan sistem.

Dengan kata lain, ketika sadbox diaktifkan, perender hanya dapat melakukan perubahan pada sistem dengan mendelegasikan tugas ke proses utama melalui IPC. [Berikut](https://www.chromium.org/developers/design-documents/sandbox) adalah informasi lebih lanjut tentang sandbox.

Karena fitur utama dalam elektron adalah kemampuan untuk menjalankan node.js dalam proses perender (membuatnya lebih mudah untuk mengembangkan aplikasi desktop dengan menggunakan teknologi web), sandbox dinonaktifkan oleh elektron. Hal ini karena sebagian besar API node.js memerlukan akses sistem. ` require()` misalnya, tidak mungkin tanpa izin sistem file, yang mana tidak tersedia di dalam sebuah lingkungan yang disandbox.

Biasanya ini bukan masalah untuk aplikasi desktop karena kode selalu bisa dipercaya, namun ini membuat elektron kurang aman dibanding chromium untuk menampilkan konten web yang tidak tepercaya. Untuk aplikasi yang membutuhkan keamanan lebih, bendera ` sandbox ` akan memaksa elektron memunculkan perender chromium klasik yang kompatibel dengan sandbox.

Perender sandbox tidak memiliki sebuah lingkungan node.js yang berjalan dan tidak mengekspos API node.js JavaScript ke kode klien. Satu-satunya pengecualian adalah skrip yang sudah termuat (preload), yang memiliki akses ke sebuah subset dari API perender elektron.

Perbedaan lainnya adalah perender yang disanbox tidak memodifikasi API bawaan JavaScript yang manapun. Consequently, some APIs such as `window.open` will work as they do in chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

## Contoh

Untuk membuat jendela yang disanbox, secara sederhana saja lewatkan nilai `sandbox: true` ke `webPreferences`:

```js
let win 
app.on('ready', () => {
   win = new BrowserWindow({     
     webPreferences: {       
        sandbox: true     
      }   
    })   
   win.loadURL('http://google.com') 
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has node.js disabled and can communicate only via IPC. Kegunaan dari opsi ini adalah menghentikan electron dari membuat sebuah runtime node.js di dalam perender. Also, within this new window `window.open` follows the native behaviour (by default electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

Penting untuk dicatat bahwa opsi ini saja sendiri tidak akan mengaktifkan sanbox yang dipaksa oleh OS. Untuk mengaktifkan fitur ini, argumen baris perintah `--enable-sandbox` harus dilewatkan ke electron, yang akan memaksa `sandbox: true` untuk semua kejadian `BrowserWindow`.

Untuk mengaktifkan sandbox yang dipaksa oleh OS pada `BrowserWindow` atau `webview` yang diproses dengan `sandbox:true` tanpa menyebabkan keseluruhan aplikasi untuk berada di sandbox, `--enable-mixed-sandbox` argumen baris perintah harus dilewatkan ke electron. Opsi tersebut pada saat sekarang hanya didukung pada platform macOS dan Windows.

```js
let win
app.on('ready', () => {
  // tidak perlu untuk melewatkan `sandbox: true` karena `--enable-sandbox` diaktifkan.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

Perhatikan bahwa tidak cukup untuk memanggil `app.commandLine.appendSwitch('--enable-sandbox')`, karena kode startup elektron/node yang berjalan setelahnya memungkinkan untuk melakukan perubahan pada pengaturan kotak sandbox chromium. Pergantian harus dilewatkan ke elektron pada baris-perintah:

```sh
electron --enable-sandbox app.js
```

Adalah tidak mungkin untuk memiliki OS sandbox yang aktif hanya untuk beberapa perender, jika `--enable-sandbox` diaktifkan, jendela elektron normal tidak dapat dibuat.

Jika Anda perlu mencampur peranti yang disandbox dan yang tidak-disandboxed dalam satu aplikasi, cukup hilangkan argumen `--enable-sandbox`. Tanpa argumen ini, jendela yang dibuat dengan `sandbox: true` masih akan memiliki node.js yang dinonaktifkan dan berkomunikasi hanya melalui IPC, yang mana dengan sendirinya sudah mendapatkan keuntungan dari keamanan POV.

## Preload

Sebuah aplikasi dapat membuat penyesuaian pada perender yang disandbox menggunakan skrip pramuat. Berikut adalah contohnya:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  win.loadURL('http://google.com')
})
```

dan preload.js:

```js
// File ini dimuat kapanpun sebuah konteks javascript diciptakan. Ini dijalankan dalam sebuah // lingkup privat yang dapat mengakses sebuah subset API perender electron. Kita harus // berhati-hati untuk tidak membocorkan obyek apapun ke dalam lingkup global!
const fs = require('fs')
const {ipcRenderer} = require('electron')

// membaca file konfigurasi menggunakan modul `fs`
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Hal penting untuk dicatat dalam skrip pramuat:

- Meskipun perender yang disandbox tidak memiliki node.js yang berjalan, ia tetap memiliki akses ke lingkungan mirip-node yang terbatas: `Buffer `, `process `, `setImmediate` dan `require` tersedia.
- Skrip pramuat dapat mengakses secara langsung seluruh API dari proses utama melalui modul `remote` dan `ipcRenderer`. Ini adalah bagaimana `fs` (yang digunakan di atas) dan modul-modul lain diimplementasikan. Mereka adalah proxy-proxy untuk mengendalikan rekanan dalam proses utama.
- Skrip pramuat harus dimuat dalam satu skrip tunggal, namun memungkinkan untuk memiliki kode pramuat kompleks yang disusun dengan beberapa modul dengan menggunakan alat seperti browserify, seperti yang dijelaskan di bawah ini. Pada kenyataanya, browserify sudah digunakan oleh electron untuk menyediakan lingkungan mirip-node untuk skrip pramuat.

Untuk membuat bundel browserify dan menggunakannya sebagai skrip pramuat, sesuatu seperti berikut ini harus digunakan:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

Bendera `-x` harus digunakan bersama modul yang dibutuhkan yang sudah terekspos dalam lingkup pramuat, dan memberitahukan browserify untuk menggunakan fungsi `require` terlampir, untuknya. `--insert-global-vars` akan memastikan bahwa `proses`, `Buffer` dan `setImmediate` juga diambil dari lingkup yang melekat (biasanya browserify menyuntikkan kode untuk mereka).

Saat ini fungsi `require` yang disediakan dalam lingkup pramuat memaparkan modul sebagai berikut:

- `child_process`
- `electron` 
  - `kerusakanReporter`
  - `remot`
  - `ipcRenderer`
  - `webBingkai`
- `fs`
- `os`
- `timer`
- `url`

Lebih lanjut boleh ditambahkan lagi sesuai dengan kebutuhan untuk mengekspos lebih banyak API elektron di sandbox, namun setiap modul dalam proses utama sudah dapat digunakan melalui `electron.remote.require`.

## Status

Silahkan gunakan opsi `sandbox` dengan hati-hati, karena fitur ini masih fitur percobaan. Kami masih belum mengetahui implikasi keamanan dari pengeksposan beberapa API perender electron terhadap skrip pramuat, namun berikut ini beberapa hal yang perlu dipertimbangkan sebelum melakukan render terhadap konten yang tidak terpercaya:

- A preload script can accidentally leak privileged APIs to untrusted code.
- Beberapa bug pada mesin V8 memungkinkan kode berbahaya mengakses API pramuat perender, yang secara efektif memberikan akses penuh ke sistem melalui modul `remote`.

Karena merender konten yang tidak tepercaya di wilayah elektron masih belum dipetakan, API yang terpapar pada skrip pramuat sandbox harus dianggap lebih tidak stabil daripada API elektron lainnya, dan mungkin telah melanggar perubahan untuk memperbaiki masalah keamanan.

Satu peningkatan yang direncanakan yang akan sangat meningkatkan keamanan adalah dengan memblokir pesan IPC dari perender yang disandbox secara bawaan, memungkinkan proses utama menentukan secara eksplisit serangkaian pesan yang diizinkan dikirim oleh perender.