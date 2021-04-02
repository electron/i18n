# Benutzerdefinierte Linux Desktop Launcher Aktionen

## Übersicht

In vielen Linux-Umgebungen können Sie dem Systemstarter benutzerdefinierte Einträge hinzufügen, indem Sie die `.desktop` -Datei ändern. Informationen zur Unity-Dokumentation von Canonical finden Sie unter [Hinzufügen von Verknüpfungen zu einem Launcher-][unity-launcher]. Weitere Informationen zu einer allgemeineren -Implementierung finden Sie in der [freedesktop.org Spezifikation][spec].

![audacious][3]

> HINWEIS: Der Screenshot oben ist ein Beispiel für Launcher-Shortcuts in Audacious Audio-Player

Zum Erstellen einer Verknüpfung müssen Sie `Name` und `Exec` Eigenschaften für den Eintrag bereitstellen, den Sie dem Kontextmenü hinzufügen möchten. Unity führt den Befehl aus, der im Feld `Exec` definiert ist, nachdem der Benutzer auf das Kontextmenüelement geklickt hat. Ein Beispiel für die `.desktop` Datei kann wie folgt aussehen:

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

Die bevorzugte Methode für Unity, Ihre Anwendung darüber anzuweisen, was zu tun ist, ist die Verwendung Parameter. Sie finden sie in Ihrer Anwendung in der globalen Variable `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
