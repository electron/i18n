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
          <code>invertedColorScheme</code> Boolean - <code>true</code> if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is being used, <code>false</code> otherwise.
        </li>
      </ul>
      
      <h3>
        Event: 'high-contrast-color-scheme-changed' <em>Windows</em>
      </h3>
      
      <p>
        Mengembalikan:
      </p>
      
      <ul>
        <li>
          <code>event</code> Sinyal
        </li>
        <li>
          <code>highContrastColorScheme</code> Boolean - <code>true</code> if a high contrast theme is being used, <code>false</code> otherwise.
        </li>
      </ul>
      
      <h3>
        Event: 'appearance-changed' <em>macOS</em>
      </h3>
      
      <p>
        Mengembalikan:
      </p>
      
      <ul>
        <li>
          <code>newAppearance</code> String - Can be <code>dark</code> or <code>light</code>
        </li>
      </ul>
      
      <p>
        <strong>NOTE:</strong> This event is only emitted after you have called <code>startAppLevelAppearanceTrackingOS</code>
      </p>
      
      <h2>
        Metode
      </h2>
      
      <h3>
        <code>systemPreferences.isDarkMode()</code> <em>macOS</em>
      </h3>
      
      <p>
        Returns <code>Boolean</code> - Whether the system is in Dark Mode.
      </p>
      
      <h3>
        <code>systemPreferences.isSwipeTrackingFromScrollEventsEnabled()</code> <em>macOS</em>
      </h3>
      
      <p>
        Returns <code>Boolean</code> - Whether the Swipe between pages setting is on.
      </p>
      
      <h3>
        <code>systemPreferences.postNotification(event, userInfo[, deliverImmediately])</code> <em>macOS</em>
      </h3>
      
      <ul>
        <li>
          <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;li>&lt;code>deliverImmediately</code> Boolean (optional) - <code>true</code> to post notifications immediately even when the subscribing app is inactive.
        </li>
      </ul>
      
      <p>
        Posts <code> event &lt;/ 0> sebagai notifikasi asli macOS. The &lt;code> userInfo &lt;/ 0> adalah Obyek
yang berisi kamus informasi pengguna yang dikirim bersamaan dengan notifikasi.&lt;/p>

&lt;h3>&lt;code>systemPreferences.postLocalNotification(event, userInfo)</code> <em>macOS</em></h3> 
        
        <ul>
          <li>
            <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>

&lt;p>Posts &lt;code> event &lt;/ 0> sebagai notifikasi asli macOS. The &lt;code> userInfo &lt;/ 0> adalah Obyek
yang berisi kamus informasi pengguna yang dikirim bersamaan dengan notifikasi.&lt;/p>

&lt;h3>&lt;code>systemPreferences.postWorkspaceNotification(event, userInfo)</code> <em>macOS</em></h3> <ul>
              <li>
                <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>

&lt;p>Posts &lt;code> event &lt;/ 0> sebagai notifikasi asli macOS. The &lt;code> userInfo &lt;/ 0> adalah Obyek
yang berisi kamus informasi pengguna yang dikirim bersamaan dengan notifikasi.&lt;/p>

&lt;h3>&lt;code>systemPreferences.subscribeNotification(event, callback)</code> <em>macOS</em></h3> <ul>
                  <li>
                    <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code>callback</code> Fungsi <ul>
                      <li>
                        <code> event &lt;/ 0> String&lt;/li>
&lt;li>&lt;code> userInfo &lt;/ 0> Objek&lt;/li>
&lt;/ul>&lt;/li>
&lt;/ul>

