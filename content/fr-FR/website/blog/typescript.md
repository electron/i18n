---
title: "Annonce du support TypeScript dans Electron"
author: zeke
date: '2017-06-01'
---

Le paquet npm `electron` inclut maintenant un fichier de définition TypeScript qui fournit des annotations détaillées de toute l'API Electron. Ces annotations peuvent améliorer votre expérience de développement d'Electron **même si vous écrivez du JavaScript vanilla**. Juste `npm installez electron` pour obtenir les typages d'Electron à jour dans votre projet.

---

TypeScript est un langage de programmation open-source créé par Microsoft. C'est un sur-ensemble de JavaScript qui étend le langage en ajoutant le support de types statiques. La communauté TypeScript s'est développée rapidement ces dernières années, et TypeScript ont été classés parmi les [langages de programmation les plus appréciés](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) dans une enquête récente sur les développeurs de Stack Overflow.  TypeScript est décrit comme "JavaScript qui s'échelle", et comme une équipe à [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), et [Microsoft](https://github.com/Microsoft/vscode) utilisent tout cela pour écrire des applications Electron évolutives qui sont utilisées par des millions de personnes.

TypeScript prend en charge de nombreuses nouvelles fonctionnalités de langage en JavaScript comme les classes , la destruction d'objets, et async/await, mais sa vraie fonctionnalité différenciante est **annotations de type**. Déclarer les types de données d'entrée et de sortie attendus par votre programme peut [réduire les bogues](https://slack.engineering/typescript-at-slack-a81307fa288d) en vous aidant à trouver des erreurs au moment de la compilation. et les annotations peuvent également servir comme une déclaration formelle de [comment votre programme fonctionne](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Lorsque les bibliothèques sont écrites en Javascript vanilla, les types sont souvent vaguement définis comme une réflexion après l'écriture de documentation. Les fonctions peuvent souvent accepter plus de types que ce qui a été documenté, ou une fonction peut avoir des contraintes invisibles qui ne sont pas documentées, ce qui peut conduire à des erreurs d'exécution.

TypeScript résout ce problème avec les **fichiers de définition**. Un fichier de définition TypeScript décrit toutes les fonctions d'une bibliothèque et ses types d'entrée et de sortie attendus. Lorsque les auteurs de la bibliothèque intègrent un fichier de définition TypeScript avec leur bibliothèque publiée, les consommateurs de cette bibliothèque peuvent [explorer son API directement à l'intérieur de leur éditeur](https://code.visualstudio.com/docs/editor/intellisense) et commencer à l'utiliser tout de suite, souvent sans devoir consulter la documentation de la bibliothèque .

Beaucoup de projets populaires comme [Angular](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (et maintenant Electron! compiler leur propre fichier de définition et le grouper avec leur paquet npm publié . Pour les projets qui ne regroupent pas leur propre fichier de définition, il y a [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), un écosystème tiers de fichiers de définition gérés par la communauté.

## Installation

À partir de la version 1.6.10, chaque version d'Electron inclut son propre fichier de définition TypeScript. Lorsque vous installez le package `electron` à partir de npm, le fichier `electron.d.ts` est livré automatiquement avec le paquet installé.

Le [moyen le plus sûr](https://electronjs.org/docs/tutorial/electron-versioning/) d'installer Electron utilise un numéro de version exact :

```sh
npm install electron --save-dev --save-exact
```

Ou si vous utilisez [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn add electron --dev --exact
```

Si vous utilisiez déjà des définitions tierces telles que `@types/electron ` et `@types/node`, vous devez les supprimer de votre projet Electron pour éviter toutes collisions.

Le fichier de définition est dérivé de notre documentation API structurée [](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), donc il sera toujours cohérent avec la documentation API de [Electron](https://electronjs.org/docs/api/). Installez simplement `electron` et vous obtiendrez toujours les définitions TypeScript qui sont à jour avec la version d'Electron que vous utilisez.

## Utilisation

Pour un résumé de comment installer et utiliser les nouvelles annotations TypeScript d'Electron, regardez cette courte vidéo de démonstration : <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Si vous utilisez [Visual Studio Code](https://code.visualstudio.com/), vous avez déjà intégré le support TypeScript. Il y a aussi des plugins gérés par la communauté pour [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), et [autres éditeurs](https://www.typescriptlang.org/index.html#download-links).

Une fois que votre éditeur est configuré pour TypeScript, vous commencerez à voir plus de comportements conscients du contexte comme des suggestions de saisie automatique, référence de méthode en ligne, argument de vérification, et plus.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Auto-complétion de la méthode">
  <figcaption>Méthode de complétion automatique</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Référence de méthode">
  <figcaption>Référence de méthode en ligne</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Vérification des arguments">
  <figcaption>Vérification des arguments</figcaption>
</figure>

## Commencer avec TypeScript

Si vous êtes nouveau sur TypeScript et que vous voulez en savoir plus, cette vidéo d'introduction[de Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) fournit une bonne vue d'ensemble des raisons pour lesquelles la langue a été créée, comment cela fonctionne, comment l'utiliser et où il est dirigé.

Il y a aussi un manuel [](https://www.typescriptlang.org/docs/handbook/basic-types.html) et une aire de jeu [](https://www.typescriptlang.org/play/index.html) sur le site officiel de TypeScript.

Parce que TypeScript est un sur-ensemble de JavaScript, votre code JavaScript existant est déjà valide TypeScript. Cela signifie que vous pouvez faire graduellement la transition d'un projet JavaScript existant vers TypeScript, en ajoutant de nouvelles fonctionnalités de langage au besoin.

## Remerciements

Ce projet n'aurait pas été possible sans l'aide de la communauté de responsables Open Source d'Electron. Merci à [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), et beaucoup d'autres pour leurs corrections de bogues, améliorations de documentation, et conseils techniques.

## Support

Si vous rencontrez des problèmes en utilisant les nouveaux fichiers de définition TypeScript d'Electron, veuillez remplir un problème sur le dépôt [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues).

Joyeux TypeScripting!
