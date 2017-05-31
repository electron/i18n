# Débogage sur Windows

Si vous rencontrez des plantages ou questions en électron que vous croyiez ne sont pas causées par votre application JavaScript, mais plutôt par l’électron lui-même, débogage peut être un peu difficile, surtout pour les développeurs pas utilisé pour le débogage natif/C++. Cependant, à l’aide de Visual Studio, GitHub hébergé le serveur de symboles d’électrons et le code source de l’électron, il est assez facile activer le débogage avec points d’arrêt dans le code source de l’électron.

## Exigences en matière

* Version de debug de **A de Electron** : le plus simple est généralement il construire vous-même, en utilisant les outils et composants requis énumérés dans les instructions de[build pour Windows](build-instructions-windows.md). Alors que vous pouvez facilement fixer à et déboguer les électrons comme vous pouvez le télécharger directement, vous trouverez qu’il est fortement optimisé, ce qui rend le débogage sensiblement plus difficile : le débogueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’in-Lining, queue d’appels et autres optimisations du compilateur.

* Studio de **Visual avec Tools** de C++ : les éditions de la communauté gratuite de Visual Studio 2013 et Visual Studio 2015 travaillent tous les deux. Une fois installé, Visual Studio[configure d’utiliser server](setting-up-symbol-server.md) électrons symbole de GitHub. Il permettra à Visual Studio d’acquérir une meilleure compréhension de ce qui se passe à l’intérieur de l’électron, rendant plus facile à présent des variables dans un format lisible par l’homme.

* **ProcMon** : la tool</a> de SysInternals free vous permet d’inspecter un paramètres de processus, déposer les poignées et les opérations de registre.</p></li> </ul> 
    
    ## Fixation au et le débogage des électrons
    
    Pour démarrer une session de débogage, ouvrir PowerShell/CMD et exécuter votre version debug des électrons, à l’aide de l’application à ouvrir en tant que paramètre.
    
    ```powershell
$./out/D/electron.exe ~/my-electron-app/
```

### Définition de points d’arrêt

Puis, ouvrez Visual Studio. Électron n’est pas compilé avec Visual Studio et par conséquent ne contient-elle pas un fichier de projet - vous pouvez cependant ouvrir les fichiers de code source « Comme fichier », ce qui signifie que Visual Studio va ouvrir eux par eux-mêmes. Encore vous pouvez définir les points d’arrêt - Visual Studio effectuera automatiquement que le code source correspond le code qui s’exécute dans le processus attaché et briser en conséquence.

Les fichiers de code correspondant se trouvent dans `./atom/` ainsi que dans Brightray, dans `./vendor/brightray/browser` et `./vendor/brightray/common`. Si vous êtes hardcore, vous pouvez également déboguer chrome directement, qui se trouve évidemment dans `chromium_src`.

### Y attacher

Vous pouvez attacher le débogueur Visual Studio à un processus en cours d’exécution sur un ordinateur local ou distant. Après que le processus est en cours d’exécution, cliquez sur déboguer / attacher au processus (ou appuyez sur `CTRL + ALT + P`) pour ouvrir la boîte de dialogue « Attacher au processus ». Vous pouvez utiliser cette fonctionnalité pour déboguer des applications qui sont exécutent sur un ordinateur local ou distant, déboguer plusieurs processus simultanément.

Si l’électron s’exécute sous un compte d’utilisateur différent, sélectionnez les processus`Show de case à cocher tous les users`. Notez que selon combien BrowserWindows ouvert de votre application, vous verrez plusieurs processus. Une application typique de guichet se traduira dans Visual Studio, vous présentant deux entrées de`Electron.exe` - un pour le programme principal et l’autre pour le processus de rendu. Étant donné que la liste vous donne seulement des noms, il n’y a actuellement aucun moyen fiable de savoir qui est qui.

### Quel procédé dois-je joindre à ?

Code exécuté dans le processus principal (qui est, le code trouvé dans ou éventuellement courir par votre fichier JavaScript principal) ainsi que de code appelé à l’aide de la télécommande (`require('electron').remote`) se déroulera à l’intérieur de la procédure principale, tandis que l’autre code s’exécutera à l’intérieur de son processus de rendu respectifs.

Vous pouvez être attaché à plusieurs programmes lorsque vous déboguez, mais un seul programme est actif dans le débogueur à tout moment. Vous pouvez configurer le programme actif dans la barre d’outils de la Location</code> `Debug ou le window` de Processes.</p>

<h2>À l’aide de ProcMon d’observer un processus</h2>

<p>Alors que Visual Studio est fantastique pour l’inspection des chemins de code spécifiques, force de ProcMon est vraiment à observer tout ce que fait votre application avec le système d’exploitation - il capture fichier, registre, réseau, processus et Détails du processus de profilage. Il tente de se connecter à <strong>all</strong> les événements qui surviennent et peuvent être assez écrasante, mais si vous cherchez à comprendre à quoi et comment votre application effectue le système d’exploitation, il peut être une ressource précieuse.</p>

<p>Pour une introduction aux fonctionnalités de débogage de base et avancées de ProcMon, allez visiter <a href="https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor">this tutorial</a> vidéo fourni par Microsoft.</p>