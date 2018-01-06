# Hızlandırıcı

> Klavye kısayolları tanımlamak.

Accelerators are Strings that can contain multiple modifiers and key codes, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Örnekler:

* `CommandOrControl + A`
* `CommandOrControl + Üst Krkt + Z`

Shortcuts are registered with the [`globalShortcut`](global-shortcut.md) module using the [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) method, i.e.

```javascript
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  }) })
```

## Platform bildirimi

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

`Alt` `seçeneği` yerine kullanın. `Alt` anahtar tüm platformlarda mevcut ise `seçme hakkı` anahtarı sadece macOS üzerinde bulunmaktadır.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

## Kullanılabilir düzenleyiciler

* `Command` (or `Cmd` for short)
* `Control` (or `Ctrl` for short)
* `CommandOrControl` (or `CmdOrCtrl` for short)
* `Alt`
* `Seçenek`
* `AltGr`
* `ÜstKrkt`
* `Süper`

## Kullanılabilir anahtar kodları

* `` to `9`
* `A` to `Z`
* `F1` to `F24`
* `~`, `!`, `@`, `#`, `$`, vb. gibi noktalama işaretleri.
* `Artı`
* `Boşluk`
* `Sekme`
* `Geri silme`
* `Sil`
* `Ekleme`
* `Return` (or `Enter` as alias)
* `Up`, `Down`, `Left` and `Right`
* `Home` and `End`
* `PageUp` and `PageDown`
* `Çıkış` (veya `Esc` kısaca)
* `Sesi Aç`, `Sesi Kıs` ve `Sesi Kapat`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` and `MediaPlayPause`
* `Ekran Görüntüsü`