# Glossaire

Cette page définit certaines terminologies qui sont couramment utilisées dans le développement d'Electron.

### ASAR

ASAR signifie Atom Shell Archive Format. Une archive [asar](https://github.com/electron/asar) est un simple fichier `.tar`, comme le format de compression de fichiers. Electron peut lire les fichiers sans avoir à décompresser l'archive.

Le format ASAR a été créé principalement pour améliorer les performances sur Windows... TODO

### Brightray

[Brightray](https://github.com/electron/brightray) est une bibliothèque statique qui rend [libchromiumcontent](#libchromiumcontent) plus facile à utiliser dans les applications. Il a été créé spécifiquement pour Electron, mais peut être utilisé pour activer le moteur de rendu de Chromium dans des applications natives qui ne reposent pas sur Electron.

Brightray est une dépendance de bas niveau d’Electron qui ne concerne pas la majorité des utilisateurs d'Electron.

### DMG

Une Image disque Apple est un format de package utilisé par macOS. Les fichiers DMG sont couramment utilisés pour distribuer un « installateur » d'une application. [electron-builder](https://github.com/electron-userland/electron-builder) prend en charge le `dmg` comme format de build.

### IPC

IPC est synonyme de Communication inter-processus. Electron utilise l'IPC pour envoyer des messages JSON sérialisés entre les processus [principaux](#main-process) et de [rendu](#renderer-process) .

### libchromiumcontent

C'est une bibliothèque unique et partagée qui inclut le module Chromium Content et toutes ses dépendances (par ex., Blink, [V8](#v8), etc..).

### Main process (processus principal)

Le processus principal (main process en Anglais), généralement un fichier nommé `main.js`, est le point d'entrée pour chaque application Electron. Il contrôle l'état de l'application, de son ouverture à sa fermeture. Il gère également les éléments natifs tels que le Menu, Meny Bar, Dock, Tray, etc.. Le processus principal est responsable de la création de chaque nouveau processus de rendu dans l’app. L'API Node y est complètement intégrée.

Le fichier du processus principal d'une app est spécifié dans la propriété `main` du `package.json`. C'est comme ça qu'`Electron` sait quel fichier exécuter au démarrage.

Voir aussi : [processus](#process), [processus de rendu](#renderer-process)

### MAS

Acronyme pour Mac App Store d'Apple. Pour plus d’informations sur la soumission de votre application pour le MAS, consultez le [Guide de soumission sur le Mac App Store](tutorials/mac-app-store-submission-guide.md).

### Modules natifs

Les modules natifs (également appelés [addons](https://nodejs.org/api/addons.html) dans Node.js) sont des modules écrits en C ou C++ qui peuvent être chargés dans Node.js ou Electron à l’aide de la fonction require() et utilisé comme si ils étaient un module de Node.js ordinaire. Ils sont utilisés principalement pour fournir une interface entre JavaScript s’exécutant dans les librairies Node.js et C/C++.

Les modules natifs de Node sont pris en charge par Electron, mais étant donné qu'Electron est très susceptible d’utiliser une version différente de V8 du Node binaire installée sur votre système. Vous devez spécifier manuellement l’emplacement des en-têtes d'Electron, lors de la compilation de modules natifs.

Voir aussi [Utilisation des modules natifs de Node](tutorial/using-native-node-modules.md).

## NSIS

Nullsoft Scriptable Install System est un programme d’installation d'outil pilotée par script pour Microsoft Windows. Il est distribué sous une combinaison de licences de logiciels libres et est une alternative largement utilisée par des produits propriétaire commerciales comme InstallShield. [électron-constructeur](https://github.com/electron-userland/electron-builder) prend en charge NSIS comme format de build.

### processus (process)

Un processus est une instance d'un programme d'ordinateur en execution. Les apps Electron qui utilisent le processus [main](#main-process) et un ou plusieurs processus [renderer](#renderer-process) font tourner plusieurs programmes en même temps.

Dans Node.js et Electron, chaque processus en execution ont un objet `processus`. Cet objet global donne des informations et permet de contrôler le processus current. Comme une variable global, cet objet est disponible dans l'application sans utiliser require().

Voir aussi : [processus principal](#main-process), [processus de rendu](#renderer-process)

### processus de rendu (renderer process)

Le processus de rendu est une fenêtre de navigateur dans votre application. Contrairement au processus principal, il peut y en avoir plusieurs et chacun sont exécutés dans un processus séparé. Ils peuvent également être masqués.

Dans un navigateur normal, les pages web sont habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder aux ressources natives. Cependant, les utilisateurs d'Electron peuvent utiliser l'API Node.js dans les pages web, ce qui permet des interactions de niveau bas avec le système d'exploitation.

Voir aussi : [process](#process), [main process](#main-process)

### Squirrel

Squirrel est un framework open-source permettant aux apps Electron de se mettre à jour automatiquement quand une nouvelle version est disponible. Voir l'API [autoUpdater](api/auto-updater.md) pour plus d’informations sur comment démarrer avec Squirrel.

### Userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 est le moteur JavaScript open source de Google. Il est écrit en C++ et est utilisé dans Google Chrome. V8 peut tourner en standalone, ou peut être intégré dans n’importe quelle application C++.

### WebView

Les balises `webview` sont utilisées pour l'intégration du contenu 'guest' (par exemple, des pages web externes) dans votre application Electron. Ils sont similaires aux `iframes`, mais diffèrent par le fait que chaque webview s'exécute dans un processus séparé. Il n’a pas les mêmes autorisations que votre page web et toutes les interactions entre votre application et le contenu incorporé seront asynchrones. Cela protège votre application du contenu incorporé.