# Hızlandırıcı

> Klavye kısayolları tanımlamak.

Hızlandırıcılar, uygulamanızda klavye kısayollarını tanımlamak için kullanılan, `+` karakteri ile birleştirilen birden çok değiştirici ve tuş kodu içerebilen dizelerdir. 

Örnekler:

* `CommandOrControl + A`
* `CommandOrControl + Üst Krkt + Z`

Kısayollar, [`register`](global-shortcut.md#globalshortcutregisteraccelerator-callback) yöntemini kullanarak [`globalShortcut`](global-shortcut.md) modülüyle kaydedilir.

```javascript
const {app, globalShortcut} = require('electron') app.on('ready', () => {   // 'CommandOrControl+Y' için bir kısayol dinleyicisi kaydet.
  globalShortcut.register('CommandOrControl+Y', () => {     // Y ve Command/Control'a basıldığında bir şeyler yapar.
  }) })
```

## Platform bildirimi

Linux ve Windows'ta `Command` tuşunun hiç bir etkisi yok, bu yüzden bazı hızlandırıcıları tanımlamak için macOS'taki `Command` tuşunu ve Linux ve Windows'taki `Control` tuşunu temsil eden `CommandOrControl`'u kullanın.

`Alt` `seçeneği` yerine kullanın. `Alt` anahtar tüm platformlarda mevcut ise `seçme hakkı` anahtarı sadece macOS üzerinde bulunmaktadır.

`Super` tuşu, Windows ve Linux'ta `Windows`, macOS'ta ise `Cmd` tuşuyla eşleştirilmiştir.

## Kullanılabilir düzenleyiciler

* `Command` (yada kısaca `Cmd`)
* `Control` (yada kısaca `Ctrl`)
* `CommandOrControl` (yada kısaca `CmdOrCtrl`)
* `Alt`
* `Seçenek`
* `AltGr`
* `ÜstKrkt`
* `Süper`

## Kullanılabilir anahtar kodları

* `0`'dan `9`'a
* `A`'dan `Z`'ye
* `F1`'den `F24`'e
* `~`, `!`, `@`, `#`, `$`, vb. gibi noktalama işaretleri.
* `Artı`
* `Boşluk`
* `Sekme`
* `Geri silme`
* `Sil`
* `Ekleme`
* `Return` (yada diğer adıyla `Enter`)
* `Up`, `Down`, `Left` ve `Right`
* `Home` ve `End`
* `PageUp` ve `PageDown`
* `Çıkış` (veya `Esc` kısaca)
* `Sesi Aç`, `Sesi Kıs` ve `Sesi Kapat`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` ve `MediaPlayPause`
* `Ekran Görüntüsü`