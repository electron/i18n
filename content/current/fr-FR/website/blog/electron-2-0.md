---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Après plus de quatre mois de développement, huit versions bêta et des tests mondiaux provenant des déploiements de nombreuses applications, la version d'Electron 2. .0 est maintenant disponible à partir de [electronjs.org](https://electronjs.org/).

---

## Processus de libération

À partir de la version 2.0.0, les versions d'Electron suivront [le versionnage sémantique](https://electronjs.org/blog/electron-2-semantic-boogaloo). Cela signifie que la version majeure va augmenter plus souvent et sera généralement une mise à jour majeure de Chromium. Les correctifs devraient être plus stables car ils ne contiendront que des corrections de bogues prioritaires.

Electron 2.0.0 représente également une amélioration de la façon dont Electron est stabilisé avant une version majeure. Plusieurs applications Electron à grande échelle ont inclus des bétas 2.0.0 dans les déploiements de mise en scène, fournissant les meilleures boucles de rétroaction jamais eues pour une série bêta.

## Modifications / Nouvelles fonctionnalités

 * Améliorations majeures de plusieurs parties importantes de la chaîne de compilation d'Electron, y compris Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 sous Linux, mise à jour correcteur orthographique et Squirrel.
 * [Les achats intégrés](https://electronjs.org/blog/in-app-purchases) sont maintenant pris en charge sur MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Nouvelle API pour le chargement des fichiers. [#11565](https://github.com/electron/electron/pull/11565)
 * Nouvelle API pour activer/désactiver une fenêtre. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Nouveau support pour la journalisation des messages IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Nouveaux événements du menu. [#11754](https://github.com/electron/electron/pull/11754)
 * Ajouter un événement `shutdown` à powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Ajouter l'option `affinité` pour rassembler plusieurs BrowserWindows en un seul processus. [#11501](https://github.com/electron/electron/pull/11501)
 * Ajouter la possibilité de saveDialog pour lister les extensions disponibles. [#11873](https://github.com/electron/electron/pull/11873)
 * Prise en charge des actions de notification supplémentaires [#11647](https://github.com/electron/electron/pull/11647)
 * La possibilité de définir le titre du bouton de fermeture des notifications macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * Ajouter des conditions pour menu.popup(window, callback)
 * Amélioration de la mémoire dans les éléments de la barre tactile. [#12527](https://github.com/electron/electron/pull/12527)
 * Liste de contrôle des recommandations de sécurité améliorée.
 * Ajouter des signets à portée de sécurité dans les applications. [#11711](https://github.com/electron/electron/pull/11711)
 * Ajoute la possibilité de définir des arguments arbitraires dans un processus de rendu. [#11850](https://github.com/electron/electron/pull/11850)
 * Ajouter la vue accessoire pour le sélecteur de format. [#11873](https://github.com/electron/electron/pull/11873)
 * Condition de course de délégués de réseau fixe. [#12053](https://github.com/electron/electron/pull/12053)
 * Déposer le support de l'arche `mips64el` sous Linux. Electron nécessite la chaîne de compilation C++14, qui n'était pas disponible pour cette arche au moment de la publication. Nous espérons pouvoir à nouveau apporter notre soutien à l'avenir.

## Interruption des modifications de l'API

 * Suppression des [API obsolètes](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), y compris :
   * Signature `menu.popup` modifiée. [#11968](https://github.com/electron/electron/pull/11968)
   * Suppression du obsolète `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Suppression des obsolètes `webContents.setZoomLevelLimits` et `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Les méthodes `presse-papiers` obsolètes ont été supprimées. [#11973](https://github.com/electron/electron/pull/11973)
   * Supprimé le support des paramètres booléens pour `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Corrections de bugs

 * Modifié pour vous assurer que `webContents.isOffscreen()` est toujours disponible. [#12531](https://github.com/electron/electron/pull/12531)
 * Correction de `BrowserWindow.getFocusedWindow()` lorsque les DevTools sont désamarrés et concentrés. [#12554](https://github.com/electron/electron/pull/12554)
 * Le préchargement ne se charge pas dans le rendu sandbox si le chemin de préchargement contient des caractères spéciaux. [#12643](https://github.com/electron/electron/pull/12643)
 * Corriger la valeur par défaut de allowRunningInsecureContent selon la docs. [#12629](https://github.com/electron/electron/pull/12629)
 * Correction de la transparence sur les images natives. [#12683](https://github.com/electron/electron/pull/12683)
 * Correction du problème avec `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Les options confirmées menu.popup sont des objets. [#12330](https://github.com/electron/electron/pull/12330)
 * Suppression d'une condition de compétition entre la création de nouveaux processus et la publication du contexte. [#12361](https://github.com/electron/electron/pull/12361)
 * Mettre à jour les régions glissables lors du changement de BrowserView. [#12370](https://github.com/electron/electron/pull/12370)
 * Correction de la détection des touches alt dans la barre de menus. [#12235](https://github.com/electron/electron/pull/12235)
 * Correction d'avertissements incorrects dans les vues Web. [#12236](https://github.com/electron/electron/pull/12236)
 * L'héritage de l'option 'montrer' à partir des fenêtres parentes. [#122444](https://github.com/electron/electron/pull/122444)
 * Assurez-vous que `getLastCrashReport()` est en fait le dernier rapport de plantage. [#12255](https://github.com/electron/electron/pull/12255)
 * Correction du besoin sur le chemin de partage réseau. [#12287](https://github.com/electron/electron/pull/12287)
 * Correction d'un clic de rappel sur le menu contextuel. [#12170](https://github.com/electron/electron/pull/12170)
 * Position du menu popup fixe. [#12181](https://github.com/electron/electron/pull/12181)
 * Nettoyage de la boucle libuv amélioré. [#11465](https://github.com/electron/electron/pull/11465)
 * Correction de `hexColorDWORDToRGBA` pour les couleurs transparentes. [#11557](https://github.com/electron/electron/pull/11557)
 * Correction de la déréférencement du pointeur NULL avec l'API getWebPreferences. [#12245](https://github.com/electron/electron/pull/12245)
 * Correction d'une référence cyclique dans le délégué du menu. [#11967](https://github.com/electron/electron/pull/11967)
 * Correction du filtrage du protocole de net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits définit maintenant les contraintes d'échelle des agents utilisateurs [#12510](https://github.com/electron/electron/pull/12510)
 * Définir les valeurs par défaut appropriées pour les options de webview. [#12292](https://github.com/electron/electron/pull/12292)
 * Amélioration du support des vibrances. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Correction du problème de chronométrage en mode singleton.
 * Correction du cache de production cassé dans NotifierSupportsActions()
 * Les rôles MenuItem sont compatibles avec la casse. [#11532](https://github.com/electron/electron/pull/11532)
 * Amélioration des mises à jour de la barre tactile. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Séparateurs de menu supplémentaires supprimés. [#11827](https://github.com/electron/electron/pull/11827)
 * Correction d'un bug du sélecteur Bluetooth. Ferme [#11399](https://github.com/electron/electron/pull/11399).
 * Correction de macos en plein écran de l'étiquette des éléments de menu Activer/Désactiver le menu. [#11633](https://github.com/electron/electron/pull/11633)
 * Amélioration du masquage de l'infobulle quand une fenêtre est désactivée. [#11644](https://github.com/electron/electron/pull/11644)
 * Méthode de visualisation Web migrée dépréciée. [#11798](https://github.com/electron/electron/pull/11798)
 * Correction de la fermeture d'une fenêtre ouverte depuis la vue du navigateur. [#11799](https://github.com/electron/electron/pull/11799)
 * Correction d'un bug du sélecteur Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Mis à jour pour utiliser le planificateur de tâches pour l'API app.getFileIcon. [#11595](https://github.com/electron/electron/pull/11595)
 * Changé pour déclencher l'événement `message de console` même lors de l'affichage hors écran. [#11921](https://github.com/electron/electron/pull/11921)
 * Correction du téléchargement à partir de protocoles personnalisés en utilisant `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Correction de la perte de transparence des fenêtres transparentes lors du détachement de devtools. [#11956](https://github.com/electron/electron/pull/11956)
 * Correction de l'annulation du redémarrage ou de l'arrêt des applications Electron. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Évènement de fuite lors de la réutilisation de l'élément de la barre tactile. [#12624](https://github.com/electron/electron/pull/12624)
 * Mise en surbrillance de la barre d'état fixe en mode sombre. [#12398](https://github.com/electron/electron/pull/12398)
 * Correction du blocage du processus principal pour les dialogues asynchrones. [#12407](https://github.com/electron/electron/pull/12407)
 * Correction du plantage de la zone de notification `setTitle`. [#12356](https://github.com/electron/electron/pull/12356)
 * Correction d'un plantage lors du paramétrage du menu du dock. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Meilleures notifications de bureau Linux. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Meilleure prise en charge du thème GTK+ pour les menus. [#12331](https://github.com/electron/electron/pull/12331)
 * Quitter gracieusement sur linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Utilisez le nom de l'application comme infobulle par défaut de l'icône de la barre de tâches. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Ajout du support de Visual Studio 2017. [#11656](https://github.com/electron/electron/pull/11656)
 * Correction du passage de l'exception au gestionnaire de plantage du système. [#12259](https://github.com/electron/electron/pull/12259)
 * Correction de l'infobulle de masquage de la fenêtre minimisée. [#11644](https://github.com/electron/electron/pull/11644)
 * Correction de `desktopCapturer` pour capturer l'écran correct. [#11664](https://github.com/electron/electron/pull/11664)
 * Correction de `disableHardwareAcceleration` avec transparence. [#11704](https://github.com/electron/electron/pull/11704)

# Ce qui suit

L'équipe d'Electron travaille dur pour supporter les nouvelles versions de Chromium, Node et v8. Attendez-vous à 3.0.0-beta.1 bientôt !
