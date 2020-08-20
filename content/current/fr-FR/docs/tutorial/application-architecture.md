# Architecture d'une application Electron

Avant de se plonger dans les APIs Electron, discutons des deux types de processus disponibles dans Electron. Ils sont fondamentalement différents et importants à comprendre.

## Processus Principal et de Rendu

Dans Electron, le processus qui exécute le script `main` dans le `package.json` est appelé le __processus principal__. Le script qui exécute le processus principal peut afficher une interface graphique en créant des pages web. Une application Electron possède toujours un processus principal, jamais plus.

Puisque Electron utilise Chromium pour l'affichage de pages web, l'architecture multiprocessus de Chromium est également utilisée. Chaque page web dans Electron s'exécute dans son propre processus, qui s'appelle le __processus de rendu__.

Dans un navigateur normal, les pages web sont habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder aux ressources natives. Cependant, les utilisateurs d'Electron peuvent utiliser l'API Node.js dans les pages web, ce qui permet des interactions bas niveau avec le système d'exploitation.

### Différences entre le processus principal et le processus de rendu

Le processus principal créé des pages web en créant des instances de `BrowserWindow`. Chaque instance de `BrowserWindow` exécute la page web dans son propre processus de rendu. Lorsqu’une instance de `BrowserWindow` est détruite, le processus de rendu correspondant est également arrêté.

Le processus principal gère toutes les pages web et leurs processus de rendu associés. Chaque processus de rendu est isolé et se soucie uniquement de la page web dans laquelle il est en cours d’exécution.

Dans les pages web, l'appel aux GUI natifs associés aux APIs n'est pas autorisé car la gestion des ressources GUI natifs dans les pages web est très dangereuse et il est facile d'avoir une fuite de ressource. Si vous voulez effectuer des opérations GUI dans une page web, alors le processus de rendu doit communiquer avec le processus principal pour demander a celui-ci d'effectuer ces opérations.

> #### Aparté : Communication entre processus
> 
> In Electron, communicating between the main process and renderer processes, is done through the [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).


## Utilisation des APIs Electron

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

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks through IPC.

```javascript
// In the main process:
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... do something on behalf of the renderer ...
})

// In the renderer process:
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

Note that code in the renderer may not be trustworthy, so it's important to carefully validate in the main process requests that come from renderers, especially if they host third-party content.

## Utilisation des APIs de Node.js

Electron expose un accès total à Node.js dans le processus principal et dans les processus de rendu. Cela a deux conséquences importantes :

1) Toutes les APIs disponibles dans Node.js sont disponibles dans Electron. Appeler le code suivant dans une application Electron fonctionne :

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// Ceci affichera tous les fichiers présents à la racine du disque,
// pour '/' ou 'C:\'.
console.log(root)
```

Comme vous pouvez l'imaginer, ceci à de lourdes implications sur la sécurité si vous tentez de charger du contenu distant. Vous pouvez trouver plus d’informations et conseils sur le chargement de contenu distant dans notre [Documentation sur la sécurité](./security.md).

2) Vous pouvez utiliser des modules Node.js dans votre application. Choisissez votre module npm préféré. npm offre actuellement le plus grand repository de code open-source au monde –&nbsp;la possibilité d'utiliser du code bien maintenu et testé qui est normalement réservé à des applications de serveur est une des fonctionnalités majeures d'Electron.

Par exemple, afin d'utiliser les SDK officiel d'AWS dans votre application, vous l'installerez comme une dépendance npm :

```sh
npm install --save aws-sdk
```

Puis, dans votre application Electron, vous pourrez utiliser require pour l'utiliser exactement comme vous le feriez dans une application Node.js :

```javascript
// Un client AWS S3 prêt à utiliser
const S3 = require('aws-sdk/clients/s3')
```

Il y a une mise en garde importante : les modules Node.js natifs (les modules contenant du code natif devant être compilé) devront être compilés pour être utilisés dans Electron.

The vast majority of Node.js modules are _not_ native. Seulement 400 sur environ 650 000 modules sont natifs. Toutefois, si vous avez besoin d'utiliser un module natif, veuillez consulter [ce guide sur la compilation des modules natifs pour Electron](./using-native-node-modules.md).
