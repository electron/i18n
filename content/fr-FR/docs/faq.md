# FAQ Electron

## Quand est-ce qu'Electron aura la dernière mise à jour de Chrome ?

La version Chrome d'Electron est généralement mise à jour entre une et deux semaines après qu'une nouvelle mise à jour stable de Chrome soit disponible. Cette estimation n'est toutefois pas garantie et dépend de l'effort nécessaire pour faire la mise à jour.

Seul le canal "stable" de Chrome est utilisé. Si un fix important est disponible sur le canal "beta" ou "dev", nous l'installerons.

Pour plus d'informations, veuillez voir [l'introduction à la sécurité](tutorial/security.md).

## Quand est-ce qu'Electron aura la dernière mise à jour de Node.js?

Quand une nouvelle version de Node.js est disponible, nous attendons généralement un mois avant de faire la mise à jour du Node.js d'Electron. Ainsi nous évitons d'être affectés par des bugs introduits dans les nouvelles versions de Node.js, ce qui arrive très souvent.

Nouvelles fonctionnalités de Node.js sont généralement amenées par V8 mises à niveau, puisque électronique utilise le V8 expédiés par navigateur Chrome, le JavaScript nouveau brillant caractéristique d’une nouvelle version de Node.js est généralement déjà en électrons.

## Comment partager les données entre les pages web ?

Pour partager des données entre les pages web (les processus de rendu) le moyen le plus simple est d’utiliser les APIs HTML5 qui sont déjà disponibles dans les navigateurs. Bons candidats sont[Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) et [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Ou vous pouvez utiliser le système de la CIB, qui est spécifique aux électrons, pour stocker des objets dans le processus principal comme une variable globale, puis d’y accéder depuis les moteurs de rendu via la propriété `remote` du module `electron` :

```javascript
Dans le processus principal.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
Dans la page 1.
require('electron').Remote.getGlobal (« sharedObject") .someProperty = « nouvelle valeur »
```

```javascript
En page 2.
Console.log(require('electron').Remote.getGlobal('sharedObject').someProperty)
```

## Fenêtre/plateau mon application a disparu au bout de quelques minutes.

Cela se produit lorsque la variable qui sert à stocker le bac/fenêtre obtient le garbage collector.

Si vous rencontrez ce problème, les articles suivants peuvent s’avérer utiles :

* [Gestion de la mémoire](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Portée des variables](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Si vous voulez une solution rapide, vous pouvez faire les variables globales en changeant votre code de ceci :

```javascript
const {app, Tray} = require('electron') app.on ("prêt", () => {const plateau = new Tray('/path/to/icon.png') tray.setTitle ('hello world')})
```

pour cela :

```javascript
const {app, Tray} = plateau let require('electron') = null app.on ("prêt", () => {plateau = new Tray('/path/to/icon.png') tray.setTitle ('hello world')})
```

## Je ne peux pas utiliser jQuery/RequireJS/Meteor/AngularJS avec Electron.

En raison de l’intégration de Node.js des électrons, il y a quelques symboles supplémentaires insérés dans le DOM comme `module`, `exports`, `require`. Cela pose des problèmes pour certaines bibliothèques puisqu’ils veulent insérer les symboles avec les mêmes noms.

Pour résoudre ce problème, vous pouvez désactiver l’intégration de nœud en électrons :

```javascript
Dans le processus principal.
const {BrowserWindow} = require('electron') laisser gagner = new BrowserWindow ({webPreferences : {
    nodeIntegration: false
  }}) win.show()
```

Mais si vous voulez garder les capacités d’utilisation de Node.js et électrons API, vous devez renommer les symboles dans la page avant d’inclure d’autres bibliothèques :

```html
<head><script> window.nodeRequire = exiger ;
supprimer window.require ;
supprimer window.exports ;
supprimer window.module ;
</script><script type="text/javascript" src="jquery.js"></script></head>
```

## `require('electron').xxx` is undefined.

Lorsque vous utilisez le module intégré de l’électron, vous pouvez obtenir une erreur comme ceci :

    > require('electron').webFrame.setZoomFactor(1.0) Uncaught TypeError : impossible de lire la propriété « setZoomLevel » undefined
    

C’est parce que vous avez la module</a> de `electron` de npm installé localement ou dans le monde, qui remplace le module intégré de l’électron.</p> 

Pour vérifier si vous utilisez le module intégré correct, vous pouvez imprimer le chemin d’accès du module `electron` :

```javascript
Console.log(Require.Resolve('electron'))
```

et ensuite vérifier si elle est sous la forme suivante :

    « / path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js »
    

Si c’est quelque chose comme `node_modules/electron/index.js`, puis vous devez retirer le module de `electron` du Musée, ou renommez-le.

```bash
NGP désinstaller électron NGP désinstaller électron -g
```

Cependant si vous utilisez le module intégré, mais toujours obtenir cette erreur, il est très probable, vous utilisez le module dans le processus de mal. Par exemple`electron.app` seulement peut être utilisé dans le processus principal, tandis que `electron.webFrame` n’est disponible que dans les processus de rendu.