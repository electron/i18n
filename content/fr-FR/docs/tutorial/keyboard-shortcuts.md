# Raccourcis clavier

> Configurer des raccourcis clavier local et mondial

## Raccourcis des

Le module [Menu](../api/menu.md) vous permet de configurer des raccourcis clavier qui se déclenchera uniquement lorsque l’application se concentre. Pour ce faire, spécifiez une propriété [`accelerator`] lors de la création d’un [MenuItem](../api/menu-item.md).

```js
const {Menu, MenuItem} = require('electron') const menu = nouvelle Menu() menu.append (nouveau MenuItem ({label : "Imprimer", accélérateur : ' CmdOrCtrl + P', cliquez : () => {console.log ("temps d’imprimer des trucs')}}))
```

Il est facile de configurer des combinaisons de touches différentes basées sur le système d’exploitation de l’utilisateur.

```js
{accelerator : process.platform === « darwin » ? « Alt + Cmd + I » : « Ctrl + Shift + I »}
```

## Raccourcis globaux

Vous pouvez utiliser le module [globalShortcut](../api/global-shortcut.md) pour détecter les événements de clavier, même lorsque l’application n’a pas le focus clavier.

```js
const {app, globalShortcut} = require('electron') app.on ("prêt", () => {globalShortcut.register ('CommandOrControl + X', () = > {console.log ("CommandOrControl + X est pressé")})})
```

## Raccourcis dans un BrowserWindow

Si vous souhaitez gérer les raccourcis clavier pour un [BrowserWindow](../api/browser-window.md), vous pouvez utiliser les écouteurs d’événements `keyup` et `keydown` sur l’objet window à l’intérieur du processus de rendu.

```js
window.addEventListener ("keyup", doSomething, vrai)
```

Notez la troisième `true` de paramètre qui signifie l’auditeur reçoit toujours des touches avant d’autres auditeurs afin qu’ils ne peuvent pas avoir `stopPropagation () ` appelée sur eux.

Si vous ne voulez pas faire manuel raccourci l’analyse il existe des bibliothèques qui font avancé de détection clée tels que [mousetrap](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind ('4', () => {console.log('4')}) Mousetrap.bind ('? ', () = > {console.log ("Voir la raccourcis !')})
Mousetrap.bind (« Echap », () = > {console.log('escape')}, « keyup ») / / combinaisons Mousetrap.bind ('cmd + Maj + k', () = > {console.log ("commande Maj k')}) / / carte des combinaisons multiples pour le même rappel Mousetrap.bind (['cmd + k', ' ctrl + k'], () = > {console.log ("commande k ou k contrôle') / / return false afin d’empêcher le comportement par défaut et événement d’arrêt de la propagation retournent false}) / / séquences de style gmail Mousetrap.bind ('g j’ai ' () = > {console.log ("aller à la boîte de réception')}) Mousetrap.bind ('* un ', () = > {console.log ("sélectionner tout")}) / / code konami !
Mousetrap.bind ('jusqu'à jusqu'à bas bas gauche droite gauche droite b une entrée', () => {console.log ("code konami')})
```