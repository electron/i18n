# Barre des tâches Windows

## Vue d'ensemble

Electron possède des APIs pour configurer l'icône de l'application dans la barre des tâches de Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpList 

Windows permet aux applications de définir un menu contextuel personnalisé s'affichant lorsque les utilisateurs effectuent un clic-droit sur l’icône de l’application dans la barre des tâches. Ce menu contextuel est appelé `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN][msdn-jumplist]:

> Les applications définissent des tâches basées sur les caractéristiques du programme et les fonctionnalités clés que l'utilisateur est censé utiliser. Les tâches doivent être indépendantes du contexte, c'est à dire qu'elles n'ont pas besoin de s'exécuter pour fonctionner. Il devrait également il y avoir les actions statistiquement plus courantes qu'un utilisateur normal utiliserait dans une application, comme rédiger un message électronique ou ouvrir le calendrier dans un logiciel de messagerie, ou créer un nouveau document dans un traitement de texte, lancer une application dans un certain mode, ou lancer une des ses sous-commandes. Une application ne doit pas encombrer le menu avec des fonctions avancées que les utilisateurs standards n'auraient pas besoin ou des actions ponctuelles telles que l'inscription. Ne pas utiliser les tâches pour les articles promotionnels tels que les mises à niveau ou des offres spéciales.
> 
> Il est fortement recommandé que la liste des tâches soit statique. Il devrait rester le même quelque soit l'état ou le statut de l'application. Bien qu'il soit possible de faire varier la liste dynamiquement, vous devez envisager que cela puisse confondre l'utilisateur qui n'attend pas que cette portion de la liste puisse changer.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> REMARQUE : La capture d'écran ci-dessus est un exemple de tâches générales de Internet Explorer

Contrairement au menu du dock dans macOS, qui est un vrai menu, les tâches utilisateur dans Windows fonctionnent comme des raccourcis d'application. Par exemple, lorsqu'un utilisateur clique sur une tâche, le programme sera exécuté avec les arguments spécifiés.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API.

#### Exemples

##### Définir les tâches utilisateur

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

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

##### Effacer la liste des tâches

Pour effacer votre liste de tâches, vous devez appeler `app.setUserTasks` avec un tableau vide dans le fichier `main.js`.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> Les tâches utilisateur seront visibles même après la fermeture de votre application, donc l'icône et le chemin d'accès du programme spécifié pour une tâche doivent exister jusqu'à ce que votre application soit désinstallée.

### Barres d’outils miniatures

Sur Windows, vous pouvez ajouter à la barre des tâches d'une fenêtre d'une 'application une barre d'outils miniatures avec des boutons spécifiés. Cela donne aux utilisateurs un moyen d'accéder aux commandes particulières d'une fenêtre sans avoir à restaurer ou réactiver la fenêtre.

As quoted from [MSDN][msdn-thumbnail]:

> Cette barre d’outils est simplement le composant standard pour la barre d’outils. Il a un maximum de sept boutons. Chaque identifiant, image, info-bulle et état du bouton sont spécifiés dans une structure, qui est ensuite passée à la barre des tâches. L'application peut afficher, activer, désactiver ou masquer des boutons de la barre d'outils miniature comme requis par son état actuel.
> 
> Par exemple, le lecteur Windows Media Player peut offrir un support standard de contrôles tels que lecture, pause, muet et arrêt.

![lecteur](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> REMARQUE : La capture d'écran ci-dessus est un exemple de barre d'outils miniatures de Windows Media Player

Pour définir la barre d'outils des miniatures dans votre application, vous devez utiliser [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### Exemples

##### Définir la barre d'outils miniatures

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

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

##### Vider la barre d'outils miniatures

Pour effacer les boutons de la barre d'outils miniatures, vous devez appeler `BrowserWindow.setThumbarButtons` avec un tableau vide dans le fichier `main.js`.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Superposition d'icône dans la barre des tâches

Sous Windows, un bouton de la barre des tâches peut utiliser un petit overlay pour afficher l'état de l'application.

As quoted from [MSDN][msdn-icon-overlay]:

> Les superpositions d'icônes servent en tant que notification contextuelle du statut, et sont destinées à dénier la nécessité d'une zone de notification séparée pour communiquer cette information à l'utilisateur. Par exemple, le nouveau statut de messagerie de Microsoft Outlook, actuellement affiché dans la zone de notification, est maintenant indiqué par une superposition dans sur le bouton de la barre des tâches. Encore une fois, vous devez décider au cours de votre cycle de développement quelle méthode est la meilleure pour votre application. Les icônes de recouvrement sont destinées à fournir une information importante et de long terme, telle que l'état du réseau, un statut de messagerie ou de nouveaux messages. L'utilisateur ne devrait pas se retrouver face à des superpositions ou des animations en constante évolution.

![Overlay sur le bouton de la barre des tâches](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> REMARQUE : La capture d'écran ci-dessus est un exemple d'overlay sur un bouton de la barre des tâches

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### Exemple

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon("path/to/overlay.png", "Description de l'overlay")
```

### Fenêtre clignotante

Sur Windows vous pouvez mettre en valeur un bouton de la barre des tâches pour attirer l'attention de l'utilisateur. C'est similaire à l'effet de rebond des icônes dans le dock macOS.

As quoted from [MSDN][msdn-flash-frame]:

> En règle générale, une fenêtre clignote pour informer l'utilisateur que la fenêtre nécessite de l'attention alors qu'elle n'a pas le focus clavier.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame][flashframe] API.

#### Exemple

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE : N'oubliez pas d'appeler `win.flashFrame(false)` pour désactiver le flash. Dans l'exemple ci-dessus, l'appel s'effectue quand la fenêtre est focalisée, mais vous pouvez utiliser une temporisation ou un autre événement pour désactiver.

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
