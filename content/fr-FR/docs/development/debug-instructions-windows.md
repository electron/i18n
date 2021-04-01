# Débogage sur Windows

Si vous rencontrez des crash ou des problèmes dans Electron et que vous croyez qu'il ne viennent pas de votre app JavaScript, mais plutôt d'Electron lui-même, alors le débogage peut être un peu difficile, surtout pour les développeurs peu expérimentés pour le débogage natif/C++. Toutefois, à l’aide de Visual Studio, du serveur de symbole hébergé par Electron, de la et du code source Electron, vous pouvez activer des de débogage par étapes avec des points de rupture à l’intérieur du code source d’Electron.

**Voir aussi** : Il y a une richesse d'information sur le débogage de Chronium, la plupart s'appliquant aussi pour Electron, sur le site developpeur de Chronium : [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Spécifications requises

* **Un debug build d'Electron** : le moyen le plus simple est généralement de le compiler vous-même, en utilisant les outils et prérequis énumérées dans les [instructions de compilation pour Windows](build-instructions-windows.md). Tandis que vous pouvez facilement déboguer Electron puisque vous pouvez le télécharger directement, vous trouverez qu’il est fortement optimisé, ce qui rend le débogage sensiblement plus difficile : le débogueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’inlining, liste des appels qui s’enchaînent et d'autres optimisations du compilateur.

* **Outils Visual Studio C++** : les éditions de la communauté gratuite de Visual Studio 2013 et Visual Studio 2015 fonctionnent tous les deux. Une fois installé, [configurer Visual Studio pour utiliser le serveur Symbole d’Electron](setting-up-symbol-server.md). Il permettra à Visual Studio d’acquérir une meilleure compréhension de ce qui se passe à l’intérieur d'Electron, rendant plus facile l'affichage des variables dans un format lisible par l’homme.

* **ProcMon** : l'[outil gratuit de SysInternals][sys-internals] vous permet d’inspecter un paramètres de processus, gère les fichiers et les opérations de registre.

## Débogage d'Electron

Pour démarrer une session de débogage, ouvrez PowerShell/CMD et exécutez votre version debug d'Electron, utilisant votre application comme paramètre.

```powershell
$ ./out/Testing/electron.exe ~/my-electron-app/
```

### Définition de points d’arrêt

Vous pouvez ouvrir Visual Studio. Electron n’est pas compilé avec Visual Studio et par conséquent ne contient pas de fichier de projet - vous pouvez cependant ouvrir les fichiers de code source « Comme fichier », ce qui signifie que Visual Studio va les ouvrir par eux-mêmes. Vous pouvez quand même définir des points d’arrêt - Visual Studio cherchera automatiquement le code source correspond au code qui s’exécute dans le processus attaché et le stopper en conséquence.

Les fichiers de code pertinents peuvent être trouvés dans `./shell/`.

### Attacher

Vous pouvez attacher le débogueur Visual Studio à un processus en cours d’exécution sur un ordinateur local ou distant. Lorsque le processus est en cours d’exécution, cliquez sur déboguer/attacher au processus (ou appuyez sur `CTRL+ALT+P`) pour ouvrir la boîte de dialogue « Attacher au processus ». Vous pouvez utiliser cette fonctionnalité pour déboguer des applications qui s'exécutent sur un ordinateur local ou distant, déboguer plusieurs processus simultanément.

Si Electron s’exécute sous un compte d’utilisateur différent, sélectionnez la case `afficher les processus de tous les utilisateurs`. Notez que selon le nombre de BrowserWindows ouvert de votre application, vous verrez plusieurs processus. Une application typique avec une seule fenêtre se traduira dans Visual Studio par présenter juste deux entrées d'`Electron.exe` - l'un pour le processus principal et l’autre pour le processus de rendu. Étant donné que la liste vous donne seulement des noms, il n’y a actuellement aucun moyen fiable de savoir qui est qui.

### Quel processus dois-je attacher ?

Le code exécuté dans le processus principal (qui est le code se trouvant ou est lancé par votre fichier JavaScript main) s'exécutera à l’intérieur du processus principal, tandis que les autres morceaux de code s’exécuteront à l’intérieur de leur processus de rendu respectif.

Vous pouvez être attaché à plusieurs programmes lorsque vous déboguez, mais un seul programme est actif dans le débogueur à tout moment. Vous pouvez configurer le programme actif dans la barre d’outils `Emplacement de débogage` ou de la `fenêtre de processus`.

## Utilisation de ProcMon pour observer un processus

Alors que Visual Studio est fantastique pour l’inspection de code spécifiques, la force de ProcMon est vraiment dans l'observation de tout ce que fait votre application avec le système d’exploitation - il capture les fichiers, registre, réseau, processus et fait un profilage des processus. Il tente de logguer **tous** les événements qui se produisent et peut être assez écrasant, mais si vous cherchez à comprendre pourquoi et comment votre application fonctionne avec le système d’exploitation, il peut être une ressource précieuse.

Pour une introduction aux fonctionnalités de débogage de base et avancées de ProcMon, allez voir [ce tutoriel vidéo][procmon-instructions] fourni par Microsoft.

[sys-internals]: https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx
[procmon-instructions]: https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor
