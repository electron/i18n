---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

L'équipe d'Electron est heureuse d'annoncer que la première version stable d'Electron 3 est maintenant disponible chez [electronjs. rg](https://electronjs.org/) et via `npm installez electron@latest`! Il est bourré de mises à jour, de correctifs et de nouvelles fonctionnalités, et nous avons hâte de voir ce que vous construisez avec eux. Vous trouverez ci-dessous des détails sur cette version, et nous vous invitons à nous faire part de vos commentaires au fur et à mesure de votre exploration.

---

## Processus de libération

Au fur et à mesure que nous avons entrepris le développement de `v3.0.`, nous avons cherché à définir plus empiriquement des critères pour une version stable en formalisant la progression des retours pour les versions bêta progressives. `v3.0.` n'aurait pas été possible sans nos partenaires [du programme de retour d'application](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) qui ont fourni des tests précoces et des retours durant le cycle bêta. Merci à Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code, et aux autres membres du programme pour leur travail. Si vous souhaitez participer à de futures bêtas, veuillez nous écrire à [info@electronjs.org](mailto:info@electronjs.org).

## Modifications / Nouvelles fonctionnalités

Bumps majeurs à plusieurs parties importantes de la chaîne de compilation d'Electron, y compris Chrome `v66.0.3359.181`, Node `v10.2.0`, et V8 `v6.4.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] don : `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] feat: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] feat: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] don : `win.moveTop()` pour déplacer l'ordre de fenêtre vers le haut
* [[#13110](https://github.com/electron/electron/pull/13110)] feat: TextField and Button APIs
* [[#13068](https://github.com/electron/electron/pull/13068)] feat: netLog API pour le contrôle dynamique des logs
* [[#13539](https://github.com/electron/electron/pull/13539)] don : active `webview` dans le moteur de rendu sandbox
* [[#14118](https://github.com/electron/electron/pull/14118)] don : `fs.readSync` fonctionne maintenant avec des fichiers massifs
* [[#14031](https://github.com/electron/electron/pull/14031)] feat: node `fs` wrappers pour rendre `fs.realpathSync.native` et `fs.realpath.native` disponible

## Interruption des modifications de l'API

* [[#12362](https://github.com/electron/electron/pull/12362)] feat: mises à jour de l'ordre des éléments du menu
* [[#13050](https://github.com/electron/electron/pull/13050)] refactoring : a supprimé les API obsolètes documentées
  * Voir [docs](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) pour plus de détails
* [[#12477](https://github.com/electron/electron/pull/12477)] refactoring : supprimé `did-get-response-details` et `événements did-get-redirect-request`
* [[#12655](https://github.com/electron/electron/pull/12655)] don : désactivation par défaut de la navigation sur le glisser/déposer
* [[#12993](https://github.com/electron/electron/pull/12993)] don : Node `v4.x` ou supérieur est requis utilisez le module npm `electron`
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactoring : `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refactoring : `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] don : ne plus utiliser JSON pour envoyer le résultat de `ipcRenderer.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] feat: ignore par défaut les arguments de la ligne de commande suivant une URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refactor: renommer `api::Window` en `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] feat: zoom visuel désactivé par défaut
* [[#12408](https://github.com/electron/electron/pull/12408)] refactoring : renommer app-command `media-play_pause` en `media-play-pause-`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] feat: support des notifications de l'espace de travail
* [[#12496](https://github.com/electron/electron/pull/12496)] don : `tray.setIgnoreDoubleClickEvents(ignore)` pour ignorer la zone d'événements double-clic.
* [[#12281](https://github.com/electron/electron/pull/12281)] feat: fonctionnalité de la souris sur macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] feat: verrouillage de l'écran / déverrouillage des événements

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] feat: ajout de DIP vers/depuis les conversions de coordonnées de l'écran

**Nota Bene :** Passer à une ancienne version d'Electron après avoir exécuté cette version vous demandera de supprimer votre répertoire de données utilisateur pour éviter le plantage des anciennes versions. Vous pouvez obtenir le répertoire des données utilisateur en exécutant `console.log(app.getPath("userData"))` ou voir [docs](https://electronjs.org/docs/api/app#appgetpathname) pour plus de détails.

## Corrections de bugs

* [[#13397](https://github.com/electron/electron/pull/13397)] correction : problème avec `fs.statSyncNoException` lançant des exceptions
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] correction : plantage lors du chargement du site avec jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] correction : crash dans le destructeur `net::ClientSocketHandle`
* [[#14453](https://github.com/electron/electron/pull/14453)] correction : notifiez immédiatement le changement de focus plutôt que lors du prochain tick

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] correction : problème permettant la sélection de paquets dans la boîte de dialogue `<input file="type">` ouvrir un fichier
* [[#12404](https://github.com/electron/electron/pull/12404)] correction : blocage du processus principal lors de l'utilisation de la boîte de dialogue asynchrone
* [[#12043](https://github.com/electron/electron/pull/12043)] correction : cliquez sur callback dans le menu contextuel
* [[#12527](https://github.com/electron/electron/pull/12527)] correction : fuite d'événement lors de la réutilisation de l'élément touchbar
* [[#12352](https://github.com/electron/electron/pull/12352)] correction : plantage du titre de la barre d'état
* [[#12327](https://github.com/electron/electron/pull/12327)] correction : régions non draggables
* [[#12809](https://github.com/electron/electron/pull/12809)] correction : pour empêcher la mise à jour du menu pendant son ouverture
* [[#13162](https://github.com/electron/electron/pull/13162)] correction : les limites d'icône de la zone de notification n'autorisent pas les valeurs négatives
* [[#13085](https://github.com/electron/electron/pull/13085)] correction : le titre de la barre de tâches n'est pas inversé lorsque surligné
* [[#12196](https://github.com/electron/electron/pull/12196)] correction : build Mac quand `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] : problèmes supplémentaires sur les fenêtres sans cadre avec vibrance
* [[#13326](https://github.com/electron/electron/pull/13326)] correction : pour définir le protocole mac à aucun après avoir appelé `app.removeAsDefaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] correction : utilisation incorrecte des API privées dans la version MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] correction : `tray.setContextMenu` crash
* [[#14205](https://github.com/electron/electron/pull/14205)] : le fait d'appuyer sur escape sur une boîte de dialogue le ferme maintenant même si `defaultId` est défini

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] correction : `BrowserWindow.focus()` pour les fenêtres hors écran

## Autres Notes

* La visionneuse PDF ne fonctionne pas actuellement mais est en cours de travail et sera à nouveau fonctionnelle bientôt
* Les API `TextField` et `Bouton` sont expérimentales et sont donc désactivées par défaut
  * Ils peuvent être activés avec le drapeau de compilation `enable_view_api`

# Ce qui suit

L'équipe d'Electron continue à travailler à la définition de nos processus pour des mises à jour plus rapides et plus fluides alors que nous cherchons à maintenir la parité avec les cadences de développement de Chromium, Node, et V8.
