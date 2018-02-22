# Windows Taskbar

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar-windows), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList 

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> Les applications définissent des tâches basées sur les caractéristiques du programme et les fonctionnalités clés que l'utilisateur est censé utiliser. Les tâches doivent être indépendantes du contexte, c'est à dire qu'elles n'ont pas besoin de s'exécuter pour fonctionner. Il devrait également il y avoir les actions statistiquement plus courantes qu'un utilisateur normal utiliserait dans une application, comme rédiger un message électronique ou ouvrir le calendrier dans un logiciel de messagerie, ou créer un nouveau document dans un traitement de texte, lancer une application dans un certain mode, ou lancer une des ses sous-commandes. Une application ne doit pas encombrer le menu avec des fonctions avancées que les utilisateurs standards n'auraient pas besoin ou des actions ponctuelles telles que l'inscription. Ne pas utiliser les tâches pour les articles promotionnels tels que les mises à niveau ou des offres spéciales.
> 
> Il est fortement recommandé que la liste des tâches soit statique. Il devrait rester le même quelque soit l'état ou le statut de l'application. Bien qu'il soit possible de faire varier la liste dynamiquement, vous devez envisager que cela puisse confondre l'utilisateur qui n'attend pas que cette portion de la liste puisse changer.

**Tâches d'Internet Explorer :**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

A la différence du menu dock de macOS qui est un véritable menu, les tâches utilisateur dans Windows fonctionnent comme les raccourcis d'application tels que lorsque l'utilisateur clique sur une tâche, un programme sera exécuté avec les arguments spécifiés.

Pour définir les tâches utilisateur de votre application, vous pouvez utiliser l'API [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) :

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'Nouvelle fenêtre',
    description: 'Créer une nouvelle fenêtre'
  }
])
```

Pour nettoyer votre liste de tâches, il suffit d'appeler `app.setUserTasks` avec un tableau vide :

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Les tâches utilisateur seront visibles même après la fermeture de votre application, donc l'icône et le chemin d'accès du programme spécifié pour une tâche doivent exister jusqu'à ce que votre application soit désinstallée.

## Barres d’outils miniatures

Sur Windows, vous pouvez ajouter une barre d'outils miniature avec des boutons spécifiés dans une disposition de la barre des tâches d'une fenêtre d'application. Il offre aux utilisateurs un moyen d'accéder aux commandes particulières d'une fenêtre sans avoir à restaurer ou réactiver la fenêtre.

Il est illustré par le site MSDN :

> Cette barre d'outils est simplement un outil de la famille des barres d'outils standards. Il a un maximum de sept boutons. Chaque identifiant, image, info-bulle et état du bouton sont spécifiés dans une structure, qui est ensuite passée à la barre des tâches. L'application peut afficher, activer, désactiver ou masquer des boutons de la barre d'outils miniature comme requis par son état actuel.
> 
> Par exemple, le lecteur Windows Media Player peut offrir un support standard de contrôles tels que lecture, pause, muet et arrêt.

**Barre d'outils miniature de Windows Media Player:**

![lecteur](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Vous pouvez utiliser [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) pour définir la barre d'outil miniature dans votre application :

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Pour vider les boutons de la barre des tâches miniature, il suffit d'appeler `BrowserWindow.setThumbarButtons` avec un tableau vide :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

Sous Windows, un bouton de la barre des tâches peut permettre une petite superposition pour afficher l'état de l'application, comme cité dans MSDN :

> Les superpositions d'icônes servent en tant que notification contextuelle du statut, et sont destinées à dénier la nécessité d'une zone de notification séparée pour communiquer cette information à l'utilisateur. Par exemple, le nouveau statut de messagerie de Microsoft Outlook, actuellement affiché dans la zone de notification, est maintenant indiqué par une superposition dans sur le bouton de la barre des tâches. Encore une fois, vous devez décider au cours de votre cycle de développement quelle méthode est la meilleure pour votre application. Les icônes de recouvrement sont destinées à fournir une information importante et de long terme, telle que l'état du réseau, un statut de messagerie ou de nouveaux messages. L'utilisateur ne devrait pas se retrouver face à des superpositions ou des animations en constante évolution.

**Overlay sur le bouton de la barre des tâches:**

![Overlay sur le bouton de la barre des tâches](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Pour définir l'icône de superposition d'une fenêtre, vous pouvez utiliser l'API [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) :

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> En règle générale, une fenêtre clignote pour informer l'utilisateur que la fenêtre nécessite de l'attention alors qu'elle n'a pas le focus clavier.

Pour accentuer le bouton de la barre des tâches de BrowserWindow, vous pouvez utiliser l'API [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) :

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

N'oubliez pas d'appeler la méthode `flashFrame` avec la valeur `false` pour désactiver le flash. Dans l'exemple ci-dessus, elle est appelée quand la fenêtre est focalisée, mais vous pouvez utiliser un délai ou un autre événement pour la désactiver.