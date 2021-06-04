# Configuration du serveur de symboles dans le déboggueur

Les symboles de déboggage vous permettent d’avoir de meilleurs sessions de déboggage. Ils ont des informations sur les fonctions contenues dans les fichiers exécutables et les bibliothèques dynamiques et vous fournissent des renseignements pour obtenir des piles d’appels propre. Un serveur de symboles permet au déboggueur de charger les symboles appropriés, les fichiers binaires et les fichiers sources automatiquement, sans forcer les utilisateurs à télécharger de gros fichiers de déboggage. Documentation sur [Le serveur de symboles de Microsoft](https://support.microsoft.com/kb/311503).

Notez que parce que Electron est fortement optimisé, le déboggage n’est pas toujours facile. Le déboggueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’inlining, queue d’appels et autres optimisations du compilateur. La seule solution est de build une version locale non optimisée.

L’URL du serveur symbole officiel pour Electron est https://symbols.electronjs.org. Vous ne pouvez pas visiter cette URL directement, vous devez l’ajouter au chemin de symbole de votre outil de déboggage. Dans les exemples ci-dessous, un répertoire de cache local est utilisé pour éviter la lecture à plusieurs reprises du PDB sur le serveur. Remplacez `c:\code\symbols` par un répertoire de cache approprié sur votre ordinateur.

## À l’aide du serveur de symboles dans Windbg

Le chemin de symbole Windbg est configuré avec un string délimité par des : *. Pour utiliser uniquement le serveur de symboles d’Electron, ajoutez l’entrée suivante à votre chemin de symbole (**Remarque :** vous pouvez remplacer `c:\code\symbols` par n’importe quel répertoire accessible en écriture sur votre ordinateur, si vous préférez un emplacement différent pour les symboles téléchargés) :

```powershell
SRV*c:\code\symbols\*https://symbols.electronjs.org
```

Définissez le string à `_NT_SYMBOL_PATH` dans l’environnement, en utilisant les menus de Windbg, ou en tapant la commande `.sympath`. Si vous souhaitez obtenir les symboles du serveur de symboles Microsoft, vous devez indiquer cela :

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://symbols.electronjs.org
```

## À l’aide du serveur de symboles dans Visual Studio

![Outils -> Options](https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg) ![Paramètres des symboles](https://mdn.mozillademos.org/files/2497/2005_options.gif)

## Problèmes : Les symboles ne se chargent pas

Tapez les commandes suivantes dans Windbg pour savoir pourquoi les symboles ne se chargent pas:

```powershell
> !sym noisy
> .reload /f electron.exe
```
