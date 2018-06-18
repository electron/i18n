# Support Electron

## Trouver de l'aide

Si vous avez un problème de sécurité, veuillez consulter le [document sur la sécurité](../../SECURITY.md).

Si vous avez besoin d’aide pour la programmation, de réponses à vos questions, ou pour rejoindre une discussion avec d’autres développeurs qui utilisent Electron, vous pouvez interagir avec la Communauté à ces adresses :

* [`electron`](https://discuss.atom.io/c/electron) sur le forum de Atom
* `#atom-shell` sur le channel Freenode
* [`Electron`](https://atom-slack.herokuapp.com) sur le channel Slack d'Atom
* [`electron-ru`](https://telegram.me/electron_ru) *(Russe)*
* [`electron-br`](https://electron-br.slack.com) *(Brézilien Portugais)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coréen)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japonais)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turque)*
* [`electron-id`](https://electron-id.slack.com) *(Indonésien)*
* [`electron-pl`](https://electronpl.github.io) *(Polonais)*

Si vous souhaitez contribuer sur Electron, lisez le [document de contribution](../../CONTRIBUTING.md).

If you've found a bug in a [supported version](#supported-versions) of Electron, please report it with the [issue tracker](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) is a community-maintained list of useful example apps, tools and resources.

## Versions supportées

The latest three release branches are supported by the Electron team. For example, if the latest release is 2.0.x, then the 2-0-x series is supported, as are the two previous release series 1-7-x and 1-8-x.

When a release branch reaches the end of its support cycle, the series will be deprecated in NPM and a final end-of-support release will be made. This release will add a warning to inform that an unsupported version of Electron is in use.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## Plateformes supportées

Les plateformes suivantes sont prises en charge par Electron :

### macOS

Seul le binaire 64bits sont fournis pour macOS, et la version macOS minimale prise en charge est macOS 10.9.

### Windows

Windows 7 et versions ultérieures sont pris en charge, les systèmes d’exploitation plus anciens ne sont pas pris en charge (et ne fonctionnent pas).

Les deux binaires `ia32` (`x86`) et `x64` (`amd64`) sont fournit pour Windows. Exécuter des applications Electron sous Windows pour des appareils avec une architecture ARM, est possible en utilisant le binaire ia32.

### Linux

Les binaires pré-compilés `ia32` (`i686`) et `x64` (`amd64`) d’Electron sont compilés sur Ubuntu 12.04, le binaire `armv7l` est compilé sur ARM v7 avec l'ABI hard-float et NEON pour Debian Wheezy.

[Jusqu'à la version 2.0 d'Electron](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron continuera également de sortir un binaire `armv7l` avec un simple suffix `arm`. Les deux fichiers binaires sont identiques.

Le fait qu'un binaire pré-compilé peut ou non s'exécuter sur une distribution dépend si la distribution inclut ou non les librairies qu'Electron utilise pour compiler l'application. Du coup, seulement Ubuntu 12.04 est garanti de fonctionner, ainsi que les distributions suivantes pour faire fonctionner les binaires pré-compilés d'Electron :

* Ubuntu 12.04 et supérieur
* Fedora 21
* Debian 8