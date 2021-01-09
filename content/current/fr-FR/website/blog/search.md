---
title: Rechercher
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Le site Web d'Electron a un nouveau moteur de recherche qui fournit des résultats instantanés pour documentation API, tutoriels, paquets npm liés à Electron, et plus encore.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Capture d'écran de recherche d'Electron">
  </a>
</figure>

---

Apprendre une nouvelle technologie ou un nouveau cadre comme Electron peut être intimidant. Une fois que vous avez dépassé la phase [de démarrage rapide](https://github.com/electron/electron-quick-start) , il peut être difficile d'apprendre les meilleures pratiques, trouver les bonnes APIs, ou découvrir les outils qui vous aideront à construire l'application de vos rêves. Nous voulons que le site web d'Electron soit un meilleur outil pour trouver les ressources dont vous avez besoin pour construire des applications plus rapidement et plus facilement.

Visitez n'importe quelle page sur [electronjs.org](https://electronjs.org) et vous trouverez la nouvelle entrée en haut de la page.

## Le moteur de recherche

Lorsque nous avons commencé à ajouter une recherche au site web, nous avons roulé notre propre moteur de recherche en utilisant GraphQL comme backend. GraphQL a été amusant à travailler et le moteur de recherche a été performant, mais nous nous sommes vite rendu compte que la construction d'un moteur de recherche n'est pas une tâche triviale. Les choses comme la recherche à mots multiples et la détection de typo nécessitent beaucoup de travail pour se débrouiller. Plutôt que de réinventer la roue, nous avons décidé d'utiliser une solution de recherche existante : [Algolia](https://algolia.com).

Algolia est un service de recherche hébergé qui est devenu rapidement le moteur de recherche de choix parmi les projets populaires open source tels que React, Vue, Bootstrap, Yarn et [beaucoup d'autres](https://community.algolia.com/docsearch/).

Voici quelques-unes des fonctionnalités qui ont fait d'Algolia une bonne adaptation au projet Electron :

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) fournit des résultats au fur et à mesure que vous tapez, généralement en 1 ms.
- [La tolérance type](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) signifie que vous obtiendrez toujours des résultats même lorsque vous tapez [`largeur`].
- [La syntaxe de la requête avancée](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) permet `"Correspondances exactes"` et `-exclusion`.
- Les [clients API](https://www.algolia.com/doc/api-client/javascript/getting-started/) sont open source et bien documentés.
- [Les analytiques](https://www.algolia.com/doc/guides/analytics/analytics-overview/) nous disent ce que les gens recherchent le plus, ainsi que ce qu'ils recherchent mais ne trouvent pas. Cela nous permettra de mieux comprendre comment la documentation d'Electron peut être améliorée.
- L'Algolia est [gratuit pour les projets open source](https://www.algolia.com/for-open-source).

## API Docs

Parfois, vous savez *ce que* vous voulez accomplir, mais vous ne savez pas exactement *comment* le faire. Electron possède plus de 750 méthodes API, événements et propriétés. Aucun humain ne se souvient facilement de tous ces éléments, mais les ordinateurs sont bons à cet égard. En utilisant la [documentation de l'API JSON d'Electron](https://electronjs.org/blog/api-docs-json-schema), nous avons indexé toutes ces données en Algolia, et maintenant vous pouvez facilement trouver l'API exacte que vous recherchez.

Vous essayez de redimensionner une fenêtre? Recherchez [`redimensionner`] et sautez directement à la méthode dont vous avez besoin.

## Tutoriels

Electron a une collection toujours croissante de tutoriels pour compléter sa documentation API . Maintenant vous pouvez trouver plus facilement des tutoriels sur un sujet donné, juste à côté de la documentation API associée.

Vous recherchez les meilleures pratiques en matière de sécurité ? Rechercher [`security`].

## Paquets npm

There are now over 700,000 packages in the npm registry and it's not always easy to find the one you need. Pour faciliter la découverte de ces modules, nous avons créé [`electron-npm-packages`], une collection des plus de 3400 modules dans le registre qui sont construits spécifiquement pour être utilisés avec Electron.

Les gens de [Bibliothèques. o](https://libraries.io) ont créé [SourceRank](https://docs.libraries.io/overview.html#sourcerank), un système de notation de projets logiciels basé sur une combinaison de métriques comme code, communauté, documentation et utilisation. Nous avons créé un module [`source`] qui inclut le score de chaque module dans le registre npm, et nous utilisons ces scores pour trier les résultats du paquet.

Vous voulez des solutions de rechange aux modules IPC intégrés à Electron? Recherche de [`is:package ipc`].

## Applications Electron

Il est [facile d'indexer des données avec Algolia](https://github.com/electron/algolia-indices), donc nous avons ajouté la liste des applications existantes de [electron/apps](https://github.com/electron/apps).

Essayez une recherche pour [`musique`] ou [`homebrew`].

## Résultats de filtrage

Si vous avez utilisé la recherche de code [de GitHub](https://github.com/search) avant, vous êtes probablement au courant de ses filtres de valeurs clés séparés par des deux-points comme `extension:js` ou `user:defunkt`. Nous pensons que cette technique de filtrage est assez puissante, donc nous avons ajouté un `est :` mot-clé à la recherche d'Electron qui vous permet de filtrer les résultats pour n'afficher qu'un seul type :

- [`est:miniature d'api`]
- [`est :tutoriel de sécurité`]
- [`is:package ipc`]
- [`est :app graphql`]

## Navigation du clavier

Les gens aiment les raccourcis clavier ! La nouvelle recherche peut être utilisée sans prendre doigts du clavier:

- <kbd>/</kbd> concentre le champ de recherche
- <kbd>esc</kbd> concentre la saisie de la recherche et l'efface
- <kbd>vers le bas</kbd> se déplace vers le résultat suivant
- <kbd>haut</kbd> se déplace au résultat précédent ou à l'entrée de recherche
- <kbd>entrer</kbd> ouvre un résultat

Nous avons également ouvert les sources du [module](https://github.com/electron/search-with-your-keyboard/) qui permet cette interaction avec le clavier. Il est conçu pour être utilisé avec Algolia InstantSearch, mais est généralisé pour permettre la compatibilité avec différentes implémentations de recherche.

## Nous voulons vos commentaires

Si vous rencontrez des problèmes avec le nouvel outil de recherche, nous voulons en savoir plus!

La meilleure façon de soumettre vos commentaires est de déposer un problème sur GitHub dans le dépôt approprié :

- [electron/electronjs.org](https://github.com/electron/electronjs.org) est le site Web d'Electron. Si vous ne savez pas où déposer un problème, c'est votre meilleur pari.
- [electron/algolia-index](https://github.com/electron/algolia-indices) est l'endroit où toutes les données Electron interrogeables sont compilées.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) rend l'interface de recherche navigable par clavier.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) est le client côté navigateur qui permet la recherche de type find-as-you-type.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) est le client Node.js pour le téléchargement de données sur les serveurs d'Algolia.

## Remerciements

Remerciements spéciaux à [Emily Jordan](https://github.com/echjordan) et [Vanessa Yuen](https://github.com/vanessayuenn) pour avoir construit ces nouvelles capacités de recherche, à [Bibliothèques. o](https://libraries.io) pour fournir [scores SourceRank](https://docs.libraries.io/overview.html#sourcerank) et à l'équipe d'Algolia pour nous aider à commencer. 🍹