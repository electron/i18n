# Glossaire

Cette page définit certaines terminologies qui sont couramment utilisées dans le développement d'Electron.

### ASAR

ASAR signifie Atom Shell Archive Format. Une archive [asar][asar] est un simple fichier `.tar`, comme le format de compression de fichiers. Electron peut lire les fichiers sans avoir à décompresser l'archive.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

La bibliothèque de Runtime C (CRT) est la partie de la bibliothèque Standard C++ qui intègre la bibliothèque standard ISO C99. Les bibliothèques Visual C++ qui implémentent le CRT supportent le développement de code natif, de code mixte natif et managé ainsi que le code managé pur pour le développement .NET.

### DMG

Une Image disque Apple est un format de package utilisé par macOS. Les fichiers DMG sont couramment utilisés pour distribuer un  "installateur" d'une application. [electron-builder][] prend en charge le `dmg` comme format de compilation.

### IME

Éditeur de méthode d'entrée (Input Method Editor). Un programme qui permet aux utilisateurs d'entrer des caractères et des symboles n'existant pas sur leur clavier. Par exemple, cela permet aux utilisateurs de clavier Latin d'entrer des caractères chinois, japonais, coréen et hindi.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main][] and [renderer][] processes.

### libchromiumcontent

Une bibliothèque partagée qui inclut le [module Chromium Content][] et toutes ses dépendances (par exemple Blink, [V8][], etc.). Aussi dénommé "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process (processus principal)

Le processus principal, généralement un fichier nommé `main.js`, est le point d'entrée de chaque application Electron. Il contrôle la vie de l'application, de l'ouverture à la fermeture. Il gère également les éléments natifs tels que le Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. L'API complète de Node est intégrée.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Voir aussi : [processus](#process), [processus de rendu](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. Pour plus de détails sur la soumission de votre application au MAS, consultez le [Guide de soumission du Mac App Store][].

### Mojo

Un système IPC pour la communication intra - ou inter-processus, et c’est important car Chrome a tendance à diviser ses tâches dans des processus distincts ou non, en fonction des contraintes de mémoire etc.

Voir https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### modules natifs

Les modules natifs (également appelés [addons][] dans Node.js) sont des modules écrits en C ou C++ qui peuvent être chargés dans Node.js ou Electron à l'aide de la fonction require() et sont utilisés comme si ils étaient des modules ordinaires de Node.js. Ils sont utilisés principalement pour fournir une interface entre JavaScript s'exécutant dans les librairies Node.js et C/C++.

Les modules natifs de Node sont pris en charge par Electron, mais étant donné qu'Electron est très susceptible d'utiliser une version différente de V8 du binaire Node installée sur votre système. Vous devez spécifier manuellement l'emplacement des en-têtes d'Electron, lors de la compilation de modules natifs.

Voir aussi [Utilisation des modules natifs de Node][].

### NSIS

Nullsoft Scriptable Install System est un programme d'installation d'outil pilotée par script pour Microsoft Windows. Il est distribué sous une combinaison de licences de logiciels libres et est une alternative largement utilisée par des produits propriétaire commerciales comme InstallShield. [electron-builder][] prend en charge NSIS comme format de build.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### processus (process)

Un processus est une instance d'un programme d'ordinateur en execution. Les apps Electron qui utilisent le processus [principal][] et un ou plusieurs processus [de rendu][] font tourner plusieurs programmes en même temps.

Dans Node.js et Electron, chaque processus en execution ont un objet `processus`. Cet objet global donne des informations et permet de contrôler le processus current. Comme une variable global, cet objet est disponible dans l'application sans utiliser require().

Voir aussi : [processus principal](#main-process), [processus de rendu](#renderer-process)

### processus de rendu (renderer process)

Le processus de rendu est une fenêtre de navigateur dans votre application. Contrairement au processus principal, il peut y en avoir plusieurs et chacun est exécuté dans un processus distinct. They can also be hidden.

Dans un navigateur normal, les pages web sont habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder aux ressources natives. Cependant, les utilisateurs d'Electron peuvent utiliser l'API Node.js dans les pages web, ce qui permet des interactions de niveau bas avec le système d'exploitation.

Voir aussi : [processus](#process), [processus principal](#main-process)

### Squirrel

Squirrel est un framework open-source permettant aux apps Electron de se mettre à jour automatiquement quand une nouvelle version est disponible. Voir l'API [autoUpdater][] pour plus d'informations sur comment démarrer avec Squirrel.

### userland

Ce terme provient de la communauté Unix, où "userland" ou "userspace" fait référence aux programmes qui s'exécutent en dehors du noyau de système d'exploitation. Plus récemment, le terme a été popularisé dans Node et la communauté npm afin d'établir une distinction entre les fonctionnalités disponibles dans "Node core" par rapport aux paquets publié au registre npm par une grande majorité "d'utilisateurs" de la communauté.

Comme Node, Electron se concentre sur le fait d'avoir un petit ensemble d'APIs qui fournissent tout le nécessaire primaire pour développer des applications de bureau multiplateformes. Cette philosophie de conception permet à Electron de rester un outil souple sans être trop normative sur la façon dont il doit être utilisé. L'Userland permet aux utilisateurs de créer et partager des outils qui fournissent des fonctionnalités supplémentaires au dessus de ce qui est disponible dans le « noyau ».

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron compile V8 de Chromium et fait pointer Node à ce V8 pendant la compilation.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. Il n’a pas les mêmes autorisations que votre page web et toutes les interactions entre votre application et le contenu incorporé seront asynchrones. Cela protège votre application du contenu incorporé.

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[module Chromium Content]: https://www.chromium.org/developers/content-module
[electron-builder]: https://github.com/electron-userland/electron-builder
[Guide de soumission du Mac App Store]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[principal]: #main-process
[renderer]: #renderer-process
[de rendu]: #renderer-process
[Utilisation des modules natifs de Node]: tutorial/using-native-node-modules.md
[V8]: #v8
