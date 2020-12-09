# Custom Linux Desktop Launcher Actions

## Genel Bakış

Bir çok Linux ortamında, `.desktop` dosyasını düzenleyerek sistem başlangıcına kişisel girişler yapabilirsiniz. Canonical'ın Unity dökümantasyonu için [Add Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher) sayfasını ziyaret edin. Daha genel bir emplementasyon detayları için, [ freedesktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html) sayfasını ziyaret edin.

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

> NOT: Yukarıda ki ekran görüntüsü Audacious ses oynatıcın'da ki örnek başlatıcı kısayollarına bir örnektir

Kısayol oluşturmak için kısayol menüsüne eklemek istediğiniz girdiye `Name` ve `Exec` özelliklerini sağlamanız gerekir. Kullanıcı kısayol menü tuşuna tıkladığında Unity `Exec` alanında tanımlı komutu çalıştırır. An example of the `.desktop` file may look as follows:

```plaintext
Actions=PlayPause;Next;Previous

[Desktop Action PlayPause]
Name=Play-Pause
Exec=audacious -t
OnlyShowIn=Unity;

[Desktop Action Next]
Name=Next
Exec=audacious -f
OnlyShowIn=Unity;

[Desktop Action Previous]
Name=Previous
Exec=audacious -r
OnlyShowIn=Unity;
```

The preferred way for Unity to instruct your application on what to do is using parameters. You can find them in your application in the global variable `process.argv`.
