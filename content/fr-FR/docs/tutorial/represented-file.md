# Fichier représenté pour BrowserWindows sur macOS

## Vue d'ensemble

Sur macOS, vous pouvez définir un fichier représenté pour n’importe quelle fenêtre de votre application. L’icône du fichier représenté sera affichée dans la barre de titre, et lorsque les utilisateurs `Command-Click` ou `Control-Click`, un popup avec un chemin vers le fichier sera affiché.

![Fichier représenté][1]

> REMARQUE : La capture d’écran ci-dessus est un exemple où cette fonctionnalité est utilisée pour indiquer le fichier actuellement ouvert dans l’éditeur de texte Atom.

Vous pouvez également définir l’état modifié d’une fenêtre afin que l’icône du fichier puisse indiquer si le document de cette fenêtre a été modifié.

Pour définir le fichier de fenêtre représenté, vous pouvez utiliser le [BrowserWindow.setRepresentedFilename][setrepresentedfilename] et [BrowserWindow.setDocumentEdited][setdocumentedited] API.

## Exemple

Commencer avec une application fonctionnelle du [Guide de démarrage rapide](quick-start.md), ajoutez les lignes suivantes au fichier `main.js`:

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require ('electron')

app.whenReady().then()=> {
  const win = new BrowserWindow()

  win.setRepresentedFilename ('/etc/passwd')
  win.setDocumentEdited(true)
})
```

Après le lancement de l’application Electron, cliquez sur le titre `Command` ou `Control` clé pressée. Vous devriez voir un popup avec le fichier que vous venez de définir:

![Fichier représenté](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
