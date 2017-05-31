# Intégration de l’environnement de bureau

Différents systèmes d’exploitation fournissent des fonctionnalités différentes pour intégrer des applications bureautiques dans leurs environnements de bureau. Par exemple, sous Windows, applications peuvent mettre des raccourcis dans la JumpList de barre des tâches, et sur Mac, les applications peuvent mettre un menu personnalisé dans le menu du dock.

Ce guide explique comment intégrer votre application dans les environnements de bureau avec les API de l’électron.

## Notifications

Voir [Notifications](notifications.md)

## Documents récents (Windows & macOS)

Windows et macOS permettent d’accéder facilement à une liste des documents récemment ouverts par l’application via JumpList ou dock menu, respectivement.

**JumpList :**

![JumpList fichiers récents](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menu du dock de demande :**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

Pour ajouter un fichier pour les documents récents, vous pouvez utiliser l’API de[app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-os-x-windows) :

```javascript
const {app} = require('electron') app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Et vous pouvez utiliser l’API [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-os-x-windows) pour vider la liste des documents récents :

```javascript
const {app} = require('electron') app.clearRecentDocuments()
```

### Notes de Windows

Pour pouvoir utiliser cette fonctionnalité sur Windows, votre application doit être enregistré en tant que gestionnaire du type de fichier du document, sinon que le fichier n’apparaître pas dans la JumpList même après que vous avoir ajouté. Vous trouverez tout sur l’inscription de votre application dans [Application Registration](http://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx).

Lorsqu’un utilisateur clique sur un fichier à partir de la JumpList, démarre une nouvelle instance de votre application avec le chemin d’accès du fichier ajouté comme un argument de ligne de commande.

### Notes de macOS

Lorsqu’un fichier est demandé dans le menu documents récents, l’événement de `open-file` du module `app` retentit pour elle.

## Menu personnalisé du Dock (Mac OS)

macOS permet aux développeurs de spécifier un menu personnalisé pour le dock, qui contient généralement des raccourcis pour les fonctionnalités courantes de votre application :

**Menu du Dock de Terminal.app :**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

Pour définir votre menu du dock personnalisé, vous pouvez utiliser le `app.dock.setMenu` API, qui n’est disponible sur Mac OS :

```javascript
const {app, Menu} = UvumiTools const require('electron') = Menu.buildFromTemplate ([{label : "Nouvelle fenêtre", clic () {console.log ("nouvelle fenêtre")}}, {label : « Nouvelle fenêtre avec les paramètres », sous-menu : [{label: 'Basic'}, {label: 'Pro'}]}, {label: 'New Command...'}]) app.dock.setMenu(dockMenu)
```

## Tâches utilisateur (Windows)

Sous Windows, vous pouvez spécifier des actions personnalisées dans la catégorie `Tasks` de la JumpList, cité depuis le site MSDN :

> Applications définir des tâches basées sur les caractéristiques du programme et les notions clés qu’un utilisateur est censé faire avec eux. Tâches devraient être algébrique, car l’application n’a pas besoin de courir pour eux de travailler. Ils devraient également être les actions statistiquement plus courantes qui procéderaient à un utilisateur normal dans une application, par exemple comme composer un message électronique ou d’ouvrir le calendrier dans un logiciel de messagerie créer un nouveau document dans un traitement de texte, lancer une application dans un certain mode ou lancer une des ses sous-commandes. Une application ne doit pas encombrer le menu avec des fonctions avancées qui n’aurez pas besoin des utilisateurs standard ou des actions ponctuelles telles que l’inscription. N’utilisez pas de tâches pour des articles promotionnels tels que les mises à niveau ou des offres spéciales.
> 
> Il est fortement recommandé que la liste des tâches soit statique. Il reste le même quelle que soit l’État ou l’état de l’application. Bien qu’il soit possible de faire varier la liste dynamiquement, vous devez envisager que cela pourrait confondre l’utilisateur qui n’attend pas la partie de la liste de destination pour changer.

**Tâches d’Internet Explorer :**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

À la différence du menu du dock sous macOS, qui constitue un véritable menu, tâches utilisateur dans Windows fonctionnent comme les raccourcis d’application telle que lorsque l’utilisateur clique sur une tâche, un programme sera exécuté avec les arguments spécifiés.

Pour définir les tâches de l’utilisateur pour votre application, vous pouvez utiliser les API de[app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) :

```javascript
const {app} = require('electron') app.setUserTasks ([{programme : process.execPath, arguments : '--nouvelle fenêtre ', iconPath : process.execPath, iconIndex : 0, titre : "Nouvelle fenêtre", description : "Créer une nouvelle fenêtre"}])
```

Pour nettoyer votre liste de tâches, il suffit d’appeler `app.setUserTasks` avec un tableau vide :

```javascript
const {app} = require('electron') app.setUserTasks([])
```

Les tâches utilisateur montrera encore même après la fermeture de votre application, ainsi que le chemin d’icône et le programme spécifié pour une tâche devrait exister jusqu'à ce que votre application est désinstallée.

## Barres d’outils miniatures

Sous Windows, vous pouvez ajouter une barre d’outils miniature avec boutons spécifié dans une disposition de la barre des tâches d’une fenêtre d’application. Il offre aux utilisateurs un moyen d’accès à commande d’une fenêtre particulière sans restaurant ou en activant la fenêtre.

Depuis le site MSDN, il est illustré :

> Cette barre d’outils est tout simplement le contrôle commun de la barre d’outils standard familier. Il a un maximum de sept boutons. Chaque bouton ID, image, info-bulle et État sont définis dans une structure qui est ensuite passée à la barre des tâches. L’application peut afficher, activer, désactiver ou masquer les boutons de la barre d’outils miniature tel que requis par son état actuel.
> 
> Par exemple, Windows Media Player pourrait offrir de support standard de transport des contrôles tels que lecture, pause, muet et d’arrêt.

**Barre d’outils miniature de Windows Media Player :**

![lecteur](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Vous pouvez utiliser [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows-7) pour définir la barre d’outils miniature dans votre application :

```javascript
const {BrowserWindow} = require('electron') const chemin = require('path') laisser gagner = new BrowserWindow({
  width: 800,
  height: 600
}) win.setThumbarButtons ([{tooltip : « button1 », icône : path.join (__dirname, 'button1.png'), cliquez sur () {console.log ("button1 cliqué')}}, {tooltip : « button2 », icône : path.join (__dirname, 'button2.png'), drapeaux : [« enabled », « dismissonclick »], cliquez sur () {console.log ("button2 cliqué.")}
  }
])
```

Pour nettoyer les boutons de barre d’outils miniature, il suffit d’appeler `BrowserWindow.setThumbarButtons` avec un tableau vide :

```javascript
const {BrowserWindow} = require('electron') laisser gagner = nouveau BrowserWindow() win.setThumbarButtons([])
```

## L’unité lanceur raccourcis (Linux)

Dans l’unité, vous pouvez ajouter des entrées personnalisées à son lanceur via la modification du fichier`.desktop`, voir [Adding raccourcis vers un Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Raccourcis de lanceur de Audacious :**

![audacieux](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Barre de progression dans la barre des tâches (Windows, macOS, l’unité)

Sous Windows, un bouton de la barre des tâches peut servir à afficher une barre de progression. Cela permet une fenêtre fournir des informations de progression à l’utilisateur sans que l’utilisateur d’avoir à basculer vers la fenêtre elle-même.

Sur macOS, la barre de progression s’affichera dans le cadre de l’icône du dock.

L’unité DE possède également une fonction similaire qui permet d’indiquer la barre de progression dans le lanceur.

**Barre de progression dans le bouton de la barre des tâches :**

![Barre de progression barre](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Pour définir la barre de progression d’une fenêtre, vous pouvez utiliser l’API de[BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) :

```javascript
const {BrowserWindow} = require('electron') laisser gagner = nouveau BrowserWindow() win.setProgressBar(0.5)
```

## Icônes dans la barre des tâches (Windows)

Sous Windows un bouton de la barre des tâches permet une superposition de petite pour afficher l’état de la demande, comme cité de MSDN :

> Icônes servent une notification contextuelle de l’État et sont destinés à nier la nécessité d’une icône d’état de zone notification séparée de communiquer ces informations à l’utilisateur. Par exemple, le nouveau statut de messagerie dans Microsoft Outlook, actuellement affichés dans la zone de notification, peut maintenant être indiqué par une superposition sur le bouton de la barre des tâches. Encore une fois, vous devez décider au cours de votre cycle de développement quelle méthode est la meilleure pour votre application. Icônes de recouvrement sont destinés à fournir un statut important et de longue date ou notifications telles que l’état du réseau, un statut de messager ou le courrier. L’utilisateur ne devrait pas être présenté avec superpositions ou animations en constante évolution.

**Overlay sur le bouton de la barre des tâches :**

![Overlay sur le bouton de la barre des tâches](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Pour définir l’icône de la superposition d’une fenêtre, vous pouvez utiliser l’API de[BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows-7) :

```javascript
const {BrowserWindow} = require('electron') laisser gagner = new BrowserWindow() win.setOverlayIcon (« chemin/vers/overlay.png', 'Description pour superposition')
```

## Image flash (Windows)

Sous Windows, vous pouvez sélectionner le bouton de la barre des tâches pour obtenir l’attention de l’utilisateur. Ceci est similaire à rebondir l’icône du dock sur macOS. De la documentation de référence sur MSDN :

> En règle générale, une fenêtre est flashée pour informer l’utilisateur que la fenêtre nécessite une attention mais qu’il n’a pas actuellement le focus clavier.

Le bouton de barre des tâches BrowserWindow-Flash, vous pouvez utiliser le[BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API :

```javascript
const {BrowserWindow} = require('electron') laisser gagner = new BrowserWindow() win.once (« focus », () => win.flashFrame(false)) win.flashFrame(true)
```

N’oubliez pas d’appeler la méthode `flashFrame` avec `false` pour désactiver le flash. Dans l’exemple ci-dessus, elle est appelée lorsque la fenêtre arrive dans le foyer, mais vous pouvez utiliser un délai d’attente ou un autre événement de la pour désactiver.

## Fichier représenté de fenêtre (macOS)

Sur macOS, une fenêtre réglable son fichier représenté, donc l’icône du fichier peut montrer dans la barre de titre et lorsque les utilisateurs commande-clic ou Ctrl-clic sur le titre affiche un popup de chemin d’accès.

Vous pouvez également définir l’État édité d’une fenêtre pour que l’icône du fichier peut indiquer si le document de cette fenêtre a été modifié.

**Menu contextuel de fichier représenté :**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

Pour définir le fichier représenté de fenêtre, vous pouvez utiliser le[BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-os-x) et le[BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-os-x) API :

```javascript
const {BrowserWindow} = require('electron') laisser gagner = nouveau BrowserWindow() win.setRepresentedFilename('/etc/passwd') win.setDocumentEdited(true)
```

## Faire glisser les fichiers de la fenêtre

Pour certains types d’applications qui manipulent des fichiers, il est important d’être en mesure de faire glisser des fichiers des électrons à d’autres applications. Pour implémenter cette fonctionnalité dans votre application, vous devez appeler `webContents.startDrag (point)` API sur l’événement `ondragstart`.

Dans la page web :

```html
<a href="#" id="drag">item</a><script type="text/javascript" charset="utf-8"> document.getElementById('drag').ondragstart = (event) = > {Event.preventDefault () ipcRenderer.send ('ondragstart', '/ chemin/de/point')}</script>
```

Dans le processus principal :

```javascript
const {ipcMain} = require('electron') ipcMain.on ('ondragstart', (événement, filePath) => {event.sender.startDrag ({fichier : filePath, icône : ' / path/to/icon.png'})})
```