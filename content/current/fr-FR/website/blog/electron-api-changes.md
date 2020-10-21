---
title: Changements d'API à venir dans Electron 1.0
author: zcbenz
date: '2015-11-17'
---

Depuis le début d'Electron, depuis le début d'Electron, en remontant quand il s'appelait Atom-Shell, nous avons expérimenté avec la fourniture d'une API JavaScript multi-plateforme pour le module de contenu Chromium et les composants natifs de l'interface graphique. Les APIs ont commencé de façon très organique, et au fil du temps, nous avons apporté plusieurs changements pour améliorer les conceptions initiales.

---

Maintenant que Electron se prépare pour une version 1.0, nous aimerions profiter de l'occasion pour changer en abordant les derniers détails de l'API. Les modifications décrites ci-dessous sont incluses dans **0.35.**, avec les anciennes APIs rapportant les avertissements de dépréciation afin que vous puissiez être à jour pour la future version 1.0. Une version 1.0 d'Electron ne sera pas disponible pendant quelques mois, donc vous avez un peu de temps avant que ces changements ne soient cassés.

## Avertissements de dépréciation

Par défaut, les avertissements apparaîtront si vous utilisez des API obsolètes. Pour les désactiver, vous pouvez définir `process.noDeprecation` à `true`. Pour suivre les sources des utilisations obsolètes de l'API, vous pouvez définir le processus `. hrowDeprecation` à `true` pour jeter des exceptions au lieu d'imprimer des avertissements, ou définir le processus `. raceDeprecation` à `true` pour imprimer les traces des dépréciations.

## Nouvelle façon d'utiliser les modules intégrés

Les modules intégrés sont maintenant regroupés en un seul module, au lieu d'être séparés en modules indépendants, pour que vous puissiez les utiliser [sans conflits avec d'autres modules](https://github.com/electron/electron/issues/387):

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

L'ancienne méthode de `require('app')` est toujours prise en charge pour la compatibilité ascendante, mais vous pouvez également désactiver si :

```javascript
require('electron').hideInternalModules()
require('app') // lance une erreur.
```

## Un moyen plus simple d'utiliser le module `distant`

En raison de la façon dont les modules intégrés ont été modifiés, nous avons facilité l'utilisation des modules côté processus dans le processus de rendu. Vous pouvez maintenant juste accéder aux attributs de `distant`pour les utiliser :

```javascript
// Nouvelle méthode.
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

Au lieu d'utiliser une longue chaîne d'exigences:

```javascript
// Vieux chemin.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Diviser le module `ipc`

Le module `ipc` existait à la fois sur le processus principal et le processus de rendu et l'API était différente de chaque côté. ce qui est assez confus pour les nouveaux utilisateurs. Nous avons renommé le module en `ipcMain` dans le processus principal et `ipcRenderer` dans le processus de rendu pour éviter la confusion :

```javascript
// Dans le processus principal .
var ipcMain = require('electron').ipcMain
```

```javascript
// En processus de rendu.
var ipcRenderer = require('electron').ipcRenderer
```

Et pour le module `ipcRenderer` , un objet événement `supplémentaire` a été ajouté lors de la réception de messages. pour correspondre à la façon dont les messages sont gérés dans les modules `ipcMain`:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Normalisation des options `BrowserWindow`

Les options `BrowserWindow` avaient des styles différents en fonction des options d'autres API, et ont été un peu difficiles à utiliser en JavaScript à cause du `-` dans les noms. Ils sont maintenant normalisés aux noms JavaScript traditionnels :

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Suivant les conventions du DOM pour les noms d'API

Les noms d'API d'Electron utilisés pour préférer camelCase pour tous les noms d'API, comme `Url` à `URL`, mais le DOM a ses propres conventions, et ils préfèrent `URL` à `Url`, en utilisant `Id` au lieu de `ID`. Nous avons fait le renommage de l'API suivante pour correspondre aux styles du DOM:

* `Url` est renommée en `URL`
* `Csp` est renommé en `CSP`

Vous remarquerez beaucoup de dépréciations lors de l'utilisation d'Electron v0.35.0 pour votre application en raison de ces changements. Un moyen facile de les corriger est de remplacer toutes les instances de `Url` par `URL`.

## Modifie les noms d'événements de `dans la barre d'état`

Le style des noms d'événements `Tray` était un peu différent des autres modules, donc un renommage a été fait pour le faire correspondre aux autres.

* `a cliqué sur` est renommé en `clic`
* `double-cliquez sur` est renommé en `double-cliquez`
* `clic droit` est renommé en `clic droit`

