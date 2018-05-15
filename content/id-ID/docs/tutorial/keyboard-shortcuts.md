# Cara pintas keyboard

> Configure local and global keyboard shortcuts

## Local Shortcuts

Anda dapat menggunakan modul  Menu </ 0> untuk mengkonfigurasi cara pintas keyboard yang hanya akan dipicu saat aplikasi difokuskan. Untuk melakukannya, tentukan properti [ ` akselerator </ 0> ] saat membuat <a href="../api/menu-item.md"> MenuItem </ 1> .</p>

<pre><code class="js">const {Menu, MenuItem} = require ('electron') const menu = new Menu () menu.append (menu baruT ({
   label: 'Cetak',
   akselerator: 'CmdOrCtrl + P',
   klik: () = & gt; { console.log ('waktu untuk mencetak barang')}}))
`</pre> 

You can configure different key combinations based on the user's operating system.

```js
{akselerator: platform proses === 'darwin'? 'Alt + Cmd + I': 'Ctrl + Shift + I'}
```

## Jalan pintas global

Anda dapat menggunakan modul  globalShortcut </ 0> untuk mendeteksi kejadian keyboard meskipun aplikasi tidak memiliki fokus pada keyboard.</p> 

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Jalan pintas dalam BrowserWindow

Jika Anda ingin menangani jalan pintas keyboard untuk  BrowserWindow </ 0> , Anda dapat menggunakan pendengar acara ` keyup </ 1> dan <code> keydown </ 1>  pada objek jendela di dalam proses renderer.</p>

<pre><code class="js">window.addEventListener('keyup', doSomething, true)
`</pre> 

Perhatikan parameter ketiga ` true </ 0> yang berarti pendengar akan selalu menerima penekanan tombol sebelum pendengar lainnya sehingga mereka tidak dapat menahan <code> stopPropagation () </ 0> memanggil mereka.</p>

<p>The <a href="../api/web-contents.md#event-before-input-event"><code> sebelum-input- acara </ 0>  acara 
dipancarkan sebelum pengiriman <code> keydown </ 1> dan <code> keyup </ 1> peristiwa di halaman. Ini bisa digunakan untuk menangkap dan menangani shortcut custom yang tidak terlihat pada menu.</p>

<p>Jika Anda tidak ingin melakukan penguraian manual pintas ada perpustakaan yang melakukan deteksi kunci lanjut seperti <a href="https://github.com/ccampbell/mousetrap"> perangkap tikus </ 0> .</p>

<pre><code class="js">Mousetrap.bind ('4', () = > {console.log('4')}) Mousetrap.bind ('? ', () = > {console.log ('menunjukkan cara pintas!')}) Mousetrap.bind ('Escudo', () = > {console.log('escape')}, 'keyup') / / kombinasi Mousetrap.bind ('perintah + pergeseran + k', () = > {console.log ('perintah pergeseran k')}) / / peta beberapa kombinasi ke callback sama Mousetrap.bind (['perintah + k', ' ctrl + k'], ()) = > {console.log ('perintah k atau control k') / / kembali palsu untuk mencegah perilaku default dan acara berhenti dari menggelegak kembali palsu}) / / gmail gaya urutan Mousetrap.bind ('g saya ', () = > {console.log ('pergi ke inbox')}) Mousetrap.bind ('* ', () = > {konsol .log ('Pilih Semua')}) / / kode konami!
Mousetrap.bind ('sampai sampai down turun kiri kanan kiri kanan b masukkan ', () = > {console.log ('kode konami')})
`</pre>