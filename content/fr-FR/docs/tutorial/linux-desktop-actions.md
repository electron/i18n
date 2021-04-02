# Actions personnalisées de lancement du bureau Linux

## Vue d'ensemble

Sur de nombreux environnements Linux, vous pouvez ajouter des entrées personnalisées au lanceur en modifiant le `.desktop` fichier. Pour la documentation Unity de Canonical, voir ['ajout de raccourcis à un lanceur][unity-launcher]. Pour plus de détails sur une implémentation générique, consultez le [freedesktop.org spécification][spec].

![audacieux][3]

> REMARQUE: La capture d’écran ci-dessus est un exemple de raccourcis lanceur dans Audacious lecteur audio

Pour créer un raccourci, vous devez fournir des propriétés `Name` et `Exec` pour l’entrée que vous souhaitez ajouter au menu raccourci. Unity exécutera la commande définie dans le champ `Exec` après que l’utilisateur a cliqué sur l’élément de menu raccourci. Un exemple du fichier `.desktop` peut sembler le suivant :

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

La meilleure façon pour Unity d’instruire votre application sur ce qu’il faut faire est d' paramètres. Vous pouvez les trouver dans votre application dans la variable globale `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
