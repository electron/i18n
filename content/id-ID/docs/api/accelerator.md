# Akselerator

> Tentukan pintasan keyboard.

Accelerators are Strings that can contain multiple modifiers and a single key code, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Contoh:

* `Command Or Control + A`
* `Command Or Control + Shift + Z`

Jalan pintas terdaftar dengan modul ` globalShortcut </ 0> dengan menggunakan metode <a href="global-shortcut.md#globalshortcutregisteraccelerator-callback"><code> register </ 1> 
, misalnya</p>

<pre><code class="javascript">const {app, globalShortcut} = memerlukan ('elektron') app.on ('siap', () = & gt; {
   // Daftarkan pendatang jalan pintas 'CommandOrControl + Y'.
  globalShortcut.register ('CommandOrControl + Y', () = & gt; {
     // Lakukan hal-hal saat Y dan salah satu Command / Control ditekan.
  })})
`</pre> 

## Pemberitahuan platform

Di Linux dan Windows , tombol ` Command </ 0> tidak berpengaruh sehingga gunakan <code> CommandOrControl </ 0> yang mewakili <code> Command </ 0> pada macOS dan <code> Control </ 0 > di Linux dan Windows untuk menentukan beberapa akselerator.</p>

<p>Gunakan <code> Alt </ 0> daripada <code> Option </ 0> . Tombol <code> Option </ 0> hanya ada di macOS , sedangkan tombol <code> Alt </ 0> tersedia di semua platform.</p>

<p>The <code> super </ 0> kunci dipetakan ke <code> Windows </ 0> tombol pada Windows dan Linux dan
 <code> Cmd </ 0> di MacOS .</p>

<h2>Tersedia pengubah</h2>

<ul>
<li><code> Perintah </ 0> (atau <code> Cmd </ 0> sebentar)</li>
<li><code> Kontrol </ 0> (atau <code> Ctrl </ 0> sebentar)</li>
<li><code> CommandOrControl </ 0> (atau <code> CmdOrCtrl </ 0> untuk jangka pendek)</li>
<li><code>Alt`</li> 

* `Pilihan`
* `AltGr`
* `Bergeser`
* `Super`</ul> 

## Kode kunci yang tersedia

* ` 0 </ 0> sampai <code> 9 </ 0></li>
<li><code> A </ 0> ke <code> Z </ 0></li>
<li><code> F1 </ 0> sampai <code> F24 </ 0></li>
<li>Tanda baca seperti <code> ~ </ 0> , <code> ! </ 0> , <code> @ </ 0> , <code> # </ 0> , <code> $ </ 0> , dll.</li>
<li><code>Plus`
* `Ruang`
* `Tab`
* `Menghapus`
* `Menghapus`
* `Memasukkan`
* ` Kembali </ 0> (atau <code> Enter </ 0> sebagai alias)</li>
<li><code> Atas </ 0> , <code> Turun </ 0> , <code> Kiri </ 0> dan <code> Kanan </ 0></li>
<li><code> Beranda </ 0> dan <code> Akhir </ 0></li>
<li><code> Halaman Atas </ 0> dan <code> Halaman Bawah </ 0></li>
<li><code> Escape </ 0> (atau <code> Esc </ 0> singkatnya)</li>
<li><code> VolumeUp </ 0> , <code> VolumeDown </ 0> dan <code> VolumeMute </ 0></li>
<li><code> MediaNextTrack </ 0> , <code> MediaPreviousTrack </ 0> , <code> MediaStop </ 0> dan <code> MediaPlayPause </ 0></li>
<li><code>Layar cetak`