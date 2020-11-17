# Własne działania na pulpicie Linux

W wielu środowiskach systemu Linux możesz dodać własne wpisy do jego launchera modyfikując plik `.desktop`. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

__Skróty programu Audacious:__

![nieśmiałe][3]

Ogólnie rzecz biorąc, skróty są dodawane poprzez podanie właściwości `Name` i `Exec` dla każdego wpisu w menu skrótów. Jednolity wykona pole `Exec` po kliknięciu przez użytkownika. Format jest następujący:

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

Preferowany przez jednostkę sposób na poinformowanie swojej aplikacji o tym, co zrobić, to użyć parametrów. Możesz je znaleźć w swojej aplikacji w zmiennej globalnej `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
