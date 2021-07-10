# Actions personnalisées de lancement du bureau Linux

## Vue d'ensemble

Sur de nombreux environnements Linux, vous pouvez ajouter des entrées personnalisées à son lanceur d'application en modifiant le fichier `.desktop`. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

![audacieux][3]

> NOTE: The screenshot above is an example of launcher shortcuts in Audacious audio player

To create a shortcut, you need to provide `Name` and `Exec` properties for the entry you want to add to the shortcut menu. Unity will execute the command defined in the `Exec` field after the user clicked the shortcut menu item. Un exemple du fichier `.desktop` peut ressembler à ceci :

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

The preferred way for Unity to instruct your application on what to do is using parameters. Vous pouvez les trouver dans votre application dans la variable globale `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
