# preferensiSistem

> Dapatkan preferensi sistem

Proses: [Main](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Kejadian

Objek 

<object>
  SystemPreferences </ 0> memancarkan peristiwa berikut:</p> 
  
  <h3>
    Acara: 'aksen-berubah warna' <em> Windows </ 0></h3> 
    
    <p>
      Pengembalian:
    </p>
    
    <ul>
      <li>
        <code>event</code> Event
      </li>
      <li>
        <code> newColor &lt;/ 0> String - Warna RGBA baru yang ditugaskan pengguna untuk menjadi sistem mereka
Aksen warna.&lt;/li>
&lt;/ul>

&lt;h3>Event: 'color-changed' &lt;em> Windows &lt;/ 0>&lt;/h3>

&lt;p>Pengembalian:&lt;/p>

&lt;ul>
&lt;li>&lt;code>event</code> Sinyal
      </li>
    </ul>
    
    <h3>
      Event: 'inverted-color-scheme-changed' <em> Windows </ 0></h3> 
      
      <p>
        Pengembalian:
      </p>
      
      <ul>
        <li>
          <code>acara</code> Acara
        </li>
        <li>
          <code>invertedColorScheme</code> Boolean - <code>true</code> if an inverted color scheme, such as a high contrast theme, is being used, <code>false</code> otherwise.
        </li>
      </ul>
      
      <h2>
        Metode
      </h2>
      
      <h3>
        <code> systemPreferences.isDarkMode () &lt;/ 0> &lt;em> macOS &lt;/ 1>&lt;/h3>

&lt;p>Mengembalikan &lt;code> Boolean &lt;/ 0> - Apakah sistem berada dalam Mode Gelap.&lt;/p>

&lt;h3>&lt;code> systemPreferences.isSwipeTrackingFromScrollEventsEnabled () &lt;/ 0> &lt;em> macOS &lt;/ 1>&lt;/h3>

&lt;p>Mengembalikan &lt;code> Boolean &lt;/ 0> - Apakah Gesek di antara pengaturan halaman sudah aktif.&lt;/p>

&lt;h3>&lt;code> systemPreferences.postNotification (event, userInfo) &lt;/ 0> &lt;em> macos &lt;/ 1>&lt;/h3>

&lt;ul>
&lt;li>&lt;code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>

&lt;p>Posts &lt;code> event &lt;/ 0> sebagai notifikasi asli macOS. The &lt;code> userInfo &lt;/ 0> adalah Obyek
yang berisi kamus informasi pengguna yang dikirim bersamaan dengan notifikasi.&lt;/p>

&lt;h3>&lt;code> systemPreferences.postLocalNotification (event, userInfo) &lt;/ 0> &lt;em> macos &lt;/ 1>&lt;/h3>

&lt;ul>
&lt;li>&lt;code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>

&lt;p>Posts &lt;code> event &lt;/ 0> sebagai notifikasi asli macOS. The &lt;code> userInfo &lt;/ 0> adalah Obyek
yang berisi kamus informasi pengguna yang dikirim bersamaan dengan notifikasi.&lt;/p>

&lt;h3>&lt;code> systemPreferences.subscribeNotification (event, callback) &lt;/ 0> &lt;em> macos &lt;/ 1>&lt;/h3>

&lt;ul>
&lt;li>&lt;code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code>callback</code> Fungsi 
        
        <ul>
          <li>
            <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>&lt;/li>
&lt;/ul>

&lt;p>Berlangganan pemberitahuan asli macOS, &lt;code> callback &lt;/ 0> akan dipanggil
&lt;code> callback (event, userInfo) &lt;/ 0> saat event &lt;code> sesuai &lt;/ 0> terjadi. Itu
&lt;code> userInfo &lt;/ 0> adalah Objek yang berisi kamus informasi pengguna yang dikirim
bersama dengan notifikasi.&lt;/p>

&lt;p>Pelanggan &lt;code> id &lt;/ 0> dikembalikan, yang dapat digunakan untuk menghentikan langganan
&lt;code> acara &lt;/ 0>.&lt;/p>

&lt;p>Di bawah tenda, API ini mengikuti &lt;code> NSDistributedNotificationCenter &lt;/ 0> , contoh nilai &lt;code> event &lt;/ 0> adalah:&lt;/p>

&lt;ul>
&lt;li>&lt;code>Pemberitahuan Antarmuka Tema Apple Berubah</code>
          </li>
          <li>
            <code>Variasi Warna Apple Aqua Berubah</code>
          </li>
          <li>
            <code>Pemberitahuan Perubahan Preferensi Warna Apple</code>
          </li>
          <li>
            <code>Pengaturan Bilah Gulir Tampilkan Apple Berubah</code>
          </li>
        </ul>
        
        <h3>
          <code>systemPreferences.unsubscribePrmberitahuan(id)</code> <em>macOS</em>
        </h3>
        
        <ul>
          <li>
            <code>identitas</code> Integer
          </li>
        </ul>
        
        <p>
          Menghapus pelanggan dengan <code>id</code>.
        </p>
        
        <h3>
          <code>systemPreferences.subscribePemberitahuan (acara, telepon kembali)</code> <em>macOS</em>
        </h3>
        
        <ul>
          <li>
            <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code>callback</code> Fungsi <ul>
              <li>
                <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>&lt;/li>
&lt;/ul>

&lt;p>Same as &lt;code>subscribeNotification</code>, but uses <code>NSNotificationCenter</code> for local defaults. This is necessary for events such as <code>NSUserDefaultsDidChangeNotification</code>.</p> <h3>
                  <code>System Preferences.unsubscribe Local Pemberitahuan (id)</code> <em>macOS</em>
                </h3>
                <ul>
                  <li>
                    <code> id &lt;/ 0>  Integer&lt;/li>
&lt;/ul>

&lt;p>Sama seperti &lt;code> unsubscribeNotification </code>, namun menghapus pelanggan dari <code>NSNotificationCenter</code>.</p> <h3>
                      <code>systemPreferences.registerDefaults(defaults)</code> <em>macOS</em>
                    </h3>
                    <ul>
                      <li>
                        <code>defaults</code> Object - a dictionary of (<code>key: value</code>) user defaults
                      </li>
                    </ul>
                    <p>
                      Add the specified defaults to your application's <code>NSUserDefaults</code>.
                    </p>
                    <h3>
                      <code>systempreferences.get userdefault (kunci, jenis) </code> <em>macOS</em>
                    </h3>
                    <ul>
                      <li>
                        <code>kunci</code> senar
                      </li>
                      <li>
                        <code>type</code> String - Can be <code>string</code>, <code>boolean</code>, <code>integer</code>, <code>float</code>, <code>double</code>, <code>url</code>, <code>array</code> or <code>dictionary</code>.
                      </li>
                    </ul>
                    <p>
                      Returns <code>any</code> - The value of <code>key</code> in <code>NSUserDefaults</code>.
                    </p>
                    <p>
                      Some popular <code>key</code> and <code>type</code>s are:
                    </p>
                    <ul>
                      <li>
                        <code>AppleInterfaceStyle</code>: <code>string</code>
                      </li>
                      <li>
                        <code>AppleAquaColorVariant</code>: <code>integer</code>
                      </li>
                      <li>
                        <code>AppleHighlightColor</code>: <code>string</code>
                      </li>
                      <li>
                        <code>AppleShowScrollBars</code>: <code>string</code>
                      </li>
                      <li>
                        <code>NSNavRecentPlaces</code>: <code>array</code>
                      </li>
                      <li>
                        <code>NSPreferredWebServices</code>: <code>dictionary</code>
                      </li>
                      <li>
                        <code>NSUserDictionaryReplacementItems</code>: <code>array</code>
                      </li>
                    </ul>
                    <h3>
                      <code>systemPreferences.setUserDefault (kunci, jenis, nilai) </code> <em> macOS</em>
                    </h3>
                    <ul>
                      <li>
                        <code>kunci</code> senar
                      </li>
                      <li>
                        <code>ketik</code> String - lihat [<code>getUserDefault</code>] [# systempreferencesgetuserdefaultkey-type-macos].
                      </li>
                      <li>
                        <code>nilai</code> Senar
                      </li>
                    </ul>
                    <p>
                      Set the value of <code>key</code> in <code>NSUserDefaults</code>.
                    </p>
                    <p>
                      Perhatikan bahwa <code>tipe</code> harus sesuai dengan tipe <code>nilai</code> yang sebenarnya. Sebuah pengecualian dilemparkan jika tidak.
                    </p>
                    <p>
                      Some popular <code>key</code> and <code>type</code>s are:
                    </p>
                    <ul>
                      <li>
                        <code>ApplePressAndHoldEnabled</code>: <code>boolean</code>
                      </li>
                    </ul>
                    <h3>
                      <code>systemPreferences.removeUserDefault(key)</code> <em>macOS</em>
                    </h3>
                    <ul>
                      <li>
                        <code>kunci</code> senar
                      </li>
                    </ul>
                    <p>
                      Removes the <code>key</code> in <code>NSUserDefaults</code>. This can be used to restore the default or global value of a <code>key</code> previously set with <code>setUserDefault</code>.
                    </p>
                    <h3>
                      <code>systemPreferences.isAeroGlassEnabled()</code> <em>Windows</em>
                    </h3>
                    <p>
                      Mengembalikan <code>Boolean</code> - <code>benar</code> jika <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx">komposisi DWM</a> (Aero Glass) adalah diaktifkan, dan <code>salah</code> sebaliknya.
                    </p>
                    <p>
                      Contoh penggunaannya untuk menentukan apakah Anda harus membuat jendela transparan atau tidak (jendela transparan tidak akan bekerja dengan benar saat komposisi DWM dinonaktifkan):
                    </p>
                    <pre><code class="javascript">const {BrowserWindow, systemPreferences} = require ('elektron')
biarkan browserOptions = {width: 1000, height: 800}

// Buat jendela transparan hanya jika platform mendukungnya.
jika (process.platform! == 'win32' || systemPreferences.isAeroGlassEnabled ()) {
  browserOptions.transparent = benar
  browserOptions.frame = salah
}

// Buat jendela.
biarkan menang = Browser jendela baru(browserOptions)

// Arahkan.
jika (browserOptions.transparent) {
  win.loadURL (`file://${__dirname}/index.html`)
} lain {
  // Tidak ada transparansi, jadi kita memuat mundur yang menggunakan gaya dasar.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
</code></pre>
                    <h3>
                      <code>systemPreferences.getAccentColor()</code> <em>Jendela</em>
                    </h3>
                    <p>
                      Mengembalikan <code>String</code> - Pengguna saat ini memiliki preferensi warna aksen lebar di RGBA bentuk heksadesimal.
                    </p>
                    <pre><code class="js">const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
</code></pre>
                    <h3>
                      <code>systemPreferences.getColor(warna)</code> <em>jendela</em>
                    </h3>
                    <ul>
                      <li>
                        <code>warna</code> String - Salah satu nilai berikut: <ul>
                          <li>
                            <code>3d-dark-shadow</code> - bayangan gelap untuk elemen tampilan tiga dimensi.
                          </li>
                          <li>
                            <code>3d-face</code> - Warna wajah untuk elemen tampilan tiga dimensi dan untuk dialog latar belakang kotak.
                          </li>
                          <li>
                            <code>3d-highlight </code> - Sorot warna untuk elemen tampilan tiga dimensi.
                          </li>
                          <li>
                            <code>3d-light</code> - Warna terang untuk elemen tampilan tiga dimensi.
                          </li>
                          <li>
                            <code>3d-shadow</code> - Warna bayangan untuk elemen tampilan tiga dimensi.
                          </li>
                          <li>
                            <code>border aktif</code> - Batas jendela aktif.
                          </li>
                          <li>
                            <code>active-caption</code> - Bilah judul jendela aktif. Menentukan warna sisi kiri pada gradien warna bar judul jendela aktif jika efek gradiennya diaktifkan.
                          </li>
                          <li>
                            <code>active-caption-gradient</code> - Warna sisi kanan pada gradien warna bar judul jendela aktif.
                          </li>
                          <li>
                            <code>app-workspace</code> - Warna latar belakang beberapa dokumen antarmuka (MDI) aplikasi.
                          </li>
                          <li>
                            <code>tombol-teks</code> - Teks pada tombol push.
                          </li>
                          <li>
                            <code>caption-text</code> - Teks dalam keterangan, kotak ukuran, dan kotak panah gulir.
                          </li>
                          <li>
                            <code>desktop</code> - Warna latar belakang desktop.
                          </li>
                          <li>
                            <code>teks nonaktif</code> - Teks abu-abu (dinonaktifkan).
                          </li>
                          <li>
                            <code>sorot</code> - Item (s) dipilih dalam kontrol.
                          </li>
                          <li>
                            <code>highlight-text</code> - Teks item(s) yang dipilih dalam kontrol.
                          </li>
                          <li>
                            <code>hotlight</code> - Warna untuk item hyperlink atau hot-tracked.
                          </li>
                          <li>
                            <code>tidak aktif-batas</code> - Batas jendela tidak aktif.
                          </li>
                          <li>
                            <code>tidak aktif-caption</code> - Judul keterangan tidak aktif. Menentukan warna sisi kiri pada gradien warna bar judul jendela yang tidak aktif jika gradiennya efek diaktifkan.
                          </li>
                          <li>
                            <code>tidak aktif-caption-gradient</code> - Warna sisi kanan pada gradien warna dari bilah judul jendela yang tidak aktif.
                          </li>
                          <li>
                            <code>teks keterangan tidak aktif</code> - Warna teks dalam teks tidak aktif.
                          </li>
                          <li>
                            <code>info-background</code> - Warna latar belakang untuk kontrol tooltip.
                          </li>
                          <li>
                            <code>info-text</code> - Warna teks untuk kontrol tooltip.
                          </li>
                          <li>
                            <code>menu</code> - Latar belakang menu.
                          </li>
                          <li>
                            <code>menu-highlight</code> - Warna yang digunakan untuk menyorot item menu saat menu muncul sebagai menu datar.
                          </li>
                          <li>
                            <code>menubar</code> - Warna latar untuk bilah menu saat menu tampil rata menu.
                          </li>
                          <li>
                            <code>menu-text</code> - Teks dalam menu.
                          </li>
                          <li>
                            <code>scrollbar</code> - Area gulir batang abu-abu.
                          </li>
                          <li>
                            <code>jendela</code> - Latar belakang jendela.
                          </li>
                          <li>
                            <code>bingkai jendela</code> - Bingkai jendela.
                          </li>
                          <li>
                            <code>jendela-teks</code> - teks di jendela.
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <p>
                      Mengembalikan <code>Senar</code> - Pengaturan warna sistem dalam bentuk heksadesimal RGB (<code>#ABCDEF</code>). Lihat <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx">Windows docs</a> untuk lebih jelasnya.
                    </p>
                    <h3>
                      <code>systemPreferences.isInvertedColorScheme () </code> <em>Jendela</em>
                    </h3>
                    <p>
                      Mengembalikan <code>Boolean</code> - <code>benar</code> jika skema warna terbalik, seperti tema kontras tinggi, aktif, <code> salah </code> sebaliknya.
                    </p>