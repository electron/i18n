---
title: Suppression de la prise en charge pour Linux 32 bits
author: felixrieseberg
date: '2019-03-04'
---

L'équipe d'Electron cessera de prendre en charge Linux 32 bits (ia32 / i386) à partir d'Electron v4.0. La dernière version d'Electron qui prend en charge les installations basées sur 32 bits de Linux est Electron v3.1, qui recevra des versions de support jusqu'à la sortie d'Electron v6. La prise en charge de Linux basé sur 64 bits et `armv7l` continuera inchangée.

---

## Qu'est-ce qu'Electron ne supporte plus exactement ?

Vous avez peut-être vu la description « 64 bits » et « 32 bits » comme autocollants sur votre ordinateur ou comme options pour télécharger des logiciels. Le terme est utilisé pour décrire une architecture informatique spécifique. La plupart des ordinateurs fabriqués dans les années 1990 et au début des années 2000 ont été fabriqués avec des processeurs basés sur l'architecture 32 bits alors que la plupart des ordinateurs créés plus tard étaient basés sur une architecture 64 bits plus récente et plus puissante. La Nintendo 64 (vous pouvez l'obtenir? et la PlayStation 2 étaient les premiers appareils grand public largement disponibles avec la nouvelle architecture, les ordinateurs vendus après 2010 contenaient presque exclusivement des processeurs 64 bits. Par conséquent, la prise en charge a été réduite : Google a cessé de publier Chrome pour Linux 32 bits en mars 2016, Canonical a cessé de fournir des images de bureau 32 bits en 2017 et a abandonné la prise en charge de 32 bits avec Ubuntu 18.10. Arch Linux, système d'exploitation élémentaire et autres importantes distributions Linux ont déjà abandonné la prise en charge de l'architecture du processeur vieillissante.

Jusqu'à présent, Electron a fourni et pris en charge des versions qui fonctionnent sur l'ancienne architecture 32 bits. À partir de la version 4.0, l'équipe d'Electron ne pourra plus fournir de binaires ou de support pour Linux 32 bits.

Electron a toujours été un projet open source dynamique et nous continuons à soutenir et à encourager les développeurs intéressés à construire Electron pour des architectures exotiques.

## Qu'est-ce que cela signifie pour les développeurs ?

Si vous ne fournissez pas de distributions 32 bits de votre application pour Linux, aucune action n'est requise.

Les projets qui fournissent des applications Linux Electron 32 bits devront décider comment procéder. Linux 32 bits sera pris en charge sur Electron 3 [jusqu'à](https://electronjs.org/docs/tutorial/support#supported-versions) la version d'Electron 6, ce qui donne un peu de temps pour prendre des décisions et des plans.

## Qu'est-ce que cela signifie pour les utilisateurs?

Si vous êtes un utilisateur de Linux et que vous ne savez pas si vous utilisez un système 64 bits vous utilisez probablement une architecture basée sur 64 bits. Pour être sûr, vous pouvez exécuter les commandes `lscpu` ou `uname -m` dans votre terminal. Soit on imprimera votre architecture actuelle.

Si vous utilisez Linux sur un processeur 32 bits, vous avez probablement déjà rencontré des difficultés à trouver des logiciels récemment publiés pour votre système d'exploitation. L'équipe d'Electron se joint à d'autres membres importants de la communauté Linux en vous recommandant de mettre à jour vers une architecture basée sur 64 bits.
