# Support Electron

## Trouver de l'aide

Si vous avez un problème de sécurité, veuillez consulter le [document sur la sécurité](../../SECURITY.md).

Si vous avez besoin d’aide pour la programmation, de réponses à vos questions, ou pour rejoindre une discussion avec d’autres développeurs qui utilisent Electron, vous pouvez interagir avec la Communauté à ces adresses :
- [`electron`](https://discuss.atom.io/c/electron) sur le forum de Atom
- `#atom-shell` sur le channel Freenode
- [`Electron`](https://atom-slack.herokuapp.com) sur le channel Slack d'Atom
- [`electron-ru`](https://telegram.me/electron_ru) *(Russe)*
- [`electron-br`](https://electron-br.slack.com) *(Brézilien Portugais)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coréen)*
- [`electron-jp`](https://electron-jp.slack.com) *(Japonais)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turque)*
- [`electron-id`](https://electron-id.slack.com) *(Indonésien)*
- [`electron-pl`](https://electronpl.github.io) *(Polonais)*

Si vous souhaitez contribuer sur Electron, lisez le [document de contribution](../../CONTRIBUTING.md).

Si vous découvrez une erreur dans une [version supportée](#supported-versions) d'Electron, veuillez s’il vous plaît la signaler dans notre [suivi d'erreurs](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) regroupe une liste d'exemples d'applications, d'outils et de ressources très utiles, maintenue par la Communauté.

## Versions supportées

The latest three major versions are supported by the Electron team. For example, if the latest release is 5.0.x, then the 4.x.y series is supported, as are the two previous release series 3.x.y and 2.x.y.

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

### Currently supported versions
- 5.x
- 4.x
- 3.x

### End-of-life

Quand une branche de version arrive au terme de son cycle de support, les révisions associées sont rendues obsolètes dans NPM et une toute dernière révision de fin de support est mise à disposition. Cette révision signalera alors que la version d'Electron utilisée n'est plus supportée.

Ces étapes permettent aux développeurs d'applications d'être informés que la branche qu'ils utilisent ne sera bientôt plus supportée, sans toutefois trop importuner l'utilisateur final.

Si, pour une raison exceptionnelle, une application nécessite de rester sur une version d'Electron qui n'est plus supportée, les développeurs peuvent désactiver l'avertissement de fin de support en omettant d'ajouter dans la collection `devDependencies` du fichier `package.json` la dernière révision de fin de support. Par exemple, comme la version 1.6 est clôturée par la révision de fin de support 1.6.18, les développeurs pourraient choisir de continuer à l'utiliser sans message d'avertissement en précisant, dans `devDependency`, `"electron": 1.6.0 - 1.6.17`.

## Plateformes supportées

Les plateformes suivantes sont prises en charge par Electron :

### macOS

Seul les binaires 64bit sont fournit pour macOs, et la version minimale de macOs supportée est macOS 10.10 (Yosemite).

### Windows

Windows 7 et versions ultérieures sont pris en charge, les systèmes d’exploitation plus anciens ne sont pas pris en charge (et ne fonctionnent pas).

Les deux binaires `ia32` (`x86`) et `x64` (`amd64`) sont fournit pour Windows. Exécuter des applications Electron sous Windows pour des appareils avec une architecture ARM, est possible en utilisant le binaire ia32.

### Linux

Les binaires pré-compilés `ia32` (`i686`) et `x64` (`amd64`) d’Electron sont compilés sur Ubuntu 12.04, le binaire `armv7l` est compilé sur ARM v7 avec l'ABI hard-float et NEON pour Debian Wheezy.

[Jusqu'à la version 2.0 d'Electron](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron continuera également de sortir un binaire `armv7l` avec un simple suffix `arm`. Les deux binaires sont identiques.

Le fait qu'un binaire pré-compilé peut ou non s'exécuter sur une distribution dépend si la distribution inclut ou non les librairies qu'Electron utilise pour compiler l'application. Du coup, seulement Ubuntu 12.04 est garanti de fonctionner, ainsi que les distributions suivantes pour faire fonctionner les binaires pré-compilés d'Electron :

* Ubuntu 12.04 et supérieur
* Fedora 21
* Debian 8
