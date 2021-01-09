# File Rappresentato per le FinestreBrowser macOS

## Overview

On macOS, you can set a represented file for any window in your application. The represented file's icon will be shown in the title bar, and when users `Command-Click` or `Control-Click`, a popup with a path to the file will be shown.

![File Rappresentato](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

> NOTE: The screenshot above is an example where this feature is used to indicate the currently opened file in the Atom text editor.

You can also set the edited state for a window so that the file icon can indicate whether the document in this window has been modified.

Per impostare il file rappresentato della finestra, puoi usare le API [FinestraBrowser.impostanomeFileRappresentato](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) e [FinestraBrowser.impostaDocumentoPersonalizzato](../api/browser-window.md#winsetdocumenteditededited-macos).

## Esempio

A partire da un'applicazione funzionante dalla [Guida rapida](quick-start.md), aggiungi le seguenti righe al file `main.js`:

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename('/etc/passwd')
  win.setDocumentEdited(true)
})
```

After launching the Electron application, click on the title with `Command` or `Control` key pressed. You should see a popup with the file you just defined:

![Represented file](../images/represented-file.png)
