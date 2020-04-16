# FAQ Electron

## Pourquoi ai-je des difficultés à installer Electron ?

Lorsque vous exécutez `npm install electron`, certains utilisateurs rencontrent parfois des erreurs d'installation.

Dans la plupart des cas, ces erreurs sont le résultat d'un problème de réseau et non un soucis avec le packet npm `electron`. Les erreurs comme `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` et `ETIMEDOUT` sont toutes des indications d'un problème de réseau. La meilleure solution est d'essayer en changeant de réseau ou juste d'attendre un peu et de réessayer l'installation.

Vous pouvez également essayer de télécharger Electron directement depuis [electron/electron/releases](https://github.com/electron/electron/releases) si l'installation via `npm` ne marche pas.

## Quand est-ce qu'Electron aura la dernière mise à jour de Chrome ?

La version Chrome d'Electron est généralement mise à jour entre une et deux semaines après qu'une nouvelle mise à jour stable de Chrome soit disponible. Cette estimation n'est toutefois pas garantie et dépend de l'effort nécessaire pour faire la mise à jour.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Pour plus d'informations, veuillez voir [l'introduction à la sécurité](tutorial/security.md).

## Quand est-ce qu'Electron aura la dernière mise à jour de Node.js?

Quand une nouvelle version de Node.js est disponible, nous attendons généralement un mois avant de faire la mise à jour du Node.js d'Electron. Ainsi nous évitons d'être affectés par des bugs introduits dans les nouvelles versions de Node.js, ce qui arrive très souvent.

Les nouvelles fonctionnalités de Node.js sont généralement ajoutées dans les mises à jour de V8. Depuis qu'Electron utilise la V8 du navigateur Chrome, les nouvelles fonctionnalités JavaScript d'une nouvelle version de Node.js sont généralement déjà dans Electron.

## Comment partager les données entre les pages web ?

Pour partager des données entre les pages web (les processus de rendu), le moyen le plus simple est d'utiliser les APIs HTML5 qui sont déjà disponibles dans les navigateurs. Quelques choix possible : [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) et [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Ou vous pouvez utiliser le système IPC, qui est spécifique à Electron, pour stocker des objets dans le processus principal comme une variable globale, puis d'y accéder depuis les processus de rendu via la propriété `remote` du module `electron` :

```javascript
// Dans le processus main.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## La fenêtre/icône de mon application a disparu au bout de quelques minutes.

Cela se produit lorsque la variable qui sert à stocker la fenêtre/icône est détruite par le ramasse-miettes.

Si vous rencontrez ce problème, les articles suivants peuvent s'avérer utiles :

* [Gestion de la mémoire](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Portée des variables](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Si vous voulez une solution rapide, vous pouvez mettre les variables en globale en changeant votre code comme celui-ci :

```javascript
const { app, Tray } = require('electron')let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

pour cela :

```javascript
const { app, Tray } = require('electron')let tray = null
app.on('ready', () => {
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
let win = new BrowserWindow({
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

Il est très probable que vous utilisez le module dans le mauvais processus.francais Par exemple `electron.app` peut seulement être utilisé dans le processus principal, tandis que `electron.webFrame` n'est disponible que dans les processus de rendu.

## La police semble floue, qu'est-ce et à que puis-je faire?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Exemple :

![exemple de rendu de sous-pixel](images/subpixel-rendering-screenshot.gif)

L'anticrénelage des sous-pixels nécessite un fond non transparent pour la fenêtre contenant les glyphes d'une police d'écriture. (Voir [cette issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) pour plus d'infos).

Pour atteindre cet objectif, définissez la couleur de fond dans le constructeur du [BrowserWindow](api/browser-window.md) :

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Veuillez noter que simplement paramétrer la couleur de fond avec le CSS ne donnera pas l'effet souhaité.
