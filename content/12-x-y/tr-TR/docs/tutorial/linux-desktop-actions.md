# Custom Linux Desktop Launcher Actions

## Genel Bakış

Bir çok Linux ortamında, `.desktop` dosyasını düzenleyerek sistem başlangıcına kişisel girişler yapabilirsiniz. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

![audacious][3]

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

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
