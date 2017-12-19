# Akselerator

> Tentukan pintasan keyboard.

Accelerators adalah Strings yang dapat berisi banyak pengubah dan kode kunci, dikombinasikan dengan karakter ` + </ 0> , dan digunakan untuk menentukan cara pintas keyboard di seluruh aplikasi Anda.</p>

<p>Contoh:</p>

<ul>
<li><code>Command Or Control + A`</li> 

* `Command Or Control + Shift + Z`</ul> 

Jalan pintas terdaftar dengan modul ` globalShortcut </ 0> dengan menggunakan metode <a href="global-shortcut.md#globalshortcutregisteraccelerator-callback"><code> register </ 1> 
, misalnya</p>

<pre><code class="javascript">const {app, globalShortcut} = memerlukan ('elektron') app.on ('siap', () = & gt; {
   // Daftarkan pendatang jalan pintas 'CommandOrControl + Y'.
  globalShortcut.register ('CommandOrControl + Y', () = & gt; {
     // Lakukan hal-hal saat Y dan salah satu Command / Control ditekan.
  })})
`</pre> 

## Platform notice

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Available modifiers

* `Command` (or `Cmd` for short)
* `Control` (or `Ctrl` for short)
* `CommandOrControl` (or `CmdOrCtrl` for short)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

## Available key codes

* `` to `9`
* `A` to `Z`
* `F1` to `F24`
* Punctuations like `~`, `!`, `@`, `#`, `$`, etc.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (or `Enter` as alias)
* `Up`, `Down`, `Left` and `Right`
* `Home` and `End`
* `PageUp` and `PageDown`
* `Escape` (or `Esc` for short)
* `VolumeUp`, `VolumeDown` and `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` and `MediaPlayPause`
* `PrintScreen`