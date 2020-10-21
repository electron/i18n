# Windows 10 sur Arme

Si votre application fonctionne avec Electron 6.0.8 ou supérieur, vous pouvez maintenant la compiler pour Windows 10 sur Arm. Cela améliore considérablement les performances, mais nécessite une recompilation de tous les modules natifs utilisés dans votre application. Il peut également nécessiter de petites corrections pour vos scripts de compilation et d'empaquetage.

## Exécution d'une application basique
Si votre application n'utilise aucun module natif, alors il est vraiment facile de créer une version Arm de votre application.

1. Assurez-vous que le répertoire `node_modules` de votre application est vide.
2. En utilisant un _Command Prompt_, exécutez `set npm_config_arch=arm64` avant d'exécuter `npm install`/`yarn install` comme d'habitude.
3. [Si vous avez Electron installé en tant que dépendance de développement](quick-start.md#prerequisites), npm téléchargera et décompressera la version arm64. Vous pouvez ensuite empaqueter et distribuer votre application normalement.

## Considérations générales

### Code spécifique à l'architecture

Beaucoup de code spécifique à Windows contient si... sinon logique qui sélectionne entre les architectures x64 ou x86.

```js
if (process.arch === 'x64') {
  // Faire une chose de 64 bits...
} else {
  // Faire une chose 32-bit...
}
```

Si vous voulez cibler arm64, une telle logique sélectionnera typiquement la mauvaise architecture, donc vérifiez soigneusement votre application et les scripts de compilation pour des conditions comme celle-ci. Dans les scripts de compilation et d'empaquetage personnalisés, vous devriez toujours vérifier la valeur de `npm_config_arch` dans l'environnement, plutôt que de s'appuyer sur l'arche du processus courant.

### Modules natifs
Si vous utilisez des modules natifs, vous devez vous assurer qu'ils compilent avec la v142 du compilateur MSVC (fourni dans Visual Studio 2017). Vous devez également vérifier que tous les `.dll` ou `pré-construits. les fichiers ib` fournis ou référencés par le module natif sont disponibles pour Windows sur Arm.

### Tester votre application
Pour tester votre application, utilisez un appareil Windows sur Arm sous Windows 10 (version 1903 ou plus récente). Assurez-vous que vous copiez votre application sur le périphérique cible - le sandbox de Chromium ne fonctionnera pas correctement lors du chargement des ressources de votre application depuis un emplacement réseau.

## Prérequis pour le développement
### Node.js/gyp

[Node.js v12.9.0 ou supérieur est recommandé.](https://nodejs.org/en/) Si la mise à jour vers une nouvelle version de Node n'est pas souhaitable, vous pouvez à la place [mettre à jour la copie de node-gyp manuellement](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) vers la version 5. .2 ou supérieur, qui contient les modifications nécessaires pour compiler des modules natifs pour Arm.

### Visual Studio 2017
Visual Studio 2017 (n'importe quelle édition) est requis pour la compilation croisée de modules natifs. Vous pouvez télécharger Visual Studio Community 2017 via le programme Microsoft [Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/). Après l'installation, vous pouvez ajouter les composants spécifiques aux Armes en exécutant ce qui suit à partir d'un _Invite de Commandes_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended
```

#### Création d'une invite de commande de compilation croisée
Le paramétrage `npm_config_arch=arm64` dans l'environnement crée le arm64 correct `. bj` fichiers, mais la commande standard _Developer Command Prompt pour VS 2017_ utilisera le lien x64. Pour corriger ceci:

1. Dupliquer le raccourci _x64_x86 Cross Tools Prompt for VS 2017_ (par ex. en le localisant dans le menu Démarrer, faites un clic droit, en sélectionnant _Ouvrir l'emplacement du fichier_, en copiant et en collant dans un endroit pratique.
2. Faites un clic droit sur le nouveau raccourci et choisissez _Propriétés_.
3. Change le champ _Target_ à lire `vcvarsamd64_arm64.bat` à la fin au lieu de `vcvarsamd64_x86.bat`.

Si cela est fait avec succès, l'invite de commande devrait afficher quelque chose de similaire à cela au démarrage :

```bat
******************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**************************************************************************
[vcvarsall.bat] Environnement initialisé pour: 'x64_arm64'
```

Si vous voulez développer votre application directement sur un périphérique Arm sous Windows, remplacez `vcvarsx86_arm64. à` dans _Target_ pour que la compilation croisée puisse se produire avec l'émulation x86 de l'appareil.

### Liaison avec le `node.lib correct`

Par défaut, `node-gyp` décompile les entêtes de noeuds d'Electron et télécharge les versions x86 et x64 de `noeud. ib` dans `%APPDATA%\. \Local\node-gyp\Cache`, mais il ne télécharge pas la version arm64 ([un correctif est en cours de développement](https://github.com/nodejs/node-gyp/pull/1875). Pour corriger ceci:

1. Téléchargez l’arm64 `node.lib` depuis https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Déplacez-la vers `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Substituez `6.0.9` pour la version que vous utilisez.


## Compilation croisée des modules natifs
Après avoir terminé tout ce qui précède, ouvrez votre invite de commande de compilation croisée et exécutez `set npm_config_arch=arm64`. Ensuite, utilisez `npm install` pour construire votre projet comme d'habitude. Comme pour la compilation croisée de modules x86, vous devrez peut-être supprimer `node_modules` pour forcer la recompilation des modules natifs s'ils ont été précédemment compilés pour une autre architecture.

## Débogage des modules natifs

Le débogage des modules natifs peut être fait avec Visual Studio 2017 (s'exécutant sur votre machine de développement) et [Visual Studio Remote Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) correspondant sur le périphérique cible. Pour déboguer :

1. Lancez votre application `. xe` sur le périphérique cible via la _Demande de commande_ (en passant `--inspect-brk` pour le mettre en pause avant le chargement des modules natifs).
2. Lancez Visual Studio 2017 sur votre machine de développement.
3. Connectez-vous à l'appareil cible en sélectionnant _Débogage > Attacher au processus..._ et entrez l'adresse IP du périphérique et le numéro de port affiché par l'outil de débogage à distance Visual Studio.
4. Cliquez sur _Rafraîchir_ et sélectionnez le [processus Electron approprié à attacher](../development/debug-instructions-windows.md).
5. Vous devrez peut-être vous assurer que tous les symboles des modules natifs de votre application sont chargés correctement. Pour configurer ceci, allez à _Debug > Options..._ dans Visual Studio 2017, et ajoutez les dossiers contenant votre `. db` symboles sous _Débogage > Symboles_.
5. Une fois attaché, définissez tous les points d'arrêt appropriés et reprenez l'exécution JavaScript à l'aide des outils distants [de Chrome pour Node](debugging-main-process.md).

## Obtenir de l'aide supplémentaire
Si vous rencontrez un problème avec cette documentation, ou si votre application fonctionne lorsqu'elle est compilée pour x86 mais pas pour arm64, veuillez [remplir un problème](../development/issues.md) avec "Windows on Arm" dans le titre.
