# Benutzerdefinierte Linux Desktop Launcher Aktionen

Auf vielen Linux-Umgebungen können Sie eigene Einträge zum Launcher hinzufügen, indem Sie die `.desktop` Datei ändern. Für Canonicals Einheitsdokumentation siehe [Verknüpfungen zu einem Launcher hinzufügen](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Weitere Informationen zu einer generischen Implementierung finden Sie in der [Freedesktop.org Spezifikation](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__Launcher Shortcuts von Audacious:__

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

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
