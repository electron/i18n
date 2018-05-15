# À propos d'Electron

[Electron](https://electronjs.org) est une librairie open source développé par GitHub pour créer des applications desktop cross-platform avec HTML, CSS et JavaScript. C'est en combinant [Chromium](https://www.chromium.org/Home) et [Node.js](https://nodejs.org) en un seul runtime qu'Electron accomplit cette tâche. Ainsi les applications peuvent être empaquetées pour Mac, Windows et Linux.

Electron débute en 2013 en tant que framework sur lequel [Atom](https://atom.io), l'éditeur de texte de GitHub, se base. Depuis, les deux ont été mis en open source au Printemps 2014.

C’est désormais un outil populaire utilisé par les développeurs open source, startups et entreprises établies. [Voir qui utilise Electron](https://electronjs.org/apps).

Lire la suite pour en savoir plus sur les contributeurs et les releases d'Electron ou pour commencer à développer avec Electron dans le [Guide Démarrage Rapide](quick-start.md).

## L'équipe et les Contributeurs

Électrons est maintenu par une équipe à GitHub ainsi qu’un groupe de [contributeurs actifs](https://github.com/electron/electron/graphs/contributors) de la communauté. Certains des contributeurs sont individuels et d'autres travaillent dans de grandes entreprises qui développe sur Electron. Nous sommes heureux d'ajouter des contributeurs actifs au projet comme mainteneurs. En savoir plus pour [contribuer à Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Versions

[Electron est mis à jour](https://github.com/electron/electron/releases) régulièrement. Nous mettons à jour lors d'importantes corrections de bugs, de nouvelles APIs ou lors d'une mise à jour de Chromium ou Node.js.

### Mise à jour des Dépendances

La version de Chromium dans Electron est généralement mis à jour une ou deux semaines après qu'une nouvelle version stable de Chromium soit disponible, selon l'effort impliqué pour la mise à jour.

Quand une nouvelle version de Node.js est disponible, Electron attend habituellement environ un mois avant d'être mis à jour dans le but d'avoir une version plus stable.

Dans Electron, Node.js et Chromium partagent une instance unique de la V8 — habituellement la version qu'utilise Chromium. La plupart du temps cela *fonctionne correctement*, mais parfois il faut patcher Node.js.

### Versioning

À partir de la version 2.0, Electron [suivra la norme `semver`](https://semver.org). Pour la plupart des applications, et l'utilisation de toute version récente de npm, `$ npm install electron` fera la bonne installation.

Le processus de mise à jour de version est explicitement détaillé dans notre [Document de versionnement](electron-versioning.md).

### LTS

Le support à long terme pour les anciennes versions d'Electron n'existe pas actuellement. Si votre version d'Electron fonctionne pour vous, vous pouvez y rester dessus aussi longtemps que vous le désirez. Si vous voulez utiliser de nouvelles fonctionnalités, vous devrez alors mettre à jour votre projet vers une version plus récente.

Une mise à jour majeure est venu avec la version `v1.0.0`. Si vous n’utilisez pas encore cette version, vous devriez [en savoir plus sur les modifications de la `v1.0.0`](https://electronjs.org/blog/electron-1-0).

## Notre Philosophie

Afin de garder Electron léger (taille des fichiers) et durable (la propagation des dépendances et APIs), le projet se limite au scope du projet mère.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Cela permet de mettre à jour Chromium plus facilement, mais cela veut aussi dire que certaines fonctionnalités de Google Chrome n'existe pas dans Electron.

Les nouvelles fonctionnalités ajoutées dans Electron devraient être principalement les APIs natives. Si une fonctionnalité peut être dans un module Node.js, il devrait probablement l'être. Voir les [outils pour Electron développés par la communauté](https://electronjs.org/community).

## Historique

Voici les événements marquants de l’histoire d'Electron.

| :calendar:     | :tada:                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| **Avril 2013** | [Atom Shell est démarré](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Mai 2014**   | [Atom Shell passe en open source](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                |
| **Avril 2015** | [Atom Shell est rebaptisé Electron](https://github.com/electron/electron/pull/1389).                            |
| **Mai 2016**   | [Mise à jour d'Electron `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                    |
| **Mai 2016**   | [Les applications Electron sont compatibles avec l'App Store de Mac](mac-app-store-submission-guide.md).        |
| **Août 2016**  | [Support du Windows Store pour les applications Electron](windows-store-guide.md).                              |