# Support Electron

## Trouver de l'aide

Si vous avez un problème de sécurité, veuillez consulter le [document sur la sécurité](https://github.com/electron/electron/tree/master/SECURITY.md).

Si vous avez besoin d’aide pour la programmation, de réponses à vos questions, ou pour rejoindre une discussion avec d’autres développeurs qui utilisent Electron, vous pouvez interagir avec la Communauté à ces adresses :

* Sur les Canaux de [`Electron's Discord`](https://discord.com/invite/electron):
  * Pour obtenir de l'aide
  * A propos d'applications de l'écosystème comme [Electron Forge](https://github.com/electron-userland/electron-forge) ou [Electron Fiddle](https://github.com/electron/fiddle)
  * Pour partager vos avec d’autres développeurs d’applications Electron
  * Et bien plus!
* Catégories des forums Atom concernant [`electron`](https://discuss.atom.io/c/electron)
* ``Electron[](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406) sur le canal Slack d'Atom
* [`electron-ru`](https://telegram.me/electron_ru) *(Russe)*
* [`electron-br`](https://electron-br.slack.com) *(Brézilien Portugais)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coréen)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japonais)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turque)*
* [`electron-id`](https://electron-id.slack.com) *(Indonésien)*
* [`electron-pl`](https://electronpl.github.io) *(Polonais)*

Si vous souhaitez contribuer à Electron, voir le document de contribution [](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Si vous découvrez une erreur dans une [version supportée](#supported-versions) d'Electron, veuillez s’il vous plaît la signaler dans notre [suivi d'erreurs](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) regroupe une liste d'exemples d'applications, d'outils et de ressources très utiles, maintenue par la Communauté.

## Versions supportées

Les trois dernières versions majeures *stables* sont prises en charge par l'équipe Electron. Par exemple, si la dernière version est 6.1.x, alors les versions 5.0.x ainsi que de la série 4.2.x sont supportées.  Nous ne prenons en charge que la dernière version mineure pour chaque version stable.  Cela signifie que dans le cas d'une correction de sécurité 6.1. recevra la correction, mais nous ne publierons pas une nouvelle version de la version 6.0.x.

La dernière version stable reçoit unilatéralement toutes les corrections de `master`, et la version antérieure qui reçoit la grande majorité de ces correctifs comme le temps et la bande passante le garantie. La plus ancienne ligne de version supportée recevra seulement des correctifs de sécurité directement.

Toutes les lignes de version supportées accepteront les demandes de fusion externes pour rétroporter corrections précédemment fusionnées à `master`, bien que cela puisse être au cas par cas pour certaines lignes plus anciennes supportées. Toutes les décisions contestées autour des rétroportages de la ligne de publication seront résolues par le [Groupe de travail sur les parutions](https://github.com/electron/governance/tree/master/wg-releases) en tant qu'élément de l'ordre du jour lors de leur réunion hebdomadaire la semaine où le RP de rétroport est levé.

Lorsqu'une API est modifiée ou supprimée d'une manière qui casse les fonctionnalités existantes, la fonctionnalité précédente sera prise en charge pour un minimum de deux versions majeures lorsque est possible avant d'être supprimée. Par exemple, si une fonction prend trois arguments, et que ce nombre est réduit à deux dans la version majeure 10, la version à trois arguments continuerait à fonctionner jusqu'à la version 12, au minimum, majeure. Dépassé le seuil minimum de deux versions, nous tenterons de supporter la compatibilité ascendante au-delà de deux versions jusqu'à ce que les responsables estiment que la charge de maintenance est trop élevée pour continuer à le faire.

### Versions actuellement supportées

* 13.x.y
* 12.x.y
* 11.x.y

### Fin de vie

Quand une branche de version arrive au terme de son cycle de support, les révisions associées sont rendues obsolètes dans NPM et une toute dernière révision de fin de support est mise à disposition. Cette révision signalera alors que la version d'Electron utilisée n'est plus supportée.

Ces étapes permettent aux développeurs d'applications d'être informés que la branche qu'ils utilisent ne sera bientôt plus supportée, sans toutefois trop importuner l'utilisateur final.

Si, pour une raison exceptionnelle, une application nécessite de rester sur une version d'Electron qui n'est plus supportée, les développeurs peuvent désactiver l'avertissement de fin de support en omettant d'ajouter dans la collection `devDependencies` du fichier `package.json` la dernière révision de fin de support. Par exemple, comme la version 1.6 est clôturée par la révision de fin de support 1.6.18, les développeurs pourraient choisir de continuer à l'utiliser sans message d'avertissement en précisant, dans `devDependency`, `"electron": 1.6.0 - 1.6.17`.

## Plateformes supportées

Les plateformes suivantes sont prises en charge par Electron :

### macOS

Seul les binaires 64bit sont fournit pour macOs, et la version minimale de macOs supportée est macOS 10.11 (El Capitan).

Le support natif des appareils Apple Silicon (`arm64`) a été ajouté dans Electron 11.0.0.

### Windows

Windows 7 et versions ultérieures sont pris en charge, les systèmes d’exploitation plus anciens ne sont pas pris en charge (et ne fonctionnent pas).

Les deux binaires `ia32` (`x86`) et `x64` (`amd64`) sont fournit pour Windows. [Le support natif pour Windows sur les appareils Arm (`arm64`) a été ajouté dans Electron 6.0.8.](windows-arm.md). L'exécution d'applications empaquetées avec des versions précédentes est possible en utilisant le binaire ia32.

### Linux

Les binaires prédéfinis d'Electron sont construits sur Ubuntu 18.04.

Le fait qu'un binaire pré-compilé peut ou non s'exécuter sur une distribution dépend si la distribution inclut ou non les librairies qu'Electron utilise pour compiler l'application. Du coup, seulement Ubuntu 18.04 est garanti de fonctionner, ainsi que les distributions suivantes pour faire fonctionner les binaires pré-compilés d'Electron :

* Ubuntu 14.04 et supérieur
* Fedora 24 et supérieur
* Debian 8 et supérieur
