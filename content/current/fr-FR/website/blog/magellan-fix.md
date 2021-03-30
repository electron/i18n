---
title: Correction de la vulnérabilité de SQLite
author: ckerr
date: '2018-12-18'
---

Une vulnérabilité d'exécution de code à distance "[Magellan](https://blade.tencent.com/magellan/index_en.html)" a été découverte affectant des logiciels basés sur SQLite ou Chromium, y compris toutes les versions d'Electron.

---

## Périmètre d'application

Les applications Electron utilisant Web SQL sont impactées.


## Atténuation

Les applications affectées devraient cesser d'utiliser Web SQL ou mettre à niveau vers une version corrigée d'Electron.

Nous avons publié de nouvelles versions d'Electron qui incluent des corrections pour cette vulnérabilité :
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-bêta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Il n'y a pas de signalement dans la nature ; cependant, les demandes affectées sont invitées à les atténuer.

## Informations complémentaires

Cette vulnérabilité a été découverte par l'équipe de Tencent Blade, qui a publié [un article de blog qui discute de la vulnérabilité](https://blade.tencent.com/magellan/index_en.html).

Pour en savoir plus sur les meilleures pratiques pour sécuriser vos applications Electron, consultez notre [tutoriel de sécurité][].

Si vous souhaitez signaler une vulnérabilité dans Electron, envoyez un e-mail à security@electronjs.org.

[tutoriel de sécurité]: https://electronjs.org/docs/tutorial/security
