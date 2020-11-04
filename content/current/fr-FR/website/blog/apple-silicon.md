---
title: Prise en charge de la silicium Apple
author: MarshallOfSound
date: '2020-10-15'
---

Avec la sortie de matériel Apple Silicon plus tard dans l'année, à quoi ressemble le chemin d'accès pour que votre application Electron fonctionne sur le nouveau matériel ?

---

Avec la sortie d'Electron 11.0.0-beta. , l'équipe d'Electron est maintenant en train de livrer des versions d'Electron qui fonctionnent sur le nouveau matériel Apple Silicon qu'Apple prévoit d'expédier plus tard cette année. Vous pouvez récupérer la dernière version bêta avec `npm install electron@beta` ou la télécharger directement sur notre [site web](https://electronjs.org/releases/stable).

## Comment cela fonctionne-t-il ?

À partir d'Electron 11, nous expédierons des versions séparées d'Electron pour les Mac Intel et Apple Silicon Macs. Avant cette modification, nous expédiions déjà deux artefacts, `darwin-x64` et `mas-x64`, avec ce dernier étant pour l'utilisation de la compatibilité Mac App Store. Nous livrons maintenant deux autres artefacts, `darwin-arm64` et `mas-arm64`, qui sont les équivalents silicones Apple des artefacts susmentionnés.

## Que dois-je faire ?

Vous devrez livrer deux versions de votre application : une pour x64 (Intel Mac) et une pour arm64 (Apple Silicon). La bonne nouvelle est que [`electron-packager`](https://github.com/electron/electron-packager/), [`electron-rebuild`](https://github.com/electron/electron-rebuild/) et [`electron-forge`](https://github.com/electron-userland/electron-forge/) prend déjà en charge l'architecture `arm64`. Tant que vous utilisez les dernières versions de ces paquets, votre application devrait fonctionner sans problème une fois que vous avez mis à jour l'architecture cible vers `arm64`.

Dans le futur nous publierons un paquet qui vous permettra de « fusionner » vos applications `arm64` et `x64` en un seul binaire universel, mais il faut noter que ce binaire serait _énorme_ et n'est probablement pas idéal pour l'expédition aux utilisateurs.

## Problèmes potentiels

### Modules natifs

Comme vous visez une nouvelle architecture, vous devrez mettre à jour plusieurs dépendances qui peuvent causer des problèmes de construction. La version minimale de certaines dépendances est incluse ci-dessous pour votre référence.

| Dépendance          | Exigences de version |
| ------------------- | -------------------- |
| Xcode               | `>=12.0.0`        |
| `node-gyp`          | `>=7.1.0`         |
| `electron-rebuild`  | `>=1.12.0`        |
| `electron-packager` | `>=15.1.0`        |

En raison de ces exigences de version de dépendances, vous devrez peut-être corriger/mettre à jour certains modules natifs.  Une remarque est que la mise à jour de Xcode va introduire une nouvelle version du SDK macOS, qui peuvent causer des échecs de compilation pour vos modules natifs.


## Comment puis-je le tester ?

Actuellement, les applications Apple Silicon ne fonctionnent que sur le matériel Apple Silicon, qui n'est pas commercialement disponible au moment de l'écriture de ce blog. Si vous avez un Kit de transition [Développeur](https://developer.apple.com/programs/universal/), vous pouvez tester votre application sur cela. Sinon, vous devrez attendre la sortie de la production de matériel Apple Silicon pour tester si votre application fonctionne.

## Qu'en est-il de Rosetta 2?

Rosetta 2 est la dernière itération d'Apple de leur technologie [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) . qui vous permet d'exécuter des applications Intel x64 sur leur nouveau matériel Apple Silicon arm64. Bien que nous pensions que les applications x64 Electron seront exécutées sous Rosetta 2, il y a quelques choses importantes à noter (et les raisons pour lesquelles vous devriez expédier un binaire natif arm64).

* Les performances de votre application seront considérablement dégradées. Electron / V8 utilise la compilation [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) pour JavaScript, et en raison du fonctionnement de Rosetta vous allez effectivement exécuter JIT deux fois (une fois en V8 et une fois en Rosetta).
* Vous perdez le bénéfice de la nouvelle technologie dans Apple Silicon, comme l'augmentation de la taille de la page mémoire.
* Avons-nous mentionné que la performance sera **significativement dégradée**?
