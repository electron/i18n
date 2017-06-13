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

### main process (processus principal)

Le processus principal (main process en Anglais), généralement un fichier nommé `main.js`, est le point d'entrée pour chaque application Electron. Il contrôle l'état de l'application, de son ouverture à sa fermeture. Il gère également les éléments natifs tels que le Menu, Meny Bar, Dock, Tray, etc.. Le processus principal est responsable de la création de chaque nouveau processus de rendu dans l’app. L'API Node y est complètement intégrée.

Le fichier du processus principal d'une app est spécifié dans la propriété `main` du `package.json`. C'est comme ça qu'`Electron` sait quel fichier exécuter au démarrage.

Voir aussi : [processus](#process), [processus de rendu](#renderer-process)

### MAS

Acronyme pour Mac App Store d'Apple. Pour plus d’informations sur la soumission de votre application pour le MAS, consultez le [Guide de soumission sur le Mac App Store](tutorials/mac-app-store-submission-guide.md).

### modules natifs

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

Voir aussi [Utilisation des modules natifs de Node](tutorial/using-native-node-modules.md).

## NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### processus

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

Voir aussi : [processus principal](#main-process), [processus de rendu](#renderer-process)

### processus de rendu

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

Voir aussi : [processus](#process), [processus principal](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.