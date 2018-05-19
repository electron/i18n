# Architecture d'une application Electron

Avant de se plonger dans les APIs Electron, discutons des deux types de processus disponibles dans Electron. Ils sont fondamentalement différents et importants à comprendre.

## Processus Principal et de Rendu

Dans Electron, le processus qui exécute le script `main` dans le `package.json` est appelé le **processus principal**. Le script qui exécute le processus principal peut afficher une interface graphique en créant des pages web. Une application Electron possède toujours un processus principal, jamais plus.

Puisque Electron utilise utilise Chromium pour l'affichage de pages web, l'architecture multiprocessus de Chromium est également utilisée. Chaque page web dans Electron s'exécute dans son propre processus, qui s'appelle le **processus de rendu**.

Dans un navigateur normal, les pages web sont habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder aux ressources natives. Cependant, les utilisateurs d'Electron peuvent utiliser l'API Node.js dans les pages web, ce qui permet des interactions de niveau bas avec le système d'exploitation.

### Différences entre le processus principal et le processus de rendu

Le processus principal créé des pages web en créant des instances de `BrowserWindow`. Chaque instance de `BrowserWindow` exécute la page web dans son propre processus de rendu. Lorsqu’une instance de `BrowserWindow` est détruite, le processus de rendu correspondant est également arrêté.

Le processus principal gère toutes les pages web et leurs processus de rendu associés. Chaque processus de rendu est isolé et se soucie uniquement de la page web dans laquelle il est en cours d’exécution.

Dans les pages web, l'appel aux GUI natifs associés aux APIs n'est pas autorisé car la gestion des ressources GUI natifs dans les pages web est très dangereuse et il est facile d'avoir une fuite de ressource. Si vous voulez effectuer des opérations GUI dans une page web, alors le processus de rendu doit communiquer avec le processus principal pour demander a celui-ci d'effectuer ces opérations.

> #### Aparté : Communication entre processus
> 
> Avec Electron, nous avons plusieurs façons de communiquer entre le processus principal et les processus de rendu. Comme les modules [`ipcRenderer`](../api/ipc-renderer.md) et [`ipcMain`](../api/ipc-main.md) pour envoyer des messages, et le module [remote](../api/remote.md) pour une communication de style RPC. Il y a également une entrée dans la FAQ sur [le partage des données entre les pages web](../faq.md#how-to-share-data-between-web-pages).

## Utiliser les APIs Electron

Électrons offre un certain nombre d’API qui prennent en charge le développement d’une application de bureau dans le processus principal et le processus de rendu. Dans les deux processus vous pouvez accéder aux APIs d'Electron en utilisant require sur le module 'electron' :

```javascript
const electron = require('electron')
```

Toutes les API d’électrons sont assignés à un type de processus. Beaucoup d'entre elles ne peuvent être utilisées que dans le processus principal, certaines dans le processus de rendu uniquement et d'autres dans les deux types de processus. La documentation de chaque API indique dans quel processus elle peut-être utilisée.

Par exemple, une fenêtre est créée à l’aide de la classe `BrowserWindow` qui n'est accessible que dans le processus principal.

```javascript
// Ceci va fonctionner dans le processus principal, mais sera`undefined`
// dans un processus de rendu :
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Puisqu'il est possible de communiquer entre les différents processus, un processus de rendu peut invoquer le processus principal pour effectuer des tâches. Electron contient un module appelé `remote` qui permet d'accéder, depuis un processus de rendu, aux APIs disponibles uniquement dans le processus principal. Afin de créer un `BrowserWindow` depuis un processus de rendu, nous utiliserions remote comme un intermédiaire :

```javascript
// Ceci fonctionnera dans un processus de rendu, mais sera `undefined`
// dans le processus principal :
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Utilisation des APIs de Node.js

Electron exposes full access to Node.js both in the main and the renderer process. This has two important implications:

1) All APIs available in Node.js are available in Electron. Calling the following code from an Electron app works:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](./security.md).

2) You can use Node.js modules in your application. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

```sh
npm install --save aws-sdk
```

Then, in your Electron app, require and use the module as if you were building a Node.js application:

```javascript
// Un client AWS S3 prêt à utiliser
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).