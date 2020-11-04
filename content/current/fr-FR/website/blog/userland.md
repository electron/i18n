---
title: Userland d'Electron
author: zeke
date: '2016-12-20'
---

Nous avons ajouté une nouvelle section [userland](https://electronjs.org/userland) à le site Web d'Electron pour aider les utilisateurs à découvrir les gens, , et les applications qui composent notre écosystème open-source florissant.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Origines du Userland

Userland est l'endroit où les gens dans les communautés de logiciels se réunissent pour partager des outils et des idées. Le terme est originaire de la communauté Unix, où il a fait référence à tout programme qui s'est exécuté en dehors du noyau, mais aujourd'hui, cela signifie quelque chose de plus. Quand les gens de la communauté actuelle Javascript font référence à l'espace utilisateur, ils parlent généralement du registre de paquets [npm](http://npm.im). C'est là que la majorité des expériences et l'innovation se produisent, alors que Node et le langage JavaScript (comme le noyau Unix) conservent un ensemble relativement petit et stable de fonctionnalités de base.

## Node et Electron

Comme Node, Electron a un petit ensemble d'API de base. Celles-ci fournissent les fonctionnalités de base nécessaires au développement d'applications de bureau multi-plates-formes. Cette philosophie de conception permet à Electron de rester un outil souple sans être trop normative sur la façon dont il doit être utilisé.

Userland est la contrepartie du "core", permettant aux utilisateurs de créer et partager des outils qui étendent les fonctionnalités d'Electron.

## Collecte des données

Pour mieux comprendre les tendances de notre écosystème, nous avons analysé des métadonnées à partir de 15, 00 dépôts publics GitHub qui dépendent de `electron` ou `electron-prebuilt`

Nous avons utilisé les bibliothèques [GitHub API](https://developer.github.com/v3/), [. o API](https://libraries.io/api), et le registre npm pour récupérer des informations sur les dépendances, dépendances de développement, dépendants, auteurs de paquets, contributeurs de dépôts, compteurs de téléchargement, compteurs de fork, compteurs de stargazer comptes, etc.

Nous avons ensuite utilisé ces données pour générer les rapports suivants :

- [Dépendances de développement d'applications](https://electronjs.org/userland/dev_dependencies): Paquets les plus souvent listés comme `devDependencies` dans les applications Electron.
- [Contributeurs GitHub](https://electronjs.org/userland/github_contributors): des utilisateurs GitHub qui ont contribué à de nombreux dépôts GitHub liés à Electron.
- [Dépendances de paquets](https://electronjs.org/userland/package_dependencies): paquets npm liés à Electron qui sont souvent dépendants d'autres paquets npm.
- [Applications favorites](https://electronjs.org/userland/starred_apps): les applications Electron (qui ne sont pas des paquets npm) avec de nombreux stargazers.
- [La plupart des paquets téléchargés](https://electronjs.org/userland/most_downloaded_packages): les paquets npm liés à Electron qui sont téléchargés beaucoup.
- [Dépendances des applications](https://electronjs.org/userland/dependencies): Paquets les plus souvent listés comme `dépendances` dans les applications Electron.
- [Auteurs de paquets](https://electronjs.org/userland/package_authors): Les auteurs les plus prolifiques des paquets npm liés à Electron.

## Résultats de filtrage

Rapporte comme [dépendances d'applications](https://electronjs.org/userland/dependencies) et [applications favorites](https://electronjs.org/userland/starred_apps) qui listent les paquets, les applications et les repos ont une entrée de texte qui peut être utilisée pour filtrer les résultats.

Lorsque vous tapez dans cette entrée, l'URL de la page est mise à jour dynamiquement. Ce vous permet de copier une URL représentant une tranche particulière de données de l'espace utilisateur, puis de la partager avec d'autres.

[![babel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Plus à venir

Ce premier ensemble de rapports n'est que le début. Nous continuerons à collecter des données sur la façon dont la communauté construit Electron, et nous ajouterons de nouveaux rapports au site web.

Tous les outils utilisés pour collecter et afficher ces données sont open-source:

- [electron/electronjs.org](https://github.com/electron/electron.atom): Le site d'Electron.
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): Des tranches de données sur les paquets, les dépôts et les utilisateurs dans le territoire utilisateur d'Electron.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Tous les dépôts publics sur GitHub qui dépendent de `electron` ou `electron-prebuilt`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Tous les paquets npm qui mentionnent `electron` dans leur fichier `package.json`.

Si vous avez des idées sur la façon d'améliorer ces rapports, veuillez nous faire savoir [qui ouvre un problème sur le dépôt du site web](https://github.com/electron/electronjs.org/issues/new) ou l'un des dépôts susmentionnés.

Merci à vous, la communauté Electron, d'avoir fait de l'espace utilisateur ce qu'il est aujourd'hui !

