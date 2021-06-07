# Documents récents (Windows & macOS)

## Vue d'ensemble

Windows et macOS permettent d’accéder facilement à la liste des documents récemment ouverts par l'application respectivement via JumpList ou dock menu.

__JumpList :__

![JumpList fichiers récents][1]

__Menu application du dock :__

![Dock de macOS][2]

## Exemple

### Gestiçon des documents récents

```javascript fiddle='docs/fiddles/features/recent-documents'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'Lorem Ipsum', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.clearRecentDocuments()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

#### Ajout d'un document récent

Utilisez l'API [app.addRecentDocument][addrecentdocument] pour ajouter un fichier aux documents récents .

Après avoir lancé l'application Electron, faites un clic droit sur l'icône de l'application. Dans ce guide, l'élément est un fichier Markdown situé à la racine du projet. Vous devriez voir `recently-used.md` ajouté à la liste des fichiers récents :

![Document récent](../images/recent-documents.png)

#### Effacement de la liste des documents récents

Pour effacer la liste des documents récents, utilisez l'API [app.clearRecentDocuments][clearrecentdocuments]. Dans ce guide, la liste des documents est effacée lorsque toutes les fenêtres ont été fermées.

## Informations complémentaires

### Remarques Windows

Pour utiliser cette fonctionnalité sur Windows, votre application doit être enregistrée en tant que gestionnaire/responsable du type de fichier du document, sinon le fichier n’apparaîtra pas dans la JumpList même après l'avoir ajouté. Vous trouverez tout l'enregistrement de votre application dans [Enregistrement de l'application][app-registration].

Lorsqu’un utilisateur clique sur un fichier à partir de la JumpList, cela démarre une nouvelle instance de votre application avec le chemin d’accès du fichier ajouté comme un argument de ligne de commande.

### Remarques macOS

#### Ajouter la liste des Documents récents au menu de l'application

Vous pouvez ajouter des éléments de menu pour accéder et supprimer les documents récents en ajoutant le code suivant à votre template de menu :

```json
{
  "submenu":[
    {
      "label":"Ouvrir récent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Effacer récent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

Assurez-vous que le menu de l'application soit ajouté après l'événement [`'ready'`](../api/app.md#event-ready) et pas avant, ou l'élément de menu sera désactivé :

```javascript
const { app, Menu } = require('electron')

const template = [
  // Modèle de Menu 
]
const menu = Menu.buildFromTemplate(template)

app.whenReady().then(() => {
  Menu.setApplicationMenu(menu)
})
```

![élément de menu Documents récents macOS][6]

Lorsqu’un fichier est demandé dans le menu documents récents, l’événement `open-file` du module `app` sera émit.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
