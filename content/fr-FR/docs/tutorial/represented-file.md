# Fichier représenté pour BrowserWindows sur macOS

## Vue d'ensemble

On macOS, you can set a represented file for any window in your application. The represented file's icon will be shown in the title bar, and when users `Command-Click` or `Control-Click`, a popup with a path to the file will be shown.

![Fichier représenté][1]

> NOTE : La capture d'écran ci-dessus est un exemple où cette fonctionnalité est utilisée pour indiquer le fichier actuellement ouvert dans l'éditeur de texte Atom.

You can also set the edited state for a window so that the file icon can indicate whether the document in this window has been modified.

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs.

## Exemple

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')
const os = require('os');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
}

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename(os.homedir())
  win.setDocumentEdited(true)
})

app.on('window-all-closed', () => {
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

Après avoir lancé l'application Electron, cliquez sur le titre en pressant sur la touche `Command` ou `Control`. Vous devriez voir une popup avec le fichier représenté en haut. En ce qui concerne ce guide, il s'agit du répertoire home de l'utilisateur actuel:

![Fichier représenté](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
