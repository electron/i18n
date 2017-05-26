# A propos d'Electron

[Electron](https://electron.atom.io) est une librairie open source développé par GitHub pour créer des applications desktop cross-platform avec HTML, CSS et JavaScript. C'est en combinant [Chromium](https://www.chromium.org/Home) et [Node.js](https://nodejs.org) en un seul runtime qu'Electron accomplit cette tâche. Ainsi les applications peuvent être empaquetées pour Mac, Windows et Linux.

Electron débute en 2013 en tant que framework sur lequel [Atom](https://atom.io), l'éditeur de texte de GitHub, se base. Depuis, les deux ont été mis en open source au Printemps 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electron.atom.io/apps/).

Read on to learn more about the contributors and releases of Electron or get started building with Electron in the [Quick Start Guide](quick-start.md).

## L'équipe et les Contributeurs

Electron is maintained by a team at GitHub as well as a group of [active contributors](https://github.com/electron/electron/graphs/contributors) from the community. Some of the contributors are individuals and some work at larger companies who are developing on Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Releases

[Electron est mis à jour](https://github.com/electron/electron/releases) régulièrement. Nous mettons à jour lors d'importantes corrections de bugs, de nouvelles APIs ou lors d'une mise à jour de Chromium ou Node.js.

### Mise à jour des Dépendances

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Versioning

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## Historique

Voici les événements marquants de l’histoire d'Electron.

| :calendar:     | :tada:                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Avril 2013** | [Atom Shell est démarré](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).                              |
| **Mai 2014**   | [Atom Shell passe en open source](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                                              |
| **Avril 2015** | [Atom Shell est rebaptisé Electron](https://github.com/electron/electron/pull/1389).                                                         |
| **Mai 2016**   | [Mise à jour d'Electron `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                                    |
| **Mai 2016**   | [Les applications Electron sont compatibles avec l'App Store de Mac](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **Août 2016**  | [Support du Windows Store pour les applications Electron](https://electron.atom.io/docs/tutorial/windows-store-guide).                       |