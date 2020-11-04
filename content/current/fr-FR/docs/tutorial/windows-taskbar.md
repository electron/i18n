# Barre des tâches Windows

## Vue d'ensemble

Electron possède des APIs pour configurer l'icône de l'application dans la barre des tâches de Windows. Cette d’API prend en charge les fonctionnalités purement Windows comme [création d’une`Liste d'accès rapides `](#jumplist), [miniature personnalisées et barres d'outils](#thumbnail-toolbars), [overlays sur icones](#icon-overlays-in-taskbar), et l’effet dit [« Flash Frame »](#flash-frame), et des fonctionnalités multiplateformes comme [documents récents](./recent-documents.md) et ['application en progression](./progress-bar.md).

## JumpList 

Windows permet aux applications de définir un menu contextuel personnalisé s'affichant lorsque les utilisateurs effectuent un clic-droit sur l’icône de l’application dans la barre des tâches. Ce menu contextuel est appelé `JumpList`. Vous spécifiez des actions personnalisées dans la catégorie `Tasks` de JumpList, comme indiqué dans [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Les applications définissent des tâches basées sur les caractéristiques du programme et les fonctionnalités clés que l'utilisateur est censé utiliser. Les tâches doivent être indépendantes du contexte, c'est à dire qu'elles n'ont pas besoin de s'exécuter pour fonctionner. Il devrait également il y avoir les actions statistiquement plus courantes qu'un utilisateur normal utiliserait dans une application, comme rédiger un message électronique ou ouvrir le calendrier dans un logiciel de messagerie, ou créer un nouveau document dans un traitement de texte, lancer une application dans un certain mode, ou lancer une des ses sous-commandes. Une application ne doit pas encombrer le menu avec des fonctions avancées que les utilisateurs standards n'auraient pas besoin ou des actions ponctuelles telles que l'inscription. Ne pas utiliser les tâches pour les articles promotionnels tels que les mises à niveau ou des offres spéciales.
> 
> Il est fortement recommandé que la liste des tâches soit statique. Il devrait rester le même quelque soit l'état ou le statut de l'application. Bien qu'il soit possible de faire varier la liste dynamiquement, vous devez envisager que cela puisse confondre l'utilisateur qui n'attend pas que cette portion de la liste puisse changer.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> REMARQUE : La capture d'écran ci-dessus est un exemple de tâches générales de Internet Explorer

Contrairement au menu du dock dans macOS, qui est un vrai menu, les tâches utilisateur dans Windows fonctionnent comme des raccourcis d'application. Par exemple, lorsqu'un utilisateur clique sur une tâche, le programme sera exécuté avec les arguments spécifiés.

Pour définir les tâches utilisateur de votre application, vous pouvez utiliser l'API [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) .

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

Comme cité dans [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> Cette barre d’outils est simplement le composant standard pour la barre d’outils. Il a un maximum de sept boutons. Chaque identifiant, image, info-bulle et état du bouton sont spécifiés dans une structure, qui est ensuite passée à la barre des tâches. L'application peut afficher, activer, désactiver ou masquer des boutons de la barre d'outils miniature comme requis par son état actuel.
> 
> Par exemple, le lecteur Windows Media Player peut offrir un support standard de contrôles tels que lecture, pause, muet et arrêt.

![lecteur](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> REMARQUE : La capture d'écran ci-dessus est un exemple de barre d'outils miniatures de Windows Media Player

Pour définir la barre d'outils miniature de votre application, vous devez utiliser [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Exemples

##### Définir la barre d'outils miniatures

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'bouton1',
    icon: path.join(__dirname, 'bouton1.png'),
    click () { console.log('bouton1 cliqué') }
  }, {
    tooltip: 'bouton2',
    icon: path.join(__dirname, 'bouton2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('bouton2 cliqué.') }
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

Comme cité dans [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Les superpositions d'icônes servent en tant que notification contextuelle du statut, et sont destinées à dénier la nécessité d'une zone de notification séparée pour communiquer cette information à l'utilisateur. Par exemple, le nouveau statut de messagerie de Microsoft Outlook, actuellement affiché dans la zone de notification, est maintenant indiqué par une superposition dans sur le bouton de la barre des tâches. Encore une fois, vous devez décider au cours de votre cycle de développement quelle méthode est la meilleure pour votre application. Les icônes de recouvrement sont destinées à fournir une information importante et de long terme, telle que l'état du réseau, un statut de messagerie ou de nouveaux messages. L'utilisateur ne devrait pas se retrouver face à des superpositions ou des animations en constante évolution.

![Overlay sur le bouton de la barre des tâches](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> REMARQUE : La capture d'écran ci-dessus est un exemple d'overlay sur un bouton de la barre des tâches

Pour définir l'icône d'overlay d'une fenêtre, vous pouvez utiliser l'API [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) .

#### Exemple

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon("path/to/overlay.png", "Description de l'overlay")
```

### Fenêtre clignotante

Sur Windows vous pouvez mettre en valeur un bouton de la barre des tâches pour attirer l'attention de l'utilisateur. C'est similaire à l'effet de rebond des icônes dans le dock macOS.

Comme cité dans [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> En règle générale, une fenêtre clignote pour informer l'utilisateur que la fenêtre nécessite de l'attention alors qu'elle n'a pas le focus clavier.

Pour faire clignoter un bouton de la barre des tâches de BrowserWindow, vous pouvez utiliser l'API [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) .

#### Exemple

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE : N'oubliez pas d'appeler `win.flashFrame(false)` pour désactiver le flash. Dans l'exemple ci-dessus, l'appel s'effectue quand la fenêtre est focalisée, mais vous pouvez utiliser une temporisation ou un autre événement pour désactiver.
