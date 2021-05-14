# FAQ Electron

## Pourquoi ai-je des difficultés à installer Electron ?

Lorsque vous exécutez `npm install electron`, certains utilisateurs rencontrent parfois des erreurs d'installation.

Dans la plupart des cas, ces erreurs sont le résultat d'un problème de réseau et non un soucis avec le packet npm `electron`. Les erreurs comme `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` et `ETIMEDOUT` sont toutes des indications d'un problème de réseau. La meilleure solution est d'essayer en changeant de réseau ou juste d'attendre un peu et de réessayer l'installation.

Vous pouvez également essayer de télécharger Electron directement depuis [electron/electron/releases](https://github.com/electron/electron/releases) si l'installation via `npm` ne marche pas.

## Quand est-ce qu'Electron aura la dernière mise à jour de Chrome ?

La version Chrome d'Electron est généralement mise à jour entre une et deux semaines après qu'une nouvelle mise à jour stable de Chrome soit disponible. Cette estimation n'est toutefois pas garantie et dépend de l'effort nécessaire pour faire la mise à jour.

Seul le canal stable de Chrome est utilisé. Si un correctif important est dans le canal bêta ou développeur , nous le rétroporterons.

Pour plus d'informations, veuillez voir [l'introduction à la sécurité](tutorial/security.md).

## Quand est-ce qu'Electron aura la dernière mise à jour de Node.js?

Quand une nouvelle version de Node.js est disponible, nous attendons généralement un mois avant de faire la mise à jour du Node.js d'Electron. Ainsi nous évitons d'être affectés par des bugs introduits dans les nouvelles versions de Node.js, ce qui arrive très souvent.

Les nouvelles fonctionnalités de Node.js sont généralement ajoutées dans les mises à jour de V8. Depuis qu'Electron utilise la V8 du navigateur Chrome, les nouvelles fonctionnalités JavaScript d'une nouvelle version de Node.js sont généralement déjà dans Electron.

## Comment partager les données entre les pages web ?

Pour partager des données entre les pages web (les processus de rendu), le moyen le plus simple est d'utiliser les APIs HTML5 qui sont déjà disponibles dans les navigateurs. Les bons candidats sont [API Storage][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage] et [IndexedDB][indexed-db].

Vous pouvez également utiliser les primitives IPC fournies par Electron. Pour partager des données entre le processus principal et le moteur de rendu, vous pouvez utiliser les modules [`ipcMain`](api/ipc-main.md) et [`ipcRenderer`](api/ipc-renderer.md). Pour communiquer directement entre les pages web, vous pouvez envoyer un [`Port Messagerie`][message-port] de l'une à l'autre, éventuellement via le processus principal en utilisant [`ipcRenderer. ostMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). La communication ultérieure sur les ports de message est directe et ne détache pas à travers le processus principal.

## La fenêtre/icône de mon application a disparu au bout de quelques minutes.

Cela se produit lorsque la variable qui sert à stocker la fenêtre/icône est détruite par le ramasse-miettes.

Si vous rencontrez ce problème, les articles suivants peuvent s'avérer utiles :

* [Gestion de la mémoire][memory-management]
* [Portée des variables][variable-scope]

Si vous voulez une solution rapide, vous pouvez mettre les variables en globale en changeant votre code de ceci :

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

pour cela :

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Je ne peux pas utiliser jQuery/RequireJS/Meteor/AngularJS avec Electron.

En raison de l'intégration de Node.js dans Electron, il y a quelques symboles supplémentaires insérés dans le DOM comme `module`, `exports`, `require`. Cela pose des problèmes pour certaines bibliothèques, puisqu'ils veulent insérer des symboles avec les mêmes noms.

Pour résoudre ce problème, vous pouvez désactiver l'intégration de node dans Electron :

```javascript
// Dans le processus main.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Mais si vous voulez garder la possibilité d'utiliser Node.js et l'API Electron, vous devez renommer les symboles dans la page avant d’inclure d'autres bibliothèques :

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined.

Lorsque vous utilisez le module intégré d'Electron, vous pouvez obtenir une erreur comme celle-ci :

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Il est très probable que vous utilisez le module dans le mauvais processus. Par exemple `electron.app` peut seulement être utilisé dans le processus principal, tandis que `electron.webFrame` n'est disponible que dans les processus de rendu.

## La police semble floue, qu'est-ce et à que puis-je faire?

Si [sub-pixel anti-aliasing](https://alienryderflex.com/sub_pixel/) est désactivé sur les écrans LCD les polices peuvent être floues. Exemple . Exemple :

![Exemple de rendu de sous-pixel][]

L'anticrénelage des sous-pixels nécessite un fond non transparent pour la fenêtre contenant les glyphes d'une police d'écriture. (Voir [cette issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) pour plus d'infos).

Pour atteindre cet objectif, définissez l'arrière-plan du constructeur pour [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

L'effet n'est visible que sur (certains?) Écrans LCD. Même si vous ne voyez pas de différence, certains de vos utilisateurs peuvent le faire. Il est préférable de toujours définir le contexte de cette manière, à moins que vous n'ayez des raisons de ne pas le faire.

Veuillez noter que simplement paramétrer la couleur de fond avec le CSS ne donnera pas l'effet souhaité.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[message-port]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[browser-window]: api/browser-window.md
[Exemple de rendu de sous-pixel]: images/subpixel-rendering-screenshot.gif