&lt;p>Returns &lt;code>Number</code> - The ID of this subscription</p> <p>
                          Subscribes to native notifications of macOS, <code>callback</code> will be called with <code>callback(event, userInfo)</code> when the corresponding <code>event</code> happens. The <code>userInfo</code> is an Object that contains the user information dictionary sent along with the notification.
                        </p>
                        <p>
                          The <code>id</code> of the subscriber is returned, which can be used to unsubscribe the <code>event</code>.
                        </p>
                        <p>
                          Under the hood this API subscribes to <code>NSDistributedNotificationCenter</code>, example values of <code>event</code> are:
                        </p>
                        <ul>
                          <li>
                            <code>AppleInterfaceThemeChangedNotification</code>
                          </li>
                          <li>
                            <code>AppleAquaColorVariantChanged</code>
                          </li>
                          <li>
                            <code>AppleColorPreferencesChangedNotification</code>
                          </li>
                          <li>
                            <code>AppleShowScrollBarsSettingChanged</code>
                          </li>
                        </ul>
                        <h3>
                          <code>systemPreferences.subscribeLocalNotification(event, callback)</code> <em>macOS</em>
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

&lt;p>Returns &lt;code>Number</code> - The ID of this subscription</p> <p>
                                  Same as <code>subscribeNotification</code>, but uses <code>NSNotificationCenter</code> for local defaults. This is necessary for events such as <code>NSUserDefaultsDidChangeNotification</code>.
                                </p>
                                <h3>
                                  <code>systemPreferences.subscribeWorkspaceNotification(event, callback)</code> <em>macOS</em>
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

