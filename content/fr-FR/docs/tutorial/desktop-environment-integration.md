# Intégration de l’environnement de bureau

Différents systèmes d’exploitation fournissent des fonctionnalités différentes pour intégrer des applications bureautiques dans leurs environnements de bureau. Par exemple, sous Windows, les applications peuvent mettre des raccourcis dans la JumpList de barre des tâches, et sur Mac, les applications peuvent mettre un menu personnalisé dans le menu du dock.

Ce guide explique comment intégrer votre application dans les environnements de bureau avec les APIs d'Electron.

## Notifications

Voir les [Notifications](notifications.md)

## Documents récents (Windows & macOS)

Windows et macOS permettent d’accéder facilement à une liste des documents récemment ouverts par l’application via JumpList ou dock menu, respectivement.

**JumpList :**

![JumpList fichiers récents](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menu application du dock :**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

Pour ajouter un fichier aux documents récents, vous pouvez utiliser l'API [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-os-x-windows) :

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Et l'API [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-os-x-windows) vous permet de vider la liste des documents récents :

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### Remarques Windows

Pour pouvoir utiliser cette fonctionnalité sur Windows, votre application doit être enregistré en tant que gestionnaire/responsable du type de fichier du document, sinon le fichier n’apparaîtra pas dans la JumpList même après l'avoir ajouté. Vous trouverez tout l'enregistrement de votre application dans [Enregistrement de l'application](http://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx).

Lorsqu’un utilisateur clique sur un fichier à partir de la JumpList, cela démarre une nouvelle instance de votre application avec le chemin d’accès du fichier ajouté comme un argument de ligne de commande.

### Remarques macOS

Lorsqu’un fichier est demandé dans le menu documents récents, l’événement `open-file` du module `app` sera émit.

## Menu personnalisé du Dock (macOS)

macOS permet aux développeurs de spécifier un menu personnalisé pour le dock, qui contient généralement des raccourcis pour les fonctionnalités courantes de votre application :

**Menu du Dock de Terminal.app :**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

Pour définir votre menu du dock personnalisé, vous pouvez utiliser l'API `app.dock.setMenu`, qui n’est disponible que sur macOS :

```javascript
const {app, Menu} = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {label: 'New Window', click () { console.log('New Window') }},
  {label: 'New Window with Settings',
    submenu: [
      {label: 'Basic'},
      {label: 'Pro'}
    ]
  },
  {label: 'New Command...'}
])
app.dock.setMenu(dockMenu)
```

## Tâches utilisateur (Windows)

Sur Windows, vous pouvez spécifier des actions personnalisées dans la catégorie `tâches` de la JumpList, cité depuis le site MSDN :

> Les applications définissent des tâches basées sur les caractéristiques du programme et les fonctionnalités clés que l'utilisateur est censé utiliser. Les tâches doivent être indépendantes du contexte, c'est à dire qu'elles n'ont pas besoin de s'exécuter pour fonctionner. Il devrait également il y avoir les actions statistiquement plus courantes qu'un utilisateur normal utiliserait dans une application, comme rédiger un message électronique ou ouvrir le calendrier dans un logiciel de messagerie, ou créer un nouveau document dans un traitement de texte, lancer une application dans un certain mode, ou lancer une des ses sous-commandes. Une application ne doit pas encombrer le menu avec des fonctions avancées que les utilisateurs standards n'auraient pas besoin ou des actions ponctuelles telles que l'inscription. Ne pas utiliser les tâches pour les articles promotionnels tels que les mises à niveau ou des offres spéciales.
> 
> Il est fortement recommandé que la liste des tâches soit statique. Il devrait rester le même quelque soit l'état ou le statut de l'application. Bien qu'il soit possible de faire varier la liste dynamiquement, vous devez envisager que cela puisse confondre l'utilisateur qui n'attend pas que cette portion de la liste puisse changer.

**Tâches d’Internet Explorer :**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

A la différence du menu dock de macOS qui est un véritable menu, les tâches utilisateur dans Windows fonctionnent comme les raccourcis d'application tels que lorsque l'utilisateur clique sur une tâche, un programme sera exécuté avec les arguments spécifiés.

Pour définir les tâches utilisateur de votre application, vous pouvez utiliser l'API [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) :

```javascript
const {app} = require('electron')
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
const {app} = require('electron')
app.setUserTasks([])
```

Les tâches utilisateur seront visibles même après la fermeture de votre application, donc l'icône et le chemin d'accès du programme spécifié pour une tâche doivent exister jusqu'à ce que votre application soit désinstallée.

## Barres d’outils miniatures

On Windows you can add a thumbnail toolbar with specified buttons in a taskbar layout of an application window. It provides users a way to access to a particular window's command without restoring or activating the window.

From MSDN, it's illustrated:

> This toolbar is simply the familiar standard toolbar common control. It has a maximum of seven buttons. Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

**Thumbnail toolbar of Windows Media Player:**

![lecteur](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows-7) to set thumbnail toolbar in your application:

```javascript
const {BrowserWindow} = require('electron')
const path = require('path')

let win = new BrowserWindow({
  width: 800,
  height: 600
})

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  },
  {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

To clean thumbnail toolbar buttons, just call `BrowserWindow.setThumbarButtons` with an empty array:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Lanceur de raccourcis Unity (Linux)

In Unity, you can add custom entries to its launcher via modifying the `.desktop` file, see [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Launcher shortcuts of Audacious:**

![audacieux](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Barre de progression dans la barre des tâches (Windows, macOS, Unity)

On Windows a taskbar button can be used to display a progress bar. This enables a window to provide progress information to the user without the user having to switch to the window itself.

On macOS the progress bar will be displayed as a part of the dock icon.

The Unity DE also has a similar feature that allows you to specify the progress bar in the launcher.

**Barre de progression dans le bouton de la barre des tâches :**

![Barre de progression personnalisée](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

To set the progress bar for a Window, you can use the [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Icônes superposée dans la barre des tâches (Windows)

On Windows a taskbar button can use a small overlay to display application status, as quoted from MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay sur le bouton de la barre des tâches](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows-7) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame (Windows)

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

## Represented File of Window (macOS)

On macOS a window can set its represented file, so the file's icon can show in the title bar and when users Command-Click or Control-Click on the title a path popup will show.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

**Represented file popup menu:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-os-x) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-os-x) APIs:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Dragging files out of the window

For certain kinds of apps that manipulate on files, it is important to be able to drag files from Electron to other apps. To implement this feature in your app, you need to call `webContents.startDrag(item)` API on `ondragstart` event.

Dans une page web :

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Dans le processus principal :

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```