---
title: Docs API d'Electron en données structurées
author: zeke
date: '2016-09-27'
---

Aujourd'hui, nous annonçons quelques améliorations à la documentation d'Electron. Chaque nouvelle version inclut maintenant un fichier JSON [](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) qui décrit en détail toutes les API publiques d'Electron. Nous avons créé ce fichier pour permettre aux développeurs d'utiliser la documentation API d'Electron de nouvelles manières intéressantes.

---

## Aperçu du schéma

Chaque API est un objet avec des propriétés telles que nom, description, type, etc. Les classes telles que `BrowserWindow` et `Menu` ont des propriétés supplémentaires décrivant leurs méthodes d'instance, leurs propriétés d'instance, les événements d'instance, etc.

Voici un extrait du schéma qui décrit la classe `BrowserWindow`:

```js
{
  nom: 'BrowserWindow', description
  : 'Créer et contrôler les fenêtres du navigateur.', processus
  : {
    main: true,
    renderer: false
  }, type
  : 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs.org/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window.md',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

Et voici un exemple de description de méthode, dans ce cas, la méthode d'instance `apis.BrowserWindow.instanceMethods.setMaximumSize`:

```js
{
  name : 'setMaximumSize',
  signature: '(width, height)',
  description: 'Définit la taille maximale de la fenêtre à la largeur et la hauteur. ,
  paramètres: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Utilisation des nouvelles données

Pour faciliter l'utilisation de ces données structurées dans leurs projets, nous avons créé [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), un petit paquet npm qui est publié automatiquement chaque fois qu'il y a une nouvelle version d'Electron .

```sh
npm install electron-api-docs --save
```

Pour une gratification instantanée, essayez le module dans votre REPL Node.js :

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Comment les données sont collectées

La documentation API d'Electron adhère à [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) et au [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), pour que son contenu puisse être analysé par programme.

Le [electron-docs-linter](https://github.com/electron/electron-docs-linter) est une nouvelle dépendance de développement du dépôt `electron/electron`. C'est un outil en ligne de commande qui linte tous les fichiers markdown et applique les règles du styleguide. Si des erreurs sont trouvées, elles sont listées et le processus de publication est interrompu. Si les docs de l'API sont valides, le `electron-json. pi` fichier est créé et [téléchargé sur GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) dans le cadre de la version d'Electron.

## Javascript standard et Markdown standard

Plus tôt dans l'année, la base de code d'Electron a été mise à jour pour utiliser le linter [`standard`](http://standardjs.com/) pour tout JavaScript. Le README de la norme résume le raisonnement qui sous-tend ce choix :

> Adopter un style standard signifie classer l'importance de la clarté du code et des conventions communautaires plus haut que le style personnel. Cela pourrait ne pas avoir de sens pour 100 % des projets et des cultures de développement, même si l'open source peut être un lieu hostile pour les débutants. Mettre en place des attentes claires et automatisées des contributeurs rend un projet plus sain.

Nous avons également récemment créé [marque-standard](https://github.com/zeke/standard-markdown) pour vérifier que tous les extraits de code JavaScript de notre documentation sont valides et cohérents avec le style dans la base de code elle-même.

Ensemble, ces outils nous aident à utiliser l'intégration continue (CI) pour trouver automatiquement des erreurs dans les pull requests. Cela réduit le fardeau pesant sur les humains qui font un examen du code et nous donne plus de confiance à propos de la précision de notre documentation.

### Un effort de la communauté

La documentation d'Electron s'améliore constamment, et nous avons notre impressionnante communauté open-source à vous remercier. À partir de ce texte, près de 300 personnes ont contribué à la documentation.

Nous sommes heureux de voir ce que les gens font avec ces nouvelles données structurées. Les utilisations possibles incluent :

- Améliorations à [https://electronjs.org/docs/](https://electronjs.org/docs/)
- Un [fichier de définition de TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) pour un développement Electron plus rationalisé dans les projets utilisant TypeScript.
- Documentation disponible en mode hors connexion pour des outils tels que [Dash.app](https://kapeli.com/dash) et [devdocs.io](http://devdocs.io/)

