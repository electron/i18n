# File Rappresentato per le FinestreBrowser macOS

Su macOS una finestra può impostare il suo file rappresentato, così l'icona del file può mostrare nella barra del titolo e quando gli utenti Cmd-Cliccano o Ctrl-Cliccano sul titolo, un popup del percorso sarà mostrato.

Puoi anche impostare lo stato personalizzato di una finestra cosicchè l'icona del file possa indicare se il documento in questa finestra è stato modificato.

__Menu popup file rappresentato:__

![File Rappresentato](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Per impostare il file rappresentato della finestra, puoi usare le API [FinestraBrowser.impostanomeFileRappresentato](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) e [FinestraBrowser.impostaDocumentoPersonalizzato](../api/browser-window.md#winsetdocumenteditededited-macos):

```javascript
const { BrowserWindow } = richiede('electron')

const win = nuova FinestraBrowser()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
