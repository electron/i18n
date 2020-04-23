# Fichier natif Drag & Drop

Certains types d'applications manipulant des fichiers peuvent prendre en charge la fonction de glisser-déplacer native du système d'exploitation. Le déplacement de fichiers dans le contenu Web est courant et est supporté par de nombreux sites Web. Electron prend également en charge le déplacement des fichiers et du contenu du contenu Web vers le monde du système d'exploitation.

Pour implémenter cette fonctionnalité dans votre application, vous devez appeler l'API `webContents.startDrag(item)` dans la réponse de l'événement `ondragstart`.

Dans votre processus de rendu, gérez l'événement `ondragstart` et transférez les informations vers votre processus principal.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Ensuite, dans le processus principal, augmentez l'événement avec un chemin d'accès au fichier à déplacer et une icône.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
