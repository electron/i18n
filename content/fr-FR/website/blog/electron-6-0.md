---
title: Electron 6.0.0
author:
  - sofianguy
  - ckerr
  - codebytere
date: '2019-07-30'
---

L'équipe d'Electron est heureuse d'annoncer la sortie d'Electron 6.0.0 ! Vous pouvez l'installer avec npm via `npm install electron@latest` ou le télécharger sur notre [site web](https://electronjs.org/releases/stable). La version est remplie de mises à jour, de correctifs et de nouvelles fonctionnalités. Nous avons hâte de voir ce que vous construisez avec eux ! Continuer à lire pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez!

---

## Quoi de neuf

Aujourd'hui marque une première pour le projet Electron : c'est la première fois que nous faisons une version stable d'Electron **le même jour** que la [version stable de Chrome](https://www.chromestatus.com/features/schedule)! 🎉

Une grande partie de la fonctionnalité d'Electron est fournie par les composants principaux de Chromium, Node.js et V8. Electron se tient à jour avec ces projets pour fournir à nos utilisateurs de nouvelles fonctionnalités JavaScript, des améliorations de performance et des correctifs de sécurité. Chacun de ces paquets a un bogue majeur dans Electron 6 :

- Chromium `76.0.3809.88`
  - [Nouveau dans 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Nouveau dans 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Nouveau dans 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Node 12.4.0 article de blog](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [Article de blog V8 7.6](https://v8.dev/blog/v8-release-76)

Cette version inclut également des améliorations aux API d'Electron. [Les notes de version](https://github.com/electron/electron/releases/tag/v6.0.0) ont une liste plus complète, mais voici les points forts :

### Promisification

Electron 6.0 poursuit l'initiative de modernisation [](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) lancée en 5.0 pour améliorer le support de [Promettre](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Ces fonctions retournent maintenant Promises et supportent toujours les anciennes invocations basées sur les callbacks :
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Ces fonctions ont maintenant deux formes, synchrone et asynchrone basées sur Promis:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Ces fonctions retournent désormais des promesses :
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Rendererer).app`, `Electron Helper (GPU).app` et `Electron Helper (Plugin).app`

Afin d'activer le [runtime durci](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), qui limite les choses telles que la mémoire en écriture exécutable et le code de chargement signé par un autre ID d'équipe , des droits spéciaux de signature de code doivent être accordés à l'assistant.

Garder ces droits étendus aux types de processus qui les requièrent, Chromium [ajouté](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) trois nouvelles variantes de l'application Helper : une pour les rendus (`Electron Helper (Renderer). pp`), un pour le processus GPU (`Electron Helper (GPU). pp`) et un pour les plugins (`Electron Helper (Plugin).app`).

Les gens qui utilisent `electron-osx-sign` pour coconcevoir leur application Electron ne devraient pas avoir à modifier leur logique de construction. Si vous coconcevez votre application avec des scripts personnalisés, vous devriez vous assurer que les trois nouvelles applications d'aide sont correctement codées.

Afin d'empaqueter correctement votre application avec ces nouveaux aides, vous devez utiliser `electron-packager@14.0.4` ou supérieur.  Si vous utilisez `electron-builder` , vous devriez suivre [ce problème](https://github.com/electron-userland/electron-builder/issues/4104) pour suivre le support de ces nouveaux aides.

## Changements de rupture

 * Cette version commence à poser les bases d'une future exigence selon laquelle les modules natifs de Node chargés dans le processus de rendu soient soit [N-API](https://nodejs.org/api/n-api.html) ou [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Les raisons de ce changement sont des performances plus rapides, une sécurité accrue et une charge de travail de maintenance réduite. Lisez tous les détails, y compris le calendrier proposé dans [ce problème](https://github.com/electron/electron/issues/18397). Cette modification devrait être terminée dans Electron v11.

 * `les en-têtes de` net.IncomingMessage [ont légèrement changé](https://github.com/electron/electron/pull/17517#issue-263752903) pour correspondre plus étroitement [noeud. s comportement](https://nodejs.org/api/http.html#http_message_headers), en particulier avec la valeur de `set-cookie` et la manière dont les en-têtes en double sont gérés. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` renvoie maintenant vide et est un appel asynchrone. [#17121](https://github.com/electron/electron/pull/17121)

 * Les applications doivent maintenant définir explicitement un chemin de log en appelant la nouvelle fonction `app.setAppLogPath()` avant d'utiliser `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Fin du support pour 3.x.y

Par notre [politique de support](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y a atteint la fin de la vie. Nous encourageons les développeurs et les applications à mettre à jour vers une version plus récente d'Electron.

## Programme de feedback

Nous continuons à utiliser notre [Programme de Feedback de l'application](https://electronjs.org/blog/app-feedback-program) pour les tests. Les projets qui participent à ce programme testent les bétas d'Electron sur leurs applications ; et en retour, les nouveaux bogues qu'ils trouvent sont priorisés pour la version stable. Si vous souhaitez participer ou en savoir plus, [consultez notre blog sur le programme](https://electronjs.org/blog/app-feedback-program).

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. La [tentative de calendrier 7.0.0](https://electronjs.org/docs/tutorial/electron-timelines) cartographie les dates clés du cycle de vie de développement d'Electron 7. Aussi, [voir notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