&lt;p>Same as &lt;code>subscribeNotification</code>, but uses <code>NSWorkspace.sharedWorkspace.notificationCenter</code>. This is necessary for events such as <code>NSWorkspaceDidActivateApplicationNotification</code>.</p> <h3>
                                          <code>systemPreferences.unsubscribeNotification(id)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>identitas</code> Integer
                                          </li>
                                        </ul>
                                        <p>
                                          Removes the subscriber with <code>id</code>.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.unsubscribeLocalNotification(id)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>identitas</code> Integer
                                          </li>
                                        </ul>
                                        <p>
                                          Same as <code>unsubscribeNotification</code>, but removes the subscriber from <code>NSNotificationCenter</code>.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.unsubscribeWorkspaceNotification(id)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>identitas</code> Integer
                                          </li>
                                        </ul>
                                        <p>
                                          Same as <code>unsubscribeNotification</code>, but removes the subscriber from <code>NSWorkspace.sharedWorkspace.notificationCenter</code>.
                                        </p>
                                        <h3>
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
                                          <code>systemPreferences.getUserDefault(key, type)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>key</code> String
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
                                          <code>systemPreferences.setUserDefault(key, type, value)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>key</code> String
                                          </li>
                                          <li>
                                            <code>type</code> String - See <a href="#systempreferencesgetuserdefaultkey-type-macos"><code>getUserDefault</code></a>.
                                          </li>
                                          <li>
                                            <code>value</code> String
                                          </li>
                                        </ul>
                                        <p>
                                          Set the value of <code>key</code> in <code>NSUserDefaults</code>.
                                        </p>
                                        <p>
                                          Note that <code>type</code> should match actual type of <code>value</code>. An exception is thrown if they don't.
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
                                            <code>key</code> String
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
                                        <h3>
                                          <code>systemPreferences.getAccentColor()</code> <em>Windows</em> <em>macOS</em>
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
                                        <p>
                                          This API is only available on macOS 10.14 Mojave or newer.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.getColor(color)</code> <em>Windows</em> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>color</code> String - One of the following values: <ul>
                                              <li>
                                                On <strong>Windows</strong>: <ul>
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
                                              <li>
                                                On <strong>macOS</strong> <ul>
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
                                                    <code>placeholder-text</code> - A placeholder string in a control or text view.
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
                                                    <code>text</code> - The text in a document.
                                                  </li>
                                                  <li>
                                                    <code>under-page-background</code> - The background behind a document's content.
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
                                        <p>
                                          Returns <code>String</code> - The system color setting in RGB hexadecimal form (<code>#ABCDEF</code>). See the <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx">Windows docs</a> and the <a href="https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors">MacOS docs</a> for more details.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.getSystemColor(color)</code> <em>macOS</em>
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
                                        <p>
                                          Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See <a href="https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors">Apple Documentation</a> for more details.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.isInvertedColorScheme()</code> <em>Windows</em>
                                        </h3>
                                        <p>
                                          Returns <code>Boolean</code> - <code>true</code> if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, <code>false</code> otherwise.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.isHighContrastColorScheme()</code> <em>Windows</em>
                                        </h3>
                                        <p>
                                          Returns <code>Boolean</code> - <code>true</code> if a high contrast theme is active, <code>false</code> otherwise.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.getEffectiveAppearance()</code> <em>macOS</em>
                                        </h3>
                                        <p>
                                          Returns <code>String</code> - Can be <code>dark</code>, <code>light</code> or <code>unknown</code>.
                                        </p>
                                        <p>
                                          Gets the macOS appearance setting that is currently applied to your application, maps to <a href="https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc">NSApplication.effectiveAppearance</a>
                                        </p>
                                        <p>
                                          Please note that until Electron is built targeting the 10.14 SDK, your application's <code>effectiveAppearance</code> will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the <code>NSRequiresAquaSystemAppearance</code> key in your apps <code>Info.plist</code> to <code>false</code>. If you are using <code>electron-packager</code> or <code>electron-forge</code> just set the <code>enableDarwinDarkMode</code> packager option to <code>true</code>. See the <a href="https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport">Electron Packager API</a> for more details.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.getAppLevelAppearance()</code> <em>macOS</em>
                                        </h3>
                                        <p>
                                          Returns <code>String</code> | <code>null</code> - Can be <code>dark</code>, <code>light</code> or <code>unknown</code>.
                                        </p>
                                        <p>
                                          Gets the macOS appearance setting that you have declared you want for your application, maps to <a href="https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc">NSApplication.appearance</a>. You can use the <code>setAppLevelAppearance</code> API to set this value.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.setAppLevelAppearance(appearance)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>appearance</code> String | null - Can be <code>dark</code> or <code>light</code>
                                          </li>
                                        </ul>
                                        <p>
                                          Sets the appearance setting for your application, this should override the system default and override the value of <code>getEffectiveAppearance</code>.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.isTrustedAccessibilityClient(prompt)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>prompt</code> Boolean - whether or not the user will be informed via prompt if the current process is untrusted.
                                          </li>
                                        </ul>
                                        <p>
                                          Returns <code>Boolean</code> - <code>true</code> if the current process is a trusted accessibility client and <code>false</code> if it is not.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.getMediaAccessStatus(mediaType)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>mediaType</code> String - <code>microphone</code> or <code>camera</code>.
                                          </li>
                                        </ul>
                                        <p>
                                          Returns <code>String</code> - Can be <code>not-determined</code>, <code>granted</code>, <code>denied</code>, <code>restricted</code> or <code>unknown</code>.
                                        </p>
                                        <p>
                                          This user consent was not required until macOS 10.14 Mojave, so this method will always return <code>granted</code> if your system is running 10.13 High Sierra or lower.
                                        </p>
                                        <h3>
                                          <code>systemPreferences.askForMediaAccess(mediaType)</code> <em>macOS</em>
                                        </h3>
                                        <ul>
                                          <li>
                                            <code>mediaType</code> String - the type of media being requested; can be <code>microphone</code>, <code>camera</code>.
                                          </li>
                                        </ul>
                                        <p>
                                          Returns <code>Promise&lt;Boolean&gt;</code> - A promise that resolves with <code>true</code> if consent was granted and <code>false</code> if it was denied. If an invalid <code>mediaType</code> is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it <em>must</em> be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.
                                        </p>
                                        <p>
                                          <strong>Important:</strong> In order to properly leverage this API, you <a href="https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc">must set</a> the <code>NSMicrophoneUsageDescription</code> and <code>NSCameraUsageDescription</code> strings in your app's <code>Info.plist</code> file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See <a href="https://electronjs.org/docs/tutorial/application-distribution#macos">Electron Application Distribution</a> for more information about how to set these in the context of Electron.
                                        </p>
                                        <p>
                                          This user consent was not required until macOS 10.14 Mojave, so this method will always return <code>true</code> if your system is running 10.13 High Sierra or lower.
                                        </p>