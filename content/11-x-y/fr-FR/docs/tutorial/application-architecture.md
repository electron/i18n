# Architecture d'une application Electron parsian

Avant de se plonger dans les APIs Electron, discutons des deux types de processus disponibles dans Electron.فارسی ترجمه شود They are fundamentally different and important to understand.فارسی ترجمه زبان.

## فرآیندهای اصلی و رندرینگparsian

Dans Electron, le processus qui exécute le script `main` dans le `package.json` est appelé le __processus principal__. Le script qui exécute le processus principal peut afficher une interface graphique en créant des pages web. Une application Electron possède toujours un processus principal, jamais plus.

Puisque Electron utilise Chromium pour l'affichage de pages web, l'architecture multiprocessus de Chromium est également utilisée. Chaque page web dans Electron s'exécute dans son propre processus, qui s'appelle le __processus de rendu__.

Dans un navigateur normal, les pages web sont habituellement exécuté dans un environnement sandbox et ne sont pas autorisé à accéder aux ressources natives. Cependant, les utilisateurs d'Electron peuvent utiliser l'API Node.js dans les pages web, ce qui permet des interactions bas niveau avec le système d'exploitation.

### Différences entre le processus principal et le processus de rendu

Le processus principal créé des pages web en créant des instances de `BrowserWindow`. Chaque instance de `BrowserWindow` exécute la page web dans son propre processus de rendu. Lorsqu’une instance de `BrowserWindow` est détruite, le processus de rendu correspondant est également arrêté.

Le processus principal gère toutes les pages web et leurs processus de rendu associés. Chaque processus de rendu est isolé et se soucie uniquement de la page web dans laquelle il est en cours d’exécution.

Dans les pages web, l'appel aux GUI natifs associés aux APIs n'est pas autorisé car la gestion des ressources GUI natifs dans les pages web est très dangereuse et il est facile d'avoir une fuite de ressource. Si vous voulez effectuer des opérations GUI dans une page web, alors le processus de rendu doit communiquer avec le processus principal pour demander a celui-ci d'effectuer ces opérations.

> #### Aparté : Communication entre processus
> 
> Dans Electron, communication entre le processus principal et les processus de rendu, se fait à travers le [`ipcRender`](../api/ipc-renderer.md) et [`ipcMain`](../api/ipc-main.md) modules. Il y a aussi une entrée dans la FAQ sur [comment partager des données entre les pages web][share-data].


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

Comme la communication entre les processus est possible, un processus de rendu peut faire appel au processus principal pour effectuer des tâches via IPC.

```javascript
// Dans le processus principal :
const { ipcMain } = require('electron')

ipcMain. andle('perform-action', (event, ...args) => {
  // ... faire quelque chose au nom du rendu ...
})

// Dans le processus de rendu :
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

Notez que le code dans le moteur de rendu peut ne pas être digne de confiance, donc il est important de valider soigneusement dans les demandes de processus principaux provenant de rendus, surtout s'ils hébergent du contenu tiers.

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

Comme vous pouvez l'imaginer, ceci à de lourdes implications sur la sécurité si vous tentez de charger du contenu distant. Vous pouvez trouver plus d’informations et conseils sur le chargement de contenu distant dans notre [Documentation sur la sécurité][security].

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

The vast majority of Node.js modules are _not_ native. Seulement 400 sur environ 650 000 modules sont natifs. Toutefois, si vous avez besoin d'utiliser un module natif, veuillez consulter [ce guide sur la compilation des modules natifs pour Electron][native-node].

[security]: ./security.md
[native-node]: ./using-native-node-modules.md
[share-data]: ../faq.md#how-to-share-data-between-web-pages
