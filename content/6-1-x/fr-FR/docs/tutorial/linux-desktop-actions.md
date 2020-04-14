# Actions personnalisées de lancement du bureau Linux

Sur de nombreux environnements Linux, vous pouvez ajouter des entrées personnalisées à son lanceur en modifiant le fichier `.desktop`. Pour la documentation canonique d'Unity, voir [Ajouter des raccourcis vers un lanceur](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Pour plus de détails sur une implémentation plus générique, voir la [Spécification freedesktop.org](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__Raccourcis du lanceur d'Audacious :__

![audacieux](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

Généralement, les raccourcis sont ajoutés en fournissant les propriétés `Name` et `Exec` pour chaque entrée dans le menu des raccourcis. Unity exécutera la commande `Exec` une fois cliqué par l'utilisateur. Le format est le suivant :

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

La façon préférée d'Unity de dire à votre application ce qu'il faut faire est d'utiliser les paramètres. Vous pouvez les trouver dans votre application dans la variable globale `process.argv`.
