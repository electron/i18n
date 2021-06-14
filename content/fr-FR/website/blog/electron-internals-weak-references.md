---
title: 'Electron Internals: Weak References'
author: zcbenz
date: '2016-09-20'
---

En tant que langue de collecte des déchets, JavaScript libère les utilisateurs de la gestion manuelle des ressources . Mais comme Electron héberge cet environnement, il doit être très prudent en évitant à la fois les fuites de mémoire et de ressources.

Ce message introduit le concept de références faibles et comment elles sont utilisées pour gérer les ressources dans Electron.

---

## Références faibles

En JavaScript, chaque fois que vous assignez un objet à une variable, vous ajoutez une référence à l'objet. Tant qu'il y a une référence à l'objet, sera toujours conservé en mémoire. Une fois que toutes les références à l'objet sont supprimées, i.e. il y ne sont plus de variables stockant l'objet, le moteur JavaScript récupérera la mémoire lors de la prochaine collecte de déchets.

Une référence faible est une référence à un objet qui vous permet d'obtenir l'objet sans avoir d'effet si ce sera des ordures collectées ou non. Vous serez également averti de lorsque l'objet est collecté. Il devient alors possible de gérer les ressources avec JavaScript.

En utilisant la classe `NativeImage` d'Electron comme exemple, à chaque fois que vous appelez la `nativeImage. reate()` API, une instance `NativeImage` est retournée et c'est stocker les données de l'image en C++. Une fois que vous avez terminé avec l'instance et le moteur JavaScript (V8) a des ordures collectées l'objet, en C++ sera appelé pour libérer les données de l'image en mémoire, donc il n'y a pas besoin pour les utilisateurs de gérer manuellement.

Un autre exemple est [le problème de disparition de fenêtre](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), qui montre visuellement comment la fenêtre est des ordures collectées quand toutes les références à lui sont terminées.

## Tester les références faibles dans Electron

Il n'y a aucun moyen de tester directement les références faibles en JavaScript brut, puisque le langage n'a pas de moyen d'assigner des références faibles. Il n'y a aucun moyen de tester directement les références faibles en JavaScript brut, puisque le langage n'a pas de moyen d'assigner des références faibles.

Dans les versions d'Electron antérieures à la v0.37.8, vous pouvez utiliser l'utilitaire interne `v8Util. etDestructor` API pour tester les références faibles, qui ajoute une référence faible à l'objet passé et appelle la callback lorsque l'objet est collecté :

```javascript
// Le code ci-dessous ne peut s'exécuter que sur Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var objet = {}
v8Util. etDestructor(object, function () {
  console.log('L'objet est garbage collected')
})

// Supprime toutes les références à l'objet.
object = undefined
// Démarre manuellement un GC. gc()
// La console affiche "L'objet est ramassé".
```

Notez que vous devez démarrer Electron avec la commande `--js-flags="--expose_gc"` pour exposer la fonction interne `gc`.

L'API a été supprimée dans les versions ultérieures car V8 ne permet pas d'exécuter du code JavaScript dans le destructeur et dans les versions ultérieures, cela provoquerait des plantages aléatoires.

## Références faibles dans le module `distant`

Outre la gestion des ressources natives avec C++, Electron a également besoin de références faibles pour gérer les ressources JavaScript. Un exemple est le module `distant`d'Electron, , qui est un [module d'appel à distance](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) qui permet d'utiliser des objets dans le processus principal à partir des processus de rendu.

Un défi clé avec le module `distant` est d'éviter les fuites de mémoire. Lorsque les utilisateurs acquièrent un objet distant dans le processus de rendu, le module `distant` doit garantir que l'objet continue à vivre dans le processus principal jusqu'à ce que les références dans le processus de rendu soient supprimées. De plus, elle doit également s'assurer que l'objet peut être des ordures collectées lorsqu'il n'y a plus aucune référence à elle dans les processus de rendu de .

Par exemple, sans implémentation correcte, le code suivant provoquerait des fuites de mémoire rapidement :

```javascript
const {remote} = require('electron')

pour (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

La gestion des ressources dans le module `distant` est simple. À chaque fois qu'un objet est demandé, un message est envoyé au processus principal et Electron stockera l'objet dans une carte et assignera un ID pour cela, puis renvoyer l'ID au processus de rendu . Dans le processus de rendu le module `distant` recevra l'ID et l'enveloppera avec un objet proxy et lorsque l'objet proxy sera déchainé collecté, un message sera envoyé au processus principal pour libérer l'objet.

En utilisant l'API `remote.require` comme exemple, une implémentation simplifiée semble comme cela:

```javascript
remote.require = function (nom) {
  // Dites au processus principal de retourner les métadonnées du module.
  const meta = ipcRenderer.sendSync('REQUIRE', nom)
  // Crée un objet proxy.
  const object = metaToValue(meta)
  // Dites au processus principal de libérer l'objet lorsque l'objet proxy est garbage
  // collecté.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return object
}
```

Dans le processus principal :

```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', function (event, name) {
  const object = require(name)
  // Ajoute une référence à l'objet.
  map[++id] = objet
  // Convertit l'objet en métadonnées.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', function (event, id) {
  delete map[id]
})
```

## Cartes avec des valeurs faibles

Avec l'implémentation simple précédente, chaque appel dans le module `distant` retournera un nouvel objet distant du processus principal, et chaque objet distant représente une référence à l'objet dans le processus principal.

Le design lui-même est bon, mais le problème est quand il y a plusieurs appels à recevoir le même objet, plusieurs objets proxy seront créés et pour objets compliqués, cela peut ajouter une énorme pression sur l'utilisation de la mémoire et la collection des déchets .

Par exemple, le code suivant :

```javascript
const {remote} = require('electron')

pour (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

Il utilise tout d'abord beaucoup de mémoire pour créer des objets proxy, puis occupe le CPU (Central Processing Unit) pour les ordures collectées et envoyer des messages IPC.

Une optimisation évidente est de mettre en cache les objets distants : quand il y a déjà un objet distant avec le même ID, l'objet distant précédent sera retourné au lieu d'en créer un nouveau.

Ce n'est pas possible avec l'API en JavaScript core. Utiliser la carte normale pour mettre en cache des objets empêchera V8 de ramasser les objets, alors que la classe [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) ne peut utiliser que des objets comme clés faibles.

Pour résoudre ce problème, un type de carte avec des valeurs comme des références faibles est ajouté, ce qui est parfait pour mettre en cache des objets avec des IDs. Maintenant, le `remote.require` ressemble à ceci :

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Dites au processus principal de retourner les métadonnées du module.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Notez que le `remoteObjectCache` conserve des objets comme des références faibles, il n’est donc pas nécessaire de supprimer la clé lorsque l’objet est collecté par le garbage collector.

## Code natif

Pour les personnes intéressées par le code C++ des références faibles dans Electron, il peut être trouvé dans les fichiers suivants :

L'API `setDestructor`:

* [`format@@0 object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`format@@0 object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

L'API `createIDWeakMap`:

* [`key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

