---
title: Correction de la vulnérabilité du gestionnaire de protocole
author: zeke
date: '2018-01-22'
---

Une vulnérabilité d'exécution de code à distance a été découverte affectant les applications Electron qui utilisent des gestionnaires de protocoles personnalisés. Cette vulnérabilité a été assignée à l'identifiant CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Plateformes affectées

Les applications Electron conçues pour fonctionner sous Windows qui s'inscrivent comme le gestionnaire par défaut d'un protocole, comme `myapp://`, sont vulnérables.

Ces applications peuvent être affectées indépendamment de la manière dont le protocole est enregistré, p. ex. en utilisant le code natif, le registre Windows, ou l'API

macOS et Linux ne sont **pas vulnérables** à ce problème.

## Atténuation

Nous avons publié de nouvelles versions d'Electron qui incluent des corrections pour cette vulnérabilité : [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), et [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Nous encourageons tous les développeurs d'Electron à mettre à jour leurs applications vers la dernière version stable immédiatement.

Si pour une raison quelconque, vous ne pouvez pas mettre à jour votre version d'Electron, vous pouvez ajouter `--` comme dernier argument en appelant l'application [. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), qui empêche Chromium d'analyser d'autres options. Le double tiret `--` indique la fin des options de commande, après quoi seuls les paramètres positionnels sont acceptés.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

See the [app.setAsDefaultProtocolClient][] API for more details.

Voir l'API [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) pour plus de détails.

Si vous souhaitez signaler une vulnérabilité dans Electron, envoyez un e-mail à security@electronjs.org.

[app.setAsDefaultProtocolClient]: https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows
