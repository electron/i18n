---
title: Correction de la vulnérabilité de Chromium FileReader
author: sonorité de maréchal
date: '2019-03-07'
---

Une vulnérabilité de grande sévérité a été découverte dans Chrome, qui affecte tous les logiciels basés sur Chromium, y compris Electron.

Cette vulnérabilité a été assignée `CVE-2019-5786`.  Vous pouvez en savoir plus à ce sujet dans le [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Veuillez noter que Chrome a des rapports sur cette vulnérabilité utilisée dans la nature. Il est donc fortement recommandé de mettre à jour Electron dès que possible.

---

## Périmètre d'application

Ceci affecte toutes les applications Electron qui peuvent exécuter des JavaScript tiers ou non fiables.

## Atténuation

Les applications affectées devraient se mettre à jour vers une version corrigée d'Electron.

Nous avons publié de nouvelles versions d'Electron qui incluent des corrections pour cette vulnérabilité :
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

La dernière version bêta d'Electron 5 suivait Chromium 73 et est donc déjà mise à jour :
  * [5.0.0-bêta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Informations complémentaires

Cette vulnérabilité a été découverte par Clement Lecigne du Groupe d'analyse des menaces de Google et a été signalée à l'équipe Chrome.  Le post du blog Chrome peut être trouvé [ici](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Pour en savoir plus sur les meilleures pratiques pour sécuriser vos applications Electron, consultez notre [tutoriel de sécurité](https://electronjs.org/docs/tutorial/security).

Si vous souhaitez signaler une vulnérabilité dans Electron, envoyez un e-mail à security@electronjs.org.
