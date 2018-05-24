# Glossaire

Cette page définit certaines terminologies qui sont couramment utilisées dans le développement d'Electron.

### ASAR

ASAR signifie Atom Shell Archive Format. Une archive [asar](https://github.com/electron/asar) est un simple fichier `.tar`, comme le format de compression de fichiers. Electron peut lire les fichiers sans avoir à décompresser l'archive.

Le format ASAR a été créé principalement pour améliorer les performances sur Windows... TODO

### Brightray

Brightray [était](https://github.com/electron-archive/brightray) une bibliothèque statique qui rend l'utilisation de [libchromiumcontent](#libchromiumcontent) plus simple dans les applications. Il est désormais obsolète et a été implémenté dans le code d'Electron.

### CRT

La bibliothèque de Runtime C (CRT) est la partie de la bibliothèque Standard C++ qui intègre la bibliothèque standard ISO C99. Les bibliothèques Visual C++ qui implémentent le CRT soutiennent le développement de code natif et code mixte natif et managé ainsi que le code managé pur pour le développement .NET.

### DMG

Une Image disque Apple est un format de package utilisé par macOS. Les fichiers DMG sont couramment utilisés pour distribuer un « installateur » d'une application. [electron-builder](https://github.com/electron-userland/electron-builder) prend en charge le `dmg` comme format de build.

### IME

Éditeur de méthode d'entrée (Input Method Editor). Un programme qui permet aux utilisateurs d'entrer des caractères et des symboles n'existant pas sur leur clavier. Par exemple, cela permet aux utilisateurs de clavier Latin d'entrer des caractères chinois, japonais, coréen et hindi.

### IDL

Langage de description d'interface. Permet d'écrire des signatures de fonction et des types de données dans un format qui peut être utilisé pour générer des interfaces en Java, C++, JavaScript, etc.

### IPC

IPC est synonyme de Communication inter-processus. Electron utilise l'IPC pour envoyer des messages JSON sérialisés entre le processus [principal](#main-process) et les processus de [rendu](#renderer-process) .

### libchromiumcontent

Une bibliothèque partagée qui inclut le [module Chromium Content](https://www.chromium.org/developers/content-module) et toutes ses dépendances (par exemple Blink, [V8](#v8), etc.). Aussi dénommé "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process (processus principal)

Le processus principal (main process en Anglais), généralement un fichier nommé `main.js`, est le point d'entrée pour chaque application Electron. Il contrôle l'état de l'application, de son ouverture à sa fermeture. Il gère également les éléments natifs tels que le Menu, Menu Bar, Dock, Tray, etc. Le processus principal est responsable de la création de chaque nouveau processus de rendu dans l'application. L'API Node y est complètement intégrée.

Le fichier du processus principal d'une app est spécifié dans la propriété `main` du `package.json`. C'est comme ça qu'`Electron` sait quel fichier exécuter au démarrage.

Dans Chromium, ce processus est indiqué comme étant un "processus navigateur". Il est renommé dans Electron pour éviter les confusions avec les processus de rendu.

Voir aussi : [processus](#process), [processus de rendu](#renderer-process)

### MAS

Acronyme pour Mac App Store d'Apple. Pour plus d'informations sur la soumission de votre application pour le MAS, consultez le [Guide de soumission sur le Mac App Store](tutorial/mac-app-store-submission-guide.md).

### Mojo

Un système IPC pour la communication intra - ou inter-processus, et c’est important car Chrome a tendance à diviser ses tâches dans des processus distincts ou non, en fonction des contraintes de mémoire etc.

Voir https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### modules natifs

Les modules natifs (également appelés [addons](https://nodejs.org/api/addons.html) dans Node.js) sont des modules écrits en C ou C++ qui peuvent être chargés dans Node.js ou Electron à l'aide de la fonction require() et sont utilisés comme si ils étaient des modules ordinaires de Node.js. Ils sont utilisés principalement pour fournir une interface entre JavaScript s'exécutant dans les librairies Node.js et C/C++.

Les modules natifs de Node sont pris en charge par Electron, mais étant donné qu'Electron est très susceptible d'utiliser une version différente de V8 du binaire Node installée sur votre système. Vous devez spécifier manuellement l'emplacement des en-têtes d'Electron, lors de la compilation de modules natifs.

Voir aussi [Utilisation des modules natifs de Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System est un programme d'installation d'outil pilotée par script pour Microsoft Windows. Il est distribué sous une combinaison de licences de logiciels libres et est une alternative largement utilisée par des produits propriétaire commerciales comme InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) prend en charge NSIS comme format de build.

### OSR

OSR (OFF-screen rendering - Rendu hors de l'écran) peut être utilisé pour charger des pages très lourdes en arrière-plan et de les afficher après (cela sera bien plus rapide). Cela nous permet de charger des pages sans les afficher à l'écran.

### processus (process)

Un processus est une instance d'un programme d'ordinateur en execution. Les apps Electron qui utilisent le processus [principal](#main-process) et un ou plusieurs processus [de rendu](#renderer-process) font tourner plusieurs programmes en même temps.

Dans Node.js et Electron, chaque processus en execution ont un objet `processus`. Cet objet global donne des informations et permet de contrôler le processus current. Comme une variable global, cet objet est disponible dans l'application sans utiliser require().

Voir aussi : [processus principal](#main-process), [processus de rendu](#renderer-process)

### processus de rendu (renderer process)

Le processus de rendu est une fenêtre de navigateur dans votre application. Contrairement au processus principal, il peut y en avoir plusieurs et chacun sont exécutés dans un processus séparé. Ils peuvent également être masqués.

Dans un navigateur normal, les pages web sont habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder aux ressources natives. Cependant, les utilisateurs d'Electron peuvent utiliser l'API Node.js dans les pages web, ce qui permet des interactions de niveau bas avec le système d'exploitation.

Voir aussi : [processus](#process), [processus principal](#main-process)

### Squirrel

Squirrel est un framework open-source permettant aux apps Electron de se mettre à jour automatiquement quand une nouvelle version est disponible. Voir l'API [autoUpdater](api/auto-updater.md) pour plus d'informations sur comment démarrer avec Squirrel.

### userland

Ce terme provient de la communauté Unix, où "userland" ou "userspace" fait référence aux programmes qui s'exécutent en dehors du noyau de système d'exploitation. Plus récemment, le terme a été popularisé dans Node et la communauté npm afin d'établir une distinction entre les fonctionnalités disponibles dans "Node core" par rapport aux paquets publié au registre npm par une grande majorité "d'utilisateurs" de la communauté.

Comme Node, Electron se concentre sur le fait d'avoir un petit ensemble d'APIs qui fournissent tout le nécessaire primaire pour développer des applications de bureau multiplateformes. Cette philosophie de conception permet à Electron de rester un outil souple sans être trop normative sur la façon dont il doit être utilisé. L'Userland permet aux utilisateurs de créer et partager des outils qui fournissent des fonctionnalités supplémentaires au dessus de ce qui est disponible dans le « noyau ».

### V8

V8 est le moteur JavaScript open source de Google. Il est écrit en C++ et est utilisé dans Google Chrome. V8 peut tourner en standalone, ou peut être intégré dans n'importe quelle application C++.

Electron compile V8 de Chromium et fait pointer Node à ce V8 pendant la compilation.

Les numéros de version de V8 correspondent toujours à celles de Google Chrome. Chrome 59 comprend V8 5.9, Chrome 58 comprend V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

Les balises `webview` sont utilisées pour l'intégration du contenu 'guest' (par exemple, des pages web externes) dans votre application Electron. Ils sont similaires aux `iframes`, mais diffèrent par le fait que chaque webview s'exécute dans un processus séparé. Il n’a pas les mêmes autorisations que votre page web et toutes les interactions entre votre application et le contenu incorporé seront asynchrones. Cela protège votre application du contenu incorporé.