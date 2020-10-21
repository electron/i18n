---
title: Utiliser les fonctionnalités V8 et Chromium dans Electron
author: jlord
date: '2016-01-07'
---

Construire une application Electron signifie que vous n'avez besoin que de créer une base de code et un design pour un navigateur, ce qui est assez pratique. Mais parce qu'Electron reste à jour avec [Node. s](http://nodejs.org) et [Chromium](https://www.chromium.org) au fur et à mesure qu'ils se libèrent, vous pouvez également utiliser les excellentes fonctionnalités avec lesquelles ils livrent. Dans certains cas, cela supprime les dépendances dont vous pourriez avoir besoin précédemment pour inclure dans une application web.

---

Il y a beaucoup de fonctionnalités et nous en aborderons quelques-unes ici comme exemples, mais si vous êtes intéressé à apprendre sur toutes les fonctionnalités, vous pouvez garder un œil sur le blog [Google Chromium](http://blog.chromium.org) et [Node. s changelogs](https://nodejs.org/en/download/releases). Vous pouvez voir quelles versions de Node.js, Chromium et V8 Electron utilisent sur [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## Support ES6 via V8

Electron combine la bibliothèque de rendu Chromium avec Node.js. Les deux partagent le même moteur JavaScript, [V8](https://developers.google.com/v8). De nombreuses fonctionnalités ECMAScript 2015 (ES6) sont déjà intégrées dans le V8, ce qui signifie que vous pouvez les utiliser dans votre application Electron sans aucun compilateur.

Voici quelques exemples, mais vous pouvez aussi obtenir des classes (en mode stricte), des blocs de portée, des promesses, des tableaux tapés et plus encore. Consultez [cette liste](https://nodejs.org/en/docs/es6/) pour plus d'informations sur les fonctionnalités ES6 dans V8.

**Fonctions de Flèche**

```js
findTime () => {
  console.log(new Date())
}
```
**Interpolation de chaîne**

```js
var octocat = "Mona Lisa";
console.log(`Le nom de l'octocat est ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "Not new";
  console. og("Nouvel Octocat");
}

// Lances
Octocat();
// Logs
new Octocat();
```

**Comprend un tableau**

```js
 // Renvoie vrai
[1, 2].includes(2);
```

**Paramètres de repos**

```js
// Représente le nombre indéfini d'arguments en tant que tableau
(o, c, ...args) => {
  console.log(args.length)
}
```

## Fonctionnalités Chromium

Merci à tous les efforts fournis par Google et les contributeurs sur Chromium, lorsque vous construisez des applications Electron, vous pouvez également utiliser des choses cool comme (mais pas limité à) :

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Récupérer le Streaming API](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Suivez avec le [blog Google Chromium](http://blog.chromium.org) pour en savoir plus sur les fonctionnalités comme de nouvelles versions et de nouveau, vous pouvez vérifier la version de Chromium qu'Electron utilise [ici](https://electronjs.org/#electron-versions).

## « De quoi vous réjouissez-vous? »

Tweet to us [@ElectronJS](https://twitter.com/electronjs) avec tes fonctionnalités préférées intégrées dans V8 ou Chromium.

