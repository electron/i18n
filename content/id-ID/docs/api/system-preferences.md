# preferensiSistem

> Dapatkan preferensi sistem

Process: [Main](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Events

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
        <code>acara</code> Acara
      </li>
      <li>
        <code> newColor &lt;/ 0> String - Warna RGBA baru yang ditugaskan pengguna untuk menjadi sistem mereka
Aksen warna.&lt;/li>
&lt;/ul>

&lt;h3>Event: 'color-changed' &lt;em> Windows &lt;/ 0>&lt;/h3>

&lt;p>Pengembalian:&lt;/p>

&lt;ul>
&lt;li>&lt;code>event</code> Event
      </li>
    </ul>
    
    <h3>
      Event: 'inverted-color-scheme-changed' <em> Windows </ 0></h3> 
      
      <p>
        Pengembalian:
      </p>
      
      <ul>
        <li>
          <code>peristiwa</code> Peristiwa
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

&lt;p>Sama seperti &lt;code> subscribeNotification &lt;/ 0> , namun gunakan &lt;code> NSNotificationCenter &lt;/ 0> untuk default lokal . Ini diperlukan untuk acara seperti &lt;code> NSUserDefaultsDidChangeNotification &lt;/ 0>&lt;/p>

&lt;h3>&lt;code>System Preferences.unsubscribe Local Pemberitahuan (id)</code> <em>macOS</em></h3> <ul>
                  <li>
                    <code> id &lt;/ 0>  Integer&lt;/li>
&lt;/ul>

&lt;p>Sama seperti &lt;code> unsubscribeNotification </code>, namun menghapus pelanggan dari <code>NSNotificationCenter</code>.</p> <h3>
                      <code>systempreferences.get userdefault (kunci, jenis) </code> <em>macOS</em>
                    </h3>
                    <ul>
                      <li>
                        <code>kunci</code> senar
                      </li>
                      <li>
                        <code>ketik</code> String - Bisa <code>string</code>, <code>boolean </code>, <code>bilangan bulat</code>, <code>float</code>, <code>ganda</code>, <code>url</code>, <code>array</code>, <code>kamus</code>
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
                        <code>AppleInterfaceStyle</code>: <code>senar</code>
                      </li>
                      <li>
                        <code>AppleAquaColorVariant</code>: <code>bilangan bulat</code>
                      </li>
                      <li>
                        <code>AppleHighlightColor</code>: <code>senar</code>
                      </li>
                      <li>
                        <code>AppleShowScrollBars</code>: <code>senar</code>
                      </li>
                      <li>
                        <code>NSNavRecentPlaces</code>: <code>array</code>
                      </li>
                      <li>
                        <code>NSPreferredWebServices</code>: <code>kamus</code>
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
                        <code>ketik</code> String - lihat [<code>getUserDefault</code>] [# systempreferencesgetuserdefaultkey-type-macos]
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
                      Returns <code>Boolean</code> - <code>true</code> if <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx">DWM composition</a> (Aero Glass) is enabled, and <code>false</code> otherwise.
                    </p>
                    <p>
                      An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):
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
                      <code>systemPreferences.getAccentColor()</code> <em>Windows</em>
                    </h3>
                    <p>
                      Returns <code>String</code> - The users current system wide accent color preference in RGBA hexadecimal form.
                    </p>
                    <pre><code class="js">const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
</code></pre>
                    <h3>
                      <code>systemPreferences.getColor(color)</code> <em>Windows</em>
                    </h3>
                    <ul>
                      <li>
                        <code>color</code> String - One of the following values: <ul>
                          <li>
                            <code>3d-dark-shadow</code> - Dark shadow for three-dimensional display elements.
                          </li>
                          <li>
                            <code>3d-face</code> - Face color for three-dimensional display elements and for dialog box backgrounds.
                          </li>
                          <li>
                            <code>3d-highlight</code> - Highlight color for three-dimensional display elements.
                          </li>
                          <li>
                            <code>3d-light</code> - Light color for three-dimensional display elements.
                          </li>
                          <li>
                            <code>3d-shadow</code> - Shadow color for three-dimensional display elements.
                          </li>
                          <li>
                            <code>active-border</code> - Active window border.
                          </li>
                          <li>
                            <code>active-caption</code> - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
                          </li>
                          <li>
                            <code>active-caption-gradient</code> - Right side color in the color gradient of an active window's title bar.
                          </li>
                          <li>
                            <code>app-workspace</code> - Background color of multiple document interface (MDI) applications.
                          </li>
                          <li>
                            <code>button-text</code> - Text on push buttons.
                          </li>
                          <li>
                            <code>caption-text</code> - Text in caption, size box, and scroll bar arrow box.
                          </li>
                          <li>
                            <code>desktop</code> - Desktop background color.
                          </li>
                          <li>
                            <code>disabled-text</code> - Grayed (disabled) text.
                          </li>
                          <li>
                            <code>highlight</code> - Item(s) selected in a control.
                          </li>
                          <li>
                            <code>highlight-text</code> - Text of item(s) selected in a control.
                          </li>
                          <li>
                            <code>hotlight</code> - Color for a hyperlink or hot-tracked item.
                          </li>
                          <li>
                            <code>inactive-border</code> - Inactive window border.
                          </li>
                          <li>
                            <code>inactive-caption</code> - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
                          </li>
                          <li>
                            <code>inactive-caption-gradient</code> - Right side color in the color gradient of an inactive window's title bar.
                          </li>
                          <li>
                            <code>inactive-caption-text</code> - Color of text in an inactive caption.
                          </li>
                          <li>
                            <code>info-background</code> - Background color for tooltip controls.
                          </li>
                          <li>
                            <code>info-text</code> - Text color for tooltip controls.
                          </li>
                          <li>
                            <code>menu</code> - Menu background.
                          </li>
                          <li>
                            <code>menu-highlight</code> - The color used to highlight menu items when the menu appears as a flat menu.
                          </li>
                          <li>
                            <code>menubar</code> - The background color for the menu bar when menus appear as flat menus.
                          </li>
                          <li>
                            <code>menu-text</code> - Text in menus.
                          </li>
                          <li>
                            <code>scrollbar</code> - Scroll bar gray area.
                          </li>
                          <li>
                            <code>window</code> - Window background.
                          </li>
                          <li>
                            <code>window-frame</code> - Window frame.
                          </li>
                          <li>
                            <code>window-text</code> - Text in windows.
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <p>
                      Returns <code>String</code> - The system color setting in RGB hexadecimal form (<code>#ABCDEF</code>). See the <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx">Windows docs</a> for more details.
                    </p>
                    <h3>
                      <code>systemPreferences.isInvertedColorScheme()</code> <em>Windows</em>
                    </h3>
                    <p>
                      Returns <code>Boolean</code> - <code>true</code> if an inverted color scheme, such as a high contrast theme, is active, <code>false</code> otherwise.
                    </p>