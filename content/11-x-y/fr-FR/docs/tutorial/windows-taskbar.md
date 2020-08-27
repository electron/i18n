# Barre des tâches Windows

Electron possède des APIs pour configurer l'icône de l'application dans la barre des tâches de Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpList 

Windows permet aux applications de définir un menu contextuel personnalisé qui s’affiche lorsque les utilisateurs effectuent un clic-droit sur l’icône de l’application dans la barre des tâches. Ce menu contextuel est appelé `JumpList`. Vous spécifiez les actions personnalisées dans la catégorie `Tasks` JumpList, comme cité sur le site MSDN :

> Les applications définissent des tâches basées sur les caractéristiques du programme et les fonctionnalités clés que l'utilisateur est censé utiliser. Les tâches doivent être indépendantes du contexte, c'est à dire qu'elles n'ont pas besoin de s'exécuter pour fonctionner. Il devrait également il y avoir les actions statistiquement plus courantes qu'un utilisateur normal utiliserait dans une application, comme rédiger un message électronique ou ouvrir le calendrier dans un logiciel de messagerie, ou créer un nouveau document dans un traitement de texte, lancer une application dans un certain mode, ou lancer une des ses sous-commandes. Une application ne doit pas encombrer le menu avec des fonctions avancées que les utilisateurs standards n'auraient pas besoin ou des actions ponctuelles telles que l'inscription. Ne pas utiliser les tâches pour les articles promotionnels tels que les mises à niveau ou des offres spéciales.
> 
> Il est fortement recommandé que la liste des tâches soit statique. Il devrait rester le même quelque soit l'état ou le statut de l'application. Bien qu'il soit possible de faire varier la liste dynamiquement, vous devez envisager que cela puisse confondre l'utilisateur qui n'attend pas que cette portion de la liste puisse changer.

__Tâches d'Internet Explorer :__

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

A la différence du menu dock de macOS qui est un véritable menu, les tâches utilisateur dans Windows fonctionnent comme les raccourcis d'application tels que lorsque l'utilisateur clique sur une tâche, un programme sera exécuté avec les arguments spécifiés.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

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

> Cette barre d’outils est simplement le composant standard pour la barre d’outils. Il a un maximum de sept boutons. Chaque identifiant, image, info-bulle et état du bouton sont spécifiés dans une structure, qui est ensuite passée à la barre des tâches. L'application peut afficher, activer, désactiver ou masquer des boutons de la barre d'outils miniature comme requis par son état actuel.
> 
> Par exemple, le lecteur Windows Media Player peut offrir un support standard de contrôles tels que lecture, pause, muet et arrêt.

__Barre d'outils miniature de Windows Media Player:__

![lecteur](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

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


## Superposition d'icône dans la barre des tâches

Sous Windows, un bouton de la barre des tâches peut permettre une petite superposition pour afficher l'état de l'application, comme cité dans MSDN :

> Les superpositions d'icônes servent en tant que notification contextuelle du statut, et sont destinées à dénier la nécessité d'une zone de notification séparée pour communiquer cette information à l'utilisateur. Par exemple, le nouveau statut de messagerie de Microsoft Outlook, actuellement affiché dans la zone de notification, est maintenant indiqué par une superposition dans sur le bouton de la barre des tâches. Encore une fois, vous devez décider au cours de votre cycle de développement quelle méthode est la meilleure pour votre application. Les icônes de recouvrement sont destinées à fournir une information importante et de long terme, telle que l'état du réseau, un statut de messagerie ou de nouveaux messages. L'utilisateur ne devrait pas se retrouver face à des superpositions ou des animations en constante évolution.

__Overlay sur le bouton de la barre des tâches:__

![Overlay sur le bouton de la barre des tâches](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```


## Fenêtre clignotante

Sur Windows vous pouvez mettre en avant le bouton dans la barre des tâches pour attirer l'attention de l'utilisateur. C'est similaire à l'effet de rebond des icônes dans le dock macOS. Depuis la documentation de référence sur MSDN :

> En règle générale, une fenêtre clignote pour informer l'utilisateur que la fenêtre nécessite de l'attention alors qu'elle n'a pas le focus clavier.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

N'oubliez pas d'appeler la méthode `flashFrame` avec la valeur `false` pour désactiver le flash. Dans l'exemple ci-dessus, elle est appelée quand la fenêtre est focalisée, mais vous pouvez utiliser un délai ou un autre événement pour la désactiver.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
