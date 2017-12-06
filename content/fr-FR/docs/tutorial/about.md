# A propos d'Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. C'est en combinant [Chromium](https://www.chromium.org/Home) et [Node.js](https://nodejs.org) en un seul runtime qu'Electron accomplit cette tâche. Ainsi les applications peuvent être empaquetées pour Mac, Windows et Linux.

Electron débute en 2013 en tant que framework sur lequel [Atom](https://atom.io), l'éditeur de texte de GitHub, se base. Depuis, les deux ont été mis en open source au Printemps 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Lire la suite pour en savoir plus sur les contributeurs et les releases d'Electron ou pour commencer à développer avec Electron dans le [Guide Démarrage Rapide](quick-start.md).

## L'équipe et les Contributeurs

Électrons est maintenu par une équipe à GitHub ainsi qu’un groupe de [contributeurs actifs](https://github.com/electron/electron/graphs/contributors) de la communauté. Certains des contributeurs sont individuels et d'autres travaillent dans de grandes entreprises qui développe sur Electron. Nous sommes heureux d'ajouter des contributeurs actifs au projet comme mainteneurs. En savoir plus pour [contribuer à Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Mise à jour

[Electron est mis à jour](https://github.com/electron/electron/releases) régulièrement. Nous mettons à jour lors d'importantes corrections de bugs, de nouvelles APIs ou lors d'une mise à jour de Chromium ou Node.js.

### Mise à jour des Dépendances

La version de Chromium dans Electron est généralement mis à jour une ou deux semaines après qu'une nouvelle version stable de Chromium soit disponible, selon l'effort impliqué pour la mise à jour.

Quand une nouvelle version de Node.js est disponible, Electron attend habituellement environ un mois avant d'être mis à jour dans le but d'avoir une version plus stable.

Dans Electron, Node.js et Chromium partagent une instance unique de la V8 — habituellement la version qu'utilise Chromium. La plupart du temps cela *fonctionne correctement*, mais parfois il faut patcher Node.js.

### Versioning

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Notre Philosophie

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Historique

Below are milestones in Electron's history.

| :calendar:     | :tada:                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Avril 2013** | [Atom Shell est démarré](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).     |
| **Mai 2014**   | [Atom Shell passe en open source](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                     |
| **Avril 2015** | [Atom Shell est rebaptisé Electron](https://github.com/electron/electron/pull/1389).                                |
| **Mai 2016**   | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **Mai 2016**   | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **Août 2016**  | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |