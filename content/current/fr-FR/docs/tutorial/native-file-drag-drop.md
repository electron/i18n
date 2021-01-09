# Fichier natif Drag & Drop

## Vue d'ensemble

Certains types d'applications manipulant des fichiers peuvent prendre en charge la fonction de glisser-déplacer native du système d'exploitation. Le déplacement de fichiers dans le contenu Web est courant et est supporté par de nombreux sites Web. Electron prend également en charge le déplacement des fichiers et du contenu du contenu Web vers le monde du système d'exploitation.

Pour implémenter cette fonctionnalité dans votre application, vous devez appeler l'API [`webContents.startDrag(item)`](../api/web-contents.md#contentsstartdragitem) dans la réponse à l'événement `ondragstart`.

## Exemple

Commencer avec une application fonctionnelle du [Guide de démarrage rapide](quick-start.md), ajouter les lignes suivantes au fichier `index.html`:

```html
<a href="#" id="drag">Glissez-moi</a>
<script src="renderer.js"></script>
```

ajoutez ensuite les lignes suivantes au fichier `render.js`:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

Le code ci-dessus indique au processus Renderer de gérer l'événement `ondragstart` et de transférer les informations vers le processus Main.

Dans le processus principal (fichier `main.js` ), étendrel'événement reçu en lui ajoutant le chemin du fichier en train d'être glissé et une icône :

```javascript fiddle='docs/fiddles/features/drag-and-drop'
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Après avoir lancé l'application Electron, essayez de glisser-déposer l'élément depuis la BroswerWindow jusqu'à votre bureau. Dans ce guide, l'élément est un fichier Markdown situé à la racine du projet :

![Glisser-déposer](../images/drag-and-drop.gif)
