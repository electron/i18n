# Débogage sur Windows

Si vous rencontrez des crash ou des problèmes dans Electron et que vous croyez qu'il ne viennent pas de votre app JavaScript, mais plutôt d'Electron lui-même, alors le déboggage peut être un peu difficile, surtout pour les développeurs peu expérimentés pour le déboggage natif/C++. Toutefois, en utilisant Visual Studio, le GitHub hébergé sur le serveur symbolique d'Electron et le code source d'Electron, il est assez facile d'activer le déboggage avec des points d'arrêt dans le code source d'Electron.

## Spécifications requises

* **Un debug build d'Electron** : le moyen le plus simple est généralement de le compiler vous-même, en utilisant les outils et prérequis énumérées dans les [instructions de compilation pour Windows](build-instructions-windows.md). Alors que vous pouvez facilement débogguer Electron puisque vous pouvez le télécharger directement, vous trouverez qu’il est fortement optimisé, ce qui rend le déboggage sensiblement plus difficile : le déboggueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’inlining, liste d’appels et autres optimisations du compilateur.

* **Outils Visual Studio C++** : les éditions de la communauté gratuite de Visual Studio 2013 et Visual Studio 2015 fonctionnent tous les deux. Une fois installé, [configurer Visual Studio pour utiliser le serveur GitHub symbolique d'Electron](setting-up-symbol-server.md). Il permettra à Visual Studio d’acquérir une meilleure compréhension de ce qui se passe à l’intérieur d'Electron, rendant plus facile l'affichage des variables dans un format lisible par l’homme.

* **ProcMon** : l'[outil gratuit de SysInternals](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) vous permet d’inspecter un paramètres de processus, gère les fichiers et les opérations de registre.

## Attacher et débogage d'Electron

Pour démarrer une session de débogage, ouvrez PowerShell/CMD et exécutez votre version debug d'Electron, utilisant votre application comme paramètre.

```powershell
$ ./out/D/electron.exe ~/mon-app-electron/
```

### Définition de points d’arrêt

Vous pouvez ouvrir Visual Studio. Electron n’est pas compilé avec Visual Studio et par conséquent ne contient pas de fichier de projet - vous pouvez cependant ouvrir les fichiers de code source « Comme fichier », ce qui signifie que Visual Studio va les ouvrir par eux-mêmes. Vous pouvez quand même définir des points d’arrêt - Visual Studio cherchera automatiquement le code source correspond au code qui s’exécute dans le processus attaché et le stopper en conséquence.

Les fichiers de code appropriés peuvent se trouver dans `./atom/`, comme pour Brightray, se trouvant dans `./vendor/brightray/browser` et `./vendor/brightray/common`. Si vous êtes hardcore, vous pouvez également débogguer Chromium directement, qui se trouve évidemment dans `chromium_src`.

### Attacher

Vous pouvez attacher le débogueur Visual Studio à un processus en cours d’exécution sur un ordinateur local ou distant. Lorsque le processus est en cours d’exécution, cliquez sur déboguer/attacher au processus (ou appuyez sur `CTRL+ALT+P`) pour ouvrir la boîte de dialogue « Attacher au processus ». Vous pouvez utiliser cette fonctionnalité pour déboguer des applications qui s'exécutent sur un ordinateur local ou distant, déboguer plusieurs processus simultanément.

Si Electron s’exécute sous un compte d’utilisateur différent, sélectionnez la case `afficher les processus de tous les utilisateurs`. Notez que selon le nombre de BrowserWindows ouvert de votre application, vous verrez plusieurs processus. Une application typique avec une seule fenêtre se traduira dans Visual Studio par présenter juste deux entrées d'`Electron.exe` - l'un pour le processus principal et l’autre pour le processus de rendu. Étant donné que la liste vous donne seulement des noms, il n’y a actuellement aucun moyen fiable de savoir qui est qui.

### Quel processus dois-je attacher ?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.