# Benutzerdefinierte Linux Desktop Launcher Aktionen

Auf vielen Linux-Umgebungen können Sie eigene Einträge zum Launcher hinzufügen, indem Sie die `.desktop` Datei ändern. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

__Launcher Shortcuts von Audacious:__

![audacious][3]

Im Allgemeinen werden Verknüpfungen hinzugefügt, indem für jeden Eintrag im Menü Verknüpfungen ein `Name` und `Exec` angegeben werden. Einheit wird das Feld `Exec` ausführen, sobald der Benutzer angeklickt hat. Das Format lautet wie folgt:

```plaintext
Aktionen=PlayPause;Weiter;Vorheriges

[Desktop-Aktion PlayPause]
Name=Play-Pause
Exec=audacious -t
Nur ShowIn=Einheit;

[Desktop-Aktion Next]
Name=Nächste
Exec=audacious -f
OnlyShowIn=Einheit;

[Desktop-Aktion Vorherig]
Name=Vorherige
Exec=audacious -r
OnlyShowIn=Einheit,
```

Die bevorzugte Methode, Ihre Anwendung zu informieren, ist die Verwendung von Parametern. Diese finden Sie in Ihrer App in der globalen Variable `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
