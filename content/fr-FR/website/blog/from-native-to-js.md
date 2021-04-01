---
title: De natif à JavaScript dans Electron
author: codebytere
date: '2019-03-19'
---

Comment les fonctionnalités d'Electron écrites en C++ ou Objective-C peuvent-elles être accessibles à un utilisateur final?

---

## Arrière-plan

[Electron](https://electronjs.org) est une plate-forme JavaScript dont le but principal est de réduire la barrière à l'entrée des développeurs pour construire des applications de bureau robustes sans se soucier des implémentations spécifiques à la plate-forme. Cependant, en son cœur, Electron a encore besoin de fonctionnalités spécifiques à la plate-forme pour être écrites dans un langage système donné.

En réalité, Electron gère le code natif pour vous afin que vous puissiez vous concentrer sur une seule API JavaScript.

Mais comment cela fonctionne-t-il? Comment les fonctionnalités d'Electron écrites en C++ ou Objective-C peuvent-elles être accessibles à un utilisateur final?

Pour tracer ce chemin, commençons par le module [`de l'app`](https://electronjs.org/docs/api/app).

En ouvrant le fichier [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) dans notre répertoire `lib/` , vous trouverez la ligne de code suivante vers le haut :

```js
const binding = process.electronBinding('app')
```

Cette ligne pointe directement vers le mécanisme d'Electron pour relier ses modules C++/Objective-C à JavaScript pour une utilisation par les développeurs. Cette fonction est créée par l'en-tête et le [fichier d'implémentation](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) pour la classe `ElectronBindings`.

## `process.electronBinding`

Ces fichiers ajoutent la fonction `process.electronBinding` , qui se comporte comme le `process.binding` de Node.js. `process.bind` est une implémentation de noeud de niveau inférieur. s [`require()`](https://nodejs.org/api/modules.html#modules_require_id) méthode, sauf qu'il permet aux utilisateurs de `requérir` du code natif au lieu d'un autre code écrit en JS. Cette fonction personnalisée `process.electronBinding` permet de charger du code natif depuis Electron.

Quand un module JavaScript de haut niveau (comme `app`) requiert ce code natif, comment l'état de ce code natif est-il déterminé et défini ? Où sont exposées les méthodes à JavaScript ? Qu'en est-il des propriétés ?

## `accouplement_natif`

À l'heure actuelle les réponses à cette question peuvent être trouvées dans `native_mate`: un fork de la bibliothèque [`gin` de Chromium](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) qui facilite les types de maréchaux entre C++ et JavaScript.

À l'intérieur de `native_mate/native_mate` il y a un en-tête et un fichier d'implémentation pour `object_template_builder`. C'est ce qui nous permet de former des modules en code natif dont la forme est conforme à ce que les développeurs JavaScript attendent.

### `format@@0 ObjectTemplateBuilder`

Si nous regardons chaque module Electron en tant qu'objet ``, il devient plus facile de voir pourquoi nous voudrions utiliser `object_template_builder` pour les construire. Cette classe est construite sur une classe exposée par le V8, qui est le moteur JavaScript haute performance et WebAssembly de Google, écrit en C++. V8 implémente la spécification JavaScript (ECMAScript) de sorte que ses implémentations de fonctionnalités natives peuvent être directement corrélées aux implémentations en JavaScript. Par exemple, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) nous donne des objets JavaScript sans fonction de constructeur dédié et prototype. Il utilise `Object[.prototype]`, et en JavaScript serait équivalent à [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Pour voir cela en action, regardez le fichier d'implémentation du module d'application, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). En bas est ce qui suit :

```cpp
mate::ObjectTemplateBuilder(isolate, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

Dans la ligne ci-dessus, `.SetMethod` est appelé sur `mate::ObjectTemplateBuilder`. `. etMethod` peut être appelée sur n'importe quelle instance de la classe `ObjectTemplateBuilder` pour définir des méthodes sur le [prototype Objet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) en JavaScript, avec la syntaxe suivante :

```cpp
.SetMethod("method_name", &function_to_bind)
```

Ceci est l'équivalent JavaScript de :

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implémentation ici
}
```

Cette classe contient également des fonctions pour définir des propriétés sur un module :

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

ou

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Celles-ci seraient à leur tour les implémentations JavaScript de [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

et

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

Il est possible de créer des objets JavaScript formés avec des prototypes et des propriétés comme les développeurs les attendent, et plus clairement la raison des fonctions et des propriétés implémentées à ce niveau du système inférieur!

La décision quant à l'endroit où implémenter une méthode de module donnée est elle-même une méthode complexe et souvent non déterministe, que nous aborderons dans un futur post.
