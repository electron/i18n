# Actions personnalisées de lancement du bureau Linux

Sur de nombreux environnements Linux, vous pouvez ajouter des entrées personnalisées à son lanceur en modifiant le fichier `.desktop`. Pour la documentation sur l'Unité canonique, voir [Ajouter des raccourcis vers un lanceur](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Pour plus de détails sur une implémentation plus générique, voir la [Spécification freedesktop.org](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

**Raccourcis du lanceur d'Audacious :**

![audacieux](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

Generally speaking, shortcuts are added by providing a `Name` and `Exec` property for each entry in the shortcuts menu. Unity will execute the `Exec` field once clicked by the user. The format is as follows:

```text
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

Unity's preferred way of telling your application what to do is to use parameters. You can find these in your app in the global variable `process.argv`.