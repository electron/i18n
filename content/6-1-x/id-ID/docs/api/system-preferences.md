# preferensiSistem

> Dapatkan preferensi sistem

Proses: [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require ('electron')
console.log (systemPreferences.isDarkMode ())
```

## Kejadian

Objek 

<object>
  SystemPreferences </ 0> memancarkan peristiwa berikut:</p>

<h3 spaces-before="0">
  Acara: 'aksen-berubah warna' <em x-id="4"> Windows </ 0></h3> 
  
  <p spaces-before="0">
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

&lt;h3 spaces-before="0" line-breaks-before="2">Event: 'color-changed' &lt;em x-id="4"> Windows &lt;/ 0>&lt;/h3>

&lt;p spaces-before="0" line-breaks-before="2">Pengembalian:&lt;/p>

&lt;ul spaces="0" level="0" marker="*">
&lt;li marker="*" level="0" spaces="0" line-breaks-before="3" spaces-after-marker="0">&lt;code>event</code> Sinyal
    </li>
  </ul>

<h3 spaces-before="0">
  Event: 'inverted-color-scheme-changed' <em x-id="4"> Windows </ 0></h3> 
  
  <p spaces-before="0">
    Pengembalian:
  </p>
  
  <ul>
    <li>
      <code>peristiwa</code> Peristiwa
    </li>
    <li>
      <code>invertedColorScheme</code> Boolean - <code>true</code> if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is being used, <code>false</code> otherwise.
    </li>
  </ul>

<h3 spaces-before="0">
  Event: 'high-contrast-color-scheme-changed' <em x-id="4">Windows</em>
</h3>

<p spaces-before="0">
  Mengembalikan:
</p>

<ul>
  <li>
    <code>event&lt;/ 0> Acara&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code>highContrastColorScheme</code> Boolean - <code>true</code> if a high contrast theme is being used, <code>false</code> otherwise.
  </li>
</ul>

<h2 spaces-before="0">
  Metode
</h2>

<h3 spaces-before="0">
  <code> systemPreferences.isDarkMode () &lt;/ 0> &lt;em x-id="4"> macOS &lt;/ 1>&lt;/h3>

&lt;p spaces-before="0" line-breaks-before="2">Mengembalikan &lt;code> Boolean &lt;/ 0> - Apakah sistem berada dalam Mode Gelap.&lt;/p>

&lt;h3 spaces-before="0" line-breaks-before="2">&lt;code> systemPreferences.isSwipeTrackingFromScrollEventsEnabled () &lt;/ 0> &lt;em x-id="4"> macOS &lt;/ 1>&lt;/h3>

&lt;p spaces-before="0" line-breaks-before="2">Mengembalikan &lt;code> Boolean &lt;/ 0> - Apakah Gesek di antara pengaturan halaman sudah aktif.&lt;/p>

&lt;h3 spaces-before="0" line-breaks-before="2">&lt;code>systemPreferences.postNotification(event, userInfo[, deliverImmediately])</code> <em x-id="4">macOS</em>
</h3>

<ul>
  <li>
    <code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code>deliverImmediately</code> Boolean (optional) - <code>true</code> to post notifications immediately even when the subscribing app is inactive.
  </li>
</ul>

<p spaces-before="0">
  Posts <code>event</code> as native notifications of macOS. The <code>userInfo</code> is an Object that contains the user information dictionary sent along with the notification.
</p>

<h3 spaces-before="0">
  <code> systemPreferences.postLocalNotification (event, userInfo) &lt;/ 0> &lt;em x-id="4"> macos &lt;/ 1>&lt;/h3>

&lt;ul spaces="0" level="0" marker="*">
&lt;li marker="*" level="0" spaces="0" line-breaks-before="3" spaces-after-marker="0">&lt;code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>

&lt;p spaces-before="0" line-breaks-before="2">Posts &lt;code>event</code> as native notifications of macOS. The <code>userInfo</code> is an Object that contains the user information dictionary sent along with the notification.</p>

<h3 spaces-before="0">
  <code>systemPreferences.postWorkspaceNotification(event, userInfo)</code> <em x-id="4">macOS</em>
</h3>

<ul>
  <li>
    <code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>

&lt;p spaces-before="0" line-breaks-before="2">Posts &lt;code>event</code> as native notifications of macOS. The <code>userInfo</code> is an Object that contains the user information dictionary sent along with the notification.</p>

<h3 spaces-before="0">
  <code> systemPreferences.subscribeNotification (event, callback) &lt;/ 0> &lt;em x-id="4"> macos &lt;/ 1>&lt;/h3>

&lt;ul spaces="2" level="0" marker="*">
&lt;li marker="*" level="0" spaces="0" line-breaks-before="3" spaces-after-marker="0">&lt;code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code>callback </code> Fungsi 
  
  <ul>
    <li>
      <code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="1" spaces="2" line-breaks-before="2" spaces-after-marker="0">&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>&lt;/li>
&lt;/ul>

&lt;p spaces-before="0" line-breaks-before="2">Returns &lt;code>Number</code> - The ID of this subscription</p> <p spaces-before="0">
        Berlangganan pemberitahuan asli macOS, <code> callback &lt;/ 0> akan dipanggil
&lt;code> callback (event, userInfo) &lt;/ 0> saat event &lt;code> sesuai &lt;/ 0> terjadi. Itu
&lt;code> userInfo &lt;/ 0> adalah Objek yang berisi kamus informasi pengguna yang dikirim
bersama dengan notifikasi.&lt;/p>

&lt;p spaces-before="0" line-breaks-before="2">Pelanggan &lt;code> id &lt;/ 0> dikembalikan, yang dapat digunakan untuk menghentikan langganan
&lt;code> acara &lt;/ 0>.&lt;/p>

&lt;p spaces-before="0" line-breaks-before="2">Di bawah tenda, API ini mengikuti &lt;code> NSDistributedNotificationCenter &lt;/ 0> , contoh nilai &lt;code> event &lt;/ 0> adalah:&lt;/p>

&lt;ul spaces="0" level="0" marker="*">
&lt;li marker="*" level="0" spaces="0" line-breaks-before="3" spaces-after-marker="0">&lt;code>Pemberitahuan Antarmuka Tema Apple Berubah</code></li> 
        
        <li>
          <code>Variasi Warna Apple Aqua Berubah</code>
        </li>
        
        <li>
          <code>Pemberitahuan Perubahan Preferensi Warna Apple</code>
        </li>
        
        <li>
          <code>Pengaturan Bilah Gulir Tampilkan Apple Berubah</code>
        </li></ul>

<h3 spaces-before="0">
  <code>systemPreferences.subscribePemberitahuan (acara, telepon kembali)</code> <em x-id="4">macOS</em>
</h3>

<ul>
  <li>
    <code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code>callback </code> Fungsi <ul>
      <li>
        <code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="1" spaces="2" line-breaks-before="2" spaces-after-marker="0">&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>&lt;/li>
&lt;/ul>

&lt;p spaces-before="0" line-breaks-before="2">Returns &lt;code>Number</code> - The ID of this subscription</p> <p spaces-before="0">
          Same as <code>subscribeNotification</code>, but uses <code>NSNotificationCenter</code> for local defaults. This is necessary for events such as <code>NSUserDefaultsDidChangeNotification</code>.
        </p>

<h3 spaces-before="0">
  <code>systemPreferences.subscribeWorkspaceNotification(event, callback)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="0" spaces="0" line-breaks-before="2" spaces-after-marker="0">&lt;code>callback </code> Fungsi <ul>
      <li>
        <code> event &lt;/ 0> String&lt;/li>
&lt;li marker="*" level="1" spaces="2" line-breaks-before="2" spaces-after-marker="0">&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>&lt;/li>
&lt;/ul>

&lt;p spaces-before="0" line-breaks-before="2">Same as &lt;code>subscribeNotification</code>, but uses <code>NSWorkspace.sharedWorkspace.notificationCenter</code>. This is necessary for events such as <code>NSWorkspaceDidActivateApplicationNotification</code>.</p>

<h3 spaces-before="0">
  <code>systemPreferences.unsubscribePrmberitahuan(id)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>identitas</code> Integer
  </li>
</ul>
<p spaces-before="0">
  Menghapus pelanggan dengan <code>id</code>.
</p>

<h3 spaces-before="0">
  <code>System Preferences.unsubscribe Local Pemberitahuan (id)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>identitas</code> Integer
  </li>
</ul>
<p spaces-before="0">
  Sama seperti <code> unsubscribeNotification </code>, namun menghapus pelanggan dari <code>NSNotificationCenter</code>.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.unsubscribeWorkspaceNotification(id)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>identitas</code> Integer
  </li>
</ul>
<p spaces-before="0">
  Same as <code>unsubscribeNotification</code>, but removes the subscriber from <code>NSWorkspace.sharedWorkspace.notificationCenter</code>.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.registerDefaults(defaults)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>defaults</code> Object - a dictionary of (<code>key: value</code>) user defaults
  </li>
</ul>
<p spaces-before="0">
  Add the specified defaults to your application's <code>NSUserDefaults</code>.
</p>

<h3 spaces-before="0">
  <code>systempreferences.get userdefault (kunci, jenis) </code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>kunci</code> senar
  </li>
  <li>
    <code>type</code> String - Can be <code>string</code>, <code>boolean</code>, <code>integer</code>, <code>float</code>, <code>double</code>, <code>url</code>, <code>array</code> or <code>dictionary</code>.
  </li>
</ul>
<p spaces-before="0">
  Returns <code>any</code> - The value of <code>key</code> in <code>NSUserDefaults</code>.
</p>
<p spaces-before="0">
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

<h3 spaces-before="0">
  <code>systemPreferences.setUserDefault (kunci, jenis, nilai) </code> <em x-id="4"> macOS</em>
</h3>
<ul>
  <li>
    <code>kunci</code> senar
  </li>
  <li>
    <code>type</code> String - See <a href="#systempreferencesgetuserdefaultkey-type-macos"><code>getUserDefault</code></a>.
  </li>
  <li>
    <code>nilai</code> Senar
  </li>
</ul>
<p spaces-before="0">
  Set the value of <code>key</code> in <code>NSUserDefaults</code>.
</p>
<p spaces-before="0">
  Note that <code>type</code> should match actual type of <code>value</code>. An exception is thrown if they don't.
</p>
<p spaces-before="0">
  Some popular <code>key</code> and <code>type</code>s are:
</p>
<ul>
  <li>
    <code>ApplePressAndHoldEnabled</code>: <code>boolean</code>
  </li>
</ul>

<h3 spaces-before="0">
  <code>systemPreferences.removeUserDefault(key)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>kunci</code> senar
  </li>
</ul>
<p spaces-before="0">
  Removes the <code>key</code> in <code>NSUserDefaults</code>. This can be used to restore the default or global value of a <code>key</code> previously set with <code>setUserDefault</code>.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.isAeroGlassEnabled()</code> <em x-id="4">Windows</em>
</h3>
<p spaces-before="0">
  Mengembalikan <code>Boolean</code> - <code>benar</code> jika <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx">komposisi DWM</a> (Aero Glass) adalah diaktifkan, dan <code>salah</code> sebaliknya.
</p>
<p spaces-before="0">
  Contoh penggunaannya untuk menentukan apakah Anda harus membuat jendela transparan atau tidak (jendela transparan tidak akan bekerja dengan benar saat komposisi DWM dinonaktifkan):
</p>
<pre><code class="javascript">const { BrowserWindow, systemPreferences } = require ('elektron')
biarkan browserOptions = { width: 1000, height: 800 }

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

<h3 spaces-before="0">
  <code>systemPreferences.getAccentColor()</code> <em x-id="4">Windows</em> <em x-id="4">macOS</em>
</h3>
<p spaces-before="0">
  Mengembalikan <code>String</code> - Pengguna saat ini memiliki preferensi warna aksen lebar di RGBA bentuk heksadesimal.
</p>
<pre><code class="js">const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
</code></pre>
<p spaces-before="0">
  This API is only available on macOS 10.14 Mojave or newer.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.getColor(color)</code> <em x-id="4">Windows</em> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <p spaces-before="0">
      <code>color</code> String - One of the following values:
    </p>
    <ul>
      <li>
        <p spaces-before="0">
          On <strong x-id="1">Windows</strong>:
        </p>
        <ul>
          <li>
            <code>3d-dark-shadow</code> - bayangan gelap untuk elemen tampilan tiga dimensi.
          </li>
          <li>
            <p spaces-before="0">
              <code>3d-face</code> - Warna wajah untuk elemen tampilan tiga dimensi dan untuk dialog latar belakang kotak.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>3d-highlight </code> - Sorot warna untuk elemen tampilan tiga dimensi.
            </p>
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
            <p spaces-before="0">
              <code>active-caption</code> - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>active-caption-gradient</code> - Warna sisi kanan pada gradien warna bar judul jendela aktif.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>app-workspace</code> - Warna latar belakang beberapa dokumen antarmuka (MDI) aplikasi.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>tombol-teks</code> - Teks pada tombol push.
            </p>
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
            <p spaces-before="0">
              <code>inactive-caption</code> - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>tidak aktif-caption-gradient</code> - Warna sisi kanan pada gradien warna dari bilah judul jendela yang tidak aktif.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>teks keterangan tidak aktif</code> - Warna teks dalam teks tidak aktif.
            </p>
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
            <p spaces-before="0">
              <code>menu-highlight</code> - Warna yang digunakan untuk menyorot item menu saat menu muncul sebagai menu datar.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>menubar</code> - Warna latar untuk bilah menu saat menu tampil rata menu.
            </p>
          </li>
          <li>
            <p spaces-before="0">
              <code>menu-text</code> - Teks dalam menu.
            </p>
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
      <li>
        On <strong x-id="1">macOS</strong> <ul>
          <li>
            <code>alternate-selected-control-text</code> - The text on a selected surface in a list or table.
          </li>
          <li>
            <code>control-background</code> - The background of a large interface element, such as a browser or table.
          </li>
          <li>
            <code>control</code> - The surface of a control.
          </li>
          <li>
            <code>control-text</code> -The text of a control that isn’t disabled.
          </li>
          <li>
            <code>disabled-control-text</code> - The text of a control that’s disabled.
          </li>
          <li>
            <code>find-highlight</code> - The color of a find indicator.
          </li>
          <li>
            <code>grid</code> - The gridlines of an interface element such as a table.
          </li>
          <li>
            <code>header-text</code> - The text of a header cell in a table.
          </li>
          <li>
            <code>highlight</code> - The virtual light source onscreen.
          </li>
          <li>
            <code>keyboard-focus-indicator</code> - The ring that appears around the currently focused control when using the keyboard for interface navigation.
          </li>
          <li>
            <code>label</code> - The text of a label containing primary content.
          </li>
          <li>
            <code>link</code> - A link to other content.
          </li>
          <li>
            <code>placeholder-text</code> -  A placeholder string in a control or text view.
          </li>
          <li>
            <code>quaternary-label</code> - The text of a label of lesser importance than a tertiary label such as watermark text.
          </li>
          <li>
            <code>scrubber-textured-background</code> - The background of a scrubber in the Touch Bar.
          </li>
          <li>
            <code>secondary-label</code> - The text of a label of lesser importance than a normal label such as a label used to represent a subheading or additional information.
          </li>
          <li>
            <code>selected-content-background</code> - The background for selected content in a key window or view.
          </li>
          <li>
            <code>selected-control</code> - The surface of a selected control.
          </li>
          <li>
            <code>selected-control-text</code> - The text of a selected control.
          </li>
          <li>
            <code>selected-menu-item</code> - The text of a selected menu.
          </li>
          <li>
            <code>selected-text-background</code> - The background of selected text.
          </li>
          <li>
            <code>selected-text</code> - Selected text.
          </li>
          <li>
            <code>separator</code> - A separator between different sections of content.
          </li>
          <li>
            <code>shadow</code> - The virtual shadow cast by a raised object onscreen.
          </li>
          <li>
            <code>tertiary-label</code> - The text of a label of lesser importance than a secondary label such as a label used to represent disabled text.
          </li>
          <li>
            <code>text-background</code> - Text background.
          </li>
          <li>
            <code>text</code> -  The text in a document.
          </li>
          <li>
            <code>under-page-background</code> -  The background behind a document's content.
          </li>
          <li>
            <code>unemphasized-selected-content-background</code> - The selected content in a non-key window or view.
          </li>
          <li>
            <code>unemphasized-selected-text-background</code> - A background for selected text in a non-key window or view.
          </li>
          <li>
            <code>unemphasized-selected-text</code> - Selected text in a non-key window or view.
          </li>
          <li>
            <code>window-background</code> - The background of a window.
          </li>
          <li>
            <code>window-frame-text</code> - The text in the window's titlebar area.
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
<p spaces-before="0">
  Mengembalikan <code>Senar</code> - Pengaturan warna sistem dalam bentuk heksadesimal RGB (<code>#ABCDEF</code>). See the <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx">Windows docs</a> and the <a href="https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors">MacOS docs</a> for more details.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.getSystemColor(color)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>color</code> String - One of the following values: <ul>
      <li>
        <code>blue</code>
      </li>
      <li>
        <code>brown</code>
      </li>
      <li>
        <code>gray</code>
      </li>
      <li>
        <code>green</code>
      </li>
      <li>
        <code>orange</code>
      </li>
      <li>
        <code>pink</code>
      </li>
      <li>
        <code>purple</code>
      </li>
      <li>
        <code>red</code>
      </li>
      <li>
        <code>yellow</code>
      </li>
    </ul>
  </li>
</ul>
<p spaces-before="0">
  Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See <a href="https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors">Apple Documentation</a> for  more details.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.isInvertedColorScheme () </code> <em x-id="4">Jendela</em>
</h3>
<p spaces-before="0">
  Returns <code>Boolean</code> - <code>true</code> if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, <code>false</code> otherwise.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.isHighContrastColorScheme()</code> <em x-id="4">Windows</em>
</h3>
<p spaces-before="0">
  Returns <code>Boolean</code> - <code>true</code> if a high contrast theme is active, <code>false</code> otherwise.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.getEffectiveAppearance()</code> <em x-id="4">macOS</em>
</h3>
<p spaces-before="0">
  Returns <code>String</code> - Can be <code>dark</code>, <code>light</code> or <code>unknown</code>.
</p>
<p spaces-before="0">
  Gets the macOS appearance setting that is currently applied to your application, maps to <a href="https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc">NSApplication.effectiveAppearance</a>
</p>
<p spaces-before="0">
  Please note that until Electron is built targeting the 10.14 SDK, your application's <code>effectiveAppearance</code> will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the <code>NSRequiresAquaSystemAppearance</code> key in your apps <code>Info.plist</code> to <code>false</code>.  If you are using <code>electron-packager</code> or <code>electron-forge</code> just set the <code>enableDarwinDarkMode</code> packager option to <code>true</code>.  See the <a href="https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport">Electron Packager API</a> for more details.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.getAppLevelAppearance()</code> <em x-id="4">macOS</em>
</h3>
<p spaces-before="0">
  Returns <code>String</code> | <code>null</code> - Can be <code>dark</code>, <code>light</code> or <code>unknown</code>.
</p>
<p spaces-before="0">
  Gets the macOS appearance setting that you have declared you want for your application, maps to <a href="https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc">NSApplication.appearance</a>. You can use the <code>setAppLevelAppearance</code> API to set this value.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.setAppLevelAppearance(appearance)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>appearance</code> String | null - Can be <code>dark</code> or <code>light</code>
  </li>
</ul>
<p spaces-before="0">
  Sets the appearance setting for your application, this should override the system default and override the value of <code>getEffectiveAppearance</code>.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.canPromptTouchID()</code> <em x-id="4">macOS</em>
</h3>
<p spaces-before="0">
  Returns <code>Boolean</code> - whether or not this device has the ability to use Touch ID.
</p>
<p spaces-before="0">
  <strong x-id="1">NOTE:</strong> This API will return <code>false</code> on macOS systems older than Sierra 10.12.2.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.promptTouchID(reason)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>reason</code> String - The reason you are asking for Touch ID authentication
  </li>
</ul>
<p spaces-before="0">
  Returns <code>Promise&lt;void&gt;</code> - resolves if the user has successfully authenticated with Touch ID.
</p>
<pre><code class="javascript">const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success =&gt; {
  console.log('You have successfully authenticated with Touch ID!')
}).catch(err =&gt; {
  console.log(err)
})
</code></pre>
<p spaces-before="0">
  This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set <a href="https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc">Access Control Constants</a> like <a href="https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc"><code>kSecAccessControlUserPresence</code></a> on the their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with <a href="https://github.com/atom/node-keytar"><code>node-keytar</code></a>, such that one would store an encryption key with <code>node-keytar</code> and only fetch it if <code>promptTouchID()</code> resolves.
</p>
<p spaces-before="0">
  <strong x-id="1">NOTE:</strong> This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.isTrustedAccessibilityClient(prompt)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>prompt</code> Boolean - whether or not the user will be informed via prompt if the current process is untrusted.
  </li>
</ul>
<p spaces-before="0">
  Returns <code>Boolean</code> - <code>true</code> if the current process is a trusted accessibility client and <code>false</code> if it is not.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.getMediaAccessStatus(mediaType)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>mediaType</code> String - <code>microphone</code> or <code>camera</code>.
  </li>
</ul>
<p spaces-before="0">
  Returns <code>String</code> - Can be <code>not-determined</code>, <code>granted</code>, <code>denied</code>, <code>restricted</code> or <code>unknown</code>.
</p>
<p spaces-before="0">
  This user consent was not required until macOS 10.14 Mojave, so this method will always return <code>granted</code> if your system is running 10.13 High Sierra or lower.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.askForMediaAccess(mediaType)</code> <em x-id="4">macOS</em>
</h3>
<ul>
  <li>
    <code>mediaType</code> String - the type of media being requested; can be <code>microphone</code>, <code>camera</code>.
  </li>
</ul>
<p spaces-before="0">
  Returns <code>Promise&lt;Boolean&gt;</code> - A promise that resolves with <code>true</code> if consent was granted and <code>false</code> if it was denied. If an invalid <code>mediaType</code> is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it <em x-id="4">must</em> be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.
</p>
<p spaces-before="0">
  <strong x-id="1">Important:</strong> In order to properly leverage this API, you <a href="https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc">must set</a> the <code>NSMicrophoneUsageDescription</code> and <code>NSCameraUsageDescription</code> strings in your app's <code>Info.plist</code> file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See <a href="https://electronjs.org/docs/tutorial/application-distribution#macos">Electron Application Distribution</a> for more information about how to set these in the context of Electron.
</p>
<p spaces-before="0">
  This user consent was not required until macOS 10.14 Mojave, so this method will always return <code>true</code> if your system is running 10.13 High Sierra or lower.
</p>

<h3 spaces-before="0">
  <code>systemPreferences.getAnimationSettings()</code>
</h3>
<p spaces-before="0">
  Mengembalikan <code>Objek</code>:
</p>
<ul>
  <li>
    <code>shouldRenderRichAnimation</code> Boolean - Returns true if rich animations should be rendered. Looks at session type (e.g. remote desktop) and accessibility settings to give guidance for heavy animations.
  </li>
  <li>
    <code>scrollAnimationsEnabledBySystem</code> Boolean - Determines on a per-platform basis whether scroll animations (e.g. produced by home/end key) should be enabled.
  </li>
  <li>
    <code>prefersReducedMotion</code> Boolean - Determines whether the user desires reduced motion based on platform APIs.
  </li>
</ul>
<p spaces-before="0">
  Returns an object with system animation settings.
</p>
