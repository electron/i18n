# Fichier représenté pour BrowserWindows sur macOS

Sous macOS, une fenêtre peut définir son fichier représenté, de manière à ce que l'icône de fichier s'affiche dans la barre de titre et que quand les utilisateurs Commande-clic ou Control-clic sur le titre un popup de chemin d'accès s'affiche.

Vous pouvez également définir l'état d'édition d'une fenêtre pour que l'icône de fichier indique si le document de cette fenêtre a été modifié.

__Menu contextuel de fichier représenté :__

![Fichier représenté][1]

Pour définir le fichier représenté par la fenêtre, vous pouvez utiliser les API [BrowserWindow.setRepresentedFilename][setrepresentedfilename] et [BrowserWindow.setDocumentEdited][setdocumentedited] :

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
