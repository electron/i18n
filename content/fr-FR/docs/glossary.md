# Glossaire

Cette page définit certaines terminologies qui sont couramment utilisées dans le développement d'Electron.

### ASAR

ASAR signifie Atom Shell Archive Format. Une archive [asar][] est un simple fichier `.tar`, comme le format de compression de fichiers. Electron peut lire les fichiers sans avoir à décompresser l'archive.

Le format ASAR a été créé principalement pour améliorer les performances sous Windows lorsque il y a de grandes quantités de petits fichiers ( par ex. lors du chargement de l'arborescence des dépendances JavaScript de votre application depuis `node_modules`).

### signature de code

La signature de code est un processus où un développeur d'applications signe numériquement son code pour assurer qu'il n'a pas été altéré après l'empaquetage. Windows et macOS implémentent leur propre version de signature de code. En tant que développeur d'applications de bureau, il est important que vous signiez votre code si vous prévoyez de le distribuer au grand public.

Pour plus d'informations, lisez le tutoriel [Signature de code][].

### isolement du contexte

L’isolation de contexte est une mesure de sécurité d'Electron qui garantit que votre script de préchargement(preload) ne peut pas permettre que le site web contenu dans le WebContent n'accède aux API d’Électron ou de Node.js. Avec l'isolement de contexte activé, le seul moyen d'exposer les API de votre script de préchargement est de passer par l'API `contextBridge`.

Pour plus d'informations, lisez le tutoriel [Isolation du contexte][].

Voir aussi: [script preload](#preload-script), [processus de rendu](#renderer-process)

### CRT

La bibliothèque de Runtime C (CRT) est la partie de la bibliothèque Standard C++ intégrant la bibliothèque standard ISO C99. Les bibliothèques Visual C++ qui implémentent le CRT supportent le développement de code natif, de code mixte natif et managé ainsi que le code managé pur pour le développement .NET.

### DMG

Une Image disque Apple est un format de package utilisé par macOS. Les fichiers DMG sont couramment utilisés pour distribuer un « installateur » d'une application.

### IME

Éditeur de méthode d'entrée (Input Method Editor). Un programme qui permet aux utilisateurs d'entrer des caractères et des symboles n'existant pas sur leur clavier. Par exemple, cela permet aux utilisateurs de clavier Latin d'entrer des caractères chinois, japonais, coréen et hindi.

### IDL

Interface description language. Décrit les signatures des fonctions et des types de données dans un format qui peut être utilisé pour générer des interfaces en Java, C++, JavaScript, etc.

### IPC

IPC signifie communication inter-processus. Electron utilise les IPC pour envoyer des messages sérialisés en JSON entre le processus principal et les processus de rendu.

voir aussi : [processus principal](#main-process), [processus de rendu](#renderer-process)

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

Voir aussi: [IPC](#ipc)

### MSI

Sous Windows, les paquets MSI sont utilisés par le service Windows Installer (également connu sous le nom d'installateur Microsoft) pour installer et configurer des applications .

Plus d'informations peuvent être trouvées dans la documentation de [Microsoft][msi].

### modules natifs

Les modules natifs (également appelés [addons][] dans Node.js) sont des modules écrits en C ou C++ qui peuvent être chargés dans Node.js ou Electron à l'aide de la fonction require() et sont utilisés comme si ils étaient des modules ordinaires de Node.js. Ils sont utilisés principalement pour fournir une interface entre JavaScript s’exécutant dans les librairies Node.js et C/C++.

Les modules natifs de Node sont pris en charge par Electron, mais étant donné qu'Electron est très susceptible d'utiliser une version différente de V8 du binaire Node installée sur votre système. Vous devez spécifier manuellement l'emplacement des en-têtes d'Electron, lors de la compilation de modules natifs.

Pour plus d'informations, lisez le tutoriel [Modules de Node Natif].

### notarization

Notarization is a macOS-specific process where a developer can send a code-signed app to Apple servers to get verified for malicious components through an automated service.

See also: [code signing](#code-signing)

### OSR

OSR (offscreen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

For more information, read the [Offscreen Rendering][][osr] tutorial.

### preload script

Preload scripts contain code that executes in a renderer process before its web contents begin loading. These scripts run within the renderer context, but are granted more privileges by having access to Node.js APIs.

See also: [renderer process](#renderer-process), [context isolation](#context-isolation)

### processus (process)

Un processus est une instance d'un programme d'ordinateur en execution. Les apps Electron qui utilisent le processus [principal][] et un ou plusieurs processus [de rendu][] font tourner plusieurs programmes en même temps.

Dans Node.js et Electron, chaque processus en execution ont un objet `processus`. Cet objet global donne des informations et permet de contrôler le processus current. Comme une variable global, cet objet est disponible dans l'application sans utiliser require().

Voir aussi : [processus principal](#main-process), [processus de rendu](#renderer-process)

### processus de rendu (renderer process)

Le processus de rendu est une fenêtre de navigateur dans votre application. Contrairement au processus principal, il peut y en avoir plusieurs et chacun est exécuté dans un processus distinct. Ils peuvent également être cachés.

Voir aussi : [processus](#process), [processus principal](#main-process)

### mode bac à sable

The sandbox is a security feature inherited from Chromium that restricts your renderer processes to a limited set of permissions.

For more information, read the [Process Sandboxing][] tutorial.

See also: [process](#process)

### Squirrel

Squirrel est un framework open-source permettant aux apps Electron de se mettre à jour automatiquement quand une nouvelle version est disponible. Voir l'API [autoUpdater][] pour plus d’informations sur comment démarrer avec Squirrel.

### userland

Ce terme provient de la communauté Unix, où « userland » ou « userspace » fait référence aux programmes qui s’exécutent en dehors du noyau de système d’exploitation. Plus récemment, le terme a été popularisé dans Node et la communauté npm afin d’établir une distinction entre les fonctionnalités disponibles dans « Node core » par rapport aux paquets publié au registre npm par une grande majorité « d'utilisateurs » de la communauté.

Comme Node, Electron se concentre sur le fait d'avoir un petit ensemble d'APIs qui fournissent tout le nécessaire primaire pour développer des applications de bureau multiplateformes. Cette philosophie de conception permet à Electron de rester un outil souple sans être trop normative sur la façon dont il doit être utilisé. L'Userland permet aux utilisateurs de créer et partager des outils qui fournissent des fonctionnalités supplémentaires au dessus de ce qui est disponible dans le « noyau ».

### V8

V8 est le moteur JavaScript open source de Google. Il est écrit en C++ et est utilisé dans Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

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
[Signature de code]: tutorial/code-signing.md
[Isolation du contexte]: tutorial/context-isolation.md
[Guide de soumission du Mac App Store]: tutorial/mac-app-store-submission-guide.md
[principal]: #main-process
[msi]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[Offscreen Rendering]: tutorial/offscreen-rendering.md
[Process Sandboxing]: tutorial/sandbox.md
[de rendu]: #renderer-process
