---
title: BrowserView window.open() Vulnerability Fix
author: ckerr
date: '2019-02-03'
---

Une vulnérabilité de code a été découverte qui permettait à Node d'être réactivé dans les fenêtres enfants.

---

L'ouverture d'un BrowserView avec `sandbox: true` ou `nativeWindowOpen: true` et `nodeIntegration: false` donne un contenu Web où `window.open` peut être appelé et la fenêtre enfant nouvellement ouverte aura `nodeIntegration` activé. Cette vulnérabilité affecte toutes les versions prises en charge d'Electron.

## Atténuation

Nous avons publié de nouvelles versions d'Electron qui incluent des corrections pour cette vulnérabilité : [`2.0.17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0.15`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4.0.4`](https://github.com/electron/electron/releases/tag/v4.0.4), et [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Nous encourageons tous les développeurs d'Electron à mettre à jour leurs applications vers la dernière version stable immédiatement.

Si pour une raison quelconque, vous ne pouvez pas mettre à jour votre version d'Electron, vous pouvez atténuer ce problème en désactivant tous les contenus web enfants :

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Informations complémentaires

Cette vulnérabilité a été trouvée et signalée de manière responsable au projet Electron par [PalmerAL](https://github.com/PalmerAL).

Pour en savoir plus sur les meilleures pratiques pour sécuriser vos applications Electron, consultez notre [tutoriel de sécurité][].

Si vous souhaitez signaler une vulnérabilité dans Electron, envoyez un e-mail à security@electronjs.org.

[tutoriel de sécurité]: https://electronjs.org/docs/tutorial/security
