---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

L'équipe d'Electron est heureuse d'annoncer que la version stable d'Electron 4 est maintenant disponible ! Vous pouvez l'installer depuis [electronjs.org](https://electronjs.org/) ou depuis npm via `npm install electron@latest`. La version est remplie de mises à jour, de correctifs et de nouvelles fonctionnalités, et nous avons hâte de voir ce que vous construisez avec eux. En savoir plus pour plus de détails sur cette version, et s'il vous plaît partager tout commentaire que vous avez au fur et à mesure de l'explorer!

---

## Quoi de neuf ?

Une grande partie de la fonctionnalité d'Electron est fournie par Chromium, Node.js et V8, les composants principaux qui composent Electron. À ce titre, un objectif clé pour l'équipe d'Electron est de suivre au maximum les changements apportés à ces projets fournissant aux développeurs qui construisent des applications Electron l'accès à de nouvelles fonctionnalités web et JavaScript. À cette fin, Electron 4 offre des améliorations majeures de version pour chacun de ces composants; Electron v4.0.0 inclut Chromium `69. .3497.106`, Node `10.11.0`, et V8 `6.9.427.24`.

De plus, Electron 4 inclut des modifications aux API spécifiques à Electron. Vous pouvez trouver un résumé des changements majeurs dans Electron 4 ci-dessous; pour la liste complète des changements, consultez la [Electron v4. .0 notes de publication](https://github.com/electron/electron/releases/tag/v4.0.0).

### Désactivation du module `distant`

Vous avez maintenant la possibilité de désactiver le module `distant` pour des raisons de sécurité. Le module peut être désactivé pour `BrowserWindow`s et pour les balises `webview`:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Voir la documentation [BrowserWindow](https://electronjs.org/docs/api/browser-window) et [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) pour plus d'informations.

### Filtrage `remote.require()` / `remote.getGlobal()` Requêtes

Cette fonctionnalité est utile si vous ne voulez pas désactiver complètement le module `distant` dans votre processus de rendu ou `webview` mais souhaitez un contrôle supplémentaire sur quels modules peuvent être requis via `distante. équiper`.

Quand un module est requis via la télécommande `. équiper` dans un processus de rendu un événement `à besoin de télécommande` est soulevé sur le module [`app`](https://electronjs.org/docs/api/app). Vous pouvez appeler `event.preventDefault()` sur l'événement (le premier argument) pour empêcher le module d'être chargé. L'instance [`WebContents`](https://electronjs.org/docs/api/web-contents) où la demande s'est produite est passée comme second argument, et le nom du module est passé comme troisième argument. Le même événement est également émis sur l'instance `WebContents` mais dans ce cas, les seuls arguments sont l'événement et le nom du module. Dans les deux cas, vous pouvez retourner une valeur personnalisée en définissant la valeur de `event.returnValue`.

```javascript
// Contrôle `remote.require` de tous les WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Contrôle `remote.require` depuis une instance WebContents spécifique:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

De manière similaire, lorsque `remote.getGlobal(name)` est appelé, un événement `remote-get-global` est levé. Cela fonctionne de la même manière que l'événement `remote-require` : appelez `preventDefault()` pour éviter que le global ne soit retourné, et définissez `événement. eturnValue` pour retourner une valeur personnalisée.

```javascript
// Contrôle `remote.getGlobal` de tous les WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// Contrôle `remote.getGlobal` à partir d'une instance spécifique WebContents :
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Pour plus d'informations, voir la documentation suivante :

* [`Exiger`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`Obtenir Global`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`WebContents`](https://electronjs.org/docs/api/web-contents)

### Accès JavaScript au panneau À propos

Sur macOS, vous pouvez maintenant appeler l'application `. howAboutPanel()` pour afficher le panneau À propos de manière programmatique, comme cliquer sur l'élément de menu créé via `{role: 'about'}`. Voir la documentation [`à propos du panneau`](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) pour plus d'informations

### Contrôle de `WebContents` en arrière-plan

`Les instances WebContents` ont maintenant une méthode `setBackgroundThrottling(autorisé)` pour activer ou désactiver le limitation des minuteurs et des animations lorsque la page est en arrière-plan.

```javascript
let win = nouveau BrowserWindow (...)
win.webContents.setBackgroundThrottling (enableBackgroundThrottling)
```

Voir [la documentation `setBackgroundThrottling`](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) pour plus d'informations.

## Changements de rupture

### Plus de support pour macOS 10.9

Chromium ne prend plus en charge macOS 10.9 (OS X Mavericks), et par conséquent [Electron 4.0 et au-delà ne le supporte pas non plus](https://github.com/electron/electron/pull/15357).

### Verrouillage de l'instance unique

Auparavant, pour faire de votre application une application en une seule instance (assurez-vous qu'une seule instance de votre application est en cours d'exécution), vous pouvez utiliser l'application `. méthode akeSingleInstance()`. À partir d'Electron 4.0, vous devez utiliser `app.requestSingleInstanceLock()` à la place. La valeur de retour de cette méthode indique si cette instance de votre application a obtenu le verrou avec succès. S'il n'a pas réussi à obtenir le verrou, vous pouvez supposer qu'une autre instance de votre application est déjà en cours d'exécution avec le verrou et quitte immédiatement.

Pour un exemple d'utilisation de `requestSingleInstanceLock()` et des informations sur le comportement nuancé sur différentes plateformes, [voir la documentation de l'application `. equestSingleInstanceLock()` et les méthodes connexes](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) et [la `seconde instance` événement](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Lors de la construction de modules natifs pour windows, la variable `win_delay_load_hook` dans le module `binding.gyp` doit être vraie (ce qui est la valeur par défaut). Si ce hook n'est pas présent, alors le module natif ne pourra pas être chargé sous Windows, avec un message d'erreur comme `Impossible de trouver le module`. [Voir le guide du module natif](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) pour plus d'informations.

## Dépréciations

Les changements suivants sont prévus pour Electron 5.0, et sont donc obsolètes dans Electron 4.0.

### Intégration de Node.js désactivée pour `nativeWindowOpen`-ed Windows

À partir d'Electron 5.0, les sous-fenêtres ouvertes avec l'option `nativeWindowOpen` auront toujours l'intégration de Node.js désactivée.

### `webPreferences` Valeurs par défaut

Lors de la création d'une nouvelle `BrowserWindow` avec l'option `webPreferences` définie. les options par défaut `webPreferences` suivantes sont dépréciées en faveur des nouvelles valeurs par défaut listées ci-dessous :

<div class="table table-ruled table-full-width">

| Propriété | Défaut obsolète par défaut | Nouveau défaut |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | valeur de `nodeIntegration` si défini, sinon `true` | `false` |

</div>

Veuillez noter : il y a actuellement [un bogue connu (#9736)](https://github.com/electron/electron/issues/9736) qui empêche la balise `webview` de fonctionner si `contextIsolation` est activée. Gardez un œil sur le problème GitHub pour des informations à jour !

En savoir plus sur l'isolement du contexte, l'intégration des nœuds et la balise `webview` dans [le document de sécurité d'Electron](https://electronjs.org/docs/tutorial/security).

Electron 4.0 utilisera toujours les valeurs par défaut courantes, mais si vous ne leur passez pas une valeur explicite, vous verrez un avertissement de dépréciation. Pour préparer votre application pour Electron 5.0, utilisez des valeurs explicites pour ces options. [Voir la documentation `BrowserWindow`](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) pour plus de détails sur chacune de ces options.

### `webContents.findInPage(text[, options])`

Les options `medialCapitalAsWordStart` et `wordStart` ont été dépréciées car elles ont été supprimées en amont.

## Programme de feedback

Le [programme de rétroaction de l'application](https://electronjs.org/blog/app-feedback-program) que nous avons mis en place pendant le développement d'Electron 3. a été un succès, donc nous l'avons continué pendant le développement de la version 4.0. Nous aimerions remercier chaleureusement Atlassian, Discord, MS Teams, OpenFin, Slack, Symphony, WhatsApp et les autres membres du programme pour leur participation durant les 4. Cycle bêta. Pour en savoir plus sur le programme de rétroaction des applications et pour participer à de futures bêtes, [consultez notre article de blog sur le programme](https://electronjs.org/blog/app-feedback-program).

## Ce qui suit

À court terme, vous pouvez vous attendre à ce que l'équipe continue de se concentrer sur le développement des principaux composants qui composent Electron, y compris Chromium, Node, et V8. Bien que nous veillions à ne pas faire de promesses à propos des dates de publication, notre plan est la sortie de nouvelles versions majeures d'Electron avec de nouvelles versions de ces composants environ un trimestre. [Consultez notre document de versioning](https://electronjs.org/docs/tutorial/electron-versioning) pour plus d'informations sur le versioning dans Electron.

Pour des informations sur les changements de rupture prévus dans les versions à venir d'Electron, [voir notre documentation sur les changements de rupture planifiés](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
