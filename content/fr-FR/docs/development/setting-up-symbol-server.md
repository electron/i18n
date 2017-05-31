# Mise en place serveur de symboles dans le débogueur

Symboles de débogage vous permettent d’avoir des sessions de débogage mieux. Ils ont des informations sur les fonctions contenues dans les fichiers exécutables et les bibliothèques dynamiques et vous fournissent des renseignements pour obtenir des piles d’appels propre. Un serveur de symboles permet au débogueur de charger les symboles appropriés, les fichiers binaires et sources automatiquement sans forcer les utilisateurs à télécharger de gros fichiers de débogage. Les fonctions de serveur comme server</a> symbole deMicrosoft pour la documentation il peut être utile.</p> 

Notez que parce que des générations d’électrons libérées sont fortement optimisées, débogage n’est pas toujours facile. Le débogueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’in-Lining, queue d’appels et autres optimisations du compilateur. La seule solution est de construire une version locale non optimisée.

L’URL du serveur symbole officiel pour les électrons est https://electron-symbols.githubapp.com. Vous ne pouvez pas visiter cette URL directement, vous devez l’ajouter au chemin de symbole de votre outil de débogage. Dans les exemples ci-dessous, un répertoire de cache local est utilisé pour éviter la lecture à plusieurs reprises l’APB sur le serveur. Remplacez `c:\code\symbols` par un répertoire de cache approprié sur votre ordinateur.

## À l’aide du serveur de symboles dans Windbg

Le chemin de symbole Windbg est configuré avec une valeur de chaîne délimitée par des caractères astérisque. Pour utiliser uniquement le serveur de symboles d’électron, ajoutez l’entrée suivante à votre chemin de symbole (**Note:** vous pouvez remplacer `c:\code\symbols` par n’importe quel répertoire accessible en écriture sur votre ordinateur, si vous préférez un emplacement différent pour téléchargé symboles) :

    SRV * c:\code\symbols\* https://electron-symbols.githubapp.com
    

La valeur de cette chaîne comme `_NT_SYMBOL_PATH` dans l’environnement, en utilisant les menus de Windbg, ou en tapant la commande `.sympath`. Si vous souhaitez obtenir les symboles du serveur de symboles Microsoft aussi bien, vous devez indiquer que le premier :

    SRV * c:\code\symbols\* http://msdl.microsoft.com/download/symbols; SRV * c:\code\symbols\* https://electron-symbols.githubapp.com
    

## À l’aide du serveur de symboles dans Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' /> <img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Dépannage : Symboles seront charge pas

Tapez les commandes suivantes dans Windbg pour imprimer pourquoi pas chargez des symboles :

    > ! sym > bruyant .reload /f electron.exe