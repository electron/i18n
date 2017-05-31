# Glossaire

Cette page définit certaines terminologies qui sont couramment utilisées dans le développement d'Electron.

### ASAR

ASAR signifie atome Shell Archive Format. Une archive de [asar](https://github.com/electron/asar) est un simple format de type`tar` qui concatène des fichiers dans un seul fichier. Électron peut lire les fichiers arbitraires d’elle sans déballage de l’ensemble du dossier.

Le format de l’ASAR a été créé principalement pour améliorer les performances sur Windows... TODO

### Brightray

[Brightray](https://github.com/electron/brightray) est une bibliothèque statique qui rend [libchromiumcontent](#libchromiumcontent) plus facile à utiliser dans les applications. Il a été créé spécifiquement pour les électrons, mais peut être utilisé pour activer le moteur de rendu de chrome dans des applications natives qui ne reposent pas sur des électrons.

Brightray est une dépendance de bas niveau d’électron qui ne concerne pas la majorité des utilisateurs de l’électron.

### DMG

Une Image de disque Apple est un format d’emballage utilisé par Mac OS. Les fichiers DMG sont couramment utilisés pour distribuer l’application « installateurs ». [electron-builder](https://github.com/electron-userland/electron-builder) prend en charge les `dmg` comme une cible de génération.

### IPC

IPC est synonyme de Communication inter-processus. Électrons utilise IPC pour messages JSON envoi sérialisé entre les processus [main](#main-process) et [renderer](#renderer-process).

### libchromiumcontent

Une bibliothèque unique et partagée qui inclut le module chrome contenu et toutes ses dépendances (p. ex., Blink, [V8](#v8), etc.).

### processus principal

Le processus principal (main process), généralement un fichier nommé `main.js`, est le point d'entrée pour chaque application Electron. Il contrôle l'état de l'application, de son ouverture à sa fermeture. Il gère également les éléments natifs tels que le Menu, barre de Menu, Dock, plateau, etc.. Le processus principal est responsable de la création de chaque nouveau processus de rendu dans l’app. La pleine noeud API est intégrée.

Fichier de processus principal de chaque application est spécifié dans la propriété `main` dans `package.json`. Il s’agit `electron .` sait quel fichier à exécuter au démarrage.

Voir aussi : [processus](#process), [processus de rendu](#renderer-process)

### MAS

Acronyme pour Mac App Store d'Apple. Pour plus d’informations sur la soumission de votre application pour le MAS, consultez le [Guide de soumission sur le Mac App Store](tutorials/mac-app-store-submission-guide.md).

### modules natifs

Modules natifs (aussi appelés [addons](https://nodejs.org/api/addons.html) en Node.js) sont des modules écrits en C ou C++ qui peuvent être chargés dans Node.js ou électronique à l’aide de la fonction require() et utilisé comme si ils étaient un module de Node.js ordinaire. Ils sont utilisés principalement pour fournir une interface entre JavaScript s’exécutant dans des bibliothèques de Node.js et C/C++.

Les modules natifs de nœud sont pris en charge par l’électron, mais étant donné que l’électron est très susceptible d’utiliser une version différente de V8 à partir du nœud binaire installée sur votre système, vous devez spécifier manuellement l’emplacement des en-têtes de l’électron, lors de la génération de modules natifs.

Voir aussi [Using Native nœud Modules](tutorial/using-native-node-modules.md).

## NSIS

Nullsoft Scriptable Install System est un programme d’installation pilotée par le script, outil de création pour Microsoft Windows. Il est distribué sous une combinaison de licences de logiciels libres et est une alternative largement utilisée aux spécialités commerciales comme InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) prend en charge les instituts nationaux de statistique comme une cible de génération.

### processus

Un processus est une instance d’un programme informatique qui est en cours d’exécution. Électron apps qui font usage de la [main](#main-process) et un ou plusieurs processus de [renderer](#renderer-process) s’exécutent en fait plusieurs programmes simultanément.

Node.js et électron, chaque processus en cours d’exécution a un objet `process`. Cet objet est un mondial qui fournit des informations sur et la maîtrise, le processus en cours. Comme un global, il est toujours disponible pour les applications sans utiliser require().

Voir aussi : [processus principal](#main-process), [processus de rendu](#renderer-process)

### processus de rendu

Le processus de rendu est une fenêtre de navigateur dans votre application. Contrairement au processus principal, il peut y avoir plusieurs d'entre eux et chacun sont exécutés dans un processus séparé. Ils peuvent également être masqués.

Normale de navigateurs, des pages web habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder à des ressources natives. Utilisateurs de l’électron, cependant, ont le pouvoir d’utiliser Node.js APIs dans les pages web, ce qui permet des interactions de niveau système d’exploitation plus faibles.

Voir aussi : [processus](#process), [processus principal](#main-process)

### Squirrel

L’écureuil est un framework open-source qui permet aux électrons apps mettre à jour automatiquement, comme les nouvelles versions sont publiées. Voir l’API [autoUpdater](api/auto-updater.md) pour l’info sur comment démarrer avec l’écureuil.

### userland

Ce terme daterait de la communauté Unix, où dénommé « userland » ou « userspace » programmes qui s’exécutent en dehors du noyau de système d’exploitation. Plus récemment, le terme a été popularisé dans la communauté nœud et du Musée d’établir une distinction entre les fonctions disponibles dans « Nœud de base » par rapport aux paquets publié au registre du Musée de la communauté de « utilisateur » beaucoup plus grande.

Comme nœud, électron se concentre sur d’avoir un petit ensemble d’API qui fournissent toutes les primitives nécessaires pour développer des applications de bureau multiplateformes. Cette philosophie de conception permet aux électrons de rester un outil souple sans être trop normative sur la façon dont il doit être utilisé. "Userland" permet aux utilisateurs de créer et partager des outils qui fournissent des fonctionnalités supplémentaires sur le dessus de ce qui est disponible dans le « noyau ».

### V8

V8 est moteur de JavaScript open source de Google. Il est écrit en C++ et est utilisé dans Google Chrome. V8 peut tourner, ou peuvent être intégrées dans n’importe quelle application C++.

### webview

`webview` balises sont utilisées pour intégration du contenu « invité » (par exemple, des pages web externes) dans votre application d’électrons. Ils sont semblables aux `iframe`s, mais diffèrent en ce que chaque affichage Web s’exécute dans un processus séparé. Il n’a pas les mêmes autorisations que votre page web et toutes les interactions entre votre application et le contenu incorporé sera asynchrones. Cela protège votre app contre le contenu incorporé.