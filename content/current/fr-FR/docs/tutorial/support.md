# Support Electron

## Trouver de l'aide

If you have a security concern, please see the [security document](https://github.com/electron/electron/tree/master/SECURITY.md).

Si vous avez besoin d’aide pour la programmation, de réponses à vos questions, ou pour rejoindre une discussion avec d’autres développeurs qui utilisent Electron, vous pouvez interagir avec la Communauté à ces adresses :
- [`electron`](https://discuss.atom.io/c/electron) sur le forum de Atom
- `#atom-shell` sur le channel Freenode
- ``Electron[](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406) sur le canal Slack d'Atom
- [`electron-ru`](https://telegram.me/electron_ru) *(Russe)*
- [`electron-br`](https://electron-br.slack.com) *(Brézilien Portugais)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coréen)*
- [`electron-jp`](https://electron-jp.slack.com) *(Japonais)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turque)*
- [`electron-id`](https://electron-id.slack.com) *(Indonésien)*
- [`electron-pl`](https://electronpl.github.io) *(Polonais)*

If you'd like to contribute to Electron, see the [contributing document](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Si vous découvrez une erreur dans une [version supportée](#supported-versions) d'Electron, veuillez s’il vous plaît la signaler dans notre [suivi d'erreurs](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) regroupe une liste d'exemples d'applications, d'outils et de ressources très utiles, maintenue par la Communauté.

## Versions supportées

The latest three *stable* major versions are supported by the Electron team. For example, if the latest release is 6.1.x, then the 5.0.x as well as the 4.2.x series are supported.  We only support the latest minor release for each stable release series.  This means that in the case of a security fix 6.1.x will receive the fix, but we will not release a new version of 6.0.x.

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

When an API is changed or removed in a way that breaks existing functionality, the previous functionality will be supported for a minimum of two major versions when possible before being removed. For example, if a function takes three arguments, and that number is reduced to two in major version 10, the three-argument version would continue to work until, at minimum, major version 12. Past the minimum two-version threshold, we will attempt to support backwards compatibility beyond two versions until the maintainers feel the maintenance burden is too high to continue doing so.

### Currently supported versions
- 8.1.x
- 7.1.x
- 6.1.x

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

Les deux binaires `ia32` (`x86`) et `x64` (`amd64`) sont fournit pour Windows. [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). Running apps packaged with previous versions is possible using the ia32 binary.

### Linux

Les binaires pré-compilés `ia32` (`i686`) et `x64` (`amd64`) d’Electron sont compilés sur Ubuntu 12.04, le binaire `armv7l` est compilé sur ARM v7 avec l'ABI hard-float et NEON pour Debian Wheezy.

[Until the release of Electron 2.0](../breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Les deux binaires sont identiques.

Le fait qu'un binaire pré-compilé peut ou non s'exécuter sur une distribution dépend si la distribution inclut ou non les librairies qu'Electron utilise pour compiler l'application. Du coup, seulement Ubuntu 12.04 est garanti de fonctionner, ainsi que les distributions suivantes pour faire fonctionner les binaires pré-compilés d'Electron :

* Ubuntu 12.04 et supérieur
* Fedora 21
* Debian 8
