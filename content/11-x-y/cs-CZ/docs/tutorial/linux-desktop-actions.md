# Vlastní akce Linuxového Launcheru

V mnoha linuxových prostředích můžete přidat vlastní položky do svého launcheru úpravou souboru `.desktop`. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

__Spouštěč zkratek Audaciou:__

![smělé][3]

Obecně řečeno, zkratky jsou přidány zadáním vlastnosti `Name` a `Exec` pro každý záznam v nabídce zástupců. Jednota spustí pole `Exec` po kliknutí uživatele. Formát je následující:

```plaintext
Akce=PlayPause;Další;Předchozí

[[Desktop Action PlayPause]
Name=Play-Pause
Exec=audacious -t
Pouze ShowIn=Jednotka;

[Akce plochy]
Name=Next
Exec=audacious -f
OnlyShowIn=Jednota;

[Předchozí akce plochy]
Name=Předchozí
Exec=audacious -r
OnlyShowIn=Unity;
```

Upřednostňovaný způsob, jak vaší aplikaci sdělit, co má udělat, je použít parametry. Ty můžete najít ve své aplikaci v globální proměnné `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
